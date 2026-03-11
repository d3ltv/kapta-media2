import { useEffect, useState } from 'react';

/**
 * CounterStat - Statistique avec compteur animé
 * @param {Object} props
 * @param {number} props.value - Valeur finale du compteur
 * @param {string} props.unit - Unité (%, min, j, etc.)
 * @param {string} props.label - Label principal
 * @param {string} props.sublabel - Sous-label
 * @param {number} props.delay - Délai avant animation (ms)
 * @param {boolean} props.isInView - Si le composant est visible (passé par le parent)
 */
const CounterStat = ({ value, unit, label, sublabel, delay = 0, isInView = true }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!isInView || hasAnimated) return;

    // Délai avant de commencer l'animation
    const delayTimer = setTimeout(() => {
      setHasAnimated(true);
      const startTime = Date.now();
      const duration = 2000;

      const timer = setInterval(() => {
        const now = Date.now();
        const progress = Math.min((now - startTime) / duration, 1);
        
        // Easing function (easeOutCubic)
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        
        const currentCount = Math.floor(value * easeProgress);
        setCount(currentCount);

        if (progress === 1) {
          clearInterval(timer);
          setCount(value);
        }
      }, 16); // ~60fps

      return () => clearInterval(timer);
    }, delay);

    return () => clearTimeout(delayTimer);
  }, [isInView, value, hasAnimated, delay]);

  return (
    <div
      className="text-center p-4 md:p-6 bg-white dark:bg-[#1A1D24] rounded-xl border border-gray-100 dark:border-[#2A2E39] hover:border-[#1c3ff9]/20 dark:hover:border-[#1c3ff9]/30 hover:shadow-lg transition-all card-3d-subtle"
    >
      <div className="text-3xl md:text-5xl font-bold text-[#1c3ff9] dark:text-[#6B9FFF] mb-2 counter-animated">
        {count}<span className="text-xl md:text-3xl">{unit}</span>
      </div>
      <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
        <strong className="block text-gray-900 dark:text-gray-200 mb-1">{label}</strong>
        {sublabel}
      </div>
    </div>
  );
};

export default CounterStat;
