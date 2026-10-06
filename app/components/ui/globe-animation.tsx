"use client";

import Image from "next/image";

export function GlobeAnimation({ className = "" }: { className?: string }) {
  return (
    <div className={`globe-root ${className}`}>
      {/* Globe image — breathing glow + float */}
      <div className="globe-float">
        <Image
          src="/globe.png"
          alt="Animated globe"
          width={700}
          height={394}
          priority
          className="globe-img"
        />
        {/* Overlay pulse to amplify the natural blue glow */}
        <div className="globe-glow-overlay" />
      </div>

      {/* Orbit ring 1 — shallow tilt, slow */}
      <div className="orbit orbit-1">
        <div className="orbit-ring" />
        <div className="orbit-dot orbit-dot-1" />
      </div>

      {/* Orbit ring 2 — steep tilt, medium */}
      <div className="orbit orbit-2">
        <div className="orbit-ring" />
        <div className="orbit-dot orbit-dot-2" />
      </div>

      {/* Orbit ring 3 — nearly flat, fast */}
      <div className="orbit orbit-3">
        <div className="orbit-ring orbit-ring-thin" />
        <div className="orbit-dot orbit-dot-3" />
      </div>

      {/* Scan sweep — rotating light bar */}
      <div className="scan-sweep" />
    </div>
  );
}
