"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { supabase } from "@/app/supabaseClient";

export default function VielaDossier() {
  const router = useRouter();
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<string | null>(null);

  useEffect(() => {
    async function loadNotes() {
      const { data } = await supabase
        .from("notes")
        .select("content")
        .eq("npc_id", "viela")
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
      .eq("npc_id", "viela");
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

      <div className="flex flex-1 px-8 pb-8 gap-8">
        {/* LEFT SIDE — Portrait */}
        <div className="w-1/4 flex-shrink-0">
          <div className="w-full h-full min-h-[600px] border border-white/30 rounded-lg overflow-hidden relative">
            <Image
              src="/viela-portrait.jpg"
              alt="Viela Hlow-Byorn"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* RIGHT SIDE — Dossier */}
        <div className="flex-1 flex flex-col gap-8 overflow-y-auto">
          {/* BIODATA */}
          <div>
            <h2 className="text-white/40 text-xs tracking-[0.3em] mb-4 border-b border-white/20 pb-2">
              ─── BIODATA ───
            </h2>
            <div className="grid grid-cols-[140px_1fr] gap-y-3 gap-x-4">
              <span className="text-white/50 text-sm">NAME</span>
              <span className="text-white text-sm">Viela Hlow-Byorn</span>

              <span className="text-white/50 text-sm">ALIAS</span>
              <span className="text-white text-sm">Butterfly</span>

              <span className="text-white/50 text-sm">OCCUPATION</span>
              <span className="text-white text-sm">Security Guard / Cyber-Security Mercenary</span>

              <span className="text-white/50 text-sm">AFFILIATION</span>
              <span className="text-white text-sm">The Last Circuit: Fenmoore&apos;s Bar</span>

              <span className="text-white/50 text-sm">SPECIES</span>
              <span className="text-white text-sm">Anthropomorphic Moth Variant</span>
            </div>
          </div>

          {/* PHYSICAL PROFILE */}
          <div>
            <h2 className="text-white/40 text-xs tracking-[0.3em] mb-4 border-b border-white/20 pb-2">
              ─── PHYSICAL PROFILE ───
            </h2>
            <div className="grid grid-cols-[140px_1fr] gap-y-3 gap-x-4">
              <span className="text-white/50 text-sm">AGE</span>
              <span className="text-red-500 text-sm drop-shadow-[0_0_5px_rgba(255,0,0,0.5)]">[DISCLOSED]</span>

              <span className="text-white/50 text-sm">DESCRIPTION</span>
              <span className="text-white text-sm">Strong built, pale blond hair, mechanical left leg covering from lower thigh</span>
            </div>
          </div>

          {/* PERSONAL INTEL */}
          <div>
            <h2 className="text-white/40 text-xs tracking-[0.3em] mb-4 border-b border-white/20 pb-2">
              ─── PERSONAL INTEL ───
            </h2>
            <div className="grid grid-cols-[140px_1fr] gap-y-3 gap-x-4">
              <span className="text-white/50 text-sm">PERSONALITY</span>
              <span className="text-white text-sm leading-relaxed">
                Known to be the muscles of the group, Viela is the frontliner who no one would&apos;ve expected. In a world where patriarchy exists, she defies all rules and prevents any casualty from happening... well at the very least on a minimal scale. Agile, Impactful, and Bashful is what others would like to call her... especially her enemies.
              </span>

              <span className="text-white/50 text-sm">SEXUALITY</span>
              <span className="text-white text-sm">Bisexual w/ strong preference of women. (Don&apos;t ask her why)</span>

              <span className="text-white/50 text-sm">KNOWN ASSOCIATES</span>
              <span className="text-white text-sm">Last Circuit, The Cunninghams, Apollo 11</span>

              <span className="text-white/50 text-sm">BACKGROUND</span>
              <span className="text-red-500 text-sm drop-shadow-[0_0_5px_rgba(255,0,0,0.5)]">[DISCLOSED]</span>
            </div>
          </div>

          {/* CURRENT CAMPAIGN */}
          <div>
            <h2 className="text-white/40 text-xs tracking-[0.3em] mb-4 border-b border-white/20 pb-2">
              ─── CURRENT CAMPAIGN ───
            </h2>
            <div className="grid grid-cols-[140px_1fr] gap-y-3 gap-x-4">
              <span className="text-white/50 text-sm">STATUS</span>
              <span className="text-green-400 text-sm drop-shadow-[0_0_5px_rgba(0,255,0,0.4)]">ALIVE</span>

              <span className="text-white/50 text-sm">LAST SEEN</span>
              <span className="text-white text-sm">Southern Atmosphere | City Clouds | 1:32 A.M — before immediate disappearance</span>
            </div>
          </div>

          {/* NOTES */}
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

          {/* CLASSIFIED */}
          <div className="border-2 border-red-500/50 rounded-lg p-6 shadow-[0_0_20px_rgba(255,0,0,0.2)]">
            <h2 className="text-red-500 text-xs tracking-[0.3em] mb-4 border-b border-red-500/30 pb-2 drop-shadow-[0_0_10px_rgba(255,0,0,0.8)]">
              ─── CLASSIFIED ───
            </h2>
            <div className="grid grid-cols-[140px_1fr] gap-y-3 gap-x-4">
              <span className="text-red-500/70 text-sm">THREAT LEVEL</span>
              <span className="text-red-500 text-lg font-bold drop-shadow-[0_0_15px_rgba(255,0,0,0.8)]">54%</span>

              <span className="text-red-500/70 text-sm">ARCANE PROWESS</span>
              <span className="text-white text-sm">Butterfly Shapeshift, Superhuman Strength, 360 Vision</span>

              <span className="text-red-500/70 text-sm">WARRANTS</span>
              <span className="text-white text-sm">Arson of Government Property, Mass Murder, Illegal Trading</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}