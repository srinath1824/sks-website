// Performance optimization utilities

// Debounce function for scroll events
export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: number;
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

// Preload critical resources with priority
export const preloadCriticalResources = () => {
  if (typeof window === 'undefined') return;
  
  // Simple image preload without DOM manipulation
  const img = new Image();
  img.src = '/images/SKS_Logo_4K-1.png';
};

// Optimize scroll performance with passive listeners
export const optimizeScrollPerformance = () => {
  let passive = false;
  try {
    const options: AddEventListenerOptions = {
      get passive() {
        passive = true;
        return false;
      }
    };
    window.addEventListener('test' as keyof WindowEventMap, () => {}, options);
    window.removeEventListener('test' as keyof WindowEventMap, () => {}, options);
  } catch (err) {
    passive = false;
  }
  return passive ? { passive: true } : false;
};

// Resource hints for better loading
export const addResourceHints = () => {
  // Skip DOM manipulation that might cause issues
  return;
};

// Initialize performance optimizations
export const initPerformanceOptimizations = () => {
  if (typeof window === 'undefined') return;
  
  // Simple initialization without DOM manipulation
  preloadCriticalResources();
};