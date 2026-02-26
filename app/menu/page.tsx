"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const menuItems = [
  {
    id: "feed",
    label: "THE FEED",
    description: "SOCIAL NETWORK TERMINAL",
    route: "/feed",
    icon: "◈",
  },
  {
    id: "npcs",
    label: "NPC BIOS",
    description: "PERSONNEL DATABASE",
    route: "/npcs",
    icon: "◉",
  },
  {
    id: "database",
    label: "THE DATABASE",
    description: "CLASSIFIED INTEL RECORDS",
    route: "/database",
    icon: "◆",
  },
];

function LiveClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    function update() {
      setTime(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
    }
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, []);

  return <span>{time}</span>;
}

export default function Menu() {
  const router = useRouter();
  const [playerName, setPlayerName] = useState("");
  const [loginTime, setLoginTime] = useState("");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setPlayerName(localStorage.getItem("playerName") || "Unknown");
    setLoginTime(localStorage.getItem("loginTime") || "");
    setTimeout(() => setLoaded(true), 100);
  }, []);

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center font-[family-name:var(--font-typewriter)] relative overflow-hidden">
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

      {/* Radial glow behind content */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, rgba(255,255,255,0.04) 0%, transparent 50%)",
        }}
      />

      {/* Scanline */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute left-0 w-full h-[1px] bg-white/[0.03] animate-scanline" />
      </div>

      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 flex justify-between items-center px-8 py-4 z-10">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-green-400/80 rounded-full shadow-[0_0_8px_rgba(0,255,0,0.4)]" />
          <span className="text-white/40 text-[10px] tracking-widest">CONNECTED</span>
        </div>
        <div className="text-white/30 text-[10px] tracking-widest">
          <LiveClock />
        </div>
        <div className="text-white/40 text-[10px] tracking-widest">
          U-SOL-13 // MAINFRAME
        </div>
      </div>

      {/* Main content */}
      <div
        className="flex flex-col items-center gap-10 z-10 transition-all duration-1000"
        style={{
          opacity: loaded ? 1 : 0,
          transform: loaded ? "translateY(0)" : "translateY(20px)",
        }}
      >
        {/* Logo + Title */}
        <div className="flex flex-col items-center gap-4">
          <Image
            src="/sunsoul-clean.png"
            alt="The Sun and the Moon"
            width={80}
            height={80}
            className="drop-shadow-[0_0_20px_rgba(255,255,255,0.6)] animate-breathe"
          />
          <h1 className="text-white text-4xl tracking-[0.4em] drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]">
            U SOL E A LUA
          </h1>
          <div className="w-80 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          <p className="text-white/30 text-xs tracking-widest">
            {playerName} — SESSION STARTED AT {loginTime}
          </p>
        </div>

        {/* Menu buttons */}
        <div className="flex gap-5">
          {menuItems.map((item) => {
            const isHovered = hoveredId === item.id;
            const isOtherHovered = hoveredId !== null && hoveredId !== item.id;

            return (
              <button
                key={item.id}
                onClick={() => router.push(item.route)}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="relative group"
                style={{
                  transition: "transform 0.3s ease, opacity 0.3s ease",
                  transform: isHovered ? "scale(1.05)" : isOtherHovered ? "scale(0.97)" : "scale(1)",
                  opacity: isOtherHovered ? 0.4 : 1,
                }}
              >
                <div
                  className={`w-56 h-40 rounded-lg border flex flex-col items-center justify-center gap-3 transition-all duration-300 relative overflow-hidden ${
                    isHovered
                      ? "border-white/60 bg-white/[0.06] shadow-[0_0_30px_rgba(255,255,255,0.12)]"
                      : "border-white/20 bg-white/[0.02]"
                  }`}
                >
                  {/* Top accent line */}
                  <div
                    className={`absolute top-0 left-0 right-0 h-[2px] transition-all duration-500 ${
                      isHovered
                        ? "bg-gradient-to-r from-transparent via-white/80 to-transparent"
                        : "bg-gradient-to-r from-transparent via-white/10 to-transparent"
                    }`}
                  />

                  {/* Corner accents */}
                  <div className={`absolute top-2 left-2 w-2 h-[1px] transition-colors duration-300 ${isHovered ? "bg-white/60" : "bg-white/15"}`} />
                  <div className={`absolute top-2 left-2 w-[1px] h-2 transition-colors duration-300 ${isHovered ? "bg-white/60" : "bg-white/15"}`} />
                  <div className={`absolute top-2 right-2 w-2 h-[1px] transition-colors duration-300 ${isHovered ? "bg-white/60" : "bg-white/15"}`} />
                  <div className={`absolute top-2 right-2 w-[1px] h-2 transition-colors duration-300 ${isHovered ? "bg-white/60" : "bg-white/15"}`} />
                  <div className={`absolute bottom-2 left-2 w-2 h-[1px] transition-colors duration-300 ${isHovered ? "bg-white/60" : "bg-white/15"}`} />
                  <div className={`absolute bottom-2 left-2 w-[1px] h-2 transition-colors duration-300 ${isHovered ? "bg-white/60" : "bg-white/15"}`} />
                  <div className={`absolute bottom-2 right-2 w-2 h-[1px] transition-colors duration-300 ${isHovered ? "bg-white/60" : "bg-white/15"}`} />
                  <div className={`absolute bottom-2 right-2 w-[1px] h-2 transition-colors duration-300 ${isHovered ? "bg-white/60" : "bg-white/15"}`} />

                  {/* Icon */}
                  <span className={`text-2xl transition-all duration-300 ${
                    isHovered
                      ? "text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.6)]"
                      : "text-white/40"
                  }`}>
                    {item.icon}
                  </span>

                  {/* Label */}
                  <span className={`text-sm tracking-[0.3em] transition-all duration-300 ${
                    isHovered
                      ? "text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]"
                      : "text-white/60"
                  }`}>
                    {item.label}
                  </span>

                  {/* Description */}
                  <span className={`text-[10px] tracking-widest transition-colors duration-300 ${
                    isHovered ? "text-white/50" : "text-white/20"
                  }`}>
                    {item.description}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-between items-center px-8 py-4 z-10">
        <span className="text-white/20 text-[10px] tracking-widest">
          CLEARANCE: AUTHORIZED
        </span>
        <div className="flex gap-4 items-center">
          <div className="flex gap-[3px]">
            <div className="w-[4px] h-[4px] bg-white/20" />
            <div className="w-[4px] h-[4px] bg-white/15" />
            <div className="w-[4px] h-[4px] bg-white/20" />
            <div className="w-[4px] h-[4px] bg-white/15" />
          </div>
        </div>
        <span className="text-white/20 text-[10px] tracking-widest">
          NETWORK STABLE
        </span>
      </div>
    </div>
  );
}