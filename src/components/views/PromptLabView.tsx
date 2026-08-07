import React, { useState } from 'react';
import { Cpu, Copy, Check, FileCode, AlertCircle, Sparkles, CheckCircle2, Braces, FileJson } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { AnimatedCounter } from '../common/AnimatedCounter';
import { ExtendedPromptExperiment } from '../../data/promptsData';
import { JsonEvaluationTool } from '../widgets/JsonEvaluationTool';

export const PromptLabView: React.FC = () => {
  const { prompts } = useData();
  const [activeTab, setActiveTab] = useState<'prompts' | 'json_tool'>('prompts');
  const [selectedPromptId, setSelectedPromptId] = useState<string>(prompts[0]?.id || 'prompt-001');
  const [copied, setCopied] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(prompts.map((p) => p.category)))];

  const filteredPrompts = prompts.filter((p) => {
    if (activeCategory !== 'All' && p.category !== activeCategory) return false;
    return true;
  });

  const activePrompt = (prompts.find((p) => p.id === selectedPromptId) || filteredPrompts[0] || prompts[0]) as ExtendedPromptExperiment;

  const handleCopyPrompt = () => {
    if (!activePrompt) return;
    navigator.clipboard.writeText(activePrompt.systemPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 py-8 max-w-5xl mx-auto">
      {/* View Switcher Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-2 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('prompts')}
            className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 ${
              activeTab === 'prompts'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span>Prompt Experiments ({prompts.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('json_tool')}
            className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 ${
              activeTab === 'json_tool'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
            }`}
          >
            <Braces className="w-4 h-4 text-indigo-400" />
            <span>JSON & Technical Evaluation Tool</span>
            <span className="px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 text-[10px]">NEW</span>
          </button>
        </div>

        <div className="text-xs text-zinc-500 font-mono hidden sm:block pr-2">
          AIE-v2.4 Benchmarking Suite
        </div>
      </div>

      {/* Mode 1: JSON & Technical Evaluation Tool */}
      {activeTab === 'json_tool' ? (
        <JsonEvaluationTool />
      ) : (
        /* Mode 2: Prompt Engineering Experiments */
        <div className="space-y-10">
          {/* Header */}
          <section className="space-y-3 border-b border-zinc-200 dark:border-zinc-800 pb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold text-xs border border-indigo-500/20">
              <Cpu className="w-3.5 h-3.5" />
              <span>Prompt Engineering Laboratory</span>
            </div>
            <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-100">
              Parameterized System Prompts & Guardrail Rubrics
            </h1>
            <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
              20 prompt engineering experiments testing system instruction boundaries, XML isolation, schema enforcers, and prompt injection defenses.
            </p>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 pt-4">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    activeCategory === cat
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </section>

          {/* Experiments Selector Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[420px] overflow-y-auto pr-2">
            {filteredPrompts.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setSelectedPromptId(p.id)}
                className={`p-5 rounded-xl text-left border transition-all ${
                  selectedPromptId === p.id
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
                    : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 hover:border-indigo-500/40'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded ${
                      selectedPromptId === p.id ? 'bg-white/20 text-white' : 'bg-indigo-500/10 text-indigo-500'
                    }`}
                  >
                    {p.category}
                  </span>
                  <span className="font-mono text-xs font-bold">{p.passRatePercentage}% Pass Rate</span>
                </div>
                <h4 className="font-bold text-sm mt-2">{p.title}</h4>
                <span className="text-[11px] opacity-80 block mt-1">Updated: {p.updatedAt}</span>
              </button>
            ))}
          </div>

          {/* Active Experiment Detail Inspector */}
          {activePrompt && (
            <Card className="p-8 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-4">
                <div>
                  <Badge variant="info">{activePrompt.category}</Badge>
                  <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mt-2">{activePrompt.title}</h2>
                </div>
                <div className="text-right">
                  <span className="text-xs text-zinc-500 block">Rubric Pass Rate</span>
                  <span className="font-mono font-black text-2xl text-emerald-600 dark:text-emerald-400">
                    <AnimatedCounter value={activePrompt.passRatePercentage} decimals={1} suffix="%" />
                  </span>
                </div>
              </div>

              {/* System Prompt Code Box */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 flex items-center gap-1.5">
                    <FileCode className="w-3.5 h-3.5 text-indigo-500" />
                    <span>System Prompt Instruction Template</span>
                  </h4>
                  <button
                    type="button"
                    onClick={handleCopyPrompt}
                    className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 font-medium"
                  >
                    {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                    <span>{copied ? 'Copied' : 'Copy System Prompt'}</span>
                  </button>
                </div>

                <pre className="p-4 rounded-xl bg-zinc-950 text-indigo-300 font-mono text-xs overflow-x-auto border border-zinc-800 leading-relaxed whitespace-pre-wrap">
                  {activePrompt.systemPrompt}
                </pre>
              </div>

              {/* Model Hyperparameters */}
              <div className="grid grid-cols-3 gap-4 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 text-xs font-mono">
                <div>Temperature: <strong>{activePrompt.parameters.temperature}</strong></div>
                <div>Top-P: <strong>{activePrompt.parameters.topP}</strong></div>
                <div>Max Tokens: <strong>{activePrompt.parameters.maxTokens}</strong></div>
              </div>

              {/* Weaknesses vs Refined Improvements */}
              {activePrompt.weakness && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/20 space-y-2">
                    <div className="flex items-center gap-1.5 text-red-600 dark:text-red-400 font-bold text-xs uppercase">
                      <AlertCircle className="w-4 h-4" />
                      <span>Identified Prompt Weakness</span>
                    </div>
                    <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
                      {activePrompt.weakness}
                    </p>
                    <div className="p-2 rounded bg-zinc-100 dark:bg-zinc-800 text-[11px] font-mono text-zinc-500">
                      <strong>Original Baseline:</strong> {activePrompt.originalPrompt}
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20 space-y-2">
                    <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold text-xs uppercase">
                      <Sparkles className="w-4 h-4" />
                      <span>Refined Prompt Solution</span>
                    </div>
                    <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
                      {activePrompt.expectedImprovement}
                    </p>
                    <div className="p-2 rounded bg-emerald-500/10 text-[11px] font-mono text-emerald-700 dark:text-emerald-300">
                      <strong>Improved Refinement:</strong> {activePrompt.improvedPrompt}
                    </div>
                  </div>
                </div>
              )}

              {/* Lessons Learned */}
              {activePrompt.lessonsLearned && activePrompt.lessonsLearned.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                    Key Engineering Lessons Learned
                  </h4>
                  <ul className="space-y-1.5 text-xs text-zinc-700 dark:text-zinc-300 pl-4 list-disc">
                    {activePrompt.lessonsLearned.map((lesson, idx) => (
                      <li key={idx}>{lesson}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Evaluation Rubric Results */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                  Evaluation Rubric Benchmarks
                </h4>
                <div className="space-y-3">
                  {activePrompt.evaluationRubric.map((rub, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-zinc-900 dark:text-zinc-100">{rub.criterion}</span>
                        <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 text-sm">
                          {rub.score}% Score
                        </span>
                      </div>
                      <p className="text-xs text-zinc-500">Expected: {rub.expectedBehavior}</p>
                      <p className="text-xs text-zinc-700 dark:text-zinc-300 font-medium">Observed: {rub.observedBehavior}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};
