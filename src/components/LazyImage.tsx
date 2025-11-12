import React, { useState, useRef, useEffect } from 'react';
import { getCachedImage, setCachedImage } from '../utils/imageCache';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}

const LazyImage: React.FC<LazyImageProps> = ({ 
  src, 
  alt, 
  className = '',
  priority = false
}) => {
  const [isLoaded, setIsLoaded] = useState(() => !!getCachedImage(src));
  const [shouldLoad, setShouldLoad] = useState(priority || !!getCachedImage(src));
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (priority) {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '100px' }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    setCachedImage(src, img);
    setIsLoaded(true);
    setHasError(false);
  };

  const handleError = () => {
    console.warn(`Failed to load image: ${src}`);
    setHasError(true);
    setIsLoaded(true);
  };

  return (
    <div ref={imgRef} className={`${className} relative overflow-hidden bg-gray-100`}>
      {shouldLoad && !hasError && (
        <img
          src={src}
          alt={alt}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={handleLoad}
          onError={handleError}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={priority ? 'high' : 'auto'}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      )}
      {!isLoaded && shouldLoad && !hasError && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
      {hasError && (
        <div className="absolute inset-0 bg-gray-300 flex items-center justify-center text-gray-500 text-sm p-4 text-center">
          <div>
            <div className="mb-2">⚠️</div>
            <div>Image not available</div>
            <div className="text-xs mt-1 opacity-75">{src}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LazyImage;