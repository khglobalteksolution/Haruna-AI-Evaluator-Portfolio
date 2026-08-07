import React, { useState } from 'react';
import { ShieldCheck, Layers, FileCode, Copy, Check, AlertTriangle, Scale } from 'lucide-react';
import { Card } from '../common/Card';
import { FRAMEWORK_MODULES } from '../../data/defaultData';
import { CATEGORY_RUBRICS, ERROR_TAXONOMY } from '../../data/rubricAndMethodologyData';
import { useData } from '../../context/DataContext';

export const FrameworkView: React.FC = () => {
  const { setActiveJsonModalContent } = useData();
  const [selectedModuleId, setSelectedModuleId] = useState<string>('mod-01');
  const [copied, setCopied] = useState(false);

  const activeModule = FRAMEWORK_MODULES.find((m) => m.id === selectedModuleId) || FRAMEWORK_MODULES[0];

  const handleCopySchema = () => {
    navigator.clipboard.writeText(activeModule.exampleJsonSchema);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-12 py-8 max-w-5xl mx-auto">
      {/* Header */}
      <section className="space-y-3 border-b border-zinc-200 dark:border-zinc-800 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold text-xs border border-indigo-500/20">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Evaluation Framework Matrix</span>
        </div>
        <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-100">
          AI Evaluation Framework (AIE-v2.4) Rubric Specification
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
          Standardized 5-level rubric taxonomy, JSON schema definitions, and error classification system for benchmarking LLMs.
        </p>
      </section>

      {/* Module Selector Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {FRAMEWORK_MODULES.map((mod) => (
          <button
            key={mod.id}
            type="button"
            onClick={() => setSelectedModuleId(mod.id)}
            className={`p-4 rounded-xl text-left border transition-all ${
              selectedModuleId === mod.id
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
                : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 hover:border-indigo-500/40'
            }`}
          >
            <span
              className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded ${
                selectedModuleId === mod.id ? 'bg-white/20 text-white' : 'bg-indigo-500/10 text-indigo-500'
              }`}
            >
              {mod.code}
            </span>
            <h4 className="font-bold text-xs sm:text-sm mt-2 line-clamp-1">{mod.name}</h4>
            <span className="text-[11px] opacity-80 block mt-1">{mod.totalRubrics} Standard Rubrics</span>
          </button>
        ))}
      </div>

      {/* Module Detail Card */}
      <Card className="p-8 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <div>
            <span className="px-2.5 py-1 rounded bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-mono text-xs font-bold border border-indigo-500/20">
              {activeModule.code}
            </span>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mt-2">{activeModule.name}</h2>
          </div>
          <div className="text-right">
            <span className="text-xs text-zinc-500 block">Category Weighting</span>
            <span className="font-mono font-bold text-lg text-indigo-600 dark:text-indigo-400">
              {activeModule.weighting}
            </span>
          </div>
        </div>

        <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">{activeModule.description}</p>

        {/* Key Metrics */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500">
            Measured Metric Taxonomies
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {activeModule.metricsList.map((m, idx) => (
              <div
                key={idx}
                className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-800 text-xs font-semibold text-zinc-800 dark:text-zinc-200 flex items-center gap-2"
              >
                <Layers className="w-3.5 h-3.5 text-indigo-500" />
                <span>{m}</span>
              </div>
            ))}
          </div>
        </div>

        {/* JSON Schema Code Block */}
        <div className="space-y-2 pt-2">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 flex items-center gap-1.5">
              <FileCode className="w-3.5 h-3.5 text-indigo-500" />
              <span>Example Output JSON Schema</span>
            </h4>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopySchema}
                className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 font-medium"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copied' : 'Copy Schema'}</span>
              </button>
              <button
                type="button"
                onClick={() =>
                  setActiveJsonModalContent({
                    title: `${activeModule.code} Module Schema`,
                    json: JSON.parse(activeModule.exampleJsonSchema),
                  })
                }
                className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
              >
                Inspect Schema Modal
              </button>
            </div>
          </div>

          <pre className="p-4 rounded-xl bg-zinc-950 text-emerald-400 font-mono text-xs overflow-x-auto border border-zinc-800 leading-relaxed">
            {activeModule.exampleJsonSchema}
          </pre>
        </div>
      </Card>

      {/* 5-Level Rubric Definitions */}
      <section className="space-y-6">
        <div className="border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <Scale className="w-6 h-6 text-indigo-500" />
            <span>Category Rubrics & 1–5 Scoring Scales</span>
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 mt-1">
            Standardized level criteria mapped across categories.
          </p>
        </div>

        <div className="space-y-6">
          {CATEGORY_RUBRICS.map((rubric, idx) => (
            <Card key={idx} className="p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-2">
                <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">{rubric.categoryName} Rubric</h3>
                <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">
                  Weight: {rubric.weight * 100}%
                </span>
              </div>
              <p className="text-xs text-zinc-600 dark:text-zinc-300">{rubric.description}</p>

              <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                {rubric.levelDefinitions.map((lvl) => (
                  <div
                    key={lvl.level}
                    className={`p-3 rounded-lg border text-xs space-y-1.5 ${
                      lvl.level === 1
                        ? 'border-red-500/30 bg-red-500/5'
                        : lvl.level === 2
                        ? 'border-amber-500/30 bg-amber-500/5'
                        : lvl.level === 3
                        ? 'border-yellow-500/30 bg-yellow-500/5'
                        : lvl.level === 4
                        ? 'border-blue-500/30 bg-blue-500/5'
                        : 'border-emerald-500/30 bg-emerald-500/5'
                    }`}
                  >
                    <div className="flex items-center justify-between font-bold">
                      <span className="font-mono">Level {lvl.level}</span>
                      <span className="text-[10px] uppercase font-bold">{lvl.label}</span>
                    </div>
                    <ul className="text-[11px] text-zinc-600 dark:text-zinc-400 space-y-1 leading-snug">
                      {lvl.qualifyingCriteria.map((c, cIdx) => (
                        <li key={cIdx}>• {c}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Error Taxonomy Classification */}
      <section className="space-y-6">
        <div className="border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-amber-500" />
            <span>Standard Error Taxonomy Codes</span>
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 mt-1">
            Systematic classification codes used in evaluation reports to log failure modes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ERROR_TAXONOMY.map((err) => (
            <Card key={err.code} className="p-5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 font-mono font-bold text-xs border border-amber-500/20">
                  {err.code}
                </span>
                <span
                  className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                    err.severity === 'critical'
                      ? 'bg-red-500/10 text-red-600 dark:text-red-400'
                      : err.severity === 'high'
                      ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                      : 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
                  }`}
                >
                  {err.severity}
                </span>
              </div>
              <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{err.name}</h4>
              <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">{err.description}</p>
              <div className="p-2 rounded bg-zinc-100 dark:bg-zinc-800 text-[11px] text-zinc-500">
                <strong>Remediation:</strong> {err.remediation}
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};
