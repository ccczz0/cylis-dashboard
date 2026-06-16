"use client";

import { useState } from "react";
import { useTheme } from "./ThemeContext";
import { T } from "./lib/theme";
import Sidebar, { ViewId } from "./components/Sidebar";
import Topbar from "./components/Topbar";
import DashboardPage  from "./dashboard/DashboardPage";
import LogsPage       from "./logs/LogsPage";
import VerifyPage     from "./verify/VerifyPage";
import ReportsPage    from "./reports/ReportsPage";
import SettingsPage   from "./settings/SettingsPage";

export default function CylisDashboard() {
  const { theme }                    = useTheme();
  const tc                           = T[theme];
  const isLight                      = theme === "light-purple";

  const [view, setView]              = useState<ViewId>("dashboard");
  const [collapsed, setCollapsed]    = useState(false);

  return (
    <div
      className={`
        flex h-screen w-screen overflow-hidden font-sans
        transition-colors duration-500 relative
        ${tc.shell}
      `}
    >
      {/* Ambient blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className={`absolute -top-32 -left-20 w-[50%] h-[55%] ${tc.blob1} blur-[180px] rounded-full`} />
        <div className={`absolute bottom-0 right-0 w-[40%] h-[50%] ${tc.blob2} blur-[180px] rounded-full`} />
      </div>

      {/* Sidebar */}
      <Sidebar
        tc={tc}
        view={view}
        setView={setView}
        collapsed={collapsed}
      />

      {/* Main panel */}
      <div className="flex-1 flex flex-col overflow-hidden relative z-10 min-w-0">
        <Topbar
          tc={tc}
          view={view}
          collapsed={collapsed}
          onToggleCollapse={() => setCollapsed((s) => !s)}
        />

        {/* Scrollable content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-5 space-y-5">
          {view === "dashboard" && (
            <DashboardPage tc={tc} isLight={isLight} onViewLogs={() => setView("logs")} />
          )}
          {view === "logs"      && <LogsPage      tc={tc} />}
          {view === "verify"    && <VerifyPage    tc={tc} />}
          {view === "reports"   && <ReportsPage   tc={tc} isLight={isLight} />}
          {view === "settings"  && <SettingsPage  tc={tc} />}
        </main>
      </div>
    </div>
  );
}