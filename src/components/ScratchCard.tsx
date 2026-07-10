import React, { useEffect, useRef, useState } from 'react';
import { Sparkles } from 'lucide-react';
import { playHoverSound } from '../utils/audio';

interface ScratchCardProps {
  onReveal: () => void;
  revealedContent: React.ReactNode;
}

export default function ScratchCard({ onReveal, revealedContent }: ScratchCardProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isScratching, setIsScratching] = useState(false);
  const [scratchPercent, setScratchPercent] = useState(0);
  const isScratchingRef = useRef(false);

  // Initialize the canvas and draw the gold layer
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const resizeCanvas = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (rect) {
        canvas.width = rect.width;
        canvas.height = rect.height || 180;
        drawGoldCover();
      }
    };

    const drawGoldCover = () => {
      const w = canvas.width;
      const h = canvas.height;

      ctx.save();
      // Premium metallic golden gradient
      const gradient = ctx.createLinearGradient(0, 0, w, h);
      gradient.addColorStop(0, '#fcd34d'); // Amber 300
      gradient.addColorStop(0.25, '#d97706'); // Amber 600
      gradient.addColorStop(0.5, '#fef08a'); // Yellow 200 (shine)
      gradient.addColorStop(0.75, '#b45309'); // Amber 700
      gradient.addColorStop(1, '#d97706'); // Amber 600

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, w, h);

      // Linen-like texture overlay
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.lineWidth = 1;
      for (let i = 0; i < w; i += 8) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, h);
        ctx.stroke();
      }
      for (let j = 0; j < h; j += 8) {
        ctx.beginPath();
        ctx.moveTo(0, j);
        ctx.lineTo(w, j);
        ctx.stroke();
      }

      // Elegant deep gold borders
      ctx.strokeStyle = '#78350f';
      ctx.lineWidth = 3;
      ctx.strokeRect(6, 6, w - 12, h - 12);

      ctx.strokeStyle = '#fef08a';
      ctx.lineWidth = 1;
      ctx.strokeRect(10, 10, w - 20, h - 20);

      // Traditional mandala design corner stars
      ctx.fillStyle = '#78350f';
      const drawCornerStar = (cx: number, cy: number) => {
        ctx.beginPath();
        for (let i = 0; i < 8; i++) {
          const angle = (i * Math.PI) / 4;
          const r = i % 2 === 0 ? 8 : 4;
          ctx.lineTo(cx + Math.cos(angle) * r, cy + Math.sin(angle) * r);
        }
        ctx.closePath();
        ctx.fill();
      };
      drawCornerStar(20, 20);
      drawCornerStar(w - 20, 20);
      drawCornerStar(20, h - 20);
      drawCornerStar(w - 20, h - 20);

      // Text instruction
      ctx.shadowColor = 'rgba(0, 0, 0, 0.35)';
      ctx.shadowBlur = 4;
      ctx.shadowOffsetX = 1;
      ctx.shadowOffsetY = 2;

      ctx.fillStyle = '#78350f';
      ctx.font = 'bold 16px "Inter", system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('🎉 Scratch to Reveal', w / 2, h / 2 - 12);
      ctx.fillText('Opening Date & Time', w / 2, h / 2 + 12);

      ctx.restore();
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [isRevealed]);

  // Robust calculation of coordinates on touch/mouse
  const getMousePos = (e: MouseEvent | TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();

    if ('touches' in e && e.touches && e.touches.length > 0) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    } else if ('changedTouches' in e && e.changedTouches && e.changedTouches.length > 0) {
      return {
        x: e.changedTouches[0].clientX - rect.left,
        y: e.changedTouches[0].clientY - rect.top,
      };
    } else {
      const mouseEvent = e as MouseEvent;
      return {
        x: mouseEvent.clientX - rect.left,
        y: mouseEvent.clientY - rect.top,
      };
    }
  };

  // Eraser drawing operation on the canvas
  const scratch = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.save();
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 24, 0, Math.PI * 2); // 24px brush radius for quick scratching feedback
    ctx.fill();
    ctx.restore();

    checkPercentage();
  };

  // Check how much of the gold cover has been erased
  const checkPercentage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;

    // Use a dense, robust sampling grid to evaluate scratched area
    const sampleCols = 15;
    const sampleRows = 10;
    let transparentCount = 0;
    const totalSamples = sampleCols * sampleRows;

    for (let c = 0; c < sampleCols; c++) {
      for (let r = 0; r < sampleRows; r++) {
        const x = Math.floor((c * w) / sampleCols) + 2;
        const y = Math.floor((r * h) / sampleRows) + 2;
        try {
          const imgData = ctx.getImageData(x, y, 1, 1).data;
          if (imgData[3] === 0) {
            transparentCount++;
          }
        } catch (e) {
          // Fallback if index is out of bounds
        }
      }
    }

    const percentage = (transparentCount / totalSamples) * 100;
    setScratchPercent(Math.floor(percentage));

    if (percentage > 45 && !isRevealed) {
      setIsRevealed(true);
      onReveal();
    }
  };

  // Connect native events for precise touch & mouse handling without lag or passive listener blocks
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;

    const handleStartEvent = (e: MouseEvent | TouchEvent) => {
      e.preventDefault();
      isScratchingRef.current = true;
      setIsScratching(true);
      const pos = getMousePos(e);
      scratch(pos.x, pos.y);
      playHoverSound();
    };

    const handleMoveEvent = (e: MouseEvent | TouchEvent) => {
      if (!isScratchingRef.current) return;
      e.preventDefault();
      const pos = getMousePos(e);
      scratch(pos.x, pos.y);
    };

    const handleEndEvent = () => {
      isScratchingRef.current = false;
      setIsScratching(false);
    };

    // Desktop Mouse binds
    canvas.addEventListener('mousedown', handleStartEvent);
    canvas.addEventListener('mousemove', handleMoveEvent);
    window.addEventListener('mouseup', handleEndEvent);

    // Mobile Touch binds with passive: false to allow preventDefault scrolling override
    canvas.addEventListener('touchstart', handleStartEvent, { passive: false });
    canvas.addEventListener('touchmove', handleMoveEvent, { passive: false });
    window.addEventListener('touchend', handleEndEvent);
    window.addEventListener('touchcancel', handleEndEvent);

    return () => {
      canvas.removeEventListener('mousedown', handleStartEvent);
      canvas.removeEventListener('mousemove', handleMoveEvent);
      window.removeEventListener('mouseup', handleEndEvent);

      canvas.removeEventListener('touchstart', handleStartEvent);
      canvas.removeEventListener('touchmove', handleMoveEvent);
      window.removeEventListener('touchend', handleEndEvent);
      window.removeEventListener('touchcancel', handleEndEvent);
    };
  }, [isRevealed]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full min-h-[160px] md:min-h-[180px] bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-dashed border-amber-300 rounded-2xl overflow-hidden shadow-inner flex items-center justify-center select-none"
    >
      {/* UNDERNEATH REVEALED CONTENT */}
      <div className="absolute inset-0 flex flex-col justify-center items-center p-4 text-center z-10 select-none">
        {revealedContent}
      </div>

      {/* CANVAS SCRATCH LAYER */}
      {!isRevealed && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full cursor-crosshair z-20 touch-none active:scale-[0.99] transition-transform duration-75"
        />
      )}

      {/* Percentage Indicator */}
      {!isRevealed && scratchPercent > 0 && (
        <div className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-md text-amber-300 font-mono text-[9px] px-2.5 py-0.5 rounded-full z-30 select-none border border-amber-500/20">
          {scratchPercent}% Scratched
        </div>
      )}
    </div>
  );
}
