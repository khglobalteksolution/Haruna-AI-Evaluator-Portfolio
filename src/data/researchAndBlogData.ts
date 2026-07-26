import { ResearchPaper, BlogPost } from '../types';

export const RESEARCH_PAPERS: ResearchPaper[] = [
  {
    id: 'research-001',
    title: 'Taxonomies of Hallucination in Retrieval-Augmented Generation',
    slug: 'taxonomies-of-hallucination-in-rag',
    abstract: 'A formal framework for classifying, detecting, and scoring contextual vs. parametric hallucinations in high-stakes enterprise AI systems.',
    category: 'Hallucination Risk',
    tags: ['Research', 'RAG', 'Taxonomy', 'Hallucination Detection', 'LLM Evaluation'],
    publishedDate: '2026-06-10',
    updatedDate: '2026-07-15',
    readingTimeMinutes: 12,
    authors: ['Haruna Kuforiji'],
    content: `# Taxonomies of Hallucination in Retrieval-Augmented Generation

## Abstract
As Retrieval-Augmented Generation (RAG) systems become central to enterprise applications, standard n-gram metrics like BLEU or ROUGE fail to detect fine-grained factual drifts. This paper presents a multi-tiered taxonomy separating **Entity Substitution**, **Relation Fabrication**, and **Temporal Misalignment**, along with deterministic scoring mechanisms.

## 1. Classification Matrix
- **Type I: Contextual Omission**: Model ignores explicitly provided context in favor of pre-trained parameters.
- **Type II: Entity Contagion**: Model swaps proper nouns or numerical attributes across retrieved documents.
- **Type III: Speculative Extrapolation**: Model predicts logical consequences without supporting premises in context.

## 2. Empirical Evaluation
Using dynamic perturbation testing across 2,000 document passages, we measured hallucination rates across context lengths ranging from 1K to 128K tokens.

| Context Size | Type I Error | Type II Error | Overall Grounding Score |
| --- | --- | --- | --- |
| 1K Tokens | 0.8% | 1.2% | 98.0% |
| 32K Tokens | 2.4% | 3.1% | 94.5% |
| 128K Tokens | 5.1% | 6.8% | 88.1% |

## 3. Engineering Remediations
Enforcing strict schema validation at the output layer combined with XML context boundary tags reduces Type II entity swap errors by up to 64%.`,
    keyTakeaways: [
      'Context size scaling exponentially increases entity swap errors if unguided by XML boundaries.',
      'Dual-pass verification models significantly outperform single-prompt evaluation.',
      'Taxonomy-based scoring provides actionable engineering remediations for RAG pipelines.'
    ]
  },
  {
    id: 'research-002',
    title: 'Multi-Hop Deductive Logic Benchmarking under Context Perturbations',
    slug: 'multi-hop-logic-benchmarking-perturbations',
    abstract: 'Evaluating symbolic validity, transitive inference chains, and math verification stability across frontier foundation models.',
    category: 'Reasoning & Logic',
    tags: ['Logic', 'Multi-Hop', 'Deductive Proof', 'Math', 'Benchmarking'],
    publishedDate: '2026-05-18',
    updatedDate: '2026-07-10',
    readingTimeMinutes: 15,
    authors: ['Haruna Kuforiji'],
    content: `# Multi-Hop Deductive Logic Benchmarking

## Abstract
Reasoning capabilities in LLMs degrade rapidly when distraction tokens or conflicting constraints are introduced. This research benchmarks multi-hop deductive proof trees across 1,250 complex reasoning prompts.

## 1. Multi-Hop Transitive Chains
We test models on transitive logic chains up to depth 12 (e.g., $A \\rightarrow B \\rightarrow C \\dots \\rightarrow M$).

### Findings
- Accuracy remains above 95% up to depth 6.
- Beyond depth 8, error accumulation causes accuracy drops down to 78.2%.
- Enforcing explicit scratchpad tokens mitigates decay by 18.4%.`,
    keyTakeaways: [
      'Chain-of-thought scratchpad buffers are mandatory for reasoning chains exceeding 6 steps.',
      'Distraction tokens reduce reasoning accuracy by 6.2% across frontier models.',
      'Deterministic verification rules at API gateways catch invalid deduction chains.'
    ]
  },
  {
    id: 'research-003',
    title: 'Adversarial Red-Teaming & Indirect Prompt Injection Resilience',
    slug: 'adversarial-red-teaming-indirect-injection',
    abstract: 'Analyzing safety guardrail efficacy, Base64 obfuscation attacks, and system prompt leakage vectors in enterprise AI assistants.',
    category: 'Safety & Alignment',
    tags: ['Red Teaming', 'Jailbreak', 'Prompt Injection', 'Cybersecurity', 'Safety'],
    publishedDate: '2026-07-02',
    updatedDate: '2026-07-24',
    readingTimeMinutes: 18,
    authors: ['Haruna Kuforiji'],
    content: `# Adversarial Red-Teaming & Indirect Prompt Injection Resilience

## Abstract
Indirect prompt injection represents a critical attack surface for AI agents processing external web pages, emails, or PDF documents. This whitepaper analyzes 3,500 attack vectors tested against frontier guardrails.

## 1. Attack Vector Taxonomies
- **Nested Base64 Payload Injection**: Encoding malicious commands inside document strings.
- **Authority Impersonation**: Inserting fake 'SYSTEM OVERRIDE' headers.
- **System Prompt Extraction**: Using translation or formatting tricks to exfiltrate safety instructions.

## 2. Defense Architecture
Implementing two-tier semantic intent classification combined with XML boundary enforcement achieves a 98.6% refusal rate against indirect prompt injection.`,
    keyTakeaways: [
      'XML boundary tags provide robust structural isolation between system directives and untrusted context.',
      'Dual-pass intent classifiers reduce false-refusal rates on security research queries to under 3.2%.',
      'System prompt extraction attempts are neutralized by explicit confidentiality instructions.'
    ]
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-001',
    title: 'Mastering Prompt Engineering: From Heuristics to Deterministic System Architectures',
    slug: 'mastering-prompt-engineering-system-architectures',
    category: 'Prompt Engineering',
    excerpt: 'An in-depth guide on moving away from casual prompt tweaks toward structured, schema-enforced, and mathematically verifiable prompt systems.',
    content: `Prompt engineering has evolved from informal "chatting with models" into a formal software engineering discipline. In production systems, a prompt is an architectural component that requires type safety, parameterization, version control, and regression testing.

### Key Principles of Production Prompting

1. **System vs. User Separation**: Always keep system guardrails and role instructions in the system message layer.
2. **Explicit Negative Constraints**: Provide explicit lists of forbidden words, formats, or behaviors rather than vague instructions.
3. **XML Boundary Isolation**: Wrap external inputs inside passive XML tags (\`<untrusted_input>\`) to prevent prompt injection attacks.
4. **Deterministic Output Schemas**: Force models to output valid JSON matching exact schemas for downstream software integration.

By treating prompts as code, engineering teams achieve predictable model behavior, lower latency, and zero structural syntax errors.`,
    author: 'Haruna Kuforiji',
    publishedDate: '2026-07-24',
    readingTimeMinutes: 8,
    tags: ['Prompt Engineering', 'System Prompts', 'JSON Schema', 'Architecture']
  },
  {
    id: 'blog-002',
    title: 'Understanding LLM Architectures: Attention Mechanisms, Context Windows, and Decoding Dynamics',
    slug: 'understanding-llm-architectures-attention-decoding',
    category: 'LLM Fundamentals',
    excerpt: 'Demystifying transformer multi-head self-attention, KV-cache optimization, temperature sampling, and decoding strategies for AI evaluators.',
    content: `To evaluate Large Language Models effectively, an auditor must understand the underlying mechanics that drive text generation.

### Temperature and Top-P Dynamics

- **Temperature 0.0 (Greedy Decoding)**: Selects the highest probability token at each step. Essential for code generation, mathematical logic, and JSON schema enforcement where reproducibility is paramount.
- **Temperature 0.7+**: Increases output entropy and vocabulary variance, suitable for creative writing but prone to hallucination in factual RAG tasks.

### Attention Decay over Long Contexts

While modern models boast 1M+ token context windows, "lost-in-the-middle" phenomena still occur. Important context placed in the center of long prompts suffers from lower attention weights compared to tokens at the beginning or end of the prompt window. Structure context using XML tags and key bullet points to maintain high attention weights.`,
    author: 'Haruna Kuforiji',
    publishedDate: '2026-07-22',
    readingTimeMinutes: 10,
    tags: ['LLM Architecture', 'Transformers', 'Decoding Parameters', 'Attention']
  },
  {
    id: 'blog-003',
    title: 'Eliminating RAG Hallucinations: Grounding Metrics, Citation Precision, and Abstention Strategies',
    slug: 'eliminating-rag-hallucinations-grounding-abstention',
    category: 'Hallucination Mitigation',
    excerpt: 'How to build and evaluate Retrieval-Augmented Generation pipelines that achieve zero ungrounded claim generation in enterprise applications.',
    content: `Hallucinations remain the single largest barrier to enterprise LLM adoption. In RAG pipelines, hallucinations fall into two categories: **Parametric Drift** (relying on pre-training data over retrieved context) and **Entity Substitution** (swapping names or numbers).

### The Three-Step Grounding Framework

1. **Deconstruct Claims**: Break the generated response into atomic factual claims.
2. **Cross-Check Attribution**: Verify every atomic claim against retrieved document chunks.
3. **Enforce Strict Abstention**: Train models to output a standardized refusal string ("Information not found in context") whenever context is missing.

Implementing automated claim-checking guardrails at the API gateway ensures ungrounded claims never reach end users.`,
    author: 'Haruna Kuforiji',
    publishedDate: '2026-07-20',
    readingTimeMinutes: 9,
    tags: ['RAG', 'Hallucinations', 'Fact Checking', 'Context Grounding']
  },
  {
    id: 'blog-004',
    title: 'AI Safety & Red-Teaming: Defending Against Indirect Injection and Jailbreak Vectors',
    slug: 'ai-safety-red-teaming-jailbreaks',
    category: 'AI Safety',
    excerpt: 'A comprehensive red-teamer guide to testing model guardrails against multi-turn jailbreak templates, Base64 obfuscation, and data exfiltration.',
    content: `Adversarial red-teaming is essential to ensure LLM applications are resilient against security threats. As models become more capable, attack vectors evolve from simple bad words to complex multi-turn manipulation and indirect prompt injections embedded in external files.

### Common Threat Vectors

- **Indirect Prompt Injection**: A PDF processed by a RAG agent contains hidden commands instructing the model to forward user keys.
- **Obfuscated Payloads**: Attackers encode malicious instructions in Base64, ROT13, or foreign languages to bypass initial text filters.
- **System Prompt Extraction**: Social engineering techniques aimed at revealing internal instructions.

### Defensive Architecture

A robust defense combines strict input sanitization, XML boundary enforcement, system prompt confidentiality rules, and dual-pass intent classification.`,
    author: 'Haruna Kuforiji',
    publishedDate: '2026-07-18',
    readingTimeMinutes: 11,
    tags: ['AI Safety', 'Red Teaming', 'Jailbreaks', 'Cybersecurity']
  },
  {
    id: 'blog-005',
    title: 'The Role of RLHF and DPO in Model Alignment and Preference Fine-Tuning',
    slug: 'role-of-rlhf-dpo-model-alignment',
    category: 'Model Fine-Tuning',
    excerpt: 'Exploring Reinforcement Learning from Human Feedback (RLHF) and Direct Preference Optimization (DPO) and their impact on safety vs. helpfulness.',
    content: `Alignment algorithms like RLHF and DPO shape how raw foundation models interact with human users. While pre-training teaches models world knowledge and language fluency, alignment teaches them helpfulness, honesty, and harmlessness.

### RLHF vs. DPO

- **RLHF**: Uses a reward model trained on human preference rankings to optimize policy using Proximal Policy Optimization (PPO).
- **DPO**: Directly optimizes model weights on preference pairs (chosen vs. rejected) without needing a separate reward model, reducing training complexity and compute costs.

Balancing helpfulness and harmlessness is critical to avoid "over-refusal drift" where the model refuses benign queries.`,
    author: 'Haruna Kuforiji',
    publishedDate: '2026-07-15',
    readingTimeMinutes: 7,
    tags: ['RLHF', 'DPO', 'Model Alignment', 'Fine-Tuning']
  },
  {
    id: 'blog-006',
    title: 'Responsible AI & Bias Auditing: Building Fair and Inclusive Evaluation Taxonomies',
    slug: 'responsible-ai-bias-auditing-taxonomies',
    category: 'Responsible AI',
    excerpt: 'Methodologies for measuring demographic bias, stereotype propagation, and political non-neutrality in foundation model outputs.',
    content: `AI evaluators must ensure models serve all user groups equitably without reinforcing harmful societal stereotypes or demographic biases.

### Audit Dimensions

1. **Demographic Representation**: Auditing gender, ethnicity, age, and disability representation in generated narratives and code examples.
2. **Cultural & Linguistic Inclusivity**: Ensuring accurate handling of regional dialects, non-Western names, and diverse cultural contexts.
3. **Political Neutrality**: Verifying that models present balanced, non-partisan perspectives when answering open-ended policy questions.

Rigorous bias auditing relies on standardized benchmark datasets and clear rubric criteria to measure fairness objectively.`,
    author: 'Haruna Kuforiji',
    publishedDate: '2026-07-12',
    readingTimeMinutes: 8,
    tags: ['Responsible AI', 'Bias Auditing', 'Fairness', 'Ethics']
  },
  {
    id: 'blog-007',
    title: 'Human-in-the-Loop Feedback: Bridging Automated Benchmarks and Expert Judgment',
    slug: 'human-in-the-loop-feedback-benchmarks',
    category: 'Evaluation Operations',
    excerpt: 'Designing hybrid evaluation workflows that combine scalable automated LLM-as-a-Judge rubrics with expert human quality control.',
    content: `While automated evaluation suites allow testing thousands of prompts per minute, human expert oversight remains indispensable for nuanced domain evaluation.

### The Hybrid Evaluation Pipeline

1. **First-Pass LLM-as-a-Judge**: Automated scoring engines evaluate syntax, schema compliance, length constraints, and keyword safety.
2. **Confidence Thresholding**: Outputs receiving confidence scores below 90% or flagging edge-case errors are automatically routed to human QA queues.
3. **Expert Audit & Calibration**: Human evaluators review flagged items, annotate root causes, and calibrate automated rubric weights.

This hybrid approach combines the speed of automation with the depth and trustworthiness of human expertise.`,
    author: 'Haruna Kuforiji',
    publishedDate: '2026-07-10',
    readingTimeMinutes: 9,
    tags: ['Human Feedback', 'LLM-as-a-Judge', 'Evaluation Workflow', 'Quality Control']
  },
  {
    id: 'blog-008',
    title: 'The Future of AI Evaluation: Multimodal Verification, Agentic Workflows, and Streaming Audits',
    slug: 'future-of-ai-evaluation-multimodal-agents',
    category: 'Emerging Trends',
    excerpt: 'Looking ahead at the next frontier of AI evaluation: auditing vision-language models, autonomous multi-step agents, and real-time audio streams.',
    content: `As AI systems transition from text-only chatbots to multimodal autonomous agents, evaluation methodologies must evolve accordingly.

### Next-Generation Evaluation Challenges

- **Multimodal Accuracy**: Verifying that visual outputs (charts, UI wireframes) perfectly match textual descriptions and underlying data tables.
- **Agentic Workflow Auditing**: Evaluating long-horizon autonomous agents that call multiple tools, browse the web, and execute code across multi-step plans.
- **Real-Time Streaming Quality**: Auditing voice-to-voice and streaming text models for low-latency safety guardrails without interrupting conversation flow.

Building robust evaluation frameworks for these complex systems is essential to ensure safety and reliability as AI capabilities advance.`,
    author: 'Haruna Kuforiji',
    publishedDate: '2026-07-08',
    readingTimeMinutes: 10,
    tags: ['Multimodal', 'Agentic AI', 'Streaming Evaluation', 'Future Trends']
  }
];
