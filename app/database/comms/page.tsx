"use client";

import { useRouter } from "next/navigation";

export default function CommsPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden font-[family-name:var(--font-typewriter)]">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(255,255,255,0.04) 0%, transparent 50%)",
        }}
      />

      {/* Scanline */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute left-0 w-full h-[1px] bg-white/[0.03] animate-scanline" />
      </div>

      <div className="text-center relative z-[1]">
        {/* Static noise box */}
        <div className="w-[280px] h-[180px] border border-white/[0.08] rounded-lg mx-auto mb-8 relative overflow-hidden">
          {/* Corner accents */}
          <div className="absolute top-2 left-2 w-2 h-[1px] bg-white/15" />
          <div className="absolute top-2 left-2 w-[1px] h-2 bg-white/15" />
          <div className="absolute top-2 right-2 w-2 h-[1px] bg-white/15" />
          <div className="absolute top-2 right-2 w-[1px] h-2 bg-white/15" />
          <div className="absolute bottom-2 left-2 w-2 h-[1px] bg-white/15" />
          <div className="absolute bottom-2 left-2 w-[1px] h-2 bg-white/15" />
          <div className="absolute bottom-2 right-2 w-2 h-[1px] bg-white/15" />
          <div className="absolute bottom-2 right-2 w-[1px] h-2 bg-white/15" />

          {/* Top accent line */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-red-500/20 to-transparent" />

          <div className="absolute inset-0 crt-noise opacity-[0.06]" />
          <div
            className="absolute inset-0 animate-flicker"
            style={{
              background: `repeating-linear-gradient(
                0deg,
                transparent,
                transparent 1px,
                rgba(255,255,255,0.01) 1px,
                rgba(255,255,255,0.01) 2px
              )`,
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white/20 text-[10px] tracking-[0.4em] animate-flicker">
              NO SIGNAL
            </span>
          </div>
        </div>

        <h1 className="text-white/60 text-sm tracking-[0.3em] mb-3">
          COMMS / TRANSMISSIONS
        </h1>
        <p className="text-white/20 text-[10px] tracking-widest mb-8">
          CHANNEL RESTRICTED · AWAITING CLEARANCE
        </p>

        <div className="inline-block border border-white/[0.08] rounded-lg px-6 py-2 bg-white/[0.02]">
          <span className="text-red-500/40 text-[10px] tracking-[0.3em]">
            RESTRICTED ACCESS
          </span>
        </div>

        <div className="mt-12">
          <button
            onClick={() => router.push("/database/reports")}
            className="text-white/30 text-[10px] tracking-widest hover:text-white/50 transition-colors duration-300 cursor-pointer"
          >
            ← RETURN TO REPORTS
          </button>
        </div>
      </div>
    </div>
  );
}