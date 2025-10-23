// Simple scroll cache for better performance
const loadedImages = new Set<string>();

export const markAsLoaded = (src: string): void => {
  loadedImages.add(src);
};

export const isAlreadyLoaded = (src: string): boolean => {
  return loadedImages.has(src);
};