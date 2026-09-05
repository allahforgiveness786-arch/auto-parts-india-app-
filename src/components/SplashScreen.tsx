import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface SplashScreenProps {
  onFinish?: () => void;
  minDurationMs?: number;
  isReady?: boolean;
}

export default function SplashScreen({
  onFinish,
  minDurationMs = 2000,
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
          className="fixed inset-0 z-[99999] w-screen h-screen bg-[#0A0F1D] flex flex-col items-center justify-between p-6 select-none overflow-hidden touch-none"
          style={{ height: "100dvh", width: "100vw" }}
          id="app-native-splash-screen"
        >
          {/* Subtle Radial Blue Atmospheric Glows */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-72 h-72 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex-1" />

          {/* Centered Brand Unit */}
          <div className="flex flex-col items-center justify-center text-center relative z-10 max-w-sm">
            {/* Aerodynamic Car Silhouette + Precision Gear Emblem */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ 
                scale: [0.85, 1.03, 1],
                opacity: 1
              }}
              transition={{ 
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="flex items-center justify-center"
            >
              <svg width="180" height="90" viewBox="0 0 180 90" fill="none">
                <defs>
                  <linearGradient id="splashCarGradWeb" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#38BDF8" />
                    <stop offset="50%" stopColor="#FFFFFF" />
                    <stop offset="100%" stopColor="#2563EB" />
                  </linearGradient>
                  <linearGradient id="splashGearAuraWeb" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00D8FF" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#0052CC" stopOpacity="0.4" />
                  </linearGradient>
                </defs>

                {/* Gear */}
                <g transform="translate(95, 30)">
                  <path
                    d="M 0,-20 L 3,-20 L 4,-16 L 8,-14 L 12,-17 L 15,-15 L 13,-11 L 16,-8 L 20,-9 L 21,-5 L 17,-2 L 17,2 L 21,5 L 20,9 L 16,8 L 13,11 L 15,15 L 12,17 L 8,14 L 4,16 L 3,20 L -1,20 L -2,16 L -6,14 L -9,17 L -12,15 L -10,11 L -13,8 L -17,9 L -18,5 L -14,2 L -14,-2 L -18,-5 L -17,-9 L -13,-8 L -10,-11 L -12,-15 L -9,-17 L -6,-14 L -2,-16 Z"
                    fill="url(#splashGearAuraWeb)"
                  />
                  <circle cx="0" cy="0" r="8" fill="#0A0F1D" />
                  <circle cx="0" cy="0" r="4" fill="#38BDF8" />
                </g>

                {/* Sweeping aerodynamic car silhouette */}
                <path
                  d="M 12 62 C 30 58, 48 34, 76 26 C 104 18, 132 24, 160 58 C 164 63, 156 65, 148 64 C 124 57, 100 45, 72 45 C 44 45, 26 57, 12 62 Z"
                  fill="url(#splashCarGradWeb)"
                />
                <path
                  d="M 42 48 C 62 28, 94 24, 134 46"
                  stroke="#FFFFFF"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <path d="M 68 44 L 78 30 C 90 28, 102 30, 110 42 Z" fill="#0A162B" stroke="#38BDF8" strokeWidth="1" />
                <path d="M 114 42 C 122 38, 130 40, 136 46 L 120 47 Z" fill="#0A162B" stroke="#38BDF8" strokeWidth="1" />
                <path d="M 144 56 C 152 57, 160 59, 164 60" stroke="#38BDF8" strokeWidth="2.2" strokeLinecap="round" />
                <path d="M 14 61 C 22 60, 30 58, 38 58" stroke="#93C5FD" strokeWidth="2.2" strokeLinecap="round" />
              </svg>
            </motion.div>

            {/* Title: AutoParts INDIA */}
            <div className="flex items-center justify-center mt-3">
              <span className="text-3xl sm:text-4xl font-black text-white tracking-tight">Auto</span>
              <span className="text-3xl sm:text-4xl font-black text-[#38BDF8] tracking-tight">Parts</span>
              <span className="ml-2 px-2 py-0.5 bg-orange-600 text-white font-black text-[10px] rounded-md tracking-wider">
                INDIA
              </span>
            </div>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm font-medium text-slate-400 mt-2 tracking-wide">
              India's #1 Genuine Auto Parts Marketplace
            </p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="mt-6 flex items-center gap-2.5 bg-white/5 px-4 py-2 rounded-full border border-white/10"
            >
              <div className="w-3.5 h-3.5 border-2 border-sky-400 border-t-transparent rounded-full animate-spin" />
              <span className="text-sky-200 text-xs font-semibold tracking-wide">Starting Marketplace...</span>
            </motion.div>
          </div>

          <div className="flex-1" />

          {/* Footer */}
          <div className="flex items-center justify-center gap-2 pb-2">
            <span className="text-slate-500 text-[10px] font-bold tracking-[0.2em] uppercase">
              100% GENUINE OEM & AFTERMARKET PARTS
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
