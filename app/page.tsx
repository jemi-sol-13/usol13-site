"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const PLAYERS: Record<string, { password: string; name: string }> = {
  "@dr.saw.your.bone": { password: "Northstar", name: "Dr. Sawbone" },
  "@maestro": { password: "goldhand", name: "Red Wraith" },
  "@atomatics": { password: "k4rd35h3vscale", name: "Alexei" },
  "@sai50001": { password: "rememberourpromise", name: "50001" },
};

const HACK_LINES = [
  "> INITIATING SECURE CONNECTION...",
  "> PINGING RELAY NODE 0x7A3F... ALIVE",
  "> ENCRYPTING CHANNEL... AES-256-GCM",
  "> ROUTING THROUGH PROXY NODE 7.41.0.92",
  "> HANDSHAKE PROTOCOL... TLS 1.3 CONFIRMED",
  "> DECRYPTING CREDENTIALS... ██████████",
  "> CREDENTIAL HASH: 9a3f...c7e1 — VERIFIED",
  "> BYPASSING FIREWALL LAYER 1... OK",
  "> BYPASSING FIREWALL LAYER 2... OK",
  "> BYPASSING FIREWALL LAYER 3... OK",
  "> FIREWALL STATUS: ALL LAYERS CLEAR",
  "> ACCESSING MAINFRAME...",
  "> READING SECTOR 0x00FF... CLEAN",
  "> READING SECTOR 0x01AA... CLEAN",
  "> VERIFYING BIOMETRIC HASH... MATCH",
  "> LOADING USER PROFILE...",
  "> PARSING IDENTITY MATRIX... DONE",
  "> SYNCHRONIZING DATA NODES...",
  "> NODE CLUSTER 7A — SYNCED",
  "> NODE CLUSTER 7B — SYNCED",
  "> NODE CLUSTER 7C — SYNCED",
  "> ALLOCATING MEMORY BLOCK 0xFF3... OK",
  "> COMPILING ACCESS PERMISSIONS...",
  "> CLEARANCE LEVEL: CLASSIFIED",
  "> ESTABLISHING UPLINK TO U-SOL-13...",
  "> UPLINK SIGNAL STRENGTH: 98.7%",
  "> DATA STREAM INTEGRITY... NOMINAL",
  "> CONNECTION SECURED.",
  "> WELCOME TO THE NETWORK.",
  "> ACCESS GRANTED.",
];

function EyeIcon({ open }: { open: boolean }) {
  if (open) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    );
  }
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

export default function Home() {
  const [displayedText, setDisplayedText] = useState("");
  const [phase, setPhase] = useState("login" as "login" | "fisheye" | "tvnoise" | "hacking" | "welcome" | "menu");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [playerName, setPlayerName] = useState("");
  const [hackLines, setHackLines] = useState<string[]>([]);
  const [welcomeText, setWelcomeText] = useState("");
  const fullText = "U Sol e a Lua";
  const router = useRouter();

  useEffect(() => {
    if (phase !== "login") return;
    let index = 0;
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setDisplayedText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 250);
    return () => clearInterval(timer);
  }, [phase]);

  useEffect(() => {
    if (phase !== "hacking") return;
    let lineIndex = 0;
    const timer = setInterval(() => {
      if (lineIndex < HACK_LINES.length) {
        setHackLines((prev) => [...prev, HACK_LINES[lineIndex]]);
        lineIndex++;
      } else {
        clearInterval(timer);
        setTimeout(() => setPhase("welcome"), 1000);
      }
    }, 400);
    return () => clearInterval(timer);
  }, [phase]);

  useEffect(() => {
    if (phase !== "welcome") return;
    const welcome = `Welcome back, ${playerName}.`;
    let index = 0;
    const timer = setInterval(() => {
      if (index < welcome.length) {
        setWelcomeText(welcome.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
        setTimeout(() => setPhase("menu"), 2500);
      }
    }, 100);
    return () => clearInterval(timer);
  }, [phase, playerName]);

  const handleLogin = useCallback(() => {
    const user = PLAYERS[username.toLowerCase()];
    if (user && user.password === password) {
      setPlayerName(user.name);
      setError("");
      setPhase("fisheye");
      setTimeout(() => {
        setPhase("tvnoise");
      }, 1500);
      setTimeout(() => {
        setPhase("hacking");
      }, 4500);
    } else {
      setError("ACCESS DENIED — Invalid credentials");
    }
  }, [username, password]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") handleLogin();
    },
    [handleLogin]
  );

  if (phase === "tvnoise") {
    return (
      <div className="fixed inset-0 bg-black z-50">
        <div className="absolute inset-0 tv-scanlines pointer-events-none" />
      </div>
    );
  }

  if (phase === "hacking") {
    return (
      <div className="min-h-screen bg-black flex flex-col justify-end p-8 font-[family-name:var(--font-typewriter)] animate-fadeIn relative overflow-hidden">
        <div className="absolute left-0 w-full h-[2px] bg-white/5 animate-scanline pointer-events-none" />

        <div className="flex flex-col gap-1 mb-8">
          {hackLines.filter(Boolean).map((line, i) => (
            <p
              key={i}
              className={`text-sm tracking-wider animate-flicker ${
                line.includes("ACCESS GRANTED") || line.includes("WELCOME TO THE NETWORK")
                  ? "text-green-400"
                  : line.includes("OK") || line.includes("MATCH") || line.includes("SECURED") || line.includes("SYNCED") || line.includes("CLEAN") || line.includes("DONE") || line.includes("VERIFIED") || line.includes("CONFIRMED") || line.includes("NOMINAL") || line.includes("CLEAR")
                  ? "text-green-400/70"
                  : line.includes("CLASSIFIED")
                  ? "text-yellow-400"
                  : "text-white/70"
              }`}
            >
              {line}
            </p>
          ))}
          <span className="text-white animate-pulse">_</span>
        </div>
      </div>
    );
  }

  if (phase === "welcome") {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center font-[family-name:var(--font-typewriter)] animate-fadeIn">
        <h1 className="text-white text-4xl tracking-widest drop-shadow-[0_0_20px_rgba(255,255,255,0.8)]">
          {welcomeText}
          <span className="animate-pulse">|</span>
        </h1>
      </div>
    );
  }

  if (phase === "menu") {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-8 font-[family-name:var(--font-typewriter)] animate-fadeIn">
        <h1 className="text-white text-4xl tracking-widest drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]">
          U Sol e a Lua
        </h1>

        <p className="text-white/50 text-sm tracking-wider">
          Logged in as {playerName}
        </p>

        <div className="flex gap-6 mt-8">
          <button
            onClick={() => router.push("/feed")}
            className="border border-white rounded-lg bg-transparent text-white px-6 py-3 shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:shadow-[0_0_25px_rgba(255,255,255,0.5)] hover:bg-white/10 transition-all duration-300"
          >
            The Feed
          </button>
          <button
            onClick={() => router.push("/npcs")}
            className="border border-white rounded-lg bg-transparent text-white px-6 py-3 shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:shadow-[0_0_25px_rgba(255,255,255,0.5)] hover:bg-white/10 transition-all duration-300"
          >
            NPC Bios
          </button>
          <button
            onClick={() => router.push("/database")}
            className="border border-white rounded-lg bg-transparent text-white px-6 py-3 shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:shadow-[0_0_25px_rgba(255,255,255,0.5)] hover:bg-white/10 transition-all duration-300"
          >
            The Database
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen bg-black flex flex-col items-center justify-center gap-6 font-[family-name:var(--font-typewriter)] ${
        phase === "fisheye" ? "animate-fisheye" : ""
      }`}
    >
      <Image
        src="/sunsoul-clean.png"
        alt="The Sun and the Moon"
        width={200}
        height={200}
        className="drop-shadow-[0_0_25px_rgba(255,255,255,0.7)] animate-breathe"
      />

      <h1 className="text-white text-4xl tracking-widest drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]">
        {displayedText}
        <span className="animate-pulse">|</span>
      </h1>

      <div className="flex flex-col items-center gap-5 mt-4 w-96">
        <input
          type="text"
          placeholder="USERNAME"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full bg-transparent border border-white/50 rounded-lg px-4 py-2 text-white text-center text-sm tracking-wider focus:outline-none focus:border-white focus:shadow-[0_0_10px_rgba(255,255,255,0.3)] transition-all duration-300"
        />
        <div className="relative w-full">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="PASSKEY"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full bg-transparent border border-white/50 rounded-lg px-4 py-2 text-white text-center text-sm tracking-wider focus:outline-none focus:border-white focus:shadow-[0_0_10px_rgba(255,255,255,0.3)] transition-all duration-300"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute -right-8 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors duration-200"
          >
            <EyeIcon open={showPassword} />
          </button>
        </div>
        <button
          onClick={handleLogin}
          className="border border-white rounded-lg bg-transparent text-white px-12 py-2 shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:shadow-[0_0_25px_rgba(255,255,255,0.5)] hover:bg-white/10 transition-all duration-300 tracking-widest text-sm mt-2"
        >
          ENTER
        </button>

        {error && (
          <p className="text-red-500 text-center text-sm tracking-wider">{error}</p>
        )}
      </div>
    </div>
  );
}