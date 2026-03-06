"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/app/supabaseClient";

/* ============================================================
   TYPES
   ============================================================ */
interface Report {
  id: string;
  slug: string;
  title: string;
  classification: string;
  category: string;
  solved: boolean;
  content: string;
  target_frequency: number;
  target_amplitude: number;
  target_phase: number;
  cipher_code: string;
  solved_by: string | null;
  solved_at: string | null;
}

const TOLERANCE = 2.5;

/* ============================================================
   MORSE CODE UTILITIES
   ============================================================ */
const MORSE_MAP: Record<string, string> = {
  A: ".-", B: "-...", C: "-.-.", D: "-..", E: ".", F: "..-.",
  G: "--.", H: "....", I: "..", J: ".---", K: "-.-", L: ".-..",
  M: "--", N: "-.", O: "---", P: ".--.", Q: "--.-", R: ".-.",
  S: "...", T: "-", U: "..-", V: "...-", W: ".--", X: "-..-",
  Y: "-.--", Z: "--..", "0": "-----", "1": ".----", "2": "..---",
  "3": "...--", "4": "....-", "5": ".....", "6": "-....", "7": "--...",
  "8": "---..", "9": "----.",
};

function textToMorse(text: string): string {
  return text
    .toUpperCase()
    .split("")
    .map((ch) => MORSE_MAP[ch] || "")
    .filter(Boolean)
    .join(" / ");
}

/* ============================================================
   AUDIO ENGINE
   ============================================================ */
class RadioAudioEngine {
  private ctx: AudioContext | null = null;
  private noiseGain: GainNode | null = null;
  private toneGain: GainNode | null = null;
  private masterGain: GainNode | null = null;
  private noiseSource: AudioBufferSourceNode | null = null;
  private isPlaying = false;
  private morseSequence: string = "";
  private abortController: AbortController | null = null;

  async init() {
    if (this.ctx) return;
    this.ctx = new AudioContext();

    // Master volume — soft
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.value = 0.25;
    this.masterGain.connect(this.ctx.destination);

    // Static noise channel
    this.noiseGain = this.ctx.createGain();
    this.noiseGain.gain.value = 0.8;
    this.noiseGain.connect(this.masterGain);
    this.startNoise();

    // Morse tone channel
    this.toneGain = this.ctx.createGain();
    this.toneGain.gain.value = 0.0;
    this.toneGain.connect(this.masterGain);
  }

  private startNoise() {
    if (!this.ctx || !this.noiseGain) return;
    const bufferSize = this.ctx.sampleRate * 2;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.5;
    }
    this.noiseSource = this.ctx.createBufferSource();
    this.noiseSource.buffer = buffer;
    this.noiseSource.loop = true;
    this.noiseSource.connect(this.noiseGain);
    this.noiseSource.start();
  }

  setClarity(match: number) {
    // match: 0 = no match, 1 = perfect match
    if (this.noiseGain) {
      this.noiseGain.gain.value = 0.8 * (1 - match * 0.9);
    }
    if (this.toneGain) {
      this.toneGain.gain.value = match * 0.7;
    }
  }

  async playMorseLoop(code: string) {
    this.morseSequence = textToMorse(code);
    if (this.isPlaying) return;
    this.isPlaying = true;

    while (this.isPlaying) {
      this.abortController = new AbortController();
      await this.playMorseOnce(this.abortController.signal);
      if (!this.isPlaying) break;
      await this.sleep(2000); // gap between loops
    }
  }

  private async playMorseOnce(signal: AbortSignal) {
    if (!this.ctx || !this.toneGain) return;
    const dotLen = 100; // ms
    const dashLen = 300;
    const symbolGap = 80;
    const charGap = 250;

    for (const ch of this.morseSequence) {
      if (signal.aborted) return;
      if (ch === "/") {
        await this.sleep(charGap);
        continue;
      }
      if (ch === " ") {
        await this.sleep(symbolGap);
        continue;
      }
      const dur = ch === "." ? dotLen : dashLen;
      this.beep(dur);
      await this.sleep(dur + symbolGap);
    }
  }

  private beep(duration: number) {
    if (!this.ctx || !this.toneGain) return;
    const osc = this.ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.value = 680;
    osc.connect(this.toneGain);
    osc.start();
    osc.stop(this.ctx.currentTime + duration / 1000);
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((r) => setTimeout(r, ms));
  }

  stop() {
    this.isPlaying = false;
    if (this.abortController) this.abortController.abort();
    if (this.noiseSource) {
      try { this.noiseSource.stop(); } catch {}
    }
    if (this.ctx) {
      this.ctx.close();
      this.ctx = null;
    }
  }
}

/* ============================================================
   ROTARY KNOB COMPONENT
   ============================================================ */
function RotaryKnob({
  label,
  value,
  onChange,
  color = "rgba(74,222,128,0.8)",
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  color?: string;
}) {
  const knobRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  const angle = (value / 100) * 270 - 135;

  useEffect(() => {
    function handleMove(e: PointerEvent) {
      if (!dragging.current || !knobRef.current) return;
      const rect = knobRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      let a = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
      if (a < 0) a += 360;
      if (a > 315) a = 0;
      else if (a > 270) a = 270;
      const val = Math.max(0, Math.min(100, (a / 270) * 100));
      onChangeRef.current(val);
    }

    function handleUp() {
      dragging.current = false;
    }

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerup", handleUp);
    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerup", handleUp);
    };
  }, []);

  const handlePointerDown = () => {
    dragging.current = true;
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <span className="text-[8px] tracking-[0.4em] text-white/30">
        {label}
      </span>
      <div
        ref={knobRef}
        onPointerDown={handlePointerDown}
        className="relative w-16 h-16 cursor-grab active:cursor-grabbing"
        style={{ touchAction: "none" }}
      >
        <div className="absolute inset-0 rounded-full border border-white/[0.12]" />
        {Array.from({ length: 11 }).map((_, i) => {
          const markAngle = -135 + i * 27;
          return (
            <div
              key={i}
              className="absolute w-[1px] h-2 bg-white/15"
              style={{
                top: "2px",
                left: "50%",
                transformOrigin: "50% 30px",
                transform: `translateX(-50%) rotate(${markAngle}deg)`,
              }}
            />
          );
        })}
        <div
          className="absolute inset-2 rounded-full border border-white/[0.15] bg-white/[0.03]"
          style={{
            transform: `rotate(${angle}deg)`,
            boxShadow: `0 0 15px ${color}22`,
          }}
        >
          <div
            className="absolute top-1 left-1/2 -translate-x-1/2 w-[2px] h-3 rounded-full"
            style={{ background: color }}
          />
        </div>
      </div>
      <span className="text-[10px] tracking-widest text-white/40 font-mono">
        {value.toFixed(1)}
      </span>
    </div>
  );
}

/* ============================================================
   QUIT GAUNTLET
   ============================================================ */
const QUIT_STAGES = [
  {
    text: "Are you sure you want to quit? Really? Gave up that easily?",
    quit: "QUIT",
    stay: "KEEP TRYING",
  },
  {
    text: "Wow. You're actually clicking quit again. This is going on your file.",
    quit: "I DON'T CARE",
    stay: "FINE, I'LL STAY",
  },
  {
    text: "Your commanding officer has been notified of your incompetence.",
    quit: "LET ME OUT",
    stay: "WAIT NO",
  },
  {
    text: "This is the part where most people turn back. You're not most people though, are you? ...Oh wait. You are.",
    quit: "JUST LET ME LEAVE",
    stay: "OKAY OKAY",
  },
  {
    text: "Noted. Coward status: CONFIRMED. Retreating to safety.",
    quit: null,
    stay: null,
  },
];

/* ============================================================
   ANIMATED OSCILLOSCOPE
   ============================================================ */
function Oscilloscope({
  frequency,
  amplitude,
  phase,
  matchScore,
  signalLocked,
}: {
  frequency: number;
  amplitude: number;
  phase: number;
  matchScore: number;
  signalLocked: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const timeRef = useRef(0);
  const prevPoints = useRef<number[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function render() {
      if (!canvas || !ctx) return;
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      const w = rect.width;
      const h = rect.height;
      timeRef.current += 0.012;
      const t = timeRef.current;

      // Fade trail instead of hard clear
      ctx.fillStyle = "rgba(0,0,0,0.25)";
      ctx.fillRect(0, 0, w, h);

      // Subtle grid
      ctx.strokeStyle = "rgba(255,255,255,0.025)";
      ctx.lineWidth = 1;
      for (let x = 0; x <= w; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y <= h; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Center line
      ctx.strokeStyle = "rgba(255,255,255,0.04)";
      ctx.beginPath();
      ctx.moveTo(0, h / 2);
      ctx.lineTo(w, h / 2);
      ctx.stroke();

      const noise = (1 - matchScore) * 0.7;
      const freq = (frequency / 100) * 6;
      const amp = (amplitude / 100) * (h * 0.38);
      const ph = (phase / 100) * Math.PI * 2;
      const mid = h / 2;

      // Build organic point array
      const points: number[] = [];
      for (let x = 0; x <= w; x++) {
        const px = (x / w) * Math.PI * 2 * freq;

        // Base wave with drift
        const base = Math.sin(px + ph + t * 1.4);

        // Harmonic layers for organic feel
        const h2 = Math.sin(px * 2.1 + t * 0.7) * 0.15;
        const h3 = Math.sin(px * 0.5 + t * 2.3) * 0.08;
        const h4 = Math.sin(px * 3.7 + t * 0.3) * 0.04;

        // Smooth rolling noise (not random per-pixel)
        const smoothNoise1 =
          Math.sin(x * 0.02 + t * 3.1) *
          Math.sin(x * 0.05 + t * 1.7) *
          noise;
        const smoothNoise2 =
          Math.sin(x * 0.08 + t * 5.3) *
          Math.cos(x * 0.03 + t * 2.1) *
          noise *
          0.5;

        // Occasional signal dropout
        const dropout =
          noise > 0.3
            ? Math.sin(x * 0.01 + t * 0.4) > 0.7
              ? (Math.random() - 0.5) * noise * h * 0.3
              : 0
            : 0;

        // Breathing amplitude modulation
        const breathe = 1 + Math.sin(t * 0.6) * 0.08;

        const combined =
          (base + h2 + h3 + h4) * amp * breathe +
          (smoothNoise1 + smoothNoise2) * h * 0.15 +
          dropout;

        // Lerp with previous frame for smoothness
        const prev = prevPoints.current[x] ?? combined;
        const lerped = prev * 0.3 + combined * 0.7;

        points[x] = mid + lerped;
      }
      prevPoints.current = points;

      // Draw wide glow layer
      ctx.beginPath();
      ctx.strokeStyle = signalLocked
        ? "rgba(74,222,128,0.1)"
        : `rgba(74,222,128,${0.03 + matchScore * 0.06})`;
      ctx.lineWidth = signalLocked ? 14 : 8;
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      for (let x = 0; x <= w; x++) {
        if (x === 0) ctx.moveTo(x, points[x]);
        else ctx.lineTo(x, points[x]);
      }
      ctx.stroke();

      // Medium glow layer
      ctx.beginPath();
      ctx.strokeStyle = signalLocked
        ? "rgba(74,222,128,0.25)"
        : `rgba(74,222,128,${0.08 + matchScore * 0.12})`;
      ctx.lineWidth = signalLocked ? 5 : 3;
      for (let x = 0; x <= w; x++) {
        if (x === 0) ctx.moveTo(x, points[x]);
        else ctx.lineTo(x, points[x]);
      }
      ctx.stroke();

      // Sharp core line
      ctx.beginPath();
      ctx.strokeStyle = signalLocked
        ? "rgba(74,222,128,0.95)"
        : `rgba(74,222,128,${0.35 + matchScore * 0.45})`;
      ctx.lineWidth = signalLocked ? 2 : 1.5;
      for (let x = 0; x <= w; x++) {
        if (x === 0) ctx.moveTo(x, points[x]);
        else ctx.lineTo(x, points[x]);
      }
      ctx.stroke();

      // Ghost echo line (delayed copy, faint)
      if (!signalLocked && noise > 0.15) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(74,222,128,${noise * 0.08})`;
        ctx.lineWidth = 1;
        const offset = Math.sin(t * 0.8) * 20 + 15;
        for (let x = 0; x <= w; x++) {
          const gx = Math.min(w, Math.max(0, x - Math.floor(offset)));
          if (x === 0) ctx.moveTo(x, points[gx] + noise * 10);
          else ctx.lineTo(x, points[gx] + noise * 10);
        }
        ctx.stroke();
      }

      // Static dots — organic clusters
      if (noise > 0.1) {
        const clusters = Math.floor(noise * 8);
        for (let c = 0; c < clusters; c++) {
          const cx2 = Math.random() * w;
          const cy2 = Math.random() * h;
          const count = Math.floor(Math.random() * 20 + 5);
          for (let i = 0; i < count; i++) {
            const sx = cx2 + (Math.random() - 0.5) * 60;
            const sy = cy2 + (Math.random() - 0.5) * 30;
            ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.04})`;
            ctx.fillRect(sx, sy, Math.random() * 2 + 0.5, 1);
          }
        }
      }

      // Horizontal interference bands
      if (noise > 0.25) {
        const bandCount = Math.floor(noise * 4);
        for (let i = 0; i < bandCount; i++) {
          const by = (Math.sin(t * (1.2 + i * 0.7) + i * 100) * 0.5 + 0.5) * h;
          const bh = Math.random() * 3 + 1;
          ctx.fillStyle = `rgba(74,222,128,${Math.random() * 0.015})`;
          ctx.fillRect(0, by, w, bh);
        }
      }

      // Phosphor glow scan
      const scanY = ((t * 40) % (h + 40)) - 20;
      const gradient = ctx.createLinearGradient(0, scanY - 10, 0, scanY + 10);
      gradient.addColorStop(0, "transparent");
      gradient.addColorStop(0.5, "rgba(74,222,128,0.015)");
      gradient.addColorStop(1, "transparent");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, scanY - 10, w, 20);

      animRef.current = requestAnimationFrame(render);
    }

    animRef.current = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animRef.current);
  }, [frequency, amplitude, phase, matchScore, signalLocked]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full rounded"
      style={{ height: "220px" }}
    />
  );
}

/* ============================================================
   SIGNAL STRENGTH METER
   ============================================================ */
function SignalMeter({ matchScore }: { matchScore: number }) {
  const bars = 12;
  return (
    <div className="flex items-end gap-[3px] h-6">
      {Array.from({ length: bars }).map((_, i) => {
        const threshold = i / bars;
        const active = matchScore > threshold;
        const barHeight = 6 + i * 1.5;
        return (
          <div
            key={i}
            className="w-[3px] rounded-sm transition-all duration-300"
            style={{
              height: `${barHeight}px`,
              background: active
                ? matchScore > 0.85
                  ? "rgba(74,222,128,0.8)"
                  : matchScore > 0.5
                  ? "rgba(234,179,8,0.6)"
                  : "rgba(239,68,68,0.4)"
                : "rgba(255,255,255,0.06)",
              boxShadow: active && matchScore > 0.85
                ? "0 0 4px rgba(74,222,128,0.4)"
                : "none",
            }}
          />
        );
      })}
    </div>
  );
}

/* ============================================================
   MAIN PAGE
   ============================================================ */
export default function ReportPuzzlePage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const audioRef = useRef<RadioAudioEngine | null>(null);

  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  // Signal tuning
  const [frequency, setFrequency] = useState(50);
  const [amplitude, setAmplitude] = useState(50);
  const [phase, setPhase] = useState(50);
  const [signalLocked, setSignalLocked] = useState(false);
  const [signalFlash, setSignalFlash] = useState(false);
  const [matchScore, setMatchScore] = useState(0);
  const [audioStarted, setAudioStarted] = useState(false);

  // Cipher
  const [cipherInput, setCipherInput] = useState("");
  const [cipherError, setCipherError] = useState(false);
  const [cipherShake, setCipherShake] = useState(false);

  // Solved
  const [justSolved, setJustSolved] = useState(false);

  // Quit gauntlet
  const [quitStage, setQuitStage] = useState(-1);
  const [quitGlitch, setQuitGlitch] = useState(false);

  // Player
  const [playerName, setPlayerName] = useState("Unknown");

  useEffect(() => {
    setPlayerName(localStorage.getItem("playerName") || "Unknown");
  }, []);

  // Fetch report
  useEffect(() => {
    async function fetchReport() {
      const { data } = await supabase
        .from("database_reports")
        .select("*")
        .eq("slug", slug)
        .single();
      if (data) {
        setReport(data);
        if (data.solved) setSignalLocked(true);
      } else {
        setNotFound(true);
      }
      setLoading(false);
    }
    fetchReport();
  }, [slug]);

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) audioRef.current.stop();
    };
  }, []);

  // Start audio (requires user gesture)
  async function startAudio() {
    if (audioStarted || !report) return;
    const engine = new RadioAudioEngine();
    await engine.init();
    audioRef.current = engine;
    engine.playMorseLoop(report.cipher_code);
    setAudioStarted(true);
  }

  // Calculate match score and update audio clarity
  useEffect(() => {
    if (!report || signalLocked) return;
    const fDist = Math.abs(frequency - report.target_frequency) / 100;
    const aDist = Math.abs(amplitude - report.target_amplitude) / 100;
    const pDist = Math.abs(phase - report.target_phase) / 100;
    const avgDist = (fDist + aDist + pDist) / 3;
    const score = Math.max(0, Math.min(1, 1 - avgDist * 4));
    setMatchScore(score);

    if (audioRef.current) {
      audioRef.current.setClarity(score);
    }
  }, [frequency, amplitude, phase, report, signalLocked]);

  // Check signal lock
  useEffect(() => {
    if (!report || signalLocked) return;
    const fOk = Math.abs(frequency - report.target_frequency) <= TOLERANCE;
    const aOk = Math.abs(amplitude - report.target_amplitude) <= TOLERANCE;
    const pOk = Math.abs(phase - report.target_phase) <= TOLERANCE;

    if (fOk && aOk && pOk) {
      setSignalLocked(true);
      setSignalFlash(true);
      setMatchScore(1);
      if (audioRef.current) audioRef.current.setClarity(1);
      setTimeout(() => setSignalFlash(false), 1500);
    }
  }, [frequency, amplitude, phase, report, signalLocked]);

  // Log attempt
  async function logAttempt(success: boolean, stage: string) {
    await supabase.from("report_attempts").insert({
      report_slug: slug,
      player_name: playerName,
      success,
      stage,
    });
  }

  // Cipher submit
  async function handleCipherSubmit() {
    if (!report) return;
    if (
      cipherInput.toUpperCase().trim() ===
      report.cipher_code.toUpperCase().trim()
    ) {
      await logAttempt(true, "cipher");
      await supabase
        .from("database_reports")
        .update({
          solved: true,
          solved_by: playerName,
          solved_at: new Date().toISOString(),
        })
        .eq("slug", slug);

      if (audioRef.current) audioRef.current.stop();
      setReport({ ...report, solved: true, solved_by: playerName });
      setJustSolved(true);
    } else {
      await logAttempt(false, "cipher");
      setCipherError(true);
      setCipherShake(true);
      setTimeout(() => {
        setCipherError(false);
        setCipherShake(false);
      }, 800);
      setCipherInput("");
    }
  }

  // Quit gauntlet
  function handleQuit() {
    if (quitStage === -1) {
      setQuitStage(0);
      setQuitGlitch(true);
      setTimeout(() => setQuitGlitch(false), 300);
    }
  }

  function quitNext() {
    const next = quitStage + 1;
    setQuitGlitch(true);
    setTimeout(() => setQuitGlitch(false), 300);
    if (next >= QUIT_STAGES.length - 1) {
      setQuitStage(next);
      logAttempt(false, "quit");
      if (audioRef.current) audioRef.current.stop();
      setTimeout(() => router.push("/database/reports"), 2500);
    } else {
      setQuitStage(next);
    }
  }

  function quitCancel() {
    setQuitStage(-1);
  }

  // ============ LOADING / NOT FOUND ============
  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center font-[family-name:var(--font-typewriter)]">
        <p className="text-white/30 text-sm tracking-widest animate-pulse">
          RETRIEVING FILE...
        </p>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center font-[family-name:var(--font-typewriter)] gap-4">
        <p className="text-red-500/60 text-sm tracking-widest">FILE NOT FOUND</p>
        <button
          onClick={() => router.push("/database/reports")}
          className="text-white/40 text-[11px] tracking-widest hover:text-white/70 transition-colors"
        >
          ← BACK TO REPORTS
        </button>
      </div>
    );
  }

  if (!report) return null;

  // ============ QUIT GAUNTLET ============
  if (quitStage >= 0) {
    const stage = QUIT_STAGES[quitStage];
    const isFinal = quitStage === QUIT_STAGES.length - 1;

    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center font-[family-name:var(--font-typewriter)] relative overflow-hidden">
        {quitGlitch && (
          <div className="absolute inset-0 bg-white/[0.06] z-50 crt-noise" />
        )}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute left-0 w-full h-[1px] bg-white/[0.03] animate-scanline" />
        </div>
        <div className="max-w-lg text-center z-10 px-8">
          <p
            className={`text-sm tracking-wider leading-relaxed mb-10 animate-fadeIn ${
              isFinal ? "text-red-400/80" : "text-white/70"
            }`}
          >
            {stage.text}
          </p>
          {!isFinal && (
            <div
              className="flex gap-4 justify-center animate-fadeIn"
              style={{ animationDelay: "0.3s" }}
            >
              <button
                onClick={quitCancel}
                className="px-6 py-3 border border-green-500/40 rounded-lg bg-green-500/[0.06] text-green-400/80 text-[11px] tracking-[0.3em] hover:border-green-400/70 hover:bg-green-500/[0.1] hover:text-green-400 transition-all duration-300"
              >
                {stage.stay}
              </button>
              <button
                onClick={quitNext}
                className="px-4 py-3 border border-white/[0.08] rounded-lg text-white/25 text-[9px] tracking-[0.2em] hover:border-white/20 hover:text-white/40 transition-all duration-300"
              >
                {stage.quit}
              </button>
            </div>
          )}
          {isFinal && (
            <div className="animate-fadeIn">
              <div className="inline-block border border-red-500/30 px-5 py-2 bg-red-500/[0.05] rounded-lg">
                <span className="text-red-400/60 text-[10px] tracking-[0.3em] animate-pulse">
                  REDIRECTING...
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ============ ALREADY SOLVED ============
  if (report.solved && !justSolved) {
    return (
      <div className="min-h-screen bg-black font-[family-name:var(--font-typewriter)] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute left-0 w-full h-[1px] bg-white/[0.03] animate-scanline" />
        </div>
        <div className="max-w-2xl mx-auto pt-24 px-8 relative z-10">
          <div className="mb-8">
            <p className="text-green-400/50 text-[10px] tracking-[0.4em] mb-2">
              FILE DECRYPTED
            </p>
            <h1 className="text-white text-2xl tracking-[0.3em]">
              {report.title}
            </h1>
            <div className="h-[1px] bg-gradient-to-r from-green-400/40 to-transparent mt-3" />
          </div>
          {report.solved_by && (
            <div className="mb-8 border border-green-500/20 rounded-lg px-5 py-3 bg-green-500/[0.03]">
              <p className="text-[9px] tracking-[0.3em] text-white/30 mb-1">
                DECRYPTED BY
              </p>
              <p className="text-green-400/80 text-[13px] tracking-widest">
                {report.solved_by}
              </p>
            </div>
          )}
          <div className="text-white/75 text-[13px] leading-[28px] tracking-wide">
            {report.content}
          </div>
          <div className="mt-12 pt-6 border-t border-white/[0.06]">
            <button
              onClick={() => router.push("/database/reports")}
              className="text-white/40 text-[11px] tracking-widest hover:text-white/70 transition-colors"
            >
              ← BACK TO REPORTS
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ============ JUST SOLVED ANIMATION ============
  if (justSolved) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center font-[family-name:var(--font-typewriter)] relative overflow-hidden">
        <div className="absolute inset-0 bg-green-400/[0.03] animate-fadeIn" />
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute left-0 w-full h-[1px] bg-green-400/[0.06] animate-scanline" />
        </div>
        <div className="text-center z-10 animate-fadeIn">
          <div className="w-16 h-[1px] bg-green-400/40 mx-auto mb-6" />
          <p className="text-green-400/50 text-[10px] tracking-[0.5em] mb-4">
            DECRYPTION COMPLETE
          </p>
          <h1 className="text-white text-3xl tracking-[0.4em] mb-4">
            {report.title}
          </h1>
          <p className="text-green-400/60 text-[12px] tracking-[0.3em] mb-2">
            SOLVED BY
          </p>
          <p className="text-white/90 text-lg tracking-[0.3em]">
            {playerName}
          </p>
          <div className="w-16 h-[1px] bg-green-400/40 mx-auto mt-6 mb-8" />
          <button
            onClick={() =>
              setReport({ ...report, solved: true, solved_by: playerName })
            }
            className="text-white/40 text-[11px] tracking-widest hover:text-white/70 transition-colors border border-white/[0.08] px-6 py-3 rounded-lg hover:border-white/20"
          >
            VIEW REPORT →
          </button>
        </div>
      </div>
    );
  }

  // ============ PUZZLE STATE ============
  return (
    <div className="min-h-screen bg-black font-[family-name:var(--font-typewriter)] relative overflow-hidden">
      {signalFlash && (
        <div className="fixed inset-0 bg-green-400/[0.08] z-50 animate-fadeIn pointer-events-none" />
      )}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
        <div className="absolute left-0 w-full h-[1px] bg-white/[0.03] animate-scanline" />
      </div>

      <div className="max-w-2xl mx-auto pt-24 px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-red-500/40 text-[10px] tracking-[0.5em] mb-2">
            ◆ ENCRYPTED FILE ◆
          </p>
          <h1 className="text-white text-2xl tracking-[0.3em] mb-2">
            {report.title}
          </h1>
          <p className="text-white/20 text-[10px] tracking-[0.3em]">
            {report.category} · {report.classification}
          </p>
        </div>

        {/* ===== SIGNAL TUNING ===== */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <p
              className={`text-[10px] tracking-[0.4em] ${
                signalLocked ? "text-green-400/60" : "text-white/30"
              }`}
            >
              {signalLocked ? "◆ SIGNAL LOCKED" : "◇ TUNE THE SIGNAL"}
            </p>
            <div className="flex items-center gap-3">
              <SignalMeter matchScore={signalLocked ? 1 : matchScore} />
              <div
                className={`w-2 h-2 rounded-full ${
                  signalLocked
                    ? "bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.6)]"
                    : "bg-red-500/50 animate-pulse"
                }`}
              />
            </div>
          </div>

          {/* Oscilloscope */}
          <div className="border border-white/[0.08] rounded-lg overflow-hidden relative bg-black">
            <div className="absolute top-2 left-2 w-3 h-[1px] bg-white/15 z-10" />
            <div className="absolute top-2 left-2 w-[1px] h-3 bg-white/15 z-10" />
            <div className="absolute top-2 right-2 w-3 h-[1px] bg-white/15 z-10" />
            <div className="absolute top-2 right-2 w-[1px] h-3 bg-white/15 z-10" />
            <div className="absolute bottom-2 left-2 w-3 h-[1px] bg-white/15 z-10" />
            <div className="absolute bottom-2 left-2 w-[1px] h-3 bg-white/15 z-10" />
            <div className="absolute bottom-2 right-2 w-3 h-[1px] bg-white/15 z-10" />
            <div className="absolute bottom-2 right-2 w-[1px] h-3 bg-white/15 z-10" />

            <Oscilloscope
              frequency={frequency}
              amplitude={amplitude}
              phase={phase}
              matchScore={signalLocked ? 1 : matchScore}
              signalLocked={signalLocked}
            />

            {/* Start audio overlay */}
            {!audioStarted && !signalLocked && (
              <div
                className="absolute inset-0 flex items-center justify-center bg-black/60 cursor-pointer z-20"
                onClick={startAudio}
              >
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center mx-auto mb-3 hover:border-white/40 transition-colors">
                    <div className="w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-l-[12px] border-l-white/60 ml-1" />
                  </div>
                  <p className="text-white/30 text-[9px] tracking-[0.3em]">
                    ENABLE AUDIO FEED
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Rotary Knobs */}
          {!signalLocked && (
            <div className="flex justify-center gap-12 mt-8 animate-fadeIn">
              <RotaryKnob
                label="FREQ"
                value={frequency}
                onChange={setFrequency}
              />
              <RotaryKnob
                label="AMP"
                value={amplitude}
                onChange={setAmplitude}
              />
              <RotaryKnob
                label="PHASE"
                value={phase}
                onChange={setPhase}
              />
            </div>
          )}
        </div>

        {/* ===== CIPHER SECTION ===== */}
        <div
          className={`mb-10 transition-all duration-700 ${
            signalLocked
              ? "opacity-100 translate-y-0"
              : "opacity-30 translate-y-2 pointer-events-none"
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <p
              className={`text-[10px] tracking-[0.4em] ${
                signalLocked ? "text-white/30" : "text-white/15"
              }`}
            >
              {signalLocked
                ? "◇ ENTER DECRYPTION KEY"
                : "◇ LOCKED — SIGNAL REQUIRED"}
            </p>
            {!signalLocked && (
              <div className="border border-white/[0.08] px-3 py-1 rounded">
                <span className="text-white/20 text-[8px] tracking-widest">
                  LOCKED
                </span>
              </div>
            )}
          </div>

          {signalLocked && !report.solved && (
            <div className="animate-fadeIn">
              <div
                className={`flex gap-3 ${
                  cipherShake ? "animate-[shake_0.3s_ease-in-out]" : ""
                }`}
              >
                <input
                  type="text"
                  value={cipherInput}
                  onChange={(e) =>
                    setCipherInput(e.target.value.toUpperCase())
                  }
                  onKeyDown={(e) =>
                    e.key === "Enter" && handleCipherSubmit()
                  }
                  placeholder="ENTER CODE..."
                  className={`flex-1 bg-white/[0.04] border rounded-lg px-4 py-3 text-[12px] tracking-[0.3em] text-white/80 placeholder:text-white/20 outline-none transition-all duration-300 ${
                    cipherError
                      ? "border-red-500/50 bg-red-500/[0.04]"
                      : "border-white/[0.08] focus:border-white/20"
                  }`}
                />
                <button
                  onClick={handleCipherSubmit}
                  className="px-5 py-3 border border-white/[0.15] rounded-lg text-white/50 text-[10px] tracking-[0.3em] hover:border-white/30 hover:text-white/70 hover:bg-white/[0.04] transition-all duration-300"
                >
                  DECRYPT
                </button>
              </div>
              {cipherError && (
                <p className="text-red-400/70 text-[10px] tracking-widest mt-3 animate-fadeIn">
                  ACCESS DENIED — INVALID DECRYPTION KEY
                </p>
              )}
            </div>
          )}
        </div>

        {/* ===== QUIT BUTTON ===== */}
        {!report.solved && (
          <div className="text-center pt-6 border-t border-white/[0.04]">
            <button
              onClick={handleQuit}
              className="text-white/15 text-[9px] tracking-widest hover:text-white/30 transition-colors duration-300"
            >
              ABANDON FILE
            </button>
          </div>
        )}
      </div>
    </div>
  );
}