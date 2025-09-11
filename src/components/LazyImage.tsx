import React, { useState, useRef, useEffect } from 'react';
import { getOptimizedImageUrl } from '../utils/imageOptimization';
import { getCachedImage } from '../utils/imageCache';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
}

const LazyImage: React.FC<LazyImageProps> = ({ 
  src, 
  alt, 
  className = ''
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Check if image is already cached
    const cachedImg = getCachedImage(src);
    if (cachedImg) {
      setIsLoaded(true);
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          setIsLoading(true);
          observer.disconnect();
        }
      },
      { threshold: 0.01, rootMargin: '100px' }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [src]);

  const optimizedSrc = getOptimizedImageUrl(src, 600, 400, 50);

  return (
    <div className={`${className} relative overflow-hidden`}>
      {!isLoaded && isInView && (
        <div className="absolute inset-0 bg-gray-200">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300 to-transparent animate-pulse"></div>
        </div>
      )}
      <img
        ref={imgRef}
        src={optimizedSrc}
        alt={alt}
        className={`w-full h-full object-cover ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}
        onLoad={() => {
          setIsLoaded(true);
          setIsLoading(false);
        }}
        onError={() => {
          setIsLoaded(true);
          setIsLoading(false);
        }}
        loading="lazy"
        decoding="async"
        fetchPriority="low"
      />
    </div>
  );
};

export default LazyImage;