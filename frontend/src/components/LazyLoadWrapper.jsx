import { Suspense } from 'react';

/**
 * Wrapper pour le lazy loading avec fallback optimisé
 * Évite les layout shifts pendant le chargement
 */
const LazyLoadWrapper = ({ 
  children, 
  fallback = null,
  minHeight = 'auto',
  className = ''
}) => {
  const defaultFallback = (
    <div 
      className={`flex items-center justify-center ${className}`}
      style={{ minHeight }}
    >
      <div className="animate-pulse flex space-x-2">
        <div className="w-2 h-2 bg-[#1c3ff9] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
        <div className="w-2 h-2 bg-[#1c3ff9] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
        <div className="w-2 h-2 bg-[#1c3ff9] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
      </div>
    </div>
  );

  return (
    <Suspense fallback={fallback || defaultFallback}>
      {children}
    </Suspense>
  );
};

export default LazyLoadWrapper;
