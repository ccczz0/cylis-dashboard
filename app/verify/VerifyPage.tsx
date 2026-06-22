"use client";

import { useRef, useState } from "react";
import { UploadCloud, ShieldCheck, FileText, Loader2, CheckCircle2 } from "lucide-react";
import { ThemeConfig } from "../lib/theme";

type Props = { tc: ThemeConfig };

export default function VerifyPage({ tc }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName]   = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      setFileName(f.name);
      setUploading(true);
      setTimeout(() => setUploading(false), 1500);
    }
  };

  return (
    <div className="animate-in fade-in duration-400 space-y-5">

      <h2 className={`font-bold tracking-tight ${tc.heading}`} style={{ fontSize: "1.5rem" }}>
        Verify Log Integrity
      </h2>

      {/* Upload box */}
      <div
        onClick={() => fileRef.current?.click()}
        className={`
          ${tc.card} border-2 border-dashed rounded-2xl
          flex flex-col items-center justify-center cursor-pointer group transition-all
          ${fileName ? tc.uploadAct : tc.uploadBox}
        `}
        style={{ padding: "3.5rem 2rem" }}
      >
        <input type="file" ref={fileRef} className="hidden" onChange={onFile} />

        {uploading ? (
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="animate-spin" style={{ width: "2.5rem", height: "2.5rem", color: tc.accent }} />
            <p className="animate-pulse uppercase tracking-widest font-bold"
              style={{ color: tc.accent, fontSize: "0.85rem" }}>
              Analyzing…
            </p>
          </div>
        ) : fileName ? (
          <div className="flex flex-col items-center gap-3">
            <div className="w-14 h-14 rounded-full bg-emerald-500/10 flex items-center justify-center">
              <FileText className="text-emerald-500" style={{ width: "1.75rem", height: "1.75rem" }} />
            </div>
            <p className={`font-bold ${tc.heading}`} style={{ fontSize: "1.05rem" }}>{fileName}</p>
            <p className={`uppercase tracking-widest font-semibold ${tc.muted}`} style={{ fontSize: "0.72rem" }}>
              Click to change
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 group-hover:scale-105 transition-transform">
            <div className={`rounded-full flex items-center justify-center transition-all ${tc.iconBox}`}
              style={{ width: "3.5rem", height: "3.5rem" }}>
              <UploadCloud className={`transition-colors ${tc.iconClr}`}
                style={{ width: "1.75rem", height: "1.75rem" }} />
            </div>
            <div className="text-center space-y-1">
              <p className={`font-semibold ${tc.sub}`} style={{ fontSize: "1rem" }}>
                Upload Log File or Enter Log ID
              </p>
              <p className={`${tc.muted}`} style={{ fontSize: "0.82rem" }}>
                Drag & drop or click to browse
              </p>
            </div>
            <button className={`px-10 py-2.5 rounded-xl font-bold transition-all ${tc.btnPri}`}
              style={{ fontSize: "0.88rem" }}>
              Verify Log
            </button>
          </div>
        )}
      </div>

      {/* Scan results card */}
      <div className={`${tc.card} rounded-2xl space-y-5 relative overflow-hidden`}
        style={{ padding: "1.6rem 1.8rem" }}>

        <div className="absolute top-4 right-4 opacity-[0.04]">
          <ShieldCheck style={{ width: "5rem", height: "5rem", color: tc.accent }} />
        </div>

        {/* Progress */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <p className={`font-bold ${tc.heading}`} style={{ fontSize: "1rem" }}>Scanning…</p>
            <span className={`font-semibold ${tc.sub}`} style={{ fontSize: "0.78rem" }}>Save ↓</span>
          </div>
          <div className="h-1.5 rounded-full overflow-hidden"
            style={{ background: `rgba(${tc.accentRgb},0.1)` }}>
            <div className="h-full rounded-full w-[65%]"
              style={{ background: `linear-gradient(90deg,transparent,${tc.accent},${tc.grad1})` }} />
          </div>
        </div>

        {/* Hash rows */}
        <div className="space-y-3.5">
          {[
            { label: "Local Hash", val: "9934438877992948322662826599839923593..." },
            { label: "Chain Hash", val: "9933438873266369659236726578830956386..." },
          ].map((h, i) => (
            <div key={i} className="flex items-start gap-3">
              <CheckCircle2 className="text-emerald-500 shrink-0 mt-0.5"
                style={{ width: "1.1rem", height: "1.1rem" }} />
              <div className="min-w-0">
                <span className={`uppercase tracking-widest font-bold mr-3 ${tc.dimTxt}`}
                  style={{ fontSize: "0.72rem" }}>
                  {h.label}
                </span>
                <span className={`font-mono font-semibold break-all ${tc.sub}`}
                  style={{ fontSize: "0.82rem" }}>
                  {h.val}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Hash boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          {[
            { label: "Local File Hash", cls: tc.hashBox,   val: fileName ? "5f2a8c9d1e2f3a4b5c6d7e8f9a0b1c2d..." : "Waiting for file…" },
            { label: "Chain Hash",      cls: tc.hashBoxAc, val: fileName ? "5f2a8c9d1e2f3a4b5c6d7e8f9a0b1c2d..." : "Waiting for file…" },
          ].map((box, i) => (
            <div key={i} className="space-y-2">
              <p className={`uppercase tracking-widest font-bold ${tc.muted}`}
                style={{ fontSize: "0.7rem" }}>
                {box.label}
              </p>
              <div className={`font-mono font-semibold border rounded-xl break-all leading-relaxed ${box.cls}`}
                style={{ padding: "0.75rem 1rem", fontSize: "0.78rem" }}>
                {box.val}
              </div>
            </div>
          ))}
        </div>

        {/* Verified */}
        {fileName && !uploading && (
          <div className="flex items-center gap-2.5 text-emerald-500 animate-in fade-in duration-400 pt-1">
            <CheckCircle2 style={{ width: "1.2rem", height: "1.2rem" }} />
            <span className="font-bold" style={{ fontSize: "1rem" }}>Verified — Log is intact</span>
          </div>
        )}
      </div>
    </div>
  );
}