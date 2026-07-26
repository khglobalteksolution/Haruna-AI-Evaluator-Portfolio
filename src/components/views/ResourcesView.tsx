import React from 'react';
import { Compass, Download, FileText, FileCode, CheckSquare } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';

export const ResourcesView: React.FC = () => {
  const { resources, setActiveJsonModalContent } = useData();

  return (
    <div className="space-y-8 py-8 max-w-5xl mx-auto">
      {/* Header */}
      <section className="space-y-3 border-b border-zinc-200 dark:border-zinc-800 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold text-xs border border-indigo-500/20">
          <Compass className="w-3.5 h-3.5" />
          <span>Evaluation Resources & Rubric Assets</span>
        </div>
        <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-100">
          AI Evaluation Rubrics, Checklists & Dataset Schemas
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
          Open-source evaluation templates, JSON schemas, red-teaming checklists, and benchmark tools.
        </p>
      </section>

      {/* Resource Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {resources.map((res) => (
          <Card key={res.id} className="p-6 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Badge variant="info">{res.type}</Badge>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                  {res.format}
                </span>
              </div>

              <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">{res.title}</h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">{res.description}</p>
            </div>

            <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs">
              <span className="text-zinc-400 font-mono text-[10px]">{res.fileSize}</span>
              <a
                href={res.downloadUrl}
                download
                className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold flex items-center gap-1.5 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download</span>
              </a>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
