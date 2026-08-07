import React from 'react';
import {
  ShieldCheck,
  Brain,
  FileCheck2,
  Cpu,
  ArrowRight,
  Zap,
  Sparkles,
  BarChart3,
  Layers,
  FileCode,
  UserCheck,
  Target,
  CheckCircle2,
  BookOpen,
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Card } from '../common/Card';
import { AnimatedCounter } from '../common/AnimatedCounter';
import { Badge, SeverityBadge } from '../common/Badge';
import { PROFILE_DATA } from '../../data/profileData';
import { FRAMEWORK_MODULES } from '../../data/defaultData';

export const HomeView: React.FC = () => {
  const { reports, setCurrentPage, navigateToReport, setActiveJsonModalContent } = useData();

  return (
    <div className="space-y-16 py-8">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-gradient-to-b from-white via-indigo-50/30 to-white dark:from-zinc-900 dark:via-zinc-900/90 dark:to-zinc-950 p-8 sm:p-12 shadow-sm">
        <div className="max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold text-xs border border-indigo-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Evaluation & LLM Safety Specialist</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight leading-tight">
            Production-Ready <span className="text-indigo-600 dark:text-indigo-400">AI Evaluator</span> Portfolio & Benchmarking Suite
          </h1>

          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal">
            {PROFILE_DATA.bio}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => setCurrentPage('reports')}
              className="px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm flex items-center gap-2 transition-all shadow-sm"
            >
              <FileCheck2 className="w-4 h-4" />
              <span>Explore Evaluation Case Studies</span>
            </button>

            <button
              type="button"
              onClick={() => setCurrentPage('methodology')}
              className="px-5 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-semibold text-sm flex items-center gap-2 transition-all shadow-sm"
            >
              <Brain className="w-4 h-4 text-indigo-500" />
              <span>Evaluation Methodology</span>
            </button>
          </div>
        </div>
      </section>

      {/* Statistics Counters Grid */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {PROFILE_DATA.statistics.map((stat, idx) => (
          <Card key={idx} className="p-6 space-y-2">
            <div className="flex items-center justify-between text-zinc-500 text-xs font-semibold uppercase">
              <span>{stat.label}</span>
              {idx === 0 && <Brain className="w-4 h-4 text-indigo-500" />}
              {idx === 1 && <Layers className="w-4 h-4 text-emerald-500" />}
              {idx === 2 && <Zap className="w-4 h-4 text-amber-500" />}
              {idx === 3 && <BarChart3 className="w-4 h-4 text-sky-500" />}
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-zinc-100 font-mono">
              {typeof stat.value === 'number' ? <AnimatedCounter value={stat.value} /> : stat.value}
            </div>
            <p className="text-xs text-zinc-500">{stat.description}</p>
          </Card>
        ))}
      </section>

      {/* Mission & Professional Values */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="p-8 space-y-4 border-l-4 border-l-indigo-600">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-sm uppercase tracking-wide">
            <Target className="w-4 h-4" />
            <span>Mission Statement</span>
          </div>
          <p className="text-sm sm:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed font-medium">
            "{PROFILE_DATA.missionStatement}"
          </p>
          <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 text-xs text-zinc-500">
            <strong>Current Focus:</strong> {PROFILE_DATA.currentFocus}
          </div>
        </Card>

        <Card className="p-8 space-y-4">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-sm uppercase tracking-wide">
            <UserCheck className="w-4 h-4" />
            <span>Professional Values</span>
          </div>
          <div className="space-y-3">
            {PROFILE_DATA.professionalValues.map((val, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-zinc-900 dark:text-zinc-100 block">{val.title}</span>
                  <span className="text-zinc-600 dark:text-zinc-400 text-xs">{val.description}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </section>

      {/* Core Competencies */}
      <section className="space-y-6">
        <div className="border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Core Technical Competencies
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 mt-1">
            Specialized skillsets across LLM benchmarking, safety red-teaming, RAG grounding, and prompt engineering.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PROFILE_DATA.coreCompetencies.map((comp, idx) => (
            <Card key={idx} className="p-6 space-y-3">
              <h3 className="text-sm font-bold text-indigo-600 dark:text-indigo-400">{comp.category}</h3>
              <ul className="space-y-1.5">
                {comp.skills.map((skill, sIdx) => (
                  <li key={sIdx} className="text-xs text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </section>

      {/* Framework Modules Section */}
      <section className="space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <div>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              Evaluation Framework Architecture
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 mt-1">
              Modular rubrics and metric taxonomies for automated model benchmarking.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setCurrentPage('framework')}
            className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
          >
            <span>View Full Rubric Taxonomy</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {FRAMEWORK_MODULES.map((mod) => (
            <Card key={mod.id} className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-mono text-xs font-bold border border-indigo-500/20">
                  {mod.code}
                </span>
                <span className="text-xs font-medium text-zinc-500">Weight: {mod.weighting}</span>
              </div>

              <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">{mod.name}</h3>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                {mod.description}
              </p>

              <div className="flex flex-wrap gap-1.5 pt-2">
                {mod.metricsList.map((m, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded text-[11px] bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-medium"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Featured Evaluation Reports */}
      <section className="space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <div>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              Featured AI Case Studies & Audit Reports
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 mt-1">
              Documented evaluation reports with transparent reasoning, scores, and recommendations.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setCurrentPage('reports')}
            className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
          >
            <span>Browse All 25 Reports</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reports.slice(0, 3).map((report) => (
            <Card
              key={report.id}
              className="p-6 flex flex-col justify-between space-y-4 hover:border-indigo-500/50 cursor-pointer transition-all"
              onClick={() => navigateToReport(report.id)}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant="info">{report.category}</Badge>
                  <SeverityBadge level={report.riskLevel} />
                </div>

                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  {report.title}
                </h3>

                <p className="text-xs text-zinc-600 dark:text-zinc-300 line-clamp-3 leading-relaxed">
                  {report.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs">
                <div>
                  <span className="text-zinc-400 block text-[10px]">Overall Score</span>
                  <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400 text-sm">
                    {report.overallScore}/100
                  </span>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveJsonModalContent({ title: report.title, json: report });
                  }}
                  className="px-2.5 py-1 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-300 font-medium text-[11px] flex items-center gap-1"
                >
                  <FileCode className="w-3 h-3 text-indigo-500" />
                  <span>View JSON</span>
                </button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Shortcuts */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 space-y-3 bg-gradient-to-br from-indigo-900/10 via-white to-white dark:from-indigo-950/40 dark:via-zinc-900 dark:to-zinc-900">
          <Cpu className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
            Prompt Engineering Laboratory
          </h3>
          <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
            20 prompt improvement experiments, parameter configurations, and pass-rate validations.
          </p>
          <button
            type="button"
            onClick={() => setCurrentPage('prompt-lab')}
            className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-semibold inline-flex items-center gap-1.5 hover:bg-indigo-700 transition-colors"
          >
            <span>Open Lab</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </Card>

        <Card className="p-6 space-y-3 bg-gradient-to-br from-emerald-900/10 via-white to-white dark:from-emerald-950/40 dark:via-zinc-900 dark:to-zinc-900">
          <Brain className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
          <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
            Research & Methodologies
          </h3>
          <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
            Formally classified taxonomies on RAG hallucination, multi-hop logic, and safety whitepapers.
          </p>
          <button
            type="button"
            onClick={() => setCurrentPage('research')}
            className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-semibold inline-flex items-center gap-1.5 hover:bg-emerald-700 transition-colors"
          >
            <span>Read Papers</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </Card>

        <Card className="p-6 space-y-3 bg-gradient-to-br from-purple-900/10 via-white to-white dark:from-purple-950/40 dark:via-zinc-900 dark:to-zinc-900">
          <BookOpen className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
            Technical Blog & Guides
          </h3>
          <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
            8 educational articles on Prompt Engineering, LLMs, Hallucinations, AI Safety, and RLHF.
          </p>
          <button
            type="button"
            onClick={() => setCurrentPage('blog')}
            className="px-3 py-1.5 rounded-lg bg-purple-600 text-white text-xs font-semibold inline-flex items-center gap-1.5 hover:bg-purple-700 transition-colors"
          >
            <span>Explore Blog</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </Card>
      </section>
    </div>
  );
};
