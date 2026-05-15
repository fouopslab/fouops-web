"use client";

import { useId, useRef, type CSSProperties, type PointerEvent } from "react";
import { cn } from "@/lib/utils";

interface BrandLogoProps {
  animated?: boolean;
  compact?: boolean;
  className?: string;
}

const motionDefaults = {
  "--brand-rx": "0deg",
  "--brand-ry": "0deg",
  "--brand-gx": "50%",
  "--brand-gy": "50%",
} as CSSProperties;

export function BrandLogo({ animated = false, compact = false, className }: BrandLogoProps) {
  const logoId = useId().replace(/:/g, "");
  const frameRef = useRef<HTMLSpanElement>(null);

  function handlePointerMove(event: PointerEvent<HTMLSpanElement>) {
    if (!animated || !frameRef.current) {
      return;
    }

    const rect = frameRef.current.getBoundingClientRect();
    const offsetX = (event.clientX - rect.left) / rect.width;
    const offsetY = (event.clientY - rect.top) / rect.height;
    const rotateX = (0.5 - offsetY) * 12;
    const rotateY = (offsetX - 0.5) * 14;

    frameRef.current.style.setProperty("--brand-rx", `${rotateX}deg`);
    frameRef.current.style.setProperty("--brand-ry", `${rotateY}deg`);
    frameRef.current.style.setProperty("--brand-gx", `${offsetX * 100}%`);
    frameRef.current.style.setProperty("--brand-gy", `${offsetY * 100}%`);
  }

  function resetMotion() {
    if (!animated || !frameRef.current) {
      return;
    }

    frameRef.current.style.setProperty("--brand-rx", "0deg");
    frameRef.current.style.setProperty("--brand-ry", "0deg");
    frameRef.current.style.setProperty("--brand-gx", "50%");
    frameRef.current.style.setProperty("--brand-gy", "50%");
  }

  return (
    <span
      className={cn("group/logo inline-flex items-center", compact ? "gap-2.5" : "gap-3", className)}
      onPointerMove={animated ? handlePointerMove : undefined}
      onPointerLeave={animated ? resetMotion : undefined}
    >
      <span
        ref={frameRef}
        className={cn(
          "relative isolate flex items-center justify-center overflow-hidden border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.09),rgba(255,255,255,0.02))] shadow-[0_10px_30px_rgba(0,0,0,0.34),inset_0_1px_0_rgba(255,255,255,0.12)] transition-transform duration-300 ease-out group-hover/logo:-translate-y-0.5",
          compact ? "size-10 rounded-[14px]" : "size-11 rounded-[16px]"
        )}
        style={{
          ...motionDefaults,
          transform: animated
            ? "perspective(900px) rotateX(var(--brand-rx)) rotateY(var(--brand-ry)) translateZ(0)"
            : undefined,
        }}
      >
        <span className="absolute inset-px rounded-[inherit] bg-[radial-gradient(circle_at_var(--brand-gx)_var(--brand-gy),rgba(167,197,223,0.28),transparent_58%)] opacity-0 transition-opacity duration-300 group-hover/logo:opacity-100" />
        <span className="absolute inset-[1px] rounded-[inherit] border border-white/5" />

        <svg
          className={cn("relative z-10", compact ? "h-8 w-8" : "h-9 w-9")}
          viewBox="0 0 64 64"
          fill="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id={`${logoId}-frame`} x1="10" y1="12" x2="54" y2="56" gradientUnits="userSpaceOnUse">
              <stop stopColor="#F4F7FB" stopOpacity="0.84" />
              <stop offset="0.48" stopColor="#90A7BF" stopOpacity="0.44" />
              <stop offset="1" stopColor="#5A718A" stopOpacity="0.76" />
            </linearGradient>
            <linearGradient id={`${logoId}-route`} x1="18" y1="20" x2="50" y2="44" gradientUnits="userSpaceOnUse">
              <stop stopColor="#F8FBFF" />
              <stop offset="0.56" stopColor="#A7BED5" />
              <stop offset="1" stopColor="#6C89A6" />
            </linearGradient>
            <radialGradient id={`${logoId}-pulse`} cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(46 32) rotate(90) scale(10)">
              <stop stopColor="#A4C4E0" stopOpacity="0.95" />
              <stop offset="1" stopColor="#A4C4E0" stopOpacity="0" />
            </radialGradient>
          </defs>

          <rect x="6.5" y="6.5" width="51" height="51" rx="16.5" fill="rgba(8,10,15,0.34)" stroke={`url(#${logoId}-frame)`} />
          <rect x="13" y="13" width="38" height="38" rx="12" fill="rgba(255,255,255,0.025)" />
          <path d="M18 20V44" stroke={`url(#${logoId}-route)`} strokeWidth="3.4" strokeLinecap="round" />
          <path d="M18 20H33C42.389 20 50 27.611 50 37" stroke={`url(#${logoId}-route)`} strokeWidth="3.4" strokeLinecap="round" />
          <path d="M18 32H30" stroke={`url(#${logoId}-route)`} strokeWidth="3.4" strokeLinecap="round" />
          <path d="M18 44H33C42.389 44 50 36.389 50 27" stroke={`url(#${logoId}-route)`} strokeWidth="3.4" strokeLinecap="round" />
          <circle cx="46" cy="32" r="10" fill={`url(#${logoId}-pulse)`} className="opacity-70 transition-opacity duration-300 group-hover/logo:opacity-100" />
          <circle cx="46" cy="32" r="4.4" fill="#BDD6EA" className="transition-transform duration-300 group-hover/logo:scale-110" />
          <circle cx="32" cy="44" r="2.4" fill="#D7E2EC" opacity="0.92" />
        </svg>
      </span>

      <span className="flex items-baseline leading-none">
        <span
          className={cn(
            "font-mono font-semibold tracking-[-0.01em] text-foreground transition-colors duration-300 group-hover/logo:text-white",
            compact ? "text-[1rem]" : "text-[1.06rem]"
          )}
        >
          FouOps
        </span>
        <span
          className={cn(
            "font-mono font-semibold tracking-[-0.015em] text-[#808080] transition-colors duration-300 group-hover/logo:text-[#dce9f5]",
            compact ? "text-[1rem]" : "text-[1.06rem]"
          )}
        >
          Lab
        </span>
      </span>
    </span>
  );
}