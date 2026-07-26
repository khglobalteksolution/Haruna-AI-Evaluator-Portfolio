import React, { useState } from 'react';
import { Download, FileText, Check, Printer } from 'lucide-react';

interface PdfExportButtonProps {
  documentTitle: string;
  reportData?: unknown;
  id?: string;
  className?: string;
}

export const PdfExportButton: React.FC<PdfExportButtonProps> = ({
  documentTitle,
  reportData,
  id,
  className = '',
}) => {
  const [downloaded, setDownloaded] = useState(false);

  const handlePrintPdf = () => {
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
    window.print();
  };

  const handleDownloadJson = () => {
    if (!reportData) return;
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${documentTitle.toLowerCase().replace(/[^a-z0-0]/g, '-')}-report.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div id={id} className={`flex flex-wrap items-center gap-2 ${className}`}>
      <button
        type="button"
        onClick={handlePrintPdf}
        className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-xs sm:text-sm flex items-center gap-2 transition-all shadow-sm focus:ring-2 focus:ring-indigo-500/50"
      >
        {downloaded ? <Check className="w-4 h-4 text-emerald-300" /> : <Printer className="w-4 h-4" />}
        <span>{downloaded ? 'Exporting PDF...' : 'Download PDF / Print'}</span>
      </button>

      {reportData && (
        <button
          type="button"
          onClick={handleDownloadJson}
          className="px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-medium text-xs sm:text-sm flex items-center gap-2 transition-all shadow-sm"
        >
          <FileText className="w-4 h-4 text-indigo-500" />
          <span>Export RAW JSON</span>
        </button>
      )}
    </div>
  );
};
