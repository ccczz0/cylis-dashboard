"use client";

import { ThemeConfig } from "../lib/theme";

type Props = { tc: ThemeConfig };

export default function SettingsPage({ tc }: Props) {
  return (
    <div className="animate-in fade-in duration-400 space-y-5">
      <h2 className={`font-bold tracking-tight ${tc.heading}`} style={{ fontSize: "1.5rem" }}>
        Settings
      </h2>
      <div className={`${tc.card} rounded-2xl`} style={{ padding: "2rem" }}>
        <p className={`font-semibold ${tc.sub}`} style={{ fontSize: "0.95rem" }}>
          Settings panel — coming soon.
        </p>
      </div>
    </div>
  );
}