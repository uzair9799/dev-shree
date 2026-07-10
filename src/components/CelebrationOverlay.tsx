import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  color: string;
  size: number;
  gravity: number;
  fade: number;
}

interface CelebrationOverlayProps {
  active: boolean;
}

export default function CelebrationOverlay({ active }: CelebrationOverlayProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!active) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles: Particle[] = [];
    const colors = [
      '#f59e0b', // Gold Amber
      '#fbbf24', // Yellow Gold
      '#ef4444', // Red
      '#b91c1c', // Deep Crimson
      '#10b981', // Emerald
      '#fef08a'  // Champagne
    ];

    const createFirework = (x: number, y: number) => {
      const numParticles = 40 + Math.floor(Math.random() * 30);
      const baseColor = colors[Math.floor(Math.random() * colors.length)];
      
      for (let i = 0; i < numParticles; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 5 + 2;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          color: Math.random() > 0.5 ? baseColor : '#fef08a',
          size: Math.random() * 2 + 1,
          gravity: 0.05,
          fade: Math.random() * 0.015 + 0.01,
        });
      }
    };

    // Auto spawn random fireworks periodically
    let fireworkTimer = 0;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const animate = () => {
      // Clear with slight trailing alpha to create subtle neon motion blur paths
      ctx.fillStyle = 'rgba(20, 2, 2, 0.15)';
      ctx.fillRect(0, 0, width, height);

      // Radial background light rays glow
      const radialGlow = ctx.createRadialGradient(
        width / 2,
        height / 2,
        20,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.7
      );
      radialGlow.addColorStop(0, 'rgba(217, 119, 6, 0.08)');
      radialGlow.addColorStop(0.5, 'rgba(185, 28, 28, 0.03)');
      radialGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = radialGlow;
      ctx.fillRect(0, 0, width, height);

      // Random firework spawn
      fireworkTimer++;
      if (fireworkTimer > 50) {
        createFirework(
          Math.random() * width,
          height * 0.15 + Math.random() * (height * 0.4)
        );
        fireworkTimer = 0;
      }

      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.vx *= 0.98; // air friction
        p.vy *= 0.98;
        p.alpha -= p.fade;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 6;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.restore();
      }

      animationId = requestAnimationFrame(animate);
    };

    // Initial burst on activation
    createFirework(width * 0.25, height * 0.3);
    createFirework(width * 0.75, height * 0.35);
    createFirework(width * 0.5, height * 0.25);

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, [active]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-80 mix-blend-screen"
    />
  );
}
