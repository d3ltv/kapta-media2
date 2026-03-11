import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, X } from 'lucide-react';
import { playSuccess } from '@/utils/sounds';
import haptics from '@/utils/haptics';

/**
 * ScrollBadge - Badge "Vous avez tout lu !"
 * Apparaît quand l'utilisateur atteint la fin de la page
 */
const ScrollBadge = () => {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (dismissed) return;

      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const clientHeight = window.innerHeight;
      
      // Atteint 95% de la page
      const scrollPercentage = (scrollTop + clientHeight) / scrollHeight;
      
      if (scrollPercentage >= 0.95 && !show) {
        setShow(true);
        playSuccess();
        haptics.success();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [show, dismissed]);

  const handleDismiss = () => {
    setDismissed(true);
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && !dismissed && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="fixed bottom-24 right-6 z-50 max-w-sm"
        >
          <div className="glass-card p-4 rounded-2xl shadow-2xl border-2 border-[#1c3ff9]/30 dark:border-[#1c3ff9]/40">
            <button
              onClick={handleDismiss}
              className="absolute top-2 right-2 w-6 h-6 rounded-full bg-gray-100 dark:bg-[#2A2E39] flex items-center justify-center hover:bg-gray-200 dark:hover:bg-[#3A4356] transition-colors"
            >
              <X className="w-3 h-3 text-gray-600 dark:text-gray-400" />
            </button>

            <div className="flex items-start gap-3">
              <motion.div
                animate={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FFD700] to-[#FFA500] flex items-center justify-center flex-shrink-0"
              >
                <Trophy className="w-6 h-6 text-white" />
              </motion.div>

              <div className="flex-1">
                <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-1">
                  Bravo ! 🎉
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  Vous avez tout lu ! Prêt à booster votre visibilité ?
                </p>
                <button
                  onClick={() => {
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                    handleDismiss();
                  }}
                  className="w-full bg-gradient-to-r from-[#0052FF] to-[#1c3ff9] text-white text-sm font-semibold py-2 px-4 rounded-lg hover:shadow-lg transition-all"
                >
                  Réserver mon audit gratuit
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScrollBadge;
