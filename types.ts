/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  LayoutDashboard, 
  GraduationCap, 
  Briefcase, 
  Award, 
  User, 
  FolderGit,
  Clock,
  Menu,
  ChevronRight,
  Trophy,
  X
} from 'lucide-react';
import { personalData, certificates } from '../data';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  sidebarOpen?: boolean;
  setSidebarOpen?: (open: boolean) => void;
}

export default function Sidebar({ activeTab, setActiveTab, sidebarOpen, setSidebarOpen }: SidebarProps) {
  const menuItems = [
    { id: 'overview', name: 'Painel Geral', icon: LayoutDashboard },
    { id: 'academic', name: 'Vida Acadêmica', icon: GraduationCap },
    { id: 'experience', name: 'Experiência Profissional', icon: Briefcase },
    { id: 'certificates', name: 'Cursos & Habilidades', icon: Award },
    { id: 'dio-achievements', name: 'Conquistas DIO', icon: Trophy },
    { id: 'dashboards', name: 'Meus Dashboards', icon: FolderGit },
    { id: 'profile', name: 'Informações Pessoais', icon: User },
  ];

  const renderSidebarInner = (isMobile: boolean = false) => (
    <div className="w-68 bg-slate-900 text-slate-300 flex flex-col h-full border-r border-slate-800 overflow-y-auto select-none">
      {/* Brand Header & Compact Logo */}
      <div className="p-4.5 border-b border-slate-800/80 bg-slate-950/20 flex items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-9 h-9 rounded-lg bg-slate-950/40 border border-slate-800/70 p-1 flex items-center justify-center overflow-hidden shrink-0">
            <img 
              src="https://clipground.com/images/ns-logo-3.jpg" 
              alt="Logo" 
              className="w-full h-full object-contain filter invert brightness-[1.4] contrast-[1.8] mix-blend-screen"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="min-w-0">
            <h1 className="font-extrabold text-slate-100 tracking-tight leading-none text-sm font-sora">Dashboard</h1>
            <span className="text-[10px] text-blue-400 font-bold font-mono tracking-wide uppercase mt-0.5 block">Portfolio</span>
          </div>
        </div>

        {/* Mobile Close Button / Active Status for Desktop */}
        {isMobile && setSidebarOpen ? (
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg cursor-pointer transition-colors"
            title="Fechar menu"
          >
            <X className="w-4 h-4" />
          </button>
        ) : (
          <div className="flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full shrink-0 select-none">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[8px] text-emerald-400 font-black font-mono tracking-wider">LIVE</span>
          </div>
        )}
      </div>

      {/* Main Menu Links with updated spacing */}
      <nav className="flex-1 p-3.5 space-y-1">
        <div className="px-3 py-1.5 text-[9px] text-slate-500 font-extrabold uppercase tracking-widest font-mono">
          Navegação Principal
        </div>
        
        {menuItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                if (isMobile && setSidebarOpen) {
                  setSidebarOpen(false);
                }
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                isActive 
                  ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-600/20 border border-blue-500' 
                  : 'hover:bg-slate-800/40 text-slate-400 hover:text-slate-250 border border-transparent'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <IconComponent className={`w-4 h-4 shrink-0 transition-transform ${
                  isActive ? 'text-white' : 'text-slate-500 group-hover:text-slate-400'
                }`} />
                <span>{item.name}</span>
              </div>
              <ChevronRight className={`w-3.5 h-3.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity ${
                isActive ? 'text-white opacity-40' : 'text-slate-600'
              }`} />
            </button>
          );
        })}
      </nav>

      {/* Modern Compact Floating Meta / Last Activity (Replacing bulky blocks) */}
      {(() => {
        const parseDate = (dateStr: string) => {
          const parts = dateStr.split('/');
          if (parts.length !== 3) return 0;
          const [day, month, year] = parts.map(Number);
          return new Date(year, month - 1, day).getTime();
        };
        const latestCert = [...certificates].sort((a, b) => {
          const timeA = parseDate(a.conclusionDate);
          const timeB = parseDate(b.conclusionDate);
          if (timeB !== timeA) return timeB - timeA;
          return b.id.localeCompare(a.id);
        })[0];

        if (!latestCert) return null;

        return (
          <div className="mx-3.5 mb-2.5 p-3 rounded-xl border border-slate-800/40 bg-slate-950/20 text-[11px] shrink-0">
            <div className="flex items-center gap-2 text-slate-500 font-bold mb-1">
              <Clock className="w-3.5 h-3.5 text-blue-500" />
              <span className="uppercase tracking-wider text-[9px] font-mono">Último Certificado</span>
            </div>
            <p className="text-slate-300 font-semibold truncate" title={latestCert.name}>
              {latestCert.name}
            </p>
            <span className="text-[9px] text-slate-500 block font-mono mt-0.5">
              {latestCert.conclusionDate} • {latestCert.institution}
            </span>
          </div>
        );
      })()}

      {/* Clean User Session Panel at the absolute bottom */}
      <div className="p-4.5 border-t border-slate-800 bg-slate-950/40 flex items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <div className="relative shrink-0">
            <div className="w-9 h-9 rounded-full bg-slate-850 border border-slate-705 p-0.5 overflow-hidden flex items-center justify-center">
              {personalData.photoUrl ? (
                <img 
                  src={personalData.photoUrl} 
                  alt={personalData.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <div className="w-full h-full rounded-full bg-slate-850 flex items-center justify-center text-xs font-bold font-sans text-blue-450">
                  NS
                </div>
              )}
            </div>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-slate-900 rounded-full"></span>
          </div>
          <div className="min-w-0">
            <h2 className="text-xs font-bold text-slate-205 truncate font-sans">{personalData.name}</h2>
            <span className="text-[10px] text-slate-450 font-medium truncate block font-mono">28 anos • {personalData.location || "Salvador BA"}</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:flex w-68 h-screen sticky top-0 shrink-0 z-20">
        {renderSidebarInner(false)}
      </aside>

      {/* Mobile Drawer Sidebar */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Backdrop Overlay */}
          <div 
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity duration-300 cursor-pointer"
            onClick={() => setSidebarOpen?.(false)}
          />
          {/* Slider Panel */}
          <div className="relative z-50 h-full animate-in slide-in-from-left duration-250 ease-out shrink-0">
            {renderSidebarInner(true)}
          </div>
        </div>
      )}
    </>
  );
}
