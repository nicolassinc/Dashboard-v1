/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Trophy, 
  Award, 
  Sparkles, 
  BadgeCheck, 
  TrendingUp, 
  Cpu, 
  Search, 
  Grid, 
  Flame, 
  BookOpen, 
  CheckCircle2, 
  Target
} from 'lucide-react';
import { DioAchievement } from '../types';

// Let's import the raw html dynamically using Vite's ?raw feature
// @ts-ignore
import dioBadgesHtml from '../../assets/dio_badges.html?raw';

// Robust hardcoded fallback list of DIO achievements in case of parse discrepancies
const fallbackDioAchievements: DioAchievement[] = [
  {
    name: 'Copiloto de Vendas com IA para Atendimento ao Cliente',
    badgeUrl: 'https://assets.dio.me/M3MAR_-H8B6ongiiSiZR3ljS7YRIX-4Tp3pnnQP5ICg/f:webp/q:80/w:120/L2xhYl9wcm9qZWN0cy9iYWRnZXMvMjI5MmFlNTMtZmYyYy00NWE2LWEwZGQtMTY0MzNjNjkwYTVlLnBuZw',
    category: 'Vendas',
    status: 'Desbloqueado',
    indicator: 'Conquista de Projeto'
  },
  {
    name: 'Acelerando Sua Produtividade Pessoal com IA',
    badgeUrl: 'https://assets.dio.me/lo0IT42NpYmOxErac5-Y6CXKw5EeZuWGOvs1MQT6GJA/f:webp/q:80/w:120/L2NyZWF0aXZlX2NoYWxsZW5nZS9iYWRnZS82NTIxOGI1Mi04OWQ1LTQ3YmUtYTUzNS0xYzA3NzA4ODJlMTgucG5n',
    category: 'Inteligência Artificial',
    status: 'Desbloqueado',
    indicator: 'Desafio Criativo'
  },
  {
    name: 'Quem Não Vende, Ajuda a Vender! O Poder da Argumentação Comercial com IA',
    badgeUrl: 'https://assets.dio.me/CT3YDf13dC6vOBicDDjp2se3g8XcrrqUaFEvoJROlQM/f:webp/q:80/w:120/L2NyZWF0aXZlX2NoYWxsZW5nZS9iYWRnZS84NzY4OWY5MS04YmFmLTQxZmYtYTc4NC05NDk2NGJkNWMzZTMucG5n',
    category: 'Vendas',
    status: 'Desbloqueado',
    indicator: 'Desafio Criativo'
  },
  {
    name: 'Transformando Sua Rotina com IA: Tenha o Seu Próprio Assistente de Metas',
    badgeUrl: 'https://assets.dio.me/Za4gNeHzjMkakHnjxx1BhJZ5ZNFx1EZ5GfLoWTgCW74/f:webp/q:80/w:120/L2NvdXJzZXMvYmFkZ2UvMWYwMTI3ZjktY2Q0ZC00MmQ3LTkyM2UtODhhNDJkNDMzMDkyLnBuZw',
    category: 'Inteligência Artificial',
    status: 'Desbloqueado',
    indicator: 'Curso Concluído'
  },
  {
    name: 'Aplicações Práticas da Inteligência Artificial',
    badgeUrl: 'https://assets.dio.me/rGgp7TDmf7DyAB2PmwwA197yBUhgjjQNl7iC8tQGGVE/f:webp/q:80/w:120/L2NvdXJzZXMvYmFkZ2UvNWZkNjQyNWEtM2U0OC00Nzk5LWExNGQtODQyMmVmOGZmYTM4LnBuZw',
    category: 'Inteligência Artificial',
    status: 'Desbloqueado',
    indicator: 'Curso Concluído'
  },
  {
    name: 'Treinando uma IA de Aprendizagem: Explore o Poder do NotebookLM',
    badgeUrl: 'https://assets.dio.me/ukshFYm7R80Gu7UAMKpPnT6GUhis6o_KknQ5B7ZkCJE/f:webp/q:80/w:120/L2xhYl9wcm9qZWN0cy9iYWRnZXMvMDE2Njk1OGYtYjQwYy00OWNkLWFjMWMtM2VhZjdiNDE1NzRjLnBuZw',
    category: 'Ferramentas IA',
    status: 'Desbloqueado',
    indicator: 'Conquista de Projeto'
  },
  {
    name: 'Técnicas de Engenharia de Prompt',
    badgeUrl: 'https://assets.dio.me/h6Bb8mJuri3oBXTe75CWs33ovEkWsnvZ62MPQbydCmc/f:webp/q:80/w:120/L2NvdXJzZXMvYmFkZ2UvMjhlOTc0MGEtMTZiMS00M2FlLWEwNDItNGQ3OTQ5NjUxMjNjLnBuZw',
    category: 'Engenharia de Prompt',
    status: 'Desbloqueado',
    indicator: 'Curso Concluído'
  },
  {
    name: 'Introdução à Engenharia de Prompts',
    badgeUrl: 'https://assets.dio.me/rAADdmy3t8MC5wb7zRBXVJe6A0JhjY5Gi_8hJ3KBR9g/f:webp/q:80/w:120/L2NvdXJzZXMvYmFkZ2UvN2JjYThkNTktNzJmZi00ZTA0LWFmYTgtYjcyMzgzOGI1ZmY4LnBuZw',
    category: 'Engenharia de Prompt',
    status: 'Desbloqueado',
    indicator: 'Curso Concluído'
  },
  {
    name: 'Simplificando Tarefas e Ganhando Foco com IA no Dia a Dia',
    badgeUrl: 'https://assets.dio.me/Q2N-xU_USwQ2m9SdHGqSCKMt-_G-WLV1wfFw4cZ8TNw/f:webp/q:80/w:120/L2NyZWF0aXZlX2NoYWxsZW5nZS9iYWRnZS9kYjg5NzE4ZS0xMGRiLTRiODEtOWZmZC1hYzkzYjA1OTViZWYud2VicA',
    category: 'Inteligência Artificial',
    status: 'Desbloqueado',
    indicator: 'Desafio Criativo'
  },
  {
    name: 'Tudo o que Você Precisa Saber para Começar a Usar Inteligência Artificial',
    badgeUrl: 'https://assets.dio.me/_dhUsoNsxL77emZVqkfSFDRCMMJbZiUoQOYLGolwKsY/f:webp/q:80/w:120/L2NvdXJzZXMvYmFkZ2UvN2E4NjMxOWMtNTU5YS00YmI3LWIyMjEtZjAxOGY0ZDBmZmRmLnBuZw',
    category: 'Inteligência Artificial',
    status: 'Desbloqueado',
    indicator: 'Curso Concluído'
  },
  {
    name: 'Fundamentos da IA Moderna: Machine Learning, LLMs, IA Generativa e Agentes',
    badgeUrl: 'https://assets.dio.me/PWxmG7yqz43mucMHgTpDboTvVPiBg5sM1TDdC7AGo8k/f:webp/q:80/w:120/L2NvdXJzZXMvYmFkZ2UvODk3ZDBjNDQtOGQ3Mi00YTg2LTg2YWQtZGIyMjQzZjFjNmU3LnBuZw',
    category: 'Inteligência Artificial',
    status: 'Desbloqueado',
    indicator: 'Curso Concluído'
  },
  {
    name: 'Boas vindas Ao Bootcamp HEINEKEN - Inteligência Artificial Aplicada a Vendas',
    badgeUrl: 'https://assets.dio.me/IXLM9o9KlXt1GS7cHTcJ6Hh9aM0TkwDLzfGU4PwWP48/f:webp/q:80/w:120/L2NvdXJzZXMvYmFkZ2UvMjlhMjI0ZGUtYzMxYy00YzRkLTgzY2UtMjkyZDM4OGY0MWViLnBuZw',
    category: 'Bootcamp',
    status: 'Desbloqueado',
    indicator: 'Bootcamp Heineken'
  }
];

export default function DioAchievementsComponent() {
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Dynamically parse dio_badges.html
  const parsedAchievements = useMemo((): DioAchievement[] => {
    try {
      if (!dioBadgesHtml) {
        return fallbackDioAchievements;
      }

      const parser = new DOMParser();
      const doc = parser.parseFromString(dioBadgesHtml, 'text/html');
      
      // Select wrapper elements containing image and description
      const rootDivs = doc.querySelectorAll('.sc-iqUXby');
      if (rootDivs.length === 0) {
        return fallbackDioAchievements;
      }

      const items: DioAchievement[] = [];
      rootDivs.forEach((el) => {
        const img = el.querySelector('img');
        const nameDiv = el.querySelector('.sc-eaoxfQ') || el.querySelector('div');
        
        if (img && nameDiv) {
          const name = nameDiv.textContent?.trim() || '';
          const badgeUrl = img.getAttribute('src') || '';
          
          if (name && badgeUrl) {
            // Determine dynamic categories based on user requirements:
            // "NotebookLM -> Ferramentas IA", "Prompt -> Engenharia de Prompt", "Bootcamp -> Bootcamp", "Vendas -> Vendas", "IA -> Inteligência Artificial"
            let category = 'Tecnologia';
            if (name.includes('NotebookLM')) {
              category = 'Ferramentas IA';
            } else if (name.includes('Prompt')) {
              category = 'Engenharia de Prompt';
            } else if (name.includes('Bootcamp')) {
              category = 'Bootcamp';
            } else if (name.includes('Vendas')) {
              category = 'Vendas';
            } else if (name.includes('IA')) {
              category = 'Inteligência Artificial';
            }

            // Determine custom elegant indicator title
            let indicator = 'Curso Concluído';
            if (name.toLowerCase().includes('bootcamp')) {
              indicator = 'Bootcamp Heineken';
            } else if (name.toLowerCase().includes('copiloto') || name.toLowerCase().includes('treinando')) {
              indicator = 'Conquista de Projeto';
            } else if (name.toLowerCase().includes('simplificando') || name.toLowerCase().includes('vende')) {
              indicator = 'Desafio Criativo';
            }

            items.push({
              name,
              badgeUrl,
              category,
              status: 'Desbloqueado',
              indicator
            });
          }
        }
      });

      return items.length > 0 ? items : fallbackDioAchievements;
    } catch (e) {
      console.error("Erro parsing DIO badges HTML, utilizando fallback:", e);
      return fallbackDioAchievements;
    }
  }, []);

  // Filtered Achievements
  const filteredAchievements = useMemo(() => {
    return parsedAchievements.filter(item => {
      // Filter by category selection
      let categoryMatch = false;
      if (filterCategory === 'all') {
        categoryMatch = true;
      } else if (filterCategory === 'ia') {
        categoryMatch = item.category === 'Inteligência Artificial' || item.category === 'Ferramentas IA';
      } else if (filterCategory === 'prompt') {
        categoryMatch = item.category === 'Engenharia de Prompt';
      } else if (filterCategory === 'vendas') {
        categoryMatch = item.category === 'Vendas';
      } else if (filterCategory === 'bootcamp') {
        categoryMatch = item.category === 'Bootcamp';
      }

      const searchMatch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.category.toLowerCase().includes(searchQuery.toLowerCase());

      return categoryMatch && searchMatch;
    });
  }, [parsedAchievements, filterCategory, searchQuery]);

  // Metrics and statistics
  const metrics = useMemo(() => {
    const total = parsedAchievements.length;
    const unlocked = parsedAchievements.filter(a => a.status === 'Desbloqueado').length;
    const progressPercent = Math.round((unlocked / total) * 100) || 100;

    // Last unlocked (first item in the provided export string structure)
    const lastUnlocked = parsedAchievements[0] || null;

    // Counts by category
    const categoryCounts: Record<string, number> = {
      'Inteligência Artificial': 0,
      'Engenharia de Prompt': 0,
      'Vendas': 0,
      'Bootcamp': 0,
      'Ferramentas IA': 0
    };

    parsedAchievements.forEach(a => {
      if (categoryCounts[a.category] !== undefined) {
        categoryCounts[a.category]++;
      } else {
        categoryCounts[a.category] = 1;
      }
    });

    return {
      total,
      unlocked,
      progressPercent,
      lastUnlocked,
      categoryCounts
    };
  }, [parsedAchievements]);

  // Style colors for badge categories
  const getCategoryStyles = (category: string) => {
    switch (category) {
      case 'Inteligência Artificial':
        return {
          bg: 'bg-purple-50 text-purple-700 border-purple-100',
          indicator: 'bg-purple-500',
          themeColor: 'from-purple-500 to-indigo-600'
        };
      case 'Engenharia de Prompt':
        return {
          bg: 'bg-emerald-50 text-emerald-700 border-emerald-100',
          indicator: 'bg-emerald-500',
          themeColor: 'from-emerald-500 to-teal-600'
        };
      case 'Vendas':
        return {
          bg: 'bg-orange-50 text-orange-700 border-orange-100',
          indicator: 'bg-orange-500',
          themeColor: 'from-orange-500 to-amber-500'
        };
      case 'Bootcamp':
        return {
          bg: 'bg-red-50 text-red-700 border-red-100',
          indicator: 'bg-red-500',
          themeColor: 'from-red-500 to-rose-600'
        };
      case 'Ferramentas IA':
        return {
          bg: 'bg-blue-50 text-blue-700 border-blue-100',
          indicator: 'bg-blue-500',
          themeColor: 'from-blue-500 to-sky-600'
        };
      default:
        return {
          bg: 'bg-slate-50 text-slate-700 border-slate-100',
          indicator: 'bg-slate-500',
          themeColor: 'from-slate-500 to-slate-700'
        };
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      
      {/* Dynamic Header Block with Trophy Graphic */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1.5 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded-md w-fit select-none">
            <img 
              src="https://assets.dio.me/VTgUqMiPAIgvsFdSvgSnVAB5lrqnNxY_N8h8LknnQys/f:webp/q:80/w:120/L2Fzc2V0cy9kaW9tZS9sb2dvLWZ1bGwuc3Zn" 
              alt="Logo DIO" 
              className="h-3 object-contain"
              referrerPolicy="no-referrer"
            />
            <span className="text-[9px] text-slate-300 font-extrabold tracking-wider uppercase font-mono">
              Gamification
            </span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <Trophy className="w-5 h-5 text-yellow-500 shrink-0" />
            <h2 className="text-xl font-bold text-slate-800 tracking-tight font-sans">
              Badges & Conquistas
            </h2>
          </div>
          <p className="text-slate-550 text-xs mt-1 max-w-xl">
            Painel integrado de conquistas conquistadas no Bootcamp Heineken e módulos adicionais de Inteligência Artificial Aplicada a Vendas.
          </p>
        </div>
        
        {/* Search input field */}
        <div className="relative w-full md:w-72 shrink-0">
          <input
            type="text"
            placeholder="Filtrar por título..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs bg-white border border-slate-200 rounded-lg pl-9 pr-4 py-2 text-slate-755 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/25 transition-all font-semibold"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
        </div>
      </div>

      {/* Grid of dashboard stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        
        {/* Total Badge Counter */}
        <div className="bg-white rounded-2xl border border-slate-150 p-4 shadow-sm shadow-slate-100 hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between h-30 select-none">
          <div className="absolute right-0 top-0 translate-x-1.5 -translate-y-1.5 w-16 h-16 rounded-full bg-blue-500/5"></div>
          <div>
            <span className="text-[9px] text-slate-400 font-extrabold uppercase tracking-wider font-mono">Conquistas Desbloqueadas</span>
            <div className="text-2xl font-bold font-sora text-slate-800 tracking-tight mt-1">
              {metrics.unlocked} <span className="text-xs font-semibold text-slate-400">/ {metrics.total} badges</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-blue-600 font-semibold font-sans">
            <BadgeCheck className="w-4 h-4 text-blue-600" />
            <span>100% Aproveitamento</span>
          </div>
        </div>

        {/* Dynamic Progression Gauge */}
        <div className="bg-white rounded-2xl border border-slate-150 p-4 shadow-sm shadow-slate-100 hover:shadow-md transition-shadow flex flex-col justify-between h-30 select-none">
          <div>
            <span className="text-[9px] text-slate-400 font-extrabold uppercase tracking-wider font-mono">Progresso Gerais</span>
            <div className="text-2xl font-bold font-sora text-slate-800 tracking-tight mt-1 flex items-baseline gap-1">
              {metrics.progressPercent}%
            </div>
          </div>
          <div className="space-y-1.5">
            <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full transition-all duration-300"
                style={{ width: `${metrics.progressPercent}%` }}
              ></div>
            </div>
            <span className="text-[10px] text-slate-400 font-semibold block">Conquista máxima de trilha atingida</span>
          </div>
        </div>

        {/* Latest Achievement Card */}
        <div className="bg-white rounded-2xl border border-slate-150 p-4 shadow-sm shadow-slate-100 hover:shadow-md transition-shadow md:col-span-2 flex items-center gap-4 h-30 select-none">
          {metrics.lastUnlocked && (
            <>
              <div className="w-14 h-14 rounded-xl bg-orange-50 border border-orange-100 shrink-0 flex items-center justify-center p-1 relative">
                <img 
                  src={metrics.lastUnlocked.badgeUrl} 
                  alt={metrics.lastUnlocked.name} 
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center border-2 border-white shadow-sm shadow-yellow-500/40">
                  <Flame className="w-2.5 h-2.5 text-white" />
                </span>
              </div>
              <div className="min-w-0">
                <span className="text-[9px] text-orange-500 font-extrabold uppercase tracking-wider font-mono flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5" /> Último Badge Desbloqueado
                </span>
                <h4 className="text-xs font-extrabold text-slate-700 leading-snug mt-1 truncate" title={metrics.lastUnlocked.name}>
                  {metrics.lastUnlocked.name}
                </h4>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className={`text-[8.5px] px-1.5 py-0.5 rounded-md font-extrabold font-mono uppercase tracking-wider ${getCategoryStyles(metrics.lastUnlocked.category).bg}`}>
                    {metrics.lastUnlocked.category}
                  </span>
                  <span className="text-[9.5px] text-slate-400 font-bold">• 27/05/2026</span>
                </div>
              </div>
            </>
          )}
        </div>

      </div>

      {/* Dynamic breakdown metrics & Category selection bar */}
      <div className="bg-white border border-slate-150 rounded-2xl p-5 shadow-sm shadow-slate-100">
        <h3 className="text-xs font-black text-slate-700 uppercase tracking-widest font-mono mb-4">
          Métricas de Conquistas por Categoria
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5 select-none">
          {[
            { tag: 'Inteligência Artificial', icon: Cpu, count: metrics.categoryCounts['Inteligência Artificial'], color: 'from-purple-500 to-indigo-600', text: 'text-purple-600', bg: 'bg-purple-50' },
            { tag: 'Engenharia de Prompt', icon: Target, count: metrics.categoryCounts['Engenharia de Prompt'], color: 'from-emerald-500 to-teal-600', text: 'text-emerald-600', bg: 'bg-emerald-50' },
            { tag: 'Vendas', icon: TrendingUp, count: metrics.categoryCounts['Vendas'], color: 'from-orange-500 to-amber-500', text: 'text-orange-600', bg: 'bg-orange-50' },
            { tag: 'Bootcamp', icon: Trophy, count: metrics.categoryCounts['Bootcamp'], color: 'from-red-500 to-rose-600', text: 'text-red-600', bg: 'bg-red-50' },
            { tag: 'Ferramentas IA', icon: BookOpen, count: metrics.categoryCounts['Ferramentas IA'], color: 'from-blue-500 to-sky-600', text: 'text-blue-600', bg: 'bg-blue-50' }
          ].map((item) => (
            <div key={item.tag} className="flex flex-col justify-between p-3.5 rounded-xl border border-slate-100 bg-slate-50/20 hover:bg-slate-50 hover:border-slate-200 transition-colors">
              <div className="flex items-center justify-between gap-1.5">
                <span className={`p-1.5 rounded-lg ${item.bg}`}>
                  <item.icon className={`w-4 h-4 ${item.text}`} />
                </span>
                <span className="text-base font-black text-slate-800 font-mono">{item.count}</span>
              </div>
              <div className="mt-3">
                <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider font-mono block truncate" title={item.tag}>
                  {item.tag === 'Inteligência Artificial' ? 'Int. Artificial' : item.tag}
                </span>
                <div className="w-full bg-slate-100 rounded-full h-1 mt-1.5 overflow-hidden">
                  <div 
                    className={`h-full bg-gradient-to-r ${item.color} rounded-full`}
                    style={{ width: `${(item.count / metrics.total) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filter Selector tabs */}
      <div className="flex items-center justify-between border-b border-slate-150 pb-2">
        <div className="flex flex-wrap gap-1.5">
          {[
            { id: 'all', label: 'Todas', count: metrics.total },
            { id: 'ia', label: 'IA & Ferramentas', count: metrics.categoryCounts['Inteligência Artificial'] + metrics.categoryCounts['Ferramentas IA'] },
            { id: 'prompt', label: 'Prompt Engineering', count: metrics.categoryCounts['Engenharia de Prompt'] },
            { id: 'vendas', label: 'Vendas', count: metrics.categoryCounts['Vendas'] },
            { id: 'bootcamp', label: 'Bootcamp', count: metrics.categoryCounts['Bootcamp'] }
          ].map((tab) => {
            const isSelected = filterCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setFilterCategory(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold font-sans transition-all cursor-pointer flex items-center gap-1.5 ${
                  isSelected 
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/15'
                    : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`text-[9px] px-1.5 py-0.2 rounded-md font-mono ${isSelected ? 'bg-blue-500 text-blue-100' : 'bg-slate-100 text-slate-500'}`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>
        
        <div className="text-[11px] text-slate-400 font-bold font-mono">
          Mostrando {filteredAchievements.length} conquistas
        </div>
      </div>

      {/* Section: Últimas Conquistas - Premium highlight strip */}
      {filterCategory === 'all' && searchQuery === '' && (
        <div className="space-y-3.5">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-orange-500 shrink-0" />
            <h3 className="text-xs font-black text-slate-700 uppercase tracking-widest font-mono">
              Últimas Conquistas Desbloqueadas
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 select-none">
            {parsedAchievements.slice(0, 3).map((item, idx) => {
              const styles = getCategoryStyles(item.category);
              return (
                <div 
                  key={`latest-${idx}`} 
                  className="bg-white rounded-2xl border border-slate-150 p-4 shadow-sm shadow-slate-100 flex items-center gap-3 relative overflow-hidden group hover:shadow-md transition-all duration-350"
                >
                  <div className="absolute right-0 top-0 w-12 h-12 bg-gradient-to-bl from-blue-500/5 to-transparent rounded-bl-full"></div>
                  <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 shrink-0 flex items-center justify-center p-1 group-hover:scale-105 transition-transform">
                    <img 
                      src={item.badgeUrl} 
                      alt={item.name} 
                      className="w-full h-full object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[8px] text-blue-600 font-extrabold uppercase font-mono tracking-wider flex items-center gap-1 leading-none">
                      <CheckCircle2 className="w-2.5 h-2.5 text-blue-500" /> RECONHECIMENTO {idx === 0 ? 'MAIS RECENTE' : ''}
                    </span>
                    <h4 className="text-xs font-black text-slate-800 leading-snug mt-1 truncate" title={item.name}>
                      {item.name}
                    </h4>
                    <span className={`text-[8px] px-1.5 py-0.2 rounded-md font-extrabold font-mono uppercase tracking-wider block w-fit mt-1 ${styles.bg}`}>
                      {item.category}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Main Grid: Comprehensive Badges Grid */}
      <div className="space-y-3.5">
        <div className="flex items-center gap-2">
          <Grid className="w-4 h-4 text-blue-500" />
          <h3 className="text-xs font-black text-slate-700 uppercase tracking-widest font-mono">
            Repositório Completo de Badges ({filteredAchievements.length})
          </h3>
        </div>

        {filteredAchievements.length === 0 ? (
          <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl p-12 text-center select-none">
            <Trophy className="w-10 h-10 text-slate-300 mx-auto mb-2.5" />
            <h4 className="text-sm font-bold text-slate-600">Nenhuma conquista correspondente encontrada</h4>
            <p className="text-xs text-slate-400 mt-1">Gostaria de redefinir sua pesquisa por termos ou filtros?</p>
            <button 
              onClick={() => { setFilterCategory('all'); setSearchQuery(''); }}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-semibold hover:bg-blue-700 transition-colors cursor-pointer"
            >
              Resetar Filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {filteredAchievements.map((item, index) => {
              const styles = getCategoryStyles(item.category);
              
              return (
                <div 
                  key={index} 
                  className="bg-white rounded-2xl border border-slate-200/60 p-4 shadow-sm shadow-slate-100 hover:shadow-lg hover:shadow-slate-200/50 hover:border-blue-200 transition-all duration-300 flex flex-col justify-between items-center text-center relative overflow-hidden group select-none cursor-pointer"
                >
                  {/* Decorative Subtle glow for Desbloqueada */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${styles.themeColor}`} />
                  
                  {/* Active lock status badge top-right */}
                  <div className="absolute top-3.5 right-3.5 flex items-center gap-1 bg-green-500/10 border border-green-500/20 px-1.5 py-0.5 rounded-full select-none">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-sm shadow-green-500/50 animate-pulse"></span>
                    <span className="text-[7.5px] font-black uppercase text-green-600 tracking-wider font-mono">Conquistado</span>
                  </div>

                  {/* Badge Illustration */}
                  <div className="w-20 h-20 rounded-xl bg-slate-50 border border-slate-100/80 flex items-center justify-center p-1.5 relative mt-4 mb-3 transition-transform duration-350 group-hover:scale-110 group-hover:rotate-1">
                    <img 
                      src={item.badgeUrl} 
                      alt={item.name} 
                      className="w-full h-full object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Meta Label Info */}
                  <div className="w-full">
                    <span className={`text-[8px] px-1.5 py-0.5 rounded-md font-extrabold font-mono uppercase tracking-wider block w-fit mx-auto ${styles.bg}`}>
                      {item.category}
                    </span>
                    
                    <h4 className="text-xs font-black text-slate-750 font-sans tracking-tight leading-snug mt-2 text-center group-hover:text-blue-600 transition-colors line-clamp-2 h-9 px-1">
                      {item.name}
                    </h4>
                  </div>

                  {/* Indicator Footer block */}
                  <div className="w-full border-t border-slate-50 mt-3 pt-2.5 flex items-center justify-between text-slate-450 text-[10px] font-bold font-mono">
                    <span className="font-semibold text-[9px] text-slate-400">{item.indicator}</span>
                    <span className="text-blue-600 font-extrabold text-[9.5px]">27/05/2026</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
}
