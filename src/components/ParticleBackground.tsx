import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  decay: number;
  color: string;
  angle: number;
  spin: number;
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const particles: Particle[] = [];
    const maxParticles = 60;

    // Create custom gold/champagne color palette
    const goldPalette = [
      'rgba(212, 175, 55, ',  // Metallic Gold
      'rgba(255, 215, 0, ',   // Gold
      'rgba(243, 229, 171, ', // Vanilla Gold
      'rgba(230, 190, 138, ', // Soft Brass
      'rgba(255, 248, 220, ', // Cornsilk Light
    ];

    const createParticle = (isInitial = false): Particle => {
      const size = Math.random() * 3 + 1;
      const paletteColor = goldPalette[Math.floor(Math.random() * goldPalette.length)];
      return {
        x: Math.random() * width,
        y: isInitial ? Math.random() * height : height + 10,
        size,
        speedY: -(Math.random() * 0.7 + 0.3),
        speedX: Math.random() * 0.4 - 0.2,
        opacity: Math.random() * 0.5 + 0.2,
        decay: Math.random() * 0.002 + 0.001,
        color: paletteColor,
        angle: Math.random() * Math.PI * 2,
        spin: Math.random() * 0.02 - 0.01,
      };
    };

    // Populate initial particles
    for (let i = 0; i < maxParticles; i++) {
      particles.push(createParticle(true));
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Render a subtle gold radial ambient glow at the bottom-center
      const radialGlow = ctx.createRadialGradient(
        width / 2,
        height * 0.85,
        10,
        width / 2,
        height * 0.85,
        width * 0.6
      );
      radialGlow.addColorStop(0, 'rgba(114, 18, 18, 0.25)'); // Dark crimson glow
      radialGlow.addColorStop(0.5, 'rgba(212, 175, 55, 0.05)'); // Soft gold glow
      radialGlow.addColorStop(1, 'rgba(26, 4, 4, 0)');
      ctx.fillStyle = radialGlow;
      ctx.fillRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(p.angle) * 0.15;
        p.angle += p.spin;

        // Draw particle with outer glow
        ctx.beginPath();
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2);
        grad.addColorStop(0, p.color + p.opacity + ')');
        grad.addColorStop(0.5, p.color + (p.opacity * 0.4) + ')');
        grad.addColorStop(1, p.color + '0)');
        
        ctx.fillStyle = grad;
        ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
        ctx.fill();

        // Recycle particles that move off screen or fade out
        if (p.y < -10 || p.x < -10 || p.x > width + 10) {
          particles[i] = createParticle(false);
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="particle-canvas"
      className="absolute inset-0 w-full h-full pointer-events-none z-10 opacity-70"
    />
  );
}
