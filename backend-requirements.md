# Backend Requirements for Meditation Test System

## Project Overview
This backend system supports a real-time meditation assessment platform that uses computer vision to evaluate meditation quality. The system captures metrics like eye closure, head stability, posture, and attention to provide automated pass/fail results.

## Technology Stack Recommendations
- **Framework**: Node.js with Express.js or Python with FastAPI
- **Database**: PostgreSQL (primary) + Redis (caching/sessions)
- **WebSocket**: Socket.io or native WebSocket
- **Authentication**: JWT tokens
- **File Storage**: AWS S3 or local storage for exports
- **Deployment**: Docker containers

## Database Schema

### 1. meditation_sessions table
```sql
CREATE TABLE meditation_sessions (
    id SERIAL PRIMARY KEY,
    session_id VARCHAR(100) UNIQUE NOT NULL, -- UUID for frontend
    user_id VARCHAR(100) NOT NULL,
    user_name VARCHAR(255),
    phone_number VARCHAR(20),
    start_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    end_time TIMESTAMP,
    duration_seconds INTEGER,
    planned_duration INTEGER, -- Expected test duration
    test_status ENUM('ACTIVE', 'COMPLETED', 'FAILED', 'ABANDONED') DEFAULT 'ACTIVE',
    final_score DECIMAL(5,4), -- 0.0000 to 1.0000
    pass_status BOOLEAN,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_sessions_user_id ON meditation_sessions(user_id);
CREATE INDEX idx_sessions_status ON meditation_sessions(test_status);
CREATE INDEX idx_sessions_date ON meditation_sessions(DATE(created_at));
```

### 2. meditation_metrics table
```sql
CREATE TABLE meditation_metrics (
    id SERIAL PRIMARY KEY,
    session_id INTEGER REFERENCES meditation_sessions(id) ON DELETE CASCADE,
    timestamp BIGINT NOT NULL, -- Unix timestamp from frontend
    server_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Core metrics (0.0000 to 1.0000)
    eyes_closed_ratio DECIMAL(5,4) NOT NULL,
    head_stability DECIMAL(5,4) NOT NULL,
    body_movement DECIMAL(5,4) NOT NULL,
    blink_rate DECIMAL(5,4) NOT NULL,
    
    -- Enhanced metrics
    attention_score DECIMAL(5,4) NOT NULL,
    posture_score DECIMAL(5,4) NOT NULL,
    breathing_pattern DECIMAL(5,4) NOT NULL,
    facial_tension DECIMAL(5,4) NOT NULL,
    session_consistency DECIMAL(5,4) NOT NULL,
    presence_time DECIMAL(5,4) NOT NULL,
    
    -- Status indicators
    face_visible BOOLEAN NOT NULL,
    overall_score DECIMAL(5,4) NOT NULL,
    
    -- Failure tracking
    critical_failures JSONB DEFAULT '[]'::jsonb,
    
    -- Performance tracking
    processing_time_ms INTEGER -- Time taken to process this frame
);

CREATE INDEX idx_metrics_session ON meditation_metrics(session_id);
CREATE INDEX idx_metrics_timestamp ON meditation_metrics(timestamp);
CREATE INDEX idx_metrics_score ON meditation_metrics(overall_score);
```

### 3. meditation_results table (Aggregated final results)
```sql
CREATE TABLE meditation_results (
    id SERIAL PRIMARY KEY,
    session_id INTEGER REFERENCES meditation_sessions(id) ON DELETE CASCADE,
    user_id VARCHAR(100) NOT NULL,
    phone_number VARCHAR(20),
    
    -- Final scores
    final_score DECIMAL(5,4) NOT NULL,
    pass_status BOOLEAN NOT NULL,
    
    -- Test metadata
    test_date DATE NOT NULL,
    duration_seconds INTEGER NOT NULL,
    total_frames INTEGER, -- Total metrics data points
    
    -- Average metrics over entire session
    avg_eyes_closed DECIMAL(5,4),
    avg_head_stability DECIMAL(5,4),
    avg_body_stillness DECIMAL(5,4),
    avg_attention DECIMAL(5,4),
    avg_posture DECIMAL(5,4),
    avg_breathing DECIMAL(5,4),
    avg_facial_tension DECIMAL(5,4),
    avg_consistency DECIMAL(5,4),
    
    -- Performance indicators
    presence_percentage DECIMAL(5,2), -- % time face was visible
    score_stability DECIMAL(5,4), -- How consistent scores were
    
    -- Failure analysis
    critical_failures JSONB DEFAULT '[]'::jsonb,
    failure_timestamps JSONB DEFAULT '[]'::jsonb,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_results_user ON meditation_results(user_id);
CREATE INDEX idx_results_date ON meditation_results(test_date);
CREATE INDEX idx_results_pass ON meditation_results(pass_status);
CREATE INDEX idx_results_score ON meditation_results(final_score);
```

### 4. meditation_config table (System configuration)
```sql
CREATE TABLE meditation_config (
    id SERIAL PRIMARY KEY,
    config_key VARCHAR(100) UNIQUE NOT NULL,
    config_value JSONB NOT NULL,
    description TEXT,
    updated_by VARCHAR(100),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Default configuration
INSERT INTO meditation_config (config_key, config_value, description) VALUES
('pass_threshold', '0.75', 'Minimum score required to pass'),
('test_durations', '[60, 180, 300, 600]', 'Allowed test durations in seconds'),
('metric_weights', '{
    "eyes": 0.25,
    "head": 0.20,
    "body": 0.15,
    "attention": 0.15,
    "posture": 0.10,
    "breathing": 0.05,
    "facial": 0.05,
    "consistency": 0.05
}', 'Weights for calculating overall score'),
('failure_thresholds', '{
    "presence_time": 0.9,
    "eyes_closed_ratio": 0.5,
    "head_stability": 0.4,
    "attention_score": 0.3
}', 'Thresholds for critical failures');
```

### 5. admin_users table (Dashboard access)
```sql
CREATE TABLE admin_users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('ADMIN', 'VIEWER') DEFAULT 'VIEWER',
    is_active BOOLEAN DEFAULT true,
    last_login TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## API Endpoints Needed

### 1. Session Management
```javascript
// Start new meditation session
POST /api/meditation/session/start
Headers: {
    'Content-Type': 'application/json',
    'User-Agent': string,
    'X-Forwarded-For': string // For IP tracking
}
Body: {
    userId: string,
    userName?: string,
    phoneNumber?: string,
    testDuration: number // seconds (must be in allowed durations)
}
Response: {
    success: boolean,
    sessionId: string, // UUID
    startTime: timestamp,
    config: {
        passThreshold: number,
        maxDuration: number,
        weights: object
    }
}
Error Response: {
    success: false,
    error: string,
    code: 'INVALID_DURATION' | 'USER_ALREADY_ACTIVE' | 'SERVER_ERROR'
}

// End meditation session
POST /api/meditation/session/end
Body: {
    sessionId: string,
    finalScore: number,
    passStatus: boolean,
    totalFrames?: number
}
Response: {
    success: boolean,
    result: {
        sessionId: string,
        finalScore: number,
        passStatus: boolean,
        duration: number,
        rank?: string // 'EXCELLENT' | 'GOOD' | 'AVERAGE' | 'NEEDS_IMPROVEMENT'
    }
}

// Get session status
GET /api/meditation/session/:sessionId
Response: {
    success: boolean,
    session: {
        sessionId: string,
        userId: string,
        status: string,
        startTime: timestamp,
        duration: number,
        currentScore: number,
        metricsCount: number
    }
}

// Abandon/Cancel session
POST /api/meditation/session/:sessionId/abandon
Body: {
    reason?: string // 'USER_LEFT' | 'TECHNICAL_ISSUE' | 'OTHER'
}
Response: {
    success: boolean
}
```

### 2. Real-time Metrics
```javascript
// Submit real-time metrics (called every 1-2 seconds)
POST /api/meditation/metrics
Headers: {
    'Content-Type': 'application/json'
}
Body: {
    sessionId: string,
    timestamp: number, // Unix timestamp from frontend
    metrics: {
        // Core metrics (0.0 to 1.0)
        eyesClosedRatio: number,
        headStability: number,
        bodyMovement: number,
        blinkRate: number,
        
        // Enhanced metrics (0.0 to 1.0)
        attentionScore: number,
        postureScore: number,
        breathingPattern: number,
        facialTension: number,
        sessionConsistency: number,
        presenceTime: number,
        
        // Status
        faceVisible: boolean,
        overallScore: number,
        
        // Failures
        criticalFailures: string[]
    },
    
    // Optional performance data
    clientProcessingTime?: number // ms taken on client side
}
Response: {
    success: boolean,
    acknowledged: boolean,
    serverTime: timestamp
}
Error Response: {
    success: false,
    error: 'SESSION_NOT_FOUND' | 'SESSION_ENDED' | 'INVALID_DATA'
}

// Batch submit metrics (for offline/reconnection scenarios)
POST /api/meditation/metrics/batch
Body: {
    sessionId: string,
    metrics: [{
        timestamp: number,
        metrics: MetricsObject
    }]
}
Response: {
    success: boolean,
    processed: number,
    failed: number,
    errors?: string[]
}
```

### 3. Dashboard APIs (Requires Authentication)
```javascript
// Admin login
POST /api/auth/login
Body: {
    username: string,
    password: string
}
Response: {
    success: boolean,
    token: string, // JWT token
    user: {
        id: number,
        username: string,
        role: string
    }
}

// Get all active sessions for dashboard
GET /api/meditation/dashboard/active
Headers: {
    'Authorization': 'Bearer <jwt_token>'
}
Response: {
    success: boolean,
    activeSessions: [{
        sessionId: string,
        userId: string,
        userName: string,
        startTime: timestamp,
        duration: number,
        currentScore: number,
        status: string,
        latestMetrics: {
            timestamp: number,
            overallScore: number,
            eyesClosedRatio: number,
            headStability: number,
            faceVisible: boolean,
            criticalFailures: string[]
        },
        metricsCount: number
    }],
    totalActive: number,
    lastUpdated: timestamp
}

// Get session history/results with advanced filtering
GET /api/meditation/results
Headers: {
    'Authorization': 'Bearer <jwt_token>'
}
Query: {
    page?: number (default: 1),
    limit?: number (default: 50, max: 200),
    startDate?: string (YYYY-MM-DD),
    endDate?: string (YYYY-MM-DD),
    passStatus?: boolean,
    minScore?: number,
    maxScore?: number,
    userId?: string,
    phoneNumber?: string,
    sortBy?: 'date' | 'score' | 'duration' (default: 'date'),
    sortOrder?: 'asc' | 'desc' (default: 'desc')
}
Response: {
    success: boolean,
    results: [{
        id: number,
        sessionId: string,
        userId: string,
        userName: string,
        phoneNumber: string,
        testDate: string,
        finalScore: number,
        passStatus: boolean,
        duration: number,
        totalFrames: number,
        avgMetrics: {
            eyesClosed: number,
            headStability: number,
            bodyStillness: number,
            attention: number
        },
        criticalFailures: string[],
        createdAt: timestamp
    }],
    pagination: {
        total: number,
        page: number,
        limit: number,
        totalPages: number
    },
    summary: {
        totalTests: number,
        passCount: number,
        failCount: number,
        avgScore: number,
        avgDuration: number
    }
}

// Get detailed session data
GET /api/meditation/session/:sessionId/details
Headers: {
    'Authorization': 'Bearer <jwt_token>'
}
Response: {
    success: boolean,
    session: {
        sessionInfo: SessionObject,
        metricsTimeline: [{
            timestamp: number,
            overallScore: number,
            eyesClosedRatio: number,
            headStability: number,
            faceVisible: boolean
        }],
        summary: {
            avgScore: number,
            scoreStability: number,
            presencePercentage: number,
            failurePoints: [{
                timestamp: number,
                failure: string
            }]
        }
    }
}
```

### 4. System Configuration APIs
```javascript
// Get current system configuration
GET /api/meditation/config
Response: {
    success: boolean,
    config: {
        passThreshold: number,
        testDurations: number[],
        metricWeights: {
            eyes: number,
            head: number,
            body: number,
            attention: number,
            posture: number,
            breathing: number,
            facial: number,
            consistency: number
        },
        failureThresholds: {
            presenceTime: number,
            eyesClosedRatio: number,
            headStability: number,
            attentionScore: number
        }
    }
}

// Update configuration (Admin only)
PUT /api/meditation/config
Headers: {
    'Authorization': 'Bearer <admin_jwt_token>'
}
Body: {
    configKey: string, // 'pass_threshold' | 'metric_weights' | 'failure_thresholds'
    configValue: any
}
Response: {
    success: boolean,
    updated: boolean
}
```

## WebSocket Events (Real-time Dashboard Updates)

### WebSocket Connection
```javascript
// Connect to WebSocket (Dashboard only)
ws://localhost:8080/dashboard
Headers: {
    'Authorization': 'Bearer <jwt_token>'
}

// Connection established
{
    type: 'CONNECTED',
    clientId: string,
    timestamp: number
}
```

### Client to Server Events
```javascript
// Subscribe to dashboard updates
{
    type: 'SUBSCRIBE_DASHBOARD',
    filters?: {
        userId?: string,
        minScore?: number
    }
}

// Unsubscribe from updates
{
    type: 'UNSUBSCRIBE_DASHBOARD'
}

// Request session details
{
    type: 'GET_SESSION_DETAILS',
    sessionId: string
}
```

### Server to Client Events (Dashboard)
```javascript
// New session started
{
    type: 'SESSION_STARTED',
    data: {
        sessionId: string,
        userId: string,
        userName: string,
        startTime: timestamp,
        plannedDuration: number
    }
}

// Real-time metrics update
{
    type: 'METRICS_UPDATE',
    data: {
        sessionId: string,
        userId: string,
        timestamp: number,
        metrics: {
            overallScore: number,
            eyesClosedRatio: number,
            headStability: number,
            faceVisible: boolean,
            criticalFailures: string[]
        },
        duration: number
    }
}

// Session completed
{
    type: 'SESSION_COMPLETED',
    data: {
        sessionId: string,
        userId: string,
        finalScore: number,
        passStatus: boolean,
        duration: number,
        totalFrames: number
    }
}

// Session abandoned/failed
{
    type: 'SESSION_ABANDONED',
    data: {
        sessionId: string,
        userId: string,
        reason: string,
        duration: number
    }
}

// Dashboard statistics update (every 30 seconds)
{
    type: 'DASHBOARD_STATS',
    data: {
        totalActive: number,
        totalToday: number,
        passRateToday: number,
        avgScoreToday: number,
        timestamp: number
    }
}
```

## Analytics & Reporting APIs

### 1. Statistics APIs
```javascript
// Get comprehensive test statistics
GET /api/meditation/analytics/stats
Headers: {
    'Authorization': 'Bearer <jwt_token>'
}
Query: {
    period?: '1d' | '7d' | '30d' | '90d' | 'custom',
    startDate?: string (YYYY-MM-DD),
    endDate?: string (YYYY-MM-DD),
    groupBy?: 'hour' | 'day' | 'week' | 'month'
}
Response: {
    success: boolean,
    stats: {
        overview: {
            totalTests: number,
            totalPasses: number,
            totalFails: number,
            passRate: number,
            avgScore: number,
            avgDuration: number
        },
        trends: [{
            date: string,
            tests: number,
            passes: number,
            avgScore: number,
            avgDuration: number
        }],
        failureAnalysis: {
            commonFailures: [{
                failure: string,
                count: number,
                percentage: number
            }],
            failuresByScore: {
                '0-25': number,
                '25-50': number,
                '50-75': number
            }
        },
        performanceMetrics: {
            avgEyesClosed: number,
            avgHeadStability: number,
            avgBodyStillness: number,
            avgAttention: number
        }
    }
}

// Get user performance analytics
GET /api/meditation/analytics/users
Query: {
    limit?: number,
    sortBy?: 'tests' | 'avgScore' | 'passRate',
    period?: '7d' | '30d' | '90d'
}
Response: {
    success: boolean,
    users: [{
        userId: string,
        totalTests: number,
        passes: number,
        avgScore: number,
        bestScore: number,
        lastTestDate: string,
        improvement: number // Score improvement over time
    }]
}
```

### 2. Export APIs
```javascript
// Export results to CSV
GET /api/meditation/export/csv
Headers: {
    'Authorization': 'Bearer <jwt_token>'
}
Query: {
    startDate?: string,
    endDate?: string,
    passStatus?: boolean,
    includeMetrics?: boolean // Include detailed metrics
}
Response: CSV file download
Headers: {
    'Content-Type': 'text/csv',
    'Content-Disposition': 'attachment; filename="meditation_results_YYYY-MM-DD.csv"'
}

// Export detailed session data
GET /api/meditation/export/session/:sessionId
Headers: {
    'Authorization': 'Bearer <jwt_token>'
}
Query: {
    format?: 'json' | 'csv'
}
Response: Detailed session data with all metrics timeline

// Generate PDF report
POST /api/meditation/export/report
Headers: {
    'Authorization': 'Bearer <jwt_token>'
}
Body: {
    reportType: 'summary' | 'detailed',
    period: {
        startDate: string,
        endDate: string
    },
    includeCharts: boolean
}
Response: PDF file download
```

## Error Handling & Status Codes

### HTTP Status Codes
- **200**: Success
- **201**: Created (new session)
- **400**: Bad Request (invalid data)
- **401**: Unauthorized (invalid/missing token)
- **403**: Forbidden (insufficient permissions)
- **404**: Not Found (session/user not found)
- **409**: Conflict (user already has active session)
- **422**: Unprocessable Entity (validation errors)
- **429**: Too Many Requests (rate limiting)
- **500**: Internal Server Error

### Error Response Format
```javascript
{
    success: false,
    error: {
        code: string, // Machine-readable error code
        message: string, // Human-readable message
        details?: any, // Additional error details
        timestamp: number
    }
}
```

### Common Error Codes
- `SESSION_NOT_FOUND`: Session ID doesn't exist
- `SESSION_EXPIRED`: Session has ended
- `USER_ALREADY_ACTIVE`: User has another active session
- `INVALID_DURATION`: Test duration not allowed
- `INVALID_METRICS`: Metrics data validation failed
- `RATE_LIMIT_EXCEEDED`: Too many requests
- `UNAUTHORIZED_ACCESS`: Invalid or missing authentication
- `INSUFFICIENT_PERMISSIONS`: User lacks required permissions

## Performance Requirements

### Response Time Targets
- **Session start/end**: < 200ms
- **Metrics submission**: < 100ms
- **Dashboard data**: < 500ms
- **Analytics queries**: < 2s
- **Export operations**: < 30s

### Throughput Requirements
- **Concurrent sessions**: 50+ simultaneous users
- **Metrics ingestion**: 1000+ metrics/second
- **Dashboard updates**: Real-time (< 1s latency)
- **Database queries**: Optimized with proper indexing

### Data Retention
- **Active sessions**: Real-time access
- **Completed sessions**: 2 years
- **Detailed metrics**: 6 months (then aggregate)
- **System logs**: 30 days

## Security Requirements

### Authentication & Authorization
- **JWT tokens**: 24-hour expiry for dashboard access
- **Rate limiting**: 100 requests/minute per IP
- **CORS**: Configured for frontend domain only
- **Input validation**: All inputs sanitized and validated
- **SQL injection**: Use parameterized queries

### Data Privacy
- **No video storage**: Only metrics are stored
- **IP anonymization**: Hash IP addresses after 24 hours
- **Data encryption**: Encrypt sensitive data at rest
- **Access logging**: Log all admin access

### Infrastructure Security
- **HTTPS only**: All API endpoints
- **Database encryption**: Encrypt database connections
- **Environment variables**: Store secrets securely
- **Regular backups**: Automated daily backups

## Deployment Architecture

### Recommended Infrastructure
```yaml
# docker-compose.yml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "8080:8080"
    environment:
      - NODE_ENV=production
      - DB_HOST=postgres
      - REDIS_URL=redis://redis:6379
    depends_on:
      - postgres
      - redis

  postgres:
    image: postgres:15
    environment:
      - POSTGRES_DB=meditation_test
      - POSTGRES_USER=meditation_user
      - POSTGRES_PASSWORD=secure_password
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./migrations:/docker-entrypoint-initdb.d

  redis:
    image: redis:7-alpine
    volumes:
      - redis_data:/data

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/ssl
    depends_on:
      - app

volumes:
  postgres_data:
  redis_data:
```

### Health Check Endpoints
```javascript
// Basic health check
GET /health
Response: {
    status: 'healthy',
    timestamp: number,
    uptime: number,
    version: string
}

// Detailed health check
GET /health/detailed
Response: {
    status: 'healthy' | 'degraded' | 'unhealthy',
    services: {
        database: 'healthy' | 'unhealthy',
        redis: 'healthy' | 'unhealthy',
        websocket: 'healthy' | 'unhealthy'
    },
    metrics: {
        activeSessions: number,
        totalRequests: number,
        avgResponseTime: number,
        errorRate: number
    }
}
```

## Implementation Priority

### Phase 1 (MVP - Week 1-2)
**Core Functionality**
1. Database schema setup with all tables
2. Session management APIs (start, end, status)
3. Real-time metrics collection API
4. Basic dashboard API (active sessions)
5. Simple WebSocket for real-time updates
6. Basic authentication for dashboard
7. Pass/fail logic implementation

**Deliverables:**
- Working meditation test with backend integration
- Real-time dashboard showing active sessions
- Basic metrics storage and retrieval

### Phase 2 (Enhanced - Week 3-4)
**Analytics & Management**
1. Advanced analytics APIs
2. Configuration management system
3. Export functionality (CSV, PDF)
4. Enhanced dashboard with charts
5. User performance tracking
6. Failure analysis and reporting
7. Rate limiting and security hardening

**Deliverables:**
- Comprehensive analytics dashboard
- Export and reporting capabilities
- System configuration management
- Performance monitoring

### Phase 3 (Production - Week 5-6)
**Optimization & Scale**
1. Performance optimization
2. Database indexing and query optimization
3. Data archiving and cleanup jobs
4. Advanced reporting with visualizations
5. Integration with existing user system
6. Monitoring and alerting
7. Load testing and scaling

**Deliverables:**
- Production-ready system
- Monitoring and alerting setup
- Documentation and deployment guides
- Load testing results

## Development Guidelines

### Code Structure
```
backend/
├── src/
│   ├── controllers/     # API route handlers
│   ├── models/         # Database models
│   ├── services/       # Business logic
│   ├── middleware/     # Auth, validation, etc.
│   ├── utils/          # Helper functions
│   ├── websocket/      # WebSocket handlers
│   └── config/         # Configuration files
├── migrations/         # Database migrations
├── tests/             # Unit and integration tests
├── docs/              # API documentation
└── docker/            # Docker configuration
```

### Environment Variables
```bash
# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=meditation_test
DB_USER=meditation_user
DB_PASSWORD=secure_password

# Redis (for sessions/caching)
REDIS_URL=redis://localhost:6379

# JWT
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=24h

# Server
PORT=8080
NODE_ENV=production
CORS_ORIGIN=https://yourdomain.com

# Rate Limiting
RATE_LIMIT_WINDOW=60000  # 1 minute
RATE_LIMIT_MAX=100       # requests per window

# File Storage (for exports)
STORAGE_TYPE=local       # or 's3'
STORAGE_PATH=./exports
```

### Testing Requirements
- **Unit tests**: 80%+ code coverage
- **Integration tests**: All API endpoints
- **Load testing**: 50+ concurrent users
- **Security testing**: OWASP top 10

### Documentation
- **API documentation**: OpenAPI/Swagger spec
- **Database schema**: ERD diagrams
- **Deployment guide**: Step-by-step setup
- **Monitoring guide**: Health checks and alerts

This comprehensive backend will support the meditation test system with real-time monitoring, analytics, and scalable architecture for production use.