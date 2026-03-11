import { motion } from 'framer-motion';

/**
 * Waveform - Animation d'onde sonore
 * Effet visuel audio pour témoignages
 * @param {Object} props
 * @param {boolean} props.isPlaying - Si l'animation est active
 * @param {number} props.bars - Nombre de barres (default: 5)
 * @param {string} props.color - Couleur des barres (default: #1c3ff9)
 */
const Waveform = ({ isPlaying = true, bars = 5, color = '#1c3ff9' }) => {
  return (
    <div className="flex items-center gap-1 h-8">
      {Array.from({ length: bars }).map((_, i) => (
        <motion.div
          key={i}
          className="w-1 rounded-full"
          style={{ backgroundColor: color }}
          animate={
            isPlaying
              ? {
                  height: ['20%', '100%', '20%'],
                  opacity: [0.5, 1, 0.5]
                }
              : { height: '20%', opacity: 0.3 }
          }
          transition={{
            duration: 0.8,
            repeat: Infinity,
            delay: i * 0.1,
            ease: 'easeInOut'
          }}
        />
      ))}
    </div>
  );
};

export default Waveform;
