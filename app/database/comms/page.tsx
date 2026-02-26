"use client";

import { useRouter } from "next/navigation";

export default function CommsPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
      {/* Scanline overlay */}
      <div className="fixed inset-0 pointer-events-none animate-scanline opacity-[0.03] z-10" />

      <div className="text-center relative z-[1]">
        {/* Static noise box */}
        <div className="w-[280px] h-[180px] border border-red-500/20 mx-auto mb-8 relative overflow-hidden">
          <div className="absolute inset-0 crt-noise opacity-[0.08]" />
          <div
            className="absolute inset-0 animate-flicker"
            style={{
              background: `repeating-linear-gradient(
                0deg,
                transparent,
                transparent 1px,
                rgba(255,0,0,0.02) 1px,
                rgba(255,0,0,0.02) 2px
              )`,
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-red-500/40 text-[10px] tracking-[6px] uppercase animate-flicker">
              NO SIGNAL
            </span>
          </div>
        </div>

        <h1
          className="text-white/60 text-sm tracking-[8px] uppercase mb-3"
          style={{ fontFamily: "'Special Elite', cursive" }}
        >
          COMMS / TRANSMISSIONS
        </h1>
        <p className="text-white/20 text-[10px] tracking-[3px] uppercase mb-8">
          Channel restricted · Awaiting clearance
        </p>

        <div className="inline-block border border-red-500/20 px-6 py-2">
          <span className="text-red-500/50 text-[9px] tracking-[4px] uppercase">
            RESTRICTED ACCESS
          </span>
        </div>

        <div className="mt-12">
          <button
            onClick={() => router.push("/database/reports")}
            className="text-white/30 text-[9px] tracking-[3px] uppercase hover:text-white/50 transition-colors cursor-pointer"
          >
            ← Return to Reports
          </button>
        </div>
      </div>
    </div>
  );
}