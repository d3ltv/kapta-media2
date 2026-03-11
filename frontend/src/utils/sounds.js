/**
 * Sound System - Sons subtils pour interactions
 * Utilise Web Audio API pour des sons légers et performants
 */

class SoundManager {
  constructor() {
    this.enabled = true;
    this.volume = 0.3;
    this.audioContext = null;
    this.sounds = {};
    
    // Initialiser l'AudioContext au premier clic (requis par les navigateurs)
    this.initOnFirstInteraction();
  }

  initOnFirstInteraction() {
    const init = () => {
      if (!this.audioContext) {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.createSounds();
      }
      document.removeEventListener('click', init);
      document.removeEventListener('touchstart', init);
    };

    document.addEventListener('click', init, { once: true });
    document.addEventListener('touchstart', init, { once: true });
  }

  createSounds() {
    // Créer des sons synthétiques légers
    this.sounds = {
      click: this.createTone(800, 0.05, 'sine'),
      hover: this.createTone(600, 0.03, 'sine'),
      success: this.createChord([523.25, 659.25, 783.99], 0.15), // Do-Mi-Sol
      error: this.createTone(200, 0.1, 'sawtooth'),
      pop: this.createTone(1000, 0.04, 'sine'),
      whoosh: this.createSweep(400, 800, 0.1)
    };
  }

  createTone(frequency, duration, type = 'sine') {
    return () => {
      if (!this.enabled || !this.audioContext) return;

      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);

      oscillator.frequency.value = frequency;
      oscillator.type = type;

      // Envelope ADSR simplifié
      gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(
        this.volume,
        this.audioContext.currentTime + 0.01
      );
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        this.audioContext.currentTime + duration
      );

      oscillator.start(this.audioContext.currentTime);
      oscillator.stop(this.audioContext.currentTime + duration);
    };
  }

  createChord(frequencies, duration) {
    return () => {
      if (!this.enabled || !this.audioContext) return;

      frequencies.forEach((freq, index) => {
        setTimeout(() => {
          const oscillator = this.audioContext.createOscillator();
          const gainNode = this.audioContext.createGain();

          oscillator.connect(gainNode);
          gainNode.connect(this.audioContext.destination);

          oscillator.frequency.value = freq;
          oscillator.type = 'sine';

          gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
          gainNode.gain.linearRampToValueAtTime(
            this.volume * 0.5,
            this.audioContext.currentTime + 0.01
          );
          gainNode.gain.exponentialRampToValueAtTime(
            0.01,
            this.audioContext.currentTime + duration
          );

          oscillator.start(this.audioContext.currentTime);
          oscillator.stop(this.audioContext.currentTime + duration);
        }, index * 50);
      });
    };
  }

  createSweep(startFreq, endFreq, duration) {
    return () => {
      if (!this.enabled || !this.audioContext) return;

      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);

      oscillator.frequency.setValueAtTime(startFreq, this.audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(
        endFreq,
        this.audioContext.currentTime + duration
      );

      gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(
        this.volume * 0.7,
        this.audioContext.currentTime + 0.01
      );
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        this.audioContext.currentTime + duration
      );

      oscillator.start(this.audioContext.currentTime);
      oscillator.stop(this.audioContext.currentTime + duration);
    };
  }

  play(soundName) {
    if (this.sounds[soundName]) {
      this.sounds[soundName]();
    }
  }

  setVolume(volume) {
    this.volume = Math.max(0, Math.min(1, volume));
  }

  toggle() {
    this.enabled = !this.enabled;
    return this.enabled;
  }

  enable() {
    this.enabled = true;
  }

  disable() {
    this.enabled = false;
  }
}

// Instance singleton
const soundManager = new SoundManager();

export default soundManager;

// Exports individuels pour facilité d'utilisation
export const playClick = () => soundManager.play('click');
export const playHover = () => soundManager.play('hover');
export const playSuccess = () => soundManager.play('success');
export const playError = () => soundManager.play('error');
export const playPop = () => soundManager.play('pop');
export const playWhoosh = () => soundManager.play('whoosh');
export const toggleSound = () => soundManager.toggle();
export const setSoundVolume = (volume) => soundManager.setVolume(volume);
