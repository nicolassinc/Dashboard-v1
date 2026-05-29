/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Briefcase, 
  ChevronRight, 
  Clock, 
  MapPin, 
  Calendar, 
  Activity, 
  Terminal,
  FileCheck,
  TrendingUp,
  UserCheck
} from 'lucide-react';
import { experiences } from '../data';

export default function ExperienceTimeline() {
  const [selectedExpId, setSelectedExpId] = useState<string>('exp1');

  // Find active experience details
  const activeExp = experiences.find(e => e.id === selectedExpId) || experiences[0];

  const getDurationString = (months: number) => {
    const years = Math.floor(months / 12);
    const remMonths = months % 12;
    
    let str = '';
    if (years > 0) {
      str += `${years} ano${years > 1 ? 's' : ''}`;
    }
    if (remMonths > 0) {
      if (years > 0) str += ' e ';
      str += `${remMonths} me${remMonths > 1 ? 'ses' : 's'}`;
    }
    return str;
  };

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
      
      {/* Visual Chart: Tenure in Months */}
      <div className="bg-white rounded-2xl border border-slate-200/60 p-6 shadow-sm shadow-slate-100">
        <div className="mb-5">
          <h3 className="font-bold text-slate-800 text-base leading-none">Análise Gráfica de Retenção & Permanência</h3>
          <span className="text-xs text-slate-400 mt-1 block">Tempo em meses investido em cada posição corporativa de carreira</span>
        </div>

        {/* Visual Bar Graph */}
        <div className="space-y-4">
          {experiences.map((exp) => {
            const isSelected = exp.id === selectedExpId;
            const durationPct = Math.min(100, Math.round((exp.durationMonths / 24) * 100)); // normalized relative to max 24 months

            return (
              <div 
                key={exp.id} 
                className="space-y-1 group cursor-pointer"
                onClick={() => setSelectedExpId(exp.id)}
              >
                <div className="flex items-center justify-between text-xs font-semibold leading-none">
                  <span className={`transition-colors ${isSelected ? 'text-blue-600 font-bold' : 'text-slate-600 group-hover:text-slate-900'}`}>
                    {exp.role} ({exp.company.split('(')[0].trim()})
                  </span>
                  <span className="text-slate-400 font-bold font-mono text-[10px]">{exp.durationMonths} meses ({getDurationString(exp.durationMonths)})</span>
                </div>
                <div className="h-4.5 w-full bg-slate-50 border border-slate-100 rounded-lg overflow-hidden flex items-center p-0.5 group-hover:border-slate-200 transition-colors">
                  <div 
                    className={`h-full rounded-md transition-all duration-350 flex items-center justify-end pr-2 font-mono text-[9px] text-white font-black leading-none ${
                      isSelected 
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 shadow-sm' 
                        : 'bg-slate-300 group-hover:bg-slate-400'
                    }`}
                    style={{ width: `${durationPct}%` }}
                  >
                    {exp.durationMonths >= 6 && `${exp.durationMonths}m`}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Column Grid: Interactive Timeline vs Detail Board */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        
        {/* Left Hand: Timeline Navigation (2/5 size) */}
        <div className="bg-white rounded-2xl border border-slate-200/60 p-6 shadow-sm shadow-slate-100 lg:col-span-2 space-y-4">
          <div className="mb-2">
            <h3 className="font-bold text-slate-800 text-base leading-none font-sans">Navegação Carreira</h3>
            <span className="text-xs text-slate-400 mt-1 block">Clique nos cargos abaixo para consultar em detalhes</span>
          </div>

          <div className="relative border-l border-slate-100 pl-4 space-y-5 py-2">
            {experiences.map((exp) => {
              const isSelected = exp.id === selectedExpId;
              
              return (
                <div 
                  key={exp.id} 
                  onClick={() => setSelectedExpId(exp.id)}
                  className={`group relative cursor-pointer p-3 rounded-xl border transition-all text-left ${
                    isSelected 
                      ? 'bg-blue-50/50 border-blue-200 shadow-sm shadow-blue-500/5' 
                      : 'bg-white hover:bg-slate-50 border-slate-100 hover:border-slate-200'
                  }`}
                >
                  {/* Timeline bullet dot */}
                  <div className={`absolute left-[-22.5px] top-5.5 w-3 h-3 rounded-full border-2 border-white transition-all ${
                    isSelected 
                      ? 'bg-blue-600 scale-120 shadow-md shadow-blue-500/50' 
                      : 'bg-slate-300 group-hover:bg-slate-500'
                  }`}></div>

                  <span className="text-[9px] text-slate-400 font-extrabold tracking-wider uppercase font-mono block leading-none">
                    {exp.periodStart} – {exp.periodEnd}
                  </span>
                  <h4 className={`text-xs font-black tracking-tight mt-1.5 transition-colors ${
                    isSelected ? 'text-blue-600' : 'text-slate-700'
                  }`}>
                    {exp.role}
                  </h4>
                  <p className="text-[10px] text-slate-400 font-semibold truncate mt-0.5">{exp.company}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Hand: Detailed Board displaying task description & checkboxes (3/5 size) */}
        <div className="bg-white rounded-2xl border border-slate-200/60 p-6 shadow-sm shadow-slate-100 lg:col-span-3 flex flex-col justify-between">
          <div className="space-y-5">
            
            {/* Header info for selected position */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] text-blue-600 font-extrabold tracking-wider uppercase font-mono block">Detalhamento do Cargo</span>
                <h3 className="text-base font-extrabold text-slate-800 leading-none mt-1">{activeExp.role}</h3>
                <p className="text-xs text-slate-500 font-semibold mt-1.5">{activeExp.company}</p>
              </div>
              
              <div className="flex items-center gap-2 text-slate-500 text-xs font-semibold bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100 shrink-0 select-none">
                <Clock className="w-4 h-4 text-blue-600" />
                <span className="font-mono text-[11px] whitespace-nowrap">{getDurationString(activeExp.durationMonths)}</span>
              </div>
            </div>

            {/* General Overview statement */}
            <div className="bg-slate-50/50 rounded-xl p-4 border border-slate-100">
              <span className="text-[9px] text-slate-400 font-extrabold font-mono tracking-wider uppercase block mb-1">Missão do Cargo</span>
              <p className="text-xs text-slate-600 leading-relaxed font-sans">{activeExp.description}</p>
            </div>

            {/* Checklist of Responsibilities and Activities */}
            <div className="space-y-3">
              <span className="text-[9px] text-slate-400 font-extrabold font-mono tracking-wider uppercase block mb-1.5 flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-slate-400" />
                <span>Atribuições Chave & Entregas Operacionais</span>
              </span>
              
              <div className="grid grid-cols-1 gap-2.5">
                {activeExp.keyActivities.map((activity, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-600 bg-white border border-slate-100 p-2.5 rounded-xl hover:bg-slate-50/30 transition-colors">
                    <FileCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5 shadow-sm shadow-blue-500/10 rounded-full" />
                    <span className="leading-normal font-sans text-[11.5px] font-medium">{activity}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          <div className="pt-5 mt-5 border-t border-slate-100 flex flex-wrap items-center justify-between text-[11px] text-slate-400 font-medium">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>Salvador, BA - Brasil</span>
            </span>
            <span className="flex items-center gap-1 font-mono">
              <Calendar className="w-3.5 h-3.5" />
              <span>{activeExp.periodStart} – {activeExp.periodEnd}</span>
            </span>
          </div>

        </div>

      </div>

    </div>
  );
}
