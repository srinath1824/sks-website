# Siva Kundalini Sadhana Website

A modern, responsive website for Siva Kundalini Sadhana spiritual organization built with React, TypeScript, and Tailwind CSS.

## 🌟 Features

- **Responsive Design** - Works perfectly on all devices
- **Performance Optimized** - Fast loading with code splitting and lazy loading
- **Interactive Chatbot** - AI-powered spiritual guidance
- **SEO Optimized** - Structured data and meta tags
- **Accessibility** - WCAG compliant design
- **Modern Stack** - React 18, TypeScript, Vite, Tailwind CSS

## 🚀 Quick Start

### Prerequisites

- **Node.js** (version 16 or higher)
- **npm** (comes with Node.js)
- **Git** (for version control)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd SKS-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

## 📁 Project Structure

```
SKS-website/
├── public/                 # Static assets
│   ├── images/            # Image files
│   ├── index.html         # HTML template
│   ├── robots.txt         # SEO robots file
│   └── sitemap.xml        # SEO sitemap
├── src/
│   ├── components/        # React components
│   │   ├── About.tsx      # About section
│   │   ├── Chatbot.tsx    # Interactive chatbot
│   │   ├── Courses.tsx    # Course information
│   │   ├── Events.tsx     # Events and gatherings
│   │   ├── Gallery.tsx    # Image gallery
│   │   ├── Header.tsx     # Navigation header
│   │   ├── Hero.tsx       # Hero section
│   │   ├── LazyImage.tsx  # Optimized image component
│   │   └── ...           # Other components
│   ├── data/             # Data files
│   │   ├── chatbotResponses.json  # Chatbot knowledge base
│   │   └── structuredData.ts      # SEO structured data
│   ├── utils/            # Utility functions
│   │   ├── performance.ts # Performance optimizations
│   │   ├── imageCache.ts  # Image caching
│   │   └── ...           # Other utilities
│   ├── App.tsx           # Main app component
│   ├── main.tsx          # App entry point
│   └── index.css         # Global styles
├── firebase.json         # Firebase hosting config
├── vite.config.ts        # Vite configuration
├── tailwind.config.js    # Tailwind CSS config
└── package.json          # Dependencies and scripts
```

## 🛠️ Available Scripts

### Development
```bash
npm run dev          # Start development server
npm run lint         # Run ESLint for code quality
npm run preview      # Preview production build locally
```

### Production
```bash
npm run build        # Build for production
npm run build:analyze # Build with bundle analysis
npm run deploy       # Build and deploy to Firebase
```

## 🔧 Configuration

### Environment Setup

Create a `.env` file in the root directory (if needed):
```env
# Add environment variables here
VITE_API_URL=your_api_url
```

### Firebase Setup

1. **Install Firebase CLI**
   ```bash
   npm install -g firebase-tools
   ```

2. **Login to Firebase**
   ```bash
   firebase login
   ```

3. **Initialize Firebase (if not already done)**
   ```bash
   firebase init hosting
   ```

4. **Deploy to Firebase**
   ```bash
   npm run deploy
   ```

## 📝 Content Management

### Chatbot Responses

Edit chatbot responses in `src/data/chatbotResponses.json`:

```json
{
  "quickReplies": ["What is Kundalini?", "About Jeeveswara Yogi"],
  "responses": {
    "kundalini": {
      "keywords": ["kundalini", "energy"],
      "text": "Your response text here...",
      "suggestions": ["Follow-up question 1", "Follow-up question 2"]
    }
  }
}
```

### Images

- Place images in `public/images/` directory
- Use descriptive filenames
- Optimize images before adding (recommended: WebP format)
- Update image references in components

### SEO Content

- Update meta tags in `src/components/SEO.tsx`
- Modify structured data in `src/data/structuredData.ts`
- Update `public/sitemap.xml` and `public/robots.txt`

## 🎨 Styling

### Tailwind CSS

The project uses Tailwind CSS for styling:

- **Configuration**: `tailwind.config.js`
- **Custom styles**: `src/index.css`
- **Component styles**: Inline Tailwind classes

### Color Scheme

```css
Primary: Orange (#f97316)
Secondary: Gray (#6b7280)
Background: White (#ffffff)
Text: Gray-900 (#111827)
```

## 🚀 Performance Features

- **Code Splitting**: Automatic component-level splitting
- **Lazy Loading**: Images and components load on demand
- **Caching**: Optimized browser caching headers
- **Compression**: Gzip compression for all assets
- **Bundle Optimization**: Vendor and UI library separation

## 📱 Responsive Design

- **Mobile First**: Designed for mobile devices first
- **Breakpoints**: 
  - `sm`: 640px and up
  - `md`: 768px and up
  - `lg`: 1024px and up
  - `xl`: 1280px and up

## 🔍 SEO Features

- **Meta Tags**: Dynamic meta tags for each page
- **Structured Data**: JSON-LD for rich snippets
- **Sitemap**: XML sitemap for search engines
- **Robots.txt**: Search engine crawling instructions
- **Open Graph**: Social media sharing optimization

## 🤖 Chatbot Features

- **Interactive UI**: Modern chat interface
- **Keyword Matching**: Intelligent response matching
- **Suggestions**: Follow-up question suggestions
- **Responsive**: Works on all device sizes
- **Customizable**: Easy to update responses via JSON

## 🛡️ Security

- **Content Security Policy**: Configured in Firebase hosting
- **HTTPS**: Enforced via Firebase hosting
- **Input Sanitization**: Safe handling of user inputs
- **No Sensitive Data**: No API keys or secrets in frontend

## 📊 Analytics & Monitoring

To add analytics:

1. **Google Analytics**
   ```html
   <!-- Add to index.html -->
   <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
   ```

2. **Performance Monitoring**
   - Use browser dev tools
   - Lighthouse audits
   - Web Vitals monitoring

## 🐛 Troubleshooting

### Common Issues

1. **Images not loading**
   - Check file paths in `public/images/`
   - Verify image file extensions match code references
   - Clear browser cache

2. **Build fails**
   - Run `npm install` to ensure dependencies are installed
   - Check for TypeScript errors: `npm run lint`
   - Verify all imports are correct

3. **Deployment issues**
   - Ensure Firebase CLI is installed and logged in
   - Check `firebase.json` configuration
   - Verify build completes successfully first

### Performance Issues

- Run `npm run build:analyze` to check bundle sizes
- Use browser dev tools to identify bottlenecks
- Check network tab for slow-loading resources

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make changes and commit**
   ```bash
   git commit -m "Add your feature"
   ```
4. **Push to branch**
   ```bash
   git push origin feature/your-feature-name
   ```
5. **Create a Pull Request**

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support and questions:

- **Email**: sivakundalini@gmail.com
- **Phone**: +91 78010 46111
- **WhatsApp**: +91 7801046111

## 🙏 Acknowledgments

- **Parama Pujya Sree Jeeveswara Yogi** - Spiritual guidance and inspiration
- **React Team** - For the amazing framework
- **Tailwind CSS** - For the utility-first CSS framework
- **Vite** - For the fast build tool
- **Firebase** - For hosting and deployment

---

**Built with ❤️ for spiritual awakening and transformation**