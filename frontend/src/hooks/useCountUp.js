import { useEffect, useState } from 'react';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

/**
 * Hook pour animer un compteur qui monte
 * @param {number} end - Valeur finale
 * @param {number} duration - Durée de l'animation en ms (défaut: 2000)
 * @param {number} start - Valeur de départ (défaut: 0)
 * @returns {number} - Valeur actuelle du compteur
 */
const useCountUp = (end, duration = 2000, start = 0) => {
  const [count, setCount] = useState(start);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!isInView || hasAnimated) return;

    setHasAnimated(true);
    const startTime = Date.now();
    const range = end - start;

    const timer = setInterval(() => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      
      // Easing function (easeOutCubic)
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      
      const currentCount = Math.floor(start + range * easeProgress);
      setCount(currentCount);

      if (progress === 1) {
        clearInterval(timer);
        setCount(end);
      }
    }, 16); // ~60fps

    return () => clearInterval(timer);
  }, [isInView, end, duration, start, hasAnimated]);

  return { count, ref };
};

export default useCountUp;
