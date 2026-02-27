"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function DatabaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const sections = [
    {
      label: "REPORTS",
      path: "/database/reports",
      status: "ACTIVE",
      unlocked: true,
      icon: "◆",
    },
    {
      label: "STAR MAPS",
      path: "/database/star-maps",
      status: "ACTIVE",
      unlocked: true,
      icon: "◈",
    },
    {
      label: "COMMS",
      path: "/database/comms",
      status: "RESTRICTED",
      unlocked: false,
      icon: "◉",
    },
  ];

  const lockedSections = [
    { label: "████████████" },
    { label: "██████ ███" },
    { label: "████ ██████████" },
  ];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden font-[family-name:var(--font-typewriter)]">
      {/* Hamburger Toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-6 left-6 z-50 flex flex-col gap-[5px] cursor-pointer group"
        aria-label="Toggle menu"
      >
        <span
          className={`block w-6 h-[2px] transition-all duration-300 ${
            sidebarOpen
              ? "rotate-45 translate-y-[7px] bg-white/80"
              : "bg-white/40 group-hover:bg-white/60"
          }`}
        />
        <span
          className={`block w-6 h-[2px] transition-all duration-300 ${
            sidebarOpen ? "opacity-0" : "bg-white/40 group-hover:bg-white/60"
          }`}
        />
        <span
          className={`block w-6 h-[2px] transition-all duration-300 ${
            sidebarOpen
              ? "-rotate-45 -translate-y-[7px] bg-white/80"
              : "bg-white/40 group-hover:bg-white/60"
          }`}
        />
      </button>

      {/* Overlay */}
      <div
        className={`fixed inset-0 z-30 transition-opacity duration-300 ${
          sidebarOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.85) 100%)",
        }}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-[300px] z-40 transition-transform duration-300 ease-in-out border-r border-white/[0.08] bg-black ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Grid background inside sidebar */}
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

        {/* Scanline inside sidebar */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute left-0 w-full h-[1px] bg-white/[0.03] animate-scanline" />
        </div>

        {/* Header */}
        <div className="pt-20 px-6 pb-5 border-b border-white/[0.08] relative">
          <p className="text-[10px] tracking-widest text-white/30">
            SYSTEM TERMINAL
          </p>
          <h2 className="text-base tracking-[0.4em] text-white/70 mt-1">
            DATABASE
          </h2>
          <div className="w-20 h-[1px] bg-gradient-to-r from-white/30 to-transparent mt-3" />
        </div>

        {/* Main Menu Button */}
        <div className="px-4 pt-5 pb-2 relative">
          <button
            onClick={() => {
              router.push("/menu");
              setSidebarOpen(false);
            }}
            className="w-full text-left px-4 py-3 border border-white/[0.08] rounded-lg bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04] transition-all duration-300 group"
          >
            <div className="flex items-center gap-3">
              <span className="text-white/30 text-[10px] group-hover:text-white/50 transition-colors duration-300">
                ←
              </span>
              <span className="text-[10px] tracking-[0.3em] text-white/40 group-hover:text-white/60 transition-colors duration-300">
                MAIN MENU
              </span>
            </div>
          </button>
        </div>

        {/* Sections */}
        <div className="px-4 pt-4 pb-4 space-y-2 relative">
          <p className="text-[10px] tracking-widest text-white/20 px-3 mb-3">
            NAVIGATION
          </p>
          {sections.map((section) => {
            const isActive = pathname.startsWith(section.path);
            return (
              <button
                key={section.path}
                onClick={() => {
                  if (section.unlocked) {
                    router.push(section.path);
                    setSidebarOpen(false);
                  }
                }}
                className={`w-full text-left px-4 py-3 border rounded-lg transition-all duration-300 group relative overflow-hidden ${
                  isActive
                    ? "border-white/30 bg-white/[0.06] shadow-[0_0_20px_rgba(255,255,255,0.04)]"
                    : section.unlocked
                    ? "border-white/[0.08] bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
                    : "border-white/[0.05] bg-white/[0.01] cursor-not-allowed"
                }`}
              >
                {/* Top accent line */}
                <div
                  className={`absolute top-0 left-0 right-0 h-[1px] transition-all duration-500 ${
                    isActive
                      ? "bg-gradient-to-r from-transparent via-green-400/60 to-transparent"
                      : section.unlocked
                      ? "bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:via-white/30"
                      : "bg-gradient-to-r from-transparent via-red-500/10 to-transparent"
                  }`}
                />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-sm transition-all duration-300 ${
                        isActive
                          ? "text-white/80 drop-shadow-[0_0_6px_rgba(255,255,255,0.4)]"
                          : section.unlocked
                          ? "text-white/30 group-hover:text-white/50"
                          : "text-red-500/20"
                      }`}
                    >
                      {section.icon}
                    </span>
                    <span
                      className={`text-[10px] tracking-[0.3em] ${
                        isActive
                          ? "text-white/80"
                          : section.unlocked
                          ? "text-white/40 group-hover:text-white/60"
                          : "text-red-500/30"
                      }`}
                    >
                      {section.label}
                    </span>
                  </div>
                  <span
                    className={`text-[8px] tracking-widest ${
                      isActive
                        ? "text-green-400/60"
                        : section.unlocked
                        ? "text-white/20"
                        : "text-red-500/30"
                    }`}
                  >
                    {section.status}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Locked Sections */}
        <div className="px-4 space-y-2 relative">
          <p className="text-[10px] tracking-widest text-red-500/20 px-3 mb-3 mt-2">
            RESTRICTED
          </p>
          {lockedSections.map((section, i) => (
            <div
              key={i}
              className="w-full px-4 py-3 border border-white/[0.04] rounded-lg relative overflow-hidden"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-sm text-red-500/15">◇</span>
                  <span className="text-[10px] tracking-[0.3em] text-red-500/15 animate-flicker">
                    {section.label}
                  </span>
                </div>
                <span className="text-[8px] tracking-widest text-red-500/20">
                  CLASSIFIED
                </span>
              </div>
              <div className="absolute inset-0 opacity-[0.015] pointer-events-none crt-noise" />
            </div>
          ))}
        </div>

        {/* Glitchy Blank Squares */}
        <div className="px-4 mt-6 relative">
          <div className="grid grid-cols-3 gap-2">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="aspect-square border border-white/[0.04] rounded relative overflow-hidden"
              >
                <div className="absolute inset-0 opacity-[0.04] crt-noise" />
                <div
                  className="absolute inset-0 animate-flicker"
                  style={{
                    background: `repeating-linear-gradient(
                      0deg,
                      transparent,
                      transparent 2px,
                      rgba(255,255,255,0.008) 2px,
                      rgba(255,255,255,0.008) 4px
                    )`,
                    animationDelay: `${i * 0.3}s`,
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="absolute bottom-0 left-0 right-0 px-6 py-4 border-t border-white/[0.06]">
          <p className="text-[10px] tracking-widest text-white/15">
            TERMINAL v2.4.1 · CLEARANCE: STANDARD
          </p>
        </div>
      </div>

      {/* Main Content */}
<div className="min-h-screen relative">
  {/* Center glow */}
  <div
    className="fixed inset-0 pointer-events-none z-[1]"
    style={{
      background: "radial-gradient(ellipse at center, rgba(255,255,255,0.04) 0%, transparent 50%)",
    }}
  />
  {children}
</div>
    </div>
  );
}