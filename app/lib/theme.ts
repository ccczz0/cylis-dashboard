import { Theme } from "../ThemeContext";

export const T: Record<Theme, ThemeConfig> = {
  "dark-gold": {
    accent: "#D4AF37", accentRgb: "212,175,55",
    grad1: "#F1D279", grad2: "#D4AF37",
    barOther: "#2a2a32",
    tooltipBg: "#0A0A0C", tooltipBorder: "rgba(212,175,55,0.3)",
    shell:    "bg-[#07070a] text-gray-200",
    sidebar:  "bg-[#0c0c10] border-r border-white/[0.06]",
    topbar:   "bg-[#0c0c10]/90 border-b border-white/[0.06]",
    card:     "bg-[#101014] border border-white/[0.07] backdrop-blur-sm",
    cardHov:  "hover:border-amber-500/25 hover:shadow-[0_6px_24px_-6px_rgba(212,175,55,0.1)]",
    cardGrad: "from-amber-500/[0.04] to-transparent",
    statCards: [
      "bg-gradient-to-br from-amber-500/30 via-amber-700/20 to-amber-900/10 border border-amber-500/30",
      "bg-gradient-to-br from-amber-600/25 via-yellow-700/15 to-transparent border border-amber-600/25",
      "bg-gradient-to-br from-yellow-500/20 via-amber-600/10 to-transparent border border-yellow-500/20",
      "bg-gradient-to-br from-amber-400/20 via-amber-500/10 to-transparent border border-amber-400/20",
    ],
    statVal: "text-white", statLbl: "text-amber-200/60", statDelta: "text-amber-300/70",
    heading: "text-white", sub: "text-gray-500", muted: "text-gray-600",
    accentTxt: "text-[#D4AF37]", dimTxt: "text-amber-200/40",
    logo:     "from-[#D4AF37] via-[#F1D279] to-[#D4AF37]",
    navAct:   "bg-amber-500/10 text-white border-r-[2px] border-[#D4AF37]",
    navIdle:  "text-gray-500 hover:text-gray-300 hover:bg-white/[0.03]",
    navDot:   "#D4AF37",
    tblHead:  "text-[#D4AF37]",
    tblRow:   "hover:bg-white/[0.025] border-b border-white/[0.04]",
    tblBorder: "border-b border-white/[0.04]",
    pillBad:  "bg-red-500/15 text-red-400",
    pillWarn: "bg-amber-500/15 text-amber-400",
    pillGood: "bg-emerald-500/15 text-emerald-400",
    pillType: "bg-amber-500/15 text-amber-300",
    input:    "bg-white/[0.04] border-white/10 text-gray-300 placeholder-gray-600 focus:border-amber-500/50 focus:shadow-[0_0_12px_rgba(212,175,55,0.08)]",
    uploadBox: "border-white/10 hover:border-amber-500/30",
    uploadAct: "border-amber-500/40 bg-amber-500/[0.03]",
    iconBox:  "bg-white/[0.04] group-hover:bg-amber-500/10",
    iconClr:  "text-gray-600 group-hover:text-amber-400",
    hashBox:  "bg-black/20 border-white/[0.05] text-gray-500",
    hashBoxAc: "bg-black/20 border-amber-500/10 text-amber-400/50",
    btnPri:   "bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold hover:from-amber-400 hover:to-amber-500",
    btnSec:   "bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 border border-amber-500/20",
    dot:      "bg-[#D4AF37] shadow-[0_0_6px_#D4AF37]",
    dotLine:  "from-amber-500/40 to-transparent",
    repCard:  [
      "bg-gradient-to-br from-amber-600/25 to-amber-800/10 border border-amber-500/30",
      "bg-gradient-to-br from-yellow-600/20 to-amber-700/10 border border-yellow-500/25",
      "bg-gradient-to-br from-amber-400/15 to-amber-600/10 border border-amber-400/20",
    ],
    blob1: "bg-amber-800/[0.07]", blob2: "bg-blue-900/[0.07]",
    ring: "ring-white/20",
    bellDot: "bg-amber-500 shadow-[0_0_5px_#D4AF37]",
    userRing: "from-gray-800 to-gray-900 border-gray-700 hover:border-amber-500/40",
  },
  "light-purple": {
    accent: "#8b5cf6", accentRgb: "139,92,246",
    grad1: "#a78bfa", grad2: "#8b5cf6",
    barOther: "#ddd6fe",
    tooltipBg: "#fff", tooltipBorder: "rgba(139,92,246,0.25)",
    shell:    "bg-gradient-to-br from-[#f0eeff] via-[#ebe4ff] to-[#f5f0ff] text-gray-700",
    sidebar:  "bg-white/75 border-r border-purple-100 backdrop-blur-xl",
    topbar:   "bg-white/60 border-b border-purple-100/80 backdrop-blur-xl",
    card:     "bg-white/80 border border-purple-100 backdrop-blur-sm",
    cardHov:  "hover:border-purple-300/70 hover:shadow-[0_6px_24px_-6px_rgba(139,92,246,0.12)]",
    cardGrad: "from-purple-100/40 to-transparent",
    statCards: [
      "bg-gradient-to-br from-[#c4b5fd] via-[#a78bfa] to-[#8b5cf6] border-0 shadow-lg",
      "bg-gradient-to-br from-[#a78bfa] via-[#818cf8] to-[#6366f1] border-0 shadow-lg",
      "bg-gradient-to-br from-[#818cf8] via-[#6366f1] to-[#4f46e5] border-0 shadow-lg",
      "bg-gradient-to-br from-[#f59e0b] via-[#d97706] to-[#b45309] border-0 shadow-lg",
    ],
    statVal: "text-white", statLbl: "text-white/70", statDelta: "text-white/60",
    heading: "text-gray-800", sub: "text-gray-400", muted: "text-gray-300",
    accentTxt: "text-purple-600", dimTxt: "text-purple-400/70",
    logo:     "from-[#8b5cf6] via-[#a78bfa] to-[#8b5cf6]",
    navAct:   "bg-purple-50 text-purple-700 border-r-[2px] border-purple-500 font-semibold",
    navIdle:  "text-gray-400 hover:text-purple-600 hover:bg-purple-50/60",
    navDot:   "#8b5cf6",
    tblHead:  "text-purple-500",
    tblRow:   "hover:bg-purple-50/40 border-b border-purple-100/60",
    tblBorder: "border-b border-purple-100/60",
    pillBad:  "bg-red-50 text-red-500 border border-red-100",
    pillWarn: "bg-orange-50 text-orange-500 border border-orange-100",
    pillGood: "bg-emerald-50 text-emerald-600 border border-emerald-100",
    pillType: "bg-purple-50 text-purple-600 border border-purple-100",
    input:    "bg-purple-50/50 border-purple-200 text-gray-700 placeholder-gray-400 focus:border-purple-400 focus:shadow-[0_0_12px_rgba(139,92,246,0.08)]",
    uploadBox: "border-purple-200 hover:border-purple-400",
    uploadAct: "border-purple-400 bg-purple-50/50",
    iconBox:  "bg-purple-50 group-hover:bg-purple-100",
    iconClr:  "text-purple-300 group-hover:text-purple-500",
    hashBox:  "bg-gray-50 border-gray-200 text-gray-500",
    hashBoxAc: "bg-purple-50 border-purple-200 text-purple-500/70",
    btnPri:   "bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold hover:from-purple-400 hover:to-purple-500 shadow-md shadow-purple-200",
    btnSec:   "bg-purple-50 text-purple-600 hover:bg-purple-100 border border-purple-200",
    dot:      "bg-purple-500 shadow-[0_0_6px_#8b5cf6]",
    dotLine:  "from-purple-400/40 to-transparent",
    repCard:  [
      "bg-gradient-to-br from-[#c4b5fd] to-[#8b5cf6] border-0 shadow-lg",
      "bg-gradient-to-br from-[#818cf8] to-[#4f46e5] border-0 shadow-lg",
      "bg-gradient-to-br from-[#06b6d4] to-[#0891b2] border-0 shadow-lg",
    ],
    blob1: "bg-purple-300/[0.12]", blob2: "bg-indigo-300/[0.10]",
    ring: "ring-purple-200",
    bellDot: "bg-purple-500 shadow-[0_0_5px_#8b5cf6]",
    userRing: "from-purple-100 to-purple-200 border-purple-200 hover:border-purple-400",
  },
  "dark-neon": {
    accent: "#a855f7", accentRgb: "168,85,247",
    grad1: "#d946ef", grad2: "#a855f7",
    barOther: "#1e0a45",
    tooltipBg: "#0f0228", tooltipBorder: "rgba(168,85,247,0.3)",
    shell:    "bg-[#08011a] text-purple-100",
    sidebar:  "bg-[#060010]/90 border-r border-purple-900/40 backdrop-blur-xl",
    topbar:   "bg-[#060010]/80 border-b border-purple-900/40 backdrop-blur-xl",
    card:     "bg-[#0c0225]/80 border border-purple-900/30 backdrop-blur-sm",
    cardHov:  "hover:border-purple-500/35 hover:shadow-[0_6px_24px_-6px_rgba(168,85,247,0.18)]",
    cardGrad: "from-purple-500/[0.07] to-transparent",
    statCards: [
      "bg-gradient-to-br from-purple-500/35 via-purple-700/20 to-purple-900/10 border border-purple-500/35",
      "bg-gradient-to-br from-fuchsia-500/30 via-purple-600/18 to-transparent border border-fuchsia-500/25",
      "bg-gradient-to-br from-violet-500/25 via-purple-600/14 to-transparent border border-violet-500/20",
      "bg-gradient-to-br from-indigo-500/20 via-purple-500/12 to-transparent border border-indigo-500/18",
    ],
    statVal: "text-white", statLbl: "text-purple-200/60", statDelta: "text-purple-300/70",
    heading: "text-white", sub: "text-purple-400/50", muted: "text-purple-600/50",
    accentTxt: "text-[#a855f7]", dimTxt: "text-purple-300/40",
    logo:     "from-[#a855f7] via-[#d946ef] to-[#a855f7]",
    navAct:   "bg-purple-500/12 text-white border-r-[2px] border-[#a855f7]",
    navIdle:  "text-purple-400/50 hover:text-purple-200 hover:bg-purple-500/[0.07]",
    navDot:   "#a855f7",
    tblHead:  "text-[#a855f7]",
    tblRow:   "hover:bg-purple-900/20 border-b border-purple-900/25",
    tblBorder: "border-b border-purple-900/25",
    pillBad:  "bg-red-500/15 text-red-400",
    pillWarn: "bg-purple-500/15 text-purple-300",
    pillGood: "bg-emerald-500/15 text-emerald-400",
    pillType: "bg-purple-500/15 text-purple-300",
    input:    "bg-purple-900/15 border-purple-800/40 text-purple-200 placeholder-purple-600 focus:border-purple-500/60 focus:shadow-[0_0_12px_rgba(168,85,247,0.1)]",
    uploadBox: "border-purple-700/30 hover:border-purple-500/50",
    uploadAct: "border-purple-500/50 bg-purple-900/20",
    iconBox:  "bg-purple-900/30 group-hover:bg-purple-800/30",
    iconClr:  "text-purple-500/50 group-hover:text-purple-400",
    hashBox:  "bg-black/20 border-purple-900/25 text-purple-500/50",
    hashBoxAc: "bg-purple-900/20 border-purple-500/15 text-purple-400/60",
    btnPri:   "bg-gradient-to-r from-purple-500 to-fuchsia-600 text-white font-semibold hover:from-purple-400 hover:to-fuchsia-500 shadow-lg shadow-purple-900/50",
    btnSec:   "bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 border border-purple-500/20",
    dot:      "bg-[#a855f7] shadow-[0_0_8px_#a855f7]",
    dotLine:  "from-purple-500/40 to-transparent",
    repCard:  [
      "bg-gradient-to-br from-purple-500/30 to-purple-800/15 border border-purple-500/30",
      "bg-gradient-to-br from-fuchsia-500/25 to-purple-700/12 border border-fuchsia-500/25",
      "bg-gradient-to-br from-cyan-500/20 to-indigo-700/12 border border-cyan-500/20",
    ],
    blob1: "bg-purple-700/[0.12]", blob2: "bg-indigo-900/[0.12]",
    ring: "ring-purple-400/25",
    bellDot: "bg-purple-500 shadow-[0_0_5px_#a855f7]",
    userRing: "from-purple-900 to-purple-950 border-purple-700/50 hover:border-purple-500",
  },
};

export type ThemeConfig = {
  accent: string; accentRgb: string;
  grad1: string; grad2: string;
  barOther: string;
  tooltipBg: string; tooltipBorder: string;
  shell: string; sidebar: string; topbar: string;
  card: string; cardHov: string; cardGrad: string;
  statCards: string[];
  statVal: string; statLbl: string; statDelta: string;
  heading: string; sub: string; muted: string;
  accentTxt: string; dimTxt: string;
  logo: string; navAct: string; navIdle: string; navDot: string;
  tblHead: string; tblRow: string; tblBorder: string;
  pillBad: string; pillWarn: string; pillGood: string; pillType: string;
  input: string; uploadBox: string; uploadAct: string;
  iconBox: string; iconClr: string;
  hashBox: string; hashBoxAc: string;
  btnPri: string; btnSec: string;
  dot: string; dotLine: string;
  repCard: string[];
  blob1: string; blob2: string;
  ring: string; bellDot: string; userRing: string;
};