"use client";

import { ChevronRight, Download } from "lucide-react";
import { ThemeConfig } from "../lib/theme";

type Props = { tc: ThemeConfig; isLight: boolean };

export default function ReportsPage({ tc, isLight }: Props) {
  return (
    <div className="animate-in fade-in duration-400 space-y-5">

      <h2 className={`font-bold tracking-tight ${tc.heading}`} style={{ fontSize: "1.5rem" }}>
        Digital Forensics Report
      </h2>

      {/* 3 summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { icon: "⚠️", num: "18", label: "Logs\nTampered",     sub: "Detected & logged tampered packets"  },
          { icon: "🛡️", num: "23", label: "Malicious\nIPs",     sub: "Recent threats via control packets"  },
          { icon: "🔗", num: "",   label: "Blockchain\nVerified", sub: "Secured via the Logchain protocol"  },
        ].map((c, i) => (
          <div key={i} className={`${tc.repCard[i]} rounded-2xl relative overflow-hidden`}
            style={{ padding: "1.25rem 1.5rem" }}>
            <div
              className="absolute -bottom-4 -right-4 w-20 h-20 rounded-full blur-2xl opacity-25"
              style={{ background: `radial-gradient(circle,${tc.grad1},transparent)` }}
            />
            <div className="flex items-start gap-3.5 relative z-10">
              <div style={{ fontSize: "1.75rem", lineHeight: 1, marginTop: "2px" }}>{c.icon}</div>
              <div>
                {c.num && (
                  <p className="font-bold text-white" style={{ fontSize: "1.75rem", lineHeight: 1.1 }}>
                    {c.num}
                  </p>
                )}
                <p className="font-bold text-white/90 leading-snug whitespace-pre-line"
                  style={{ fontSize: "0.95rem", marginTop: c.num ? "0.2rem" : 0 }}>
                  {c.label}
                </p>
                <p className="text-white/60 leading-relaxed"
                  style={{ fontSize: "0.78rem", marginTop: "0.35rem" }}>
                  {c.sub}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Timeline + Users */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* Timeline */}
        <div className={`${tc.card} ${tc.cardHov} rounded-2xl transition-all`}
          style={{ padding: "1.4rem 1.6rem" }}>
          <h4 className={`uppercase tracking-[0.15em] font-bold mb-5 flex items-center gap-1.5 ${tc.dimTxt}`}
            style={{ fontSize: "0.75rem" }}>
            Timeline &amp; Evidence
            <ChevronRight style={{ width: "0.9rem", height: "0.9rem" }} />
          </h4>

          <div className="space-y-5">
            {[
              { time: "11:24 AM", icon: "↓", label: "SQL Injection",                    ip: "192.168.1.15" },
              { time: "11:21 AM", icon: "↑", label: "DDOS Traffic — errored data bits", ip: ""            },
              { time: "11:40 AM", icon: "◆", label: "Block #322983 anchored",            ip: ""            },
            ].map((item, i) => (
              <div key={i} className="relative pl-10">
                {i < 2 && (
                  <div className="absolute left-[13px] top-6 bottom-[-20px] w-px"
                    style={{ background: `linear-gradient(to bottom,${tc.accent}50,transparent)` }} />
                )}
                <div
                  className="absolute left-0 top-0.5 rounded-full flex items-center justify-center font-bold text-white"
                  style={{
                    width: "1.6rem", height: "1.6rem", fontSize: "0.72rem",
                    background: `linear-gradient(135deg,${tc.accent},${tc.grad2})`,
                  }}
                >
                  {item.icon}
                </div>
                <p className={`font-mono font-bold ${tc.accentTxt}`} style={{ fontSize: "0.78rem" }}>
                  {item.time}
                </p>
                <p className={`font-semibold ${tc.sub} mt-0.5`} style={{ fontSize: "0.9rem" }}>
                  {item.label}
                  {item.ip && (
                    <span className={`font-mono ml-1.5 ${tc.accentTxt}`}>{item.ip}</span>
                  )}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Users & Export */}
        <div className={`${tc.card} ${tc.cardHov} rounded-2xl transition-all`}
          style={{ padding: "1.4rem 1.6rem" }}>
          <h4 className={`uppercase tracking-[0.15em] font-bold mb-5 ${tc.dimTxt}`}
            style={{ fontSize: "0.75rem" }}>
            Users &amp; Export
          </h4>

          <div className="space-y-1">
            {[
              { role: "Adam R.", title: "Admin Investigator" },
              { role: "Dan H.",  title: "Mentor"             },
              { role: "Loam F.", title: "Analyst"            },
            ].map((u, i) => (
              <div key={i} className="flex justify-between items-center py-3"
                style={{ borderBottom: `1px solid rgba(${tc.accentRgb},0.08)` }}>
                <span className={`font-bold ${isLight ? "text-gray-700" : "text-gray-200"}`}
                  style={{ fontSize: "0.92rem" }}>
                  {u.role}
                </span>
                <span className={`font-semibold flex items-center gap-1 ${tc.accentTxt}`}
                  style={{ fontSize: "0.82rem" }}>
                  {u.title}
                  <ChevronRight style={{ width: "0.9rem", height: "0.9rem" }} />
                </span>
              </div>
            ))}
          </div>

          <button
            className={`mt-5 w-full rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${tc.btnPri}`}
            style={{ padding: "0.75rem", fontSize: "0.9rem" }}
          >
            <Download style={{ width: "1rem", height: "1rem" }} />
            Export PDF
          </button>
        </div>
      </div>
    </div>
  );
}