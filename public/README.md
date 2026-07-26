# Haruna Kuforiji — AI Evaluator Portfolio & Framework

Production-Ready, Modular AI Evaluation Portfolio & LLM Benchmarking Suite built with React, TypeScript, Tailwind CSS, and Motion.

## 🚀 Overview

This repository houses the structural portfolio, evaluation framework, benchmark rubrics, research suite, and live dashboard architecture for Haruna Kuforiji (Senior AI Evaluator & LLM Safety Specialist).

### Key Features

- **Dynamic Evaluation Engine**: Loads evaluation reports and benchmark suites directly from JSON schema files (`/public/data/evaluations/*.json`).
- **Comprehensive Rubric Matrix**: Pre-configured categories covering Safety & Alignment, Hallucination Risk, Reasoning, Code Synthesis, and RAG.
- **Export & Compliance**: Instant client-side PDF document generation, raw JSON schema viewer, and printable audit logs.
- **Interactive Analytics**: Dashboard with radar charts, performance metrics, and model comparison matrices.
- **Prompt Engineering Lab**: Parameterized system prompt testing and compliance score tracking.
- **Accessibility & SEO**: WCAG AA color contrast, dark/light mode toggle, sitemap.xml, robots.txt, and JSON-LD structured schema.

## 🛠️ File Architecture

```text
/
├── public/
│   ├── data/
│   │   ├── evaluations/    # Dynamic JSON report files
│   │   ├── reports/        # Executive summary datasets
│   │   ├── prompts/        # Prompt laboratory benchmarks
│   │   └── research/       # Methodology whitepapers
│   ├── sitemap.xml
│   ├── robots.txt
│   └── schema.jsonld
├── src/
│   ├── components/
│   │   ├── common/         # Cards, Tables, Pagination, Filters, Timelines, PDF, Markdown
│   │   └── views/          # 11 distinct view pages
│   ├── context/            # Theme and Data state context providers
│   ├── types/              # Strong TypeScript definitions
│   └── data/               # Default structural schema templates & loaders
```

## 📜 Usage & Maintenance

To add a new evaluation report:
1. Create a new JSON file under `public/data/evaluations/eval-XXX.json` matching `EvaluationReport` interface schema.
2. The UI will automatically parse, index, render, and filter the report across all views without requiring code changes.

---
*Maintained by Haruna Kuforiji | AI Evaluation & LLM Safety Specialist*
