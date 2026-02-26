"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const members = [
  {
    id: "viela",
    name: "VIELA HLOW-BYORN",
    role: "Security Guard",
    alias: "Butterfly",
    portrait: "/viela-portrait.jpg",
    locked: false,
  },
  {
    id: "dela",
    name: "???",
    role: "???",
    alias: "???",
    portrait: null,
    locked: true,
  },
  {
    id: "jules",
    name: "JULES GALLAGHER",
    role: "Bartender",
    alias: "Hound",
    portrait: "/jules-portrait.png",
    locked: false,
  },
];

export default function LastCircuit() {
  const router = useRouter();
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-black flex flex-col p-8 font-[family-name:var(--font-typewriter)] relative">
      {/* Scanline */}
      <div className="absolute left-0 w-full h-[1px] bg-white/[0.03] animate-scanline pointer-events-none" />

      <button
        onClick={() => router.push("/npcs")}
        className="text-white/60 hover:text-white transition-colors duration-200 text-sm tracking-wider mb-12 self-start z-10"
      >
        ← NPC BIOS
      </button>

      {/* Header */}
      <div className="text-center mb-16 z-10">
        <p className="text-white/40 text-xs tracking-[0.5em] mb-3">
          ◆ ORGANIZATION FILE — ORG #001 ◆
        </p>
        <div className="w-64 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent mx-auto mb-4" />
        <h1 className="text-white text-3xl tracking-widest drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]">
          THE LAST CIRCUIT
        </h1>
        <p className="text-white/50 text-sm tracking-wider mt-2">
          FENMOORE&apos;S BAR
        </p>
        <div className="w-64 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent mx-auto mt-4" />
        <p className="text-white/35 text-xs tracking-[0.3em] mt-3">
          REGISTERED MEMBERS — SELECT TO VIEW DOSSIER
        </p>
      </div>

      {/* Member Cards */}
      <div className="flex justify-center items-stretch gap-6 flex-1 z-10">
        {members.map((member, index) => {
          const isHovered = hoveredId === member.id;
          const isOtherHovered = hoveredId !== null && hoveredId !== member.id;

          return (
            <div
              key={member.id}
              className="relative flex flex-col cursor-pointer"
              style={{
                transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s ease",
                transform: isHovered
                  ? "scale(1.05)"
                  : isOtherHovered
                  ? "scale(0.97)"
                  : "scale(1)",
                opacity: isOtherHovered ? 0.5 : 1,
              }}
              onMouseEnter={() => setHoveredId(member.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => !member.locked && router.push(`/npcs/last-circuit/${member.id}`)}
            >
              {/* Card */}
              <div
                className={`relative w-52 h-[380px] rounded-lg overflow-hidden transition-all duration-400 ${
                  member.locked
                    ? "border border-red-500/30"
                    : isHovered
                    ? "border border-white/60 shadow-[0_0_30px_rgba(255,255,255,0.15)]"
                    : "border border-white/20"
                }`}
              >
                {/* Static noise for locked */}
                {member.locked && (
                  <div
                    className="absolute inset-0 opacity-[0.05] pointer-events-none z-10"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
                    }}
                  />
                )}

                {/* Portrait */}
                <div
                  className="absolute inset-0 transition-all duration-500"
                  style={{
                    filter: member.locked
                      ? "blur(20px) brightness(0.2)"
                      : isHovered
                      ? "blur(0px) brightness(1)"
                      : "blur(4px) brightness(0.5)",
                  }}
                >
                  {member.portrait ? (
                    <Image
                      src={member.portrait}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-b from-white/5 to-black" />
                  )}
                </div>

                {/* Locked overlay */}
                {member.locked && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                    <div className="px-3 py-1 border border-red-500/50 rounded text-red-500/80 text-xs tracking-[0.3em] animate-pulse">
                      LOCKED
                    </div>
                  </div>
                )}

                {/* Bottom info gradient */}
                {!member.locked && (
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/80 to-transparent z-10">
                    <p className="text-white/60 text-[10px] tracking-[0.3em] mb-1">
                      MEMBER #{String(index + 1).padStart(2, "0")}
                    </p>
                    <p className="text-white/90 text-xs tracking-wider">
                      {member.role}
                    </p>
                  </div>
                )}
              </div>

              {/* Name + alias below card */}
              {!member.locked && (
                <div className="mt-3 text-center">
                  <p className={`text-xs tracking-widest transition-all duration-300 ${
                    isHovered ? "text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]" : "text-white/70"
                  }`}>
                    {member.name}
                  </p>
                  <p className="text-white/40 text-[10px] tracking-[0.3em] mt-1">
                    &quot;{member.alias}&quot;
                  </p>
                </div>
              )}

              {member.locked && (
                <div className="mt-3 text-center">
                  <p className="text-red-500/60 text-xs tracking-widest">???</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-12 text-center z-10">
        <p className="text-white/30 text-xs tracking-widest">
          {members.filter(m => !m.locked).length} / {members.length} MEMBERS ACCESSIBLE
        </p>
      </div>
    </div>
  );
}