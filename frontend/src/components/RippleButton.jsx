import { useState } from 'react';
import haptics from '@/utils/haptics';
import { playClick } from '@/utils/sounds';

/**
 * RippleButton - Bouton avec effet ripple au clic + haptic feedback + son
 * @param {Object} props
 * @param {React.ReactNode} props.children - Contenu du bouton
 * @param {string} props.className - Classes CSS additionnelles
 * @param {Function} props.onClick - Fonction appelée au clic
 * @param {boolean} props.sound - Activer le son (default: true)
 * @param {Object} props.rest - Autres props du bouton
 */
const RippleButton = ({ children, className = '', onClick, sound = true, ...rest }) => {
  const [ripples, setRipples] = useState([]);

  const handleClick = (e) => {
    // Haptic feedback
    haptics.light();
    
    // Son
    if (sound) {
      playClick();
    }
    
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    const newRipple = {
      x,
      y,
      size,
      id: Date.now(),
    };

    setRipples((prev) => [...prev, newRipple]);

    // Supprimer le ripple après l'animation
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 600);

    // Appeler le onClick original
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <button
      className={`ripple-container ${className}`}
      onClick={handleClick}
      {...rest}
    >
      {children}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="ripple"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
          }}
        />
      ))}
    </button>
  );
};

export default RippleButton;
