/**
 * OptimizedImage Component
 * Image optimisée avec srcset, lazy loading, et dimensions explicites
 */

import { useState, useEffect } from 'react';

const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  className = '',
  loading = 'lazy',
  fetchPriority = 'auto',
  sizes = '100vw',
  onLoad,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  // Générer srcset automatiquement si l'image est locale
  const generateSrcSet = (imageSrc) => {
    if (!imageSrc.startsWith('/')) return null;
    
    const baseName = imageSrc.replace(/\.(webp|jpg|jpeg|png)$/, '');
    const ext = imageSrc.match(/\.(webp|jpg|jpeg|png)$/)?.[0] || '.webp';
    
    // Générer les variants 320w, 640w, 960w
    return `${baseName}-320w${ext} 320w, ${baseName}-640w${ext} 640w, ${baseName}-960w${ext} 960w, ${imageSrc} ${width}w`;
  };

  const srcSet = generateSrcSet(src);

  const handleLoad = () => {
    setIsLoaded(true);
    if (onLoad) onLoad();
  };

  const handleError = () => {
    setError(true);
    console.error(`Failed to load image: ${src}`);
  };

  return (
    <div 
      className={`relative overflow-hidden ${className}`}
      style={{ 
        aspectRatio: width && height ? `${width} / ${height}` : undefined 
      }}
    >
      {/* Placeholder pendant le chargement */}
      {!isLoaded && !error && (
        <div 
          className="absolute inset-0 bg-gray-100 animate-pulse"
          style={{ aspectRatio: width && height ? `${width} / ${height}` : undefined }}
        />
      )}
      
      {/* Image principale */}
      {!error && (
        <img
          src={src}
          srcSet={srcSet || undefined}
          sizes={sizes}
          alt={alt}
          width={width}
          height={height}
          loading={loading}
          fetchPriority={fetchPriority}
          onLoad={handleLoad}
          onError={handleError}
          className={`${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain'
          }}
          {...props}
        />
      )}
      
      {/* Fallback en cas d'erreur */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <span className="text-gray-400 text-sm">Image non disponible</span>
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;
