/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Search, Bell, Mail, Phone, Calendar, ArrowRight, ExternalLink, Menu } from 'lucide-react';
import { personalData, academicCourses, certificates, skills } from '../data';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  setSearchQuery: (query: string) => void;
  sidebarOpen?: boolean;
  setSidebarOpen?: (open: boolean) => void;
}

export default function Header({ 
  activeTab, 
  setActiveTab, 
  setSearchQuery,
  sidebarOpen,
  setSidebarOpen
}: HeaderProps) {
  const [localSearch, setLocalSearch] = useState('');
  const [showResults, setShowResults] = useState(false);

  const getTitle = () => {
    switch (activeTab) {
      case 'overview':
        return 'Painel de Desenvolvimento Profissional';
      case 'academic':
        return 'Histórico & Vida Acadêmica';
      case 'experience':
        return 'Trajetória & Experiência Profissional';
      case 'certificates':
        return 'Certificações & Habilidade Técnica';
      case 'dashboards':
        return 'Produtos & Dashboards Desenvolvidos';
      case 'profile':
        return 'Informações Pessoais';
      default:
        return 'Painel de Controle';
    }
  };

  const getBreadcrumb = () => {
    switch (activeTab) {
      case 'overview':
        return 'Dashboard / Visão Geral';
      case 'academic':
        return 'Dashboard / Acadêmico / UNIFATECIE';
      case 'experience':
        return 'Dashboard / Profissional / Experiência';
      case 'certificates':
        return 'Dashboard / Desenvolvimento / Qualificações';
      case 'dashboards':
        return 'Dashboard / Projetos Integrados';
      case 'profile':
        return 'Dashboard / Detalhes Pessoais';
      default:
        return 'Dashboard';
    }
  };

  // Search through subjects, certificates, and skills
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setLocalSearch(val);
    setSearchQuery(val);
    setShowResults(val.length > 1);
  };

  const subjectsList = academicCourses.flatMap((course) =>
    course.etapas.flatMap((etapa) =>
      etapa.subjects.map((sub) => ({ ...sub, courseName: course.name, type: 'disciplina' }))
    )
  );

  const searchResults = () => {
    if (localSearch.length < 2) return [];

    const query = localSearch.toLowerCase();
    const matches: any[] = [];

    // Search academic subjects
    subjectsList.forEach((sub) => {
      if (sub.name.toLowerCase().includes(query) || sub.code.includes(query)) {
        matches.push({
          id: `sub-${sub.code}`,
          title: sub.name,
          subtitle: `${sub.courseName} • Código: ${sub.code} • Status: ${sub.status}`,
          tab: 'academic',
          type: 'grade',
        });
      }
    });

    // Search certificates
    certificates.forEach((cert) => {
      if (cert.name.toLowerCase().includes(query) || cert.category.toLowerCase().includes(query)) {
        matches.push({
          id: `cert-${cert.id}`,
          title: cert.name,
          subtitle: `${cert.institution} • ${cert.durationHours}h • Ano: ${cert.year}`,
          tab: 'certificates',
          type: 'certificado',
        });
      }
    });

    // Search skills
    skills.forEach((skill) => {
      if (skill.name.toLowerCase().includes(query)) {
        matches.push({
          id: `skill-${skill.name}`,
          title: skill.name,
          subtitle: `Competência Profissional • Nível: ${skill.level}`,
          tab: 'certificates',
          type: 'habilidade',
        });
      }
    });

    return matches.slice(0, 5); // Limit to top 5 matches
  };

  const results = searchResults();

  return (
    <header className="bg-white border-b border-slate-200 h-16 shrink-0 flex items-center justify-between px-4 sm:px-6 sticky top-0 z-30 shadow-sm shadow-slate-100/50">
      
      {/* Title & Breadcrumb flex-aligned with toggle */}
      <div className="flex items-center gap-3">
        {setSidebarOpen && (
          <button 
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-1.5 -ml-1 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer shrink-0"
            title="Abrir menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}
        <div className="min-w-0">
          <h1 className="text-sm sm:text-lg font-bold text-slate-800 leading-tight font-sans tracking-tight truncate">
            {getTitle()}
          </h1>
          <div className="text-[9px] sm:text-[10px] text-slate-400 font-medium font-mono uppercase tracking-wider mt-0.5 truncate">
            {getBreadcrumb()}
          </div>
        </div>
      </div>

      {/* Center Search Bar */}
      <div className="relative w-80 max-w-sm hidden md:block">
        <div className="relative">
          <input
            type="text"
            placeholder="Pesquisar matérias, cursos ou qualificações..."
            value={localSearch}
            onChange={handleSearchChange}
            onFocus={() => setShowResults(localSearch.length > 1)}
            onBlur={() => setTimeout(() => setShowResults(false), 200)}
            className="w-full bg-slate-50 text-xs border border-slate-200 rounded-lg pl-9 pr-4 py-2 text-slate-700 placeholder-slate-400 focus:outline-none focus:border-blue-500/80 focus:bg-white focus:ring-2 focus:ring-blue-500/10 transition-all font-medium"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
        </div>

        {/* Dropdown Results */}
        {showResults && results.length > 0 && (
          <div className="absolute top-11 left-0 right-0 bg-white border border-slate-200 rounded-xl shadow-xl z-50 overflow-hidden divide-y divide-slate-100 animate-in fade-in slide-in-from-top-1 duration-150">
            <div className="px-3 py-1.5 bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">
              Resultados Encontrados
            </div>
            {results.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.tab);
                  setShowResults(false);
                }}
                className="w-full text-left px-4 py-2.5 hover:bg-slate-50 transition-colors flex items-center justify-between group"
              >
                <div>
                  <div className="text-xs font-semibold text-slate-700 line-clamp-1 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </div>
                  <div className="text-[10px] text-slate-400 font-medium mt-0.5 line-clamp-1 font-sans">
                    {item.subtitle}
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Right Side Quick Contacts & Info */}
      <div className="flex items-center gap-2 sm:gap-4 shrink-0">
        {/* Contact action buttons only, without text as requested */}
        <div className="flex items-center gap-1.5 sm:gap-2 border-r-0 sm:border-r border-slate-200 pr-0 sm:pr-4">
          <a 
            href={`mailto:${personalData.email}`} 
            title={`Enviar E-mail para: ${personalData.email}`}
            className="p-1.5 sm:p-2 bg-slate-50 hover:bg-blue-50 text-slate-500 hover:text-blue-600 rounded-lg border border-slate-200 transition-all cursor-pointer flex items-center justify-center shrink-0"
          >
            <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </a>
          <a 
            href={`https://wa.me/55${personalData.phone.replace(/[^0-9]/g, '')}`} 
            target="_blank" 
            rel="noopener noreferrer"
            title={`Chamar no WhatsApp: ${personalData.phone}`}
            className="p-1.5 sm:p-2 bg-slate-50 hover:bg-green-50 text-slate-500 hover:text-green-600 rounded-lg border border-slate-200 transition-all cursor-pointer flex items-center justify-center shrink-0"
          >
            <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </a>
          <a 
            href="https://wa.me/5571993918247" 
            target="_blank" 
            rel="noopener noreferrer"
            title="Chamar no WhatsApp"
            className="p-1.5 sm:p-2 bg-slate-50 hover:bg-emerald-50 rounded-lg border border-slate-200 transition-all cursor-pointer flex items-center justify-center shrink-0"
          >
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/a/a7/2062095_application_chat_communication_logo_whatsapp_icon.svg" 
              alt="Logo WhatsApp" 
              className="w-3.5 h-3.5 sm:w-4 sm:h-4 object-contain"
              referrerPolicy="no-referrer"
            />
          </a>
        </div>

        {/* Date Display Widget */}
        <div className="hidden sm:flex items-center gap-2 text-slate-600 bg-slate-50 border border-slate-200/80 px-3 py-1.5 rounded-lg text-xs font-medium shrink-0">
          <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="font-mono whitespace-nowrap">28 Jun 2026</span>
        </div>
      </div>
    </header>
  );
}
