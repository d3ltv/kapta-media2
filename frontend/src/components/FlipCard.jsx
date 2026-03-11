import { useState } from 'react';
import { motion } from 'framer-motion';

/**
 * FlipCard - Carte qui se retourne en 3D
 * Recto = avant, verso = après
 * @param {Object} props
 * @param {React.ReactNode} props.front - Contenu du recto
 * @param {React.ReactNode} props.back - Contenu du verso
 * @param {string} props.className - Classes CSS additionnelles
 */
const FlipCard = ({ front, back, className = '' }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className={`flip-card-container ${className}`}
      onClick={() => setIsFlipped(!isFlipped)}
      style={{ perspective: '1000px', cursor: 'pointer' }}
    >
      <motion.div
        className="flip-card-inner relative w-full h-full"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{ 
          transformStyle: 'preserve-3d',
          width: '100%',
          height: '100%'
        }}
      >
        {/* Front */}
        <div
          className="flip-card-face absolute inset-0 w-full h-full"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden'
          }}
        >
          {front}
        </div>

        {/* Back */}
        <div
          className="flip-card-face absolute inset-0 w-full h-full"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
        >
          {back}
        </div>
      </motion.div>
    </div>
  );
};

export default FlipCard;
