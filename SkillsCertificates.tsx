/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  ExternalLink, 
  Map, 
  Database, 
  BarChart3, 
  ShieldCheck, 
  TrendingUp, 
  Sparkles, 
  ChevronRight, 
  FileCode, 
  ListTodo, 
  HelpCircle,
  Eye,
  EyeOff,
  Maximize2,
  RefreshCw,
  Award,
  Layers,
  CheckCircle2,
  Lock
} from 'lucide-react';

interface DashboardItem {
  id: string;
  title: string;
  description: string;
  url: string;
  type: string;
  badge: string;
  themeColor: string;
  accentColor: string;
  bgColor: string;
  iconBg: string;
  technologies: string[];
  keyFeatures: {
    title: string;
    details: string;
    icon: React.ComponentType<any>;
  }[];
  highlights: string[];
}

export default function MyDashboards() {
  const [activePreview, setActivePreview] = useState<string | null>(null);
  const [iframeKey, setIframeKey] = useState<number>(0);

  const dashboards: DashboardItem[] = [
    {
      id: 'cpm-bahia',
      title: 'CPM Bahia — Sistema de Gestão de Projetos',
      description: 'Plataforma administrativa robusta integrada para controle de empenhos, alocações orçamentárias, mapeamento geográfico e acompanhamento de projetos ativos nos Centros de Profissionalização Militar da Bahia.',
      url: 'https://gestaodeprojetoscpm.netlify.app/',
      type: 'SaaS / Governamental',
      badge: 'Gestão Inteligente',
      themeColor: 'indigo',
      accentColor: 'text-indigo-600 border-indigo-200 bg-indigo-50 hover:bg-indigo-100',
      bgColor: 'from-indigo-50/50 via-white to-blue-50/10',
      iconBg: 'bg-emerald-50 border-emerald-150 text-emerald-600',
      technologies: ['Leaflet.js', 'Chart.js', 'XOR Cipher', 'CSS Custom Variables', 'HTML5 ES6+', 'Local Storage Encryption'],
      keyFeatures: [
        {
          title: 'Mapeamento Interativo (Leaflet.js)',
          details: 'Localização georreferenciada das 16 unidades ativas da Bahia com popups detalhados contendo investimentos totais, contatos e projetos vigentes.',
          icon: Map
        },
        {
          title: 'Métricas e Gráficos Inteligentes (Chart.js)',
          details: 'Gráficos empilhados orçamentários divididos por categoria profissional (Monitor vs. Instrutor) e alocações de recursos totais.',
          icon: BarChart3
        },
        {
          title: 'Sistema de Autenticação com Criptografia Local',
          details: 'Camada de proteção por senha codificada com algoritmos XOR de base customizada e armazenamento seguro das credenciais em chaves criptografadas no localStorage.',
          icon: Lock
        },
        {
          title: 'Módulo de Gestão Administrativa de Usuários',
          details: 'Tela restrita que permite a administradores gerenciar usuários com comandos para cadastro, redefinição de senhas, ativação/desativação e exclusão.',
          icon: ShieldCheck
        }
      ],
      highlights: [
        'Organização de 74+ projetos divididos em áreas como Esporte, Ciências Humanas/Natureza e Tecnologia.',
        'Controle financeiro preciso somando investimentos de R$ 181.590,00.',
        'Desenvolvimento Responsivo otimizado para navegação móvel (Mobile first).',
        'Filtros inteligentes por categoria e por unidades com busca rápida em frações de segundo.'
      ]
    },
    {
      id: 'gilnar-consorcio',
      title: 'Dashboard Consórcio — Gilnar Couto',
      description: 'Cockpit financeiro avançado projetado para investidores de consórcios premium, centralizando performance de vendas, rentabilidade preditiva das cotas e conciliação em tempo real.',
      url: 'https://dashboardgilnar.netlify.app/',
      type: 'FinTech / Executive Cockpit',
      badge: 'Métricas Real-Time',
      themeColor: 'blue',
      accentColor: 'text-blue-600 border-blue-200 bg-blue-50 hover:bg-blue-100',
      bgColor: 'from-slate-900 via-slate-950 to-blue-950/20',
      iconBg: 'bg-blue-50 border-blue-150 text-blue-600',
      technologies: ['Google Sheets CSV API', 'CORS Real-time Sync', 'HTML5 Canvas Gauge', 'Executive Cockpit', 'Predictive Analysis', 'Chart.js'],
      keyFeatures: [
        {
          title: 'Alimentação Real-Time com Google Planilhas',
          details: 'Integração de leitura/gravação ao vivo com o Google Sheets via API de publicação de CSVs, permitindo atualizações automáticas e fallback off-line.',
          icon: Database
        },
        {
          title: 'Painel KPI e Tendências Preditivas',
          details: 'Acompanhamento automático do lucro consolidado, ticket médio de cotas vendidas, receita potencial, metas mensais e evolução percentual.',
          icon: TrendingUp
        },
        {
          title: 'Medidor de Metas e Alertas Inteligentes',
          details: 'Efeitos visuais fluidos em HTML5 Canvas para mostrar o alcance da meta de lucro, acompanhado de avisos preditivos automatizados sobre rendimento.',
          icon: Sparkles
        },
        {
          title: 'Relatório Executivo por Filtros Dinâmicos',
          details: 'Gráficos interativos para Margem de Lucro por administradora, Receita vs. Custos, evolução mensal e rankings de rentabilidade individual.',
          icon: BarChart3
        }
      ],
      highlights: [
        'Análise de rendimento focada em cotas contempladas, vendidas e em prospecção.',
        'Cálculos dinâmicos e precisos de lucratividade e estimativa de retorno (ROI líquido).',
        'Dashboard de relatórios unificado com dados de faturamento e taxas de conversão.',
        'Tema Dark futurista elegante projetado com foco em leitura confortável (' + 'Eye-comfortable' + ').'
      ]
    }
  ];

  const handleRefreshIframe = () => {
    setIframeKey(prev => prev + 1);
  };

  return (
    <div className="grain-bg p-4 sm:p-6 lg:p-8 space-y-8 min-h-full font-sans select-none animate-in fade-in duration-300">
      
      {/* Sub-Header Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-200 pb-5 gap-4">
        <div>
          <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest font-mono block mb-1">
            Desenvolvimentos Especiais
          </span>
          <h2 className="text-xl sm:text-2xl font-bold font-sora text-slate-800 tracking-tight">
            Meus Dashboards Ao Vivo
          </h2>
        </div>
        
        <div className="flex items-center gap-2 text-xs text-slate-500 bg-white border border-slate-200/80 px-3 py-1.5 rounded-xl shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-indigo-500 animate-pulse" />
          <span>Aplicações interativas online</span>
        </div>
      </div>

      {/* Main Grid: Card Showcases */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {dashboards.map((dash) => (
          <div 
            key={dash.id}
            className="bg-white border border-slate-200/60 rounded-3xl p-6 sm:p-7 shadow-sm hover:shadow-lg hover:border-slate-300/80 transition-all duration-300 flex flex-col justify-between relative overflow-hidden group border-t-[3px] border-t-indigo-600 shadow-[inset_0_1px_2px_rgba(255,255,255,1),0_4px_24px_-4px_rgba(0,0,0,0.02)]"
          >
            {/* Top Identity Block */}
            <div>
              <div className="flex items-start justify-between gap-4 mb-4">
                <span className="text-[9px] text-[#4F46E5] bg-indigo-50 border border-indigo-100 font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider font-mono">
                  {dash.type}
                </span>
                <span className="text-[9px] text-emerald-600 bg-emerald-50 border border-emerald-100 font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider font-mono">
                  {dash.badge}
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-bold font-sora text-slate-800 tracking-tight leading-snug mb-3">
                {dash.title}
              </h3>

              <p className="text-xs sm:text-[13px] text-slate-500 leading-relaxed font-normal mb-6">
                {dash.description}
              </p>

              {/* Grid of Key Features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {dash.keyFeatures.map((feat, index) => {
                  const Icon = feat.icon;
                  return (
                    <div key={index} className="flex gap-3 bg-slate-50/60 border border-slate-100 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                      <div className="w-7 h-7 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0 mt-0.5 shadow-sm">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-[11px] font-bold font-sora text-slate-800 tracking-tight">
                          {feat.title}
                        </h4>
                        <p className="text-[10px] text-slate-550 leading-normal mt-0.5">
                          {feat.details}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Technologies Badge Group */}
              <div className="mb-6">
                <h4 className="text-[10px] text-slate-400 font-bold uppercase tracking-wider font-mono mb-2">
                  Especificações / Stack
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {dash.technologies.map((tech) => (
                    <span 
                      key={tech}
                      className="text-[9px] bg-slate-100 border border-slate-200 text-slate-600 px-2 py-0.5 rounded-md font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bullet highlights list */}
              <div className="border-t border-slate-100 pt-4 mb-6">
                <h4 className="text-[10px] text-slate-400 font-bold uppercase tracking-wider font-mono mb-2">
                  Resultados & Funcionalidades
                </h4>
                <ul className="space-y-1.5">
                  {dash.highlights.map((high, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-[11px] text-slate-650 leading-relaxed font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{high}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom Buttons Row */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-100/80 items-stretch sm:items-center justify-between shrink-0">
              <button
                onClick={() => {
                  if (activePreview === dash.id) {
                    setActivePreview(null);
                  } else {
                    setActivePreview(dash.id);
                    setIframeKey(prev => prev + 1);
                  }
                }}
                className={`flex-1 sm:flex-none flex items-center justify-center gap-2 text-xs font-bold px-4 py-2.5 rounded-xl cursor-pointer shadow-sm transition-all duration-200 ${
                  activePreview === dash.id
                    ? 'bg-slate-800 text-white hover:bg-slate-900 shadow-md'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-100'
                }`}
              >
                {activePreview === dash.id ? (
                  <>
                    <EyeOff className="w-4 h-4 shrink-0" />
                    <span>Fechar Preview</span>
                  </>
                ) : (
                  <>
                    <Eye className="w-4 h-4 shrink-0" />
                    <span>Testar Preview Integrado</span>
                  </>
                )}
              </button>

              <a
                href={dash.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 text-xs font-bold text-slate-650 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 px-4 py-2.5 rounded-xl cursor-pointer transition-colors shadow-xs"
              >
                <span>Acessar no Netlify (Nova aba)</span>
                <ExternalLink className="w-3.5 h-3.5 shrink-0" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Embedded Iframe Preview Area */}
      {activePreview && (
        <div className="bg-white border border-slate-200 rounded-3xl p-4 sm:p-5 shadow-md space-y-4 animate-in slide-in-from-bottom duration-300">
          <div className="flex items-center justify-between gap-4 flex-wrap border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 absolute" />
              <div className="min-w-0">
                <h4 className="text-xs sm:text-sm font-bold font-sora text-slate-800 truncate">
                  Visualização Interativa: {dashboards.find(d => d.id === activePreview)?.title}
                </h4>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  Interaja diretamente com o dashboard desenvolvido na sandbox abaixo.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleRefreshIframe}
                className="p-2 hover:bg-slate-100 border border-slate-200 hover:border-slate-300 text-slate-500 hover:text-slate-800 rounded-xl cursor-pointer transition-all duration-200 group"
                title="Recarregar aplicação"
              >
                <RefreshCw className="w-3.5 h-3.5 group-hover:rotate-45 transition-transform" />
              </button>

              <a
                href={dashboards.find(d => d.id === activePreview)?.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:bg-slate-100 border border-slate-200 hover:border-slate-300 text-slate-500 hover:text-slate-800 rounded-xl cursor-pointer transition-all duration-200"
                title="Abrir em Nova Aba"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={() => setActivePreview(null)}
                className="px-3.5 py-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 hover:bg-slate-100 border border-slate-200 rounded-xl cursor-pointer transition-colors"
              >
                Fechar
              </button>
            </div>
          </div>

          <div className="relative w-full rounded-2xl overflow-hidden border border-slate-200 shadow-inner bg-slate-900 h-[650px]">
            <iframe 
              key={`${activePreview}-${iframeKey}`}
              src={dashboards.find(d => d.id === activePreview)?.url}
              className="w-full h-full border-none"
              title="Dashboard Preview"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            />
          </div>
        </div>
      )}

      {/* Quick FAQ / Portfolio Notice */}
      <div className="bg-gradient-to-br from-indigo-50/40 via-white to-blue-50/10 border border-slate-200/50 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row gap-5 items-start">
        <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0 shadow-sm mt-0.5">
          <HelpCircle className="w-5 h-5 animate-pulse" />
        </div>
        <div className="min-w-0">
          <h4 className="text-[13px] font-bold font-sora text-slate-800 tracking-tight mb-1">
            Sobre o Desenvolvimento destes Sistemas
          </h4>
          <p className="text-xs text-slate-550 leading-relaxed font-normal">
            Gostaria de ressaltar que ambas as aplicações foram pensadas e desenhadas focado no alto rendimento operacional, aliando excelentes experiências visuais com funcionalidades reais, dinâmicas e funcionais (tais como conexão com planilhas externas do Excel/Sheets em tempo real, mapas interativos Leaflet, gráficos densos com filtros de performance no próprio dispositivo e segurança em transações de dados locais).
          </p>
        </div>
      </div>

    </div>
  );
}
