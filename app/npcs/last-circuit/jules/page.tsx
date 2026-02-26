"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { supabase } from "@/app/supabaseClient";

function GlowName({ name, color }: { name: string; color: "red" | "blue" }) {
  const styles = {
    red: "hover:text-red-400 hover:drop-shadow-[0_0_15px_rgba(255,0,0,0.9)] hover:scale-110",
    blue: "hover:text-blue-400 hover:drop-shadow-[0_0_15px_rgba(96,165,250,0.9)] hover:scale-110",
  };

  return (
    <span
      className={`inline-block text-white/50 transition-all duration-300 cursor-default ${styles[color]}`}
    >
      {name}
    </span>
  );
}

function SectionHeader({ label, color = "white" }: { label: string; color?: "white" | "red" }) {
  const lineColor = color === "red" ? "via-red-500/40" : "via-white/30";
  const textColor = color === "red" ? "text-red-500/80" : "text-white/50";

  return (
    <div className="flex items-center gap-4 mb-5">
      <div className={`flex-1 h-[1px] bg-gradient-to-r from-transparent ${lineColor} to-transparent`} />
      <p className={`${textColor} text-xs tracking-[0.3em] flex-shrink-0`}>
        {label}
      </p>
      <div className={`flex-1 h-[1px] bg-gradient-to-r from-transparent ${lineColor} to-transparent`} />
    </div>
  );
}

function InfoRow({ label, children, labelColor = "text-white/40" }: { label: string; children: React.ReactNode; labelColor?: string }) {
  return (
    <>
      <span className={`${labelColor} text-sm tracking-wider`}>{label}</span>
      <span className="text-white/90 text-sm leading-relaxed">{children}</span>
    </>
  );
}

export default function JulesDossier() {
  const router = useRouter();
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<string | null>(null);

  useEffect(() => {
    async function loadNotes() {
      const { data } = await supabase
        .from("notes")
        .select("content")
        .eq("npc_id", "jules")
        .single();
      if (data) setNotes(data.content);
    }
    loadNotes();
  }, []);

  async function saveNotes() {
    setSaving(true);
    await supabase
      .from("notes")
      .update({ content: notes, updated_at: new Date().toISOString() })
      .eq("npc_id", "jules");
    setSaving(false);
    setLastSaved(new Date().toLocaleTimeString());
  }

  return (
    <div className="min-h-screen bg-black flex flex-col font-[family-name:var(--font-typewriter)] relative overflow-hidden">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Scanline */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute left-0 w-full h-[1px] bg-white/[0.03] animate-scanline" />
      </div>

      {/* Top bar */}
      <div className="flex justify-between items-center px-8 py-4 z-10">
        <button
          onClick={() => router.push("/npcs/last-circuit")}
          className="text-white/60 hover:text-white transition-colors duration-200 text-sm tracking-wider"
        >
          ← FENMOORE&apos;S BAR
        </button>
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-green-400/80 rounded-full shadow-[0_0_8px_rgba(0,255,0,0.4)]" />
          <span className="text-white/40 text-[10px] tracking-widest">DOSSIER ACTIVE</span>
        </div>
      </div>

      {/* Main content */}
      <div className="flex px-8 gap-8 flex-1 z-10">
        {/* LEFT — Portrait */}
        <div className="w-1/4 flex-shrink-0">
          <div className="w-full h-full border border-white/20 rounded-lg overflow-hidden relative group">
            {/* Corner accents */}
            <div className="absolute top-2 left-2 w-3 h-[1px] bg-white/40 z-10" />
            <div className="absolute top-2 left-2 w-[1px] h-3 bg-white/40 z-10" />
            <div className="absolute top-2 right-2 w-3 h-[1px] bg-white/40 z-10" />
            <div className="absolute top-2 right-2 w-[1px] h-3 bg-white/40 z-10" />
            <div className="absolute bottom-2 left-2 w-3 h-[1px] bg-white/40 z-10" />
            <div className="absolute bottom-2 left-2 w-[1px] h-3 bg-white/40 z-10" />
            <div className="absolute bottom-2 right-2 w-3 h-[1px] bg-white/40 z-10" />
            <div className="absolute bottom-2 right-2 w-[1px] h-3 bg-white/40 z-10" />

            {/* Top accent line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/40 to-transparent z-10" />

            <Image
              src="/jules-portrait.png"
              alt="Jules Gallagher"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* RIGHT — Dossier data */}
        <div className="flex-1 flex flex-col gap-8">
          {/* Header */}
          <div>
            <p className="text-white/30 text-[10px] tracking-[0.5em] mb-2">MEMBER #03 — THE LAST CIRCUIT</p>
            <h1 className="text-white text-2xl tracking-[0.3em] drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]">
              JULES GALLAGHER
            </h1>
            <p className="text-white/40 text-xs tracking-widest mt-1">&quot;HOUND&quot;</p>
          </div>

          {/* BIODATA */}
          <div>
            <SectionHeader label="BIODATA" />
            <div className="grid grid-cols-[140px_1fr] gap-y-3 gap-x-4">
              <InfoRow label="NAME">Jules Gallagher</InfoRow>
              <InfoRow label="ALIAS">Hound</InfoRow>
              <InfoRow label="OCCUPATION">Barkeeper / Automotive Specialist</InfoRow>
              <InfoRow label="AFFILIATION">The Last Circuit: Fenmoore&apos;s Bar</InfoRow>
              <InfoRow label="SPECIES">Vampire</InfoRow>
            </div>
          </div>

          {/* PHYSICAL PROFILE */}
          <div>
            <SectionHeader label="PHYSICAL PROFILE" />
            <div className="grid grid-cols-[140px_1fr] gap-y-3 gap-x-4">
              <InfoRow label="AGE">20,000+ Years</InfoRow>
              <InfoRow label="DESCRIPTION">Lean build, well-maintained facial hair. Subject bears a singular linear scar traversing the torso — wound pattern consistent with a direct thrust from a longsword. Scar tissue suggests the wound was once fatal.</InfoRow>
            </div>
          </div>

          {/* PERSONAL INTEL */}
          <div>
            <SectionHeader label="PERSONAL INTEL" />
            <div className="grid grid-cols-[140px_1fr] gap-y-3 gap-x-4">
              <InfoRow label="PERSONALITY">The old dog who learned new tricks. Oldest in figure, youngest in mind. Jules is the centre of the group — the one who grounds everyone and leans on others when he needs the support. Has traversed multiple eras, developing an understanding of humane emotion on an empathic scale few could comprehend. Misses his brothers. Constantly. Also... a man who collects spell scrolls of incredibly niche uses.</InfoRow>
              <InfoRow label="SEXUALITY">Gay. Extremely so.</InfoRow>
              <InfoRow label="KNOWN ASSOCIATES">Last Circuit, The Hounds, The Nineteen Isle, Forum Diagram, Royal Family Husseins, Nu Terra Military — Frontliner Defence Sector, Guild of Chiketna (Ex-Member), The Verca Information Gathering Society, Genius Institution No. 13 (Ex-Member), Las Almas Adventuring Guild, and others.</InfoRow>
              <InfoRow label="BACKGROUND">
                Subject&apos;s homeworld was destroyed approximately several eons prior by the organization known as <GlowName name="I.O.T.A" color="blue" />. Subject claims to have &quot;made terms&quot; with the event. Subsequent records indicate enrollment in Las Almas Adventuring Guild alongside three long-term associates: <GlowName name="Santiago" color="red" />, <GlowName name="Diego" color="red" />, and <GlowName name="Mikael" color="red" />. The four traveled the eternal skies with no stated mission. Guild logs confirm voluntary separation initiated by Subject — cited reasoning: &quot;I want them to make a name without me being in the way.&quot; Subject has since remained stationary at Fenmoore&apos;s Bar. When asked about his brothers, Subject declined further comment.
              </InfoRow>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom sections — full width */}
      <div className="px-8 pb-8 mt-8 flex flex-col gap-8 z-10">
        {/* CURRENT CAMPAIGN */}
        <div>
          <SectionHeader label="CURRENT CAMPAIGN" />
          <div className="grid grid-cols-[140px_1fr] gap-y-3 gap-x-4">
            <InfoRow label="STATUS">
              <span className="text-yellow-400/90 drop-shadow-[0_0_8px_rgba(255,200,0,0.4)]">UNKNOWN</span>
            </InfoRow>
            <InfoRow label="LAST SEEN">
              <span className="text-yellow-400/90 drop-shadow-[0_0_8px_rgba(255,200,0,0.4)]">UNKNOWN</span>
            </InfoRow>
          </div>
        </div>

        {/* NOTES */}
        <div>
          <SectionHeader label="NOTES" />
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Enter your notes here..."
            className="w-full h-32 bg-white/[0.04] border border-white/15 rounded-lg p-4 text-white/80 text-sm tracking-wider resize-none focus:outline-none focus:border-white/40 focus:shadow-[0_0_15px_rgba(255,255,255,0.05)] transition-all duration-300 placeholder:text-white/15"
          />
          <div className="flex items-center gap-4 mt-3">
            <button
              onClick={saveNotes}
              disabled={saving}
              className="border border-white/30 rounded-lg bg-transparent text-white/70 px-6 py-2 text-xs tracking-widest hover:shadow-[0_0_15px_rgba(255,255,255,0.15)] hover:bg-white/5 hover:text-white transition-all duration-300 disabled:opacity-30"
            >
              {saving ? "SAVING..." : "SAVE NOTES"}
            </button>
            {lastSaved && (
              <span className="text-white/30 text-xs tracking-wider">Last saved at {lastSaved}</span>
            )}
          </div>
        </div>

        {/* CLASSIFIED */}
        <div className="border border-red-500/30 rounded-lg p-6 relative overflow-hidden">
          {/* Top accent */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-red-500/60 to-transparent" />

          {/* Corner accents */}
          <div className="absolute top-3 left-3 w-2 h-[1px] bg-red-500/50" />
          <div className="absolute top-3 left-3 w-[1px] h-2 bg-red-500/50" />
          <div className="absolute top-3 right-3 w-2 h-[1px] bg-red-500/50" />
          <div className="absolute top-3 right-3 w-[1px] h-2 bg-red-500/50" />
          <div className="absolute bottom-3 left-3 w-2 h-[1px] bg-red-500/50" />
          <div className="absolute bottom-3 left-3 w-[1px] h-2 bg-red-500/50" />
          <div className="absolute bottom-3 right-3 w-2 h-[1px] bg-red-500/50" />
          <div className="absolute bottom-3 right-3 w-[1px] h-2 bg-red-500/50" />

          <SectionHeader label="CLASSIFIED" color="red" />
          <div className="grid grid-cols-[140px_1fr] gap-y-3 gap-x-4">
            <span className="text-red-500/60 text-sm tracking-wider">THREAT LEVEL</span>
            <span className="text-red-500 text-xl font-bold drop-shadow-[0_0_15px_rgba(255,0,0,0.6)]">86%</span>

            <span className="text-red-500/60 text-sm tracking-wider">ARCANE PROWESS</span>
            <span className="text-white/90 text-sm">Blood Manipulation, High Summoning, Animal Transformation</span>

            <span className="text-red-500/60 text-sm tracking-wider">WARRANTS</span>
            <span className="text-white/90 text-sm leading-relaxed">Multiple Destruction of Sovereign Nations, Numerous War Crimes, High Treason, Mass Military Desertion, Unauthorized Use of Forbidden Summoning Rites, Mass Civilian Displacement, Arson of Government Archives, Mass Theft of Classified Spell Scrolls, Smuggling of Arcane Contraband, Multiple Assassinations (mostly unconfirmed), Illegal Blood Harvesting, Operation of an Unlicensed Transmutation Circle, Incitement of Rebellion, Destruction of a Religious Landmark, Repeated Evasion of Interdimensional Arrest Warrants, Impersonation of a Royal Diplomat, Kidnapping, Unauthorized Entry Into Sealed Government Vaults, Possession of a Class-9 Restricted Artifact, Tampering With Ley Line Infrastructure, Excessive Disturbance of the Peace, Frequent Public Intoxication, Frequent Illegal Street Racing, Unlicensed Operation of a Modified Arcane Vehicle, Innumerable Counts of Jaywalking</span>
          </div>
        </div>
      </div>
    </div>
  );
}