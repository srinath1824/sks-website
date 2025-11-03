# Production Architecture for 1000+ Concurrent Users

## Recommended Hybrid Approach

### Client-Side (Lightweight)
- **Basic metrics only**: Eyes closed detection, head movement
- **Simplified MediaPipe**: Use face detection only (not full mesh)
- **Fallback mode**: Manual scoring if MediaPipe fails
- **Reduced frequency**: Send metrics every 5-10 seconds instead of 2

### Server-Side Processing
- **Video upload**: Optional 30-second video clips for verification
- **Batch processing**: Analyze videos after test completion
- **AI verification**: Cross-check client metrics with server analysis
- **Manual review**: Human verification for borderline cases

## Architecture Components

### 1. Load Balancer + CDN
```yaml
# nginx.conf
upstream meditation_backend {
    server app1:8080 weight=3;
    server app2:8080 weight=3;
    server app3:8080 weight=2;
}

server {
    listen 443 ssl;
    server_name meditation.sivakundalini.org;
    
    # Rate limiting
    limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;
    limit_req zone=api burst=20 nodelay;
    
    location /api/ {
        proxy_pass http://meditation_backend;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
    
    location /ws/ {
        proxy_pass http://meditation_backend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

### 2. Microservices Architecture
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │  Session API    │    │  Analytics API  │
│   (React)       │────│  (Node.js)      │────│  (Python)       │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │              ┌─────────────────┐    ┌─────────────────┐
         │              │  Metrics API    │    │  Dashboard API  │
         └──────────────│  (Node.js)      │────│  (Node.js)      │
                        └─────────────────┘    └─────────────────┘
                                 │                       │
                        ┌─────────────────┐    ┌─────────────────┐
                        │   PostgreSQL    │    │     Redis       │
                        │   (Primary DB)  │    │   (Cache/Queue) │
                        └─────────────────┘    └─────────────────┘
```

### 3. Simplified Client Implementation
```javascript
// Lightweight MediaPipe implementation
class SimpleMeditationAnalyzer {
    constructor() {
        this.faceDetection = new FaceDetection({
            model: 'short', // Faster, less accurate model
            maxFaces: 1
        });
        this.metricsBuffer = [];
        this.lastSent = 0;
    }

    async analyzeFrame(video) {
        const faces = await this.faceDetection.detect(video);
        
        if (faces.length === 0) {
            return { faceVisible: false, score: 0 };
        }

        const face = faces[0];
        
        // Simplified metrics calculation
        const eyesOpen = this.detectEyesOpen(face.landmarks);
        const headStable = this.calculateHeadStability(face.box);
        
        return {
            faceVisible: true,
            eyesClosedRatio: eyesOpen ? 0.2 : 0.8,
            headStability: headStable,
            bodyMovement: 0.7, // Placeholder
            overallScore: (eyesClosedRatio + headStable) / 2
        };
    }

    // Send metrics less frequently
    shouldSendMetrics() {
        return Date.now() - this.lastSent > 10000; // Every 10 seconds
    }
}
```

### 4. Server-Side Verification System
```python
# Optional server-side video analysis
import cv2
import mediapipe as mp

class ServerSideVerification:
    def __init__(self):
        self.face_mesh = mp.solutions.face_mesh.FaceMesh(
            static_image_mode=False,
            max_num_faces=1,
            refine_landmarks=True,
            min_detection_confidence=0.5
        )
    
    def verify_session(self, video_path, client_metrics):
        """Verify client-reported metrics against video analysis"""
        cap = cv2.VideoCapture(video_path)
        server_metrics = []
        
        while cap.isOpened():
            ret, frame = cap.read()
            if not ret:
                break
                
            # Analyze frame with full MediaPipe
            results = self.face_mesh.process(frame)
            metrics = self.calculate_detailed_metrics(results)
            server_metrics.append(metrics)
        
        # Compare client vs server metrics
        verification_score = self.compare_metrics(client_metrics, server_metrics)
        return verification_score > 0.8  # 80% similarity threshold
```

## Scaling Strategy

### Phase 1: Basic Scale (100 users)
- Single server with PostgreSQL
- Client-side MediaPipe only
- Basic metrics collection
- Simple pass/fail logic

### Phase 2: Medium Scale (500 users)
- Load balancer + 2-3 app servers
- Redis for session management
- Database connection pooling
- Metrics aggregation

### Phase 3: High Scale (1000+ users)
- Microservices architecture
- Database sharding/read replicas
- Message queues for metrics processing
- CDN for static assets
- Auto-scaling groups

## Performance Optimizations

### 1. Database Optimizations
```sql
-- Partition metrics table by date
CREATE TABLE meditation_metrics_2024_01 PARTITION OF meditation_metrics
FOR VALUES FROM ('2024-01-01') TO ('2024-02-01');

-- Use connection pooling
-- Max connections: 200
-- Pool size per service: 20
-- Connection timeout: 30s

-- Optimize queries
CREATE INDEX CONCURRENTLY idx_metrics_session_timestamp 
ON meditation_metrics (session_id, timestamp);
```

### 2. Caching Strategy
```javascript
// Redis caching for frequent queries
const redis = require('redis');
const client = redis.createClient();

// Cache active sessions
await client.setex(`session:${sessionId}`, 3600, JSON.stringify(sessionData));

// Cache dashboard data
await client.setex('dashboard:active', 30, JSON.stringify(activeSessions));

// Cache configuration
await client.setex('config:weights', 86400, JSON.stringify(weights));
```

### 3. Rate Limiting & Queue Management
```javascript
// Rate limiting per user
const rateLimit = require('express-rate-limit');

const metricsLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 20, // 20 requests per minute per IP
    message: 'Too many metrics submissions'
});

// Queue for heavy processing
const Queue = require('bull');
const videoProcessingQueue = new Queue('video processing');

videoProcessingQueue.process(async (job) => {
    const { sessionId, videoPath } = job.data;
    return await processVideoAnalysis(sessionId, videoPath);
});
```

## Resource Requirements

### For 1000 Concurrent Users:

#### Server Infrastructure:
- **App Servers**: 4-6 instances (4 CPU, 8GB RAM each)
- **Database**: PostgreSQL (8 CPU, 32GB RAM, SSD storage)
- **Cache**: Redis (2 CPU, 8GB RAM)
- **Load Balancer**: 2 CPU, 4GB RAM
- **Total**: ~$800-1200/month on AWS/GCP

#### Network Requirements:
- **Bandwidth**: 100-200 Mbps
- **Requests/second**: 2000-3000 peak
- **Database connections**: 200-300 concurrent
- **WebSocket connections**: 1000+ for dashboard

#### Storage Requirements:
- **Metrics data**: ~50GB/month
- **Session data**: ~10GB/month
- **Logs**: ~20GB/month
- **Backups**: 3x storage for redundancy

## Monitoring & Alerting

### Key Metrics to Monitor:
- **Response times**: API endpoints < 200ms
- **Error rates**: < 1% error rate
- **Database performance**: Query times, connection pool
- **Memory usage**: < 80% on all servers
- **CPU usage**: < 70% average
- **Active sessions**: Real-time count
- **Failed tests**: Track failure reasons

### Alerting Thresholds:
- **High error rate**: > 5% in 5 minutes
- **Slow responses**: > 500ms average
- **High CPU**: > 85% for 10 minutes
- **Database issues**: Connection failures
- **Memory leaks**: Increasing memory usage

This architecture can handle 1000+ concurrent users with proper scaling and monitoring.