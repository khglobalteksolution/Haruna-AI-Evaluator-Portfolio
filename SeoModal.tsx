import React, { useState } from 'react';
import { X, Globe, FileCode, Search, ShieldCheck } from 'lucide-react';

interface SeoModalProps {
  onClose: () => void;
  id?: string;
}

export const SeoModal: React.FC<SeoModalProps> = ({ onClose, id }) => {
  const [activeTab, setActiveTab] = useState<'sitemap' | 'robots' | 'jsonld' | 'opengraph'>('sitemap');

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://harunakuforiji.dev/</loc><priority>1.0</priority></url>
  <url><loc>https://harunakuforiji.dev/#about</loc><priority>0.8</priority></url>
  <url><loc>https://harunakuforiji.dev/#methodology</loc><priority>0.9</priority></url>
  <url><loc>https://harunakuforiji.dev/#framework</loc><priority>0.9</priority></url>
  <url><loc>https://harunakuforiji.dev/#reports</loc><priority>0.95</priority></url>
  <url><loc>https://harunakuforiji.dev/#prompt-lab</loc><priority>0.85</priority></url>
  <url><loc>https://harunakuforiji.dev/#research</loc><priority>0.85</priority></url>
  <url><loc>https://harunakuforiji.dev/#resources</loc><priority>0.8</priority></url>
  <url><loc>https://harunakuforiji.dev/#downloads</loc><priority>0.8</priority></url>
  <url><loc>https://harunakuforiji.dev/#dashboard</loc><priority>0.9</priority></url>
  <url><loc>https://harunakuforiji.dev/#contact</loc><priority>0.7</priority></url>
</urlset>`;

  const robotsTxt = `User-agent: *
Allow: /

Sitemap: https://harunakuforiji.dev/sitemap.xml`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Haruna Kuforiji',
    jobTitle: 'Senior AI Evaluator & LLM Safety Specialist',
    url: 'https://harunakuforiji.dev',
    sameAs: [
      'https://github.com/harunakuforiji',
      'https://linkedin.com/in/harunakuforiji',
    ],
  };

  const openGraphMeta = [
    { property: 'og:title', content: 'Haruna Kuforiji — AI Evaluator Portfolio' },
    { property: 'og:description', content: 'Production-ready AI Evaluator Portfolio & Evaluation Framework website.' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://harunakuforiji.dev/' },
    { property: 'twitter:card', content: 'summary_large_image' },
  ];

  return (
    <div
      id={id}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-3xl max-h-[85vh] flex flex-col rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
          <div className="flex items-center gap-2.5">
            <Globe className="w-5 h-5 text-indigo-500" />
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
              SEO, Sitemap & Metadata Compliance Inspector
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-zinc-200 dark:border-zinc-800 bg-zinc-100/60 dark:bg-zinc-800/40 px-6 pt-2 gap-2 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab('sitemap')}
            className={`py-2 px-3 border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'sitemap'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>sitemap.xml</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('robots')}
            className={`py-2 px-3 border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'robots'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>robots.txt</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('jsonld')}
            className={`py-2 px-3 border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'jsonld'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
            }`}
          >
            <Search className="w-3.5 h-3.5" />
            <span>Structured JSON-LD</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('opengraph')}
            className={`py-2 px-3 border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'opengraph'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Open Graph Tags</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto flex-1 font-mono text-xs bg-zinc-950 text-indigo-300 leading-relaxed">
          {activeTab === 'sitemap' && <pre>{sitemapXml}</pre>}
          {activeTab === 'robots' && <pre>{robotsTxt}</pre>}
          {activeTab === 'jsonld' && <pre>{JSON.stringify(jsonLd, null, 2)}</pre>}
          {activeTab === 'opengraph' && (
            <div className="space-y-2">
              {openGraphMeta.map((m, idx) => (
                <div key={idx} className="flex gap-2">
                  <span className="text-zinc-500">&lt;meta property=</span>
                  <span className="text-emerald-400">"{m.property}"</span>
                  <span className="text-zinc-500">content=</span>
                  <span className="text-amber-300">"{m.content}"</span>
                  <span className="text-zinc-500"> /&gt;</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-3 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-xs text-zinc-500">
          <span>Google AI Studio & Search Indexing Ready</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-medium transition-colors"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
};
