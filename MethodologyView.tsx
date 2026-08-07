import React from 'react';
import { Brain, Layers, ShieldCheck, Scale, Cpu, CheckCircle2, ListOrdered, FileCheck } from 'lucide-react';
import { Card } from '../common/Card';
import { DataTable, Column } from '../common/DataTable';
import { METHODOLOGY_STEPS } from '../../data/rubricAndMethodologyData';

interface ScoringFormulaRow {
  dimension: string;
  weight: string;
  formula: string;
  description: string;
}

export const MethodologyView: React.FC = () => {
  const formulas: ScoringFormulaRow[] = [
    {
      dimension: 'Symbolic & Deductive Logic',
      weight: '25%',
      formula: 'Score = (Correct Premises / Total Premises) * 100',
      description: 'Evaluates logical consistency without premise drift or contradiction.',
    },
    {
      dimension: 'Contextual Grounding (RAG)',
      weight: '30%',
      formula: 'Score = (Attributed Claims / Total Generated Claims) * 100',
      description: 'Measures adherence to provided context documents versus parametric hallucination.',
    },
    {
      dimension: 'Adversarial Safety Refusal',
      weight: '25%',
      formula: 'Score = 100 - (Bypassed Attack Vectors / Total Vector Samples * 100)',
      description: 'Quantifies resistance against jailbreak prompts, obfuscation, and injection.',
    },
    {
      dimension: 'Code Execution & Pass@1',
      weight: '20%',
      formula: 'Score = (Passed Test Cases / Total Test Executions) * 100',
      description: 'Validates syntax, runtime execution, and vulnerability-free code output.',
    },
  ];

  const columns: Column<ScoringFormulaRow>[] = [
    {
      key: 'dimension',
      header: 'Evaluation Dimension',
      accessor: (item) => <span className="font-bold text-zinc-900 dark:text-zinc-100">{item.dimension}</span>,
      sortable: true,
      sortKey: 'dimension',
    },
    {
      key: 'weight',
      header: 'Weighting',
      accessor: (item) => (
        <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-mono font-bold">
          {item.weight}
        </span>
      ),
      sortable: true,
      sortKey: 'weight',
    },
    {
      key: 'formula',
      header: 'Scoring Formula',
      accessor: (item) => <code className="text-xs bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded text-zinc-800 dark:text-zinc-200">{item.formula}</code>,
    },
    {
      key: 'description',
      header: 'Description',
      accessor: (item) => <span className="text-zinc-600 dark:text-zinc-300">{item.description}</span>,
    },
  ];

  return (
    <div className="space-y-12 py-8 max-w-5xl mx-auto">
      {/* Header */}
      <section className="space-y-3 border-b border-zinc-200 dark:border-zinc-800 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold text-xs border border-indigo-500/20">
          <Brain className="w-3.5 h-3.5" />
          <span>Standardized Evaluation Methodology</span>
        </div>
        <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-100">
          15-Step AI Evaluation Methodology & QA Architecture
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
          Haruna Kuforiji's documented evaluation methodology combines deterministic programmatic validation, adversarial stress-testing, and multi-pass semantic auditing to measure model reliability.
        </p>
      </section>

      {/* 4 Core Pillars */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
            <Layers className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
            1. Perturbation Testing
          </h3>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
            Systematically injecting distraction tokens, altered premise order, and synthetic noise into test prompts to evaluate model robustness against prompt variance.
          </p>
        </Card>

        <Card className="p-6 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
            2. Adversarial Red-Teaming
          </h3>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
            Executing thousands of multi-turn jailbreak attempts, Base64 obfuscations, and indirect document injections to test safety guardrails without causing false-refusal drift.
          </p>
        </Card>

        <Card className="p-6 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center font-bold">
            <Scale className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
            3. RAG Grounding Verification
          </h3>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
            Cross-checking every generated statement against retrieved source documents using claim decomposition and citation precision mapping algorithms.
          </p>
        </Card>

        <Card className="p-6 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
            <Cpu className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
            4. Deterministic Schema Validation
          </h3>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
            Enforcing strict JSON and XML schema validation on all model outputs to guarantee parseability in production API pipelines.
          </p>
        </Card>
      </section>

      {/* 15-Step Evaluation Workflow Timeline */}
      <section className="space-y-6">
        <div className="border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <ListOrdered className="w-6 h-6 text-indigo-500" />
            <span>Exhaustive 15-Step Evaluation Process</span>
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 mt-1">
            Step-by-step Quality Assurance workflow executed for every candidate model audit.
          </p>
        </div>

        <div className="space-y-4">
          {METHODOLOGY_STEPS.map((step) => (
            <Card key={step.stepNumber} className="p-6 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-2">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-lg bg-indigo-600 text-white font-mono font-bold text-xs flex items-center justify-center">
                    {step.stepNumber}
                  </span>
                  <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">{step.title}</h3>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-semibold">
                  {step.category}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                {step.description}
              </p>

              <div className="space-y-1 pt-1">
                <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wide block">Key Checkpoints:</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {step.keyCheckpoints.map((cp, idx) => (
                    <div key={idx} className="text-xs text-zinc-600 dark:text-zinc-300 flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{cp}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-500 font-mono">
                <strong>Reviewer Guidance:</strong> {step.reviewerGuidance}
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Scoring Weighting Table */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <FileCheck className="w-5 h-5 text-indigo-500" />
          <span>Mathematical Weighting & Scoring Formulas</span>
        </h2>
        <DataTable
          data={formulas}
          columns={columns}
          keyExtractor={(item) => item.dimension}
        />
      </section>
    </div>
  );
};
