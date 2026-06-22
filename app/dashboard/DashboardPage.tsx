"use client";

import { ChevronRight } from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis,
  Tooltip, ResponsiveContainer,
} from "recharts";
import { ThemeConfig } from "../lib/theme";
import { logsPerHour, attackData, logsData } from "../lib/data";

type Props = {
  tc: ThemeConfig;
  isLight: boolean;
  onViewLogs: () => void;
};

export default function DashboardPage({ tc, isLight, onViewLogs }: Props) {
  const tickColor = isLight ? "#9ca3af" : "#6b7280";
  const tooltip = {
    backgroundColor: tc.tooltipBg,
    border:          `1px solid ${tc.tooltipBorder}`,
    borderRadius:    "0.6rem",
    fontSize:        "0.85rem",
    color:           isLight ? "#374151" : "#e5e7eb",
    boxShadow:       "0 4px 16px rgba(0,0,0,0.35)",
  };

  return (
    <div className="animate-in fade-in duration-400 space-y-5">
      {/* ── 4 Stat cards ── */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
        {[
          { label: "Logs Today",    value: "12,450", delta: "+12%"  },
          { label: "Tampered Logs", value: "18",     delta: ""      },
          { label: "Active IPs",    value: "23",     delta: "+5%"   },
          { label: "Stability",     value: "Medium", delta: "Stable"},
        ].map((s, i) => (
          <div
            key={i}
            className={`rounded-lg relative overflow-hidden ${tc.statCards[i]}`}
            style={{ padding: "0.5rem 0.75rem" }}
          >
            <div
              className="absolute -bottom-3 -right-3 w-12 h-12 rounded-full blur-xl opacity-20"
              style={{ background: `radial-gradient(circle,${tc.grad1},transparent)` }}
            />
            {/* Label */}
            <p
              className={`uppercase tracking-[0.15em] mb-1 relative z-10 font-semibold ${tc.statLbl}`}
              style={{ fontSize: "0.6rem" }}
            >
              {s.label}
            </p>
            {/* Big number */}
            <h3
              className={`font-bold tracking-tight relative z-10 ${tc.statVal}`}
              style={{ fontSize: "1.2rem", lineHeight: 1.1 }}
            >
              {s.value}
            </h3>
            {s.delta && (
              <span
                className={`relative z-10 block mt-0.5 font-semibold ${tc.statDelta}`}
                style={{ fontSize: "0.65rem" }}
              >
                {s.delta}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* ── Charts row ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* Logs Per Hour */}
        <div
          className={`${tc.card} ${tc.cardHov} rounded-2xl transition-all`}
          style={{ padding: "1.35rem 1.6rem" }}
        >
          {/* Card header */}
          <div className="flex items-center justify-between mb-3">
            <span
              className={`uppercase tracking-[0.15em] font-bold ${tc.dimTxt}`}
              style={{ fontSize: "0.82rem" }}
            >
              Logs Per Hour
            </span>
            <div className="flex items-center gap-3">
              <span className={tc.sub} style={{ fontSize: "0.82rem", fontWeight: 600 }}>
                Last 24 Hours
              </span>
              <span
                className={`font-bold px-2.5 py-0.5 rounded-md ${tc.btnSec}`}
                style={{ fontSize: "0.8rem" }}
              >
                3 →
              </span>
            </div>
          </div>

          <div style={{ height: "11rem" }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={logsPerHour} margin={{ left: -18, right: 2, top: 4, bottom: 0 }}>
                <defs>
                  <linearGradient id="aGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%"   stopColor={tc.accent} stopOpacity={0.4} />
                    <stop offset="100%" stopColor={tc.accent} stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="t" axisLine={false} tickLine={false}
                  tick={{ fill: tickColor, fontSize: 12, fontWeight: 500 }} />
                <YAxis axisLine={false} tickLine={false}
                  tick={{ fill: tickColor, fontSize: 12, fontWeight: 500 }} />
                <Tooltip contentStyle={tooltip}
                  cursor={{ stroke: tc.accent, strokeWidth: 1, strokeOpacity: 0.3 }} />
                <Area type="monotone" dataKey="v" stroke={tc.accent} strokeWidth={2.5}
                  fill="url(#aGrad)" dot={false} activeDot={{ r: 5, fill: tc.accent }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-baseline gap-2.5 mt-3">
            <span
              className={`font-bold ${tc.heading}`}
              style={{ fontSize: "2rem", textShadow: "0 1px 8px rgba(0,0,0,0.2)" }}
            >
              1,428
            </span>
            <span
              className={`font-semibold ${tc.accentTxt}`}
              style={{ fontSize: "0.85rem" }}
            >
              Stable ↑
            </span>
          </div>
        </div>

        {/* Recent Attack Sources */}
        <div
          className={`${tc.card} ${tc.cardHov} rounded-2xl transition-all`}
          style={{ padding: "1.35rem 1.6rem" }}
        >
          <div className="flex items-center justify-between mb-3">
            <span
              className={`uppercase tracking-[0.15em] font-bold ${tc.dimTxt}`}
              style={{ fontSize: "0.82rem" }}
            >
              Recent Attack Sources
            </span>
            <span
              className={`${tc.accentTxt} cursor-pointer font-bold`}
              style={{ fontSize: "0.82rem" }}
            >
              Last 17 ms →
            </span>
          </div>

          {/* World map */}
          <div
            className={`relative rounded-xl overflow-hidden
              ${isLight ? "bg-purple-50/50" : "bg-white/[0.02]"}`}
            style={{ height: "8rem" }}
          >
            <svg viewBox="0 0 400 160" className="w-full h-full opacity-25"
              preserveAspectRatio="xMidYMid meet">
              {[
                [60,60],[80,55],[100,60],[120,65],[140,60],[70,75],[90,80],[110,75],
                [180,55],[200,50],[220,55],[240,60],[200,70],[220,65],
                [160,90],[180,95],[200,90],[220,85],[240,90],[260,85],
                [280,55],[300,60],[320,55],[340,60],[300,70],
                [180,110],[200,115],[220,110],[200,125],
                [310,95],[330,100],[320,110],
              ].map(([x,y],i) => (
                <circle key={i} cx={x} cy={y} r="2.5" fill={tc.accent} opacity={0.6} />
              ))}
              {([[60,60,220,55],[300,60,220,55],[180,55,220,55]] as number[][]).map(([x1,y1,x2,y2],i) => (
                <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
                  stroke={tc.accent} strokeWidth="0.8" strokeDasharray="3,3" opacity={0.4} />
              ))}
              <circle cx={220} cy={55} r="5"  fill={tc.accent} opacity={0.8} />
              <circle cx={220} cy={55} r="9"  fill="none" stroke={tc.accent} strokeWidth="1" opacity={0.4} />
            </svg>
          </div>

          {/* Top IPs */}
          <div className="mt-3.5 space-y-2.5">
            {attackData.slice(0,3).map((a,i) => (
              <div key={i} className="flex items-center gap-3">
                <span
                  className={`font-mono font-semibold ${tc.sub} w-36 truncate`}
                  style={{ fontSize: "0.82rem" }}
                >
                  {a.ip}
                </span>
                <div className="flex-1 rounded-full overflow-hidden"
                  style={{ height: "0.4rem", background: `rgba(${tc.accentRgb},0.12)` }}>
                  <div className="h-full rounded-full transition-all"
                    style={{ width: `${(a.count/90)*100}%`, background: tc.accent }} />
                </div>
                <span
                  className={`font-bold ${tc.sub}`}
                  style={{ fontSize: "0.82rem", minWidth: "2rem", textAlign: "right" }}
                >
                  {a.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Recent Logs table ── */}
      <div className={`${tc.card} ${tc.cardHov} rounded-2xl overflow-hidden transition-all`}>
        {/* Table header bar */}
        <div
          className="flex items-center justify-between"
          style={{
            padding:      "1.1rem 1.6rem",
            borderBottom: `1px solid rgba(${tc.accentRgb},0.1)`,
          }}
        >
          <h4
            className={`uppercase tracking-[0.15em] font-bold flex items-center gap-1.5 ${tc.dimTxt}`}
            style={{ fontSize: "0.75rem" }}
          >
            Recent Logs
            <ChevronRight style={{ width: "0.9rem", height: "0.9rem", opacity: 0.5 }} />
          </h4>
          <button
            onClick={onViewLogs}
            className={`uppercase tracking-widest flex items-center gap-1 font-semibold
              ${tc.accentTxt} hover:opacity-70 transition-opacity`}
            style={{ fontSize: "0.75rem" }}
          >
            View All
            <ChevronRight style={{ width: "0.9rem", height: "0.9rem" }} />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left" style={{ minWidth: "38rem" }}>
            <thead>
              <tr
                className={`uppercase tracking-[0.12em] ${tc.tblHead}`}
                style={{
                  fontSize:     "0.72rem",
                  fontWeight:   700,
                  borderBottom: `1px solid rgba(${tc.accentRgb},0.08)`,
                }}
              >
                {["Time","Source IP","Dest IP","Attack Type","Integrity","Status"].map(h => (
                  <th key={h} style={{ padding: "0.85rem 1.4rem" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {logsData.slice(0,4).map((r,i) => (
                <tr key={i} className={`transition-colors ${tc.tblRow}`}>
                  {[r.time, r.ip1, r.ip2].map((v,j) => (
                    <td key={j}
                      className={`font-mono font-medium ${tc.sub}`}
                      style={{ padding: "0.9rem 1.4rem", fontSize: "0.82rem" }}
                    >
                      {v}
                    </td>
                  ))}
                  <td style={{ padding: "0.9rem 1.4rem" }}>
                    <span
                      className={`rounded-md font-semibold ${tc.pillType}`}
                      style={{ padding: "0.25rem 0.7rem", fontSize: "0.75rem" }}
                    >
                      {r.type}
                    </span>
                  </td>
                  <td
                    className={`font-semibold ${r.integrity === "Valid" ? "text-emerald-500" : "text-rose-400"}`}
                    style={{ padding: "0.9rem 1.4rem", fontSize: "0.82rem" }}
                  >
                    {r.integrity}
                  </td>
                  <td style={{ padding: "0.9rem 1.4rem" }}>
                    <span
                      className={`rounded-md font-semibold
                        ${r.statusType==="bad"  ? tc.pillBad
                        : r.statusType==="warn" ? tc.pillWarn
                        : tc.pillGood}`}
                      style={{ padding: "0.25rem 0.7rem", fontSize: "0.75rem" }}
                    >
                      {r.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}