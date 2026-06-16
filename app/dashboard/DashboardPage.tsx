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
  const tooltip = {
    backgroundColor: tc.tooltipBg,
    border: `1px solid ${tc.tooltipBorder}`,
    borderRadius: "10px",
    fontSize: "clamp(11px, 0.85vw, 13px)",
    color: isLight ? "#374151" : "#d1d5db",
    boxShadow: "0 4px 16px rgba(0,0,0,0.35)",
  };

  return (
    <div className="animate-in fade-in duration-400 space-y-6">


      {/* ── 4 Stat cards ── */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          { label: "Logs Today",    value: "12,450", delta: "+12%" },
          { label: "Tampered Logs", value: "18",     delta: ""     },
          { label: "Active IPs",    value: "23",     delta: "+5%"  },
          { label: "Stability",     value: "Medium", delta: "Stable" },
        ].map((s, i) => (
          <div
            key={i}
            className={`rounded-2xl relative overflow-hidden ${tc.statCards[i]}`}
            style={{ padding: "clamp(16px, 1.4vw, 24px)" }}
          >
            <div
              className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full blur-2xl opacity-30"
              style={{ background: `radial-gradient(circle,${tc.grad1},transparent)` }}
            />
            <p
              className={`uppercase tracking-widest mb-2 relative z-10 ${tc.statLbl}`}
              style={{ fontSize: "clamp(9px, 0.65vw, 11px)" }}
            >
              {s.label}
            </p>
            <h3
              className={`font-light tracking-tight relative z-10 ${tc.statVal}`}
              style={{ fontSize: "clamp(26px, 2.2vw, 36px)" }}
            >
              {s.value}
            </h3>
            {s.delta && (
              <span
                className={`relative z-10 block mt-1 ${tc.statDelta}`}
                style={{ fontSize: "clamp(10px, 0.7vw, 12px)" }}
              >
                {s.delta}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* ── Charts row ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* Logs Per Hour */}
        <div className={`${tc.card} ${tc.cardHov} rounded-2xl transition-all`}
          style={{ padding: "clamp(16px, 1.4vw, 24px)" }}>
          <div className="flex items-center justify-between mb-2">
            <span
              className={`uppercase tracking-widest font-semibold ${tc.dimTxt}`}
              style={{ fontSize: "clamp(10px, 0.75vw, 12px)" }}
            >
              Logs Per Hour
            </span>
            <div className="flex items-center gap-3">
              <span
                className={tc.muted}
                style={{ fontSize: "clamp(10px, 0.7vw, 12px)" }}
              >
                Last 24 Hours
              </span>
              <span
                className={`font-medium px-2 py-0.5 rounded-md ${tc.btnSec}`}
                style={{ fontSize: "clamp(10px, 0.7vw, 12px)" }}
              >
                3 →
              </span>
            </div>
          </div>
          <div style={{ height: "clamp(150px, 12vw, 200px)", marginTop: "12px" }}>
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
                  tick={{ fill: isLight ? "#9ca3af" : "#52525b", fontSize: 10 }}
                />
                <YAxis
                  axisLine={false} tickLine={false}
                  tick={{ fill: isLight ? "#9ca3af" : "#52525b", fontSize: 10 }}
                />
                <Tooltip contentStyle={tooltip} cursor={{ stroke: tc.accent, strokeWidth: 1, strokeOpacity: 0.3 }} />
                <Area
                  type="monotone" dataKey="v" stroke={tc.accent} strokeWidth={2}
                  fill="url(#aGrad)" dot={false} activeDot={{ r: 4, fill: tc.accent }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-baseline gap-2 mt-3">
            <span
              className={`font-light ${tc.heading}`}
              style={{ fontSize: "clamp(22px, 1.8vw, 30px)" }}
            >
              1428
            </span>
            <span
              className={tc.sub}
              style={{ fontSize: "clamp(11px, 0.8vw, 13px)" }}
            >
              Stable
            </span>
          </div>
        </div>

        {/* Recent Attack Sources */}
        <div className={`${tc.card} ${tc.cardHov} rounded-2xl transition-all`}
          style={{ padding: "clamp(16px, 1.4vw, 24px)" }}>
          <div className="flex items-center justify-between mb-2">
            <span
              className={`uppercase tracking-widest font-semibold ${tc.dimTxt}`}
              style={{ fontSize: "clamp(10px, 0.75vw, 12px)" }}
            >
              Recent Attack Sources
            </span>
            <span
              className={`${tc.accentTxt} cursor-pointer`}
              style={{ fontSize: "clamp(10px, 0.7vw, 12px)" }}
            >
              Last 17 ms →
            </span>
          </div>

          {/* World map */}
          <div
            className={`relative mt-2 rounded-xl overflow-hidden ${isLight ? "bg-purple-50/50" : "bg-white/[0.02]"}`}
            style={{ height: "clamp(100px, 9vw, 150px)" }}
          >
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
          <div className="mt-3 space-y-2">
            {attackData.slice(0, 3).map((a, i) => (
              <div key={i} className="flex items-center gap-3">
                <span
                  className={`font-mono ${tc.sub} w-32 truncate`}
                  style={{ fontSize: "clamp(10px, 0.75vw, 12px)" }}
                >
                  {a.ip}
                </span>
                <div
                  className="flex-1 h-1.5 rounded-full overflow-hidden"
                  style={{ background: `rgba(${tc.accentRgb},0.1)` }}
                >
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${(a.count / 90) * 100}%`, background: tc.accent }}
                  />
                </div>
                <span
                  className={tc.sub}
                  style={{ fontSize: "clamp(10px, 0.75vw, 12px)" }}
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
        <div
          className="flex items-center justify-between px-5 lg:px-6 py-4"
          style={{ borderBottom: `1px solid rgba(${tc.accentRgb},0.08)` }}
        >
          <h4
            className={`uppercase tracking-widest font-semibold flex items-center gap-1 ${tc.dimTxt}`}
            style={{ fontSize: "clamp(10px, 0.75vw, 12px)" }}
          >
            Recent Logs <ChevronRight className="inline w-3.5 h-3.5 opacity-60" />
          </h4>
          <button
            onClick={onViewLogs}
            className={`uppercase tracking-widest flex items-center gap-1 ${tc.accentTxt} hover:opacity-70 transition-opacity`}
            style={{ fontSize: "clamp(10px, 0.75vw, 12px)" }}
          >
            View All <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[580px]">
            <thead>
              <tr
                className={`uppercase tracking-[0.12em] ${tc.tblHead}`}
                style={{
                  fontSize: "clamp(10px, 0.72vw, 12px)",
                  borderBottom: `1px solid rgba(${tc.accentRgb},0.08)`,
                }}
              >
                {["Time", "IP", "IP", "Attack Type", "Integrity", "Status"].map((h) => (
                  <th key={h} className="px-5 lg:px-6 py-3.5 font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {logsData.slice(0, 4).map((r, i) => (
                <tr key={i} className={`transition-colors ${tc.tblRow}`}>
                  <td
                    className={`px-5 lg:px-6 py-3.5 font-mono ${tc.sub}`}
                    style={{ fontSize: "clamp(11px, 0.8vw, 13px)" }}
                  >
                    {r.time}
                  </td>
                  <td
                    className={`px-5 lg:px-6 py-3.5 font-mono ${tc.sub}`}
                    style={{ fontSize: "clamp(11px, 0.8vw, 13px)" }}
                  >
                    {r.ip1}
                  </td>
                  <td
                    className={`px-5 lg:px-6 py-3.5 font-mono ${tc.sub}`}
                    style={{ fontSize: "clamp(11px, 0.8vw, 13px)" }}
                  >
                    {r.ip2}
                  </td>
                  <td className="px-5 lg:px-6 py-3.5">
                    <span
                      className={`px-2.5 py-1 rounded-md font-medium ${tc.pillType}`}
                      style={{ fontSize: "clamp(10px, 0.72vw, 12px)" }}
                    >
                      {r.type}
                    </span>
                  </td>
                  <td
                    className={`px-5 lg:px-6 py-3.5 ${r.integrity === "Valid" ? "text-emerald-500" : "text-rose-400"}`}
                    style={{ fontSize: "clamp(11px, 0.8vw, 13px)" }}
                  >
                    {r.integrity}
                  </td>
                  <td className="px-5 lg:px-6 py-3.5">
                    <span
                      className={`px-2.5 py-1 rounded-md font-medium
                        ${r.statusType === "bad" ? tc.pillBad : r.statusType === "warn" ? tc.pillWarn : tc.pillGood}`}
                      style={{ fontSize: "clamp(10px, 0.72vw, 12px)" }}
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