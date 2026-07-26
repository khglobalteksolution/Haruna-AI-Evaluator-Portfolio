import React from 'react';
import { Calendar, CheckCircle2, Clock } from 'lucide-react';

export interface TimelineItem {
  id: string;
  date: string;
  title: string;
  version?: string;
  category?: string;
  description: string;
  status?: 'completed' | 'in-progress' | 'planned';
  details?: string[];
}

interface TimelineProps {
  items: TimelineItem[];
  id?: string;
}

export const Timeline: React.FC<TimelineProps> = ({ items, id }) => {
  return (
    <div id={id} className="relative pl-6 sm:pl-8 border-l-2 border-zinc-200 dark:border-zinc-800 space-y-8">
      {items.map((item) => (
        <div key={item.id} className="relative group">
          {/* Node Bullet */}
          <div className="absolute -left-[31px] sm:-left-[39px] top-1 flex items-center justify-center w-6 h-6 rounded-full bg-white dark:bg-zinc-900 border-2 border-indigo-600 text-indigo-600 shadow-sm">
            {item.status === 'completed' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-500 fill-emerald-500/20" />
            ) : (
              <Clock className="w-3.5 h-3.5 text-indigo-500" />
            )}
          </div>

          <div className="p-4 sm:p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="font-bold text-zinc-900 dark:text-zinc-100 text-base">{item.title}</span>
                {item.version && (
                  <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-semibold border border-indigo-500/20">
                    {item.version}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1 text-xs text-zinc-500 font-medium">
                <Calendar className="w-3.5 h-3.5" />
                <span>{item.date}</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">{item.description}</p>

            {item.details && item.details.length > 0 && (
              <ul className="mt-3 space-y-1 pl-4 list-disc text-xs text-zinc-500 dark:text-zinc-400">
                {item.details.map((d, idx) => (
                  <li key={idx}>{d}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
