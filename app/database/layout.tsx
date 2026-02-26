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
    },
    {
      label: "STAR MAPS",
      path: "/database/star-maps",
      status: "ACTIVE",
      unlocked: true,
    },
    {
      label: "COMMS / TRANSMISSIONS",
      path: "/database/comms",
      status: "RESTRICTED",
      unlocked: false,
    },
  ];

  const lockedSections = [
    { label: "████████████" },
    { label: "██████ ███" },
    { label: "████ ██████████" },
  ];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Hamburger Toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-6 left-6 z-50 flex flex-col gap-[5px] cursor-pointer group"
        aria-label="Toggle menu"
      >
        <span
          className={`block w-6 h-[2px] bg-white/80 transition-all duration-300 ${
            sidebarOpen ? "rotate-45 translate-y-[7px]" : "group-hover:bg-white"
          }`}
        />
        <span
          className={`block w-6 h-[2px] bg-white/80 transition-all duration-300 ${
            sidebarOpen ? "opacity-0" : "group-hover:bg-white"
          }`}
        />
        <span
          className={`block w-6 h-[2px] bg-white/80 transition-all duration-300 ${
            sidebarOpen
              ? "-rotate-45 -translate-y-[7px]"
              : "group-hover:bg-white"
          }`}
        />
      </button>

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/70 z-30 transition-opacity duration-300 ${
          sidebarOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-[300px] z-40 transition-transform duration-300 ease-in-out border-r border-white/[0.06] ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.97) 0%, rgba(5,5,5,0.99) 100%)",
          backdropFilter: "blur(20px)",
        }}
      >
        {/* Header */}
        <div className="pt-20 px-6 pb-5 border-b border-white/[0.06]">
          <p className="text-[9px] tracking-[4px] text-white/30 uppercase font-light">
            System Terminal
          </p>
          <h2
            className="text-base tracking-[8px] text-white/80 uppercase mt-1"
            style={{ fontFamily: "'Special Elite', cursive" }}
          >
            DATABASE
          </h2>
          <div className="w-8 h-[1px] bg-white/20 mt-3" />
        </div>

        {/* Sections */}
        <div className="px-4 pt-6 pb-4 space-y-1.5">
          <p className="text-[8px] tracking-[3px] text-white/20 uppercase px-3 mb-3">
            Navigation
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
                className={`w-full text-left px-4 py-3 border transition-all duration-200 group relative ${
                  isActive
                    ? "border-green-500/30 bg-green-500/[0.04]"
                    : section.unlocked
                    ? "border-white/[0.04] hover:border-white/10 hover:bg-white/[0.02]"
                    : "border-red-500/10 bg-red-900/[0.04] cursor-not-allowed"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span
                      className={`block w-1.5 h-1.5 rounded-full ${
                        isActive
                          ? "bg-green-400 shadow-[0_0_6px_rgba(74,222,128,0.4)]"
                          : section.unlocked
                          ? "bg-white/20 group-hover:bg-white/40"
                          : "bg-red-500/30"
                      }`}
                    />
                    <span
                      className={`text-[10px] tracking-[3px] uppercase ${
                        isActive
                          ? "text-green-400/90"
                          : section.unlocked
                          ? "text-white/50 group-hover:text-white/70"
                          : "text-red-400/40"
                      }`}
                    >
                      {section.label}
                    </span>
                  </div>
                  <span
                    className={`text-[7px] tracking-[2px] px-2 py-0.5 ${
                      isActive
                        ? "text-green-400/60 border border-green-500/20"
                        : section.unlocked
                        ? "text-white/20"
                        : "text-red-500/40 border border-red-500/15"
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
        <div className="px-4 space-y-1.5">
          <p className="text-[8px] tracking-[3px] text-red-500/20 uppercase px-3 mb-3 mt-2">
            Restricted
          </p>
          {lockedSections.map((section, i) => (
            <div
              key={i}
              className="w-full px-4 py-3 border border-red-500/[0.06] relative overflow-hidden"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="block w-1.5 h-1.5 rounded-full bg-red-500/20" />
                  <span className="text-[10px] tracking-[3px] text-red-500/20 animate-flicker">
                    {section.label}
                  </span>
                </div>
                <span className="text-[7px] tracking-[2px] text-red-500/25 border border-red-500/10 px-2 py-0.5">
                  CLASSIFIED
                </span>
              </div>
              <div className="absolute inset-0 opacity-[0.015] pointer-events-none crt-noise" />
            </div>
          ))}
        </div>

        {/* Glitchy Blank Squares */}
        <div className="px-4 mt-6">
          <div className="grid grid-cols-3 gap-2">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="aspect-square border border-red-500/[0.06] relative overflow-hidden"
              >
                <div className="absolute inset-0 opacity-[0.04] crt-noise" />
                <div
                  className="absolute inset-0 animate-flicker"
                  style={{
                    background: `repeating-linear-gradient(
                      0deg,
                      transparent,
                      transparent 2px,
                      rgba(255,0,0,0.01) 2px,
                      rgba(255,0,0,0.01) 4px
                    )`,
                    animationDelay: `${i * 0.3}s`,
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="absolute bottom-0 left-0 right-0 px-6 py-4 border-t border-white/[0.04]">
          <p className="text-[7px] tracking-[2px] text-white/15 uppercase">
            Terminal v2.4.1 · Clearance: Standard
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="min-h-screen">{children}</div>
    </div>
  );
}