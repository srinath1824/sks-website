// Advanced performance optimizations
export const initAdvancedPerformance = () => {
  // Preload critical resources
  const preloadCriticalImages = () => {
    const criticalImages = [
      '/images/hero-bg.jpg',
      '/images/gurudev-main.jpg',
      '/images/SKS_Logo_4K-1.png'
    ];

    criticalImages.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      link.fetchPriority = 'high';
      document.head.appendChild(link);
    });
  };

  // Optimize font loading
  const optimizeFonts = () => {
    const fontLink = document.createElement('link');
    fontLink.rel = 'preload';
    fontLink.as = 'font';
    fontLink.type = 'font/woff2';
    fontLink.crossOrigin = 'anonymous';
    fontLink.href = 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2';
    document.head.appendChild(fontLink);
  };

  // Implement resource hints
  const addResourceHints = () => {
    const hints = [
      { rel: 'dns-prefetch', href: 'https://www.googleapis.com' },
      { rel: 'dns-prefetch', href: 'https://fonts.gstatic.com' },
      { rel: 'preconnect', href: 'https://www.youtube.com' },
      { rel: 'preconnect', href: 'https://i.ytimg.com' }
    ];

    hints.forEach(hint => {
      const link = document.createElement('link');
      link.rel = hint.rel;
      link.href = hint.href;
      if (hint.rel === 'preconnect') {
        link.crossOrigin = 'anonymous';
      }
      document.head.appendChild(link);
    });
  };

  // Optimize images with WebP support
  const supportsWebP = () => {
    return new Promise<boolean>((resolve) => {
      const webP = new Image();
      webP.onload = webP.onerror = () => {
        resolve(webP.height === 2);
      };
      webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
    });
  };

  // Implement critical CSS inlining
  const inlineCriticalCSS = () => {
    const criticalCSS = `
      .hero-section { background-image: url('/images/hero-bg.jpg'); }
      .loading-spinner { animation: spin 1s linear infinite; }
      @keyframes spin { to { transform: rotate(360deg); } }
    `;
    
    const style = document.createElement('style');
    style.textContent = criticalCSS;
    document.head.appendChild(style);
  };

  // Initialize all optimizations
  if (typeof window !== 'undefined') {
    // Run immediately
    preloadCriticalImages();
    addResourceHints();
    inlineCriticalCSS();
    
    // Run after DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', optimizeFonts);
    } else {
      optimizeFonts();
    }
  }
};

// Image optimization utilities
export const getOptimizedImageSrc = (src: string, width?: number, quality = 85) => {
  // For production, you might want to use a service like Cloudinary or ImageKit
  if (width) {
    return `${src}?w=${width}&q=${quality}`;
  }
  return src;
};

// Lazy loading with Intersection Observer
export const createLazyLoader = (threshold = 0.1, rootMargin = '100px') => {
  return new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          const src = img.dataset.src;
          if (src) {
            img.src = src;
            img.removeAttribute('data-src');
          }
          entry.target.classList.remove('lazy');
        }
      });
    },
    { threshold, rootMargin }
  );
};

// Performance monitoring
export const measurePerformance = () => {
  if (typeof window !== 'undefined' && 'performance' in window) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        const metrics = {
          FCP: performance.getEntriesByName('first-contentful-paint')[0]?.startTime,
          LCP: 0, // Would need PerformanceObserver for real LCP
          FID: 0, // Would need PerformanceObserver for real FID
          CLS: 0, // Would need PerformanceObserver for real CLS
          TTFB: perfData.responseStart - perfData.requestStart,
          domContentLoaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
          loadComplete: perfData.loadEventEnd - perfData.loadEventStart
        };
        
        console.log('Performance Metrics:', metrics);
      }, 0);
    });
  }
};