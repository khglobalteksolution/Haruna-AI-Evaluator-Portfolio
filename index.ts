export type NavigationPage =
  | 'home'
  | 'about'
  | 'resume'
  | 'methodology'
  | 'framework'
  | 'reports'
  | 'report-detail'
  | 'prompt-lab'
  | 'research'
  | 'research-detail'
  | 'resources'
  | 'downloads'
  | 'dashboard'
  | 'blog'
  | 'contact';

export type SeverityLevel = 'critical' | 'high' | 'medium' | 'low' | 'informational';

export type EvaluationCategory =
  | 'LLM Benchmarking'
  | 'Safety & Alignment'
  | 'Hallucination Risk'
  | 'Reasoning & Logic'
  | 'Code Generation'
  | 'Multimodal Accuracy'
  | 'Instruction Following'
  | 'RAG & Retrieval';

export interface ScoreCriterion {
  id: string;
  name: string;
  category: string;
  weight: number; // 0 to 1
  score: number; // 0 to 100
  maxScore: number;
  description: string;
  notes?: string;
  status: 'passed' | 'warning' | 'failed' | 'needs-review';
}

export interface MetricData {
  key: string;
  label: string;
  value: number | string;
  target?: number | string;
  unit?: string;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  description?: string;
}

export interface ModelBenchmarkResult {
  modelName: string;
  provider: string;
  overallScore: number;
  latencyMs: number;
  throughputTokensPerSec: number;
  hallucinationRate: number;
  complianceScore: number;
  testedAt: string;
}

export interface EvaluationReport {
  id: string;
  title: string;
  slug: string;
  subtitle: string;
  version: string;
  status: 'published' | 'draft' | 'archived' | 'in-review';
  category: EvaluationCategory;
  tags: string[];
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  createdAt: string;
  updatedAt: string;
  summary: string;
  targetModel: {
    name: string;
    version: string;
    provider: string;
    contextWindow: string;
  };
  overallScore: number; // 0-100
  riskLevel: SeverityLevel;
  criteriaScores: ScoreCriterion[];
  keyFindings: string[];
  recommendations: string[];
  testEnvironment: {
    frameworkVersion: string;
    datasetSize: number;
    evaluationDate: string;
    temperature: number;
    systemPromptHash: string;
  };
  markdownContent?: string;
  downloadUrl?: string;
  jsonFileUrl?: string;
}

export interface PromptExperiment {
  id: string;
  title: string;
  category: string;
  tags: string[];
  version: string;
  updatedAt: string;
  systemPrompt: string;
  userPrompt: string;
  parameters: {
    temperature: number;
    topP: number;
    maxTokens: number;
  };
  evaluationRubric: {
    criterion: string;
    expectedBehavior: string;
    observedBehavior: string;
    score: number;
  }[];
  passRatePercentage: number;
  notes: string;
}

export interface ResearchPaper {
  id: string;
  title: string;
  slug: string;
  abstract: string;
  category: string;
  tags: string[];
  publishedDate: string;
  updatedDate: string;
  readingTimeMinutes: number;
  authors: string[];
  downloadPdfUrl?: string;
  markdownUrl?: string;
  content: string;
  keyTakeaways: string[];
}

export interface ResourceItem {
  id: string;
  title: string;
  description: string;
  category: string;
  type: 'Dataset Schema' | 'Evaluation Checklist' | 'Rubric Template' | 'Tooling Script' | 'Guidelines';
  format: 'JSON' | 'Markdown' | 'YAML' | 'PDF' | 'CSV';
  tags: string[];
  updatedAt: string;
  fileSize?: string;
  downloadUrl: string;
}

export interface DownloadItem {
  id: string;
  title: string;
  filename: string;
  category: string;
  format: string;
  fileSize: string;
  version: string;
  sha256Hash: string;
  description: string;
  downloadUrl: string;
  lastUpdated: string;
}

export interface FilterState {
  searchQuery: string;
  category: string;
  tag: string;
  status: string;
  sortBy: 'date-desc' | 'date-asc' | 'score-desc' | 'score-asc' | 'name';
  minScore?: number;
}

export interface EvaluationFrameworkModule {
  id: string;
  code: string;
  name: string;
  description: string;
  totalRubrics: number;
  weighting: string;
  metricsList: string[];
  exampleJsonSchema: string;
}

export interface SEOConfig {
  title: string;
  description: string;
  canonicalUrl: string;
  ogType: string;
  ogImage: string;
  twitterCard: string;
  jsonLd: Record<string, unknown>;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  author: string;
  publishedDate: string;
  readingTimeMinutes: number;
  tags: string[];
}
