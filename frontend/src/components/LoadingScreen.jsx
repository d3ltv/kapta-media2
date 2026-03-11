import { motion } from 'framer-motion';
import { useEffect } from 'react';

/**
 * LoadingScreen - Écran de chargement branded KAPTA
 * Simple et rapide, affiche uniquement le logo
 */
const LoadingScreen = ({ onComplete }) => {
  useEffect(() => {
    // Chargement rapide et simple
    const timer = setTimeout(() => {
      onComplete?.();
    }, 1200); // Réduit à 1.2 secondes

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[9999] bg-white dark:bg-[#050505] flex flex-col items-center justify-center"
    >
      {/* Logo animé */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="mb-6"
      >
        <img
          src="/logo-96.webp"
          alt="KAPTA Media"
          width="96"
          height="96"
          className="h-20 w-auto"
        />
      </motion.div>

      {/* Nom KAPTA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}
        className="flex items-baseline gap-1"
      >
        <span className="text-2xl font-black tracking-tight text-[#0A0A0A] dark:text-[#F3F6FF]">
          KAPTA
        </span>
        <span className="text-xl font-medium italic gradient-text-brand">
          media
        </span>
      </motion.div>
    </motion.div>
  );
};

export default LoadingScreen;
