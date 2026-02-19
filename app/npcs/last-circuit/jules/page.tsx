"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { supabase } from "@/app/supabaseClient";

function GlowName({ name, color }: { name: string; color: "red" | "blue" }) {
  const styles = {
    red: "hover:text-red-400 hover:drop-shadow-[0_0_15px_rgba(255,0,0,0.9)] hover:scale-125",
    blue: "hover:text-blue-400 hover:drop-shadow-[0_0_15px_rgba(96,165,250,0.9)] hover:scale-125",
  };

  return (
    <span
      className={`inline-block text-white/40 transition-all duration-300 cursor-default ${styles[color]}`}
    >
      {name}
    </span>
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
    <div className="min-h-screen bg-black flex flex-col font-[family-name:var(--font-typewriter)]">
      <div className="p-8">
        <button
          onClick={() => router.push("/npcs/last-circuit")}
          className="text-white/50 hover:text-white transition-colors duration-200 text-sm tracking-wider"
        >
          ← FENMOORE&apos;S BAR
        </button>
      </div>

      {/* TOP SECTION — Portrait + Bio through Background */}
      <div className="flex px-8 gap-8">
        {/* LEFT SIDE — Portrait stretches to match right side height */}
        <div className="w-1/4 flex-shrink-0">
          <div className="w-full h-full border border-white/30 rounded-lg overflow-hidden relative">
            <Image
              src="/jules-portrait.png"
              alt="Jules Gallagher"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* RIGHT SIDE — Bio through Background */}
        <div className="flex-1 flex flex-col gap-8">
          <div>
            <h2 className="text-white/40 text-xs tracking-[0.3em] mb-4 border-b border-white/20 pb-2">
              ─── BIODATA ───
            </h2>
            <div className="grid grid-cols-[140px_1fr] gap-y-3 gap-x-4">
              <span className="text-white/50 text-sm">NAME</span>
              <span className="text-white text-sm">Jules Gallagher</span>
              <span className="text-white/50 text-sm">ALIAS</span>
              <span className="text-white text-sm">Hound</span>
              <span className="text-white/50 text-sm">OCCUPATION</span>
              <span className="text-white text-sm">Barkeeper / Automotive Specialist</span>
              <span className="text-white/50 text-sm">AFFILIATION</span>
              <span className="text-white text-sm">The Last Circuit: Fenmoore&apos;s Bar</span>
              <span className="text-white/50 text-sm">SPECIES</span>
              <span className="text-white text-sm">Vampire</span>
            </div>
          </div>

          <div>
            <h2 className="text-white/40 text-xs tracking-[0.3em] mb-4 border-b border-white/20 pb-2">
              ─── PHYSICAL PROFILE ───
            </h2>
            <div className="grid grid-cols-[140px_1fr] gap-y-3 gap-x-4">
              <span className="text-white/50 text-sm">AGE</span>
              <span className="text-white text-sm">20,000+ Years</span>
              <span className="text-white/50 text-sm">DESCRIPTION</span>
              <span className="text-white text-sm leading-relaxed">Lean build, well-maintained facial hair. Subject bears a singular linear scar traversing the torso — wound pattern consistent with a direct thrust from a longsword. Scar tissue suggests the wound was once fatal.</span>
            </div>
          </div>

          <div>
            <h2 className="text-white/40 text-xs tracking-[0.3em] mb-4 border-b border-white/20 pb-2">
              ─── PERSONAL INTEL ───
            </h2>
            <div className="grid grid-cols-[140px_1fr] gap-y-3 gap-x-4">
              <span className="text-white/50 text-sm">PERSONALITY</span>
              <span className="text-white text-sm leading-relaxed">The old dog who learned new tricks. Oldest in figure, youngest in mind. Jules is the centre of the group — the one who grounds everyone and leans on others when he needs the support. Has traversed multiple eras, developing an understanding of humane emotion on an empathic scale few could comprehend. Misses his brothers. Constantly. Also... a man who collects spell scrolls of incredibly niche uses.</span>
              <span className="text-white/50 text-sm">SEXUALITY</span>
              <span className="text-white text-sm">Gay. Extremely so.</span>
              <span className="text-white/50 text-sm">KNOWN ASSOCIATES</span>
              <span className="text-white text-sm leading-relaxed">Last Circuit, The Hounds, The Nineteen Isle, Forum Diagram, Royal Family Husseins, Nu Terra Military — Frontliner Defence Sector, Guild of Chiketna (Ex-Member), The Verca Information Gathering Society, Genius Institution No. 13 (Ex-Member), Las Almas Adventuring Guild, and others.</span>
              <span className="text-white/50 text-sm">BACKGROUND</span>
              <span className="text-white text-sm leading-relaxed">Subject&apos;s homeworld was destroyed approximately several eons prior by the organization known as <GlowName name="I.O.T.A" color="blue" />. Subject claims to have &quot;made terms&quot; with the event. Subsequent records indicate enrollment in Las Almas Adventuring Guild alongside three long-term associates: <GlowName name="Santiago" color="red" />, <GlowName name="Diego" color="red" />, and <GlowName name="Mikael" color="red" />. The four traveled the eternal skies with no stated mission. Guild logs confirm voluntary separation initiated by Subject — cited reasoning: &quot;I want them to make a name without me being in the way.&quot; Subject has since remained stationary at Fenmoore&apos;s Bar. When asked about his brothers, Subject declined further comment.</span>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM SECTION — Campaign, Notes, Classified (no portrait) */}
      <div className="px-8 pb-8 mt-8 flex flex-col gap-8">
        <div>
          <h2 className="text-white/40 text-xs tracking-[0.3em] mb-4 border-b border-white/20 pb-2">
            ─── CURRENT CAMPAIGN ───
          </h2>
          <div className="grid grid-cols-[140px_1fr] gap-y-3 gap-x-4">
            <span className="text-white/50 text-sm">STATUS</span>
            <span className="text-yellow-400 text-sm drop-shadow-[0_0_5px_rgba(255,200,0,0.5)]">UNKNOWN</span>
            <span className="text-white/50 text-sm">LAST SEEN</span>
            <span className="text-yellow-400 text-sm drop-shadow-[0_0_5px_rgba(255,200,0,0.5)]">UNKNOWN</span>
          </div>
        </div>

        <div>
          <h2 className="text-white/40 text-xs tracking-[0.3em] mb-4 border-b border-white/20 pb-2">
            ─── NOTES ───
          </h2>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Enter your notes here..."
            className="w-full h-32 bg-white/5 border border-white/20 rounded-lg p-4 text-white text-sm tracking-wider resize-none focus:outline-none focus:border-white/50 focus:shadow-[0_0_10px_rgba(255,255,255,0.1)] transition-all duration-300 placeholder:text-white/20"
          />
          <div className="flex items-center gap-4 mt-3">
            <button
              onClick={saveNotes}
              disabled={saving}
              className="border border-white/50 rounded-lg bg-transparent text-white px-6 py-2 text-xs tracking-widest hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:bg-white/10 transition-all duration-300 disabled:opacity-30"
            >
              {saving ? "SAVING..." : "SAVE NOTES"}
            </button>
            {lastSaved && (
              <span className="text-white/30 text-xs">Last saved at {lastSaved}</span>
            )}
          </div>
        </div>

        <div className="border-2 border-red-500/50 rounded-lg p-6 shadow-[0_0_20px_rgba(255,0,0,0.2)]">
          <h2 className="text-red-500 text-xs tracking-[0.3em] mb-4 border-b border-red-500/30 pb-2 drop-shadow-[0_0_10px_rgba(255,0,0,0.8)]">
            ─── CLASSIFIED ───
          </h2>
          <div className="grid grid-cols-[140px_1fr] gap-y-3 gap-x-4">
            <span className="text-red-500/70 text-sm">THREAT LEVEL</span>
            <span className="text-red-500 text-lg font-bold drop-shadow-[0_0_15px_rgba(255,0,0,0.8)]">86%</span>
            <span className="text-red-500/70 text-sm">ARCANE PROWESS</span>
            <span className="text-white text-sm">Blood Manipulation, High Summoning, Animal Transformation</span>
            <span className="text-red-500/70 text-sm">WARRANTS</span>
            <span className="text-white text-sm leading-relaxed">Multiple Destruction of Sovereign Nations, Numerous War Crimes, High Treason, Mass Military Desertion, Unauthorized Use of Forbidden Summoning Rites, Mass Civilian Displacement, Arson of Government Archives, Mass Theft of Classified Spell Scrolls, Smuggling of Arcane Contraband, Multiple Assassinations (mostly unconfirmed), Illegal Blood Harvesting, Operation of an Unlicensed Transmutation Circle, Incitement of Rebellion, Destruction of a Religious Landmark, Repeated Evasion of Interdimensional Arrest Warrants, Impersonation of a Royal Diplomat, Kidnapping, Unauthorized Entry Into Sealed Government Vaults, Possession of a Class-9 Restricted Artifact, Tampering With Ley Line Infrastructure, Excessive Disturbance of the Peace, Frequent Public Intoxication, Frequent Illegal Street Racing, Unlicensed Operation of a Modified Arcane Vehicle, Innumerable Counts of Jaywalking</span>
          </div>
        </div>
      </div>
    </div>
  );
}