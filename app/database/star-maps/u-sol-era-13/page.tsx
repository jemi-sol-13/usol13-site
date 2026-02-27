"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Planet {
  id: string;
  name: string;
  type: string;
  title: string;
  color: string;
  glowColor: string;
  unlocked: boolean;
  description: string;
  meta: { label: string; value: string }[];
}

const SUN_DATA = {
  name: "U-SOL-E13",
  type: "Class-G Modified Star",
};

const PLANETS: Planet[] = [
  {
    id: "colorado-6",
    name: "Colorado-6",
    type: "UNCLASSIFIED",
    title: "???",
    color: "#e55f45",
    glowColor: "rgba(229,95,69,0.4)",
    unlocked: false,
    description: "",
    meta: [],
  },
  {
    id: "pac-man",
    name: "Pac-Man",
    type: "UNCLASSIFIED",
    title: "???",
    color: "#f0c420",
    glowColor: "rgba(240,196,32,0.4)",
    unlocked: false,
    description: "",
    meta: [],
  },
  {
    id: "nu-terra",
    name: "Nu Terra",
    type: "Terrestrial · Class-M",
    title: "The Second Cradle",
    color: "#26daaa",
    glowColor: "rgba(38,218,170,0.4)",
    unlocked: true,
    description:
      "Terraformed colony world. Served as the blueprint for all interstellar colonization efforts during the First Expansion.",
    meta: [
      { label: "Classification", value: "Habitable — Tier 1" },
      { label: "Governed By", value: "PENDING DATA" },
      { label: "Population", value: "PENDING DATA" },
    ],
  },
  {
    id: "u-sol",
    name: "U-Sol",
    type: "Bifurcated Rocky · Class-VII Grav. Anomaly",
    title: "The Jewel of the Rift",
    color: "#ff1493",
    glowColor: "rgba(255,20,147,0.4)",
    unlocked: true,
    description:
      "A planet split in two, held together by the harnessed core of a dead star from a previous civilization. One half is an urban sprawl of neon and commerce, the other an engineered green belt powering the whole system.",
    meta: [
      { label: "Founder", value: "Diamond Sfere" },
      { label: "Governed By", value: "System.E" },
      { label: "Capital", value: "Pink Neon Light City" },
      { label: "Classification", value: "Habitable — Commerce Hub" },
    ],
  },
  {
    id: "sor-mont",
    name: "Sor' Mont",
    type: "UNCLASSIFIED",
    title: "???",
    color: "#8b5cf6",
    glowColor: "rgba(139,92,246,0.4)",
    unlocked: false,
    description: "",
    meta: [],
  },
  {
    id: "project-saturn",
    name: "Project Saturn",
    type: "UNCLASSIFIED",
    title: "???",
    color: "#d4a437",
    glowColor: "rgba(212,164,55,0.4)",
    unlocked: false,
    description: "",
    meta: [],
  },
  {
    id: "gate-sector",
    name: "Gate Sector",
    type: "UNCLASSIFIED",
    title: "???",
    color: "#06b6d4",
    glowColor: "rgba(6,182,212,0.4)",
    unlocked: false,
    description: "",
    meta: [],
  },
  {
    id: "the-eye",
    name: "The Eye",
    type: "Anomalous Body · Unclassified Orbit",
    title: "The Watcher at the Edge",
    color: "#dc2626",
    glowColor: "rgba(220,38,38,0.4)",
    unlocked: true,
    description:
      "Outermost body in the system. Does not behave like a planet. Its orbit is wrong, its mass readings fluctuate, and long-range observation teams refuse to discuss what they saw.",
    meta: [
      { label: "Classification", value: "ANOMALOUS — Restricted" },
      { label: "Governed By", value: "N/A" },
      { label: "Advisory", value: "Do not approach without clearance" },
    ],
  },
];

function PlanetIcon({
  id,
  color,
  size = 24,
}: {
  id: string;
  color: string;
  size?: number;
}) {
  const s = size;
  const stroke = color;
  const props = {
    width: s,
    height: s,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke,
    strokeWidth: "1.5",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (id) {
    case "colorado-6":
      return (
        <svg {...props}>
          <path d="M4 20L10 8L14 14L17 10L22 20H4Z" />
        </svg>
      );
    case "pac-man":
      return (
        <svg {...props}>
          <path d="M20 12A8 8 0 1 1 12 4L12 12L20 12Z" />
          <circle cx="13" cy="8" r="1" fill={color} stroke="none" />
        </svg>
      );
    case "nu-terra":
      return (
        <svg {...props}>
          <path d="M12 22C12 22 4 16 4 10C4 6 8 2 12 2C16 2 20 6 20 10C20 16 12 22 12 22Z" />
          <path d="M12 2V22" />
          <path d="M7 9C9 9 12 12 12 12" />
          <path d="M17 9C15 9 12 12 12 12" />
        </svg>
      );
    case "u-sol":
      return (
        <svg {...props}>
          <path d="M12 2A10 10 0 0 1 12 22" />
          <path d="M12 2A10 10 0 0 0 12 22" />
          <line
            x1="12"
            y1="2"
            x2="12"
            y2="22"
            strokeDasharray="2 2"
          />
          <circle cx="12" cy="12" r="2" fill={color} stroke="none" />
        </svg>
      );
    case "sor-mont":
      return (
        <svg {...props}>
          <path d="M2 20L8 6L12 14" />
          <path d="M12 14L16 6L22 20" />
        </svg>
      );
    case "project-saturn":
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="5" />
          <ellipse
            cx="12"
            cy="12"
            rx="11"
            ry="4"
            transform="rotate(-20 12 12)"
          />
        </svg>
      );
    case "gate-sector":
      return (
        <svg {...props}>
          <path d="M4 22V8L12 2L20 8V22" />
          <path d="M9 22V14H15V22" />
        </svg>
      );
    case "the-eye":
      return (
        <svg {...props}>
          <path d="M2 12C2 12 6 5 12 5C18 5 22 12 22 12C22 12 18 19 12 19C6 19 2 12 2 12Z" />
          <circle cx="12" cy="12" r="3" />
          <circle cx="12" cy="12" r="1" fill={color} stroke="none" />
        </svg>
      );
    default:
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="8" />
        </svg>
      );
  }
}

const PLANET_SPACING = 2200;
const PLANET_SIZE = 1200;

export default function USolEra13Page() {
  const router = useRouter();
  const [selectedIndex, setSelectedIndex] = useState(3);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [planetTextVisible, setPlanetTextVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    setShowInfo(false);
    setPlanetTextVisible(false);
    const t = setTimeout(() => setShowInfo(true), 2000);
    return () => clearTimeout(t);
  }, [selectedIndex]);

  const selectedPlanet = PLANETS[selectedIndex];

  return (
    <div className="min-h-screen bg-black relative overflow-hidden select-none font-[family-name:var(--font-typewriter)]">
      {/* Scanline */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-20">
        <div className="absolute left-0 w-full h-[1px] bg-white/[0.03] animate-scanline" />
      </div>

      {/* Starfield */}
      <div
        className="fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(1px 1px at 20% 30%, rgba(255,255,255,0.2), transparent), radial-gradient(1px 1px at 40% 70%, rgba(255,255,255,0.15), transparent), radial-gradient(1px 1px at 60% 20%, rgba(255,255,255,0.18), transparent), radial-gradient(1px 1px at 80% 50%, rgba(255,255,255,0.12), transparent), radial-gradient(1.5px 1.5px at 10% 80%, rgba(255,255,255,0.25), transparent), radial-gradient(1px 1px at 70% 90%, rgba(255,255,255,0.15), transparent), radial-gradient(1px 1px at 90% 10%, rgba(255,255,255,0.2), transparent)",
        }}
      />

      {/* Top bar */}
      <div className="fixed top-0 left-0 right-0 z-30 flex justify-between items-center px-8 py-4">
        <div className="flex items-center gap-3 ml-10">
          <div className="w-2 h-2 bg-green-400 rounded-full shadow-[0_0_10px_rgba(0,255,0,0.5)]" />
          <span className="text-white/70 text-[11px] tracking-widest">
            CONNECTED
          </span>
        </div>
        <span className="text-white/50 text-[11px] tracking-widest">
          {SUN_DATA.name} · {SUN_DATA.type}
        </span>
        <span className="text-white/70 text-[11px] tracking-widest">
          U-SOL-13 // STAR MAP
        </span>
      </div>

      {/* ===== LEFT SIDE INFO PANEL ===== */}
      {showInfo && (
        <div className="fixed left-10 top-[50%] -translate-y-1/2 z-30 w-[320px] ml-6">
          <p
            className="text-[12px] tracking-[0.4em] uppercase mb-2 animate-fadeIn"
            style={{ color: selectedPlanet.color }}
          >
            {selectedPlanet.unlocked
              ? selectedPlanet.type.toUpperCase()
              : "DATA RESTRICTED"}
          </p>

          <h1
            className="text-4xl tracking-[0.4em] text-white uppercase animate-fadeIn"
            style={{
              animationDelay: "0.1s",
              textShadow: "0 0 20px rgba(255,255,255,0.15)",
            }}
          >
            {selectedPlanet.unlocked ? selectedPlanet.name : "???"}
          </h1>

          <div
            className="h-[1px] mt-3 mb-4 animate-fadeIn"
            style={{
              background: `linear-gradient(to right, ${selectedPlanet.color}80, transparent)`,
              animationDelay: "0.15s",
            }}
          />

          {selectedPlanet.unlocked && selectedPlanet.title && (
            <p
              className="text-[13px] tracking-[0.3em] uppercase mb-5 animate-fadeIn"
              style={{
                color: selectedPlanet.color,
                animationDelay: "0.2s",
              }}
            >
              &quot;{selectedPlanet.title}&quot;
            </p>
          )}

          {selectedPlanet.unlocked && selectedPlanet.description && (
            <p
              className="text-[13px] leading-[26px] text-white/75 mb-7 animate-fadeIn"
              style={{ animationDelay: "0.4s" }}
            >
              {selectedPlanet.description}
            </p>
          )}

          {selectedPlanet.unlocked && selectedPlanet.meta.length > 0 && (
            <div
              className="space-y-3 animate-fadeIn"
              style={{ animationDelay: "0.6s" }}
            >
              {selectedPlanet.meta.map((m, mi) => (
                <div key={mi}>
                  <p className="text-[9px] tracking-[0.3em] text-white/40 uppercase">
                    {m.label}
                  </p>
                  <p
                    className="text-[12px] tracking-widest mt-0.5 uppercase"
                    style={{ color: selectedPlanet.color }}
                  >
                    {m.value}
                  </p>
                </div>
              ))}
            </div>
          )}

          {!selectedPlanet.unlocked && (
            <div
              className="mt-4 animate-fadeIn"
              style={{ animationDelay: "0.3s" }}
            >
              <div className="inline-block border border-red-500/30 px-5 py-2 bg-red-500/[0.05] rounded-lg">
                <span className="text-red-400/80 text-[11px] tracking-[0.3em]">
                  CLEARANCE REQUIRED
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ===== RIGHT SIDE PLANET MENU ===== */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-30 space-y-0.5 mr-2">
        {PLANETS.map((planet, i) => {
          const isSelected = i === selectedIndex;
          return (
            <button
              key={planet.id}
              onClick={() => setSelectedIndex(i)}
              className="flex items-center gap-3 group cursor-pointer w-full py-1.5 justify-end"
            >
              <div className="flex flex-col items-end">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-[11px] tracking-[0.2em] uppercase transition-all duration-300 ${
                      isSelected
                        ? "text-white"
                        : planet.unlocked
                        ? "text-white/60 group-hover:text-white/80"
                        : "text-white/25 group-hover:text-white/40"
                    }`}
                  >
                    {planet.unlocked ? planet.name : "???"}
                  </span>
                  {isSelected && (
                    <div
                      className="w-[16px] h-[5px] rounded-sm"
                      style={{ background: planet.color }}
                    />
                  )}
                </div>
                <span
                  className={`text-[8px] tracking-widest transition-all duration-300 ${
                    isSelected
                      ? "opacity-70"
                      : "opacity-30 group-hover:opacity-50"
                  }`}
                  style={{ color: isSelected ? planet.color : "white" }}
                >
                  {((i + 1) * 1.2).toFixed(2)} AU
                </span>
              </div>

              <div
                className={`flex-shrink-0 transition-all duration-300 ${
                  isSelected
                    ? "opacity-100"
                    : planet.unlocked
                    ? "opacity-50 group-hover:opacity-70"
                    : "opacity-25 group-hover:opacity-40"
                }`}
              >
                <PlanetIcon
                  id={planet.id}
                  color={
                    isSelected ? planet.color : "rgba(255,255,255,0.6)"
                  }
                  size={22}
                />
              </div>

              <div className="relative flex items-center justify-center flex-shrink-0">
                <div
                  className={`w-[12px] h-[12px] rounded-full border transition-all duration-300 ${
                    isSelected
                      ? "border-white/90"
                      : "border-white/25 group-hover:border-white/50"
                  }`}
                />
                {isSelected && (
                  <div className="absolute w-[4px] h-[4px] rounded-full bg-white" />
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* ===== 3D PLANET SCENE ===== */}
      <div
        className="fixed inset-0 z-10"
        style={{
          perspective: "900px",
          perspectiveOrigin: "50% 60%",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            transformStyle: "preserve-3d",
            transform: "rotateX(-15deg)",
          }}
        >
          {PLANETS.map((planet, i) => {
            const translateZ = PLANET_SPACING * (selectedIndex - i);
            const distanceFromSelected = Math.abs(selectedIndex - i);
            const opacity = Math.max(
              0,
              1.2 - distanceFromSelected * 0.7
            );
            const isSelected = i === selectedIndex;

            return (
              <div
                key={planet.id}
                className="absolute left-1/2 bottom-0"
                style={{
                  width: `${PLANET_SIZE}px`,
                  height: `${PLANET_SIZE}px`,
                  marginLeft: `-${PLANET_SIZE / 2}px`,
                  marginBottom: `-${PLANET_SIZE - 280}px`,
                  transform: `translateZ(${translateZ}px) rotateX(4deg) scaleX(0.9)`,
                  transition: isLoaded
                    ? "transform 2.5s cubic-bezier(0.33, 0, 0, 1), opacity 1.5s ease"
                    : "none",
                  opacity: opacity,
                  zIndex: isSelected ? 5 : 1,
                }}
              >
                {/* Planet Sphere */}
                <div
                  className="w-full h-full rounded-full relative cursor-pointer overflow-hidden"
                  onClick={() => {
                    if (isSelected) {
                      setPlanetTextVisible((prev) => !prev);
                    } else {
                      setSelectedIndex(i);
                    }
                  }}
                  style={{
                    background: `linear-gradient(to bottom, ${planet.color} 0%, ${planet.color}cc 5%, ${planet.color}80 15%, ${planet.color}40 25%, #0a0a0a 75%, #000000 100%), #000`,
                    boxShadow: `0 0 80px 20px ${planet.glowColor}, 0 0 160px 60px ${planet.glowColor}`,
                  }}
                >
                  {/* NEON planet name — only on click */}
                  {isSelected && planetTextVisible && (
                    <div
                      className="absolute inset-0 flex flex-col items-center z-10"
                      style={{
                        paddingTop: `${PLANET_SIZE * 0.35}px`,
                      }}
                    >
                      <p
                        className="text-[13px] tracking-[0.5em] uppercase mb-2 animate-fadeIn"
                        style={{
                          color: planet.color,
                          textShadow: `0 0 10px ${planet.color}, 0 0 20px ${planet.glowColor}`,
                        }}
                      >
                        {planet.unlocked ? "PLANET" : "CLASSIFIED"}
                      </p>
                      <h2
                        className="text-6xl tracking-[0.6em] uppercase animate-fadeIn font-bold"
                        style={{
                          color: planet.color,
                          animationDelay: "0.1s",
                          textShadow: `0 0 20px ${planet.color}, 0 0 60px ${planet.glowColor}, 0 0 100px ${planet.glowColor}`,
                        }}
                      >
                        {planet.unlocked ? planet.name : "???"}
                      </h2>
                    </div>
                  )}

                  {/* Locked overlay */}
                  {!planet.unlocked && (
                    <div className="absolute inset-0 rounded-full overflow-hidden">
                      <div className="absolute inset-0 bg-black/40 z-[1]" />
                      <div className="absolute inset-0 crt-noise opacity-[0.08] z-[2]" />
                      <div
                        className="absolute inset-0 flex items-center justify-center z-[3]"
                        style={{
                          paddingTop: `${PLANET_SIZE * 0.15}px`,
                        }}
                      >
                        <div className="border border-white/[0.15] px-4 py-2 bg-black/30 rounded animate-flicker">
                          <span className="text-red-400/70 text-[11px] tracking-[0.3em]">
                            CLASSIFIED
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 z-30 flex justify-between items-center px-8 py-4 border-t border-white/[0.06]">
        <button
          onClick={() => router.push("/database/star-maps")}
          className="text-white/40 text-[11px] tracking-widest hover:text-white/70 transition-colors duration-300 cursor-pointer"
        >
          ← BACK TO SYSTEMS
        </button>
        <div className="flex gap-[3px]">
          <div className="w-[4px] h-[4px] bg-white/30" />
          <div className="w-[4px] h-[4px] bg-white/20" />
          <div className="w-[4px] h-[4px] bg-white/30" />
          <div className="w-[4px] h-[4px] bg-white/20" />
        </div>
        <div className="flex items-center gap-6">
          <span className="text-white/40 text-[11px] tracking-widest">
            BODIES: {PLANETS.length}
          </span>
          <span className="text-white/40 text-[11px] tracking-widest">
            UNLOCKED: {PLANETS.filter((p) => p.unlocked).length}/
            {PLANETS.length}
          </span>
        </div>
      </div>
    </div>
  );
}