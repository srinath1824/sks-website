import React, { useState, useRef, useEffect, memo } from 'react';
import { getCachedImage, setCachedImage } from '../utils/imageCache';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  width?: number;
  height?: number;
}

const LazyImage: React.FC<LazyImageProps> = memo(({ 
  src, 
  alt, 
  className = '',
  priority = false,
  width,
  height
}) => {
  const cachedImg = getCachedImage(src);
  const [isLoaded, setIsLoaded] = useState(!!cachedImg);
  const [shouldLoad, setShouldLoad] = useState(priority || !!cachedImg);
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
    setCachedImage(src, e.currentTarget);
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
  };

  if (hasError) {
    return <div className={`${className} bg-gray-200`} />;
  }

  return (
    <div ref={imgRef} className={`${className} bg-gray-100`}>
      {shouldLoad && (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="w-full h-full object-cover"
          onLoad={handleLoad}
          onError={handleError}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
        />
      )}
    </div>
  );
});

export default LazyImage;