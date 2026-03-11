import { useState, useEffect } from 'react';

/**
 * useMouseGradient - Hook pour gradient qui suit le curseur
 * Crée un effet spotlight qui suit la souris
 * @param {string} color - Couleur du gradient (default: #1c3ff9)
 * @param {number} size - Taille du gradient en px (default: 600)
 * @param {number} opacity - Opacité du gradient (default: 0.15)
 */
const useMouseGradient = (color = '#1c3ff9', size = 600, opacity = 0.15) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsHovering(true);
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const gradientStyle = {
    background: isHovering
      ? `radial-gradient(${size}px circle at ${mousePosition.x}px ${mousePosition.y}px, ${color}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}, transparent 80%)`
      : 'transparent',
    transition: 'background 0.3s ease',
    pointerEvents: 'none'
  };

  return { mousePosition, isHovering, gradientStyle };
};

export default useMouseGradient;
