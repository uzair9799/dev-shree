import React from 'react';

interface GaneshLogoProps {
  className?: string;
  size?: number;
}

export default function GaneshLogo({ className = '', size = 96 }: GaneshLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} filter drop-shadow-[0_4px_12px_rgba(217,119,6,0.35)]`}
    >
      <defs>
        {/* Luxurious golden gradients */}
        <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fef08a" /> {/* Yellow 200 */}
          <stop offset="30%" stopColor="#fbbf24" /> {/* Amber 400 */}
          <stop offset="60%" stopColor="#d97706" /> {/* Amber 600 */}
          <stop offset="85%" stopColor="#b45309" /> {/* Amber 700 */}
          <stop offset="100%" stopColor="#78350f" /> {/* Amber 900 */}
        </linearGradient>
        
        <linearGradient id="saffronGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ea580c" />
          <stop offset="50%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#ea580c" />
        </linearGradient>

        <radialGradient id="sunburst" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fef08a" stopOpacity="0.7" />
          <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#78350f" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Decorative Sunburst / Aura background */}
      <circle cx="50" cy="50" r="46" fill="url(#sunburst)" />
      
      {/* Outer elegant dash ring */}
      <circle
        cx="50"
        cy="50"
        r="43"
        stroke="url(#goldGrad)"
        strokeWidth="1.5"
        strokeDasharray="4 3"
      />

      {/* Inner thin border */}
      <circle cx="50" cy="50" r="40" stroke="#b45309" strokeWidth="0.8" strokeOpacity="0.5" />

      {/* LORD GANESHA ARTWORK PATHS */}
      <g id="ganesha-figure">
        {/* Crown (Mukut) - Royal tiered structure */}
        <path
          d="M 38,32 C 42,16 46,12 50,8 C 54,12 58,16 62,32 C 58,30 52,29 50,29 C 48,29 42,30 38,32 Z"
          fill="url(#goldGrad)"
          stroke="#78350f"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Crown horizontal tiers */}
        <path
          d="M 39.5,27 C 44,24 47,23 50,23 C 53,23 56,24 60.5,27"
          stroke="#78350f"
          strokeWidth="1"
          strokeLinecap="round"
        />
        <path
          d="M 42,21 C 45,19 47,18 50,18 C 53,18 55,19 58,21"
          stroke="#78350f"
          strokeWidth="1"
          strokeLinecap="round"
        />
        {/* Red Jewel on Crown peak */}
        <circle cx="50" cy="8" r="2.2" fill="#dc2626" stroke="#78350f" strokeWidth="0.6" />
        
        {/* Crown Base Band */}
        <path
          d="M 35,32 C 45,30 55,30 65,32 L 63,35 C 55,33 45,33 37,35 Z"
          fill="#b45309"
          stroke="#78350f"
          strokeWidth="0.8"
        />

        {/* Ears (Suprakarnaka) - Wide, flowing, and magnificent */}
        {/* Left Ear */}
        <path
          d="M 36,34 C 20,32 14,48 24,58 C 28,62 33,63 35,58 C 34,50 35,42 36,34 Z"
          fill="url(#goldGrad)"
          stroke="#78350f"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Left ear inner details */}
        <path
          d="M 31,40 C 23,40 20,48 26,52"
          stroke="#92400e"
          strokeWidth="0.8"
          strokeLinecap="round"
        />

        {/* Right Ear */}
        <path
          d="M 64,34 C 80,32 86,48 76,58 C 72,62 67,63 65,58 C 66,50 65,42 64,34 Z"
          fill="url(#goldGrad)"
          stroke="#78350f"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Right ear inner details */}
        <path
          d="M 69,40 C 77,40 80,48 74,52"
          stroke="#92400e"
          strokeWidth="0.8"
          strokeLinecap="round"
        />

        {/* Head and Flowing Trunk (Vakratunda) */}
        {/* The trunk starts from forehead, goes down, sweeps elegantly to the left, and completes with a curve */}
        <path
          d="M 36,35 C 38,48 42,54 44,60 C 46,66 45,74 41,78 C 38,81 33,80 32,75 C 31,70 35,66 38,66 C 41,66 43,70 41.5,74 C 40,78 35,76 35,73 C 35,70 40,64 38,55 C 36,46 36,38 36,35"
          fill="url(#goldGrad)"
          stroke="#78350f"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Main Face & Trunk Outline Sweep */}
        <path
          d="M 64,35 C 64,48 62,55 58,62 C 54,69 51,76 53,82 C 54.5,86 58,87 61,84 C 64,81 65,76 61,72 C 58,69 55,71 55,75 C 55,79 59,80 59,82 C 59,84 55,83 54,80 C 52,74 55,67 59,58 C 62,49 64,41 64,35"
          fill="url(#goldGrad)"
          stroke="#78350f"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Connecting the forehead */}
        <path
          d="M 36,35 C 45,33 55,33 64,35"
          stroke="#78350f"
          strokeWidth="1"
          strokeLinecap="round"
        />

        {/* Tusk (Ekadanta) - Beautiful little white tusk on the left */}
        <path
          d="M 37,50 L 30,52 L 36,54 Z"
          fill="#ffffff"
          stroke="#78350f"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
        
        {/* Broken Tusk on the right */}
        <path
          d="M 63,50 L 67,51 L 64,53 Z"
          fill="#ffffff"
          stroke="#78350f"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />

        {/* Auspicious Red & Saffron Tilak (Trishula Mark) on Forehead */}
        {/* Saffron background of Tilak */}
        <path
          d="M 46,38 C 46,38 48,46 50,46 C 52,46 54,38 54,38 Z"
          fill="url(#saffronGrad)"
          stroke="#c2410c"
          strokeWidth="0.5"
        />
        {/* Red central vertical streak */}
        <path
          d="M 49.2,36 L 50.8,36 L 50.5,44 L 49.5,44 Z"
          fill="#dc2626"
        />
        {/* Golden bindi/accent point */}
        <circle cx="50" cy="43" r="1" fill="#fef08a" />

        {/* Serene eyes of Lord Ganesha */}
        {/* Left Eye */}
        <path
          d="M 39,43 C 41,41 43,41 44,43"
          stroke="#78350f"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        {/* Right Eye */}
        <path
          d="M 61,43 C 59,41 57,41 56,43"
          stroke="#78350f"
          strokeWidth="1.2"
          strokeLinecap="round"
        />

        {/* Sweet Modak (auspicious treat) in the center bottom */}
        <path
          d="M 50,71 C 48,71 47,73 47,75 C 47,78 50,81 50,81 C 50,81 53,78 53,75 C 53,73 52,71 50,71 Z"
          fill="url(#goldGrad)"
          stroke="#78350f"
          strokeWidth="0.8"
        />
      </g>
    </svg>
  );
}
