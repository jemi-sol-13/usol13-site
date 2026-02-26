"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const PLAYERS: Record<string, { password: string; name: string }> = {
  "@dr.saw.your.bone": { password: "Northstar", name: "Dr. Sawbone" },
  "@maestro": { password: "goldhand", name: "Red Wraith" },
  "@atomatics": { password: "k4rd35h3vscale", name: "Alexei" },
  "@sai50001": { password: "rememberourpromise", name: "50001" },
  "@shami": { password: "shamionline", name: "Core 1" },
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

function LivePing() {
  const [ping, setPing] = useState(43);

  useEffect(() => {
    const timer = setInterval(() => {
      setPing(Math.floor(30 + Math.random() * 25));
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-end gap-[2px]">
      <div className="w-[3px] h-[6px] bg-white/60" />
      <div className="w-[3px] h-[10px] bg-white/60" />
      <div className="w-[3px] h-[14px] bg-white/60" />
      <span className="text-white/60 text-[9px] tracking-widest font-[family-name:var(--font-typewriter)] ml-1">
        {ping}ms
      </span>
    </div>
  );
}

function CRTFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 bg-black overflow-hidden">
      {/* Center backlight glow */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: "radial-gradient(ellipse at center, rgba(255,255,255,0.06) 0%, transparent 60%)",
        }}
      />

      {/* Vignette */}
      <div className="absolute inset-0 vignette z-20 pointer-events-none" />

      {/* Scanline */}
      <div className="absolute left-0 w-full h-[1px] bg-white/[0.03] animate-scanline z-10 pointer-events-none" />

      {/* ===== TOP CURVE LINE ===== */}
      <svg
        className="absolute top-[6%] left-[2%] right-[2%] w-[96%] h-[8%] z-30 pointer-events-none"
        viewBox="0 0 1000 60"
        preserveAspectRatio="none"
      >
        <path d="M0,55 Q500,5 1000,55" stroke="rgba(255,255,255,0.5)" fill="none" strokeWidth="1" />
      </svg>

      {/* Top-left flare */}
      <div className="absolute top-[12.5%] left-[1.8%] z-30 pointer-events-none">
        <div className="w-[3px] h-[3px] bg-white rounded-full" />
        <div className="absolute -inset-1 w-[6px] h-[6px] bg-white/60 rounded-full blur-[3px] animate-lightFlare" />
        <div className="absolute -inset-3 w-[10px] h-[10px] bg-white/20 rounded-full blur-[8px] animate-lightFlare" />
      </div>

      {/* Top-right flare */}
      <div className="absolute top-[12.5%] right-[1.8%] z-30 pointer-events-none">
        <div className="w-[3px] h-[3px] bg-white rounded-full" />
        <div className="absolute -inset-1 w-[6px] h-[6px] bg-white/60 rounded-full blur-[3px] animate-lightFlare" style={{ animationDelay: "1.5s" }} />
        <div className="absolute -inset-3 w-[10px] h-[10px] bg-white/20 rounded-full blur-[8px] animate-lightFlare" style={{ animationDelay: "1.5s" }} />
      </div>

      {/* ===== BOTTOM CURVE LINE ===== */}
      <svg
        className="absolute bottom-[6%] left-[2%] right-[2%] w-[96%] h-[8%] z-30 pointer-events-none"
        viewBox="0 0 1000 60"
        preserveAspectRatio="none"
      >
        <path d="M0,5 Q500,55 1000,5" stroke="rgba(255,255,255,0.5)" fill="none" strokeWidth="1" />
      </svg>

      {/* Bottom-left flare */}
      <div className="absolute bottom-[12.5%] left-[1.8%] z-30 pointer-events-none">
        <div className="w-[3px] h-[3px] bg-white rounded-full" />
        <div className="absolute -inset-1 w-[6px] h-[6px] bg-white/60 rounded-full blur-[3px] animate-lightFlare" style={{ animationDelay: "0.5s" }} />
        <div className="absolute -inset-3 w-[10px] h-[10px] bg-white/20 rounded-full blur-[8px] animate-lightFlare" style={{ animationDelay: "0.5s" }} />
      </div>

      {/* Bottom-right flare */}
      <div className="absolute bottom-[12.5%] right-[1.8%] z-30 pointer-events-none">
        <div className="w-[3px] h-[3px] bg-white rounded-full" />
        <div className="absolute -inset-1 w-[6px] h-[6px] bg-white/60 rounded-full blur-[3px] animate-lightFlare" style={{ animationDelay: "2s" }} />
        <div className="absolute -inset-3 w-[10px] h-[10px] bg-white/20 rounded-full blur-[8px] animate-lightFlare" style={{ animationDelay: "2s" }} />
      </div>

      {/* ===== HUD TOP-LEFT ===== */}
      <div className="absolute top-[15%] left-[4%] z-30 pointer-events-none animate-hudPulse">
        <div className="flex flex-col gap-[3px]">
          <div className="flex gap-[2px]">
            <div className="w-3 h-[3px] bg-white/60" />
            <div className="w-5 h-[3px] bg-white/50" />
            <div className="w-2 h-[3px] bg-white/40" />
          </div>
          <div className="flex gap-[6px] text-white/60 text-[8px] tracking-widest font-[family-name:var(--font-typewriter)]">
            <span>000</span>
            <span>000</span>
            <span>00</span>
          </div>
        </div>
      </div>

      {/* ===== HUD TOP-RIGHT ===== */}
      <div className="absolute top-[15%] right-[4%] z-30 pointer-events-none animate-hudPulse" style={{ animationDelay: "2s" }}>
        <div className="w-4 h-4 border-2 border-white/50 rotate-45" />
      </div>

      {/* ===== HUD BOTTOM-LEFT ===== */}
      <div className="absolute bottom-[15%] left-[4%] z-30 pointer-events-none animate-hudPulse" style={{ animationDelay: "1s" }}>
        <LivePing />
      </div>

      {/* ===== HUD BOTTOM-CENTER ===== */}
      <div className="absolute bottom-[15%] left-1/2 -translate-x-1/2 z-30 pointer-events-none animate-hudPulse" style={{ animationDelay: "3s" }}>
        <div className="flex items-center gap-[6px]">
          <div className="w-[1px] h-4 bg-white/40" />
          <div className="w-[1px] h-3 bg-white/30" />
          <div className="w-[1px] h-4 bg-white/40" />
          <div className="w-[1px] h-3 bg-white/30" />
          <div className="w-1.5 h-1.5 bg-white/60 rounded-full" />
          <div className="w-[1px] h-3 bg-white/30" />
          <div className="w-[1px] h-4 bg-white/40" />
          <div className="w-[1px] h-3 bg-white/30" />
          <div className="w-[1px] h-4 bg-white/40" />
        </div>
      </div>

      {/* ===== HUD BOTTOM-RIGHT ===== */}
      <div className="absolute bottom-[15%] right-[4%] z-30 pointer-events-none animate-hudPulse" style={{ animationDelay: "2.5s" }}>
        <div className="grid grid-cols-2 gap-[3px]">
          <div className="w-[7px] h-[7px] bg-white/50" />
          <div className="w-[7px] h-[7px] bg-white/40" />
          <div className="w-[7px] h-[7px] bg-white/40" />
          <div className="w-[7px] h-[7px] bg-white/50" />
        </div>
      </div>

      {/* ===== MAIN CONTENT ===== */}
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="scale-[0.9]">
          {children}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [displayedText, setDisplayedText] = useState("");
  const [phase, setPhase] = useState<"login" | "fisheye" | "tvnoise" | "hacking" | "welcome">("login");
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
        setTimeout(() => router.push("/menu"), 2500);
      }
    }, 100);
    return () => clearInterval(timer);
  }, [phase, playerName, router]);

  const handleLogin = useCallback(() => {
    const user = PLAYERS[username.toLowerCase()];
    if (user && user.password === password) {
      setPlayerName(user.name);
      localStorage.setItem("playerName", user.name);
      localStorage.setItem("loginTime", new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
      setError("");
      setPhase("fisheye");
      setTimeout(() => setPhase("tvnoise"), 1500);
      setTimeout(() => setPhase("hacking"), 4500);
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
      <CRTFrame>
        <div className="w-full max-w-2xl px-8 flex flex-col justify-end min-h-[60vh]">
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
      </CRTFrame>
    );
  }

  if (phase === "welcome") {
    return (
      <CRTFrame>
        <h1 className="text-white text-4xl tracking-widest drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] font-[family-name:var(--font-typewriter)]">
          {welcomeText}
          <span className="animate-cursorBlink">|</span>
        </h1>
      </CRTFrame>
    );
  }

  return (
    <CRTFrame>
      <div
        className={`flex flex-col items-center justify-center gap-6 font-[family-name:var(--font-typewriter)] ${
          phase === "fisheye" ? "animate-fisheye" : "animate-subtleFloat"
        }`}
      >
        <Image
          src="/sunsoul-clean.png"
          alt="The Sun and the Moon"
          width={180}
          height={180}
          className="drop-shadow-[0_0_25px_rgba(255,255,255,0.7)] animate-breathe"
        />

        <h1 className="text-white text-3xl tracking-widest drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]">
          {displayedText}
          <span className="animate-cursorBlink">|</span>
        </h1>

        <p className="text-white/20 text-xs tracking-[0.3em]">
          ······
        </p>

        <div className="flex flex-col items-center gap-4 mt-2 w-[420px]">
          <input
            type="text"
            placeholder="USERNAME"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full bg-white/[0.07] border-none rounded px-4 py-3 text-white text-center text-sm tracking-wider focus:outline-none focus:bg-white/[0.1] focus:shadow-[0_0_20px_rgba(255,255,255,0.05)] transition-all duration-300 placeholder:text-white/25"
          />
          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="PASSKEY"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full bg-white/[0.07] border-none rounded px-4 py-3 text-white text-center text-sm tracking-wider focus:outline-none focus:bg-white/[0.1] focus:shadow-[0_0_20px_rgba(255,255,255,0.05)] transition-all duration-300 placeholder:text-white/25"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute -right-8 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors duration-200"
            >
              <EyeIcon open={showPassword} />
            </button>
          </div>
          <button
            onClick={handleLogin}
            className="border border-white/15 rounded bg-transparent text-white/50 px-12 py-2.5 hover:bg-white/5 hover:text-white/70 transition-all duration-300 tracking-widest text-sm mt-1"
          >
            Confirm
          </button>

          {error && (
            <p className="text-red-500 text-center text-sm tracking-wider">{error}</p>
          )}
        </div>
      </div>
    </CRTFrame>
  );
}