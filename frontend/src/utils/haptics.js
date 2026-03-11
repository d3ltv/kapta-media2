/**
 * Haptic Feedback - Vibrations tactiles pour mobile
 * Utilise l'API Vibration si disponible
 */

// Vérifier si l'API Vibration est supportée
const isSupported = () => {
  return 'vibrate' in navigator;
};

/**
 * Vibration légère - Pour les interactions subtiles
 * Ex: hover, focus, petits clics
 */
export const lightHaptic = () => {
  if (isSupported()) {
    navigator.vibrate(10);
  }
};

/**
 * Vibration moyenne - Pour les actions importantes
 * Ex: boutons, sélections, toggles
 */
export const mediumHaptic = () => {
  if (isSupported()) {
    navigator.vibrate(20);
  }
};

/**
 * Vibration forte - Pour les actions critiques
 * Ex: erreurs, confirmations, succès
 */
export const heavyHaptic = () => {
  if (isSupported()) {
    navigator.vibrate(40);
  }
};

/**
 * Pattern de succès - Double tap
 */
export const successHaptic = () => {
  if (isSupported()) {
    navigator.vibrate([20, 50, 20]);
  }
};

/**
 * Pattern d'erreur - Triple tap court
 */
export const errorHaptic = () => {
  if (isSupported()) {
    navigator.vibrate([10, 30, 10, 30, 10]);
  }
};

/**
 * Pattern de notification - Long puis court
 */
export const notificationHaptic = () => {
  if (isSupported()) {
    navigator.vibrate([30, 50, 10]);
  }
};

/**
 * Pattern de sélection - Tick rapide
 */
export const selectionHaptic = () => {
  if (isSupported()) {
    navigator.vibrate(5);
  }
};

/**
 * Annuler toute vibration en cours
 */
export const cancelHaptic = () => {
  if (isSupported()) {
    navigator.vibrate(0);
  }
};

export default {
  light: lightHaptic,
  medium: mediumHaptic,
  heavy: heavyHaptic,
  success: successHaptic,
  error: errorHaptic,
  notification: notificationHaptic,
  selection: selectionHaptic,
  cancel: cancelHaptic,
  isSupported
};
