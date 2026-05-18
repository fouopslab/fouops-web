"use client";

import Image from "next/image";
import { useRef, type CSSProperties, type PointerEvent } from "react";
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
      className={cn(
        "group/logo relative inline-flex select-none items-center",
        compact ? "gap-2.5" : "gap-3.5",
        className
      )}
      onPointerMove={animated ? handlePointerMove : undefined}
      onPointerLeave={animated ? resetMotion : undefined}
    >
      <span className="absolute inset-y-0 left-1/2 -z-10 w-[calc(100%+2rem)] -translate-x-1/2 bg-[radial-gradient(circle,rgba(59,130,246,0.14),transparent_70%)] opacity-70 blur-2xl transition-opacity duration-300 group-hover/logo:opacity-100" />
      <span
        ref={frameRef}
        className={cn(
          "relative isolate shrink-0 overflow-hidden rounded-[18px] transition-transform duration-300 ease-out will-change-transform group-hover/logo:-translate-y-0.5",
          compact ? "size-10" : "size-11"
        )}
        style={{
          ...motionDefaults,
          transform: animated
            ? "perspective(900px) rotateX(var(--brand-rx)) rotateY(var(--brand-ry)) translateZ(0)"
            : undefined,
        }}
      >
        <span className="absolute inset-[14%] -z-10 rounded-full bg-[radial-gradient(circle_at_var(--brand-gx)_var(--brand-gy),rgba(78,140,255,0.3),transparent_62%)] opacity-60 blur-xl transition-opacity duration-300 group-hover/logo:opacity-100" />
        <span className="absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/8 transition-colors duration-300 group-hover/logo:ring-white/14" />
        <Image
          src="/logo.png"
          alt=""
          aria-hidden="true"
          width={96}
          height={96}
          priority={compact}
          className="relative z-10 h-full w-full rounded-[inherit] object-cover shadow-[0_16px_34px_rgba(0,0,0,0.42)]"
        />
      </span>

      <span className="flex items-baseline leading-none">
        <span
          className={cn(
            "font-sans font-semibold tracking-[-0.055em] text-foreground transition-[color,transform] duration-300 ease-out group-hover/logo:-translate-y-px group-hover/logo:text-white",
            compact ? "text-[1rem]" : "text-[1.18rem]"
          )}
        >
          FouOps
        </span>
        <span
          className={cn(
            "font-sans font-semibold tracking-[-0.055em] text-white/58 transition-[color,transform] duration-300 ease-out group-hover/logo:-translate-y-px group-hover/logo:text-[#d5e4ff]",
            compact ? "text-[1rem]" : "text-[1.18rem]"
          )}
        >
          Lab
        </span>
      </span>
    </span>
  );
}