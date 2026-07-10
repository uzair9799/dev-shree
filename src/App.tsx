import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ParticleBackground from './components/ParticleBackground';
import InaugurationRibbon from './components/InaugurationRibbon';
import VelvetCurtains from './components/VelvetCurtains';
import InvitationCard, { INVITATION_CONFIG } from './components/InvitationCard';
import ConfettiBurster from './components/ConfettiBurster';
import CelebrationOverlay from './components/CelebrationOverlay';
import { playRibbonCutSound } from './utils/audio';
import GaneshLogo from './components/GaneshLogo';
import logoImg from '@/assets/logo.jpeg';

export default function App() {
  const [isRibbonCut, setIsRibbonCut] = useState(false);
  const [isCurtainsOpen, setIsCurtainsOpen] = useState(false);
  const [triggerConfetti, setTriggerConfetti] = useState(false);
  const [shakeActive, setShakeActive] = useState(false);
  const [isScratchCompleted, setIsScratchCompleted] = useState(false);

  const handleRibbonCut = () => {
    setIsRibbonCut(true);
    setTriggerConfetti(true);
    setShakeActive(true);

    // Subtle screen shake ends after 600ms
    setTimeout(() => {
      setShakeActive(false);
    }, 600);

    // Open curtains immediately after the ribbon is cut
    setTimeout(() => {
      setIsCurtainsOpen(true);
    }, 100);
  };

  const handleScratchComplete = () => {
    setIsScratchCompleted(true);
    // Play celebratory fanfares when scratch card is successfully revealed
    playRibbonCutSound();
  };

  // Screen shake animation variant for ribbon cutting impact
  const containerShakeVariants = {
    shake: {
      x: [0, -8, 8, -6, 6, -4, 4, -2, 2, 0],
      y: [0, 5, -5, 4, -4, 3, -3, 2, -2, 0],
      transition: { duration: 0.6, ease: 'easeInOut' }
    },
    stable: { x: 0, y: 0 }
  };

  return (
    <motion.main
      id="app-container"
      variants={containerShakeVariants}
      animate={shakeActive ? 'shake' : 'stable'}
      className="relative w-full min-h-screen bg-[#140202] text-amber-50 flex flex-col items-center justify-center p-4 md:p-6 overflow-x-hidden selection:bg-amber-800 selection:text-amber-100"
      style={{
        backgroundImage: 'radial-gradient(circle at center, #230404 0%, #0d0101 100%)',
      }}
    >
      {/* GLOBAL BACKGROUND PARTICLES */}
      <ParticleBackground />

      {/* FESTIVE CONFETTI BURST (Triggers on ribbon cut) */}
      <ConfettiBurster trigger={triggerConfetti} />

      {/* TASTEFUL CELEBRATIVE ENDING CANVAS (Triggers on scratch card reveal) */}
      <CelebrationOverlay active={isScratchCompleted} />

      {/* 3D VELVET CURTAINS LAYER */}
      <VelvetCurtains isOpened={isCurtainsOpen} />

      {/* FRONT INAUGURATION WELCOME SCREEN */}
      <AnimatePresence>
        {!isCurtainsOpen && (
          <motion.div
            id="welcome-content"
            className="absolute inset-x-4 inset-y-0 flex flex-col justify-between items-center z-45 py-10 md:py-14 text-center pointer-events-none select-none"
            exit={{
              opacity: 0,
              scale: 0.95,
              transition: { duration: 1.2, ease: 'easeInOut' }
            }}
          >
            {/* Elegant Welcome Header displaying Restaurant Logo / Placeholder */}
            <motion.div
              initial={{ opacity: 0, y: -40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className="flex flex-col items-center"
            >
              {/* Responsive Logo Container (Matches configuration) */}
              <div className="mb-4">
                <div 
                  className="w-24 h-24 md:w-28 md:h-28 flex items-center justify-center p-1 bg-white rounded-full shadow-2xl relative border-2 border-amber-500/40 overflow-hidden"
                  style={{
                    boxShadow: '0 12px 36px rgba(0, 0, 0, 0.7), inset 0 2px 4px rgba(255,255,255,0.2)'
                  }}
                >
                  <img
                    src={logoImg}
                    alt="Dev Shree South Kitchen Logo"
                    className="w-full h-full object-contain rounded-full"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              <span className="text-amber-500 font-sans tracking-[0.3em] font-extrabold text-[10px] md:text-xs uppercase mb-1.5">
                Grand Opening
              </span>
              <h1 className="text-4xl md:text-5xl font-display font-black tracking-wider text-amber-100 drop-shadow-[0_4px_12px_rgba(0,0,0,0.95)] px-2">
                Dev Shree
              </h1>
              <h2 className="text-2xl md:text-3xl font-serif text-amber-400 font-medium tracking-wide mt-0.5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
                South Kitchen
              </h2>
              <div className="w-24 h-[1.5px] bg-gradient-to-r from-transparent via-amber-500/60 to-transparent mt-4" />
            </motion.div>

            {/* INAUGURATION INSTRUCTION (Placed underneath the ribbon) */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
              className="flex flex-col items-center gap-2 px-4"
            >
              <span className="text-amber-300 font-sans tracking-[0.2em] font-extrabold text-xs md:text-sm uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] animate-pulse">
                ✦ Tap the ribbon to inaugurate ✦
              </span>
              <span className="text-gray-400 font-mono text-[9px] md:text-xs uppercase tracking-[0.15em] opacity-95 max-w-sm leading-relaxed">
                Inaugurate Dev Shree South Kitchen by cutting the sacred red ribbon
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* REACTIONAL INTERACTIVE RIBBON */}
      <InaugurationRibbon onCut={handleRibbonCut} />

      {/* REVEALED GRAND INVITATION CARD */}
      <AnimatePresence>
        {isCurtainsOpen && (
          <motion.div
            id="invitation-wrapper"
            className="w-full flex items-center justify-center py-6 md:py-10 z-20"
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0,
              transition: {
                type: 'spring',
                stiffness: 85,
                damping: 15,
                delay: 0.4
              }
            }}
          >
            <InvitationCard isVisible={isCurtainsOpen} onScratchComplete={handleScratchComplete} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.main>
  );
}
