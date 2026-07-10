import { motion } from 'motion/react';

interface VelvetCurtainsProps {
  isOpened: boolean;
}

export default function VelvetCurtains({ isOpened }: VelvetCurtainsProps) {
  // We'll define realistic drapery fold styles using CSS gradients
  const leftCurtainGradient = 
    'linear-gradient(to right, ' +
    '#5c0d0d 0%, #7f1d1d 8%, #b91c1c 16%, #7f1d1d 24%, #5c0d0d 32%, ' +
    '#7f1d1d 40%, #b91c1c 48%, #7f1d1d 56%, #5c0d0d 64%, ' +
    '#7f1d1d 72%, #b91c1c 80%, #7f1d1d 88%, #3f0707 100%)';

  const rightCurtainGradient = 
    'linear-gradient(to left, ' +
    '#5c0d0d 0%, #7f1d1d 8%, #b91c1c 16%, #7f1d1d 24%, #5c0d0d 32%, ' +
    '#7f1d1d 40%, #b91c1c 48%, #7f1d1d 56%, #5c0d0d 64%, ' +
    '#7f1d1d 72%, #b91c1c 80%, #7f1d1d 88%, #3f0707 100%)';

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-30 select-none">
      {/* GOLDEN INAUGURAL BACK-GLOW (revealed behind parting curtains) */}
      <motion.div
        className="absolute inset-0 bg-radial-gradient flex items-center justify-center z-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isOpened ? {
          opacity: [0, 1, 0.4, 0],
          scale: [0.8, 1.2, 1.4, 1.5],
          transition: { duration: 2.2, ease: 'easeOut', delay: 0.1 }
        } : {}}
        style={{
          background: 'radial-gradient(circle, rgba(251,191,36,0.8) 0%, rgba(180,83,9,0.3) 50%, rgba(0,0,0,0) 70%)',
        }}
      />

      {/* LEFT CURTAIN */}
      <motion.div
        id="left-curtain"
        className="absolute left-0 top-0 bottom-0 w-[50%] h-full origin-left z-20 flex"
        style={{
          background: leftCurtainGradient,
          boxShadow: '8px 0 24px rgba(0, 0, 0, 0.6)',
        }}
        animate={isOpened ? {
          x: '-102%',
          skewY: -1,
          transition: {
            duration: 1.8,
            ease: [0.25, 1, 0.5, 1], // Custom premium slow-deceleration curve
          }
        } : { x: '0%' }}
      >
        {/* Shadow and trim overlay */}
        <div className="absolute right-0 top-0 bottom-0 w-3 bg-gradient-to-r from-transparent to-black/40" />
        <div className="absolute left-4 top-0 bottom-0 w-[1px] bg-amber-400/20" />
      </motion.div>

      {/* RIGHT CURTAIN */}
      <motion.div
        id="right-curtain"
        className="absolute right-0 top-0 bottom-0 w-[50%] h-full origin-right z-20"
        style={{
          background: rightCurtainGradient,
          boxShadow: '-8px 0 24px rgba(0, 0, 0, 0.6)',
        }}
        animate={isOpened ? {
          x: '102%',
          skewY: 1,
          transition: {
            duration: 1.8,
            ease: [0.25, 1, 0.5, 1],
          }
        } : { x: '0%' }}
      >
        {/* Shadow and trim overlay */}
        <div className="absolute left-0 top-0 bottom-0 w-3 bg-gradient-to-l from-transparent to-black/40" />
        <div className="absolute right-4 top-0 bottom-0 w-[1px] bg-amber-400/20" />
      </motion.div>

      {/* GOLDEN CURTAIN ROPES AND TASSELS */}
      <div className="absolute inset-x-0 top-0 bottom-0 z-25 flex justify-between px-2 md:px-8 pointer-events-none">
        {/* Left Tassel */}
        <motion.div
          id="left-tassel"
          className="absolute left-4 md:left-12 top-[45%] flex flex-col items-center"
          animate={isOpened ? {
            x: '-150%',
            rotate: -15,
            opacity: 0,
            transition: { duration: 1.5, ease: 'easeIn' }
          } : {
            x: 0,
            rotate: [0, 1.5, -1.5, 0],
            transition: { repeat: Infinity, duration: 4, ease: 'easeInOut' }
          }}
        >
          {/* Braided Cord */}
          <div 
            className="w-1.5 md:w-2 h-44 rounded-full border border-amber-300/30 shadow-md"
            style={{
              background: 'linear-gradient(to bottom, #d97706, #fbbf24, #b45309)',
            }}
          />
          {/* Hanging Fringe Ornament */}
          <div 
            className="w-4 h-8 md:w-5 md:h-10 rounded-b-full border-t border-amber-300 flex items-center justify-center relative shadow-lg"
            style={{
              background: 'radial-gradient(circle, #fbbf24 0%, #b45309 100%)',
            }}
          >
            {/* Tassel fringe visual strands */}
            <div className="absolute bottom-0 inset-x-0 h-4 bg-amber-200/40 rounded-b-full blur-[0.5px]" />
          </div>
        </motion.div>

        {/* Right Tassel */}
        <motion.div
          id="right-tassel"
          className="absolute right-4 md:right-12 top-[45%] flex flex-col items-center"
          animate={isOpened ? {
            x: '150%',
            rotate: 15,
            opacity: 0,
            transition: { duration: 1.5, ease: 'easeIn' }
          } : {
            x: 0,
            rotate: [0, -1.5, 1.5, 0],
            transition: { repeat: Infinity, duration: 4, ease: 'easeInOut' }
          }}
        >
          {/* Braided Cord */}
          <div 
            className="w-1.5 md:w-2 h-44 rounded-full border border-amber-300/30 shadow-md"
            style={{
              background: 'linear-gradient(to bottom, #d97706, #fbbf24, #b45309)',
            }}
          />
          {/* Hanging Fringe Ornament */}
          <div 
            className="w-4 h-8 md:w-5 md:h-10 rounded-b-full border-t border-amber-300 flex items-center justify-center relative shadow-lg"
            style={{
              background: 'radial-gradient(circle, #fbbf24 0%, #b45309 100%)',
            }}
          >
            <div className="absolute bottom-0 inset-x-0 h-4 bg-amber-200/40 rounded-b-full blur-[0.5px]" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
