# Haruna Kuforiji — Senior AI Evaluator & LLM Specialist Portfolio

A full-stack, production-ready portfolio and evaluation framework showcase for **Haruna Kuforiji** (Senior AI Evaluator, LLM Safety Specialist & Prompt Engineer).

This web application features interactive AI benchmarking dashboards, 20 prompt engineering experiments with live XML guardrail testing, 25 comprehensive case study evaluation reports, an embedded PDF document viewer, an ATS-optimized professional resume, and downloadable rubric schemas.

---

## 📁 Complete Project Directory Structure

```text
.
├── assets/                  # Primary static branding assets
│   └── images/              # Image assets (avatar.svg, badge.svg, hero-banner.svg)
├── pdf/                     # Downloadable PDF document repository
│   ├── Haruna_Kuforiji_Senior_AI_Evaluator_Resume_2026.pdf
│   ├── AI_Evaluator_Methodology_Handbook_Haruna_Kuforiji.pdf
│   ├── Prompt_Engineering_System_Guardrails_Guide.pdf
│   ├── Hallucination_Fact_Verification_Handbook.pdf
│   ├── AI_QA_Reviewer_Operations_Manual.pdf
│   ├── Responsible_AI_Ethics_Evaluation_Framework.pdf
│   └── Research_Notes_Industry_Observations_2026.pdf
├── public/                  # Public assets served directly by Vite
│   ├── assets/
│   │   └── images/          # Public fallback images
│   ├── pdf/                 # Public PDF assets
│   ├── data/                # JSON schemas for evaluations, prompts, and research
│   │   ├── evaluations/
│   │   ├── prompts/
│   │   └── research/
│   ├── robots.txt           # Search engine crawler instructions
│   ├── sitemap.xml          # XML sitemap for SEO indexation
│   └── schema.jsonld        # JSON-LD Structured Data (Person, WebSite, Schema)
├── src/                     # React TypeScript Source Code
│   ├── components/
│   │   ├── common/          # Reusable UI components (PdfDocumentViewer, Header, Footer, Card, etc.)
│   │   ├── views/           # Primary page views (HomeView, ResumeView, PromptLabView, DownloadsView, etc.)
│   │   └── widgets/         # Interactive tools (GeminiTesterWidget, BenchmarkChartWidget)
│   ├── context/             # Global DataContext state management
│   ├── data/                # Initial seed datasets (defaultData, reportsData, promptsData, etc.)
│   ├── types/               # TypeScript type declarations
│   ├── App.tsx              # Application root view switcher
│   ├── index.css            # Global Tailwind CSS styling rules
│   └── main.tsx             # React DOM application mount point
├── index.html               # Main HTML entry point
├── metadata.json            # AI Studio Applet metadata
├── package.json             # NPM dependencies and project scripts
├── tsconfig.json            # TypeScript compiler configuration
└── vite.config.ts           # Vite build and dev server configuration
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or bun

### 1. Installation
Clone or unpack the project folder and install the dependencies:
```bash
npm install
```

### 2. Development Server
Run the local Vite development server:
```bash
npm run dev
```
Open `http://localhost:3000` in your web browser.

### 3. Production Build
To create a minified, production-ready static build:
```bash
npm run build
```
The output will be generated inside the `dist/` directory with relative asset paths ready for hosting on GitHub Pages, Vercel, Netlify, or Cloud Run.

---

## 🔒 Security & Standards Compliance

- **Relative Paths**: All CSS, JS, image, and PDF links utilize strict relative paths (`./`) for seamless offline or sub-path deployment.
- **ATS Resume Compliance**: The embedded resume follows ATS standards with high contrast typography and clean hierarchy.
- **WCAG 2.1 AA**: Accessibility contrast standards met across dark and light themes.

---

© 2026 Haruna Kuforiji. All rights reserved.
