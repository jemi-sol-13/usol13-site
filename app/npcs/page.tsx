"use client";

import { useRouter } from "next/navigation";

const organizations = [
  {
    id: "last-circuit",
    name: "The Last Circuit: Fenmoore's Bar",
    locked: false,
  },
  {
    id: "unknown-1",
    name: "???",
    locked: true,
  },
  {
    id: "unknown-2",
    name: "???",
    locked: true,
  },
];

export default function NPCs() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-black flex flex-col p-8 font-[family-name:var(--font-typewriter)] relative overflow-hidden">
      {/* Scanline — fixed overflow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute left-0 w-full h-[1px] bg-white/[0.03] animate-scanline" />
      </div>

      <button
        onClick={() => router.push("/menu")}
        className="text-white/60 hover:text-white transition-colors duration-200 text-sm tracking-wider mb-12 self-start z-10"
      >
        ← MAIN MENU
      </button>

      {/* Header */}
      <div className="text-center mb-16 z-10">
        <p className="text-white/40 text-xs tracking-[0.5em] mb-3">
          ◆ U-SOL-13 PERSONNEL RECORDS ◆
        </p>
        <div className="w-64 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent mx-auto mb-4" />
        <h1 className="text-white text-4xl tracking-widest drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]">
          NPC BIOS
        </h1>
        <div className="w-64 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent mx-auto mt-4" />
        <p className="text-white/35 text-xs tracking-[0.3em] mt-3">
          REGISTERED ORGANIZATIONS — SELECT TO VIEW MEMBERS
        </p>
      </div>

      {/* Organization Cards */}
      <div className="flex flex-wrap justify-center gap-6 z-10">
        {organizations.map((org, index) => (
          <button
            key={org.id}
            onClick={() => !org.locked && router.push(`/npcs/${org.id}`)}
            disabled={org.locked}
            className={`w-80 p-6 rounded-lg text-left transition-all duration-300 relative overflow-hidden group ${
              org.locked
                ? "border border-red-500/40 cursor-not-allowed"
                : "border border-white/30 hover:border-white/60 hover:shadow-[0_0_25px_rgba(255,255,255,0.1)] hover:bg-white/[0.03] cursor-pointer"
            }`}
          >
            {/* Static noise overlay for locked */}
            {org.locked && (
              <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
                }}
              />
            )}

            {/* File number */}
            <p className={`text-xs tracking-[0.3em] mb-3 ${
              org.locked ? "text-red-500/60" : "text-white/45"
            }`}>
              ORG #{String(index + 1).padStart(3, "0")}
            </p>

            {/* Name */}
            <p className={`text-lg tracking-wider ${
              org.locked ? "text-red-500/60" : "text-white group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]"
            }`}>
              {org.locked ? "???????????????" : org.name}
            </p>

            {/* Status */}
            <div className="mt-4 flex items-center justify-between">
              <div className={`px-3 py-1 rounded text-xs tracking-widest ${
                org.locked
                  ? "border border-red-500/40 text-red-500/80 animate-pulse"
                  : "border border-green-500/40 text-green-400/80"
              }`}>
                {org.locked ? "LOCKED" : "ACCESSIBLE"}
              </div>

              {!org.locked && (
                <span className="text-white/40 text-xs tracking-wider group-hover:text-white/70 transition-colors">
                  ENTER →
                </span>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-16 text-center z-10">
        <p className="text-white/30 text-xs tracking-widest">
          {organizations.filter(o => !o.locked).length} / {organizations.length} ORGANIZATIONS ACCESSIBLE
        </p>
      </div>
    </div>
  );
}