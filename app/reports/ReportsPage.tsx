"use client";

import { ChevronRight, Download } from "lucide-react";
import { ThemeConfig } from "../lib/theme";
import { logsPerHour, attackData, logsData } from "../lib/data"; // where needed

type Props = {
  tc: ThemeConfig;
  isLight: boolean;
};

export default function ReportsPage({ tc, isLight }: Props) {
  return (
    <div className="animate-in fade-in duration-400 space-y-5">
      <h2 className={`text-lg lg:text-xl font-semibold ${tc.heading}`}>Digital Forensics Report</h2>

      {/* 3 summary cards — 1 col on mobile, 3 on sm+ */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 lg:gap-4">
        {[
          {
            icon: "⚠️", num: "18", label: "Logs\nTampered",
            sub: "Detected & logged tampered packets",
          },
          {
            icon: "🛡️", num: "23", label: "Malicious\nIPs",
            sub: "Recent threats via control packets",
          },
          {
            icon: "🔗", num: "",   label: "Blockchain\nVerified",
            sub: "Secured via the Logchain protocol",
          },
        ].map((c, i) => (
          <div
            key={i}
            className={`${tc.repCard[i]} rounded-2xl p-4 lg:p-5 relative overflow-hidden`}
          >
            <div
              className="absolute -bottom-4 -right-4 w-16 h-16 rounded-full blur-xl opacity-30"
              style={{ background: `radial-gradient(circle,${tc.grad1},transparent)` }}
            />
            <div className="flex items-start gap-3 relative z-10">
              <div className="text-2xl mt-0.5">{c.icon}</div>
              <div>
                {c.num && <p className="text-2xl font-light text-white">{c.num}</p>}
                <p className="text-[12px] font-semibold text-white/90 leading-tight whitespace-pre-line">
                  {c.label}
                </p>
                <p className="text-[10px] mt-1 text-white/55 leading-relaxed">{c.sub}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Timeline + Users — stack on mobile, side-by-side on lg */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-5">

        {/* Timeline */}
        <div className={`${tc.card} ${tc.cardHov} rounded-2xl p-4 lg:p-5 transition-all`}>
          <h4 className={`text-[11px] uppercase tracking-widest font-semibold mb-4 flex items-center gap-1 ${tc.dimTxt}`}>
            Timeline &amp; Evidence <ChevronRight className="w-3 h-3" />
          </h4>
          <div className="space-y-4">
            {[
              { time: "11:24 AM", icon: "↓", label: "SQL Injection",                    ip: "192.168.1.15" },
              { time: "11:21 AM", icon: "↑", label: "DDOS Traffic — errored data bits", ip: ""            },
              { time: "11:40 AM", icon: "◆", label: "Block #322983 anchored",            ip: ""            },
            ].map((item, i) => (
              <div key={i} className="relative pl-8 group">
                {i < 2 && (
                  <div
                    className="absolute left-[11px] top-5 bottom-[-16px] w-px"
                    style={{ background: `linear-gradient(to bottom,${tc.accent}50,transparent)` }}
                  />
                )}
                <div
                  className={`absolute left-0 top-0.5 w-[22px] h-[22px] rounded-full flex items-center justify-center text-[9px] font-bold transition-all ${tc.dot}`}
                  style={{ background: `linear-gradient(135deg,${tc.accent},${tc.grad2})`, color: "#fff" }}
                >
                  {item.icon}
                </div>
                <div>
                  <p className={`text-[10px] font-mono ${tc.accentTxt}`}>{item.time}</p>
                  <p className={`text-[12px] ${tc.sub} mt-0.5`}>
                    {item.label}
                    {item.ip && (
                      <span className={`font-mono ml-1 ${tc.accentTxt}`}>{item.ip}</span>
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Users & Export */}
        <div className={`${tc.card} ${tc.cardHov} rounded-2xl p-4 lg:p-5 transition-all`}>
          <h4 className={`text-[11px] uppercase tracking-widest font-semibold mb-4 ${tc.dimTxt}`}>
            Users &amp; Export
          </h4>
          <div className="space-y-2.5 text-[12px]">
            {[
              { role: "Adam R.",    title: "Admin Investigator" },
              { role: "Dan H.",     title: "Mentor" },
              { role: "Loam F.",    title: "Analyst" },
            ].map((u, i) => (
              <div
                key={i}
                className="flex justify-between items-center py-2"
                style={{ borderBottom: `1px solid rgba(${tc.accentRgb},0.07)` }}
              >
                <span className={`font-medium ${isLight ? "text-gray-700" : "text-gray-300"}`}>
                  {u.role}
                </span>
                <span className={`text-[11px] ${tc.accentTxt} flex items-center gap-1`}>
                  {u.title} <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            ))}
          </div>
          <button
            className={`mt-5 w-full py-2.5 rounded-xl text-[12px] font-semibold flex items-center justify-center gap-2 transition-all ${tc.btnPri}`}
          >
            <Download className="w-3.5 h-3.5" />
            Export PDF
          </button>
        </div>
      </div>
    </div>
  );
}