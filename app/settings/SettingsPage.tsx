"use client";

import { ThemeConfig } from "../lib/theme";
import { logsPerHour, attackData, logsData } from "../lib/data"; // where needed

type Props = {
  tc: ThemeConfig;
};

export default function SettingsPage({ tc }: Props) {
  return (
    <div className="animate-in fade-in duration-400 space-y-4">
      <h2 className={`text-lg lg:text-xl font-semibold ${tc.heading}`}>Settings</h2>
      <div className={`${tc.card} rounded-2xl p-6 lg:p-8`}>
        <p className={`text-sm ${tc.sub}`}>Settings panel — coming soon.</p>
      </div>
    </div>
  );
}