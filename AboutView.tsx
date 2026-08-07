import React from 'react';
import { UserCheck, ShieldCheck, Award, Key, CheckCircle2, GraduationCap, Briefcase, Code2, Globe2, Compass, Target } from 'lucide-react';
import { Card } from '../common/Card';
import { PROFILE_DATA } from '../../data/profileData';

export const AboutView: React.FC = () => {
  return (
    <div className="space-y-12 py-8 max-w-5xl mx-auto">
      {/* Header Profile Banner */}
      <section className="space-y-4 border-b border-zinc-200 dark:border-zinc-800 pb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-indigo-600 to-indigo-400 flex items-center justify-center text-white font-black text-3xl shadow-md shrink-0">
            HK
          </div>
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-100">
                {PROFILE_DATA.name}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-xs border border-emerald-500/20 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Verified AI QA Researcher
              </span>
            </div>
            <p className="text-base font-semibold text-indigo-600 dark:text-indigo-400">
              {PROFILE_DATA.title}
            </p>
            <p className="text-xs text-zinc-500 font-mono">
              Location: {PROFILE_DATA.location} • Status: {PROFILE_DATA.availability}
            </p>
          </div>
        </div>
      </section>

      {/* Professional Biography & Philosophy */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 space-y-3">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-sm uppercase tracking-wide">
            <UserCheck className="w-4 h-4" />
            <span>Professional Biography</span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
            {PROFILE_DATA.bio}
          </p>
        </Card>

        <Card className="p-6 space-y-3 border-l-4 border-l-indigo-600">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-sm uppercase tracking-wide">
            <Compass className="w-4 h-4" />
            <span>Professional Philosophy</span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-medium">
            "{PROFILE_DATA.professionalPhilosophy}"
          </p>
        </Card>
      </section>

      {/* Career Journey Timeline */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-indigo-500" />
          <span>Career Journey & Professional Milestones</span>
        </h2>

        <div className="space-y-4">
          {PROFILE_DATA.careerJourney.map((milestone, idx) => (
            <Card key={idx} className="p-6 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-2">
                <div>
                  <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">{milestone.role}</h3>
                  <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">{milestone.organization}</span>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 font-mono text-xs font-bold">
                  {milestone.year}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                {milestone.description}
              </p>

              <div className="space-y-1.5 pt-1">
                {milestone.keyAchievements.map((ach, aIdx) => (
                  <div key={aIdx} className="text-xs text-zinc-600 dark:text-zinc-300 flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{ach}</span>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Education & Certifications */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-indigo-500" />
            <span>Educational History</span>
          </h2>
          <div className="space-y-3">
            {PROFILE_DATA.education.map((edu, idx) => (
              <Card key={idx} className="p-5 space-y-2">
                <div className="flex items-center justify-between text-xs text-zinc-500 font-mono">
                  <span>{edu.institution}</span>
                  <span>{edu.year}</span>
                </div>
                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{edu.degree}</h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400">{edu.field}</p>
                {edu.honors && (
                  <span className="inline-block px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold">
                    {edu.honors}
                  </span>
                )}
              </Card>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <Award className="w-5 h-5 text-indigo-500" />
            <span>Professional Certifications</span>
          </h2>
          <div className="space-y-3">
            {PROFILE_DATA.certifications.map((cert, idx) => (
              <Card key={idx} className="p-5 space-y-2">
                <div className="flex items-center justify-between text-xs text-zinc-500 font-mono">
                  <span>{cert.issuer}</span>
                  <span>{cert.date}</span>
                </div>
                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{cert.title}</h3>
                {cert.credentialId && (
                  <p className="text-[11px] font-mono text-indigo-500">{cert.credentialId}</p>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Tools & Languages */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-sm uppercase tracking-wide">
            <Code2 className="w-4 h-4" />
            <span>Technical Stack & Evaluation Tools</span>
          </div>
          <div className="space-y-3">
            {PROFILE_DATA.technicalTools.map((toolGroup, idx) => (
              <div key={idx} className="space-y-1">
                <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100">{toolGroup.category}</span>
                <div className="flex flex-wrap gap-1.5">
                  {toolGroup.tools.map((t, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 py-0.5 rounded text-[11px] bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-medium"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-sm uppercase tracking-wide">
            <Globe2 className="w-4 h-4" />
            <span>Languages & Strengths</span>
          </div>
          <div className="space-y-3">
            <div>
              <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100 block mb-1.5">Spoken Languages</span>
              <div className="flex flex-wrap gap-2">
                {PROFILE_DATA.languages.map((lang, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-medium border border-indigo-500/20"
                  >
                    {lang.name} ({lang.proficiency})
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100 block mb-1.5">Core Strengths</span>
              <ul className="space-y-1">
                {PROFILE_DATA.professionalStrengths.map((s, idx) => (
                  <li key={idx} className="text-xs text-zinc-600 dark:text-zinc-300 flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
      </section>

      {/* Future Goals */}
      <section className="pt-2">
        <Card className="p-6 space-y-3 bg-zinc-900 text-zinc-100">
          <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm uppercase tracking-wide">
            <Target className="w-4 h-4" />
            <span>Future AI Evaluation Goals</span>
          </div>
          <ul className="space-y-2 text-xs sm:text-sm text-zinc-300">
            {PROFILE_DATA.futureGoals.map((goal, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-indigo-400 font-bold">•</span>
                <span>{goal}</span>
              </li>
            ))}
          </ul>
        </Card>
      </section>
    </div>
  );
};
