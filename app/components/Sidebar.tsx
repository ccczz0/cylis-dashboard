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
        ${collapsed ? "w-[64px]" : "w-[200px] lg:w-[220px]"}
        ${tc.sidebar}
      `}
    >
      {/* Logo */}
      <div
        className={`
          flex items-center h-16 shrink-0
          ${collapsed ? "justify-center px-0" : "gap-3 px-4 lg:px-5"}
        `}
      >
        {/* Logo icon — fixed vw-based size so it scales with screen */}
        <div
          className="shrink-0 rounded-xl flex items-center justify-center font-black text-sm"
          style={{
            width:  "clamp(28px, 2.2vw, 36px)",
            height: "clamp(28px, 2.2vw, 36px)",
            background: `linear-gradient(135deg,${tc.accent},${tc.grad1})`,
            color: "#fff",
            fontSize: "clamp(11px, 0.9vw, 14px)",
          }}
        >
          C
        </div>
        {!collapsed && (
          <span
            className={`font-bold tracking-[0.16em] bg-gradient-to-r ${tc.logo} bg-clip-text text-transparent`}
            style={{ fontSize: "clamp(12px, 1vw, 15px)" }}
          >
            CYLIS
          </span>
        )}
      </div>

      {/* Nav items */}
      <nav className="flex-1 flex flex-col gap-1 px-2 mt-2 overflow-hidden">
        {navItems.map(({ id, label, icon: Icon }) => {
          const active = view === id;
          return (
            <button
              key={id}
              onClick={() => setView(id)}
              title={collapsed ? label : undefined}
              className={`
                flex items-center rounded-xl
                font-medium tracking-wide transition-all duration-150 w-full text-left
                ${collapsed ? "justify-center px-0 py-3" : "gap-3 px-3 py-2.5"}
                ${active ? tc.navAct : tc.navIdle}
              `}
            >
              {/* Icon — clamp keeps it proportional across screen sizes */}
              <Icon
                className="shrink-0"
                style={{
                  width:  "clamp(16px, 1.4vw, 20px)",
                  height: "clamp(16px, 1.4vw, 20px)",
                  ...(active ? { color: tc.navDot } : {}),
                }}
              />
              {!collapsed && (
                <span
                  className="truncate"
                  style={{ fontSize: "clamp(11px, 0.85vw, 13px)" }}
                >
                  {label}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom — theme toggle */}
      <div
        className={`
          py-4 shrink-0
          ${collapsed ? "flex justify-center px-0" : "px-3 lg:px-4"}
        `}
      >
        <ThemeToggle tc={tc} />
      </div>
    </aside>
  );
}