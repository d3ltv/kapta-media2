/**
 * Imports optimisés de Framer Motion
 * Utilise des imports ciblés pour réduire la taille du bundle
 * Au lieu de: import { motion, useInView, ... } from "framer-motion"
 */

// Exports ciblés pour tree-shaking optimal
export { motion } from 'framer-motion';
export { useInView } from 'framer-motion';
export { useTransform } from 'framer-motion';
export { AnimatePresence } from 'framer-motion';
export { useScroll } from 'framer-motion';
export { useSpring } from 'framer-motion';
export { useMotionValue } from 'framer-motion';
export { useAnimation } from 'framer-motion';

// Variantes d'animation réutilisables (évite la duplication)
export const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
};

export const fadeInDown = {
  initial: { opacity: 0, y: -30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
};

export const fadeInLeft = {
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
};

export const fadeInRight = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
};

export const slideInUp = {
  initial: { opacity: 0, y: 60, scale: 0.95 },
  animate: { opacity: 1, y: 0, scale: 1 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
};

export const rotateIn = {
  initial: { opacity: 0, rotate: -5, scale: 0.95 },
  animate: { opacity: 1, rotate: 0, scale: 1 },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
};

export const blurIn = {
  initial: { opacity: 0, filter: "blur(10px)" },
  animate: { opacity: 1, filter: "blur(0px)" },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
};

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

// Easing curves personnalisées
export const easings = {
  easeOutExpo: [0.19, 1, 0.22, 1],
  easeOutQuart: [0.25, 1, 0.5, 1],
  easeInOutCubic: [0.65, 0, 0.35, 1],
  spring: { type: "spring", stiffness: 300, damping: 30 }
};
