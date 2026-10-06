import Image from "next/image";

export function GlobeHeroBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* Globe fills the section like a background video */}
      <div className="gbg-img-layer">
        <Image
          src="/globe.png"
          alt=""
          fill
          priority
          className="object-cover object-center"
        />
      </div>

      {/* Orbit rings stage — centered square anchored to the sphere */}
      <div className="gbg-rings-stage">
        <div className="gbg-scan" />

        <div className="gbg-orbit gbg-orbit-1">
          <div className="gbg-ring" />
          <span className="gbg-dot" />
        </div>
        <div className="gbg-orbit gbg-orbit-2">
          <div className="gbg-ring" />
          <span className="gbg-dot" />
        </div>
        <div className="gbg-orbit gbg-orbit-3">
          <div className="gbg-ring gbg-ring-thin" />
          <span className="gbg-dot" />
        </div>

        <div className="gbg-underglow" />
      </div>

      {/* ── Readability overlays ─────────────────────────────────────────── */}
      {/* Top-down gradient: deepens the upper sky so badge + headline sit on dark */}
      <div className="absolute inset-x-0 top-0 h-[55%] bg-linear-to-b from-bg-primary/70 via-bg-primary/20 to-transparent" />
      {/* Edge vignette: darkens sides and bottom */}
      <div className="absolute inset-0 [background:radial-gradient(ellipse_90%_75%_at_50%_45%,transparent_35%,rgba(5,12,26,0.75)_100%)]" />
      {/* Bottom fade into next section */}
      <div className="absolute inset-x-0 bottom-0 h-64 bg-linear-to-t from-bg-primary to-transparent" />
    </div>
  );
}
