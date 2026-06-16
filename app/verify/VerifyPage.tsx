"use client";

import { useRef, useState } from "react";
import {
  UploadCloud, ShieldCheck, FileText, Loader2, CheckCircle2,
} from "lucide-react";
import { ThemeConfig } from "../lib/theme";
import { logsPerHour, attackData, logsData } from "../lib/data"; // where needed

type Props = {
  tc: ThemeConfig;
};

export default function VerifyPage({ tc }: Props) {
  const fileRef                     = useRef<HTMLInputElement>(null);
  const [fileName, setFileName]     = useState<string | null>(null);
  const [uploading, setUploading]   = useState(false);

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      setFileName(f.name);
      setUploading(true);
      setTimeout(() => setUploading(false), 1500);
    }
  };

  return (
    <div className="animate-in fade-in duration-400 space-y-4">
      <h2 className={`text-lg lg:text-xl font-semibold ${tc.heading}`}>Verify Log Integrity</h2>

      {/* Upload box */}
      <div
        onClick={() => fileRef.current?.click()}
        className={`
          ${tc.card} border-2 border-dashed rounded-2xl p-10 lg:p-14
          flex flex-col items-center justify-center cursor-pointer group transition-all
          ${fileName ? tc.uploadAct : tc.uploadBox}
        `}
      >
        <input type="file" ref={fileRef} className="hidden" onChange={onFile} />

        {uploading ? (
          <div className="flex flex-col items-center gap-3">
            <div className="relative">
              <div
                className="absolute inset-0 rounded-full blur-md animate-ping"
                style={{ background: `rgba(${tc.accentRgb},0.2)` }}
              />
              <Loader2 className="w-9 h-9 animate-spin relative" style={{ color: tc.accent }} />
            </div>
            <p
              className="text-sm animate-pulse uppercase tracking-widest"
              style={{ color: tc.accent }}
            >
              Analyzing…
            </p>
          </div>
        ) : fileName ? (
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center">
              <FileText className="w-6 h-6 text-emerald-500" />
            </div>
            <p className={`text-base font-medium ${tc.heading}`}>{fileName}</p>
            <p className={`text-[10px] uppercase tracking-widest ${tc.muted}`}>Click to change</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3 group-hover:scale-105 transition-transform">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${tc.iconBox}`}
            >
              <UploadCloud className={`w-6 h-6 transition-colors ${tc.iconClr}`} />
            </div>
            <div className="text-center">
              <p className={`text-sm ${tc.sub}`}>Upload Log File or Enter Log ID</p>
              <button className={`mt-3 px-8 py-2 rounded-xl text-[12px] transition-all ${tc.btnPri}`}>
                Verify Log
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Scan results card */}
      <div className={`${tc.card} rounded-2xl p-5 lg:p-6 space-y-5 relative overflow-hidden`}>
        {/* Background icon */}
        <div className="absolute top-3 right-3 opacity-[0.04]">
          <ShieldCheck className="w-20 h-20" style={{ color: tc.accent }} />
        </div>

        {/* Progress bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className={`text-sm font-medium ${tc.heading}`}>Scanning…</p>
            <span className={`text-[10px] ${tc.sub}`}>Game: Save ↓</span>
          </div>
          <div className="h-1 rounded-full overflow-hidden" style={{ background: `rgba(${tc.accentRgb},0.1)` }}>
            <div
              className="h-full rounded-full w-[65%]"
              style={{ background: `linear-gradient(90deg,transparent,${tc.accent},${tc.grad1})` }}
            />
          </div>
        </div>

        {/* Hash rows */}
        <div className="space-y-3">
          {[
            { label: "Local Hash", val: "9934438877992948322662826599839923593..." },
            { label: "Chain Hash", val: "9933438873266369659236726578830956386..." },
          ].map((h, i) => (
            <div key={i} className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <div className="min-w-0">
                <span className={`text-[10px] uppercase tracking-widest font-bold mr-3 ${tc.dimTxt}`}>
                  {h.label}
                </span>
                <span className={`font-mono text-[11px] break-all ${tc.sub}`}>{h.val}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Hash comparison boxes — stack on mobile, side-by-side on sm+ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4 pt-2">
          <div className="space-y-2">
            <p className={`text-[10px] uppercase tracking-widest font-bold ${tc.muted}`}>
              Local File Hash
            </p>
            <div className={`font-mono text-[10px] border p-3 rounded-xl break-all leading-relaxed ${tc.hashBox}`}>
              {fileName ? "5f2a8c9d1e2f3a4b5c6d7e8f9a0b1c2d..." : "Waiting for file…"}
            </div>
          </div>
          <div className="space-y-2">
            <p className={`text-[10px] uppercase tracking-widest font-bold ${tc.muted}`}>
              Chain Hash
            </p>
            <div className={`font-mono text-[10px] border p-3 rounded-xl break-all leading-relaxed ${tc.hashBoxAc}`}>
              {fileName ? "5f2a8c9d1e2f3a4b5c6d7e8f9a0b1c2d..." : "Waiting for file…"}
            </div>
          </div>
        </div>

        {/* Verified banner */}
        {fileName && !uploading && (
          <div className="flex items-center gap-2 text-emerald-500 animate-in fade-in duration-400 pt-2">
            <CheckCircle2 className="w-4 h-4" />
            <span className="text-sm font-semibold">Verified — Log is intact</span>
          </div>
        )}
      </div>
    </div>
  );
}