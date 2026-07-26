export interface CareerMilestone {
  year: string;
  role: string;
  organization: string;
  description: string;
  keyAchievements: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  year: string;
  field: string;
  honors?: string;
}

export interface CertificationItem {
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
}

export interface ProfessionalProfile {
  name: string;
  title: string;
  location: string;
  email: string;
  availability: string;
  github: string;
  linkedin: string;
  bio: string;
  missionStatement: string;
  careerObjective: string;
  currentFocus: string;
  professionalValues: { title: string; description: string }[];
  coreCompetencies: { category: string; skills: string[] }[];
  careerJourney: CareerMilestone[];
  education: EducationItem[];
  certifications: CertificationItem[];
  professionalStrengths: string[];
  languages: { name: string; proficiency: string }[];
  technicalTools: { category: string; tools: string[] }[];
  professionalPhilosophy: string;
  futureGoals: string[];
  statistics: { label: string; value: string | number; description: string }[];
}

export const PROFILE_DATA: ProfessionalProfile = {
  name: "Haruna Kuforiji",
  title: "Senior AI Quality Assurance Researcher & LLM Evaluation Specialist",
  location: "London, UK / Remote Worldwide",
  email: "haruna@kuforiji-evals.io",
  availability: "Available for AI Model Evaluation Audits, Red-Teaming & Advisory Roles",
  github: "https://github.com/harunakuforiji",
  linkedin: "https://linkedin.com/in/harunakuforiji",
  bio: "Senior AI Quality Assurance Researcher and LLM Evaluation Specialist with extensive experience designing automated rubric suites, adversarial red-teaming protocols, and hallucination taxonomy frameworks for frontier language models and enterprise RAG pipelines. Specializes in multi-turn instruction adherence, factual verification, safety guardrail calibration, and synthetic dataset quality control.",
  missionStatement: "To establish rigorous, mathematically grounded, and empirically repeatable evaluation standards for generative AI systems, ensuring frontier models operate with high factual precision, zero safety drift, and strict adherence to intent.",
  careerObjective: "To lead advanced LLM evaluation methodologies, red-teaming programs, and automated QA architecture for enterprise AI deployments and foundation model research labs.",
  currentFocus: "Architecting automated multi-pass RAG hallucination audit engines, fine-tuning adversarial red-teaming injection vectors, and developing standardized JSON-Schema rubric metrics for real-time model benchmarking.",
  professionalValues: [
    {
      title: "Empirical Precision",
      description: "Evaluations must rely on repeatable test suites, clear evidence extraction, and deterministic verification formulas rather than intuitive guesswork."
    },
    {
      title: "Transparent Reasoning",
      description: "Every rubric score and severity rating requires explicit, step-by-step evidence justification and actionable engineering remediation."
    },
    {
      title: "Adversarial Rigor",
      description: "Safety and alignment testing must stress-test boundary conditions against complex multi-turn attacks, nested encodings, and context leakage."
    },
    {
      title: "Zero False-Refusal Drift",
      description: "Safety guardrails must be finely calibrated to block harmful payloads without impeding legitimate security research or benign queries."
    }
  ],
  coreCompetencies: [
    {
      category: "LLM Benchmarking & Evaluation",
      skills: ["Automated Rubric Design", "Pass@1 Code Verification", "Multi-Hop Logic Testing", "RAG Citation Precision", "Synthetic Dataset Quality Audit"]
    },
    {
      category: "Adversarial Safety & Red-Teaming",
      skills: ["Prompt Injection Defense", "Jailbreak Vector Analysis", "Indirect Document Injection", "System Prompt Leak Prevention", "Safety Refusal Calibration"]
    },
    {
      category: "Factual Verification & Hallucination",
      skills: ["Contextual Grounding Index", "Parametric Drift Detection", "Claim Decomposition", "Automated Fact Verification", "Abstention Accuracy"]
    },
    {
      category: "Prompt Engineering & Guardrails",
      skills: ["System Prompt Parameterization", "XML/JSON Schema Enforcer", "Multi-Turn Boundary Isolation", "RLHF Alignment Evaluation", "Temperature Stress Testing"]
    }
  ],
  careerJourney: [
    {
      year: "2024 — Present",
      role: "Lead AI Quality & LLM Evaluation Researcher",
      organization: "Frontier AI Benchmark Institute",
      description: "Directing comprehensive evaluation suites for enterprise RAG systems, foundation model alignments, and multi-modal safety red-teaming.",
      keyAchievements: [
        "Architected AIE-v2.4 evaluation framework adopted across 18 enterprise deployment pipelines.",
        "Engineered automated RAG hallucination classifier reducing ungrounded claims by 38%.",
        "Executed over 3,500 adversarial jailbreak vector evaluations across top tier foundation models."
      ]
    },
    {
      year: "2022 — 2024",
      role: "Senior AI Quality Assurance Specialist",
      organization: "Cognitive Intelligence Systems",
      description: "Managed LLM verification pipelines, automated rubric scoring, and model behavior monitoring for mission-critical client deployments.",
      keyAchievements: [
        "Designed deterministic JSON output schema guardrails with 99.8% structural compliance.",
        "Established baseline safety over-refusal audit protocols that decreased false safety triggers by 24%.",
        "Authored 50+ published evaluation reports on model reasoning, code generation, and safety."
      ]
    },
    {
      year: "2020 — 2022",
      role: "NLP & Quality Assurance Engineer",
      organization: "Enterprise Text Analytics Lab",
      description: "Focused on natural language understanding quality control, entity extraction verification, and dataset annotation auditing.",
      keyAchievements: [
        "Built automated gold-standard dataset validation scripts handling 500k+ annotated samples.",
        "Implemented cross-encoder semantic similarity scoring for factual consistency benchmarking."
      ]
    }
  ],
  education: [
    {
      degree: "Master of Science in Artificial Intelligence & Computer Science",
      institution: "Imperial College London / University of London",
      year: "2020",
      field: "Natural Language Processing, Factual Consistency in Machine Learning Models",
      honors: "Distinction / First Class Honors"
    },
    {
      degree: "Bachelor of Science in Software Engineering & Data Systems",
      institution: "University of Manchester",
      year: "2018",
      field: "Software Testing Architectures, Formal Logic & Data Systems",
      honors: "First Class Honors"
    }
  ],
  certifications: [
    {
      title: "Certified AI Red Teaming & Alignment Specialist",
      issuer: "AI Safety & Security Institute",
      date: "2024",
      credentialId: "CRED-AIRT-88902"
    },
    {
      title: "Advanced Natural Language Processing & LLM Safety",
      issuer: "Deep Learning Institute",
      date: "2023",
      credentialId: "CRED-NLP-44219"
    },
    {
      title: "ISO/IEC 25010 Software & Data Quality Specialist",
      issuer: "Software Quality Association",
      date: "2021",
      credentialId: "CRED-SQA-1104"
    }
  ],
  professionalStrengths: [
    "Rigorous evidence extraction and factual verification techniques.",
    "Deep technical understanding of transformer attention, RAG architectures, and decoding parameters.",
    "Expertise in designing reproducible, automated evaluation test harnesses.",
    "Comprehensive understanding of AI safety taxonomies, jailbreak vectors, and risk mitigation.",
    "Clear, structured technical documentation and executive summary authoring."
  ],
  languages: [
    { name: "English", proficiency: "Native / Full Professional" },
    { name: "Yoruba", proficiency: "Native / Bilingual" },
    { name: "French", proficiency: "Working Professional" }
  ],
  technicalTools: [
    {
      category: "Evaluation & Benchmarking",
      tools: ["AIE-v2.4 Framework", "Deepeval", "Ragas", "Promptfoo", "Giskard", "LangSmith", "LangFuse"]
    },
    {
      category: "Models & Frameworks",
      tools: ["Gemini 1.5 Pro/Flash", "Claude 3.5 Sonnet", "GPT-4o", "Llama 3.1 405B", "Mistral Large", "PyTorch", "Transformers"]
    },
    {
      category: "Languages & Schemas",
      tools: ["TypeScript / Node.js", "Python", "JSON Schema", "YAML", "SQL", "Markdown"]
    },
    {
      category: "Testing & DevOps",
      tools: ["Docker", "Git / GitHub Actions", "Jest", "PyTest", "Postman / REST APIs"]
    }
  ],
  professionalPhilosophy: "Effective AI evaluation demands absolute objectivity, explicit evidence attribution, and zero tolerance for speculative scoring. An evaluator must think like a red-teamer, write like a technical auditor, and engineer like a systems architect.",
  futureGoals: [
    "Develop open-source standardized evaluation schemas for real-time streaming LLM outputs.",
    "Pioneer automated multi-agent adversarial red-teaming protocols for agentic workflows.",
    "Publish comprehensive whitepapers on eliminating parametric hallucination in enterprise RAG systems."
  ],
  statistics: [
    { label: "Evaluations Executed", value: 2450, description: "Structured model audits across reasoning, safety, RAG, and code." },
    { label: "Standard Rubrics", value: 235, description: "Deterministic evaluation criteria across 8 core taxonomies." },
    { label: "Red-Team Vector Tests", value: 3500, description: "Adversarial prompt injection and jailbreak vector samples." },
    { label: "Rubric Accuracy", value: "99.4%", description: "Empirical correlation with verified expert human assessments." }
  ]
};
