"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const members = [
  {
    id: "viela",
    name: "VIELA HLOW-BYORN",
    role: "Security Guard",
    portrait: "/viela-portrait.jpg",
    locked: false,
  },
  {
    id: "dela",
    name: "???",
    role: "???",
    portrait: null,
    locked: true,
  },
  {
    id: "jules",
    name: "JULES GALLAGHER",
    role: "Bartender",
    portrait: "/jules-portrait.png",
    locked: false,
  },
];

export default function LastCircuit() {
  const router = useRouter();
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-black flex flex-col p-8 font-[family-name:var(--font-typewriter)]">
      <button
        onClick={() => router.push("/npcs")}
        className="text-white/50 hover:text-white transition-colors duration-200 text-sm tracking-wider mb-12 self-start"
      >
        ← NPC BIOS
      </button>

      <h1 className="text-white text-3xl tracking-widest text-center drop-shadow-[0_0_15px_rgba(255,255,255,0.8)] mb-4">
        THE LAST CIRCUIT
      </h1>
      <p className="text-white/50 text-center text-sm tracking-wider mb-16">
        FENMOORE&apos;S BAR
      </p>

      <div className="flex justify-center items-center gap-8 flex-1">
        {members.map((member) => {
          const isHovered = hoveredId === member.id;
          const isOtherHovered = hoveredId !== null && hoveredId !== member.id;

          return (
            <div
              key={member.id}
              className="relative flex items-stretch cursor-pointer"
              style={{
                transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                transform: isHovered
                  ? "scale(1.08)"
                  : isOtherHovered
                  ? "scale(0.95)"
                  : "scale(1)",
              }}
              onMouseEnter={() => setHoveredId(member.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => !member.locked && router.push(`/npcs/last-circuit/${member.id}`)}
            >
              {/* Vertical name on the left */}
              <div className="flex items-center justify-center w-8 mr-1">
                <span
                  className={`text-xs tracking-[0.3em] whitespace-nowrap ${
                    member.locked ? "text-red-500/70" : "text-white/50"
                  }`}
                  style={{
                    writingMode: "vertical-rl",
                    textOrientation: "mixed",
                    transform: "rotate(180deg)",
                  }}
                >
                  {member.name}
                </span>
              </div>

              {/* Card */}
              <div
                className={`relative w-48 h-[400px] rounded-lg overflow-hidden transition-all duration-400 ${
                  member.locked
                    ? "border-2 border-red-500 shadow-[0_0_20px_rgba(255,0,0,0.5)]"
                    : isHovered
                    ? "border-2 border-white shadow-[0_0_30px_rgba(255,255,255,0.6)]"
                    : "border border-white/50 shadow-[0_0_10px_rgba(255,255,255,0.1)]"
                }`}
              >
                {/* Portrait image or placeholder */}
                <div
                  className="absolute inset-0 transition-all duration-500"
                  style={{
                    filter: member.locked
                      ? "blur(20px) brightness(0.3)"
                      : isHovered
                      ? "blur(0px) brightness(1)"
                      : "blur(8px) brightness(0.6)",
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
                    <div className="w-full h-full bg-gradient-to-b from-white/10 to-white/5" />
                  )}
                </div>

                {/* Locked overlay */}
                {member.locked && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                    <p className="text-red-500 text-sm tracking-[0.3em] drop-shadow-[0_0_10px_rgba(255,0,0,0.8)]">
                      🔒 LOCKED 🔒
                    </p>
                  </div>
                )}

                {/* Role at bottom for unlocked */}
                {!member.locked && (
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent z-10">
                    <p className="text-white/70 text-xs tracking-wider text-center">
                      {member.role}
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}