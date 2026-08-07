import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  NavigationPage,
  EvaluationReport,
  PromptExperiment,
  ResearchPaper,
  ResourceItem,
  DownloadItem,
  FilterState,
} from '../types';
import {
  DEFAULT_EVALUATION_REPORTS,
  DEFAULT_PROMPT_EXPERIMENTS,
  DEFAULT_RESEARCH_PAPERS,
  DEFAULT_RESOURCES,
  DEFAULT_DOWNLOADS,
} from '../data/defaultData';

interface DataContextType {
  currentPage: NavigationPage;
  setCurrentPage: (page: NavigationPage) => void;
  selectedReportId: string | null;
  setSelectedReportId: (id: string | null) => void;
  selectedResearchId: string | null;
  setSelectedResearchId: (id: string | null) => void;

  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;

  reports: EvaluationReport[];
  prompts: PromptExperiment[];
  research: ResearchPaper[];
  resources: ResourceItem[];
  downloads: DownloadItem[];

  activeJsonModalContent: { title: string; json: unknown } | null;
  setActiveJsonModalContent: (val: { title: string; json: unknown } | null) => void;

  isSeoModalOpen: boolean;
  setIsSeoModalOpen: (val: boolean) => void;

  loadReportFromJsonFile: (jsonPath: string) => Promise<EvaluationReport | null>;
  navigateToReport: (reportId: string) => void;
  navigateToResearch: (researchId: string) => void;
}

const DEFAULT_FILTERS: FilterState = {
  searchQuery: '',
  category: 'All',
  tag: 'All',
  status: 'All',
  sortBy: 'date-desc',
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<NavigationPage>('home');
  const [selectedReportId, setSelectedReportId] = useState<string | null>('eval-001');
  const [selectedResearchId, setSelectedResearchId] = useState<string | null>('research-001');
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);

  const [reports, setReports] = useState<EvaluationReport[]>(DEFAULT_EVALUATION_REPORTS);
  const [prompts] = useState<PromptExperiment[]>(DEFAULT_PROMPT_EXPERIMENTS);
  const [research] = useState<ResearchPaper[]>(DEFAULT_RESEARCH_PAPERS);
  const [resources] = useState<ResourceItem[]>(DEFAULT_RESOURCES);
  const [downloads] = useState<DownloadItem[]>(DEFAULT_DOWNLOADS);

  const [activeJsonModalContent, setActiveJsonModalContent] = useState<{ title: string; json: unknown } | null>(null);
  const [isSeoModalOpen, setIsSeoModalOpen] = useState<boolean>(false);

  // Dynamic loader for evaluation reports from JSON files in /data/evaluations/
  const loadReportFromJsonFile = async (jsonPath: string): Promise<EvaluationReport | null> => {
    try {
      const response = await fetch(jsonPath);
      if (!response.ok) {
        throw new Error(`Failed to load ${jsonPath}`);
      }
      const data: EvaluationReport = await response.json();
      return data;
    } catch (err) {
      console.warn(`Could not load external JSON file from ${jsonPath}, falling back to memory store.`, err);
      return null;
    }
  };

  // Pre-fetch JSON files on mount to verify dynamic json file loading requirement
  useEffect(() => {
    const jsonFiles = [
      '/data/evaluations/eval-001.json',
      '/data/evaluations/eval-002.json',
      '/data/evaluations/eval-003.json',
    ];

    Promise.all(
      jsonFiles.map(async (file) => {
        const loaded = await loadReportFromJsonFile(file);
        return loaded;
      })
    ).then((fetchedReports) => {
      const validReports = fetchedReports.filter((r): r is EvaluationReport => r !== null);
      if (validReports.length > 0) {
        // Merge or replace reports with fetched JSON files
        setReports((existing) => {
          const map = new Map(existing.map((item) => [item.id, item]));
          validReports.forEach((item) => map.set(item.id, item));
          return Array.from(map.values());
        });
      }
    });
  }, []);

  const resetFilters = () => setFilters(DEFAULT_FILTERS);

  const navigateToReport = (reportId: string) => {
    setSelectedReportId(reportId);
    setCurrentPage('report-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToResearch = (researchId: string) => {
    setSelectedResearchId(researchId);
    setCurrentPage('research-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <DataContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        selectedReportId,
        setSelectedReportId,
        selectedResearchId,
        setSelectedResearchId,
        filters,
        setFilters,
        resetFilters,
        reports,
        prompts,
        research,
        resources,
        downloads,
        activeJsonModalContent,
        setActiveJsonModalContent,
        isSeoModalOpen,
        setIsSeoModalOpen,
        loadReportFromJsonFile,
        navigateToReport,
        navigateToResearch,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
