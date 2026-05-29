/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  GraduationCap, 
  Search, 
  CheckCircle, 
  Flame, 
  BookOpen, 
  Filter, 
  RefreshCw, 
  Calculator, 
  AlertTriangle,
  Info
} from 'lucide-react';
import { academicCourses } from '../data';
import { Subject, SubjectStatus } from '../types';

export default function AcademicViewer() {
  const [selectedCourseId, setSelectedCourseId] = useState<'gfin' | 'adm'>('gfin');
  const [statusFilter, setStatusFilter] = useState<'all' | 'Aprovado' | 'em Curso' | 'a Cursar'>('all');
  const [showCriticalOnly, setShowCriticalOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Simulation State for grades of in-progress or planned subjects
  const [simulationScores, setSimulationScores] = useState<Record<string, number>>({});

  // Active Course data
  const activeCourse = useMemo(() => {
    return academicCourses.find(c => c.id === selectedCourseId)!;
  }, [selectedCourseId]);

  // Reset critical filters when changing courses
  const handleCourseChange = (id: 'gfin' | 'adm') => {
    setSelectedCourseId(id);
    setStatusFilter('all');
    setShowCriticalOnly(false);
    setSearchQuery('');
  };

  // Extract flat list of subjects for filtering and statistics
  const flatSubjects = useMemo(() => {
    return activeCourse.etapas.flatMap(etapa => 
      etapa.subjects.map(sub => ({ ...sub, etapaNum: etapa.etapa }))
    );
  }, [activeCourse]);

  // Filtered subjects
  const filteredSubjects = useMemo(() => {
    return flatSubjects.filter(sub => {
      const matchesSearch = sub.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            sub.code.includes(searchQuery);
      const matchesStatus = statusFilter === 'all' || sub.status === statusFilter;
      const matchesCritical = !showCriticalOnly || sub.reprovadoAnteriormente === true;

      return matchesSearch && matchesStatus && matchesCritical;
    });
  }, [flatSubjects, searchQuery, statusFilter, showCriticalOnly]);

  // Real Average Grade (Excluding planned/in progress classes unless simulated)
  const realGrades = useMemo(() => {
    return flatSubjects.filter(sub => sub.status === 'Aprovado' && sub.media !== undefined);
  }, [flatSubjects]);

  const realAverage = useMemo(() => {
    if (realGrades.length === 0) return 0;
    const sum = realGrades.reduce((acc, curr) => acc + (curr.media || 0), 0);
    return sum / realGrades.length;
  }, [realGrades]);

  // Simulated Average (Real grades + Simulated grades for other classes)
  const simulatedAverage = useMemo(() => {
    let totalScore = 0;
    let countedClasses = 0;

    flatSubjects.forEach(sub => {
      if (sub.status === 'Aprovado' && sub.media !== undefined) {
        totalScore += sub.media;
        countedClasses++;
      } else if (simulationScores[sub.code] !== undefined) {
        totalScore += simulationScores[sub.code];
        countedClasses++;
      }
    });

    if (countedClasses === 0) return 0;
    return totalScore / countedClasses;
  }, [flatSubjects, simulationScores]);

  // Count items for statistics cards
  const courseStats = useMemo(() => {
    let approved = 0;
    let inProgress = 0;
    let toTake = 0;
    let approvedCh = 0;
    let totalCh = 0;

    flatSubjects.forEach(sub => {
      totalCh += sub.ch;
      if (sub.status === 'Aprovado') {
        approved++;
        approvedCh += sub.ch;
      } else if (sub.status === 'em Curso') {
        inProgress++;
      } else {
        toTake++;
      }
    });

    return { approved, inProgress, toTake, total: flatSubjects.length, approvedCh, totalCh };
  }, [flatSubjects]);

  const handleSimulatedScoreChange = (code: string, val: string) => {
    const score = val === '' ? undefined : Math.min(10, Math.max(0, parseFloat(val) || 0));
    setSimulationScores(prev => {
      const updated = { ...prev };
      if (score === undefined) {
        delete updated[code];
      } else {
        updated[code] = score;
      }
      return updated;
    });
  };

  const clearSimulation = () => {
    setSimulationScores({});
  };

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
      
      {/* Course Selector Tabs */}
      <div className="bg-white rounded-2xl border border-slate-150 p-1 flex flex-col sm:flex-row shadow-sm max-w-2xl mx-auto gap-1">
        <button
          onClick={() => handleCourseChange('gfin')}
          className={`flex-1 py-2.5 sm:py-3 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer ${
            selectedCourseId === 'gfin'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-500/15'
              : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          <span>Gestão Financeira (Tecnólogo)</span>
        </button>
        <button
          onClick={() => handleCourseChange('adm')}
          className={`flex-1 py-2.5 sm:py-3 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer ${
            selectedCourseId === 'adm'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-500/15'
              : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          <span>Administração (Bacharelado)</span>
        </button>
      </div>

      {/* Grid: Course Header Info & General stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Info Card */}
        <div className="bg-white rounded-2xl border border-slate-150 p-5 shadow-sm shadow-slate-100 lg:col-span-1">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest font-mono">Ficha de Matrícula</span>
          <h3 className="text-base font-extrabold text-slate-800 mt-1">{activeCourse.name}</h3>
          
          <dl className="mt-4 space-y-2.5 text-xs font-semibold">
            <div className="flex items-center justify-between py-1.5 border-b border-slate-50">
              <dt className="text-slate-400 font-medium">Turma/Código</dt>
              <dd className="text-slate-800 font-mono">{activeCourse.classGroup}</dd>
            </div>
            <div className="flex items-center justify-between py-1.5 border-b border-slate-50">
              <dt className="text-slate-400 font-medium">Currículo Ativo</dt>
              <dd className="text-slate-800 font-mono">{activeCourse.curriculum}</dd>
            </div>
            <div className="flex items-center justify-between py-1.5 border-b border-slate-50">
              <dt className="text-slate-400 font-medium">Situação Acadêmica</dt>
              <dd className="text-green-600 font-semibold flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>{activeCourse.situation}</span>
              </dd>
            </div>
            <div className="flex items-center justify-between py-1.5 border-b border-slate-50">
              <dt className="text-slate-400 font-medium">Previsão Conclusão</dt>
              <dd className="text-slate-800 font-mono">{activeCourse.expectedConclusion}</dd>
            </div>
            <div className="flex items-center justify-between pt-1.5">
              <dt className="text-slate-400 font-medium">Carga Cumprida</dt>
              <dd className="text-slate-800 font-mono">{activeCourse.completedHours}h de {courseStats.totalCh}h</dd>
            </div>
          </dl>
        </div>

        {/* Dynamic Calculator & CR Simulator Box */}
        <div className="bg-gradient-to-tr from-slate-900 to-slate-800 text-white rounded-2xl p-5 shadow-lg shadow-slate-950/10 lg:col-span-2 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calculator className="w-4 h-4 text-blue-400" />
                <h4 className="text-sm font-bold tracking-tight">Simulador Dinâmico de CR (Médias)</h4>
              </div>
              {Object.keys(simulationScores).length > 0 && (
                <button 
                  onClick={clearSimulation}
                  className="text-[10px] text-blue-300 hover:text-blue-200 flex items-center gap-1 font-semibold font-mono"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Limpar</span>
                </button>
              )}
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              Veja o impacto de novas notas no coeficiente acumulado inteirando as disciplinas futuras. Digite suas previsões nos campos no checklist da grade escolar para recalcular as médias dinamicamente.
            </p>

            {/* Simulated Score metrics */}
            <div className="grid grid-cols-2 gap-4 pt-3">
              <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
                <span className="text-[9px] text-slate-400 font-extrabold uppercase tracking-wider font-mono">Média Real Atual</span>
                <div className="text-xl font-black text-slate-100 tracking-tight mt-1">{realAverage.toFixed(2)}</div>
                <span className="text-[9px] text-slate-400 block mt-0.5">({realGrades.length} matérias concluídas)</span>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-3 text-center relative overflow-hidden">
                <div className="absolute right-0 top-0 translate-x-2 -translate-y-2 w-10 h-10 rounded-full bg-blue-400/10 shrink-0"></div>
                <span className="text-[9px] text-blue-400 font-extrabold uppercase tracking-wider font-mono">CR Final Previsto</span>
                <div className="text-xl font-black text-blue-400 tracking-tight mt-1">{simulatedAverage.toFixed(2)}</div>
                <span className="text-[9px] text-blue-300 block mt-0.5">
                  {Object.keys(simulationScores).length > 0 
                    ? `Simulando +${Object.keys(simulationScores).length} matérias`
                    : 'Ajuste notas abaixo para simular'}
                </span>
              </div>
            </div>
          </div>

          <div className="text-[10px] text-slate-400 font-mono mt-4 flex items-center gap-2 bg-slate-950/20 p-2.5 rounded-lg border border-slate-700/30">
            <Info className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>Média calculada para aprovação do curso é 7.0 corporativo.</span>
          </div>
        </div>

      </div>

      {/* Grade Filters panel */}
      <div className="bg-white rounded-2xl border border-slate-150 p-4 shadow-sm shadow-slate-100 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 z-10">
        
        {/* Search inside courses */}
        <div className="relative flex-1 max-w-sm">
          <input
            type="text"
            placeholder="Pesquisar matéria por nome ou código..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-4 py-2 fill-slate-500 text-slate-700 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/25 transition-all font-medium"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
        </div>

        {/* Filter controls */}
        <div className="flex flex-wrap items-center gap-3">
          
          {/* Status buttons */}
          <div className="flex bg-slate-100 rounded-lg p-0.5 border border-slate-150 text-slate-600 font-semibold text-xs">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                statusFilter === 'all' ? 'bg-white shadow-sm text-slate-800' : 'hover:text-slate-800'
              }`}
            >
              Todas ({courseStats.total})
            </button>
            <button
              onClick={() => setStatusFilter('Aprovado')}
              className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                statusFilter === 'Aprovado' ? 'bg-white shadow-sm text-slate-800' : 'hover:text-slate-800'
              }`}
            >
              Aprovadas ({courseStats.approved})
            </button>
            <button
              onClick={() => setStatusFilter('em Curso')}
              className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                statusFilter === 'em Curso' ? 'bg-white shadow-sm text-slate-800' : 'hover:text-slate-800'
              }`}
            >
              Em Curso ({courseStats.inProgress})
            </button>
            <button
              onClick={() => setStatusFilter('a Cursar')}
              className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                statusFilter === 'a Cursar' ? 'bg-white shadow-sm text-slate-800' : 'hover:text-slate-800'
              }`}
            >
              A Cursar ({courseStats.toTake})
            </button>
          </div>

          {/* Highlight reprovados (**) button */}
          <button
            onClick={() => setShowCriticalOnly(!showCriticalOnly)}
            className={`px-3 py-2 text-xs font-bold rounded-lg border transition-all flex items-center gap-1.5 cursor-pointer ${
              showCriticalOnly
                ? 'bg-red-50 border-red-200 text-red-600 shadow-sm'
                : 'bg-white border-slate-200 text-slate-500 hover:text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Flame className={`w-3.5 h-3.5 ${showCriticalOnly ? 'animate-pulse text-red-500' : ''}`} />
            <span>Reprovados (**)</span>
          </button>

        </div>

      </div>

      {/* Academic Grid Layout organized by Etapas */}
      {filteredSubjects.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-150 p-12 text-center shadow-sm max-w-xl mx-auto">
          <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h4 className="font-bold text-slate-700">Nenhum resultado encontrado</h4>
          <p className="text-xs text-slate-400 mt-1">Gostaria de redefinir ou limpar os filtros de busca acadêmica?</p>
          <button 
            onClick={() => { setStatusFilter('all'); setShowCriticalOnly(false); setSearchQuery(''); }}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-semibold hover:bg-blue-700 transition-colors cursor-pointer"
          >
            Resetar Filtros
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredSubjects.map((sub) => {
            const isApproved = sub.status === 'Aprovado';
            const isInCourse = sub.status === 'em Curso';
            const isToTake = sub.status === 'a Cursar';
            const hasScore = simulationScores[sub.code] !== undefined;
            const scoreToRender = isApproved ? sub.media : simulationScores[sub.code];

            return (
              <div 
                key={sub.code} 
                className={`group bg-white border rounded-2xl p-4.5 shadow-sm shadow-slate-100/50 hover:shadow-md transition-all flex flex-col justify-between ${
                  sub.reprovadoAnteriormente 
                    ? 'border-red-100 bg-red-50/10 hover:border-red-200' 
                    : isInCourse 
                    ? 'border-amber-100 bg-amber-50/10 hover:border-amber-200'
                    : 'border-slate-150 hover:border-slate-300'
                }`}
              >
                {/* Upper line: code & etapa & status badge */}
                <div>
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="font-mono font-bold text-slate-400 bg-slate-50 border border-slate-100 px-1.5 py-0.5 rounded">
                      Cód. {sub.code}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-slate-400 font-mono">Etapa {sub.etapaNum}</span>
                      <span className={`w-2 h-2 rounded-full ${
                        isApproved ? 'bg-green-500' : isInCourse ? 'bg-amber-400' : 'bg-slate-300'
                      }`}></span>
                    </div>
                  </div>

                  {/* Class Name */}
                  <h4 className="text-xs font-extrabold text-slate-700 leading-snug mt-2.5 group-hover:text-blue-600 transition-colors font-sans line-clamp-2 h-9">
                    {sub.name}
                  </h4>
                </div>

                {/* Bottom line: C.H. & Grades/Simulator input */}
                <div className="mt-4 pt-3 border-t border-slate-50 flex items-center justify-between gap-2">
                  <div className="text-[10px] text-slate-400 font-semibold font-mono">
                    C.H. {sub.ch}h
                  </div>

                  {/* Media display or Simulation inputs */}
                  <div className="shrink-0 flex items-center gap-2">
                    
                    {/* Render score if present (real or simulated) */}
                    {scoreToRender !== undefined && (
                      <div className="text-right">
                        <span className="text-[9px] text-slate-400 font-bold block leading-none">Média</span>
                        <span className={`text-xs font-black font-mono inline-block mt-0.5 ${
                          scoreToRender >= 7.0 ? 'text-green-600' : 'text-red-500'
                        }`}>
                          {scoreToRender.toFixed(1)}
                        </span>
                      </div>
                    )}

                    {/* Frequency (Aprovado only) */}
                    {isApproved && sub.frequency && (
                      <div className="text-right border-l border-slate-100 pl-2">
                        <span className="text-[9px] text-slate-400 font-bold block leading-none">Freq.</span>
                        <span className="text-xs font-black text-slate-600 font-mono inline-block mt-0.5">{sub.frequency}%</span>
                      </div>
                    )}

                    {/* Simulation input for Uncompleted classes */}
                    {!isApproved && (
                      <div className="flex items-center gap-1 border-l border-slate-100 pl-2">
                        <span className="text-[9px] text-slate-400 font-bold hidden xs:block">Simular:</span>
                        <input
                          type="number"
                          step="0.1"
                          min="0"
                          max="10"
                          placeholder="Nota"
                          value={simulationScores[sub.code] ?? ''}
                          onChange={(e) => handleSimulatedScoreChange(sub.code, e.target.value)}
                          className={`w-11 text-center font-mono text-[11px] h-6 px-1 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500/40 text-slate-700 ${
                            hasScore ? 'border-blue-300 bg-blue-50 font-bold' : 'border-slate-200 bg-slate-50'
                          }`}
                        />
                      </div>
                    )}

                    {/* Status Text overlay for planned classes */}
                    {isToTake && !hasScore && (
                      <span className="text-[9px] bg-slate-50 text-slate-400 font-extrabold font-mono border border-slate-100 px-1.5 py-0.5 rounded tracking-wide leading-none">
                        A CURSAR
                      </span>
                    )}

                    {isInCourse && !hasScore && (
                      <span className="text-[9px] bg-amber-50 text-amber-600 font-extrabold font-mono border border-amber-100 px-1.5 py-0.5 rounded tracking-wide leading-none animate-pulse">
                        EM CURSO
                      </span>
                    )}

                    {/* Critical reprovados warnings (**) badge */}
                    {sub.reprovadoAnteriormente && (
                      <div className="flex items-center justify-center w-5 h-5 bg-red-100 text-red-600 rounded-full cursor-help" title="Disciplina com reprovação anterior: Necessário cursar adaptação/reingresso (Representada por ** no Boletim)">
                        <AlertTriangle className="w-3.5 h-3.5 text-red-500" />
                      </div>
                    )}

                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
