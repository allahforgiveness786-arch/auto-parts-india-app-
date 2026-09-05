import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface SplashScreenProps {
  onFinish?: () => void;
  minDurationMs?: number;
  isReady?: boolean;
}

export default function SplashScreen({
  onFinish,
  minDurationMs = 2200,
  isReady = true
}: SplashScreenProps) {
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Prevent scrolling while splash screen is active
    const originalOverflow = document.body.style.overflow;
    const originalTouchAction = document.body.style.touchAction;
    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";

    const timer = setTimeout(() => {
      if (isReady) {
        setIsDone(true);
        if (onFinish) {
          onFinish();
        }
      }
    }, minDurationMs);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = originalOverflow;
      document.body.style.touchAction = originalTouchAction;
    };
  }, [minDurationMs, isReady, onFinish]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          key="native-mobile-splash-screen"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: 1.02,
            filter: "blur(6px)",
            transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } 
          }}
          className="fixed inset-0 z-[99999] w-screen h-screen bg-[#0047BA] flex flex-col items-center justify-between p-6 select-none overflow-hidden touch-none"
          style={{ height: "100dvh", width: "100vw" }}
          id="app-native-splash-screen"
        >
          {/* Subtle Ambient Background Watermark Gears */}
          <div className="absolute top-[-30px] right-[-30px] opacity-25 pointer-events-none">
            <svg width="180" height="180" viewBox="0 0 100 100" fill="none">
              <path
                d="M 50 15 L 54 15 L 56 22 L 63 25 L 68 20 L 73 24 L 70 31 L 76 37 L 83 35 L 85 41 L 79 46 L 80 54 L 86 58 L 84 65 L 77 64 L 72 70 L 74 77 L 69 81 L 63 76 L 56 79 L 54 86 L 47 86 L 45 79 L 38 76 L 33 81 L 28 77 L 30 70 L 25 64 L 18 65 L 16 58 L 22 54 L 21 46 L 15 41 L 17 35 L 24 37 L 30 31 L 27 24 L 32 20 L 37 25 L 44 22 Z"
                fill="#005EE6"
              />
              <circle cx="50" cy="50" r="18" fill="#0047BA" />
            </svg>
          </div>

          <div className="absolute bottom-[80px] left-[-40px] opacity-20 pointer-events-none">
            <svg width="150" height="150" viewBox="0 0 100 100" fill="none">
              <path
                d="M 50 15 L 54 15 L 56 22 L 63 25 L 68 20 L 73 24 L 70 31 L 76 37 L 83 35 L 85 41 L 79 46 L 80 54 L 86 58 L 84 65 L 77 64 L 72 70 L 74 77 L 69 81 L 63 76 L 56 79 L 54 86 L 47 86 L 45 79 L 38 76 L 33 81 L 28 77 L 30 70 L 25 64 L 18 65 L 16 58 L 22 54 L 21 46 L 15 41 L 17 35 L 24 37 L 30 31 L 27 24 L 32 20 L 37 25 L 44 22 Z"
                fill="#005EE6"
              />
              <circle cx="50" cy="50" r="16" fill="#0047BA" />
            </svg>
          </div>

          <div className="flex-1" />

          {/* Centered Brand Unit matching user reference */}
          <div className="flex flex-col items-center justify-center text-center relative z-10 max-w-sm">
            {/* Aerodynamic Car Silhouette + Cyan Gear Emblem */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ 
                scale: [0.85, 1.04, 1],
                opacity: 1
              }}
              transition={{ 
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="flex items-center justify-center"
            >
              <svg width="190" height="105" viewBox="0 0 180 100" fill="none">
                <defs>
                  <linearGradient id="splashCarStroke" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.7" />
                    <stop offset="30%" stopColor="#FFFFFF" stopOpacity="1" />
                    <stop offset="70%" stopColor="#38BDF8" stopOpacity="1" />
                    <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.85" />
                  </linearGradient>
                  <linearGradient id="splashGearGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#0284C7" stopOpacity="0.5" />
                  </linearGradient>
                </defs>

                {/* Glowing Cyan Gear */}
                <g transform="translate(100, 32)">
                  <path
                    d="M 0,-24 L 4,-24 L 5,-19 L 10,-17 L 14,-21 L 18,-18 L 16,-13 L 20,-9 L 25,-10 L 26,-5 L 21,-2 L 21,3 L 26,6 L 25,11 L 20,10 L 16,14 L 18,19 L 14,22 L 10,18 L 5,20 L 4,25 L -1,25 L -2,20 L -7,18 L -11,22 L -15,19 L -13,14 L -17,10 L -22,11 L -23,6 L -18,3 L -18,-2 L -23,-5 L -22,-10 L -17,-9 L -13,-13 L -15,-18 L -11,-21 L -7,-17 L -2,-19 Z"
                    fill="url(#splashGearGrad)"
                  />
                  <circle cx="0" cy="0" r="10" fill="#003B94" />
                  <circle cx="0" cy="0" r="6" fill="#38BDF8" opacity="0.7" />
                </g>

                {/* Aerodynamic Car Roof & Body Lines */}
                <path
                  d="M 12 72 C 30 68, 48 40, 78 30 C 108 20, 138 28, 168 68 C 172 73, 165 75, 156 74 C 130 66, 105 52, 74 52 C 45 52, 28 66, 12 72 Z"
                  fill="url(#splashCarStroke)"
                />
                <path
                  d="M 44 56 C 65 34, 98 28, 142 54"
                  stroke="#FFFFFF"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
                <path
                  d="M 72 50 L 82 34 C 95 32, 108 34, 116 48 Z"
                  fill="#002D7A"
                  stroke="#38BDF8"
                  strokeWidth="1.2"
                />
                <path
                  d="M 120 48 C 128 44, 136 46, 142 52 L 126 53 Z"
                  fill="#002D7A"
                  stroke="#38BDF8"
                  strokeWidth="1"
                />
                <path d="M 152 66 C 160 67, 168 69, 172 70" stroke="#67E8F9" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M 14 71 C 22 70, 32 68, 40 68" stroke="#93C5FD" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M 142 74 C 145 68, 155 68, 158 74" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
                <path d="M 28 73 C 31 67, 41 67, 44 73" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </motion.div>

            {/* Title: Auto Parts */}
            <div className="flex items-center justify-center mt-3">
              <span className="text-4xl sm:text-5xl font-black text-white tracking-tight">Auto</span>
              <span className="text-4xl sm:text-5xl font-black text-[#38BDF8] tracking-tight ml-2">Parts</span>
            </div>

            {/* — INDIA — */}
            <div className="flex items-center justify-center gap-3 mt-2">
              <div className="w-12 h-[1.5px] bg-white/70" />
              <span className="text-lg sm:text-xl font-extrabold text-white tracking-[0.25em]">I N D I A</span>
              <div className="w-12 h-[1.5px] bg-white/70" />
            </div>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm font-semibold text-sky-100 mt-3 tracking-wide">
              Buy. Sell. Find. Auto Parts Across India
            </p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.5 }}
              className="mt-8 flex items-center gap-2.5 bg-white/10 px-4 py-2 rounded-full backdrop-blur-xs border border-white/15"
            >
              <div className="w-3.5 h-3.5 border-2 border-sky-300 border-t-transparent rounded-full animate-spin" />
              <span className="text-sky-200 text-xs font-bold tracking-wider">Starting Marketplace...</span>
            </motion.div>
          </div>

          <div className="flex-1" />

          {/* KEEP INDIA MOVING — Footer */}
          <div className="flex items-center justify-center gap-2 pb-2">
            <span className="text-white/75 text-[11px] font-extrabold tracking-[0.25em]">KEEP INDIA MOVING</span>
            <div className="w-8 h-[1.5px] bg-white/60" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
