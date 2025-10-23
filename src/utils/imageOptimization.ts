// Simple image optimization utility
export const getOptimizedImageUrl = (
  src: string, 
  width?: number, 
  height?: number, 
  quality?: number
): string => {
  // For local images, return as-is
  if (src.startsWith('/') || src.startsWith('./')) {
    return src;
  }
  
  // For external images, return as-is (can be enhanced with CDN later)
  return src;
};