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
  gradient: string;
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
    title: "??? ",
    color: "#e55f45",
    glowColor: "rgba(229,95,69,0.3)",
    gradient:
      "radial-gradient(circle at 35% 35%, #f4a393, #e55f45, #8b2010, #1a0505)",
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
    glowColor: "rgba(240,196,32,0.3)",
    gradient:
      "radial-gradient(circle at 35% 35%, #fff176, #f0c420, #a67c00, #1a1400)",
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
    glowColor: "rgba(38,218,170,0.3)",
    gradient:
      "radial-gradient(circle at 35% 35%, #80ffdb, #26daaa, #0a6847, #021a10)",
    unlocked: true,
    description:
      "Humanity's second home. A terraformed world that became the blueprint for interstellar colonization. Lush biomes engineered from the ground up, atmosphere processors running since the First Expansion. If Earth was the mother, Nu Terra is the proof that her children learned to walk.",
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
    glowColor: "rgba(255,20,147,0.35)",
    gradient:
      "radial-gradient(circle at 35% 35%, #ff8ad8, #ff1493, #8b0a50, #1a0010)",
    unlocked: true,
    description:
      "A planet cleaved in two, held in tension by the harnessed core of a dead star from a fallen civilization. The ancient sun sits tubed between the two hemispheres — a molten engine of incomprehensible power, feeding the planet's gravity wells and keeping both halves locked in perpetual equilibrium. One face is a sprawling urban superstructure — towers of glass and neon stacked miles high, market districts that never sleep, entertainment sectors that draw visitors from across the system. The other face is an engineered green belt — vast bio-energy farms and atmospheric processors that keep the machine running.",
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
    glowColor: "rgba(139,92,246,0.3)",
    gradient:
      "radial-gradient(circle at 35% 35%, #c4b5fd, #8b5cf6, #4c1d95, #0a0020)",
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
    glowColor: "rgba(212,164,55,0.3)",
    gradient:
      "radial-gradient(circle at 35% 35%, #fde68a, #d4a437, #7c5e10, #1a1000)",
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
    glowColor: "rgba(6,182,212,0.3)",
    gradient:
      "radial-gradient(circle at 35% 35%, #67e8f9, #06b6d4, #0e4f5c, #001a20)",
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
    gradient:
      "radial-gradient(circle at 45% 45%, #dc2626, #7f1d1d, #1a0000, #000000)",
    unlocked: true,
    description:
      "The outermost body in the U-SOL-ERA 13 system. Shrouded in classified warnings and contradictory scanner data. What is known: it does not behave like a planet. Its orbit is wrong. Its mass readings fluctuate. Long-range observation teams rotate out every 90 days — none of them talk about what they saw.",
    meta: [
      { label: "Classification", value: "ANOMALOUS — Restricted" },
      { label: "Governed By", value: "N/A" },
      { label: "Advisory", value: "Do not approach without clearance" },
    ],
  },
];

const PLANET_SPACING = 2200;
const PLANET_SIZE = 700;

export default function USolEra13Page() {
  const router = useRouter();
  const [selectedIndex, setSelectedIndex] = useState(3); // Default to U-Sol
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  const selectedPlanet = PLANETS[selectedIndex];

  return (
    <div className="min-h-screen bg-black relative overflow-hidden select-none">
      {/* Scanlines */}
      <div className="fixed inset-0 pointer-events-none animate-scanline opacity-[0.02] z-20" />

      {/* Starfield background */}
      <div
        className="fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(1px 1px at 20% 30%, rgba(255,255,255,0.15), transparent), radial-gradient(1px 1px at 40% 70%, rgba(255,255,255,0.1), transparent), radial-gradient(1px 1px at 60% 20%, rgba(255,255,255,0.12), transparent), radial-gradient(1px 1px at 80% 50%, rgba(255,255,255,0.08), transparent), radial-gradient(1.5px 1.5px at 10% 80%, rgba(255,255,255,0.18), transparent), radial-gradient(1px 1px at 70% 90%, rgba(255,255,255,0.1), transparent), radial-gradient(1px 1px at 90% 10%, rgba(255,255,255,0.14), transparent), radial-gradient(1px 1px at 50% 50%, rgba(255,255,255,0.06), transparent), radial-gradient(1.5px 1.5px at 30% 60%, rgba(255,255,255,0.12), transparent), radial-gradient(1px 1px at 85% 35%, rgba(255,255,255,0.09), transparent)",
        }}
      />

      {/* Top bar */}
      <div className="fixed top-0 left-0 right-0 z-30 px-8 py-4 flex justify-between items-center">
        <div className="ml-12">
          <span className="text-[8px] tracking-[3px] text-white/20 uppercase">
            Star Map · U-SOL-ERA 13
          </span>
        </div>
        <div className="flex items-center gap-6">
          <span className="text-[8px] tracking-[2px] text-white/15 uppercase">
            {SUN_DATA.name} · {SUN_DATA.type}
          </span>
          <span className="text-[8px] tracking-[2px] text-green-400/30 uppercase">
            ● Connected
          </span>
        </div>
      </div>

      {/* Planet Menu — Right Side */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-30 space-y-1">
        {PLANETS.map((planet, i) => {
          const isSelected = i === selectedIndex;
          return (
            <button
              key={planet.id}
              onClick={() => setSelectedIndex(i)}
              className="flex items-center gap-3 group cursor-pointer text-right w-full justify-end"
            >
              <div className="flex flex-col items-end">
                <span
                  className={`text-[9px] tracking-[2px] uppercase transition-all duration-300 ${
                    isSelected
                      ? "opacity-100"
                      : "opacity-0 group-hover:opacity-70"
                  }`}
                  style={{
                    color: isSelected ? planet.color : "rgba(255,255,255,0.5)",
                  }}
                >
                  {planet.unlocked ? planet.name : "???"}
                </span>
                <span
                  className={`text-[7px] tracking-[2px] uppercase transition-all duration-300 ${
                    isSelected
                      ? "opacity-50"
                      : "opacity-0 group-hover:opacity-30"
                  }`}
                  style={{ color: planet.color }}
                >
                  {i + 1}.0 AU
                </span>
              </div>
              <div className="relative flex items-center justify-center">
                <div
                  className={`w-3 h-3 rounded-full border transition-all duration-300 ${
                    isSelected ? "border-white/60" : "border-white/15 group-hover:border-white/30"
                  }`}
                >
                  <div
                    className={`absolute inset-[3px] rounded-full transition-all duration-300 ${
                      isSelected ? "opacity-100" : "opacity-0"
                    }`}
                    style={{ background: planet.color }}
                  />
                </div>
                {isSelected && (
                  <div
                    className="absolute w-3 h-3 rounded-full animate-ping"
                    style={{
                      background: planet.color,
                      opacity: 0.2,
                    }}
                  />
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* 3D Planet Scene */}
      <div
        className="fixed inset-0 z-10"
        style={{
          perspective: "900px",
          perspectiveOrigin: "50% 50%",
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
            const opacity = Math.max(0, 1.2 - distanceFromSelected * 0.7);
            const isSelected = i === selectedIndex;

            return (
              <div
                key={planet.id}
                className="absolute left-1/2 bottom-0"
                style={{
                  width: `${PLANET_SIZE}px`,
                  height: `${PLANET_SIZE}px`,
                  marginLeft: `-${PLANET_SIZE / 2}px`,
                  marginBottom: `-${PLANET_SIZE - 250}px`,
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
                  className="w-full h-full rounded-full relative cursor-pointer"
                  onClick={() => setSelectedIndex(i)}
                  style={{
                    background: planet.gradient,
                    boxShadow: `
                      inset 0 -${PLANET_SIZE * 0.4}px ${PLANET_SIZE * 0.2}px rgba(0,0,0,0.95),
                      inset 0 0 ${PLANET_SIZE * 0.15}px 40px ${planet.glowColor},
                      0 0 80px 20px ${planet.glowColor}
                    `,
                    animation: isSelected
                      ? "planetRotate 80s linear infinite"
                      : "none",
                    backgroundSize: "200% 200%",
                  }}
                >
                  {/* Locked overlay */}
                  {!planet.unlocked && (
                    <div className="absolute inset-0 rounded-full overflow-hidden">
                      <div className="absolute inset-0 bg-black/60 z-[1]" />
                      <div className="absolute inset-0 crt-noise opacity-[0.1] z-[2]" />
                      <div className="absolute inset-0 flex items-center justify-center z-[3]">
                        <div className="border border-red-500/30 px-4 py-2 bg-black/40 animate-flicker">
                          <span className="text-red-500/60 text-[10px] tracking-[4px] uppercase">
                            CLASSIFIED
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Shadow overlay at bottom */}
                <div
                  className="absolute pointer-events-none"
                  style={{
                    width: `${PLANET_SIZE * 1.5}px`,
                    height: `${PLANET_SIZE * 0.5}px`,
                    left: `${-PLANET_SIZE * 0.25}px`,
                    top: `-${PLANET_SIZE * 0.2}px`,
                    borderRadius: "50%",
                    boxShadow: "inset 0 -200px 200px 100px black",
                    zIndex: 2,
                  }}
                />

                {/* Planet Description — only for selected */}
                {isSelected && (
                  <div
                    className="absolute left-1/2 -translate-x-1/2 text-center z-10"
                    style={{
                      width: "580px",
                      top: `-${PLANET_SIZE * 0.15}px`,
                    }}
                  >
                    <p
                      className="text-[9px] tracking-[5px] uppercase mb-1"
                      style={{
                        color: `${planet.color}99`,
                        animation: "fadeIn 0.8s 2s both",
                      }}
                    >
                      {planet.unlocked ? planet.type : "DATA RESTRICTED"}
                    </p>
                    <h1
                      className="text-3xl tracking-[14px] uppercase text-white/90"
                      style={{
                        fontFamily: "'Special Elite', cursive",
                        animation: "fadeIn 0.6s 1.8s both",
                      }}
                    >
                      {planet.unlocked ? planet.name : "???"}
                    </h1>
                    {planet.unlocked && planet.title && (
                      <p
                        className="text-[10px] tracking-[4px] uppercase mt-2"
                        style={{
                          color: `${planet.color}80`,
                          animation: "fadeIn 0.6s 2.2s both",
                        }}
                      >
                        &quot;{planet.title}&quot;
                      </p>
                    )}

                    {planet.unlocked && planet.description && (
                      <p
                        className="text-[11px] leading-[22px] text-white/50 mt-6 max-w-md mx-auto font-light"
                        style={{ animation: "fadeIn 1s 2.8s both" }}
                      >
                        {planet.description}
                      </p>
                    )}

                    {planet.unlocked && planet.meta.length > 0 && (
                      <div
                        className="mt-6 flex flex-wrap justify-center gap-x-8 gap-y-2"
                        style={{ animation: "fadeIn 0.8s 3.2s both" }}
                      >
                        {planet.meta.map((m, mi) => (
                          <div key={mi} className="text-center">
                            <p className="text-[7px] tracking-[3px] text-white/20 uppercase">
                              {m.label}
                            </p>
                            <p
                              className="text-[10px] tracking-[2px] uppercase mt-0.5"
                              style={{ color: `${planet.color}90` }}
                            >
                              {m.value}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}

                    {!planet.unlocked && (
                      <div
                        className="mt-8"
                        style={{ animation: "fadeIn 1s 2.5s both" }}
                      >
                        <div className="inline-block border border-red-500/20 px-6 py-2 bg-red-500/[0.03]">
                          <span className="text-red-500/50 text-[9px] tracking-[4px] uppercase">
                            CLEARANCE REQUIRED
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 z-30 px-8 py-3 flex justify-between items-center border-t border-white/[0.04]">
        <button
          onClick={() => router.push("/database/star-maps")}
          className="text-[8px] tracking-[3px] text-white/20 hover:text-white/40 uppercase transition-colors cursor-pointer"
        >
          ← Back to Systems
        </button>
        <div className="flex items-center gap-6">
          <span className="text-[8px] tracking-[2px] text-white/15 uppercase">
            Bodies: {PLANETS.length}
          </span>
          <span className="text-[8px] tracking-[2px] text-white/15 uppercase">
            Unlocked: {PLANETS.filter((p) => p.unlocked).length}/
            {PLANETS.length}
          </span>
        </div>
      </div>
    </div>
  );
}