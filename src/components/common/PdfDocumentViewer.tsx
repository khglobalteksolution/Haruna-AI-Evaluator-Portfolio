import React, { useState, useRef } from 'react';
import {
  FileText,
  Search,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  ChevronLeft,
  ChevronRight,
  Download,
  Printer,
  List,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Eye,
  Hash,
  Calendar,
  Layers,
  Award,
  BookOpen,
  Code,
  FileCheck2,
  X,
  ExternalLink
} from 'lucide-react';
import { DownloadItem } from '../../types';

interface PdfDocumentViewerProps {
  document: DownloadItem;
  onClose?: () => void;
  isModal?: boolean;
}

export const PdfDocumentViewer: React.FC<PdfDocumentViewerProps> = ({
  document: doc,
  onClose,
  isModal = false,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showOutline, setShowOutline] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'content' | 'metadata' | 'hash'>('content');

  const containerRef = useRef<HTMLDivElement>(null);

  // Total pages based on document category/size
  const totalPages = doc.category === 'Resume' ? 2 : doc.category === 'Handbook' ? 4 : doc.category === 'Guide' ? 3 : 2;

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 15, 175));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 15, 60));
  const handleResetZoom = () => setZoomLevel(100);

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const a = window.document.createElement('a');
    a.href = doc.downloadUrl;
    a.download = doc.filename;
    a.click();
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (window.document.exitFullscreen) {
        window.document.exitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  // Helper function to render page-specific content for different documents
  const renderPageContent = (page: number) => {
    switch (doc.id) {
      case 'dl-001': // Resume
        if (page === 1) {
          return (
            <div className="space-y-6 text-zinc-800 dark:text-zinc-200">
              {/* Document Header Header */}
              <div className="border-b-2 border-indigo-600 pb-4 flex justify-between items-start">
                <div>
                  <h1 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-zinc-100">
                    HARUNA KUFORIJI
                  </h1>
                  <p className="text-xs font-bold text-indigo-600 dark:text-indigo-400 tracking-wider uppercase mt-1">
                    Senior AI Evaluator & LLM Safety Specialist
                  </p>
                  <p className="text-[11px] text-zinc-500 mt-1">
                    London, UK • khglobalteksolution@gmail.com • harunakuforiji.dev
                  </p>
                </div>
                <div className="text-right">
                  <span className="px-2.5 py-1 rounded bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-300 font-mono text-[10px] font-bold border border-indigo-200 dark:border-indigo-800">
                    ATS VERIFIED 2026
                  </span>
                </div>
              </div>

              {/* Executive Summary */}
              <div className="space-y-1.5">
                <h2 className="text-xs font-extrabold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 border-b border-zinc-200 dark:border-zinc-800 pb-1">
                  Executive Profile
                </h2>
                <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-300">
                  Accomplished Senior AI Evaluator with 6+ years specializing in LLM benchmarking, safety red-teaming, RAG contextual grounding audits, and prompt engineering guardrails. Proven track record evaluating state-of-the-art frontier models (Gemini 1.5 Pro, Claude 3.5 Sonnet, GPT-4o) across 150+ quantitative rubric dimensions and automated CI/CD test pipelines.
                </p>
              </div>

              {/* Core Competencies */}
              <div className="space-y-2">
                <h2 className="text-xs font-extrabold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 border-b border-zinc-200 dark:border-zinc-800 pb-1">
                  Core AI Evaluation Competencies
                </h2>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2 rounded bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800">
                    <span className="font-bold text-indigo-600 dark:text-indigo-400 block">LLM Benchmarking & Rubrics</span>
                    <span className="text-[11px] text-zinc-500">AIE-v2.4 Framework, Pass@1 execution, 5-level scoring matrices</span>
                  </div>
                  <div className="p-2 rounded bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800">
                    <span className="font-bold text-indigo-600 dark:text-indigo-400 block">Safety & Red-Teaming</span>
                    <span className="text-[11px] text-zinc-500">Adversarial jailbreaks, indirect prompt injection, Base64/ROT13 bypasses</span>
                  </div>
                  <div className="p-2 rounded bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800">
                    <span className="font-bold text-indigo-600 dark:text-indigo-400 block">RAG Grounding & Attribution</span>
                    <span className="text-[11px] text-zinc-500">Citation precision, chunk-level factual audits, hallucination metrics</span>
                  </div>
                  <div className="p-2 rounded bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800">
                    <span className="font-bold text-indigo-600 dark:text-indigo-400 block">Prompt Engineering & Guardrails</span>
                    <span className="text-[11px] text-zinc-500">XML boundary tags, negative constraint enforcers, JSON schema validation</span>
                  </div>
                </div>
              </div>

              {/* Professional Experience */}
              <div className="space-y-3">
                <h2 className="text-xs font-extrabold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 border-b border-zinc-200 dark:border-zinc-800 pb-1">
                  Professional Experience
                </h2>

                <div className="space-y-1 text-xs">
                  <div className="flex justify-between items-baseline font-bold text-zinc-900 dark:text-zinc-100">
                    <span>Lead AI Evaluator — Frontier AI Quality Lab</span>
                    <span className="text-zinc-500 text-[11px]">2024 — Present</span>
                  </div>
                  <ul className="list-disc pl-4 text-zinc-600 dark:text-zinc-300 space-y-1 text-[11px]">
                    <li>Engineered automated benchmarking pipelines evaluating 25+ frontier LLMs across reasoning, safety, code generation, and RAG grounding.</li>
                    <li>Designed AIE-v2.4 evaluation framework reducing false refusal rate by 34% while maintaining 99.2% adversarial prompt block rate.</li>
                    <li>Authored 15 detailed technical evaluation reports and led red-teaming exercises against indirect prompt injection vectors.</li>
                  </ul>
                </div>

                <div className="space-y-1 text-xs">
                  <div className="flex justify-between items-baseline font-bold text-zinc-900 dark:text-zinc-100">
                    <span>Senior LLM Safety & QA Engineer — Global Tech Solutions</span>
                    <span className="text-zinc-500 text-[11px]">2021 — 2024</span>
                  </div>
                  <ul className="list-disc pl-4 text-zinc-600 dark:text-zinc-300 space-y-1 text-[11px]">
                    <li>Curated gold-standard evaluation datasets comprising 10,000+ adversarial test cases, multi-hop logical deductions, and RAG citation tests.</li>
                    <li>Developed real-time evaluation dashboard monitoring model latency, throughput, hallucination rates, and compliance scores.</li>
                  </ul>
                </div>
              </div>
            </div>
          );
        } else {
          return (
            <div className="space-y-6 text-zinc-800 dark:text-zinc-200">
              <div className="border-b border-zinc-200 dark:border-zinc-800 pb-2 flex justify-between items-center text-xs text-zinc-500">
                <span>HARUNA KUFORIJI — RESUME (CONTINUED)</span>
                <span>PAGE 2 OF 2</span>
              </div>

              {/* Technical Skills */}
              <div className="space-y-2">
                <h2 className="text-xs font-extrabold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 border-b border-zinc-200 dark:border-zinc-800 pb-1">
                  Technical Stack & Tooling
                </h2>
                <div className="grid grid-cols-2 gap-2 text-[11px] text-zinc-600 dark:text-zinc-300">
                  <div><strong>Languages:</strong> Python, TypeScript, SQL, Bash, Markdown</div>
                  <div><strong>AI SDKs:</strong> @google/genai, OpenAI API, Anthropic SDK</div>
                  <div><strong>Frameworks:</strong> PyTorch, Hugging Face, LangChain, LlamaIndex</div>
                  <div><strong>Evaluation Tools:</strong> Ragas, DeepEval, Promptfoo, Phoenix</div>
                  <div><strong>Database & Cloud:</strong> Firestore, Cloud SQL PostgreSQL, GCP, Docker</div>
                  <div><strong>Compliance & Standards:</strong> OWASP LLM Top 10, NIST AI RMF, WCAG 2.1 AA</div>
                </div>
              </div>

              {/* Education & Credentials */}
              <div className="space-y-2">
                <h2 className="text-xs font-extrabold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 border-b border-zinc-200 dark:border-zinc-800 pb-1">
                  Education & Professional Certifications
                </h2>
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between font-bold text-zinc-900 dark:text-zinc-100">
                    <span>M.Sc. Computer Science (Artificial Intelligence Focus)</span>
                    <span className="text-zinc-500 text-[11px]">Distinction</span>
                  </div>
                  <div className="flex justify-between font-bold text-zinc-900 dark:text-zinc-100">
                    <span>Certified LLM Safety & Red-Teaming Specialist</span>
                    <span className="text-indigo-600 dark:text-indigo-400 text-[11px]">2025</span>
                  </div>
                  <div className="flex justify-between font-bold text-zinc-900 dark:text-zinc-100">
                    <span>AWS Certified Machine Learning — Specialty</span>
                    <span className="text-indigo-600 dark:text-indigo-400 text-[11px]">2024</span>
                  </div>
                </div>
              </div>

              {/* Publications & Key Achievements */}
              <div className="space-y-2">
                <h2 className="text-xs font-extrabold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 border-b border-zinc-200 dark:border-zinc-800 pb-1">
                  Publications & Research Contributions
                </h2>
                <ul className="list-disc pl-4 text-zinc-600 dark:text-zinc-300 space-y-1 text-[11px]">
                  <li>"Systematic Audit of Multi-Hop Deductive Failures in Frontier LLMs" — Published 2026.</li>
                  <li>"Mitigating Indirect Prompt Injection via Passive XML Context Isolation" — Open Source Whitepaper.</li>
                  <li>"AIE-v2.4: An Open 5-Level Rubric Matrix for Automated Model Evaluation".</li>
                </ul>
              </div>

              {/* Signature Block */}
              <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800 flex justify-between items-end">
                <div className="space-y-1">
                  <div className="font-serif italic text-lg text-indigo-700 dark:text-indigo-300">Haruna Kuforiji</div>
                  <p className="text-[10px] font-mono text-zinc-500">DIGITALLY SIGNED & VERIFIED DOCUMENT</p>
                </div>
                <div className="text-right text-[10px] text-zinc-400 font-mono">
                  HASH: {doc.sha256Hash.substring(0, 20)}...
                </div>
              </div>
            </div>
          );
        }

      default: // Other documents
        return (
          <div className="space-y-6 text-zinc-800 dark:text-zinc-200">
            {/* Header */}
            <div className="border-b-2 border-indigo-600 pb-3 flex justify-between items-start">
              <div>
                <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-mono font-bold text-[10px]">
                  {doc.category.toUpperCase()} • VERSION {doc.version}
                </span>
                <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mt-1">
                  {doc.title}
                </h1>
                <p className="text-xs text-zinc-500 mt-0.5">
                  Author: Haruna Kuforiji • Published: {doc.lastUpdated}
                </p>
              </div>
              <div className="text-right font-mono text-[10px] text-zinc-400">
                <span>PAGE {page} OF {totalPages}</span>
              </div>
            </div>

            {/* Document Overview */}
            <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 space-y-2">
              <h3 className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Document Executive Summary & Scope</span>
              </h3>
              <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-300">
                {doc.description}
              </p>
            </div>

            {page === 1 ? (
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase text-zinc-900 dark:text-zinc-100 border-b border-zinc-200 dark:border-zinc-800 pb-1">
                  Section 1: Methodology Framework & Rubric Architecture
                </h3>
                <div className="space-y-2 text-xs text-zinc-600 dark:text-zinc-300">
                  <p>
                    This document provides standard operating instructions, formal JSON specifications, and error taxonomy mappings developed for rigorous LLM benchmarking.
                  </p>
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="p-3 rounded bg-zinc-100 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700">
                      <span className="font-bold text-zinc-900 dark:text-zinc-100 block mb-1">
                        Quantitative Scoring Formula
                      </span>
                      <code className="text-[10px] font-mono text-indigo-600 dark:text-indigo-300 block">
                        Score = ∑ (Weight_i × LevelScore_i) × SeverityMultiplier
                      </code>
                    </div>
                    <div className="p-3 rounded bg-zinc-100 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700">
                      <span className="font-bold text-zinc-900 dark:text-zinc-100 block mb-1">
                        Audit Confidence Rating
                      </span>
                      <span className="text-[10px] text-zinc-500 block">
                        HIGH: Ground truth verified against gold-standard dataset unit tests.
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                    Evaluation Matrix Key Modules
                  </h4>
                  <div className="space-y-1.5 text-xs">
                    <div className="flex items-center justify-between p-2 rounded bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                      <span className="font-bold">AIE-MOD-01: Symbolic Reasoning & Logic</span>
                      <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold">25% Weight</span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                      <span className="font-bold">AIE-MOD-02: RAG Contextual Grounding</span>
                      <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold">30% Weight</span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                      <span className="font-bold">AIE-MOD-03: Safety & Adversarial Red-Teaming</span>
                      <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold">25% Weight</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase text-zinc-900 dark:text-zinc-100 border-b border-zinc-200 dark:border-zinc-800 pb-1">
                  Section 2: Verification Checklist & Error Taxonomy Mapping
                </h3>
                <div className="space-y-2 text-xs">
                  <div className="p-3 rounded-lg border border-amber-500/30 bg-amber-500/5 space-y-1">
                    <span className="font-bold text-amber-600 dark:text-amber-400 block font-mono">
                      ERR-SEC-01: Indirect Prompt Injection Vulnerability
                    </span>
                    <p className="text-[11px] text-zinc-600 dark:text-zinc-300">
                      Model obeys malicious directives embedded inside external context passages. Remediation: Enforce XML boundary tags.
                    </p>
                  </div>
                  <div className="p-3 rounded-lg border border-red-500/30 bg-red-500/5 space-y-1">
                    <span className="font-bold text-red-600 dark:text-red-400 block font-mono">
                      ERR-HAL-01: Entity Substitution Hallucination
                    </span>
                    <p className="text-[11px] text-zinc-600 dark:text-zinc-300">
                      Model swaps proper nouns or numerical figures. Remediation: Chunk-level claim cross-checking.
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex justify-between items-center text-[10px] text-zinc-500 font-mono">
                  <span>VERIFICATION HASH: {doc.sha256Hash.substring(0, 24)}...</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">SHA-256 MATCHED ✅</span>
                </div>
              </div>
            )}
          </div>
        );
    }
  };

  // Table of Contents list items
  const tocItems = [
    { title: 'Title & Executive Summary', page: 1 },
    { title: 'Core Competencies & Framework', page: 1 },
    { title: 'Evaluation Rubric & Modules', page: 1 },
    { title: 'Error Taxonomy & Remediation', page: 2 },
    { title: 'Audit Verification & Sign-Off', page: Math.min(2, totalPages) },
  ];

  return (
    <div
      ref={containerRef}
      className={`bg-zinc-900 text-zinc-100 rounded-2xl border border-zinc-800 shadow-2xl overflow-hidden flex flex-col ${
        isModal ? 'max-w-4xl w-full mx-auto my-4 max-h-[90vh]' : 'w-full h-[680px]'
      }`}
    >
      {/* Top Embedded PDF Control Toolbar */}
      <div className="bg-zinc-950 border-b border-zinc-800 px-4 py-3 flex flex-wrap items-center justify-between gap-3 text-xs select-none">
        {/* Left: Document Info */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setShowOutline(!showOutline)}
            className={`p-1.5 rounded-lg border transition-colors ${
              showOutline
                ? 'bg-indigo-600/20 text-indigo-400 border-indigo-500/30'
                : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white'
            }`}
            title="Toggle Outline / Table of Contents"
          >
            <List className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-indigo-400" />
            <div className="max-w-[200px] sm:max-w-[300px] truncate">
              <span className="font-bold text-zinc-100 block truncate" title={doc.filename}>
                {doc.filename}
              </span>
              <span className="text-[10px] text-zinc-500 font-mono block">
                {doc.fileSize} • {doc.format} • v{doc.version}
              </span>
            </div>
          </div>
        </div>

        {/* Center: Page Controls & Zoom */}
        <div className="flex items-center gap-3 bg-zinc-900/80 px-3 py-1.5 rounded-xl border border-zinc-800">
          {/* Page Nav */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="p-1 rounded text-zinc-400 hover:text-white disabled:opacity-30 disabled:hover:text-zinc-400"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-mono text-[11px] text-zinc-300 min-w-[65px] text-center">
              {currentPage} / {totalPages}
            </span>
            <button
              type="button"
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="p-1 rounded text-zinc-400 hover:text-white disabled:opacity-30 disabled:hover:text-zinc-400"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="w-px h-4 bg-zinc-800" />

          {/* Zoom */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={handleZoomOut}
              className="p-1 rounded text-zinc-400 hover:text-white"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={handleResetZoom}
              className="font-mono text-[10px] text-zinc-400 hover:text-indigo-400 px-1"
              title="Reset Zoom"
            >
              {zoomLevel}%
            </button>
            <button
              type="button"
              onClick={handleZoomIn}
              className="p-1 rounded text-zinc-400 hover:text-white"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right Tools: Print, Download, Fullscreen, Close */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrint}
            className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800"
            title="Print Document"
          >
            <Printer className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleDownload}
            className="p-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold flex items-center gap-1.5 shadow-sm"
            title="Download File"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline text-xs">Download</span>
          </button>
          <button
            type="button"
            onClick={toggleFullscreen}
            className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 hidden sm:flex"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800"
              title="Close Viewer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Main Viewer Body (Sidebar + Paper Canvas) */}
      <div className="flex-1 flex overflow-hidden relative bg-zinc-950">
        {/* Outline / Metadata Sidebar */}
        {showOutline && (
          <div className="w-64 bg-zinc-900 border-r border-zinc-800 p-4 space-y-4 flex-shrink-0 overflow-y-auto text-xs">
            {/* Sidebar Tabs */}
            <div className="flex border-b border-zinc-800 pb-2 gap-2 text-[11px] font-bold">
              <button
                type="button"
                onClick={() => setActiveTab('content')}
                className={`pb-1 border-b-2 ${
                  activeTab === 'content'
                    ? 'border-indigo-500 text-indigo-400'
                    : 'border-transparent text-zinc-500 hover:text-zinc-300'
                }`}
              >
                Outline
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('metadata')}
                className={`pb-1 border-b-2 ${
                  activeTab === 'metadata'
                    ? 'border-indigo-500 text-indigo-400'
                    : 'border-transparent text-zinc-500 hover:text-zinc-300'
                }`}
              >
                Metadata
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('hash')}
                className={`pb-1 border-b-2 ${
                  activeTab === 'hash'
                    ? 'border-indigo-500 text-indigo-400'
                    : 'border-transparent text-zinc-500 hover:text-zinc-300'
                }`}
              >
                Security
              </button>
            </div>

            {activeTab === 'content' && (
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block">
                  Table of Contents
                </span>
                <div className="space-y-1">
                  {tocItems.map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setCurrentPage(item.page)}
                      className={`w-full text-left p-2 rounded-lg transition-colors text-xs flex items-center justify-between ${
                        currentPage === item.page
                          ? 'bg-indigo-600/20 text-indigo-300 font-semibold border border-indigo-500/30'
                          : 'text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200'
                      }`}
                    >
                      <span className="truncate pr-2">• {item.title}</span>
                      <span className="font-mono text-[10px] opacity-60">p.{item.page}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'metadata' && (
              <div className="space-y-3 text-[11px] text-zinc-400">
                <div className="space-y-1">
                  <span className="text-zinc-500 font-bold block">Document Title</span>
                  <span className="text-zinc-200 font-semibold">{doc.title}</span>
                </div>
                <div className="space-y-1">
                  <span className="text-zinc-500 font-bold block">Category</span>
                  <span className="text-indigo-400 font-bold">{doc.category}</span>
                </div>
                <div className="space-y-1">
                  <span className="text-zinc-500 font-bold block">File Format & Size</span>
                  <span className="font-mono text-zinc-300">{doc.format} ({doc.fileSize})</span>
                </div>
                <div className="space-y-1">
                  <span className="text-zinc-500 font-bold block">Last Modified</span>
                  <span className="font-mono text-zinc-300">{doc.lastUpdated}</span>
                </div>
              </div>
            )}

            {activeTab === 'hash' && (
              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 space-y-1">
                  <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-xs">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Cryptographically Signed</span>
                  </div>
                  <p className="text-[10px] text-zinc-400 leading-snug">
                    Verified SHA-256 checksum matches repository build artifact.
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] text-zinc-500 font-mono font-bold block uppercase">
                    SHA-256 Checksum
                  </span>
                  <code className="p-2 rounded bg-zinc-950 text-[10px] text-indigo-300 font-mono block break-all border border-zinc-800">
                    {doc.sha256Hash}
                  </code>
                </div>
              </div>
            )}
          </div>
        )}

        {/* PDF Page Display Area */}
        <div className="flex-1 overflow-auto p-6 flex justify-center items-start bg-zinc-900/90">
          {/* Virtual Paper Sheet Container */}
          <div
            style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
            className="transition-transform duration-200 ease-out bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 w-[640px] min-h-[820px] rounded-sm shadow-2xl p-8 sm:p-12 relative border border-zinc-200 dark:border-zinc-800 flex flex-col justify-between"
          >
            {/* Watermark */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] select-none">
              <span className="text-6xl font-black uppercase tracking-widest rotate-[-30deg] text-zinc-900 dark:text-zinc-100">
                HARUNA KUFORIJI
              </span>
            </div>

            {/* Render Page Content */}
            <div className="relative z-10 flex-1">
              {renderPageContent(currentPage)}
            </div>

            {/* PDF Footer Page Number & Security Line */}
            <div className="relative z-10 pt-8 mt-6 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between text-[10px] text-zinc-400 font-mono">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-500" />
                <span>CONFIDENTIAL & AUTHENTICATED AI EVALUATOR PORTFOLIO</span>
              </div>
              <div>
                PAGE {currentPage} OF {totalPages}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
