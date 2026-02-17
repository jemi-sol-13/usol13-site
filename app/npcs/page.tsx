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
    <div className="min-h-screen bg-black flex flex-col p-8 font-[family-name:var(--font-typewriter)]">
      <button
        onClick={() => router.push("/")}
        className="text-white/50 hover:text-white transition-colors duration-200 text-sm tracking-wider mb-12 self-start"
      >
        ← MAIN MENU
      </button>

      <h1 className="text-white text-4xl tracking-widest text-center drop-shadow-[0_0_15px_rgba(255,255,255,0.8)] mb-16">
        NPC BIOS
      </h1>

      <div className="flex flex-wrap justify-center gap-8">
        {organizations.map((org) => (
          <button
            key={org.id}
            onClick={() => !org.locked && router.push(`/npcs/${org.id}`)}
            disabled={org.locked}
            className={`w-72 p-6 rounded-lg text-center tracking-wider transition-all duration-300 ${
              org.locked
                ? "border-2 border-red-500 shadow-[0_0_20px_rgba(255,0,0,0.5)] text-red-500 cursor-not-allowed"
                : "border border-white shadow-[0_0_15px_rgba(255,255,255,0.3)] text-white hover:shadow-[0_0_25px_rgba(255,255,255,0.5)] hover:bg-white/10 cursor-pointer"
            }`}
          >
            <p className="text-lg">{org.locked ? "???????????????" : org.name}</p>
            {org.locked && (
              <p className="text-red-500 text-sm mt-3 tracking-[0.3em] drop-shadow-[0_0_10px_rgba(255,0,0,0.8)]">
                🔒 LOCKED 🔒
              </p>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}