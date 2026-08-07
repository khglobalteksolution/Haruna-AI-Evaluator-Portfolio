import React, { useState, useEffect } from 'react';
import {
  FileJson,
  CheckCircle2,
  AlertCircle,
  Braces,
  Copy,
  Check,
  RefreshCw,
  Sparkles,
  ChevronDown,
  ChevronRight,
  Search,
  Zap,
  Info,
  ShieldCheck,
  AlertTriangle,
  Code2,
  Layers,
  ArrowRight
} from 'lucide-react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';

// Sample Presets for quick evaluation testing
const SAMPLE_PRESETS = [
  {
    id: 'valid_eval',
    name: 'Valid LLM Evaluation Response',
    description: 'Clean, properly structured API response with nested evaluation metrics.',
    json: JSON.stringify(
      {
        evaluation_id: 'eval_2026_08912',
        timestamp: '2026-08-06T23:50:00Z',
        model_metadata: {
          name: 'Gemini-2.5-Pro',
          temperature: 0.2,
          max_tokens: 2048,
          provider: 'Google AI Studio'
        },
        rubrics: [
          {
            criterion: 'Factual Accuracy',
            score: 98.5,
            passed: true,
            citations: ['ref_doc_01.pdf', 'ref_doc_04.pdf']
          },
          {
            criterion: 'Instruction Following',
            score: 100.0,
            passed: true,
            citations: []
          }
        ],
        safety_audit: {
          flagged: false,
          harm_categories: {
            hate_speech: 'NEGLIGIBLE',
            harassment: 'NEGLIGIBLE',
            dangerous_content: 'NEGLIGIBLE'
          }
        },
        final_decision: 'APPROVED'
      },
      null,
      2
    )
  },
  {
    id: 'malformed_syntax',
    name: 'Malformed JSON (LLM Syntax Failure)',
    description: 'Contains trailing comma, single quotes, and unquoted key - typical LLM raw output error.',
    json: `{
  "evaluation_id": "eval_err_904",
  'status': 'FAILED',
  model_name: "Claude-3.5-Sonnet",
  "scores": [85, 92, 78,],
  "reasoning": "Output was truncated mid-sentence due to max token limits"
}`
  },
  {
    id: 'nested_function_call',
    name: 'Nested Function Call Payload',
    description: 'Deeply nested tool parameters and JSON arguments array.',
    json: JSON.stringify(
      {
        tool_call_id: 'call_991823712',
        type: 'function',
        function: {
          name: 'query_vector_database',
          arguments: {
            query: 'Explain RAG hallucination metrics',
            top_k: 5,
            filters: {
              category: 'research_papers',
              date_range: {
                start: '2025-01-01',
                end: '2026-08-01'
              },
              tags: ['eval', 'hallucination', 'rag']
            },
            threshold: 0.85
          }
        }
      },
      null,
      2
    )
  },
  {
    id: 'schema_type_mismatch',
    name: 'Missing Required Fields & Type Issues',
    description: 'Valid syntax but contains null values, empty strings, and type anomalies.',
    json: JSON.stringify(
      {
        evaluation_id: '',
        timestamp: null,
        score: 'N/A (Invalid String)',
        is_verified: 'true',
        notes: 'Warning: Score should be numeric and timestamp should be ISO string.'
      },
      null,
      2
    )
  }
];

interface ValidationCheck {
  id: string;
  category: 'syntax' | 'structure' | 'types' | 'fields';
  status: 'pass' | 'fail' | 'warn';
  title: string;
  details: string;
}

export const JsonEvaluationTool: React.FC = () => {
  const [rawJson, setRawJson] = useState<string>(SAMPLE_PRESETS[0].json);
  const [parsedJson, setParsedJson] = useState<any>(null);
  const [parseError, setParseError] = useState<{ message: string; line?: number } | null>(null);
  const [validationChecks, setValidationChecks] = useState<ValidationCheck[]>([]);
  const [copied, setCopied] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'visualizer' | 'validation'>('visualizer');

  // Stats
  const [stats, setStats] = useState({
    totalKeys: 0,
    maxDepth: 0,
    totalNodes: 0,
    byteSize: 0
  });

  // Run validation whenever rawJson changes
  useEffect(() => {
    analyzeJson(rawJson);
  }, [rawJson]);

  const analyzeJson = (input: string) => {
    const bytes = new Blob([input]).size;
    const checks: ValidationCheck[] = [];

    // 1. Syntax Check
    let parsed: any = null;
    let syntaxOk = false;

    try {
      parsed = JSON.parse(input);
      syntaxOk = true;
      setParseError(null);
      checks.push({
        id: 'syntax_valid',
        category: 'syntax',
        status: 'pass',
        title: 'JSON Syntax Validation',
        details: 'Valid JSON format! Successfully parsed without syntax errors.'
      });
    } catch (err: any) {
      const errMsg = err.message || 'Invalid JSON syntax';
      let lineNum: number | undefined = undefined;

      // Try extracting position or line from error message
      const posMatch = errMsg.match(/position (\d+)/i) || errMsg.match(/line (\d+)/i);
      if (posMatch) {
        const pos = parseInt(posMatch[1], 10);
        // Estimate line number by counting newlines before pos
        const linesBefore = input.substring(0, pos).split('\n');
        lineNum = linesBefore.length;
      }

      setParseError({ message: errMsg, line: lineNum });

      // Check specific common syntax bugs
      let hint = 'Check for misplaced quotes, brackets, or commas.';
      if (input.includes(',]') || input.includes(',}')) {
        hint = 'Detected trailing comma before closing bracket/brace.';
      } else if (input.includes("'")) {
        hint = 'JSON requires double quotes (") for keys and string values, single quotes (\') are invalid.';
      } else if (/(\w+)\s*:/g.test(input) && !/"[^"]+"\s*:/g.test(input)) {
        hint = 'Object keys must be wrapped in double quotes.';
      }

      checks.push({
        id: 'syntax_error',
        category: 'syntax',
        status: 'fail',
        title: 'JSON Syntax Error Detected',
        details: `${errMsg}. ${hint}${lineNum ? ` (Approximate Line: ${lineNum})` : ''}`
      });
    }

    setParsedJson(parsed);

    if (!syntaxOk || !parsed) {
      setStats({ totalKeys: 0, maxDepth: 0, totalNodes: 0, byteSize: bytes });
      setValidationChecks(checks);
      return;
    }

    // 2. Structural & Depth Inspection
    let keysCount = 0;
    let nodesCount = 0;
    let maxDepth = 0;

    const inspect = (node: any, currentDepth: number) => {
      nodesCount++;
      if (currentDepth > maxDepth) maxDepth = currentDepth;

      if (typeof node === 'object' && node !== null) {
        if (Array.isArray(node)) {
          node.forEach((item) => inspect(item, currentDepth + 1));
        } else {
          const keys = Object.keys(node);
          keysCount += keys.length;
          keys.forEach((k) => inspect(node[k], currentDepth + 1));
        }
      }
    };

    inspect(parsed, 1);
    setStats({ totalKeys: keysCount, maxDepth, totalNodes: nodesCount, byteSize: bytes });

    checks.push({
      id: 'root_structure',
      category: 'structure',
      status: 'pass',
      title: `Root Type: ${Array.isArray(parsed) ? 'Array' : typeof parsed}`,
      details: `Document contains ${keysCount} total keys, ${nodesCount} total nodes with a maximum nesting depth of ${maxDepth}.`
    });

    // 3. Automated Data Quality Checks
    const emptyKeys: string[] = [];
    const nullValues: string[] = [];
    const typeAnomalies: string[] = [];

    const auditQuality = (obj: any, path = 'root') => {
      if (typeof obj === 'object' && obj !== null) {
        if (Array.isArray(obj)) {
          obj.forEach((item, idx) => auditQuality(item, `${path}[${idx}]`));
        } else {
          Object.keys(obj).forEach((key) => {
            const val = obj[key];
            const currentPath = `${path}.${key}`;

            if (val === '') {
              emptyKeys.push(currentPath);
            } else if (val === null) {
              nullValues.push(currentPath);
            } else if (typeof val === 'string' && val.toLowerCase().includes('n/a')) {
              typeAnomalies.push(`${currentPath} contains placeholder string "${val}"`);
            }

            auditQuality(val, currentPath);
          });
        }
      }
    };

    auditQuality(parsed);

    // Empty String Fields Check
    if (emptyKeys.length > 0) {
      checks.push({
        id: 'empty_strings',
        category: 'fields',
        status: 'warn',
        title: 'Empty String Fields Detected',
        details: `Found ${emptyKeys.length} field(s) with empty values: ${emptyKeys.slice(0, 3).join(', ')}${
          emptyKeys.length > 3 ? '...' : ''
        }`
      });
    } else {
      checks.push({
        id: 'no_empty_strings',
        category: 'fields',
        status: 'pass',
        title: 'Field Completeness',
        details: 'No empty string fields detected in object keys.'
      });
    }

    // Null Values Check
    if (nullValues.length > 0) {
      checks.push({
        id: 'null_values',
        category: 'types',
        status: 'warn',
        title: 'Null Values Present',
        details: `Found ${nullValues.length} field(s) set to null: ${nullValues.join(', ')}`
      });
    } else {
      checks.push({
        id: 'no_nulls',
        category: 'types',
        status: 'pass',
        title: 'Null Safety Check',
        details: 'No null property values found in payload.'
      });
    }

    // Placeholder or Type Warnings
    if (typeAnomalies.length > 0) {
      checks.push({
        id: 'type_anomalies',
        category: 'types',
        status: 'warn',
        title: 'Data Type Mismatches / Placeholders',
        details: typeAnomalies.join('; ')
      });
    }

    // Nesting depth warning
    if (maxDepth > 5) {
      checks.push({
        id: 'deep_nesting',
        category: 'structure',
        status: 'warn',
        title: 'Deep Nesting Warning',
        details: `Maximum depth is ${maxDepth}. Deeply nested JSON can impact LLM parsing reliability.`
      });
    }

    setValidationChecks(checks);
  };

  const handlePrettify = () => {
    try {
      const obj = JSON.parse(rawJson);
      setRawJson(JSON.stringify(obj, null, 2));
    } catch {
      // If invalid, try basic formatting fixes
    }
  };

  const handleMinify = () => {
    try {
      const obj = JSON.parse(rawJson);
      setRawJson(JSON.stringify(obj));
    } catch {
      // Ignore if invalid
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(rawJson);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Feature Badge & Title */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-gradient-to-r from-indigo-900/40 via-purple-900/30 to-zinc-900 p-6 rounded-2xl border border-indigo-500/20 shadow-md">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 font-bold text-xs border border-indigo-500/20">
            <Braces className="w-3.5 h-3.5 text-indigo-400" />
            <span>JSON & Technical Evaluation Workspace</span>
          </div>
          <h2 className="text-xl font-extrabold text-white">
            Raw JSON Inspector, Syntax Auditor & Schema Validator
          </h2>
          <p className="text-xs text-zinc-300">
            Inspect raw LLM responses, identify malformed formatting, check nested keys, and audit syntax integrity.
          </p>
        </div>

        {/* Quick Preset Selector Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] text-zinc-400 font-medium">Load Preset:</span>
          {SAMPLE_PRESETS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => setRawJson(preset.json)}
              className="px-2.5 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold border border-zinc-700 transition-colors"
            >
              {preset.name.split(' ')[0]} {preset.name.includes('Malformed') ? '⚠️' : ''}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Code Editor (Left) & Inspector Output (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Code Textarea & Action Bar (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <Card className="p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileJson className="w-4 h-4 text-indigo-500" />
                <h3 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">Raw JSON Input</h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrettify}
                  className="px-2.5 py-1 rounded bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 text-xs font-semibold transition-colors border border-zinc-200 dark:border-zinc-700"
                  title="Format JSON with indent 2"
                >
                  Prettify
                </button>

                <button
                  type="button"
                  onClick={handleMinify}
                  className="px-2.5 py-1 rounded bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 text-xs font-semibold transition-colors border border-zinc-200 dark:border-zinc-700"
                  title="Compact single-line JSON"
                >
                  Minify
                </button>

                <button
                  type="button"
                  onClick={handleCopy}
                  className="px-2.5 py-1 rounded bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 text-xs font-semibold transition-colors border border-zinc-200 dark:border-zinc-700 flex items-center gap-1"
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            {/* Editor Textarea */}
            <div className="relative">
              <textarea
                value={rawJson}
                onChange={(e) => setRawJson(e.target.value)}
                rows={16}
                placeholder="Paste raw JSON payload here..."
                className={`w-full p-4 rounded-xl font-mono text-xs bg-zinc-950 text-indigo-200 border leading-relaxed focus:outline-none focus:ring-2 transition-all ${
                  parseError
                    ? 'border-red-500 focus:ring-red-500/50'
                    : 'border-zinc-800 focus:ring-indigo-500/50'
                }`}
                spellCheck={false}
              />

              {parseError && (
                <div className="absolute bottom-3 left-3 right-3 p-3 rounded-lg bg-red-950/90 text-red-200 border border-red-800 text-xs font-mono flex items-center gap-2 backdrop-blur-sm shadow-lg">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <div className="overflow-hidden">
                    <span className="font-bold block">Syntax Parse Error</span>
                    <span className="text-[11px] opacity-90 truncate block">{parseError.message}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Payload Overview Bar */}
            <div className="grid grid-cols-4 gap-2 pt-1 text-center font-mono text-[11px]">
              <div className="p-2 rounded-lg bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/80 dark:border-zinc-800">
                <span className="text-zinc-400 block text-[10px]">BYTES</span>
                <span className="font-bold text-zinc-800 dark:text-zinc-200">{stats.byteSize} B</span>
              </div>
              <div className="p-2 rounded-lg bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/80 dark:border-zinc-800">
                <span className="text-zinc-400 block text-[10px]">KEYS</span>
                <span className="font-bold text-zinc-800 dark:text-zinc-200">{stats.totalKeys}</span>
              </div>
              <div className="p-2 rounded-lg bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/80 dark:border-zinc-800">
                <span className="text-zinc-400 block text-[10px]">MAX DEPTH</span>
                <span className="font-bold text-zinc-800 dark:text-zinc-200">{stats.maxDepth}</span>
              </div>
              <div className="p-2 rounded-lg bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/80 dark:border-zinc-800">
                <span className="text-zinc-400 block text-[10px]">STATUS</span>
                <span
                  className={`font-bold ${
                    parseError ? 'text-red-500' : 'text-emerald-500'
                  }`}
                >
                  {parseError ? 'INVALID' : 'VALID'}
                </span>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column: Visualizer & Validation Results (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <Card className="p-5 space-y-4">
            {/* Tab Controls */}
            <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('visualizer')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                    activeTab === 'visualizer'
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Structure Visualizer</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('validation')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                    activeTab === 'validation'
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Validation Audit ({validationChecks.length})</span>
                </button>
              </div>

              {activeTab === 'visualizer' && parsedJson && (
                <div className="relative w-36">
                  <Search className="w-3 h-3 text-zinc-400 absolute left-2.5 top-2.5" />
                  <input
                    type="text"
                    placeholder="Filter keys..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-7 pr-2 py-1 rounded bg-zinc-100 dark:bg-zinc-800 text-[11px] text-zinc-800 dark:text-zinc-200 focus:outline-none border border-zinc-200 dark:border-zinc-700"
                  />
                </div>
              )}
            </div>

            {/* Tab 1: Structure Visualizer */}
            {activeTab === 'visualizer' && (
              <div className="space-y-3">
                {parseError ? (
                  <div className="p-6 rounded-xl bg-red-500/5 border border-red-500/20 text-center space-y-2">
                    <AlertTriangle className="w-8 h-8 text-red-500 mx-auto" />
                    <h4 className="font-bold text-sm text-red-600 dark:text-red-400">
                      Cannot Visualize Invalid JSON
                    </h4>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400">
                      Fix syntax errors in the editor to render the interactive node tree visualization.
                    </p>
                  </div>
                ) : parsedJson !== null ? (
                  <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 text-xs font-mono max-h-[460px] overflow-y-auto space-y-2">
                    <JsonNodeViewer data={parsedJson} filter={searchTerm} />
                  </div>
                ) : (
                  <div className="p-8 text-center text-xs text-zinc-500">
                    Enter valid JSON to inspect structure.
                  </div>
                )}
              </div>
            )}

            {/* Tab 2: Automated Validation Audit List */}
            {activeTab === 'validation' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-semibold text-zinc-500 border-b border-zinc-200 dark:border-zinc-800 pb-2">
                  <span>AUTOMATED TECHNICAL CHECKS</span>
                  <span>{validationChecks.filter((c) => c.status === 'pass').length} / {validationChecks.length} PASSED</span>
                </div>

                <div className="space-y-2.5 max-h-[440px] overflow-y-auto pr-1">
                  {validationChecks.map((check) => (
                    <div
                      key={check.id}
                      className={`p-3.5 rounded-xl border text-xs space-y-1 transition-all ${
                        check.status === 'pass'
                          ? 'bg-emerald-500/5 border-emerald-500/20 text-zinc-800 dark:text-zinc-200'
                          : check.status === 'fail'
                          ? 'bg-red-500/5 border-red-500/20 text-zinc-800 dark:text-zinc-200'
                          : 'bg-amber-500/5 border-amber-500/20 text-zinc-800 dark:text-zinc-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 font-bold">
                          {check.status === 'pass' && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                          {check.status === 'fail' && <AlertCircle className="w-4 h-4 text-red-500" />}
                          {check.status === 'warn' && <AlertTriangle className="w-4 h-4 text-amber-500" />}
                          <span>{check.title}</span>
                        </div>
                        <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                          {check.category}
                        </span>
                      </div>
                      <p className="text-zinc-600 dark:text-zinc-400 pl-6 leading-relaxed text-[11px]">
                        {check.details}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

// Recursive JSON Node Tree Component
const JsonNodeViewer: React.FC<{ data: any; keyName?: string; filter?: string; depth?: number }> = ({
  data,
  keyName,
  filter = '',
  depth = 0
}) => {
  const [collapsed, setCollapsed] = useState(false);

  // Helper type check
  const isObject = data !== null && typeof data === 'object';
  const isArray = Array.isArray(data);

  // Filter check
  if (filter && typeof keyName === 'string' && !keyName.toLowerCase().includes(filter.toLowerCase())) {
    // If it's a primitive and key doesn't match filter, skip
    if (!isObject) return null;
  }

  if (isObject) {
    const keys = Object.keys(data);
    const count = keys.length;

    return (
      <div className="pl-3 border-l border-zinc-800 my-1">
        <div
          onClick={() => setCollapsed(!collapsed)}
          className="cursor-pointer hover:bg-zinc-900/80 p-1 rounded flex items-center gap-1.5 text-zinc-300 font-semibold select-none group"
        >
          {collapsed ? (
            <ChevronRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-indigo-400" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5 text-zinc-500 group-hover:text-indigo-400" />
          )}

          {keyName && <span className="text-indigo-300">{keyName}:</span>}
          <span className="text-zinc-500 text-[11px]">
            {isArray ? `Array(${count})` : `Object {${count}}`}
          </span>
        </div>

        {!collapsed && (
          <div className="space-y-0.5">
            {keys.map((k) => (
              <JsonNodeViewer key={k} data={data[k]} keyName={k} filter={filter} depth={depth + 1} />
            ))}
          </div>
        )}
      </div>
    );
  }

  // Primitive Types Rendering
  let valueColor = 'text-emerald-400';
  let formattedValue = String(data);

  if (typeof data === 'string') {
    valueColor = 'text-amber-300';
    formattedValue = `"${data}"`;
  } else if (typeof data === 'number') {
    valueColor = 'text-cyan-400';
  } else if (typeof data === 'boolean') {
    valueColor = 'text-purple-400';
  } else if (data === null) {
    valueColor = 'text-zinc-500 italic';
    formattedValue = 'null';
  }

  return (
    <div className="pl-5 py-0.5 flex items-baseline gap-2 hover:bg-zinc-900/40 rounded">
      {keyName && <span className="text-indigo-300 font-semibold">{keyName}:</span>}
      <span className={`${valueColor} font-mono break-all`}>{formattedValue}</span>
      <span className="text-[9px] uppercase px-1 rounded bg-zinc-800 text-zinc-500 font-sans">
        {typeof data}
      </span>
    </div>
  );
};
