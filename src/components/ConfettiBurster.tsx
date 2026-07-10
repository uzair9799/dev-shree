import { useEffect, useRef } from 'react';

interface ConfettiPiece {
  x: number;
  y: number;
  size: number;
  color: string;
  speedX: number;
  speedY: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  gravity: number;
  friction: number;
}

interface SparklePiece {
  x: number;
  y: number;
  size: number;
  color: string;
  speedX: number;
  speedY: number;
  opacity: number;
  decay: number;
}

interface ConfettiBursterProps {
  trigger: boolean;
}

export default function ConfettiBurster({ trigger }: ConfettiBursterProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!trigger) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    const width = (canvas.width = window.innerWidth);
    const height = (canvas.height = window.innerHeight);

    const confettis: ConfettiPiece[] = [];
    const sparkles: SparklePiece[] = [];

    // Premium Indian celebratory colors: crimson red, gold, emerald green, warm cream, orange marigold
    const colors = ['#b91c1c', '#fbbf24', '#f59e0b', '#16a34a', '#fffbeb', '#ea580c'];
    
    // Spawn explosion from the center of the screen
    const centerX = width / 2;
    const centerY = height / 2;

    // Create Confetti pieces
    for (let i = 0; i < 150; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 12 + 6;
      confettis.push({
        x: centerX,
        y: centerY,
        size: Math.random() * 8 + 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedX: Math.cos(angle) * speed,
        speedY: Math.sin(angle) * speed - (Math.random() * 4), // biased upwards
        rotation: Math.random() * 360,
        rotationSpeed: Math.random() * 8 - 4,
        opacity: 1,
        gravity: 0.18,
        friction: 0.97,
      });
    }

    // Create Golden sparkles
    for (let i = 0; i < 100; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 18 + 2;
      sparkles.push({
        x: centerX,
        y: centerY,
        size: Math.random() * 3 + 1,
        color: '#fef08a', // Yellow-50 glowing sparkle
        speedX: Math.cos(angle) * speed,
        speedY: Math.sin(angle) * speed,
        opacity: 1,
        decay: Math.random() * 0.02 + 0.015,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      let active = false;

      // Update and draw sparkles
      sparkles.forEach((s) => {
        if (s.opacity > 0) {
          active = true;
          s.x += s.speedX;
          s.y += s.speedY;
          s.speedX *= 0.95;
          s.speedY *= 0.95;
          s.opacity -= s.decay;

          ctx.beginPath();
          ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(253, 224, 71, ${Math.max(0, s.opacity)})`;
          ctx.shadowBlur = 10;
          ctx.shadowColor = '#fbbf24';
          ctx.fill();
          ctx.shadowBlur = 0; // reset
        }
      });

      // Update and draw confetti
      confettis.forEach((c) => {
        if (c.opacity > 0 && c.y < height + 20) {
          active = true;
          c.speedX *= c.friction;
          c.speedY *= c.friction;
          c.speedY += c.gravity;
          c.x += c.speedX;
          c.y += c.speedY;
          c.rotation += c.rotationSpeed;
          
          if (c.y > height - 100) {
            c.opacity -= 0.015; // fade out near floor
          }

          ctx.save();
          ctx.translate(c.x, c.y);
          ctx.rotate((c.rotation * Math.PI) / 180);
          ctx.fillStyle = c.color;
          ctx.globalAlpha = Math.max(0, c.opacity);
          
          // Draw metallic or shiny rect
          ctx.fillRect(-c.size / 2, -c.size / 2, c.size, c.size / 2);
          ctx.restore();
        }
      });

      if (active) {
        animationId = requestAnimationFrame(animate);
      }
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [trigger]);

  if (!trigger) return null;

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-50"
    />
  );
}
