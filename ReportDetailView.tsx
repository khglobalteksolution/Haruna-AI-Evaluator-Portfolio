import React from 'react';
import { ArrowLeft, Calendar, User, FileCode, CheckCircle2, AlertTriangle, XCircle, Info } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Card } from '../common/Card';
import { Badge, SeverityBadge } from '../common/Badge';
import { PdfExportButton } from '../common/PdfExportButton';
import { MarkdownViewer } from '../common/MarkdownViewer';
import { RadarChart } from '../common/ChartComponent';

export const ReportDetailView: React.FC = () => {
  const { reports, selectedReportId, setCurrentPage, setActiveJsonModalContent } = useData();

  const report = reports.find((r) => r.id === selectedReportId) || reports[0];

  if (!report) {
    return (
      <div className="py-12 text-center space-y-4">
        <p className="text-zinc-500">Report not found.</p>
        <button
          type="button"
          onClick={() => setCurrentPage('reports')}
          className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold"
        >
          Back to Reports Registry
        </button>
      </div>
    );
  }

  // Radar Chart Data preparation
  const radarData = report.criteriaScores.map((crit) => ({
    axis: crit.name,
    value: crit.score,
  }));

  return (
    <div className="space-y-10 py-8 max-w-5xl mx-auto print:py-0 print:space-y-6">
      {/* Back Button & PDF Export Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-4 print:hidden">
        <button
          type="button"
          onClick={() => setCurrentPage('reports')}
          className="text-xs font-bold text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Reports Registry</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setActiveJsonModalContent({ title: report.title, json: report })}
            className="px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-medium text-xs flex items-center gap-2 shadow-sm"
          >
            <FileCode className="w-4 h-4 text-indigo-500" />
            <span>View RAW JSON</span>
          </button>
          <PdfExportButton documentTitle={report.title} reportData={report} />
        </div>
      </div>

      {/* Main Report Header */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="info">{report.category}</Badge>
          <SeverityBadge level={report.riskLevel} />
          <span className="px-2.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-xs font-mono font-semibold">
            Version {report.version}
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight leading-snug">
          {report.title}
        </h1>

        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal">
          {report.subtitle}
        </p>

        <div className="flex flex-wrap items-center gap-6 pt-2 text-xs text-zinc-500 border-t border-zinc-100 dark:border-zinc-800/80">
          <div className="flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-indigo-500" />
            <span>Author: <strong>{report.author.name}</strong> ({report.author.role})</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-indigo-500" />
            <span>Last Updated: <strong>{new Date(report.updatedAt).toLocaleDateString()}</strong></span>
          </div>
        </div>
      </section>

      {/* Score Overview & Radar Chart Box */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 md:col-span-1 space-y-4 flex flex-col justify-between bg-gradient-to-br from-indigo-900/10 via-white to-white dark:from-indigo-950/40 dark:via-zinc-900 dark:to-zinc-900">
          <div className="space-y-1">
            <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Overall Evaluation Score</span>
            <div className="text-5xl font-black text-indigo-600 dark:text-indigo-400 font-mono pt-1">
              {report.overallScore}<span className="text-lg text-zinc-400">/100</span>
            </div>
          </div>

          <div className="space-y-2 pt-4 border-t border-zinc-200/80 dark:border-zinc-800 text-xs">
            <div className="flex justify-between">
              <span className="text-zinc-500">Target Model:</span>
              <span className="font-bold text-zinc-900 dark:text-zinc-100">{report.targetModel.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">Provider:</span>
              <span className="font-medium text-zinc-700 dark:text-zinc-300">{report.targetModel.provider}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">Context Window:</span>
              <span className="font-mono text-zinc-700 dark:text-zinc-300">{report.targetModel.contextWindow}</span>
            </div>
          </div>
        </Card>

        {/* Radar Score Chart */}
        <Card className="p-6 md:col-span-2 flex flex-col items-center justify-center space-y-2">
          <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider self-start">
            Criteria Score Polygon Radar
          </h4>
          <RadarChart data={radarData} size={260} />
        </Card>
      </section>

      {/* Criteria Matrix Breakdown */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
          Evaluation Criteria Breakdown
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {report.criteriaScores.map((crit) => (
            <Card key={crit.id} className="p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-zinc-900 dark:text-zinc-100">{crit.name}</span>
                <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400 text-sm">
                  {crit.score}/{crit.maxScore}
                </span>
              </div>

              <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">{crit.description}</p>

              {crit.notes && (
                <div className="p-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-800/60 text-[11px] text-zinc-600 dark:text-zinc-400 flex items-start gap-2">
                  {crit.status === 'passed' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />}
                  {crit.status === 'warning' && <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />}
                  {crit.status === 'failed' && <XCircle className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />}
                  {crit.status === 'needs-review' && <Info className="w-3.5 h-3.5 text-sky-500 shrink-0 mt-0.5" />}
                  <span>{crit.notes}</span>
                </div>
              )}
            </Card>
          ))}
        </div>
      </section>

      {/* Key Findings & Recommendations */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 space-y-3 border-l-4 border-l-indigo-600">
          <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">Key Audit Findings</h3>
          <ul className="space-y-2 pl-4 list-disc text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
            {report.keyFindings.map((f, idx) => (
              <li key={idx}>{f}</li>
            ))}
          </ul>
        </Card>

        <Card className="p-6 space-y-3 border-l-4 border-l-emerald-600">
          <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">Engineering Recommendations</h3>
          <ul className="space-y-2 pl-4 list-disc text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
            {report.recommendations.map((r, idx) => (
              <li key={idx}>{r}</li>
            ))}
          </ul>
        </Card>
      </section>

      {/* Markdown Content Section */}
      {report.markdownContent && (
        <Card className="p-8 space-y-4">
          <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">Detailed Report Findings</h3>
          <MarkdownViewer content={report.markdownContent} />
        </Card>
      )}

      {/* Test Environment Specs */}
      <section className="pt-2">
        <Card className="p-5 bg-zinc-50 dark:bg-zinc-900/60 border-zinc-200 dark:border-zinc-800 text-xs space-y-2">
          <span className="font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider text-[11px] block">
            Audit Test Environment Metadata
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-zinc-600 dark:text-zinc-400 font-mono text-[11px]">
            <div>Framework: <strong>{report.testEnvironment.frameworkVersion}</strong></div>
            <div>Dataset Size: <strong>{report.testEnvironment.datasetSize} Samples</strong></div>
            <div>Temperature: <strong>{report.testEnvironment.temperature}</strong></div>
            <div>Prompt Hash: <strong>{report.testEnvironment.systemPromptHash}</strong></div>
          </div>
        </Card>
      </section>
    </div>
  );
};
