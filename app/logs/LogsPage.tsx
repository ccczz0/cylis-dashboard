"use client";

import { Search, ChevronDown } from "lucide-react";
import { ThemeConfig } from "../lib/theme";
import { logsData } from "../lib/data";

type Props = { tc: ThemeConfig };

export default function LogsPage({ tc }: Props) {
  return (
    <div className="animate-in fade-in duration-400 space-y-5">

      <h2
        className={`font-bold tracking-tight ${tc.heading}`}
        style={{ fontSize: "1.5rem" }}
      >
        Logs
      </h2>

      <div className={`${tc.card} rounded-2xl overflow-hidden`}>

        {/* Filter bar */}
        <div
          className="flex items-center gap-2.5 flex-wrap p-4"
          style={{ borderBottom: `1px solid rgba(${tc.accentRgb},0.08)` }}
        >
          <div className="relative">
            <Search
              className={`absolute left-3 top-1/2 -translate-y-1/2 ${tc.muted}`}
              style={{ width: "0.9rem", height: "0.9rem" }}
            />
            <input
              placeholder="Filter IP / Log ID / Attack Type"
              className={`pl-8 pr-3 py-2 rounded-lg border ${tc.input} focus:outline-none transition-all`}
              style={{ fontSize: "0.82rem", fontWeight: 500, width: "16rem" }}
            />
          </div>

          {["Time", "Attack Type", "Waited", "Surprises"].map((f) => (
            <button
              key={f}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg border font-semibold transition-all ${tc.btnSec}`}
              style={{ fontSize: "0.78rem" }}
            >
              {f === "Attack Type" && (
                <span className="w-2 h-2 rounded-full shrink-0" style={{ background: tc.accent }} />
              )}
              {f}
              {(f === "Waited" || f === "Surprises") && (
                <span className="opacity-40 ml-0.5">✕</span>
              )}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left" style={{ minWidth: "40rem" }}>
            <thead>
              <tr
                className={`uppercase tracking-[0.12em] font-bold ${tc.tblHead}`}
                style={{
                  fontSize: "0.72rem",
                  borderBottom: `1px solid rgba(${tc.accentRgb},0.08)`,
                }}
              >
                {["Time", "Source IP", "Dest IP", "Attack Type", "Integrity", "Hash Status"].map((h) => (
                  <th key={h} style={{ padding: "0.85rem 1.4rem" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[...logsData, ...logsData].map((r, i) => (
                <tr key={i} className={`transition-colors ${tc.tblRow}`}>

                  <td className={`font-mono font-semibold ${tc.sub}`}
                    style={{ padding: "0.9rem 1.4rem", fontSize: "0.85rem" }}>
                    {r.time}
                  </td>

                  <td style={{ padding: "0.9rem 1.4rem" }}>
                    <span className="inline-flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full shrink-0" style={{ background: tc.accent }} />
                      <span className={`font-mono font-semibold ${tc.sub}`}
                        style={{ fontSize: "0.85rem" }}>{r.ip1}</span>
                    </span>
                  </td>

                  <td className={`font-mono font-semibold ${tc.sub}`}
                    style={{ padding: "0.9rem 1.4rem", fontSize: "0.85rem" }}>
                    {r.ip2}
                  </td>

                  <td style={{ padding: "0.9rem 1.4rem" }}>
                    <span className={`rounded-md font-bold ${tc.pillType}`}
                      style={{ padding: "0.28rem 0.75rem", fontSize: "0.78rem" }}>
                      {r.type}
                    </span>
                  </td>

                  <td className={`font-bold ${r.integrity === "Valid" ? "text-emerald-500" : "text-rose-400"}`}
                    style={{ padding: "0.9rem 1.4rem", fontSize: "0.85rem" }}>
                    {r.integrity}
                  </td>

                  <td style={{ padding: "0.9rem 1.4rem" }}>
                    <div className="flex items-center gap-2">
                      <span className={`rounded-md font-bold
                        ${r.statusType === "bad"  ? tc.pillBad
                        : r.statusType === "warn" ? tc.pillWarn
                        : tc.pillGood}`}
                        style={{ padding: "0.28rem 0.75rem", fontSize: "0.78rem" }}>
                        {r.status}
                      </span>
                      <ChevronDown className={tc.muted} style={{ width: "0.9rem", height: "0.9rem" }} />
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