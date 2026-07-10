import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Scissors } from 'lucide-react';
import { playRibbonCutSound, playHoverSound } from '../utils/audio';

interface InaugurationRibbonProps {
  onCut: () => void;
}

export default function InaugurationRibbon({ onCut }: InaugurationRibbonProps) {
  const [isCut, setIsCut] = useState(false);

  const handleCut = () => {
    if (isCut) return;
    setIsCut(true);
    playRibbonCutSound();
    
    // Allow the ribbon snap animation to play out slightly before opening curtains
    setTimeout(() => {
      onCut();
    }, 900);
  };

  return (
    <div className={`absolute inset-0 flex items-center justify-center overflow-hidden z-40 select-none ${isCut ? 'pointer-events-none' : ''}`}>
      <AnimatePresence>
        {!isCut && (
          <div className="relative w-full h-40 flex items-center justify-center">
            {/* Ambient Background Glow behind Ribbon */}
            <div className="absolute w-full h-24 bg-gradient-to-r from-transparent via-amber-500/10 to-transparent blur-xl pointer-events-none" />

            {/* LEFT RIBBON HALF */}
            <motion.div
              id="left-ribbon"
              className="absolute left-0 right-[50%] h-14 md:h-16 flex items-center justify-end origin-left"
              style={{
                background: 'linear-gradient(to bottom, #7f1d1d 0%, #b91c1c 25%, #ef4444 50%, #b91c1c 75%, #7f1d1d 100%)',
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.4), inset 0 2px 4px rgba(255,255,255,0.2)',
                borderTop: '2px solid #f59e0b',
                borderBottom: '2px solid #f59e0b',
              }}
              exit={{
                x: '-110%',
                rotate: -20,
                scaleY: 0.8,
                transition: {
                  type: 'spring',
                  stiffness: 140,
                  damping: 12,
                  mass: 1.2,
                }
              }}
            >
              {/* Glossy Fabric Shine Overlays */}
              <div 
                className="absolute inset-0 opacity-20 pointer-events-none" 
                style={{
                  background: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.15) 10px, rgba(255,255,255,0.15) 20px)'
                }}
              />
              <div className="absolute inset-x-0 bottom-0 h-[4px] bg-amber-500 opacity-60" />
            </motion.div>

            {/* RIGHT RIBBON HALF */}
            <motion.div
              id="right-ribbon"
              className="absolute left-[50%] right-0 h-14 md:h-16 flex items-center justify-start origin-right"
              style={{
                background: 'linear-gradient(to bottom, #7f1d1d 0%, #b91c1c 25%, #ef4444 50%, #b91c1c 75%, #7f1d1d 100%)',
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.4), inset 0 2px 4px rgba(255,255,255,0.2)',
                borderTop: '2px solid #f59e0b',
                borderBottom: '2px solid #f59e0b',
              }}
              exit={{
                x: '110%',
                rotate: 20,
                scaleY: 0.8,
                transition: {
                  type: 'spring',
                  stiffness: 140,
                  damping: 12,
                  mass: 1.2,
                }
              }}
            >
              {/* Glossy Fabric Shine Overlays */}
              <div 
                className="absolute inset-0 opacity-20 pointer-events-none" 
                style={{
                  background: 'repeating-linear-gradient(-45deg, transparent, transparent 10px, rgba(255,255,255,0.15) 10px, rgba(255,255,255,0.15) 20px)'
                }}
              />
              <div className="absolute inset-x-0 bottom-0 h-[4px] bg-amber-500 opacity-60" />
            </motion.div>

            {/* GOLDEN SEAL (CUT POINT INTERACTION) */}
            <motion.button
              id="inauguration-seal"
              onClick={handleCut}
              onMouseEnter={playHoverSound}
              className="absolute z-50 flex flex-col items-center justify-center cursor-pointer focus:outline-none group"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              exit={{
                scale: 0,
                opacity: 0,
                rotate: 360,
                transition: { duration: 0.4, ease: 'easeInOut' }
              }}
            >
              {/* Pulsing Outer Aura */}
              <div className="absolute w-28 h-28 bg-amber-500/20 rounded-full animate-ping pointer-events-none duration-1000" />
              <div className="absolute w-24 h-24 bg-amber-400/30 rounded-full animate-pulse pointer-events-none" />

              {/* Gold Medal Outer Ring */}
              <div 
                className="relative w-20 h-20 md:w-22 md:h-22 rounded-full flex items-center justify-center border-4 border-amber-300"
                style={{
                  background: 'radial-gradient(circle, #fcd34d 0%, #b45309 60%, #78350f 100%)',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.6), inset 0 2px 4px rgba(255,255,255,0.4)',
                }}
              >
                {/* Traditional South Indian Mandala Motif Details */}
                <div className="absolute inset-1 rounded-full border border-dashed border-amber-200/50" />
                <div className="absolute inset-2 rounded-full border border-amber-400 opacity-30" />
                
                {/* Mandala Swirls or flower spokes in SVG */}
                <svg className="absolute inset-0 w-full h-full opacity-20 animate-spin-slow" viewBox="0 0 100 100">
                  <path d="M50 0 A50 50 0 0 1 100 50 A50 50 0 0 1 50 100 A50 50 0 0 1 0 50 A50 50 0 0 1 50 0" fill="none" stroke="currentColor" strokeWidth="2" className="text-amber-200" />
                  <path d="M50 10 L50 90 M10 50 L90 50 M22 22 L78 78 M22 78 L78 22" stroke="currentColor" strokeWidth="1" className="text-amber-200" />
                </svg>

                {/* Diya or Scissors Motif at Center */}
                <div className="flex flex-col items-center justify-center">
                  <Scissors className="w-8 h-8 text-amber-950 drop-shadow-[0_2px_2px_rgba(255,255,255,0.4)] group-hover:rotate-12 transition-transform duration-300" />
                </div>
              </div>

              {/* Call-to-Action Pulsing Label below Seal */}
              <div className="absolute -bottom-14 flex flex-col items-center justify-center pointer-events-none whitespace-nowrap">
                <span className="text-amber-400 font-sans tracking-[0.2em] font-semibold text-xs md:text-sm uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] animate-pulse">
                  TAP TO INAUGURATE
                </span>
                <span className="text-gray-300 font-mono text-[9px] uppercase tracking-wider opacity-80 mt-1">
                  Cut the sacred ribbon
                </span>
              </div>
            </motion.button>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
