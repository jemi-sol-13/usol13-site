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
    },
    {
      id: null,
      name: "██████ ████ ██",
      status: "CLASSIFIED",
      planets: null,
      star: "███████",
      unlocked: false,
    },
    {
      id: null,
      name: "████████ ███",
      status: "CLASSIFIED",
      planets: null,
      star: "███████",
      unlocked: false,
    },
  ];

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none animate-scanline opacity-[0.03] z-10" />

      <div className="max-w-3xl mx-auto px-8 pt-24 pb-16 relative z-[1]">
        {/* Header */}
        <div className="mb-12">
          <p className="text-[9px] tracking-[4px] text-white/25 uppercase mb-2">
            Star Map Registry
          </p>
          <h1
            className="text-2xl tracking-[10px] text-white/80 uppercase"
            style={{ fontFamily: "'Special Elite', cursive" }}
          >
            STAR MAPS
          </h1>
          <div className="w-12 h-[1px] bg-white/15 mt-4" />
        </div>

        {/* Systems Grid */}
        <div className="space-y-3">
          {systems.map((system, i) => (
            <button
              key={i}
              onClick={() => {
                if (system.unlocked && system.id) {
                  router.push(`/database/star-maps/${system.id}`);
                }
              }}
              disabled={!system.unlocked}
              className={`w-full text-left px-6 py-5 border transition-all duration-300 group relative overflow-hidden ${
                system.unlocked
                  ? "border-white/[0.08] hover:border-green-500/30 hover:bg-green-500/[0.02] cursor-pointer"
                  : "border-red-500/[0.08] cursor-not-allowed"
              }`}
            >
              {/* Noise overlay for locked */}
              {!system.unlocked && (
                <>
                  <div className="absolute inset-0 crt-noise opacity-[0.03]" />
                  <div
                    className="absolute inset-0 animate-flicker"
                    style={{
                      background:
                        "repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(255,0,0,0.015) 1px, rgba(255,0,0,0.015) 2px)",
                    }}
                  />
                </>
              )}

              <div className="flex items-center justify-between relative z-[1]">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span
                      className={`block w-2 h-2 rounded-full ${
                        system.unlocked
                          ? "bg-green-400/70 shadow-[0_0_8px_rgba(74,222,128,0.3)]"
                          : "bg-red-500/30"
                      }`}
                    />
                    <h2
                      className={`text-sm tracking-[5px] uppercase ${
                        system.unlocked
                          ? "text-white/70 group-hover:text-white/90"
                          : "text-red-500/25 animate-flicker"
                      }`}
                    >
                      {system.name}
                    </h2>
                  </div>
                  <div className="flex gap-6 ml-5">
                    <span
                      className={`text-[8px] tracking-[2px] uppercase ${
                        system.unlocked ? "text-white/25" : "text-red-500/15"
                      }`}
                    >
                      Star: {system.star}
                    </span>
                    {system.planets && (
                      <span className="text-[8px] tracking-[2px] text-white/25 uppercase">
                        Bodies: {system.planets}
                      </span>
                    )}
                  </div>
                </div>
                <span
                  className={`text-[8px] tracking-[3px] px-3 py-1 border uppercase ${
                    system.unlocked
                      ? "text-green-400/50 border-green-500/20"
                      : "text-red-500/30 border-red-500/15"
                  }`}
                >
                  {system.status}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Locked grid squares */}
        <div className="mt-8 grid grid-cols-4 gap-2">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="aspect-[2/1] border border-white/[0.03] relative overflow-hidden"
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
    </div>
  );
}