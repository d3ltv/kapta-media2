import { useState, useEffect } from 'react';

/**
 * useReducedMotion - Hook pour détecter prefers-reduced-motion
 * Respecte les préférences d'accessibilité de l'utilisateur
 * @returns {boolean} true si l'utilisateur préfère moins d'animations
 */
const useReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Vérifier la préférence système
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    // Définir l'état initial
    setPrefersReducedMotion(mediaQuery.matches);

    // Écouter les changements
    const handleChange = (event) => {
      setPrefersReducedMotion(event.matches);
      
      // Appliquer une classe globale pour faciliter le CSS
      if (event.matches) {
        document.documentElement.classList.add('reduce-motion');
      } else {
        document.documentElement.classList.remove('reduce-motion');
      }
    };

    // Appliquer la classe initiale
    if (mediaQuery.matches) {
      document.documentElement.classList.add('reduce-motion');
    }

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return prefersReducedMotion;
};

export default useReducedMotion;
