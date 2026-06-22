"use client";

import {
  LayoutDashboard, ScrollText, ShieldAlert,
  BookOpen, Settings,
} from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { ThemeConfig } from "../lib/theme";

export type ViewId = "dashboard" | "logs" | "verify" | "reports" | "settings";

const navItems: { id: ViewId; label: string; icon: React.ElementType }[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "logs",      label: "Logs",      icon: ScrollText       },
  { id: "verify",    label: "Verify",    icon: ShieldAlert      },
  { id: "reports",   label: "Reports",   icon: BookOpen         },
  { id: "settings",  label: "Settings",  icon: Settings         },
];

type Props = {
  tc: ThemeConfig;
  view: ViewId;
  setView: (v: ViewId) => void;
  collapsed: boolean;
};

export default function Sidebar({ tc, view, setView, collapsed }: Props) {
  return (
    <aside
      className={`
        relative z-20 flex flex-col shrink-0 transition-all duration-300
        ${collapsed ? "w-[4.5rem]" : "w-[14rem]"}
        ${tc.sidebar}
      `}
    >
      {/* ── Logo row ── */}
      <div
        className={`flex items-center shrink-0 h-[4.5rem]
          ${collapsed ? "justify-center" : "gap-3 px-5"}`}
      >
        <div
          className="shrink-0 rounded-xl flex items-center justify-center font-black"
          style={{
            width:      "2.2rem",
            height:     "2.2rem",
            fontSize:   "0.85rem",
            background: `linear-gradient(135deg,${tc.accent},${tc.grad1})`,
            color:      "#fff",
          }}
        >
          C
        </div>
        {!collapsed && (
          <span
            className={`font-bold tracking-[0.16em] bg-gradient-to-r ${tc.logo} bg-clip-text text-transparent`}
            style={{ fontSize: "0.9rem" }}
          >
            CYLIS
          </span>
        )}
      </div>

      {/* ── Nav ── */}
      <nav className="flex-1 flex flex-col gap-1 px-2 mt-1 overflow-hidden">
        {navItems.map(({ id, label, icon: Icon }) => {
          const active = view === id;
          return (
            <button
              key={id}
              onClick={() => setView(id)}
              title={collapsed ? label : undefined}
              className={`
                flex items-center rounded-xl w-full text-left
                font-medium tracking-wide transition-all duration-150
                ${collapsed ? "justify-center py-3.5 px-0" : "gap-3.5 px-3.5 py-3"}
                ${active ? tc.navAct : tc.navIdle}
              `}
            >
              <Icon
                className="shrink-0"
                style={{
                  width:  "1.25rem",
                  height: "1.25rem",
                  ...(active ? { color: tc.navDot } : {}),
                }}
              />
              {!collapsed && (
                <span className="truncate" style={{ fontSize: "0.82rem" }}>
                  {label}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* ── Theme toggle ── */}
      <div
        className={`py-5 shrink-0
          ${collapsed ? "flex justify-center" : "px-4"}`}
      >
        <ThemeToggle tc={tc} />
      </div>
    </aside>
  );
}