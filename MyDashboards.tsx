/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  Award, 
  GraduationCap, 
  Briefcase, 
  TrendingUp, 
  CheckCircle, 
  Clock, 
  Users, 
  Star,
  ChevronRight,
  ArrowUpRight,
  HelpCircle,
  FileText,
  Percent,
  Compass,
  ArrowUp,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Layers,
  Sparkles,
  MapPin,
  BookOpen
} from 'lucide-react';
import { personalData, academicCourses, certificates, experiences, skills } from '../data';

interface DashboardOverviewProps {
  setActiveTab: (tab: string) => void;
}

export default function DashboardOverview({ setActiveTab }: DashboardOverviewProps) {
  // Calculations
  const totalCertificatesCount = certificates.length;
  const totalCertHours = certificates.reduce((sum, cert) => sum + cert.durationHours, 0);
  
  // Total professional experience months
  const totalExpMonths = experiences.reduce((sum, exp) => sum + exp.durationMonths, 0);
  const expYears = Math.floor(totalExpMonths / 12);
  const expRemainingMonths = totalExpMonths % 12;
  const expString = `${expYears} ano${expYears > 1 ? 's' : ''} e ${expRemainingMonths} me${expRemainingMonths > 1 ? 'ses' : 's'}`;

  // Average grades across completed classes
  const completedSubjects = academicCourses.flatMap(course => 
    course.etapas.flatMap(etapa => 
      etapa.subjects.filter(sub => sub.status === 'Aprovado' && sub.media !== undefined)
    )
  );
  
  const averageGrade = completedSubjects.length > 0 
    ? (completedSubjects.reduce((sum, sub) => sum + (sub.media || 0), 0) / completedSubjects.length).toFixed(1)
    : '9.3';

  // Helper to parse 'DD/MM/YYYY' format to timestamp for accurate sorting
  const parseDate = (dateStr: string) => {
    const parts = dateStr.split('/');
    if (parts.length !== 3) return 0;
    const [day, month, year] = parts.map(Number);
    return new Date(year, month - 1, day).getTime();
  };

  // Sort certificates to get the most recent ones first
  const sortedCertificatesList = [...certificates].sort((a, b) => {
    const dateA = parseDate(a.conclusionDate);
    const dateB = parseDate(b.conclusionDate);
    return dateB - dateA || b.year - a.year; // fallback to year
  });
  const recentCertificatesList = sortedCertificatesList.slice(0, 3);

  // Stats for University progress
  const gfinCourse = academicCourses.find(c => c.id === 'gfin')!;
  const admCourse = academicCourses.find(c => c.id === 'adm')!;

  const countSubjectsByStatus = (course: typeof gfinCourse) => {
    let approved = 0, current = 0, toTake = 0;
    course.etapas.forEach(e => {
      e.subjects.forEach(s => {
        if (s.status === 'Aprovado') approved++;
        else if (s.status === 'em Curso') current++;
        else toTake++;
      });
    });
    const total = approved + current + toTake;
    return { approved, current, toTake, total };
  };

  const gfinStats = countSubjectsByStatus(gfinCourse);
  const admStats = countSubjectsByStatus(admCourse);

  const gfinPercent = Math.round((gfinStats.approved / gfinStats.total) * 100);
  const admPercent = Math.round((admStats.approved / admStats.total) * 100);

  return (
    <div className="grain-bg p-4 sm:p-6 lg:p-8 space-y-6 bg-slate-50/50 min-h-full font-sans select-none animate-in fade-in duration-300">
      
      {/* Sub-Header Banner indicating active status */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-200 pb-4 gap-4">
        <div>
          <span className="text-[10px] text-indigo-600 font-extrabold font-mono uppercase tracking-widest block font-sans">PORTFÓLIO ESTRATÉGICO</span>
          <h2 className="text-xl font-bold tracking-tight text-slate-800 font-sans mt-0.5">Visão Geral do Desenvolvimento</h2>
        </div>
      </div>

      {/* Main Grid modeled after the attached mock layout */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Left Column Area: Welcome Card, 2x2 Stats, Purple Block, and Horizontal Progress bars */}
        <div className="xl:col-span-2 space-y-6">
          
          {/* Top Row: Welcome Card + 2x2 grid side by-side */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
            
            {/* Elegant Welcome Card (mimicking Jesus Bañuelos card style) */}
            <div className="lg:col-span-3 bg-gradient-to-br from-slate-50/70 via-white to-blue-50/20 border border-slate-200/50 rounded-[20px] p-6 sm:p-7 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group border-t-[3px] border-t-indigo-600 shadow-[inset_0_1px_2px_rgba(255,255,255,1),0_4px_24px_-4px_rgba(0,0,0,0.04)]">
              <div className="absolute right-0 top-0 w-32 h-32 bg-gradient-to-bl from-indigo-100/10 to-transparent rounded-bl-full select-none pointer-events-none" />
              
              <div>
                {/* Profile Circle and Status */}
                <div className="flex items-center gap-4">
                  <div className="relative shrink-0 w-16 h-16 sm:w-18 sm:h-18">
                    <div className="w-full h-full p-[3px] rounded-full bg-gradient-to-tr from-indigo-500 via-blue-500 to-emerald-400 shadow-md">
                      {personalData.photoUrl ? (
                        <img 
                          src={personalData.photoUrl} 
                          alt={personalData.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full rounded-full object-cover bg-white"
                        />
                      ) : (
                        <div className="w-full h-full rounded-full bg-gradient-to-tr from-indigo-500 to-indigo-600 flex items-center justify-center text-white text-base font-black uppercase font-sans shrink-0">
                          NS
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest font-mono block">Boas-vindas!</span>
                    <h3 className="text-xl font-bold font-sora text-slate-800 tracking-tight mt-0.5">Nícolas Sinclair</h3>
                  </div>
                </div>

                <div className="mt-6 space-y-3.5 text-slate-600 text-xs font-semibold">
                  <div className="flex items-center gap-3">
                    <div className="w-7.5 h-7.5 rounded-lg bg-orange-50/80 border border-orange-100 flex items-center justify-center text-orange-600 shrink-0 shadow-xs">
                      <GraduationCap className="w-4 h-4" />
                    </div>
                    <span className="leading-snug">
                      Graduando em <strong className="text-slate-800 font-bold">Administração</strong> e <strong className="text-slate-800 font-bold">Gestão Financeira</strong> (UNIFATECIE)
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-7.5 h-7.5 rounded-lg bg-rose-50/80 border border-rose-100 flex items-center justify-center text-rose-500 shrink-0 shadow-xs">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <span className="leading-snug">Salvador-BA, Brasil</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-7.5 h-7.5 rounded-lg bg-indigo-50/80 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0 shadow-xs">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <span className="leading-snug">
                      Área de foco: <strong className="text-indigo-600 font-bold uppercase tracking-wider text-[10.5px] font-mono">Gestão • Finanças • Tecnologia</strong>
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-3 pt-3 mt-3 border-t border-slate-100/80">
                    <div className="w-7.5 h-7.5 rounded-lg bg-slate-50 border border-slate-200/60 flex items-center justify-center text-slate-500 shrink-0 shadow-xs">
                      <Briefcase className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">
                      Perfil de Alto Rendimento Operacional
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom twin metrics columns with clear chip layout */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4 border-t border-slate-200/60 pt-5 mt-6 select-none animate-in slide-in-from-bottom-2 duration-300">
                <div className="bg-white/80 border border-slate-200/60 p-2.5 sm:p-3 rounded-xl flex items-center gap-2 sm:gap-3 hover:bg-white hover:border-indigo-200 transition-all duration-300 shadow-sm shadow-slate-100/30 min-w-0">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0 animate-pulse">
                    <Award className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-indigo-500" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-sora text-[11px] xs:text-xs sm:text-sm md:text-base lg:text-lg font-bold text-indigo-600 tracking-tight leading-none whitespace-nowrap">
                      {totalCertificatesCount} Cursos
                    </div>
                    <div className="text-[8px] sm:text-[9px] text-slate-400 font-extrabold uppercase tracking-wider mt-1 sm:mt-1.5 leading-tight">
                      Qualificações Ativas
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/80 border border-slate-200/60 p-2.5 sm:p-3 rounded-xl flex items-center gap-2 sm:gap-3 hover:bg-white hover:border-emerald-200 transition-all duration-300 shadow-sm shadow-slate-100/30 min-w-0">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                    <Sparkles className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-emerald-500" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-sora text-[11px] xs:text-xs sm:text-sm md:text-base lg:text-lg font-bold text-emerald-600 tracking-tight leading-none whitespace-nowrap">
                      12 Badges
                    </div>
                    <div className="text-[8px] sm:text-[9px] text-slate-400 font-extrabold uppercase tracking-wider mt-1 sm:mt-1.5 leading-tight">
                      Conquistas DIO.me
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Micro 4-Card Stats collection for quick review */}
            <div className="grid grid-cols-2 gap-4 lg:col-span-2">
              
              {/* Stat A: Média Geral */}
              <div className="bg-white rounded-[20px] border border-slate-200/50 p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-full relative">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-1.5">
                    <span className="text-[9px] sm:text-[10px] text-slate-500 font-extrabold uppercase tracking-wider font-mono leading-tight">Média Geral IRA</span>
                    <span className="text-[9px] sm:text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200/60 font-black px-2 py-0.5 rounded-full font-mono flex items-center gap-1 shrink-0 select-none">
                      ▲ 9.3
                    </span>
                  </div>
                  {/* Centered large value with text gradient */}
                  <div className="my-3 sm:my-4">
                    <h4 className="font-sora font-extrabold text-slate-800 text-3xl lg:text-[28px] xl:text-[36px] 2xl:text-[40px] tracking-tight leading-none bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                      {averageGrade}
                    </h4>
                  </div>
                </div>
                
                <button 
                  onClick={() => setActiveTab('academic')} 
                  className="text-[9px] sm:text-[10px] text-slate-400 hover:text-indigo-600 font-bold tracking-wider font-mono flex items-center justify-between border-t border-slate-100 pt-3 text-left cursor-pointer transition-colors"
                >
                  <span>GRADE ESCOLAR</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </button>
              </div>

              {/* Stat B: Cursos Extra */}
              <div className="bg-white rounded-[20px] border border-slate-200/50 p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-full relative">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-1.5">
                    <span className="text-[9px] sm:text-[10px] text-slate-500 font-extrabold uppercase tracking-wider font-mono leading-tight">Qualificações Ativas</span>
                    <span className="text-[9px] sm:text-[10px] text-indigo-700 bg-indigo-50 border border-indigo-200/60 font-black px-2 py-0.5 rounded-full font-mono shrink-0 select-none">
                      {totalCertificatesCount} Cursos
                    </span>
                  </div>
                  {/* Centered large value */}
                  <div className="my-3 sm:my-4">
                    <h4 className="font-sora font-extrabold text-slate-800 text-3xl lg:text-[28px] xl:text-[36px] 2xl:text-[40px] tracking-tight leading-none bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent flex flex-wrap items-baseline gap-x-1 gap-y-0.5 animate-in fade-in duration-300">
                      {totalCertificatesCount} <span className="text-[11px] lg:text-[10px] xl:text-xs 2xl:text-sm font-semibold text-slate-500 tracking-normal normal-case block lg:inline">Cursos</span>
                    </h4>
                  </div>
                </div>
                
                <button 
                  onClick={() => setActiveTab('certificates')} 
                  className="text-[9px] sm:text-[10px] text-slate-400 hover:text-indigo-600 font-bold tracking-wider font-mono flex items-center justify-between border-t border-slate-100 pt-3 text-left cursor-pointer transition-colors"
                >
                  <span>VERIFICAR</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </button>
              </div>

              {/* Stat C: Disciplinas Ativas */}
              <div className="bg-white rounded-[20px] border border-slate-200/50 p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-full relative">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-1.5">
                    <span className="text-[9px] sm:text-[10px] text-slate-500 font-extrabold uppercase tracking-wider font-mono leading-tight">Disciplinas em Curso</span>
                    <span className="text-[9px] sm:text-[10px] text-blue-700 bg-blue-50 border border-blue-200/60 font-black px-2 py-0.5 rounded-full font-mono shrink-0 select-none">
                      4 Ativas
                    </span>
                  </div>
                  {/* Centered large value */}
                  <div className="my-3 sm:my-4">
                    <h4 className="font-sora font-extrabold text-slate-800 text-3xl lg:text-[28px] xl:text-[36px] 2xl:text-[40px] tracking-tight leading-none bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                      4
                    </h4>
                  </div>
                </div>
                
                <button 
                  onClick={() => setActiveTab('academic')} 
                  className="text-[9px] sm:text-[10px] text-slate-400 hover:text-indigo-600 font-bold tracking-wider font-mono flex items-center justify-between border-t border-slate-100 pt-3 text-left cursor-pointer transition-colors"
                >
                  <span>VER DETALHES</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </button>
              </div>

              {/* Stat D: Experiência Consolidada */}
              <div className="bg-white rounded-[20px] border border-slate-200/50 p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-full relative">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-1.5">
                    <span className="text-[9px] sm:text-[10px] text-slate-500 font-extrabold uppercase tracking-wider font-mono leading-tight">Experiência Real</span>
                    <span className="text-[9px] sm:text-[10px] text-amber-700 bg-amber-50 border border-amber-200/60 font-semibold px-2 py-0.5 rounded-full font-mono shrink-0 select-none">
                      CLT/PJ
                    </span>
                  </div>
                  {/* Centered large value */}
                  <div className="my-3 sm:my-4">
                    <h4 className="font-sora font-extrabold text-slate-800 text-3xl lg:text-[28px] xl:text-[36px] 2xl:text-[40px] tracking-tight leading-none bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent flex flex-wrap items-baseline gap-x-1 gap-y-0.5" title={expString}>
                      5 <span className="text-[11px] lg:text-[10px] xl:text-xs 2xl:text-sm font-semibold text-slate-500 tracking-normal normal-case block lg:inline">Cargos</span>
                    </h4>
                  </div>
                </div>
                
                <button 
                  onClick={() => setActiveTab('experience')} 
                  className="text-[9px] sm:text-[10px] text-slate-400 hover:text-indigo-600 font-bold tracking-wider font-mono flex items-center justify-between border-t border-slate-100 pt-3 text-left cursor-pointer transition-colors"
                >
                  <span>TIMELINE</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </button>
              </div>

            </div>

          </div>

          {/* Row with Total progress Card (Purple) and Trending Skills chart */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Total progress Card (Premium Deep Indigo/Violet Gradient block matching the mockup photo) */}
            <div className="bg-[#423fdb] text-white rounded-2xl border-0 p-6 flex flex-col justify-between shadow-lg shadow-indigo-600/15 relative overflow-hidden group select-none h-62 animate-in fade-in duration-300">
              <div className="absolute right-0 bottom-0 translate-x-4 translate-y-4 w-32 h-32 rounded-full bg-white/5 select-none" />
              <div className="absolute -left-10 -top-10 w-28 h-28 rounded-full bg-indigo-500/10 select-none" />
              
              <div>
                <span className="text-[9px] text-indigo-200 font-extrabold uppercase tracking-widest font-mono block">Progresso Integrado</span>
                
                <div className="flex items-center justify-between mt-3">
                  <div>
                    <span className="text-3xl font-black tracking-tight leading-none">{totalCertHours} Horas</span>
                    <p className="text-[10px] text-indigo-100 font-semibold mt-1">
                      Aproveitamento total em Qualificações Corporativas
                    </p>
                  </div>
                  
                  {/* Neon Style Visual Icon */}
                  <div className="bg-white/10 text-white border border-white/10 p-2.5 rounded-xl shrink-0 group-hover:scale-105 transition-transform duration-300">
                    <Sparkles className="w-4.5 h-4.5 text-indigo-200" />
                  </div>
                </div>

                {/* Glowing Premium Progress Bar */}
                <div className="mt-4 space-y-1">
                  <div className="flex justify-between items-center text-[9px] text-indigo-200 font-mono">
                    <span>Aproveitamento Acadêmico</span>
                    <span className="text-white font-extrabold">83% da Meta (300h)</span>
                  </div>
                  <div className="w-full bg-white/15 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-gradient-to-r from-emerald-400 to-teal-300 h-full rounded-full shadow-[0_0_8px_rgba(52,211,153,0.5)] transition-all duration-1000" style={{ width: '83.33%' }}></div>
                  </div>
                </div>
              </div>

              {/* Small specific metrics underneath */}
              <div className="grid grid-cols-2 gap-3 border-t border-white/10 pt-3 mt-1 text-left">
                <div>
                  <span className="text-sm font-black text-indigo-100 block">{totalCertificatesCount} Cursos</span>
                  <span className="text-[8px] text-indigo-200 font-bold block uppercase tracking-wider font-mono mt-0.5">Qualificação Escolar</span>
                </div>
                <div className="border-l border-white/10 pl-3">
                  <span className="text-sm font-black text-indigo-100 block">12 Badges DIO</span>
                  <span className="text-[8px] text-indigo-200 font-bold block uppercase tracking-wider font-mono mt-0.5">Aceleração de Carreira</span>
                </div>
              </div>

            </div>

            {/* Trending Skills / Properties (Proficiency breakdown bars) */}
            <div className="bg-white rounded-2xl border border-slate-200/60 p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-62">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-black text-slate-700 uppercase tracking-widest font-mono">Expertise em Destaque</h4>
                  <span className="text-[9px] text-slate-400 font-bold">Nível Estimado</span>
                </div>
                
                {/* Visual horizontal bars stack */}
                <div className="space-y-3 pt-1">
                  {[
                    { name: 'Excel & Pacote Office', pct: 95, color: 'from-blue-500 to-indigo-600' },
                    { name: 'Gestão Financeira & Caixa', pct: 90, color: 'from-emerald-500 to-teal-500' },
                    { name: 'Power BI (Análise de Dados)', pct: 75, color: 'from-purple-500 to-pink-500' },
                    { name: 'Faturamento Hospitalar', pct: 85, color: 'from-orange-500 to-amber-500' }
                  ].map((item, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between items-center text-[11px] font-bold">
                        <span className="text-slate-600 line-clamp-1">{item.name}</span>
                        <span className="text-slate-800 font-mono">{item.pct}%</span>
                      </div>
                      <div className="w-full bg-slate-50 border border-slate-100 rounded-full h-2 overflow-hidden">
                        <div 
                          className={`h-full bg-gradient-to-r ${item.color} rounded-full`}
                          style={{ width: `${item.pct}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-[10px] text-slate-400 font-semibold font-mono text-center pt-2">
                Trilha contínua de aperfeiçoamento corporativo.
              </div>
            </div>

          </div>

          {/* Detailed Experience Fast-view Row */}
          <div className="bg-white border border-slate-200/60 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-slate-800 text-sm leading-none">Experiência Corporativa Recente</h3>
                <span className="text-xs text-slate-400 mt-1 block">Mais recentes contribuições em frentes financeiras e administrativas</span>
              </div>
              <button 
                onClick={() => setActiveTab('experience')} 
                className="text-indigo-600 hover:text-indigo-700 text-xs font-bold font-sans flex items-center gap-1 cursor-pointer transition-colors"
              >
                <span>Timeline Completo</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {experiences.slice(0, 2).map((exp, idx) => (
                <div key={idx} className="bg-slate-50/50 hover:bg-slate-50 border border-slate-200/40 hover:border-slate-200 transition-all rounded-xl p-3.5 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start gap-2">
                      <span className="text-[11px] font-extrabold text-slate-700 line-clamp-1">{exp.role}</span>
                      <span className="text-[9px] font-mono text-slate-400 bg-white border border-slate-200 px-1.5 py-0.2 rounded-md shrink-0 whitespace-nowrap">
                        {exp.durationMonths}m
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-semibold block mt-0.5">{exp.company}</span>
                    <p className="text-slate-500 text-[11px] mt-2 leading-relaxed line-clamp-2">
                      {exp.description}
                    </p>
                  </div>
                  <div className="text-[10px] text-indigo-600 font-bold font-mono mt-3 text-right">
                    {exp.periodStart} • {exp.periodEnd}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column Area: Targets Gauge Card & Próximas Atividades List */}
        <div className="space-y-6">
          
          {/* Targets Gauge Card - modeled with Concentric Rainbow Ticking Dotted Meter */}
          <div className="bg-white rounded-2xl border border-slate-200/60 p-6 shadow-sm flex flex-col justify-between relative overflow-hidden h-[335px]">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
            
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-bold text-slate-800 text-sm leading-none">Metas & Desempenho</h3>
                  <span className="text-[11px] text-slate-400 mt-1 block">Acompanhamento do Índice de Rendimento Acadêmico (IRA)</span>
                </div>
                <Users className="w-4 h-4 text-slate-400" />
              </div>

              {/* Glowing Concentric Dial gauge */}
              <div className="relative w-44 h-44 mx-auto my-1 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-225" viewBox="0 0 100 100">
                  
                  {/* Subtle Dotted Dial Background Track */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="#f1f5f9"
                    strokeWidth="4"
                    strokeDasharray="2 3"
                    fill="transparent"
                  />
                  
                  {/* Rainbow Colored Active Arc Track (70% value fill represent IRA) */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="url(#rainbowDialGradient)"
                    strokeWidth="6"
                    strokeDasharray="251.2"
                    strokeDashoffset={251.2 - (251.2 * 0.7) * (parseFloat(averageGrade) / 10)}
                    strokeLinecap="round"
                    fill="transparent"
                  />
                  
                  {/* Gradient Definition */}
                  <defs>
                    <linearGradient id="rainbowDialGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#ef4444" /> {/* Red */}
                      <stop offset="50%" stopColor="#a855f7" /> {/* Purple */}
                      <stop offset="100%" stopColor="#3b82f6" /> {/* Blue */}
                    </linearGradient>
                  </defs>

                </svg>

                {/* Inner Dial Text Panel */}
                <div className="absolute text-center select-none">
                  <span className="text-2xl font-black text-slate-800 font-sans tracking-tight block">
                    {averageGrade} <span className="text-xs font-semibold text-slate-400">/ 10</span>
                  </span>
                  <span className="text-[9px] text-slate-400 font-extrabold uppercase tracking-wider font-mono block mt-1 leading-none">
                    Média IRA
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Status metadata */}
            <div className="border-t border-slate-100 pt-4 flex justify-between items-center text-xs font-semibold select-none">
              <span className="text-slate-400">Total Disciplinas Concluídas:</span>
              <span className="bg-emerald-50 text-emerald-600 font-black px-2 py-0.5 rounded-lg text-xs font-mono">
                {completedSubjects.length} Aprovadas
              </span>
            </div>

          </div>

          {/* Certificados Recentes List (styled like 'Top Upcoming Payments' card in mockup) */}
          <div className="bg-white rounded-2xl border border-slate-200/60 p-6 shadow-sm flex flex-col justify-between h-[360px]">
            <div>
              <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
                <div>
                  <h3 className="font-bold text-slate-800 text-sm leading-none">Certificados Recentes</h3>
                  <span className="text-[11px] text-slate-400 mt-1 block font-medium">Mais recentes qualificações emitidas</span>
                </div>
                <Layers className="w-4.5 h-4.5 text-indigo-600 shrink-0" />
              </div>

              {/* Stack of recent certificates */}
              <div className="space-y-[15px]">
                {recentCertificatesList.map((cert) => {
                  const isDio = cert.institution.toLowerCase().includes('dio');
                  const isBradesco = cert.institution.toLowerCase().includes('bradesco');
                  return (
                    <div key={cert.id} className="flex items-center justify-between gap-3 p-1 rounded-lg">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 select-none overflow-hidden ${
                          isDio 
                            ? 'bg-slate-900 border border-slate-800' 
                            : isBradesco
                            ? 'bg-white border border-slate-200'
                            : 'bg-indigo-50 border border-indigo-100 text-indigo-600 font-bold text-xs'
                        }`}>
                          {isDio ? (
                            <img 
                              src="https://assets.dio.me/VTgUqMiPAIgvsFdSvgSnVAB5lrqnNxY_N8h8LknnQys/f:webp/q:80/w:120/L2Fzc2V0cy9kaW9tZS9sb2dvLWZ1bGwuc3Zn" 
                              alt="Logo DIO" 
                              className="h-3 object-contain max-w-[85%]"
                              referrerPolicy="no-referrer"
                            />
                          ) : isBradesco ? (
                            <img 
                              src="https://img.icons8.com/color/1200/bradesco.jpg" 
                              alt="Logo Fundação Bradesco" 
                              className="w-7 h-7 object-cover rounded-md"
                              referrerPolicy="no-referrer"
                            />
                          ) : (
                            'EV'
                          )}
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-xs font-bold text-slate-700 leading-tight truncate" title={cert.name}>
                            {cert.name}
                          </h4>
                          <p className="text-[10px] text-slate-400 mt-0.5 truncate">
                            {cert.institution} • {cert.durationHours}h
                          </p>
                        </div>
                      </div>
                      <span className="text-[10px] text-slate-400 font-bold font-mono whitespace-nowrap">
                        {cert.conclusionDate}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom info banner */}
            <div className="bg-indigo-50/40 border border-indigo-100/30 p-2.5 rounded-xl text-[10px] text-slate-500 font-semibold leading-relaxed flex items-center gap-2 mt-4 select-none">
              <Compass className="w-4 h-4 text-indigo-600 shrink-0" />
              <span>Qualificações em desenvolvimento contínuo de competências reais de mercado!</span>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
