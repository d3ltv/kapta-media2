import { useEffect, useState, useRef } from 'react';

/**
 * Hook pour détecter quand un élément entre dans le viewport
 * Utile pour le lazy loading des composants lourds
 * 
 * @param {Object} options - Options de l'Intersection Observer
 * @returns {[React.RefObject, boolean]} - [ref, isIntersecting]
 */
const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const targetRef = useRef(null);

  useEffect(() => {
    const target = targetRef.current;
    if (!target) return;

    // Options par défaut optimisées
    const defaultOptions = {
      root: null,
      rootMargin: '50px', // Charger 50px avant d'entrer dans le viewport
      threshold: 0.01,
      ...options,
    };

    const observer = new IntersectionObserver(([entry]) => {
      const isVisible = entry.isIntersecting;
      setIsIntersecting(isVisible);
      
      // Une fois visible, on garde en mémoire (pour lazy loading one-time)
      if (isVisible && !hasIntersected) {
        setHasIntersected(true);
      }
    }, defaultOptions);

    observer.observe(target);

    return () => {
      if (target) {
        observer.unobserve(target);
      }
    };
  }, [options.root, options.rootMargin, options.threshold, hasIntersected]);

  return [targetRef, isIntersecting, hasIntersected];
};

export default useIntersectionObserver;
