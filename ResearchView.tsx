import React from 'react';
import { Brain, ArrowRight, Clock, Calendar, FileText } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';

export const ResearchView: React.FC = () => {
  const { research, navigateToResearch } = useData();

  return (
    <div className="space-y-8 py-8 max-w-5xl mx-auto">
      {/* Header */}
      <section className="space-y-3 border-b border-zinc-200 dark:border-zinc-800 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-xs border border-emerald-500/20">
          <Brain className="w-3.5 h-3.5" />
          <span>Research Papers & Whitepapers</span>
        </div>
        <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-100">
          AI Evaluation Research & Methodological Studies
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
          Formal taxonomies, empirical whitepapers, and benchmarking studies published by Haruna Kuforiji.
        </p>
      </section>

      {/* Research Papers Grid */}
      <div className="grid grid-cols-1 gap-6">
        {research.map((paper) => (
          <Card
            key={paper.id}
            className="p-8 space-y-4 cursor-pointer hover:border-emerald-500/40"
            onClick={() => navigateToResearch(paper.id)}
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <Badge variant="success">{paper.category}</Badge>
              <div className="flex items-center gap-4 text-xs text-zinc-500 font-medium">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {paper.readingTimeMinutes} min read
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {paper.publishedDate}
                </span>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
              {paper.title}
            </h2>

            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
              {paper.abstract}
            </p>

            <div className="flex flex-wrap gap-1.5 pt-2">
              {paper.tags.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-0.5 rounded-full text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                >
                  #{t}
                </span>
              ))}
            </div>

            <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs font-bold text-emerald-600 dark:text-emerald-400">
              <span>Read Full Paper</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export const ResearchDetailView: React.FC = () => {
  const { research, selectedResearchId, setCurrentPage } = useData();

  const paper = research.find((p) => p.id === selectedResearchId) || research[0];

  if (!paper) {
    return (
      <div className="py-12 text-center space-y-4">
        <p className="text-zinc-500">Paper not found.</p>
        <button
          type="button"
          onClick={() => setCurrentPage('research')}
          className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold"
        >
          Back to Research
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8 py-8 max-w-4xl mx-auto">
      {/* Back Button */}
      <button
        type="button"
        onClick={() => setCurrentPage('research')}
        className="text-xs font-bold text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 flex items-center gap-1.5"
      >
        <span>← Back to Research Library</span>
      </button>

      {/* Article Header */}
      <section className="space-y-4 border-b border-zinc-200 dark:border-zinc-800 pb-6">
        <Badge variant="success">{paper.category}</Badge>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight leading-tight">
          {paper.title}
        </h1>

        <div className="flex items-center gap-4 text-xs text-zinc-500 font-medium">
          <span>By <strong>{paper.authors.join(', ')}</strong></span>
          <span>Published: {paper.publishedDate}</span>
          <span>{paper.readingTimeMinutes} min read</span>
        </div>
      </section>

      {/* Abstract */}
      <Card className="p-6 bg-emerald-500/5 border-emerald-500/20 space-y-2">
        <h4 className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
          Paper Abstract
        </h4>
        <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed font-medium">
          {paper.abstract}
        </p>
      </Card>

      {/* Main Content Rendered with Markdown Support */}
      <Card className="p-8 space-y-4">
        <div className="prose dark:prose-invert max-w-none text-xs sm:text-sm leading-relaxed">
          <p className="whitespace-pre-wrap">{paper.content}</p>
        </div>
      </Card>

      {/* Key Takeaways */}
      <Card className="p-6 space-y-3 border-l-4 border-l-emerald-500">
        <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">Key Research Takeaways</h3>
        <ul className="space-y-2 pl-4 list-disc text-xs sm:text-sm text-zinc-600 dark:text-zinc-300">
          {paper.keyTakeaways.map((k, idx) => (
            <li key={idx}>{k}</li>
          ))}
        </ul>
      </Card>
    </div>
  );
};
