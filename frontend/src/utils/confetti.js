/**
 * Confetti - Explosion de particules bleues au clic
 * Utilise canvas pour des performances optimales
 */

import { playSuccess } from './sounds';

class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.velocity = {
      x: (Math.random() - 0.5) * 8,
      y: (Math.random() - 0.5) * 8 - 2
    };
    this.gravity = 0.3;
    this.friction = 0.98;
    this.opacity = 1;
    this.size = Math.random() * 4 + 2;
    this.rotation = Math.random() * 360;
    this.rotationSpeed = (Math.random() - 0.5) * 10;
  }

  update() {
    this.velocity.y += this.gravity;
    this.velocity.x *= this.friction;
    this.velocity.y *= this.friction;
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.opacity -= 0.015;
    this.rotation += this.rotationSpeed;
  }

  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.translate(this.x, this.y);
    ctx.rotate((this.rotation * Math.PI) / 180);
    ctx.fillStyle = this.color;
    ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
    ctx.restore();
  }

  isAlive() {
    return this.opacity > 0;
  }
}

export const triggerConfetti = (x, y) => {
  // Son de succès
  playSuccess();
  
  // Créer un canvas temporaire
  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '9999';
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  const particles = [];

  // Couleurs brand KAPTA
  const colors = [
    '#0052FF',
    '#1c3ff9',
    '#3B82F6',
    '#60A5FA',
    '#93C5FD'
  ];

  // Créer 50 particules
  for (let i = 0; i < 50; i++) {
    const color = colors[Math.floor(Math.random() * colors.length)];
    particles.push(new Particle(x, y, color));
  }

  // Animation loop
  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle, index) => {
      particle.update();
      particle.draw(ctx);

      if (!particle.isAlive()) {
        particles.splice(index, 1);
      }
    });

    if (particles.length > 0) {
      requestAnimationFrame(animate);
    } else {
      // Nettoyer le canvas quand terminé
      document.body.removeChild(canvas);
    }
  };

  animate();
};

export default triggerConfetti;
