"use client";

import { Search, ChevronDown } from "lucide-react";
import { ThemeConfig } from "../lib/theme";
import { logsPerHour, attackData, logsData } from "../lib/data"; // where needed
type Props = {
  tc: ThemeConfig;
};

export default function LogsPage({ tc }: Props) {
  return (
    <div className="animate-in fade-in duration-400 space-y-4">
      <h2 className={`text-lg lg:text-xl font-semibold ${tc.heading}`}>Logs</h2>

      <div className={`${tc.card} rounded-2xl overflow-hidden`}>
        {/* Filter bar */}
        <div
          className="flex items-center gap-2 flex-wrap p-3 lg:p-4"
          style={{ borderBottom: `1px solid rgba(${tc.accentRgb},0.08)` }}
        >
          <div className="relative">
            <Search className={`absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 ${tc.muted}`} />
            <input
              placeholder="Filter IP / Log ID / Attack Type"
              className={`pl-7 pr-3 py-1.5 text-[11px] rounded-lg border ${tc.input} focus:outline-none transition-all w-48 lg:w-52`}
            />
          </div>

          {["Time", "Attack Type", "Waited", "Surprises"].map((f) => (
            <button
              key={f}
              className={`flex items-center gap-1 px-3 py-1.5 text-[10px] rounded-lg border font-medium transition-all ${tc.btnSec}`}
            >
              {f === "Attack Type" && (
                <span
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ background: tc.accent }}
                />
              )}
              {f}
              {(f === "Waited" || f === "Surprises") && (
                <span className="opacity-40">✕</span>
              )}
            </button>
          ))}
        </div>

        {/* Table — horizontally scrollable on small screens */}
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[560px]">
            <thead>
              <tr
                className={`text-[10px] uppercase tracking-[0.12em] ${tc.tblHead}`}
                style={{ borderBottom: `1px solid rgba(${tc.accentRgb},0.08)` }}
              >
                {["Time", "IP", "IP", "Attack Type", "Integrity", "Hash Status"].map((h) => (
                  <th key={h} className="px-4 lg:px-5 py-3 font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="text-xs">
              {[...logsData, ...logsData].map((r, i) => (
                <tr key={i} className={`transition-colors ${tc.tblRow}`}>
                  <td className={`px-4 lg:px-5 py-3 font-mono ${tc.sub}`}>{r.time}</td>
                  <td className="px-4 lg:px-5 py-3">
                    <span className="inline-flex items-center gap-1.5">
                      <span
                        className="w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ background: tc.accent }}
                      />
                      <span className={`font-mono ${tc.sub}`}>{r.ip1}</span>
                    </span>
                  </td>
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
                    <div className="flex items-center gap-1">
                      <span
                        className={`px-2 py-0.5 rounded-md text-[10px] font-medium
                          ${r.statusType === "bad" ? tc.pillBad : r.statusType === "warn" ? tc.pillWarn : tc.pillGood}`}
                      >
                        {r.status}
                      </span>
                      <ChevronDown className={`w-3 h-3 ${tc.muted}`} />
                    </div>
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