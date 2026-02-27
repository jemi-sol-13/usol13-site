"use client";

import { useRouter } from "next/navigation";

export default function StarMapsPage() {
  const router = useRouter();

  const systems = [
    {
      id: "u-sol-era-13",
      name: "U-SOL-ERA 13",
      status: "ACTIVE",
      planets: 8,
      star: "U-SOL-E13",
      unlocked: true,
      icon: "◈",
    },
    {
      id: null,
      name: "██████ ████ ██",
      status: "CLASSIFIED",
      planets: null,
      star: "███████",
      unlocked: false,
      icon: "◇",
    },
    {
      id: null,
      name: "████████ ███",
      status: "CLASSIFIED",
      planets: null,
      star: "███████",
      unlocked: false,
      icon: "◇",
    },
  ];

  return (
    <div className="min-h-screen bg-black relative overflow-hidden font-[family-name:var(--font-typewriter)]">
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

      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 flex justify-between items-center px-8 py-4 z-10">
        <div className="flex items-center gap-3 ml-10">
          <div className="w-2 h-2 bg-green-400/80 rounded-full shadow-[0_0_8px_rgba(0,255,0,0.4)]" />
          <span className="text-white/40 text-[10px] tracking-widest">
            CONNECTED
          </span>
        </div>
        <span className="text-white/40 text-[10px] tracking-widest">
          U-SOL-13 // STAR MAP REGISTRY
        </span>
      </div>

      <div className="max-w-3xl mx-auto px-8 pt-24 pb-16 relative z-[1]">
        {/* Header */}
        <div className="mb-12">
          <p className="text-[10px] tracking-widest text-white/25 mb-2">
            STAR MAP REGISTRY
          </p>
          <h1 className="text-2xl tracking-[0.4em] text-white/80">
            STAR MAPS
          </h1>
          <div className="w-20 h-[1px] bg-gradient-to-r from-white/30 to-transparent mt-4" />
        </div>

        {/* Systems List */}
        <div className="space-y-3">
          {systems.map((system, i) => {
            const isUnlocked = system.unlocked;
            return (
              <button
                key={i}
                onClick={() => {
                  if (isUnlocked && system.id) {
                    router.push(`/database/star-maps/${system.id}`);
                  }
                }}
                disabled={!isUnlocked}
                className={`w-full text-left px-6 py-5 border rounded-lg transition-all duration-300 group relative overflow-hidden ${
                  isUnlocked
                    ? "border-white/[0.12] bg-white/[0.02] hover:border-white/30 hover:bg-white/[0.05] hover:shadow-[0_0_30px_rgba(255,255,255,0.06)] cursor-pointer"
                    : "border-white/[0.05] bg-white/[0.01] cursor-not-allowed"
                }`}
              >
                {/* Top accent line */}
                <div
                  className={`absolute top-0 left-0 right-0 h-[1px] transition-all duration-500 ${
                    isUnlocked
                      ? "bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:via-white/40"
                      : "bg-gradient-to-r from-transparent via-red-500/10 to-transparent"
                  }`}
                />

                {/* Corner accents */}
                <div className={`absolute top-2 left-2 w-2 h-[1px] transition-colors duration-300 ${isUnlocked ? "bg-white/15 group-hover:bg-white/40" : "bg-white/[0.05]"}`} />
                <div className={`absolute top-2 left-2 w-[1px] h-2 transition-colors duration-300 ${isUnlocked ? "bg-white/15 group-hover:bg-white/40" : "bg-white/[0.05]"}`} />
                <div className={`absolute top-2 right-2 w-2 h-[1px] transition-colors duration-300 ${isUnlocked ? "bg-white/15 group-hover:bg-white/40" : "bg-white/[0.05]"}`} />
                <div className={`absolute top-2 right-2 w-[1px] h-2 transition-colors duration-300 ${isUnlocked ? "bg-white/15 group-hover:bg-white/40" : "bg-white/[0.05]"}`} />
                <div className={`absolute bottom-2 left-2 w-2 h-[1px] transition-colors duration-300 ${isUnlocked ? "bg-white/15 group-hover:bg-white/40" : "bg-white/[0.05]"}`} />
                <div className={`absolute bottom-2 left-2 w-[1px] h-2 transition-colors duration-300 ${isUnlocked ? "bg-white/15 group-hover:bg-white/40" : "bg-white/[0.05]"}`} />
                <div className={`absolute bottom-2 right-2 w-2 h-[1px] transition-colors duration-300 ${isUnlocked ? "bg-white/15 group-hover:bg-white/40" : "bg-white/[0.05]"}`} />
                <div className={`absolute bottom-2 right-2 w-[1px] h-2 transition-colors duration-300 ${isUnlocked ? "bg-white/15 group-hover:bg-white/40" : "bg-white/[0.05]"}`} />

                {/* Noise overlay for locked */}
                {!isUnlocked && (
                  <>
                    <div className="absolute inset-0 crt-noise opacity-[0.03]" />
                    <div
                      className="absolute inset-0 animate-flicker"
                      style={{
                        background:
                          "repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(255,255,255,0.008) 1px, rgba(255,255,255,0.008) 2px)",
                      }}
                    />
                  </>
                )}

                <div className="flex items-center justify-between relative z-[1]">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span
                        className={`text-lg transition-all duration-300 ${
                          isUnlocked
                            ? "text-white/40 group-hover:text-white/80 group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.6)]"
                            : "text-red-500/15"
                        }`}
                      >
                        {system.icon}
                      </span>
                      <h2
                        className={`text-sm tracking-[0.3em] transition-all duration-300 ${
                          isUnlocked
                            ? "text-white/60 group-hover:text-white/90 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]"
                            : "text-red-500/20 animate-flicker"
                        }`}
                      >
                        {system.name}
                      </h2>
                    </div>
                    <div className="flex gap-6 ml-8">
                      <span
                        className={`text-[10px] tracking-widest ${
                          isUnlocked ? "text-white/25" : "text-red-500/12"
                        }`}
                      >
                        STAR: {system.star}
                      </span>
                      {system.planets && (
                        <span className="text-[10px] tracking-widest text-white/25">
                          BODIES: {system.planets}
                        </span>
                      )}
                    </div>
                  </div>
                  <span
                    className={`text-[10px] tracking-widest ${
                      isUnlocked ? "text-green-400/50" : "text-red-500/25"
                    }`}
                  >
                    {system.status}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Locked grid squares */}
        <div className="mt-8 grid grid-cols-4 gap-2">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="aspect-[2/1] border border-white/[0.04] rounded relative overflow-hidden"
            >
              <div className="absolute inset-0 crt-noise opacity-[0.02]" />
              <div
                className="absolute inset-0 animate-flicker"
                style={{
                  animationDelay: `${i * 0.2}s`,
                  background:
                    "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.005) 2px, rgba(255,255,255,0.005) 4px)",
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-between items-center px-8 py-4 z-10">
        <span className="text-white/20 text-[10px] tracking-widest">
          CLEARANCE: AUTHORIZED
        </span>
        <div className="flex gap-[3px]">
          <div className="w-[4px] h-[4px] bg-white/20" />
          <div className="w-[4px] h-[4px] bg-white/15" />
          <div className="w-[4px] h-[4px] bg-white/20" />
          <div className="w-[4px] h-[4px] bg-white/15" />
        </div>
        <span className="text-white/20 text-[10px] tracking-widest">
          NETWORK STABLE
        </span>
      </div>
    </div>
  );
}