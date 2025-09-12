// Scroll position cache to prevent re-loading
const scrollCache = new Set<string>();

export const markAsLoaded = (componentId: string) => {
  scrollCache.add(componentId);
};

export const isAlreadyLoaded = (componentId: string): boolean => {
  return scrollCache.has(componentId);
};

export const clearScrollCache = () => {
  scrollCache.clear();
};