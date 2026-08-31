import React, { useId } from "react";

interface BrandLogoProps {
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  variant?: "full" | "icon" | "horizontal";
  theme?: "light" | "dark";
  showTagline?: boolean;
  className?: string;
}

export function GearSpeedLogoIcon({
  size = 32,
  className = ""
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 block bg-transparent ${className}`}
      aria-label="Auto Parts Logo"
    >
      {/* Inverted V (White) */}
      <polygon points="23,68 44,12 60,12 81,68 65,68 52,33.33 39,68" fill="#FFFFFF" />
      
      {/* Crossbar (White) */}
      <polygon points="47.25,46 56.75,46 60.5,56 43.5,56" fill="#FFFFFF" />
      
      {/* Right Leg Bottom (Blue) */}
      <polygon points="56.75,46 72.75,46 81,68 65,68" fill="#0066FF" />
      
      {/* Orange Accent */}
      <polygon points="38,72 59,72 56.75,78 35.75,78" fill="#FF6B00" />
    </svg>
  );
}

export default function BrandLogo({
  size = "md",
  variant = "full",
  theme = "dark",
  showTagline = false,
  className = ""
}: BrandLogoProps) {
  const iconPixelSizes: Record<string, number> = {
    sm: 28,
    md: 32,
    lg: 38,
    xl: 48,
    "2xl": 64
  };

  const textSizes = {
    sm: "text-xs font-black",
    md: "text-sm font-black",
    lg: "text-base font-black",
    xl: "text-lg font-black",
    "2xl": "text-2xl font-black"
  };

  const iconDim = iconPixelSizes[size] || iconPixelSizes.md;

  if (variant === "icon") {
    return (
      <div className={`inline-flex items-center justify-center bg-transparent shrink-0 ${className}`}>
        <GearSpeedLogoIcon size={iconDim} />
      </div>
    );
  }

  return (
    <div className={`inline-flex flex-row items-center gap-2 select-none shrink-0 bg-transparent ${className}`}>
      {/* Option 1 SVG Logo (Gear + Speed Arrow) */}
      <GearSpeedLogoIcon size={iconDim} />

      {/* Text Brand */}
      <div className="flex flex-col justify-center shrink-0">
        <div className={`tracking-tight inline-flex flex-row items-center gap-1.5 ${textSizes[size]}`}>
          <span className={theme === "dark" ? "text-white font-black tracking-tight" : "text-[#0B1220] font-black tracking-tight"}>
            AUTO PARTS
          </span>
          <span className="text-white font-black uppercase tracking-wider text-[0.62em] px-1.5 py-0.5 rounded bg-[#1565FF] shrink-0 leading-tight">
            INDIA
          </span>
        </div>

        {showTagline && (
          <span
            className={`text-[8.5px] font-bold tracking-wider uppercase mt-0.5 ${
              theme === "dark" ? "text-slate-400" : "text-slate-500"
            }`}
          >
            Automotive Marketplace
          </span>
        )}
      </div>
    </div>
  );
}



