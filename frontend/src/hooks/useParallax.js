import { useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

/**
 * Hook pour créer un effet parallax
 * @param {number} speed - Vitesse du parallax (0.5 = lent, 1 = normal, 2 = rapide)
 * @returns {Object} - { ref, y } pour appliquer à motion.div
 */
const useParallax = (speed = 0.5) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Transform scroll progress to Y position
  const y = useTransform(scrollYProgress, [0, 1], [0, speed * 100]);

  return { ref, y };
};

export default useParallax;
