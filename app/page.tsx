"use client";

import React, { useState, useRef } from "react";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis,
  Tooltip, ResponsiveContainer, Cell
} from "recharts";
import {
  Bell, User, ChevronRight, CheckCircle2, UploadCloud,
  ShieldCheck, FileText, Search, Loader2, MessageSquare,
  LayoutDashboard, ScrollText, ShieldAlert, BookOpen,
  Settings, Menu, RefreshCw, Download, Filter, ChevronDown
} from "lucide-react";
import { useTheme, Theme } from "./ThemeContext";

// ─── Data ─────────────────────────────────────────────────────────────────────
const logsPerHour = [
  {t:"10:20",v:55},{t:"2:19",v:80},{t:"3:30",v:75},{t:"54N",v:110},
  {t:"60:10",v:95},{t:"1:9",v:130},{t:"33:11",v:160},{t:"40m",v:148},
];
const attackData = [
  {ip:"182.168.1.20",count:90},{ip:"202.0.118.5",count:75},
  {ip:"198.51.100.7",count:58},{ip:"172.16.34.22",count:42},{ip:"10.0.0.15",count:28},
];
const logsData = [
  {time:"11:00 AM",ip1:"11:25:48",ip2:"192.188.1.15",type:"SQL Injection",integrity:"Tampered",status:"Malicious",statusType:"bad"},
  {time:"11:03 AM",ip1:"11:55:46",ip2:"208.111.36.3",type:"Catail",      integrity:"Valid",   status:"Malicious",statusType:"bad"},
  {time:"11:24 AM",ip1:"—",       ip2:"192.188.1.15",type:"SQL Injection",integrity:"Tampered",status:"Monitored",statusType:"warn"},
  {time:"11:07 AM",ip1:"—",       ip2:"203.107.186.99",type:"Brute Force",integrity:"Valid",  status:"Monitored",statusType:"warn"},
  {time:"11:03 AM",ip1:"—",       ip2:"Russia",        type:"Brute Force",integrity:"Valid",  status:"Monitored",statusType:"warn"},
  {time:"11:00 AM",ip1:"—",       ip2:"Russia",        type:"Brute Force",integrity:"Valid",  status:"Monitored",statusType:"warn"},
];

// ─── Theme ────────────────────────────────────────────────────────────────────
const T = {
  "dark-gold": {
    accent:"#D4AF37", accentRgb:"212,175,55",
    grad1:"#F1D279",  grad2:"#D4AF37",
    barOther:"#2a2a32",
    tooltipBg:"#0A0A0C", tooltipBorder:"rgba(212,175,55,0.3)",
    // layout
    shell:    "bg-[#07070a] text-gray-200",
    sidebar:  "bg-[#0c0c10] border-r border-white/[0.06]",
    topbar:   "bg-[#0c0c10]/90 border-b border-white/[0.06]",
    // cards
    card:     "bg-[#101014] border border-white/[0.07] backdrop-blur-sm",
    cardHov:  "hover:border-amber-500/25 hover:shadow-[0_6px_24px_-6px_rgba(212,175,55,0.1)]",
    cardGrad: "from-amber-500/[0.04] to-transparent",
    // stat card gradients
    statCards:[
      "bg-gradient-to-br from-amber-500/30 via-amber-700/20 to-amber-900/10 border border-amber-500/30",
      "bg-gradient-to-br from-amber-600/25 via-yellow-700/15 to-transparent border border-amber-600/25",
      "bg-gradient-to-br from-yellow-500/20 via-amber-600/10 to-transparent border border-yellow-500/20",
      "bg-gradient-to-br from-amber-400/20 via-amber-500/10 to-transparent border border-amber-400/20",
    ],
    statVal:  "text-white",
    statLbl:  "text-amber-200/60",
    statDelta:"text-amber-300/70",
    // text
    heading:  "text-white",
    sub:      "text-gray-500",
    muted:    "text-gray-600",
    accentTxt:"text-[#D4AF37]",
    dimTxt:   "text-amber-200/40",
    // nav
    logo:     "from-[#D4AF37] via-[#F1D279] to-[#D4AF37]",
    navAct:   "bg-amber-500/10 text-white border-r-[2px] border-[#D4AF37]",
    navIdle:  "text-gray-500 hover:text-gray-300 hover:bg-white/[0.03]",
    navDot:   "#D4AF37",
    // table
    tblHead:  "text-[#D4AF37]",
    tblRow:   "hover:bg-white/[0.025] border-b border-white/[0.04]",
    tblBorder:"border-b border-white/[0.04]",
    // pills
    pillBad:  "bg-red-500/15 text-red-400",
    pillWarn: "bg-amber-500/15 text-amber-400",
    pillGood: "bg-emerald-500/15 text-emerald-400",
    pillType: "bg-amber-500/15 text-amber-300",
    // input / upload
    input:    "bg-white/[0.04] border-white/10 text-gray-300 placeholder-gray-600 focus:border-amber-500/50 focus:shadow-[0_0_12px_rgba(212,175,55,0.08)]",
    uploadBox:"border-white/10 hover:border-amber-500/30",
    uploadAct:"border-amber-500/40 bg-amber-500/[0.03]",
    iconBox:  "bg-white/[0.04] group-hover:bg-amber-500/10",
    iconClr:  "text-gray-600 group-hover:text-amber-400",
    hashBox:  "bg-black/20 border-white/[0.05] text-gray-500",
    hashBoxAc:"bg-black/20 border-amber-500/10 text-amber-400/50",
    // buttons
    btnPri:   "bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold hover:from-amber-400 hover:to-amber-500",
    btnSec:   "bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 border border-amber-500/20",
    // timeline dot
    dot:      "bg-[#D4AF37] shadow-[0_0_6px_#D4AF37]",
    dotLine:  "from-amber-500/40 to-transparent",
    // report cards
    repCard:  ["bg-gradient-to-br from-amber-600/25 to-amber-800/10 border border-amber-500/30",
               "bg-gradient-to-br from-yellow-600/20 to-amber-700/10 border border-yellow-500/25",
               "bg-gradient-to-br from-amber-400/15 to-amber-600/10 border border-amber-400/20"],
    blob1:"bg-amber-800/[0.07]", blob2:"bg-blue-900/[0.07]",
    ring: "ring-white/20",
    bellDot:"bg-amber-500 shadow-[0_0_5px_#D4AF37]",
    userRing:"from-gray-800 to-gray-900 border-gray-700 hover:border-amber-500/40",
  },
  "light-purple": {
    accent:"#8b5cf6", accentRgb:"139,92,246",
    grad1:"#a78bfa",  grad2:"#8b5cf6",
    barOther:"#ddd6fe",
    tooltipBg:"#fff", tooltipBorder:"rgba(139,92,246,0.25)",
    shell:    "bg-gradient-to-br from-[#f0eeff] via-[#ebe4ff] to-[#f5f0ff] text-gray-700",
    sidebar:  "bg-white/75 border-r border-purple-100 backdrop-blur-xl",
    topbar:   "bg-white/60 border-b border-purple-100/80 backdrop-blur-xl",
    card:     "bg-white/80 border border-purple-100 backdrop-blur-sm",
    cardHov:  "hover:border-purple-300/70 hover:shadow-[0_6px_24px_-6px_rgba(139,92,246,0.12)]",
    cardGrad: "from-purple-100/40 to-transparent",
    statCards:[
      "bg-gradient-to-br from-[#c4b5fd] via-[#a78bfa] to-[#8b5cf6] border-0 shadow-lg",
      "bg-gradient-to-br from-[#a78bfa] via-[#818cf8] to-[#6366f1] border-0 shadow-lg",
      "bg-gradient-to-br from-[#818cf8] via-[#6366f1] to-[#4f46e5] border-0 shadow-lg",
      "bg-gradient-to-br from-[#f59e0b] via-[#d97706] to-[#b45309] border-0 shadow-lg",
    ],
    statVal:  "text-white",
    statLbl:  "text-white/70",
    statDelta:"text-white/60",
    heading:  "text-gray-800",
    sub:      "text-gray-400",
    muted:    "text-gray-300",
    accentTxt:"text-purple-600",
    dimTxt:   "text-purple-400/70",
    logo:     "from-[#8b5cf6] via-[#a78bfa] to-[#8b5cf6]",
    navAct:   "bg-purple-50 text-purple-700 border-r-[2px] border-purple-500 font-semibold",
    navIdle:  "text-gray-400 hover:text-purple-600 hover:bg-purple-50/60",
    navDot:   "#8b5cf6",
    tblHead:  "text-purple-500",
    tblRow:   "hover:bg-purple-50/40 border-b border-purple-100/60",
    tblBorder:"border-b border-purple-100/60",
    pillBad:  "bg-red-50 text-red-500 border border-red-100",
    pillWarn: "bg-orange-50 text-orange-500 border border-orange-100",
    pillGood: "bg-emerald-50 text-emerald-600 border border-emerald-100",
    pillType: "bg-purple-50 text-purple-600 border border-purple-100",
    input:    "bg-purple-50/50 border-purple-200 text-gray-700 placeholder-gray-400 focus:border-purple-400 focus:shadow-[0_0_12px_rgba(139,92,246,0.08)]",
    uploadBox:"border-purple-200 hover:border-purple-400",
    uploadAct:"border-purple-400 bg-purple-50/50",
    iconBox:  "bg-purple-50 group-hover:bg-purple-100",
    iconClr:  "text-purple-300 group-hover:text-purple-500",
    hashBox:  "bg-gray-50 border-gray-200 text-gray-500",
    hashBoxAc:"bg-purple-50 border-purple-200 text-purple-500/70",
    btnPri:   "bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold hover:from-purple-400 hover:to-purple-500 shadow-md shadow-purple-200",
    btnSec:   "bg-purple-50 text-purple-600 hover:bg-purple-100 border border-purple-200",
    dot:      "bg-purple-500 shadow-[0_0_6px_#8b5cf6]",
    dotLine:  "from-purple-400/40 to-transparent",
    repCard:  ["bg-gradient-to-br from-[#c4b5fd] to-[#8b5cf6] border-0 shadow-lg",
               "bg-gradient-to-br from-[#818cf8] to-[#4f46e5] border-0 shadow-lg",
               "bg-gradient-to-br from-[#06b6d4] to-[#0891b2] border-0 shadow-lg"],
    blob1:"bg-purple-300/[0.12]", blob2:"bg-indigo-300/[0.10]",
    ring: "ring-purple-200",
    bellDot:"bg-purple-500 shadow-[0_0_5px_#8b5cf6]",
    userRing:"from-purple-100 to-purple-200 border-purple-200 hover:border-purple-400",
  },
  "dark-neon": {
    accent:"#a855f7", accentRgb:"168,85,247",
    grad1:"#d946ef",  grad2:"#a855f7",
    barOther:"#1e0a45",
    tooltipBg:"#0f0228", tooltipBorder:"rgba(168,85,247,0.3)",
    shell:    "bg-[#08011a] text-purple-100",
    sidebar:  "bg-[#060010]/90 border-r border-purple-900/40 backdrop-blur-xl",
    topbar:   "bg-[#060010]/80 border-b border-purple-900/40 backdrop-blur-xl",
    card:     "bg-[#0c0225]/80 border border-purple-900/30 backdrop-blur-sm",
    cardHov:  "hover:border-purple-500/35 hover:shadow-[0_6px_24px_-6px_rgba(168,85,247,0.18)]",
    cardGrad: "from-purple-500/[0.07] to-transparent",
    statCards:[
      "bg-gradient-to-br from-purple-500/35 via-purple-700/20 to-purple-900/10 border border-purple-500/35",
      "bg-gradient-to-br from-fuchsia-500/30 via-purple-600/18 to-transparent border border-fuchsia-500/25",
      "bg-gradient-to-br from-violet-500/25 via-purple-600/14 to-transparent border border-violet-500/20",
      "bg-gradient-to-br from-indigo-500/20 via-purple-500/12 to-transparent border border-indigo-500/18",
    ],
    statVal:  "text-white",
    statLbl:  "text-purple-200/60",
    statDelta:"text-purple-300/70",
    heading:  "text-white",
    sub:      "text-purple-400/50",
    muted:    "text-purple-600/50",
    accentTxt:"text-[#a855f7]",
    dimTxt:   "text-purple-300/40",
    logo:     "from-[#a855f7] via-[#d946ef] to-[#a855f7]",
    navAct:   "bg-purple-500/12 text-white border-r-[2px] border-[#a855f7]",
    navIdle:  "text-purple-400/50 hover:text-purple-200 hover:bg-purple-500/[0.07]",
    navDot:   "#a855f7",
    tblHead:  "text-[#a855f7]",
    tblRow:   "hover:bg-purple-900/20 border-b border-purple-900/25",
    tblBorder:"border-b border-purple-900/25",
    pillBad:  "bg-red-500/15 text-red-400",
    pillWarn: "bg-purple-500/15 text-purple-300",
    pillGood: "bg-emerald-500/15 text-emerald-400",
    pillType: "bg-purple-500/15 text-purple-300",
    input:    "bg-purple-900/15 border-purple-800/40 text-purple-200 placeholder-purple-600 focus:border-purple-500/60 focus:shadow-[0_0_12px_rgba(168,85,247,0.1)]",
    uploadBox:"border-purple-700/30 hover:border-purple-500/50",
    uploadAct:"border-purple-500/50 bg-purple-900/20",
    iconBox:  "bg-purple-900/30 group-hover:bg-purple-800/30",
    iconClr:  "text-purple-500/50 group-hover:text-purple-400",
    hashBox:  "bg-black/20 border-purple-900/25 text-purple-500/50",
    hashBoxAc:"bg-purple-900/20 border-purple-500/15 text-purple-400/60",
    btnPri:   "bg-gradient-to-r from-purple-500 to-fuchsia-600 text-white font-semibold hover:from-purple-400 hover:to-fuchsia-500 shadow-lg shadow-purple-900/50",
    btnSec:   "bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 border border-purple-500/20",
    dot:      "bg-[#a855f7] shadow-[0_0_8px_#a855f7]",
    dotLine:  "from-purple-500/40 to-transparent",
    repCard:  ["bg-gradient-to-br from-purple-500/30 to-purple-800/15 border border-purple-500/30",
               "bg-gradient-to-br from-fuchsia-500/25 to-purple-700/12 border border-fuchsia-500/25",
               "bg-gradient-to-br from-cyan-500/20 to-indigo-700/12 border border-cyan-500/20"],
    blob1:"bg-purple-700/[0.12]", blob2:"bg-indigo-900/[0.12]",
    ring: "ring-purple-400/25",
    bellDot:"bg-purple-500 shadow-[0_0_5px_#a855f7]",
    userRing:"from-purple-900 to-purple-950 border-purple-700/50 hover:border-purple-500",
  },
};

const navItems = [
  {id:"dashboard",label:"Dashboard",icon:LayoutDashboard},
  {id:"logs",     label:"Logs",     icon:ScrollText},
  {id:"verify",   label:"Verify",   icon:ShieldAlert},
  {id:"reports",  label:"Reports",  icon:BookOpen},
  {id:"settings", label:"Settings", icon:Settings},
];

const themeOpts: {id:Theme;dot:string;label:string}[] = [
  {id:"dark-gold",    dot:"bg-[#1a1a1a] border-[#D4AF37]", label:"Dark Gold"},
  {id:"light-purple", dot:"bg-white border-purple-400",     label:"Light"},
  {id:"dark-neon",    dot:"bg-[#0d0520] border-[#a855f7]",  label:"Neon"},
];

// ─── Theme Toggle ─────────────────────────────────────────────────────────────
function ThemeToggle({tc}:{tc:any}) {
  const {theme,setTheme} = useTheme();
  return (
    <div className="flex items-center gap-1.5">
      {themeOpts.map(t=>(
        <button key={t.id} onClick={()=>setTheme(t.id)} title={t.label}
          className={`w-4 h-4 rounded-full border-2 transition-all ${t.dot}
            ${theme===t.id?`scale-110 ring-2 ring-offset-1 ring-offset-transparent ${tc.ring}`:"opacity-40 hover:opacity-80"}`} />
      ))}
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function CylisDashboard() {
  const {theme} = useTheme();
  const tc = T[theme];
  const isLight = theme==="light-purple";

  const [view,setView]         = useState<"dashboard"|"logs"|"verify"|"reports"|"settings">("dashboard");
  const [collapsed,setCollapse]= useState(false);
  const [fileName,setFileName] = useState<string|null>(null);
  const [uploading,setUploading]= useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const onFile = (e:React.ChangeEvent<HTMLInputElement>)=>{
    const f=e.target.files?.[0];
    if(f){setFileName(f.name);setUploading(true);setTimeout(()=>setUploading(false),1500);}
  };

  const tooltip = {
    backgroundColor:tc.tooltipBg,
    border:`1px solid ${tc.tooltipBorder}`,
    borderRadius:"10px",fontSize:"11px",
    color:isLight?"#374151":"#d1d5db",
    boxShadow:"0 4px 16px rgba(0,0,0,0.35)",
  };

  const breadLabel = navItems.find(n=>n.id===view)?.label??"Dashboard";

  return (
    <div className={`flex h-screen w-screen overflow-hidden ${tc.shell} font-sans transition-colors duration-500 relative`}>

      {/* Blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className={`absolute -top-32 -left-20 w-[50%] h-[55%] ${tc.blob1} blur-[180px] rounded-full`}/>
        <div className={`absolute bottom-0 right-0 w-[40%] h-[50%] ${tc.blob2} blur-[180px] rounded-full`}/>
      </div>

      {/* ══════════ SIDEBAR ══════════ */}
      <aside className={`relative z-20 flex flex-col shrink-0 transition-all duration-300
        ${collapsed?"w-[60px]":"w-[200px]"} ${tc.sidebar}`}>

        {/* Logo */}
        <div className="flex items-center gap-2.5 px-4 h-[56px] shrink-0">
          <div className="w-7 h-7 rounded-lg shrink-0 flex items-center justify-center text-[11px] font-black"
            style={{background:`linear-gradient(135deg,${tc.accent},${tc.grad1})`,color:"#fff"}}>C</div>
          {!collapsed && (
            <span className={`text-[13px] font-bold tracking-[0.16em] bg-gradient-to-r ${tc.logo} bg-clip-text text-transparent`}>
              CYLIS
            </span>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 flex flex-col gap-0.5 px-2 mt-1 overflow-hidden">
          {navItems.map(({id,label,icon:Icon})=>{
            const active=view===id;
            return (
              <button key={id} onClick={()=>setView(id as any)}
                className={`flex items-center gap-3 px-2.5 py-2 rounded-xl text-[12px] font-medium tracking-wide transition-all duration-150 w-full text-left
                  ${active?tc.navAct:tc.navIdle}`}>
                <Icon className="w-[15px] h-[15px] shrink-0" style={active?{color:tc.navDot}:{}}/>
                {!collapsed && <span className="truncate">{label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="px-2 py-4 shrink-0 space-y-1">
          {!collapsed && (
            <div className="flex items-center gap-1.5 px-2 pb-2">
              <ThemeToggle tc={tc}/>
            </div>
          )}
          <button className={`flex items-center gap-3 px-2.5 py-2 rounded-xl text-[12px] w-full ${tc.navIdle} transition-all`}>
            <Settings className="w-[15px] h-[15px] shrink-0"/>
            {!collapsed && <span>Settings</span>}
          </button>
        </div>
      </aside>

      {/* ══════════ RIGHT PANEL ══════════ */}
      <div className="flex-1 flex flex-col overflow-hidden relative z-10 min-w-0">

        {/* Top bar */}
        <header className={`flex items-center justify-between px-5 h-[56px] shrink-0 ${tc.topbar}`}>
          <div className="flex items-center gap-3 min-w-0">
            <button onClick={()=>setCollapse(s=>!s)} className={`${tc.sub} hover:opacity-100 transition-opacity shrink-0`}>
              <Menu className="w-4 h-4"/>
            </button>
            {/* Breadcrumb */}
            <div className={`flex items-center gap-1.5 text-[11px] ${tc.sub} min-w-0`}>
              <span className={`${tc.accentTxt} font-medium shrink-0`}>Dashboard</span>
              {view!=="dashboard"&&<>
                <ChevronRight className="w-3 h-3 opacity-40 shrink-0"/>
                <span className="opacity-60 truncate">{breadLabel}</span>
              </>}
              {view==="verify"&&<>
                <ChevronRight className="w-3 h-3 opacity-40 shrink-0"/>
                <span className="opacity-60 truncate">Logs</span>
              </>}
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <ThemeToggle tc={tc}/>
            <Search className={`w-4 h-4 ${tc.sub} hover:opacity-100 cursor-pointer transition-opacity`}/>
            <div className="relative cursor-pointer">
              <Bell className={`w-4 h-4 ${tc.sub} hover:opacity-100 transition-opacity`}/>
              <span className={`absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full ${tc.bellDot}`}/>
            </div>
            <MessageSquare className={`w-4 h-4 ${tc.sub} hover:opacity-100 cursor-pointer transition-opacity`}/>
            <div className={`w-7 h-7 rounded-full bg-gradient-to-b ${tc.userRing} border flex items-center justify-center cursor-pointer hover:scale-105 transition-all`}>
              <User className="w-3.5 h-3.5"/>
            </div>
          </div>
        </header>

        {/* Scrollable main */}
        <main className="flex-1 overflow-y-auto p-5 space-y-5">

          {/* ════ DASHBOARD ════ */}
          {view==="dashboard"&&(
            <div className="animate-in fade-in duration-400 space-y-5">

              {/* Welcome */}
              <div>
                <h1 className={`text-[22px] font-semibold tracking-tight ${tc.heading}`}>
                  Welcome to your cyber forensic control center.
                </h1>
                <p className={`text-[13px] mt-0.5 flex items-center gap-1.5 ${tc.sub}`}>
                  Monitor, analyze, and verify threat logs efficiently.
                  <span className={`${tc.accentTxt} cursor-pointer text-xs`}>🔗</span>
                </p>
              </div>

              {/* 4 Stat Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  {label:"Logs Today",  value:"12,450", delta:"+12%", sub:""},
                  {label:"Tampered Logs",value:"18",    delta:"",     sub:""},
                  {label:"Active IPs",  value:"23",     delta:"+5%",  sub:""},
                  {label:"",            value:"Medium", delta:"Stable",sub:""},
                ].map((s,i)=>(
                  <div key={i} className={`rounded-2xl p-5 relative overflow-hidden ${tc.statCards[i]}`}>
                    {/* Decorative blur sphere */}
                    <div className="absolute -bottom-4 -right-4 w-20 h-20 rounded-full blur-2xl opacity-30"
                      style={{background:`radial-gradient(circle,${tc.grad1},transparent)`}}/>
                    <p className={`text-[10px] uppercase tracking-widest mb-1 relative z-10 ${tc.statLbl}`}>
                      {s.label||"Stability"}
                    </p>
                    <h3 className={`text-3xl font-light tracking-tight relative z-10 ${tc.statVal}`}>{s.value}</h3>
                    {s.delta&&<span className={`text-[10px] relative z-10 block mt-0.5 ${tc.statDelta}`}>{s.delta}</span>}
                  </div>
                ))}
              </div>

              {/* Charts row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

                {/* Logs Per Hour — area chart */}
                <div className={`${tc.card} ${tc.cardHov} rounded-2xl p-5 transition-all`}>
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-[11px] uppercase tracking-widest font-semibold ${tc.dimTxt}`}>Logs Per Hour</span>
                    <div className="flex items-center gap-3">
                      <span className={`text-[10px] ${tc.muted}`}>Last 24 Hours</span>
                      <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-md ${tc.btnSec}`}>3 →</span>
                    </div>
                  </div>
                  <div className="h-[160px] mt-3">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={logsPerHour} margin={{left:-22,right:2,top:4,bottom:0}}>
                        <defs>
                          <linearGradient id="aGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%"   stopColor={tc.accent} stopOpacity={0.35}/>
                            <stop offset="100%" stopColor={tc.accent} stopOpacity={0.02}/>
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="t" axisLine={false} tickLine={false}
                          tick={{fill:isLight?"#9ca3af":"#52525b",fontSize:9}}/>
                        <YAxis axisLine={false} tickLine={false}
                          tick={{fill:isLight?"#9ca3af":"#52525b",fontSize:9}}/>
                        <Tooltip contentStyle={tooltip} cursor={{stroke:tc.accent,strokeWidth:1,strokeOpacity:0.3}}/>
                        <Area type="monotone" dataKey="v" stroke={tc.accent} strokeWidth={1.5}
                          fill="url(#aGrad)" dot={false} activeDot={{r:3,fill:tc.accent}}/>
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className={`text-2xl font-light ${tc.heading}`}>1428</span>
                    <span className={`text-[11px] ${tc.sub}`}>Stable</span>
                  </div>
                </div>

                {/* Recent Attack Sources — world map style placeholder + bar */}
                <div className={`${tc.card} ${tc.cardHov} rounded-2xl p-5 transition-all`}>
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-[11px] uppercase tracking-widest font-semibold ${tc.dimTxt}`}>Recent Attack Sources</span>
                    <span className={`text-[10px] ${tc.accentTxt} cursor-pointer`}>Last 17 ms →</span>
                  </div>
                  {/* World map dots — CSS-only illustration */}
                  <div className={`relative h-[120px] mt-2 rounded-xl overflow-hidden ${isLight?"bg-purple-50/50":"bg-white/[0.02]"}`}>
                    <svg viewBox="0 0 400 160" className="w-full h-full opacity-25" preserveAspectRatio="xMidYMid meet">
                      {/* simplified continent dots */}
                      {[
                        [60,60],[80,55],[100,60],[120,65],[140,60],[70,75],[90,80],[110,75],
                        [180,55],[200,50],[220,55],[240,60],[200,70],[220,65],
                        [160,90],[180,95],[200,90],[220,85],[240,90],[260,85],
                        [280,55],[300,60],[320,55],[340,60],[300,70],
                        [180,110],[200,115],[220,110],[200,125],
                        [310,95],[330,100],[320,110],
                      ].map(([x,y],i)=>(
                        <circle key={i} cx={x} cy={y} r="2.5" fill={tc.accent} opacity={0.6}/>
                      ))}
                      {/* attack lines */}
                      {[[60,60,220,55],[300,60,220,55],[180,55,220,55]].map(([x1,y1,x2,y2],i)=>(
                        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={tc.accent} strokeWidth="0.8" strokeDasharray="3,3" opacity={0.4}/>
                      ))}
                      <circle cx={220} cy={55} r="5" fill={tc.accent} opacity={0.8}/>
                      <circle cx={220} cy={55} r="9" fill="none" stroke={tc.accent} strokeWidth="1" opacity={0.4}/>
                    </svg>
                  </div>
                  {/* Top IPs mini list */}
                  <div className="mt-2 space-y-1">
                    {attackData.slice(0,3).map((a,i)=>(
                      <div key={i} className="flex items-center gap-2">
                        <span className={`text-[10px] font-mono ${tc.sub} w-28 truncate`}>{a.ip}</span>
                        <div className="flex-1 h-1 rounded-full overflow-hidden" style={{background:`rgba(${tc.accentRgb},0.1)`}}>
                          <div className="h-full rounded-full transition-all" style={{width:`${(a.count/90)*100}%`,background:tc.accent}}/>
                        </div>
                        <span className={`text-[10px] ${tc.sub}`}>{a.count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recent Logs table */}
              <div className={`${tc.card} ${tc.cardHov} rounded-2xl overflow-hidden transition-all`}>
                <div className="flex items-center justify-between px-5 py-3.5"
                  style={{borderBottom:`1px solid rgba(${tc.accentRgb},0.08)`}}>
                  <h4 className={`text-[11px] uppercase tracking-widest font-semibold ${tc.dimTxt}`}>
                    Recent Logs <ChevronRight className="inline w-3 h-3 opacity-60"/>
                  </h4>
                  <button onClick={()=>setView("logs")}
                    className={`text-[10px] uppercase tracking-widest flex items-center gap-1 ${tc.accentTxt} hover:opacity-70 transition-opacity`}>
                    View All <ChevronRight className="w-3 h-3"/>
                  </button>
                </div>
                <table className="w-full text-left">
                  <thead>
                    <tr className={`text-[10px] uppercase tracking-[0.12em] ${tc.tblHead}`}
                        style={{borderBottom:`1px solid rgba(${tc.accentRgb},0.08)`}}>
                      {["Time","IP","IP","Attack Type","Integrity","Status"].map(h=>(
                        <th key={h} className="px-5 py-3 font-semibold">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="text-[12px]">
                    {logsData.slice(0,4).map((r,i)=>(
                      <tr key={i} className={`transition-colors ${tc.tblRow}`}>
                        <td className={`px-5 py-3 font-mono ${tc.sub}`}>{r.time}</td>
                        <td className={`px-5 py-3 font-mono ${tc.sub}`}>{r.ip1}</td>
                        <td className={`px-5 py-3 font-mono ${tc.sub}`}>{r.ip2}</td>
                        <td className="px-5 py-3">
                          <span className={`px-2 py-0.5 rounded-md text-[10px] font-medium ${tc.pillType}`}>{r.type}</span>
                        </td>
                        <td className={`px-5 py-3 ${r.integrity==="Valid"?"text-emerald-500":"text-rose-400"}`}>{r.integrity}</td>
                        <td className="px-5 py-3">
                          <span className={`px-2 py-0.5 rounded-md text-[10px] font-medium
                            ${r.statusType==="bad"?tc.pillBad:r.statusType==="warn"?tc.pillWarn:tc.pillGood}`}>
                            {r.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ════ LOGS ════ */}
          {view==="logs"&&(
            <div className="animate-in fade-in duration-400 space-y-4">
              <h2 className={`text-xl font-semibold ${tc.heading}`}>Logs</h2>

              <div className={`${tc.card} rounded-2xl overflow-hidden`}>
                {/* Filter bar */}
                <div className="flex items-center gap-2 flex-wrap p-4"
                  style={{borderBottom:`1px solid rgba(${tc.accentRgb},0.08)`}}>
                  <div className="relative">
                    <Search className={`absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 ${tc.muted}`}/>
                    <input placeholder="Filter IP / Logs ID / Attacks Type"
                      className={`pl-7 pr-3 py-1.5 text-[11px] rounded-lg border ${tc.input} focus:outline-none transition-all w-52`}/>
                  </div>
                  {["Time","Attack Type","Waited","Surprises"].map(f=>(
                    <button key={f}
                      className={`flex items-center gap-1 px-3 py-1.5 text-[10px] rounded-lg border font-medium transition-all ${tc.btnSec}`}>
                      {f==="Attack Type"&&<span className="w-1.5 h-1.5 rounded-full shrink-0" style={{background:tc.accent}}/>}
                      {f} {(f==="Waited"||f==="Surprises")&&<span className="opacity-40">✕</span>}
                    </button>
                  ))}
                </div>

                <table className="w-full text-left">
                  <thead>
                    <tr className={`text-[10px] uppercase tracking-[0.12em] ${tc.tblHead}`}
                        style={{borderBottom:`1px solid rgba(${tc.accentRgb},0.08)`}}>
                      {["Time","IP","IP","Attack Type","Integrity","Hash Status"].map(h=>(
                        <th key={h} className="px-5 py-3 font-semibold">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="text-[12px]">
                    {[...logsData,...logsData].map((r,i)=>(
                      <tr key={i} className={`transition-colors ${tc.tblRow}`}>
                        <td className={`px-5 py-3.5 font-mono ${tc.sub}`}>{r.time}</td>
                        <td className="px-5 py-3.5">
                          <span className="inline-flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{background:tc.accent}}/>
                            <span className={`font-mono ${tc.sub}`}>{r.ip1}</span>
                          </span>
                        </td>
                        <td className={`px-5 py-3.5 font-mono ${tc.sub}`}>{r.ip2}</td>
                        <td className="px-5 py-3.5">
                          <span className={`px-2 py-0.5 rounded-md text-[10px] font-medium ${tc.pillType}`}>{r.type}</span>
                        </td>
                        <td className={`px-5 py-3.5 ${r.integrity==="Valid"?"text-emerald-500":"text-rose-400"}`}>{r.integrity}</td>
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-1">
                            <span className={`px-2 py-0.5 rounded-md text-[10px] font-medium
                              ${r.statusType==="bad"?tc.pillBad:r.statusType==="warn"?tc.pillWarn:tc.pillGood}`}>
                              {r.status}
                            </span>
                            <ChevronDown className={`w-3 h-3 ${tc.muted}`}/>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ════ VERIFY ════ */}
          {view==="verify"&&(
            <div className="animate-in fade-in duration-400 space-y-4 max-w-3xl">
              <h2 className={`text-xl font-semibold ${tc.heading}`}>Verify Log Integrity</h2>

              {/* Upload box */}
              <div onClick={()=>fileRef.current?.click()}
                className={`${tc.card} border-2 border-dashed rounded-2xl p-14 flex flex-col items-center justify-center cursor-pointer group transition-all
                  ${fileName?tc.uploadAct:tc.uploadBox}`}>
                <input type="file" ref={fileRef} className="hidden" onChange={onFile}/>
                {uploading?(
                  <div className="flex flex-col items-center gap-3">
                    <div className="relative">
                      <div className="absolute inset-0 rounded-full blur-md animate-ping" style={{background:`rgba(${tc.accentRgb},0.2)`}}/>
                      <Loader2 className="w-9 h-9 animate-spin relative" style={{color:tc.accent}}/>
                    </div>
                    <p className="text-sm animate-pulse uppercase tracking-widest" style={{color:tc.accent}}>Analyzing…</p>
                  </div>
                ):fileName?(
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center">
                      <FileText className="w-6 h-6 text-emerald-500"/>
                    </div>
                    <p className={`text-base font-medium ${tc.heading}`}>{fileName}</p>
                    <p className={`text-[10px] uppercase tracking-widest ${tc.muted}`}>Click to change</p>
                  </div>
                ):(
                  <div className="flex flex-col items-center gap-3 group-hover:scale-105 transition-transform">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${tc.iconBox}`}>
                      <UploadCloud className={`w-6 h-6 transition-colors ${tc.iconClr}`}/>
                    </div>
                    <div className="text-center">
                      <p className={`text-sm ${tc.sub}`}>Upload Log File or Enter Log ID</p>
                      <button className={`mt-3 px-8 py-2 rounded-xl text-[12px] transition-all ${tc.btnPri}`}>
                        Verify Log
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Scanning / results */}
              <div className={`${tc.card} rounded-2xl p-6 space-y-5 relative overflow-hidden`}>
                <div className="absolute top-3 right-3 opacity-[0.04]">
                  <ShieldCheck className="w-20 h-20" style={{color:tc.accent}}/>
                </div>

                {/* Scanning bar */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className={`text-sm font-medium ${tc.heading}`}>Scanning…</p>
                    <span className={`text-[10px] ${tc.sub}`}>Game: Save ↓</span>
                  </div>
                  <div className="h-1 rounded-full overflow-hidden" style={{background:`rgba(${tc.accentRgb},0.1)`}}>
                    <div className="h-full rounded-full w-[65%]" style={{background:`linear-gradient(90deg,transparent,${tc.accent},${tc.grad1})`}}/>
                  </div>
                </div>

                {/* Hash rows */}
                <div className="space-y-3">
                  {[
                    {label:"Local Hash", val:"9934438877992948322662826599839923593...", ok:true},
                    {label:"Chain Hash", val:"9933438873266369659236726578830956386...", ok:true},
                  ].map((h,i)=>(
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5"/>
                      <div className="min-w-0">
                        <span className={`text-[10px] uppercase tracking-widest font-bold mr-3 ${tc.dimTxt}`}>{h.label}</span>
                        <span className={`font-mono text-[11px] break-all ${tc.sub}`}>{h.val}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Hash comparison boxes */}
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="space-y-2">
                    <p className={`text-[10px] uppercase tracking-widest font-bold ${tc.muted}`}>Local File Hash</p>
                    <div className={`font-mono text-[10px] border p-3 rounded-xl break-all leading-relaxed ${tc.hashBox}`}>
                      {fileName?"5f2a8c9d1e2f3a4b5c6d7e8f9a0b1c2d...":"Waiting for file..."}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className={`text-[10px] uppercase tracking-widest font-bold ${tc.muted}`}>Chain Hash</p>
                    <div className={`font-mono text-[10px] border p-3 rounded-xl break-all leading-relaxed ${tc.hashBoxAc}`}>
                      {fileName?"5f2a8c9d1e2f3a4b5c6d7e8f9a0b1c2d...":"Waiting for file..."}
                    </div>
                  </div>
                </div>

                {fileName&&!uploading&&(
                  <div className="flex items-center gap-2 text-emerald-500 animate-in fade-in duration-400 pt-2">
                    <CheckCircle2 className="w-4 h-4"/>
                    <span className="text-sm font-semibold">Verified — Log is intact</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ════ REPORTS ════ */}
          {view==="reports"&&(
            <div className="animate-in fade-in duration-400 space-y-5">
              <h2 className={`text-xl font-semibold ${tc.heading}`}>Digital Forensics Report</h2>

              {/* 3 summary cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  {icon:"⚠️", num:"18", label:"Logs\nTampered",    sub:"Detected & logged tampered packets"},
                  {icon:"🛡️", num:"23", label:"Malicious\nIPs",    sub:"Recent these again control packets"},
                  {icon:"🔗", num:"",   label:"Blockchain\nVerified",sub:"Secured via iterfs the strapped protocol"},
                ].map((c,i)=>(
                  <div key={i} className={`${tc.repCard[i]} rounded-2xl p-5 relative overflow-hidden`}>
                    <div className="absolute -bottom-4 -right-4 w-16 h-16 rounded-full blur-xl opacity-30"
                      style={{background:`radial-gradient(circle,${tc.grad1},transparent)`}}/>
                    <div className="flex items-start gap-3 relative z-10">
                      <div className="text-2xl mt-0.5">{c.icon}</div>
                      <div>
                        {c.num&&<p className="text-2xl font-light text-white">{c.num}</p>}
                        <p className="text-[12px] font-semibold text-white/90 leading-tight whitespace-pre-line">{c.label}</p>
                        <p className="text-[10px] mt-1 text-white/55 leading-relaxed">{c.sub}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {/* Timeline */}
                <div className={`${tc.card} ${tc.cardHov} rounded-2xl p-5 transition-all`}>
                  <h4 className={`text-[11px] uppercase tracking-widest font-semibold mb-4 flex items-center gap-1 ${tc.dimTxt}`}>
                    Timeline &amp; Evidence <ChevronRight className="w-3 h-3"/>
                  </h4>
                  <div className="space-y-4">
                    {[
                      {time:"11:24 AM",icon:"↓",label:"SQL Injection",ip:"192.168.1.15"},
                      {time:"11:21 AM",icon:"↑",label:"DDOS Traffic DOS errored data bits...",ip:""},
                      {time:"11:40 AM",icon:"◆",label:"Block #322983 anchored",ip:""},
                    ].map((item,i)=>(
                      <div key={i} className="relative pl-8 group">
                        {i<2&&<div className="absolute left-[11px] top-5 bottom-[-16px] w-px"
                          style={{background:`linear-gradient(to bottom,${tc.accent}50,transparent)`}}/>}
                        <div className={`absolute left-0 top-0.5 w-[22px] h-[22px] rounded-full flex items-center justify-center text-[9px] font-bold transition-all ${tc.dot}`}
                          style={{background:`linear-gradient(135deg,${tc.accent},${tc.grad2})`,color:"#fff"}}>
                          {item.icon}
                        </div>
                        <div>
                          <p className={`text-[10px] font-mono ${tc.accentTxt}`}>{item.time}</p>
                          <p className={`text-[12px] ${tc.sub} mt-0.5`}>{item.label}
                            {item.ip&&<span className={`font-mono ml-1 ${tc.accentTxt}`}>{item.ip}</span>}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Users & Export */}
                <div className={`${tc.card} ${tc.cardHov} rounded-2xl p-5 transition-all`}>
                  <h4 className={`text-[11px] uppercase tracking-widest font-semibold mb-4 ${tc.dimTxt}`}>Users &amp; Export</h4>
                  <div className="space-y-2.5 text-[12px]">
                    {[
                      {role:"Adam R.",           title:"Admin Investigator"},
                      {role:"dan hyp cappary ciert",title:"Mentor knowledge"},
                      {role:"loam fit. uport urre",  title:"sorority theacts"},
                    ].map((u,i)=>(
                      <div key={i} className="flex justify-between items-center py-2"
                        style={{borderBottom:`1px solid rgba(${tc.accentRgb},0.07)`}}>
                        <span className={`font-medium ${isLight?"text-gray-700":"text-gray-300"}`}>{u.role}</span>
                        <span className={`text-[11px] ${tc.accentTxt} flex items-center gap-1`}>
                          {u.title} <ChevronRight className="w-3 h-3"/>
                        </span>
                      </div>
                    ))}
                  </div>
                  <button className={`mt-5 w-full py-2.5 rounded-xl text-[12px] font-semibold flex items-center justify-center gap-2 transition-all ${tc.btnPri}`}>
                    <Download className="w-3.5 h-3.5"/>
                    Export PDF
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ════ SETTINGS ════ */}
          {view==="settings"&&(
            <div className="animate-in fade-in duration-400 space-y-4">
              <h2 className={`text-xl font-semibold ${tc.heading}`}>Settings</h2>
              <div className={`${tc.card} rounded-2xl p-8`}>
                <p className={`text-sm ${tc.sub}`}>Settings panel — coming soon.</p>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}