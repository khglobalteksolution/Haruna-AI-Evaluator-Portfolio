import React from 'react';
import { SeverityLevel } from '../../types';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'neutral';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  id?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  id,
}) => {
  const variantStyles = {
    default: 'bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border-indigo-500/20',
    success: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20',
    warning: 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/20',
    danger: 'bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/20',
    info: 'bg-sky-500/10 text-sky-700 dark:text-sky-300 border-sky-500/20',
    neutral: 'bg-zinc-500/10 text-zinc-700 dark:text-zinc-300 border-zinc-500/20',
  };

  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs font-medium',
    md: 'px-2.5 py-1 text-xs font-semibold',
    lg: 'px-3 py-1.5 text-sm font-semibold',
  };

  return (
    <span
      id={id}
      className={`inline-flex items-center gap-1.5 rounded-md border whitespace-nowrap ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {children}
    </span>
  );
};

export const SeverityBadge: React.FC<{ level: SeverityLevel; id?: string }> = ({ level, id }) => {
  const map: Record<SeverityLevel, { label: string; variant: 'danger' | 'warning' | 'info' | 'neutral' }> = {
    critical: { label: 'CRITICAL RISK', variant: 'danger' },
    high: { label: 'HIGH RISK', variant: 'danger' },
    medium: { label: 'MEDIUM RISK', variant: 'warning' },
    low: { label: 'LOW RISK', variant: 'info' },
    informational: { label: 'INFO', variant: 'neutral' },
  };

  const conf = map[level] || map.informational;

  return (
    <Badge id={id} variant={conf.variant} size="sm">
      <span className="w-1.5 h-1.5 rounded-full bg-current inline-block"></span>
      {conf.label}
    </Badge>
  );
};

interface TagProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
  id?: string;
}

export const Tag: React.FC<TagProps> = ({ label, active, onClick, id }) => {
  return (
    <button
      id={id}
      type="button"
      onClick={onClick}
      className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all duration-150 border whitespace-nowrap ${
        active
          ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
          : 'bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700/60 hover:bg-zinc-200 dark:hover:bg-zinc-700'
      }`}
    >
      #{label}
    </button>
  );
};
