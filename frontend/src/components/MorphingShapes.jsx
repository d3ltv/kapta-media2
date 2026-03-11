import { motion } from 'framer-motion';

/**
 * MorphingShapes - Formes géométriques animées en fond
 * Transformation fluide avec couleurs brand
 */
const MorphingShapes = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30" style={{ width: '100%', height: '100%' }}>
      {/* Cercle morphing */}
      <motion.div
        className="absolute top-20 right-20 w-64 h-64 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(28, 63, 249, 0.15) 0%, transparent 70%)',
          filter: 'blur(40px)'
        }}
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 30, 0],
          y: [0, -20, 0],
          rotate: [0, 90, 0]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />

      {/* Triangle morphing */}
      <motion.div
        className="absolute bottom-40 left-20 w-48 h-48"
        style={{
          background: 'linear-gradient(135deg, rgba(0, 82, 255, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)',
          clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
          filter: 'blur(30px)'
        }}
        animate={{
          scale: [1, 1.3, 1],
          rotate: [0, 120, 0],
          x: [0, -40, 0],
          y: [0, 30, 0]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />

      {/* Carré morphing */}
      <motion.div
        className="absolute top-1/2 left-1/3 w-40 h-40"
        style={{
          background: 'linear-gradient(45deg, rgba(28, 63, 249, 0.08) 0%, rgba(96, 165, 250, 0.08) 100%)',
          borderRadius: '20%',
          filter: 'blur(35px)'
        }}
        animate={{
          scale: [1, 1.4, 1],
          rotate: [0, 180, 360],
          borderRadius: ['20%', '50%', '20%'],
          x: [0, 50, 0],
          y: [0, -30, 0]
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />

      {/* Ellipse morphing */}
      <motion.div
        className="absolute bottom-20 right-1/4 w-56 h-32"
        style={{
          background: 'radial-gradient(ellipse, rgba(59, 130, 246, 0.12) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(45px)'
        }}
        animate={{
          scale: [1, 1.25, 1],
          scaleX: [1, 1.5, 1],
          scaleY: [1, 0.8, 1],
          rotate: [0, -45, 0],
          x: [0, -25, 0],
          y: [0, 20, 0]
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />
    </div>
  );
};

export default MorphingShapes;
