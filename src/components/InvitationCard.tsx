import { motion } from 'motion/react';
import { Calendar, Clock, MapPin, ExternalLink, Phone, Sparkles, Award } from 'lucide-react';
import { playHoverSound } from '../utils/audio';
import ScratchCard from './ScratchCard';
import GaneshLogo from './GaneshLogo';
import logoImg from '@/assets/logo.jpeg';
import idolImg from '@/assets/idol.png';

// Technical Requirements: Provide editable placeholders at the top of the file
export const INVITATION_CONFIG = {
  // Logo URL placeholder: If left empty, a gorgeous traditional vector logo is rendered instead
  restaurantLogo: logoImg, 
  
  // Restaurant Photo placeholder
  restaurantPhoto: logoImg,
  
  openingDate: "12 July 2026",
  openingTime: "10:00 AM Onwards",
  restaurantAddress: "Shop No. 5, Opposite Satnam Honda, Gopalpura Bypass, Tonk Road",
  googleMapsUrl: "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d222.44506780864015!2d75.79667570181462!3d26.867893799475468!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sat!4v1783718429360!5m2!1sen!2sat",
  googleMapsRedirectUrl: "https://www.google.com/maps?q=26.867893799475468,75.79667570181462",
  phone1: "8302893497",
  phone2: "7062001411",
};

interface InvitationCardProps {
  isVisible: boolean;
  onScratchComplete: () => void;
}

export default function InvitationCard({ isVisible, onScratchComplete }: InvitationCardProps) {
  if (!isVisible) return null;

  // Stagger animation container
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { type: 'spring', stiffness: 110, damping: 14 } 
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 1.06, y: 15 },
    show: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="relative w-full max-w-lg mx-auto bg-[#fffdf5] rounded-3xl border-4 border-amber-500/50 p-6 md:p-8 shadow-[0_30px_70px_rgba(0,0,0,0.85),inset_0_0_50px_rgba(217,119,6,0.06)] text-amber-950 overflow-hidden z-20"
      style={{
        backgroundImage: 'radial-gradient(#fdfbf2 30%, #fdf9e2 100%)'
      }}
    >
      {/* LUXURIOUS FILIGREE CORNER GRAPHICS */}
      <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-amber-500/60 rounded-tl-2xl pointer-events-none" />
      <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-amber-500/60 rounded-tr-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-amber-500/60 rounded-bl-2xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-amber-500/60 rounded-br-2xl pointer-events-none" />

      {/* AMBIENT HANGING BRASS DIYAS (Traditional Elegance) */}
      <div className="absolute top-0 left-5 w-6 h-24 flex flex-col items-center pointer-events-none">
        <div className="w-[1.5px] h-16 bg-gradient-to-b from-amber-600 to-amber-400" />
        <div className="w-4 h-4 bg-gradient-to-b from-amber-400 to-amber-700 rounded-full relative shadow-md">
          <div className="absolute -top-2.5 left-[5px] w-2 h-3.5 bg-amber-400 rounded-full origin-bottom animate-pulse blur-[0.5px]" 
               style={{
                 animationDuration: '1s',
                 background: 'radial-gradient(circle, #fef08a 0%, #f97316 70%)',
                 boxShadow: '0 0 8px #f59e0b'
               }}
          />
        </div>
      </div>

      <div className="absolute top-0 right-5 w-6 h-24 flex flex-col items-center pointer-events-none">
        <div className="w-[1.5px] h-16 bg-gradient-to-b from-amber-600 to-amber-400" />
        <div className="w-4 h-4 bg-gradient-to-b from-amber-400 to-amber-700 rounded-full relative shadow-md">
          <div className="absolute -top-2.5 left-[5px] w-2 h-3.5 bg-amber-400 rounded-full origin-bottom animate-pulse blur-[0.5px]" 
               style={{
                 animationDuration: '1.4s',
                 background: 'radial-gradient(circle, #fef08a 0%, #f97316 70%)',
                 boxShadow: '0 0 8px #f59e0b'
               }}
          />
        </div>
      </div>

      {/* DYNAMIC RESPONSIVE LOGO PORTAL */}
      <motion.div variants={itemVariants} className="w-full flex flex-col items-center mb-4">
        <div 
          className="w-24 h-24 md:w-28 md:h-28 flex items-center justify-center p-2 rounded-full shadow-lg relative bg-gradient-to-br from-[#fffdf5] to-[#fdf9e2] border-2 border-amber-500/40 overflow-hidden"
          style={{
            boxShadow: '0 10px 25px -5px rgba(217, 119, 6, 0.25), inset 0 2px 4px rgba(255,255,255,0.8)'
          }}
        >
          <img
            src={idolImg}
            alt="Lord Ganesha"
            className="w-full h-full object-contain"
            referrerPolicy="no-referrer"
          />
        </div>
      </motion.div>

      {/* BRANDING TITLES */}
      <motion.div variants={itemVariants} className="text-center mb-5">
        <span className="text-amber-600 font-sans tracking-[0.25em] font-extrabold text-[10px] md:text-xs uppercase block mb-1">
          🌸 Shubh Aarambh 🌸
        </span>
        <h1 className="text-3xl md:text-4xl font-serif tracking-tight text-red-950 font-black mb-0.5">
          Dev Shree
        </h1>
        <h2 className="text-2xl md:text-3xl font-serif text-amber-700 font-bold tracking-wide mb-2">
          South Kitchen
        </h2>
        <div className="flex items-center justify-center gap-2">
          <div className="h-[1px] w-6 bg-amber-400" />
          <span className="text-red-800 font-sans text-xs uppercase tracking-[0.25em] font-bold">
            Grand Opening
          </span>
          <div className="h-[1px] w-6 bg-amber-400" />
        </div>
      </motion.div>

      {/* RESTAURANT IMAGE WITH SMOOTH REVEAL */}
      <motion.div 
        variants={imageVariants} 
        className="relative mx-auto w-full aspect-[16/10] rounded-2xl overflow-hidden border-2 border-amber-500/30 p-1 bg-amber-50/50 shadow-md mb-6 group"
      >
        <div className="w-full h-full rounded-xl overflow-hidden relative">
          <img
            src={INVITATION_CONFIG.restaurantPhoto}
            alt="Dev Shree South Kitchen Interior Preview"
            className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-65" />
          <div className="absolute bottom-3 left-4 text-white font-mono text-[10px] tracking-widest uppercase bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/15">
            Preview Location Photo
          </div>
        </div>
      </motion.div>

      {/* SCRATCH CARD PORTAL */}
      <motion.div variants={itemVariants} className="mb-6">
        <ScratchCard
          onReveal={onScratchComplete}
          revealedContent={
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 120 }}
              className="flex flex-col items-center justify-center text-amber-950"
            >
              <div className="p-1.5 bg-amber-500/10 rounded-full mb-1">
                <Sparkles className="w-5 h-5 text-amber-600 animate-pulse" />
              </div>
              <span className="text-amber-800 font-sans text-xs uppercase tracking-widest font-extrabold mb-0.5">
                Grand Opening Revealed
              </span>
              <div className="text-xl md:text-2xl font-serif font-black text-red-950 flex items-center gap-2 my-1">
                <span>📅 {INVITATION_CONFIG.openingDate}</span>
              </div>
              <div className="text-sm md:text-base font-sans font-bold text-amber-800 flex items-center gap-1.5 mb-1.5">
                <span>🕙 {INVITATION_CONFIG.openingTime}</span>
              </div>
              <span className="text-[11px] font-mono uppercase tracking-[0.15em] text-amber-900 font-bold bg-amber-200/50 px-3 py-0.5 rounded-full">
                ✨ Celebrate with us! ✨
              </span>
            </motion.div>
          }
        />
      </motion.div>

      {/* CORE INVITATION DIALOG */}
      <motion.div variants={itemVariants} className="text-center px-1 md:px-4 mb-6">
        <p className="text-[#3f1f1f] font-serif text-sm md:text-[15px] leading-relaxed italic">
          "We warmly invite you and your family to the Grand Opening of <span className="font-bold text-red-950 not-italic">Dev Shree South Kitchen</span>. Join us as we celebrate this exciting new beginning with delicious food, warm hospitality, and unforgettable memories. Your presence will make this occasion even more special."
        </p>
      </motion.div>

      {/* LOCATION PANEL */}
      <motion.div 
        variants={itemVariants} 
        className="bg-amber-500/5 rounded-xl border border-amber-500/20 p-3.5 flex items-start gap-3 mb-6 text-left"
      >
        <div className="p-2 bg-amber-500/10 rounded-lg text-amber-800 mt-0.5">
          <MapPin className="w-4.5 h-4.5" />
        </div>
        <div className="flex-1">
          <span className="text-amber-800 font-mono text-[9px] uppercase tracking-wider block font-extrabold">
            Venue Address
          </span>
          <span className="text-[#2b1010] font-sans text-xs leading-relaxed block font-semibold mt-0.5">
            {INVITATION_CONFIG.restaurantAddress}
          </span>
        </div>
      </motion.div>

      {/* EMBEDDED INTERACTIVE GOOGLE MAP */}
      <motion.div 
        variants={itemVariants} 
        className="w-full aspect-[4/3] rounded-2xl overflow-hidden border-2 border-amber-500/30 p-1 bg-amber-50/50 shadow-md mb-6 relative group"
      >
        <iframe
          src={INVITATION_CONFIG.googleMapsUrl}
          className="w-full h-full rounded-xl border-0"
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer"
          title="Dev Shree South Kitchen Map Location"
        />
      </motion.div>

      {/* TWO PREMIUM CLICKABLE CALL BUTTONS */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 gap-3 mb-6">
        <a
          href={`tel:${INVITATION_CONFIG.phone1}`}
          onMouseEnter={playHoverSound}
          className="flex items-center justify-center gap-2 py-3 bg-white hover:bg-amber-50 border border-amber-500/30 text-amber-950 rounded-xl shadow-sm text-xs md:text-sm font-sans font-bold transition-all hover:border-amber-500"
        >
          <Phone className="w-4 h-4 text-green-700 animate-pulse" />
          <span>Call {INVITATION_CONFIG.phone1}</span>
        </a>
        <a
          href={`tel:${INVITATION_CONFIG.phone2}`}
          onMouseEnter={playHoverSound}
          className="flex items-center justify-center gap-2 py-3 bg-white hover:bg-amber-50 border border-amber-500/30 text-amber-950 rounded-xl shadow-sm text-xs md:text-sm font-sans font-bold transition-all hover:border-amber-500"
        >
          <Phone className="w-4 h-4 text-green-700 animate-pulse" />
          <span>Call {INVITATION_CONFIG.phone2}</span>
        </a>
      </motion.div>

      {/* GLOWING GOLDEN MAPS CTA BUTTON */}
      <motion.div variants={itemVariants} className="text-center relative">
        <div className="text-amber-500 text-sm tracking-widest mb-4">❖ ❖ ❖</div>

        <a
          href={INVITATION_CONFIG.googleMapsRedirectUrl}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={playHoverSound}
          className="relative inline-flex items-center justify-center gap-2 w-full px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-sans font-black rounded-xl shadow-[0_4px_25px_rgba(217,119,6,0.3)] hover:shadow-[0_8px_30px_rgba(217,119,6,0.5)] transition-all duration-300 overflow-hidden group border border-amber-400"
          style={{
            background: 'linear-gradient(135deg, #d97706 0%, #92400e 100%)',
          }}
        >
          {/* Shimmer light bar across button */}
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out" />
          
          <MapPin className="w-5 h-5 text-amber-200" />
          <span className="tracking-wider text-sm">📍 View Location</span>
          <ExternalLink className="w-4 h-4 text-amber-200/80 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>
      </motion.div>
    </motion.div>
  );
}
