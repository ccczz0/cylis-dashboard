"use client";

import { useTheme, Theme } from "../ThemeContext";
import { ThemeConfig } from "../lib/theme";

const themeOpts: { id: Theme; dot: string; label: string }[] = [
  { id: "dark-gold",    dot: "bg-[#1a1a1a] border-[#D4AF37]", label: "Dark Gold" },
  { id: "light-purple", dot: "bg-white border-purple-400",     label: "Light"     },
  { id: "dark-neon",    dot: "bg-[#0d0520] border-[#a855f7]",  label: "Neon"      },
];

export default function ThemeToggle({ tc }: { tc: ThemeConfig }) {
  const { theme, setTheme } = useTheme();
  return (
    <div className="flex items-center gap-1.5">
      {themeOpts.map((t) => (
        <button
          key={t.id}
          onClick={() => setTheme(t.id)}
          title={t.label}
          className={`w-4 h-4 rounded-full border-2 transition-all ${t.dot}
            ${theme === t.id
              ? `scale-110 ring-2 ring-offset-1 ring-offset-transparent ${tc.ring}`
              : "opacity-40 hover:opacity-80"
            }`}
        />
      ))}
    </div>
  );
}