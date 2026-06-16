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
      className={`flex items-center justify-between px-5 lg:px-7 shrink-0 ${tc.topbar}`}
      style={{ height: "clamp(56px, 4.5vw, 72px)" }}
    >
      {/* Left — hamburger + breadcrumb */}
      <div className="flex items-center gap-4 min-w-0">
        <button
          onClick={onToggleCollapse}
          className={`${tc.sub} hover:opacity-100 transition-opacity shrink-0`}
          aria-label="Toggle sidebar"
        >
          <Menu style={{ width: "clamp(18px, 1.4vw, 22px)", height: "clamp(18px, 1.4vw, 22px)" }} />
        </button>

        <div className={`flex items-center gap-2 min-w-0 ${tc.sub}`}>
          <span
            className={`${tc.accentTxt} font-semibold shrink-0`}
            style={{ fontSize: "clamp(12px, 0.9vw, 15px)" }}
          >
            Dashboard
          </span>
          {view !== "dashboard" && (
            <>
              <ChevronRight
                className="opacity-40 shrink-0"
                style={{ width: "clamp(13px, 1vw, 16px)", height: "clamp(13px, 1vw, 16px)" }}
              />
              <span
                className="opacity-60 truncate"
                style={{ fontSize: "clamp(12px, 0.9vw, 15px)" }}
              >
                {breadLabel}
              </span>
            </>
          )}
          {view === "verify" && (
            <>
              <ChevronRight
                className="opacity-40 shrink-0"
                style={{ width: "clamp(13px, 1vw, 16px)", height: "clamp(13px, 1vw, 16px)" }}
              />
              <span
                className="opacity-60 truncate"
                style={{ fontSize: "clamp(12px, 0.9vw, 15px)" }}
              >
                Logs
              </span>
            </>
          )}
        </div>
      </div>

      {/* Right — actions */}
      <div className="flex items-center gap-4 shrink-0">
        <ThemeToggle tc={tc} />

        <Search
          className={`${tc.sub} hover:opacity-100 cursor-pointer transition-opacity`}
          style={{ width: "clamp(17px, 1.3vw, 21px)", height: "clamp(17px, 1.3vw, 21px)" }}
        />

        <div className="relative cursor-pointer">
          <Bell
            className={`${tc.sub} hover:opacity-100 transition-opacity`}
            style={{ width: "clamp(17px, 1.3vw, 21px)", height: "clamp(17px, 1.3vw, 21px)" }}
          />
          <span
            className={`absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full ${tc.bellDot}`}
          />
        </div>

        <MessageSquare
          className={`${tc.sub} hover:opacity-100 cursor-pointer transition-opacity`}
          style={{ width: "clamp(17px, 1.3vw, 21px)", height: "clamp(17px, 1.3vw, 21px)" }}
        />

        {/* Avatar */}
        <div
          className={`rounded-full bg-gradient-to-b ${tc.userRing} border flex items-center justify-center cursor-pointer hover:scale-105 transition-all`}
          style={{
            width:  "clamp(30px, 2.2vw, 38px)",
            height: "clamp(30px, 2.2vw, 38px)",
          }}
        >
          <User style={{ width: "clamp(14px, 1.1vw, 18px)", height: "clamp(14px, 1.1vw, 18px)" }} />
        </div>
      </div>
    </header>
  );
}