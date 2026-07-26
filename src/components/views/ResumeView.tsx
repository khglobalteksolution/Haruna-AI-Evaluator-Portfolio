import React, { useRef, useState } from 'react';
import {
  Download,
  Printer,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Globe,
  Copy,
  Check,
  Award,
  GraduationCap,
  Briefcase,
  Code,
  Sparkles,
  CheckCircle2,
  FileText,
  ExternalLink,
  Languages,
  Wrench,
  BookOpen,
} from 'lucide-react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';

export const ResumeView: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const resumeRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  const handleCopyText = () => {
    const plainTextResume = `HARUNA KUFORIJI
Location: Nigeria | Phone: +234 810 162 8877 | Email: khglobalteksolution@gmail.com
LinkedIn: https://www.linkedin.com/in/haruna-kuforiji-53406a299
Portfolio: Coming Soon

PROFESSIONAL SUMMARY
AI-certified Computer Science undergraduate with practical experience using large language models (LLMs) including ChatGPT, Google Gemini, and Claude for research, prompt development, content evaluation, and workflow support. Skilled in evaluating written content for clarity, accuracy, instruction adherence, and overall quality. Strong analytical thinking, multilingual communication, and attention to detail, complemented by experience in digital marketing, website development, and client-focused freelance work. Seeking an entry-level AI Evaluator, AI Trainer, AI Rater, or Prompt Engineer opportunity where I can contribute to the development of reliable and responsible AI systems.

CORE COMPETENCIES
AI Evaluation • Prompt Engineering • LLM Response Review • AI Content Quality Assessment • Instruction Following Analysis • Fact Checking • Hallucination Detection • Writing Quality Review • Research & Information Verification • Critical Thinking • Data Annotation • Human Feedback • Quality Assurance • ChatGPT • Google Gemini • Claude • Microsoft Excel • Python (Foundational) • HTML • CSS • WordPress • Shopify • Digital Marketing • SEO • Email Marketing • Lead Generation

EDUCATION
University of the People (UoPeople)
Bachelor of Science in Computer Science (In Progress)

CERTIFICATIONS
Learning to Earning - Accenture & University of the People

PROJECTS
Interactive Web Development Project
CodePen: https://codepen.io/Harun-Abdul-Rafi-Kuforiji/pen/qEOYqJN
* Built responsive web components using HTML, CSS, and JavaScript.
* Applied structured problem-solving and debugging techniques.
* Focused on clean code, usability, and responsive design principles.

FREELANCE EXPERIENCE
Digital Marketing & AI-Assisted Content Freelancer
* Used AI productivity tools to support content creation and workflow improvement.
* Delivered digital projects while maintaining quality standards and meeting deadlines.
* Collaborated with clients to understand requirements and communicate project progress.
* Applied research and analytical skills to produce accurate, user-focused deliverables.

TECHNICAL SKILLS
AI Tools: ChatGPT, Google Gemini, Claude
Programming: HTML, CSS, JavaScript (Foundational), Python (Foundational)
Platforms: WordPress, Shopify
Productivity: Microsoft Excel, Google Workspace, Canva

LANGUAGES
* English: Fluent
* Arabic: Working Proficiency
* French: Working Proficiency
* Yoruba: Native/Fluent`;

    navigator.clipboard.writeText(plainTextResume);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 py-8 max-w-5xl mx-auto">
      {/* Top Header & Actions */}
      <section className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-6 print:hidden">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold text-xs border border-indigo-500/20">
            <FileText className="w-3.5 h-3.5" />
            <span>Curriculum Vitae & Professional Background</span>
          </div>
          <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-100">
            Haruna Kuforiji - Professional Resume
          </h1>
          <p className="text-xs text-zinc-600 dark:text-zinc-400">
            Typography: Plus Jakarta Sans / Inter • Base Font Size: 14px • Layout: Clean Modern Two-Column
          </p>
        </div>

        {/* Actions: Download PDF / Print, Copy Text */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleCopyText}
            className="px-3.5 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 text-xs font-semibold inline-flex items-center gap-1.5 transition-colors border border-zinc-200 dark:border-zinc-700"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4 text-zinc-500" />}
            <span>{copied ? 'Copied to Clipboard' : 'Copy Plain Text'}</span>
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold inline-flex items-center gap-2 shadow-sm transition-all"
          >
            <Printer className="w-4 h-4" />
            <span>Download PDF / Print</span>
          </button>
        </div>
      </section>

      {/* Printable Resume Container */}
      <div
        ref={resumeRef}
        className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 p-8 sm:p-12 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-lg font-sans transition-colors print:shadow-none print:border-none print:p-0 print:bg-white print:text-black"
        style={{ fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif" }}
      >
        {/* Header Block */}
        <header className="border-b-2 border-indigo-600 pb-6 mb-8 space-y-3">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-900 dark:text-zinc-100 uppercase print:text-black">
                HARUNA KUFORIJI
              </h1>
              <p className="text-sm font-bold text-indigo-600 dark:text-indigo-400 tracking-wider uppercase mt-1 print:text-indigo-700">
                AI Evaluator - AI Trainer - Prompt Engineer Candidate
              </p>
            </div>

            <div className="text-right print:text-left">
              <span className="px-3 py-1 rounded bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-mono text-xs font-bold border border-indigo-200 dark:border-indigo-800 print:border-zinc-300 print:bg-zinc-100 print:text-black">
                VERIFIED CANDIDATE PROFILE
              </span>
            </div>
          </div>

          {/* Contact Details Bar */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-medium text-zinc-600 dark:text-zinc-400 pt-2 print:text-zinc-800">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-indigo-500 print:text-black" />
              <span>Nigeria</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-indigo-500 print:text-black" />
              <a href="tel:+2348101628877" className="hover:underline">
                +234 810 162 8877
              </a>
            </span>
            <span className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-indigo-500 print:text-black" />
              <a href="mailto:khglobalteksolution@gmail.com" className="hover:underline">
                khglobalteksolution@gmail.com
              </a>
            </span>
            <span className="flex items-center gap-1.5">
              <Linkedin className="w-3.5 h-3.5 text-indigo-500 print:text-black" />
              <a
                href="https://www.linkedin.com/in/haruna-kuforiji-53406a299"
                target="_blank"
                rel="noreferrer"
                className="hover:underline text-indigo-600 dark:text-indigo-400 print:text-black"
              >
                LinkedIn Profile
              </a>
            </span>
            <span className="flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-indigo-500 print:text-black" />
              <span className="text-zinc-500 italic">Portfolio: (Coming Soon)</span>
            </span>
          </div>
        </header>

        {/* Two-Column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Left Column (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            {/* Professional Summary */}
            <section className="space-y-2.5">
              <h2 className="text-xs font-extrabold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 border-b border-zinc-200 dark:border-zinc-800 pb-1.5 flex items-center gap-1.5 print:text-indigo-800 print:border-zinc-300">
                <Sparkles className="w-4 h-4 print:hidden" />
                <span>Professional Summary</span>
              </h2>
              <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed print:text-zinc-900">
                AI-certified Computer Science undergraduate with practical experience using large language models (LLMs) including ChatGPT, Google Gemini, and Claude for research, prompt development, content evaluation, and workflow support. Skilled in evaluating written content for clarity, accuracy, instruction adherence, and overall quality. Strong analytical thinking, multilingual communication, and attention to detail, complemented by experience in digital marketing, website development, and client-focused freelance work. Seeking an entry-level AI Evaluator, AI Trainer, AI Rater, or Prompt Engineer opportunity where I can contribute to the development of reliable and responsible AI systems.
              </p>
            </section>

            {/* Projects */}
            <section className="space-y-3">
              <h2 className="text-xs font-extrabold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 border-b border-zinc-200 dark:border-zinc-800 pb-1.5 flex items-center gap-1.5 print:text-indigo-800 print:border-zinc-300">
                <Code className="w-4 h-4 print:hidden" />
                <span>Key Technical Projects</span>
              </h2>

              <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/80 dark:border-zinc-800 space-y-2 print:bg-white print:border-zinc-300 print:p-2">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-bold text-sm text-zinc-900 dark:text-zinc-100 print:text-black">
                    Interactive Web Development Project
                  </h3>
                  <a
                    href="https://codepen.io/Harun-Abdul-Rafi-Kuforiji/pen/qEOYqJN"
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 font-mono print:text-black"
                  >
                    <span>CodePen Demo</span>
                    <ExternalLink className="w-3 h-3 print:hidden" />
                  </a>
                </div>

                <ul className="list-disc pl-4 text-xs text-zinc-600 dark:text-zinc-300 space-y-1 print:text-zinc-800">
                  <li>Built responsive web components using HTML, CSS, and JavaScript.</li>
                  <li>Applied structured problem-solving and debugging techniques.</li>
                  <li>Focused on clean code, usability, and responsive design principles.</li>
                </ul>
              </div>
            </section>

            {/* Freelance Experience */}
            <section className="space-y-3">
              <h2 className="text-xs font-extrabold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 border-b border-zinc-200 dark:border-zinc-800 pb-1.5 flex items-center gap-1.5 print:text-indigo-800 print:border-zinc-300">
                <Briefcase className="w-4 h-4 print:hidden" />
                <span>Freelance Experience</span>
              </h2>

              <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/80 dark:border-zinc-800 space-y-2 print:bg-white print:border-zinc-300 print:p-2">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-bold text-sm text-zinc-900 dark:text-zinc-100 print:text-black">
                    Digital Marketing & AI-Assisted Content Freelancer
                  </h3>
                  <span className="text-xs text-zinc-500 font-mono">Freelance Contractor</span>
                </div>

                <ul className="list-disc pl-4 text-xs text-zinc-600 dark:text-zinc-300 space-y-1.5 print:text-zinc-800">
                  <li>Used AI productivity tools to support content creation and workflow improvement.</li>
                  <li>Delivered digital projects while maintaining quality standards and meeting deadlines.</li>
                  <li>Collaborated with clients to understand requirements and communicate project progress.</li>
                  <li>Applied research and analytical skills to produce accurate, user-focused deliverables.</li>
                </ul>
              </div>
            </section>
          </div>

          {/* Sidebar Right Column (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            {/* Core Competencies */}
            <section className="space-y-2.5">
              <h2 className="text-xs font-extrabold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 border-b border-zinc-200 dark:border-zinc-800 pb-1.5 flex items-center gap-1.5 print:text-indigo-800 print:border-zinc-300">
                <BookOpen className="w-4 h-4 print:hidden" />
                <span>Core Competencies</span>
              </h2>

              <div className="flex flex-wrap gap-1.5 text-xs">
                {[
                  'AI Evaluation',
                  'Prompt Engineering',
                  'LLM Response Review',
                  'AI Content Quality Assessment',
                  'Instruction Following Analysis',
                  'Fact Checking',
                  'Hallucination Detection',
                  'Writing Quality Review',
                  'Research & Verification',
                  'Critical Thinking',
                  'Data Annotation',
                  'Human Feedback (RLHF)',
                  'Quality Assurance',
                  'ChatGPT',
                  'Google Gemini',
                  'Claude',
                  'Microsoft Excel',
                  'Python (Foundational)',
                  'HTML / CSS',
                  'WordPress / Shopify',
                  'Digital Marketing & SEO',
                  'Email Marketing & Lead Gen',
                ].map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-medium text-[11px] border border-indigo-200 dark:border-indigo-800/80 print:border-zinc-300 print:bg-zinc-100 print:text-black"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>

            {/* Education */}
            <section className="space-y-2.5">
              <h2 className="text-xs font-extrabold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 border-b border-zinc-200 dark:border-zinc-800 pb-1.5 flex items-center gap-1.5 print:text-indigo-800 print:border-zinc-300">
                <GraduationCap className="w-4 h-4 print:hidden" />
                <span>Education</span>
              </h2>

              <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/80 dark:border-zinc-800 space-y-1 print:bg-white print:border-zinc-300 print:p-2">
                <h3 className="font-bold text-xs text-zinc-900 dark:text-zinc-100 print:text-black">
                  University of the People (UoPeople)
                </h3>
                <p className="text-xs text-indigo-600 dark:text-indigo-400 font-medium print:text-black">
                  Bachelor of Science in Computer Science
                </p>
                <span className="text-[11px] text-zinc-500 italic block font-mono">In Progress</span>
              </div>
            </section>

            {/* Certifications */}
            <section className="space-y-2.5">
              <h2 className="text-xs font-extrabold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 border-b border-zinc-200 dark:border-zinc-800 pb-1.5 flex items-center gap-1.5 print:text-indigo-800 print:border-zinc-300">
                <Award className="w-4 h-4 print:hidden" />
                <span>Certifications</span>
              </h2>

              <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/80 dark:border-zinc-800 space-y-1 print:bg-white print:border-zinc-300 print:p-2">
                <h3 className="font-bold text-xs text-zinc-900 dark:text-zinc-100 print:text-black">
                  Learning to Earning
                </h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 print:text-zinc-800">
                  Accenture & University of the People
                </p>
              </div>
            </section>

            {/* Technical Skills */}
            <section className="space-y-2.5">
              <h2 className="text-xs font-extrabold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 border-b border-zinc-200 dark:border-zinc-800 pb-1.5 flex items-center gap-1.5 print:text-indigo-800 print:border-zinc-300">
                <Wrench className="w-4 h-4 print:hidden" />
                <span>Technical Skills Breakdown</span>
              </h2>

              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/80 dark:border-zinc-800/60 print:bg-white print:border-zinc-300">
                  <span className="font-bold text-zinc-900 dark:text-zinc-100 block print:text-black">AI Tools</span>
                  <span className="text-zinc-600 dark:text-zinc-400 text-[11px] print:text-zinc-800">ChatGPT, Google Gemini, Claude</span>
                </div>
                <div className="p-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/80 dark:border-zinc-800/60 print:bg-white print:border-zinc-300">
                  <span className="font-bold text-zinc-900 dark:text-zinc-100 block print:text-black">Programming</span>
                  <span className="text-zinc-600 dark:text-zinc-400 text-[11px] print:text-zinc-800">HTML, CSS, JavaScript (Foundational), Python (Foundational)</span>
                </div>
                <div className="p-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/80 dark:border-zinc-800/60 print:bg-white print:border-zinc-300">
                  <span className="font-bold text-zinc-900 dark:text-zinc-100 block print:text-black">Platforms</span>
                  <span className="text-zinc-600 dark:text-zinc-400 text-[11px] print:text-zinc-800">WordPress, Shopify</span>
                </div>
                <div className="p-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/80 dark:border-zinc-800/60 print:bg-white print:border-zinc-300">
                  <span className="font-bold text-zinc-900 dark:text-zinc-100 block print:text-black">Productivity</span>
                  <span className="text-zinc-600 dark:text-zinc-400 text-[11px] print:text-zinc-800">Microsoft Excel, Google Workspace, Canva</span>
                </div>
              </div>
            </section>

            {/* Languages */}
            <section className="space-y-2.5">
              <h2 className="text-xs font-extrabold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 border-b border-zinc-200 dark:border-zinc-800 pb-1.5 flex items-center gap-1.5 print:text-indigo-800 print:border-zinc-300">
                <Languages className="w-4 h-4 print:hidden" />
                <span>Languages</span>
              </h2>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2 rounded bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/80 dark:border-zinc-800 print:bg-white print:border-zinc-300">
                  <span className="font-bold text-zinc-900 dark:text-zinc-100 block print:text-black">English</span>
                  <span className="text-[11px] text-indigo-600 dark:text-indigo-400 font-medium print:text-black">Fluent</span>
                </div>
                <div className="p-2 rounded bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/80 dark:border-zinc-800 print:bg-white print:border-zinc-300">
                  <span className="font-bold text-zinc-900 dark:text-zinc-100 block print:text-black">Yoruba</span>
                  <span className="text-[11px] text-indigo-600 dark:text-indigo-400 font-medium print:text-black">Native / Fluent</span>
                </div>
                <div className="p-2 rounded bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/80 dark:border-zinc-800 print:bg-white print:border-zinc-300">
                  <span className="font-bold text-zinc-900 dark:text-zinc-100 block print:text-black">Arabic</span>
                  <span className="text-[11px] text-zinc-500 print:text-zinc-700">Working Proficiency</span>
                </div>
                <div className="p-2 rounded bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/80 dark:border-zinc-800 print:bg-white print:border-zinc-300">
                  <span className="font-bold text-zinc-900 dark:text-zinc-100 block print:text-black">French</span>
                  <span className="text-[11px] text-zinc-500 print:text-zinc-700">Working Proficiency</span>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Footer verification tag */}
        <footer className="mt-10 pt-4 border-t border-zinc-200 dark:border-zinc-800 flex justify-between items-center text-[11px] text-zinc-500 font-mono print:text-black print:border-zinc-300">
          <span>HARUNA KUFORIJI - CURRICULUM VITAE</span>
          <span>UPDATED 2026</span>
        </footer>
      </div>
    </div>
  );
};
