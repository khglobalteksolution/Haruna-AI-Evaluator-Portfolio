import React, { useState } from 'react';
import {
  FolderDown,
  Download,
  Eye,
  FileText,
  ShieldCheck,
  Sparkles,
  BookOpen,
  X,
  FileCheck2,
  Lock,
  Layers
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Card } from '../common/Card';
import { DataTable, Column } from '../common/DataTable';
import { PdfDocumentViewer } from '../common/PdfDocumentViewer';
import { DownloadItem } from '../../types';

export const DownloadsView: React.FC = () => {
  const { downloads } = useData();
  const [activePreviewDoc, setActivePreviewDoc] = useState<DownloadItem | null>(
    downloads[0] || null
  );
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(downloads.map((d) => d.category)))];

  const filteredDownloads = downloads.filter((d) => {
    if (selectedCategory !== 'All' && d.category !== selectedCategory) return false;
    return true;
  });

  const handlePreview = (item: DownloadItem, openModal = false) => {
    setActivePreviewDoc(item);
    if (openModal) {
      setIsPreviewModalOpen(true);
    }
  };

  const columns: Column<DownloadItem>[] = [
    {
      key: 'title',
      header: 'Download Package',
      accessor: (item) => (
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-bold text-zinc-900 dark:text-zinc-100 block">{item.title}</span>
            {activePreviewDoc?.id === item.id && (
              <span className="px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-mono text-[10px] font-bold border border-indigo-500/20">
                Active Preview
              </span>
            )}
          </div>
          <code className="text-[10px] text-zinc-500 font-mono block">{item.filename}</code>
        </div>
      ),
      sortable: true,
      sortKey: 'title',
    },
    {
      key: 'category',
      header: 'Category',
      accessor: (item) => (
        <span className="px-2.5 py-1 rounded bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold text-xs">
          {item.category}
        </span>
      ),
      sortable: true,
      sortKey: 'category',
    },
    {
      key: 'format',
      header: 'Format',
      accessor: (item) => (
        <span
          className={`font-mono text-xs font-bold px-2 py-0.5 rounded ${
            item.format === 'PDF'
              ? 'bg-red-500/10 text-red-600 dark:text-red-400'
              : item.format === 'JSON'
              ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
              : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
          }`}
        >
          {item.format}
        </span>
      ),
      sortable: true,
      sortKey: 'format',
    },
    {
      key: 'version',
      header: 'Version',
      accessor: (item) => <span className="font-mono text-xs text-zinc-600 dark:text-zinc-400">v{item.version}</span>,
    },
    {
      key: 'fileSize',
      header: 'Size',
      accessor: (item) => <span className="font-mono text-xs text-zinc-500">{item.fileSize}</span>,
    },
    {
      key: 'hash',
      header: 'SHA-256 Hash',
      accessor: (item) => (
        <code className="text-[10px] text-zinc-400 font-mono max-w-[120px] truncate block" title={item.sha256Hash}>
          {item.sha256Hash.substring(0, 14)}...
        </code>
      ),
    },
    {
      key: 'download',
      header: 'Actions',
      accessor: (item) => (
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => handlePreview(item, false)}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold inline-flex items-center gap-1 transition-colors ${
              activePreviewDoc?.id === item.id
                ? 'bg-indigo-600 text-white'
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
            }`}
            title="Preview PDF Document"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Preview</span>
          </button>
          <a
            href={item.downloadUrl}
            download
            className="px-2.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold inline-flex items-center gap-1 transition-colors"
            title="Download File"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Get</span>
          </a>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-10 py-8 max-w-5xl mx-auto">
      {/* Page Title & Intro */}
      <section className="space-y-3 border-b border-zinc-200 dark:border-zinc-800 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold text-xs border border-indigo-500/20">
          <FolderDown className="w-3.5 h-3.5" />
          <span>Professional Document Library & PDF Viewer</span>
        </div>
        <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-100">
          Professional Document Library & Embedded PDF Previewer
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
          Inspect executive resumes, evaluation handbooks, rubric matrices, and prompt guardrail guides directly in our embedded viewer before downloading.
        </p>
      </section>

      {/* Featured Quick Document Selector Cards */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-zinc-500 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
            <span>Featured Documents (Click to Live Preview)</span>
          </h3>
          <span className="text-xs text-zinc-500">10 Verified Artifacts</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {downloads.slice(0, 6).map((item) => {
            const isSelected = activePreviewDoc?.id === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handlePreview(item)}
                className={`p-4 rounded-xl text-left border transition-all flex flex-col justify-between space-y-2 ${
                  isSelected
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-md ring-2 ring-indigo-500/30'
                    : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 hover:border-indigo-500/40'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-indigo-500/10 text-indigo-500'
                      }`}
                    >
                      {item.category}
                    </span>
                    <span className="text-[10px] font-mono opacity-80">{item.fileSize}</span>
                  </div>
                  <h4 className="font-bold text-xs sm:text-sm mt-2 line-clamp-2">{item.title}</h4>
                </div>

                <div className="flex items-center justify-between text-[11px] pt-1 border-t border-current/10">
                  <span className="opacity-80">Format: {item.format}</span>
                  <span className="font-semibold flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    <span>{isSelected ? 'Viewing' : 'Preview'}</span>
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Interactive PDF Document Preview Section */}
      {activePreviewDoc && (
        <section className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-zinc-500 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-indigo-500" />
              <span>Embedded Document Previewer: {activePreviewDoc.title}</span>
            </h3>
            <button
              type="button"
              onClick={() => setIsPreviewModalOpen(true)}
              className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold hover:underline flex items-center gap-1"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Expand Fullscreen Preview Modal</span>
            </button>
          </div>

          <PdfDocumentViewer document={activePreviewDoc} />
        </section>
      )}

      {/* Category Filter Pills & Document Table */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-200 dark:border-zinc-800 pb-3">
          <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-500" />
            <span>Complete Document & Schema Repository</span>
          </h2>

          <div className="flex flex-wrap gap-1.5 text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-lg font-semibold transition-colors ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white'
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Downloads DataTable */}
        <DataTable data={filteredDownloads} columns={columns} keyExtractor={(item) => item.id} />
      </section>

      {/* Fullscreen Preview Modal */}
      {isPreviewModalOpen && activePreviewDoc && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm p-4 flex items-center justify-center overflow-y-auto animate-in fade-in duration-150">
          <div className="w-full max-w-5xl">
            <PdfDocumentViewer
              document={activePreviewDoc}
              onClose={() => setIsPreviewModalOpen(false)}
              isModal={true}
            />
          </div>
        </div>
      )}
    </div>
  );
};
