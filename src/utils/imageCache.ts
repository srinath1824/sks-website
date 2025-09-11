// Image caching utilities for faster loading
const imageCache = new Map<string, HTMLImageElement>();

export const preloadImage = (src: string): Promise<HTMLImageElement> => {
  if (imageCache.has(src)) {
    return Promise.resolve(imageCache.get(src)!);
  }

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      imageCache.set(src, img);
      resolve(img);
    };
    img.onerror = reject;
    img.src = src;
  });
};

export const getCachedImage = (src: string): HTMLImageElement | null => {
  return imageCache.get(src) || null;
};

export const preloadCriticalImages = () => {
  // Only preload logo for fastest initial load
  preloadImage('/images/SKS_Logo_4K-1.png');
};