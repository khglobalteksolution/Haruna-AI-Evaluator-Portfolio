import React from 'react';
import { LayoutDashboard, Zap, Activity, ShieldCheck, BarChart2 } from 'lucide-react';
import { Card } from '../common/Card';
import { DataTable, Column } from '../common/DataTable';
import { RadarChart, SimpleBarChart } from '../common/ChartComponent';
import { MODEL_BENCHMARKS } from '../../data/defaultData';
import { ModelBenchmarkResult } from '../../types';

export const DashboardView: React.FC = () => {
  const radarData = [
    { axis: 'Reasoning', value: 94 },
    { axis: 'RAG Faithfulness', value: 88 },
    { axis: 'Safety Refusal', value: 97 },
    { axis: 'Code Pass@1', value: 89 },
    { axis: 'Instruction Following', value: 92 },
  ];

  const barItems = [
    { label: 'Gemini 1.5 Pro', value: 94.2 },
    { label: 'Claude 3.5 Sonnet', value: 93.8 },
    { label: 'GPT-4o', value: 93.1 },
    { label: 'Llama 3.1 405B', value: 91.5 },
  ];

  const columns: Column<ModelBenchmarkResult>[] = [
    {
      key: 'modelName',
      header: 'Model Name',
      accessor: (item) => (
        <div className="space-y-0.5">
          <span className="font-bold text-zinc-900 dark:text-zinc-100 block">{item.modelName}</span>
          <span className="text-[10px] text-zinc-500 font-medium block">{item.provider}</span>
        </div>
      ),
      sortable: true,
      sortKey: 'modelName',
    },
    {
      key: 'overallScore',
      header: 'Overall Score',
      accessor: (item) => (
        <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400 text-sm">
          {item.overallScore}%
        </span>
      ),
      sortable: true,
      sortKey: 'overallScore',
    },
    {
      key: 'latencyMs',
      header: 'Latency (ms)',
      accessor: (item) => <span className="font-mono text-xs text-zinc-600 dark:text-zinc-400">{item.latencyMs} ms</span>,
      sortable: true,
      sortKey: 'latencyMs',
    },
    {
      key: 'throughput',
      header: 'Throughput',
      accessor: (item) => (
        <span className="font-mono text-xs text-zinc-600 dark:text-zinc-400">{item.throughputTokensPerSec} tok/s</span>
      ),
      sortable: true,
      sortKey: 'throughputTokensPerSec',
    },
    {
      key: 'hallucination',
      header: 'Hallucination Rate',
      accessor: (item) => (
        <span className="font-mono text-xs text-amber-600 dark:text-amber-400 font-bold">{item.hallucinationRate}%</span>
      ),
      sortable: true,
      sortKey: 'hallucinationRate',
    },
    {
      key: 'compliance',
      header: 'Safety Score',
      accessor: (item) => (
        <span className="font-mono text-xs text-emerald-600 dark:text-emerald-400 font-bold">{item.complianceScore}%</span>
      ),
      sortable: true,
      sortKey: 'complianceScore',
    },
  ];

  return (
    <div className="space-y-10 py-8 max-w-5xl mx-auto">
      {/* Header */}
      <section className="space-y-3 border-b border-zinc-200 dark:border-zinc-800 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold text-xs border border-indigo-500/20">
          <LayoutDashboard className="w-3.5 h-3.5" />
          <span>Interactive Analytics Dashboard</span>
        </div>
        <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-100">
          Frontier LLM Benchmarks & Metric Comparison
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
          Real-time performance analytics, latency vs throughput metrics, and hallucination rates across foundation models.
        </p>
      </section>

      {/* Top Metrics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-5 space-y-1">
          <span className="text-xs text-zinc-500 font-semibold uppercase">Top Model Score</span>
          <div className="text-2xl font-black text-indigo-600 dark:text-indigo-400 font-mono">94.2%</div>
          <span className="text-[11px] text-zinc-400">Gemini 1.5 Pro</span>
        </Card>

        <Card className="p-5 space-y-1">
          <span className="text-xs text-zinc-500 font-semibold uppercase">Avg Latency</span>
          <div className="text-2xl font-black text-indigo-600 dark:text-indigo-400 font-mono">915 ms</div>
          <span className="text-[11px] text-zinc-400">P95 TTFT Benchmark</span>
        </Card>

        <Card className="p-5 space-y-1">
          <span className="text-xs text-zinc-500 font-semibold uppercase">Hallucination Floor</span>
          <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono">1.8%</div>
          <span className="text-[11px] text-zinc-400">Lowest Recorded</span>
        </Card>

        <Card className="p-5 space-y-1">
          <span className="text-xs text-zinc-500 font-semibold uppercase">Safety Compliance</span>
          <div className="text-2xl font-black text-indigo-600 dark:text-indigo-400 font-mono">98.1%</div>
          <span className="text-[11px] text-zinc-400">Zero Critical Refusal Failure</span>
        </Card>
      </div>

      {/* Visual Analytics Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 space-y-4 flex flex-col items-center justify-center">
          <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 self-start">
            Aggregate Capability Radar
          </h3>
          <RadarChart data={radarData} size={250} />
        </Card>

        <Card className="p-6 space-y-4">
          <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
            Model Overall Score Comparison
          </h3>
          <SimpleBarChart items={barItems} />
        </Card>
      </div>

      {/* Model Benchmark Matrix Table */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
          Model Comparison Matrix
        </h2>
        <DataTable data={MODEL_BENCHMARKS} columns={columns} keyExtractor={(m) => m.modelName} />
      </section>
    </div>
  );
};
