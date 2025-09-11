// Performance optimization utilities

// Debounce function for scroll events
export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Throttle function for resize events
export const throttle = <T extends (...args: any[]) => void>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Preload critical resources
export const preloadCriticalResources = () => {
  // Only preload hero image
  const img = new Image();
  img.src = '/images/SKS_Logo_4K-1.png';
};

// Optimize scroll performance
export const optimizeScrollPerformance = () => {
  // Add passive event listeners for better scroll performance
  const passiveSupported = (() => {
    let passive = false;
    try {
      const options = {
        get passive() {
          passive = true;
          return false;
        }
      };
      window.addEventListener('test', () => {}, options);
      window.removeEventListener('test', () => {}, options);
    } catch (err) {
      passive = false;
    }
    return passive;
  })();

  return passiveSupported ? { passive: true } : false;
};