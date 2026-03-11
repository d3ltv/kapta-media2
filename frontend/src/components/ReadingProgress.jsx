import { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * ReadingProgress - Barre de progression de lecture
 * Montre l'avancement du scroll en haut de page
 */
const ReadingProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0052FF] via-[#1c3ff9] to-[#3B82F6] origin-left z-[100]"
      style={{ scaleX }}
    />
  );
};

export default ReadingProgress;
