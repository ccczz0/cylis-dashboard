"use client";

import { ChevronRight } from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis,
  Tooltip, ResponsiveContainer,
} from "recharts";
import { ThemeConfig } from "../lib/theme";
import { logsPerHour, attackData, logsData } from "../lib/data"; // where needed

type Props = {
  tc: ThemeConfig;
  isLight: boolean;
  onViewLogs: () => void;
};

export default function DashboardPage({ tc, isLight, onViewLogs }: Props) {
  const tooltip = {
    backgroundColor: tc.tooltipBg,
    border: `1px solid ${tc.tooltipBorder}`,
    borderRadius: "10px",
    fontSize: "11px",
    color: isLight ? "#374151" : "#d1d5db",
    boxShadow: "0 4px 16px rgba(0,0,0,0.35)",
  };

  return (
    <div className="animate-in fade-in duration-400 space-y-5">

      {/* Welcome */}
      <div>
        <h1 className={`text-xl lg:text-[22px] font-semibold tracking-tight ${tc.heading}`}>
          Welcome to CYLIS.
        </h1>
        
      </div>

      {/* 4 Stat cards — 2 cols on mobile, 4 on lg */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 lg:gap-4">
        {[
          { label: "Logs Today",    value: "12,450", delta: "+12%" },
          { label: "Tampered Logs", value: "18",     delta: ""     },
          { label: "Active IPs",    value: "23",     delta: "+5%"  },
          { label: "Stability",     value: "Medium", delta: "Stable" },
        ].map((s, i) => (
          <div
            key={i}
            className={`rounded-2xl p-4 lg:p-5 relative overflow-hidden ${tc.statCards[i]}`}
          >
            <div
              className="absolute -bottom-4 -right-4 w-20 h-20 rounded-full blur-2xl opacity-30"
              style={{ background: `radial-gradient(circle,${tc.grad1},transparent)` }}
            />
            <p className={`text-[10px] uppercase tracking-widest mb-1 relative z-10 ${tc.statLbl}`}>
              {s.label}
            </p>
            <h3 className={`text-2xl lg:text-3xl font-light tracking-tight relative z-10 ${tc.statVal}`}>
              {s.value}
            </h3>
            {s.delta && (
              <span className={`text-[10px] relative z-10 block mt-0.5 ${tc.statDelta}`}>
                {s.delta}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Charts row — stack on mobile, side-by-side on lg */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-5">

        {/* Logs Per Hour */}
        <div className={`${tc.card} ${tc.cardHov} rounded-2xl p-4 lg:p-5 transition-all`}>
          <div className="flex items-center justify-between mb-1">
            <span className={`text-[11px] uppercase tracking-widest font-semibold ${tc.dimTxt}`}>
              Logs Per Hour
            </span>
            <div className="flex items-center gap-3">
              <span className={`text-[10px] ${tc.muted}`}>Last 24 Hours</span>
              <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-md ${tc.btnSec}`}>
                3 →
              </span>
            </div>
          </div>
          <div className="h-[140px] lg:h-[160px] mt-3">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={logsPerHour} margin={{ left: -22, right: 2, top: 4, bottom: 0 }}>
                <defs>
                  <linearGradient id="aGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%"   stopColor={tc.accent} stopOpacity={0.35} />
                    <stop offset="100%" stopColor={tc.accent} stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="t" axisLine={false} tickLine={false}
                  tick={{ fill: isLight ? "#9ca3af" : "#52525b", fontSize: 9 }}
                />
                <YAxis
                  axisLine={false} tickLine={false}
                  tick={{ fill: isLight ? "#9ca3af" : "#52525b", fontSize: 9 }}
                />
                <Tooltip contentStyle={tooltip} cursor={{ stroke: tc.accent, strokeWidth: 1, strokeOpacity: 0.3 }} />
                <Area
                  type="monotone" dataKey="v" stroke={tc.accent} strokeWidth={1.5}
                  fill="url(#aGrad)" dot={false} activeDot={{ r: 3, fill: tc.accent }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-baseline gap-2 mt-2">
            <span className={`text-2xl font-light ${tc.heading}`}>1428</span>
            <span className={`text-[11px] ${tc.sub}`}>Stable</span>
          </div>
        </div>

        {/* Recent Attack Sources */}
        <div className={`${tc.card} ${tc.cardHov} rounded-2xl p-4 lg:p-5 transition-all`}>
          <div className="flex items-center justify-between mb-1">
            <span className={`text-[11px] uppercase tracking-widest font-semibold ${tc.dimTxt}`}>
              Recent Attack Sources
            </span>
            <span className={`text-[10px] ${tc.accentTxt} cursor-pointer`}>Last 17 ms →</span>
          </div>

          {/* World map illustration */}
          <div className={`relative h-[100px] lg:h-[120px] mt-2 rounded-xl overflow-hidden ${isLight ? "bg-purple-50/50" : "bg-white/[0.02]"}`}>
            <svg viewBox="0 0 400 160" className="w-full h-full opacity-25" preserveAspectRatio="xMidYMid meet">
              {[
                [60,60],[80,55],[100,60],[120,65],[140,60],[70,75],[90,80],[110,75],
                [180,55],[200,50],[220,55],[240,60],[200,70],[220,65],
                [160,90],[180,95],[200,90],[220,85],[240,90],[260,85],
                [280,55],[300,60],[320,55],[340,60],[300,70],
                [180,110],[200,115],[220,110],[200,125],
                [310,95],[330,100],[320,110],
              ].map(([x, y], i) => (
                <circle key={i} cx={x} cy={y} r="2.5" fill={tc.accent} opacity={0.6} />
              ))}
              {[[60,60,220,55],[300,60,220,55],[180,55,220,55]].map(([x1,y1,x2,y2], i) => (
                <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
                  stroke={tc.accent} strokeWidth="0.8" strokeDasharray="3,3" opacity={0.4} />
              ))}
              <circle cx={220} cy={55} r="5" fill={tc.accent} opacity={0.8} />
              <circle cx={220} cy={55} r="9" fill="none" stroke={tc.accent} strokeWidth="1" opacity={0.4} />
            </svg>
          </div>

          {/* Top IPs */}
          <div className="mt-2 space-y-1.5">
            {attackData.slice(0, 3).map((a, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className={`text-[10px] font-mono ${tc.sub} w-28 truncate`}>{a.ip}</span>
                <div
                  className="flex-1 h-1 rounded-full overflow-hidden"
                  style={{ background: `rgba(${tc.accentRgb},0.1)` }}
                >
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${(a.count / 90) * 100}%`, background: tc.accent }}
                  />
                </div>
                <span className={`text-[10px] ${tc.sub}`}>{a.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Logs table */}
      <div className={`${tc.card} ${tc.cardHov} rounded-2xl overflow-hidden transition-all`}>
        <div
          className="flex items-center justify-between px-4 lg:px-5 py-3.5"
          style={{ borderBottom: `1px solid rgba(${tc.accentRgb},0.08)` }}
        >
          <h4 className={`text-[11px] uppercase tracking-widest font-semibold ${tc.dimTxt}`}>
            Recent Logs <ChevronRight className="inline w-3 h-3 opacity-60" />
          </h4>
          <button
            onClick={onViewLogs}
            className={`text-[10px] uppercase tracking-widest flex items-center gap-1 ${tc.accentTxt} hover:opacity-70 transition-opacity`}
          >
            View All <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        {/* Horizontally scrollable on small screens */}
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[560px]">
            <thead>
              <tr
                className={`text-[10px] uppercase tracking-[0.12em] ${tc.tblHead}`}
                style={{ borderBottom: `1px solid rgba(${tc.accentRgb},0.08)` }}
              >
                {["Time", "IP", "IP", "Attack Type", "Integrity", "Status"].map((h) => (
                  <th key={h} className="px-4 lg:px-5 py-3 font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="text-xs">
              {logsData.slice(0, 4).map((r, i) => (
                <tr key={i} className={`transition-colors ${tc.tblRow}`}>
                  <td className={`px-4 lg:px-5 py-3 font-mono ${tc.sub}`}>{r.time}</td>
                  <td className={`px-4 lg:px-5 py-3 font-mono ${tc.sub}`}>{r.ip1}</td>
                  <td className={`px-4 lg:px-5 py-3 font-mono ${tc.sub}`}>{r.ip2}</td>
                  <td className="px-4 lg:px-5 py-3">
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-medium ${tc.pillType}`}>
                      {r.type}
                    </span>
                  </td>
                  <td className={`px-4 lg:px-5 py-3 ${r.integrity === "Valid" ? "text-emerald-500" : "text-rose-400"}`}>
                    {r.integrity}
                  </td>
                  <td className="px-4 lg:px-5 py-3">
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-medium
                      ${r.statusType === "bad" ? tc.pillBad : r.statusType === "warn" ? tc.pillWarn : tc.pillGood}`}>
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