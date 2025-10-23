// Simple image cache for better performance
const imageCache = new Map<string, HTMLImageElement>();

export const getCachedImage = (src: string): HTMLImageElement | null => {
  return imageCache.get(src) || null;
};

export const setCachedImage = (src: string, img: HTMLImageElement): void => {
  imageCache.set(src, img);
};

export const preloadCriticalImages = (): void => {
  const criticalImages = [
    '/images/SKS_Logo_4K-1.png'
  ];

  criticalImages.forEach(src => {
    if (!imageCache.has(src)) {
      const img = new Image();
      img.src = src;
      img.onload = () => setCachedImage(src, img);
    }
  });
};