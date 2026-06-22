"use client";

import {
  Bell, User, Search, MessageSquare, Menu, ChevronRight,
} from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { ThemeConfig } from "../lib/theme";
import { ViewId } from "./Sidebar";

const viewLabels: Record<ViewId, string> = {
  dashboard: "Dashboard",
  logs:      "Logs",
  verify:    "Verify",
  reports:   "Reports",
  settings:  "Settings",
};

type Props = {
  tc: ThemeConfig;
  view: ViewId;
  collapsed: boolean;
  onToggleCollapse: () => void;
};

export default function Topbar({ tc, view, collapsed, onToggleCollapse }: Props) {
  const breadLabel = viewLabels[view];

  return (
    <header
      className={`flex items-center justify-between shrink-0 px-6 ${tc.topbar}`}
      style={{ height: "4.5rem" }}
    >
      {/* Left */}
      <div className="flex items-center gap-4 min-w-0">
        <button
          onClick={onToggleCollapse}
          className={`${tc.sub} hover:opacity-100 transition-opacity shrink-0`}
          aria-label="Toggle sidebar"
        >
          <Menu style={{ width: "1.3rem", height: "1.3rem" }} />
        </button>

        <div className={`flex items-center gap-2 min-w-0 ${tc.sub}`}
          style={{ fontSize: "0.82rem" }}>
          <span className={`${tc.accentTxt} font-semibold shrink-0`}>
            Dashboard
          </span>
          {view !== "dashboard" && (
            <>
              <ChevronRight className="opacity-40 shrink-0" style={{ width: "0.85rem", height: "0.85rem" }} />
              <span className="opacity-60 truncate">{breadLabel}</span>
            </>
          )}
          {view === "verify" && (
            <>
              <ChevronRight className="opacity-40 shrink-0" style={{ width: "0.85rem", height: "0.85rem" }} />
              <span className="opacity-60 truncate">Logs</span>
            </>
          )}
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4 shrink-0">
        <ThemeToggle tc={tc} />

        <Search
          className={`${tc.sub} hover:opacity-100 cursor-pointer transition-opacity`}
          style={{ width: "1.2rem", height: "1.2rem" }}
        />

        <div className="relative cursor-pointer">
          <Bell
            className={`${tc.sub} hover:opacity-100 transition-opacity`}
            style={{ width: "1.2rem", height: "1.2rem" }}
          />
          <span
            className={`absolute -top-0.5 -right-0.5 rounded-full ${tc.bellDot}`}
            style={{ width: "0.5rem", height: "0.5rem" }}
          />
        </div>

        <MessageSquare
          className={`${tc.sub} hover:opacity-100 cursor-pointer transition-opacity`}
          style={{ width: "1.2rem", height: "1.2rem" }}
        />

        <div
          className={`rounded-full bg-gradient-to-b ${tc.userRing} border
            flex items-center justify-center cursor-pointer hover:scale-105 transition-all`}
          style={{ width: "2.4rem", height: "2.4rem" }}
        >
          <User style={{ width: "1.1rem", height: "1.1rem" }} />
        </div>
      </div>
    </header>
  );
}