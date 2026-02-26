"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/supabaseClient";

interface Report {
  id: string;
  slug: string;
  title: string;
  classification: string;
  category: string;
  solved: boolean;
}

function ScrambledText({ text }: { text: string }) {
  const [display, setDisplay] = useState(text);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;':\",./<>?`~¤§±ÆÐ×Þßæð÷þ";

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplay(
        text
          .split("")
          .map((char) =>
            char === " " ? " " : chars[Math.floor(Math.random() * chars.length)]
          )
          .join("")
      );
    }, 80);
    return () => clearInterval(interval);
  }, [text]);

  return <span className="font-mono">{display}</span>;
}

function ScanLine() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="absolute left-0 w-full h-[1px] bg-white/5 animate-scanline" />
    </div>
  );
}

export default function Database() {
  const router = useRouter();
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReports() {
      const { data } = await supabase
        .from("database_reports")
        .select("id, slug, title, classification, category, solved")
        .order("created_at", { ascending: true });
      if (data) setReports(data);
      setLoading(false);
    }
    fetchReports();
  }, []);

  return (
    <div className="min-h-screen bg-black flex flex-col p-8 font-[family-name:var(--font-typewriter)] relative">
      <ScanLine />

      <button
        onClick={() => router.push("/menu")}
        className="text-white/50 hover:text-white transition-colors duration-200 text-sm tracking-wider mb-12 self-start z-10"
      >
        ← MAIN MENU
      </button>

      {/* Header */}
      <div className="text-center mb-16 z-10">
        <p className="text-white/30 text-xs tracking-[0.5em] mb-3">
          ◆ U-SOL-13 ENFORCEMENT DIVISION ◆
        </p>
        <h1 className="text-white text-4xl tracking-widest drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]">
          THE DATABASE
        </h1>
        <p className="text-white/20 text-xs tracking-[0.3em] mt-3">
          CLASSIFIED INTELLIGENCE TERMINAL — AUTHORIZED ACCESS ONLY
        </p>
        <div className="w-64 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent mx-auto mt-4" />
      </div>

      {/* Report List */}
      {loading ? (
        <p className="text-white/30 text-center text-sm tracking-wider animate-pulse">
          RETRIEVING RECORDS...
        </p>
      ) : reports.length === 0 ? (
        <p className="text-white/30 text-center text-sm tracking-wider">
          NO RECORDS FOUND
        </p>
      ) : (
        <div className="flex flex-col gap-4 max-w-3xl mx-auto w-full z-10">
          {reports.map((report, index) => (
            <button
              key={report.id}
              onClick={() => router.push(`/database/${report.slug}`)}
              className={`w-full text-left p-5 rounded-lg border transition-all duration-300 group relative overflow-hidden ${
                report.solved
                  ? "border-white/20 hover:border-white/50 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:bg-white/5"
                  : "border-red-500/30 hover:border-red-500/60 hover:shadow-[0_0_20px_rgba(255,0,0,0.2)] hover:bg-red-500/5"
              }`}
            >
              {/* Encrypted static overlay for locked files */}
              {!report.solved && (
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
                  }}
                />
              )}

              <div className="flex items-center justify-between">
                <div className="flex-1">
                  {/* File number */}
                  <p className={`text-xs tracking-[0.3em] mb-2 ${
                    report.solved ? "text-white/30" : "text-red-500/50"
                  }`}>
                    FILE #{String(index + 1).padStart(4, "0")} — {report.category}
                  </p>

                  {/* Title: scrambled if locked, clean if solved */}
                  <h2 className={`text-sm tracking-wider ${
                    report.solved ? "text-white" : "text-red-500/70"
                  }`}>
                    {report.solved ? report.title : <ScrambledText text={report.title} />}
                  </h2>
                </div>

                {/* Status badge */}
                <div className={`flex-shrink-0 ml-4 px-3 py-1 rounded text-xs tracking-widest ${
                  report.solved
                    ? "border border-green-500/30 text-green-400/70"
                    : "border border-red-500/30 text-red-500 animate-pulse"
                }`}>
                  {report.solved ? "DECRYPTED" : "ENCRYPTED"}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="mt-16 text-center z-10">
        <p className="text-white/10 text-xs tracking-widest">
          {reports.filter(r => r.solved).length} / {reports.length} FILES DECRYPTED
        </p>
      </div>
    </div>
  );
}