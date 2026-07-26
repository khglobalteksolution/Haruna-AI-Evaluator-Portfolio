import React from 'react';
import { ShieldCheck, FileCode, ExternalLink, Globe } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { NavigationPage } from '../../types';

export const Footer: React.FC = () => {
  const { setCurrentPage, setIsSeoModalOpen } = useData();

  const handleNav = (page: NavigationPage) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full border-t border-zinc-200 dark:border-zinc-800/80 bg-zinc-50 dark:bg-zinc-950 text-zinc-600 dark:text-zinc-400 text-xs py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-black text-sm">
                HK
              </div>
              <span className="font-bold text-zinc-900 dark:text-zinc-100 text-sm">
                Haruna Kuforiji
              </span>
            </div>
            <p className="text-zinc-500 leading-relaxed text-xs">
              AI Evaluator Portfolio & LLM Benchmarking Framework. Production-ready web structure designed for automated evaluation loading.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono text-[10px] font-semibold border border-emerald-500/20">
                GitHub Pages Ready
              </span>
              <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-mono text-[10px] font-semibold border border-indigo-500/20">
                Replit Compatible
              </span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider text-[11px]">
              Architecture Pages
            </h4>
            <ul className="space-y-1.5 font-medium">
              <li>
                <button type="button" onClick={() => handleNav('home')} className="hover:text-indigo-600 dark:hover:text-indigo-400">
                  Home
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleNav('about')} className="hover:text-indigo-600 dark:hover:text-indigo-400">
                  About
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleNav('methodology')} className="hover:text-indigo-600 dark:hover:text-indigo-400">
                  Methodology
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleNav('framework')} className="hover:text-indigo-600 dark:hover:text-indigo-400">
                  Evaluation Framework
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleNav('reports')} className="hover:text-indigo-600 dark:hover:text-indigo-400">
                  Evaluation Reports
                </button>
              </li>
            </ul>
          </div>

          {/* Labs & Research */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider text-[11px]">
              Labs & Analytics
            </h4>
            <ul className="space-y-1.5 font-medium">
              <li>
                <button type="button" onClick={() => handleNav('prompt-lab')} className="hover:text-indigo-600 dark:hover:text-indigo-400">
                  Prompt Engineering Lab
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleNav('research')} className="hover:text-indigo-600 dark:hover:text-indigo-400">
                  Research Papers
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleNav('resources')} className="hover:text-indigo-600 dark:hover:text-indigo-400">
                  Resources & Rubrics
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleNav('downloads')} className="hover:text-indigo-600 dark:hover:text-indigo-400">
                  Downloads Bundle
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleNav('dashboard')} className="hover:text-indigo-600 dark:hover:text-indigo-400">
                  Analytics Dashboard
                </button>
              </li>
            </ul>
          </div>

          {/* Verification & Compliance */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider text-[11px]">
              Compliance & SEO
            </h4>
            <div className="p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-2">
              <div className="flex items-center gap-1.5 font-semibold text-zinc-900 dark:text-zinc-100">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>WCAG 2.1 AA Compliant</span>
              </div>
              <p className="text-[11px] text-zinc-500">
                High contrast, automatic dark mode, structured schema, sitemap, and robots.txt.
              </p>
              <button
                type="button"
                onClick={() => setIsSeoModalOpen(true)}
                className="text-indigo-600 dark:text-indigo-400 font-semibold flex items-center gap-1 text-[11px] hover:underline pt-1"
              >
                <FileCode className="w-3.5 h-3.5" />
                Inspect Sitemap & Meta Tags
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500">
          <div>
            © {new Date().getFullYear()} Haruna Kuforiji. All rights reserved. Modular Website Architecture.
          </div>
          <div className="flex items-center gap-4">
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noreferrer"
              className="hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1"
            >
              <span>sitemap.xml</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="/robots.txt"
              target="_blank"
              rel="noreferrer"
              className="hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1"
            >
              <span>robots.txt</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <button
              type="button"
              onClick={() => handleNav('contact')}
              className="hover:text-indigo-600 dark:hover:text-indigo-400"
            >
              Contact Specialist
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
