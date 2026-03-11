import { useEffect, useState } from 'react';

/**
 * useKonamiCode - Hook pour détecter le Konami Code
 * ↑↑↓↓←→←→BA
 * @param {Function} callback - Fonction appelée quand le code est entré
 */
const useKonamiCode = (callback) => {
  const [keys, setKeys] = useState([]);
  const konamiCode = [
    'ArrowUp',
    'ArrowUp',
    'ArrowDown',
    'ArrowDown',
    'ArrowLeft',
    'ArrowRight',
    'ArrowLeft',
    'ArrowRight',
    'b',
    'a'
  ];

  useEffect(() => {
    const handleKeyDown = (e) => {
      setKeys((prevKeys) => {
        const newKeys = [...prevKeys, e.key].slice(-10); // Garder les 10 dernières touches
        
        // Vérifier si le code correspond
        const matches = konamiCode.every((key, index) => key === newKeys[index]);
        
        if (matches) {
          callback();
          return []; // Reset
        }
        
        return newKeys;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [callback, konamiCode]);

  return keys;
};

export default useKonamiCode;
