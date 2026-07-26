import React, { useState } from 'react';
import { FileCheck2, LayoutGrid, Table as TableIcon, FileCode, ArrowRight } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Card } from '../common/Card';
import { Badge, SeverityBadge, Tag } from '../common/Badge';
import { SearchBar, FilterSidebar } from '../common/SearchBar';
import { Pagination } from '../common/Pagination';
import { DataTable, Column } from '../common/DataTable';
import { EvaluationReport } from '../../types';

export const ReportsView: React.FC = () => {
  const { reports, filters, setFilters, resetFilters, navigateToReport, setActiveJsonModalContent } = useData();
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [currentPageNum, setCurrentPageNum] = useState<number>(1);
  const pageSize = 6;

  const categories = Array.from(new Set(reports.map((r) => r.category)));
  const allTags = Array.from(new Set(reports.flatMap((r) => r.tags)));

  // Filtering Logic
  const filteredReports = reports.filter((report) => {
    if (filters.searchQuery) {
      const q = filters.searchQuery.toLowerCase();
      const matchesTitle = report.title.toLowerCase().includes(q);
      const matchesSummary = report.summary.toLowerCase().includes(q);
      const matchesCategory = report.category.toLowerCase().includes(q);
      const matchesTags = report.tags.some((t) => t.toLowerCase().includes(q));
      if (!matchesTitle && !matchesSummary && !matchesCategory && !matchesTags) return false;
    }

    if (filters.category !== 'All' && report.category !== filters.category) return false;
    if (filters.tag !== 'All' && !report.tags.includes(filters.tag)) return false;

    return true;
  });

  // Sorting Logic
  const sortedReports = [...filteredReports].sort((a, b) => {
    if (filters.sortBy === 'date-desc') return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    if (filters.sortBy === 'date-asc') return new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
    if (filters.sortBy === 'score-desc') return b.overallScore - a.overallScore;
    if (filters.sortBy === 'score-asc') return a.overallScore - b.overallScore;
    if (filters.sortBy === 'name') return a.title.localeCompare(b.title);
    return 0;
  });

  // Pagination Logic
  const totalPages = Math.ceil(sortedReports.length / pageSize);
  const paginatedReports = sortedReports.slice((currentPageNum - 1) * pageSize, currentPageNum * pageSize);

  // Table Columns
  const columns: Column<EvaluationReport>[] = [
    {
      key: 'title',
      header: 'Report Title',
      accessor: (r) => (
        <div className="space-y-1">
          <button
            type="button"
            onClick={() => navigateToReport(r.id)}
            className="font-bold text-zinc-900 dark:text-zinc-100 hover:text-indigo-600 dark:hover:text-indigo-400 text-left line-clamp-1"
          >
            {r.title}
          </button>
          <span className="text-[11px] text-zinc-500 block">{r.targetModel.name}</span>
        </div>
      ),
      sortable: true,
      sortKey: 'title',
    },
    {
      key: 'category',
      header: 'Category',
      accessor: (r) => <Badge variant="info">{r.category}</Badge>,
      sortable: true,
      sortKey: 'category',
    },
    {
      key: 'score',
      header: 'Score',
      accessor: (r) => (
        <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400 text-sm">
          {r.overallScore}%
        </span>
      ),
      sortable: true,
      sortKey: 'overallScore',
    },
    {
      key: 'riskLevel',
      header: 'Risk Level',
      accessor: (r) => <SeverityBadge level={r.riskLevel} />,
      sortable: true,
      sortKey: 'riskLevel',
    },
    {
      key: 'actions',
      header: 'Actions',
      accessor: (r) => (
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => navigateToReport(r.id)}
            className="px-2.5 py-1 rounded bg-indigo-600 text-white font-medium text-xs hover:bg-indigo-700"
          >
            View Report
          </button>
          <button
            type="button"
            onClick={() => setActiveJsonModalContent({ title: r.title, json: r })}
            className="p-1 rounded border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500"
            title="Inspect RAW JSON File"
          >
            <FileCode className="w-3.5 h-3.5 text-indigo-500" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-8 py-8">
      {/* Header */}
      <section className="space-y-3 border-b border-zinc-200 dark:border-zinc-800 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold text-xs border border-indigo-500/20">
          <FileCheck2 className="w-3.5 h-3.5" />
          <span>Evaluation Reports Registry</span>
        </div>
        <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-100">
          AI Evaluation Reports & Benchmark Audits
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
          Every report is loaded directly from its own serialized JSON schema file in <code className="text-indigo-500">/public/data/evaluations/</code>.
        </p>
      </section>

      {/* Main Content Layout with Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Filters */}
        <div className="lg:col-span-1 space-y-6">
          <FilterSidebar
            filters={filters}
            setFilters={setFilters}
            categories={categories}
            tags={allTags}
            onReset={resetFilters}
          />
        </div>

        {/* Main Reports List */}
        <div className="lg:col-span-3 space-y-6">
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <SearchBar
              value={filters.searchQuery}
              onChange={(val) => setFilters((prev) => ({ ...prev, searchQuery: val }))}
              placeholder="Search reports by title, category, or tag..."
            />

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg border ${
                  viewMode === 'grid'
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : 'border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                }`}
                title="Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('table')}
                className={`p-2 rounded-lg border ${
                  viewMode === 'table'
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : 'border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                }`}
                title="Table View"
              >
                <TableIcon className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Tag Quick Filters */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-xs text-zinc-500 font-semibold mr-1">Popular Tags:</span>
            {allTags.map((t) => (
              <Tag
                key={t}
                label={t}
                active={filters.tag === t}
                onClick={() => setFilters((prev) => ({ ...prev, tag: prev.tag === t ? 'All' : t }))}
              />
            ))}
          </div>

          {/* Grid View */}
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {paginatedReports.length === 0 ? (
                <div className="col-span-2 p-12 text-center rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-800 text-zinc-500 space-y-2">
                  <p className="font-semibold text-base">No matching evaluation reports found.</p>
                  <p className="text-xs">Try adjusting your category, tag, or search filters.</p>
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="px-4 py-2 mt-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                paginatedReports.map((report) => (
                  <Card
                    key={report.id}
                    className="p-6 flex flex-col justify-between space-y-4"
                    onClick={() => navigateToReport(report.id)}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Badge variant="info">{report.category}</Badge>
                        <SeverityBadge level={report.riskLevel} />
                      </div>

                      <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                        {report.title}
                      </h3>

                      <p className="text-xs text-zinc-600 dark:text-zinc-300 line-clamp-3 leading-relaxed">
                        {report.summary}
                      </p>

                      <div className="flex flex-wrap gap-1 pt-1">
                        {report.tags.map((t) => (
                          <span
                            key={t}
                            className="px-2 py-0.5 rounded text-[10px] bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                          >
                            #{t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs">
                      <div>
                        <span className="text-zinc-400 block text-[10px]">Overall Score</span>
                        <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400 text-sm">
                          {report.overallScore}/100
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveJsonModalContent({ title: report.title, json: report });
                          }}
                          className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-300"
                          title="View RAW JSON Schema"
                        >
                          <FileCode className="w-3.5 h-3.5 text-indigo-500" />
                        </button>
                        <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
                          Report Details
                          <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </div>
          ) : (
            <DataTable data={paginatedReports} columns={columns} keyExtractor={(r) => r.id} />
          )}

          {/* Pagination */}
          <Pagination
            currentPage={currentPageNum}
            totalPages={totalPages}
            onPageChange={(p) => setCurrentPageNum(p)}
            totalItems={sortedReports.length}
            pageSize={pageSize}
          />
        </div>
      </div>
    </div>
  );
};
