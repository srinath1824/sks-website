// Web Vitals monitoring for RUM scores
export const reportWebVitals = () => {
  if (typeof window === 'undefined') return;

  // Core Web Vitals monitoring
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      const { name, startTime, value } = entry as any;
      
      switch (name) {
        case 'first-contentful-paint':
          console.log('FCP:', value);
          break;
        case 'largest-contentful-paint':
          console.log('LCP:', value);
          break;
        case 'first-input-delay':
          console.log('FID:', value);
          break;
        case 'cumulative-layout-shift':
          console.log('CLS:', value);
          break;
      }
    }
  });

  // Observe paint and layout shift entries
  observer.observe({ entryTypes: ['paint', 'largest-contentful-paint', 'first-input', 'layout-shift'] });

  // Measure Time to Interactive (TTI)
  window.addEventListener('load', () => {
    setTimeout(() => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      const tti = navigation.domInteractive - navigation.fetchStart;
      console.log('TTI:', tti);
    }, 0);
  });
};

// Optimize Critical Rendering Path
export const optimizeCRP = () => {
  // Inline critical CSS
  const criticalCSS = `
    .hero-section { 
      background-image: url('https://images.pexels.com/photos/3822621/pexels-photo-3822621.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop');
      background-size: cover;
      background-position: center;
    }
    .loading { opacity: 0; }
    .loaded { opacity: 1; transition: opacity 0.3s; }
  `;
  
  const style = document.createElement('style');
  style.textContent = criticalCSS;
  document.head.appendChild(style);
};

// Preload critical resources
export const preloadCriticalResources = () => {
  const resources = [
    { href: 'https://images.pexels.com/photos/3822621/pexels-photo-3822621.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop', as: 'image' },
    { href: '/images/SKS_Logo_4K-1.png', as: 'image' }
  ];

  resources.forEach(resource => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = resource.href;
    link.as = resource.as;
    if (resource.as === 'image') {
      link.fetchPriority = 'high';
    }
    document.head.appendChild(link);
  });
};