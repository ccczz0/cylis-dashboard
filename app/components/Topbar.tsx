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
      className={`flex items-center justify-between px-4 lg:px-5 h-14 shrink-0 ${tc.topbar}`}
    >
      {/* Left — hamburger + breadcrumb */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onToggleCollapse}
          className={`${tc.sub} hover:opacity-100 transition-opacity shrink-0`}
          aria-label="Toggle sidebar"
        >
          <Menu className="w-4 h-4" />
        </button>

        <div className={`flex items-center gap-1.5 text-[11px] ${tc.sub} min-w-0`}>
          <span className={`${tc.accentTxt} font-medium shrink-0`}>Dashboard</span>
          {view !== "dashboard" && (
            <>
              <ChevronRight className="w-3 h-3 opacity-40 shrink-0" />
              <span className="opacity-60 truncate">{breadLabel}</span>
            </>
          )}
          {view === "verify" && (
            <>
              <ChevronRight className="w-3 h-3 opacity-40 shrink-0" />
              <span className="opacity-60 truncate">Logs</span>
            </>
          )}
        </div>
      </div>

      {/* Right — actions */}
      <div className="flex items-center gap-3 shrink-0">
        <ThemeToggle tc={tc} />
        <Search
          className={`w-4 h-4 ${tc.sub} hover:opacity-100 cursor-pointer transition-opacity`}
        />
        <div className="relative cursor-pointer">
          <Bell className={`w-4 h-4 ${tc.sub} hover:opacity-100 transition-opacity`} />
          <span className={`absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full ${tc.bellDot}`} />
        </div>
        <MessageSquare
          className={`w-4 h-4 ${tc.sub} hover:opacity-100 cursor-pointer transition-opacity`}
        />
        <div
          className={`w-7 h-7 rounded-full bg-gradient-to-b ${tc.userRing} border flex items-center justify-center cursor-pointer hover:scale-105 transition-all`}
        >
          <User className="w-3.5 h-3.5" />
        </div>
      </div>
    </header>
  );
}