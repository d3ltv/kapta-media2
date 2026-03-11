import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * MagneticButton - Bouton qui attire le curseur
 * Effet magnétique subtil (desktop uniquement)
 * @param {Object} props
 * @param {React.ReactNode} props.children - Contenu du bouton
 * @param {string} props.className - Classes CSS additionnelles
 * @param {number} props.strength - Force de l'attraction (default: 0.3)
 * @param {Function} props.onClick - Fonction appelée au clic
 */
const MagneticButton = ({ 
  children, 
  className = '', 
  strength = 0.3,
  onClick,
  ...rest 
}) => {
  const buttonRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;

    setPosition({ x: deltaX, y: deltaY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.button
      ref={buttonRef}
      className={`magnetic-button ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      {...rest}
    >
      {children}
    </motion.button>
  );
};

export default MagneticButton;
