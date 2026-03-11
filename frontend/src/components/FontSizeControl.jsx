import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Type, Minus, Plus } from 'lucide-react';

/**
 * FontSizeControl - Contrôle de la taille de texte
 * Accessibilité - Ajustement +/-
 */
const FontSizeControl = ({ className = '' }) => {
  const [fontSize, setFontSize] = useState(100); // Pourcentage
  const minSize = 80;
  const maxSize = 120;
  const step = 10;

  useEffect(() => {
    // Charger la préférence sauvegardée
    const saved = localStorage.getItem('kapta-font-size');
    if (saved) {
      const size = parseInt(saved, 10);
      setFontSize(size);
      applyFontSize(size);
    }
  }, []);

  const applyFontSize = (size) => {
    document.documentElement.style.fontSize = `${size}%`;
  };

  const increase = () => {
    if (fontSize < maxSize) {
      const newSize = fontSize + step;
      setFontSize(newSize);
      applyFontSize(newSize);
      localStorage.setItem('kapta-font-size', newSize.toString());
    }
  };

  const decrease = () => {
    if (fontSize > minSize) {
      const newSize = fontSize - step;
      setFontSize(newSize);
      applyFontSize(newSize);
      localStorage.setItem('kapta-font-size', newSize.toString());
    }
  };

  const reset = () => {
    setFontSize(100);
    applyFontSize(100);
    localStorage.setItem('kapta-font-size', '100');
  };

  return (
    <div className={`inline-flex items-center gap-2 rounded-xl border border-gray-200 dark:border-[#2A2E39] bg-white dark:bg-[#1A1D24] px-3 py-2 ${className}`}>
      <Type className="w-4 h-4 text-gray-600 dark:text-gray-400" />
      
      <div className="flex items-center gap-1">
        <motion.button
          onClick={decrease}
          disabled={fontSize <= minSize}
          className="w-7 h-7 rounded-lg bg-gray-100 dark:bg-[#2A2E39] flex items-center justify-center hover:bg-gray-200 dark:hover:bg-[#3A4356] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          whileHover={{ scale: fontSize > minSize ? 1.05 : 1 }}
          whileTap={{ scale: fontSize > minSize ? 0.95 : 1 }}
        >
          <Minus className="w-3 h-3 text-gray-700 dark:text-gray-300" />
        </motion.button>

        <button
          onClick={reset}
          className="min-w-[3rem] px-2 py-1 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:text-[#1c3ff9] dark:hover:text-[#6B9FFF] transition-colors"
        >
          {fontSize}%
        </button>

        <motion.button
          onClick={increase}
          disabled={fontSize >= maxSize}
          className="w-7 h-7 rounded-lg bg-gray-100 dark:bg-[#2A2E39] flex items-center justify-center hover:bg-gray-200 dark:hover:bg-[#3A4356] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          whileHover={{ scale: fontSize < maxSize ? 1.05 : 1 }}
          whileTap={{ scale: fontSize < maxSize ? 0.95 : 1 }}
        >
          <Plus className="w-3 h-3 text-gray-700 dark:text-gray-300" />
        </motion.button>
      </div>
    </div>
  );
};

export default FontSizeControl;
