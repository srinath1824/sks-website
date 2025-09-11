// Image optimization utilities
export const getOptimizedImageUrl = (url: string, width = 400, height = 300, quality = 60) => {
  // For external URLs (Pexels, etc.), add optimization parameters
  if (url.includes('pexels.com')) {
    const baseUrl = url.split('?')[0];
    const params = new URLSearchParams();
    params.set('w', width.toString());
    params.set('h', height.toString());
    params.set('auto', 'compress');
    params.set('cs', 'tinysrgb');
    params.set('fit', 'crop');
    return `${baseUrl}?${params.toString()}`;
  }
  
  // For local images, return as-is (could be enhanced with a build-time optimization)
  return url;
};

// Preload critical images
export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
};

// Generate responsive image srcSet
export const generateSrcSet = (baseUrl: string, sizes: number[]) => {
  return sizes
    .map(size => `${getOptimizedImageUrl(baseUrl, size)} ${size}w`)
    .join(', ');
};