import React from 'react';
import { motion } from 'motion/react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverEffect?: boolean;
  glassmorphism?: boolean;
  id?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  onClick,
  hoverEffect = true,
  glassmorphism = false,
  id,
}) => {
  const baseClasses =
    'rounded-xl border transition-all duration-200 overflow-hidden bg-white dark:bg-zinc-900/90 border-zinc-200/90 dark:border-zinc-800 shadow-sm';
  const hoverClasses = hoverEffect
    ? 'hover:shadow-md hover:border-indigo-500/40 dark:hover:border-indigo-500/40 hover:-translate-y-0.5'
    : '';
  const glassClasses = glassmorphism ? 'backdrop-blur-md bg-white/80 dark:bg-zinc-900/80' : '';

  return (
    <motion.div
      id={id}
      onClick={onClick}
      className={`${baseClasses} ${hoverClasses} ${glassClasses} ${className} ${onClick ? 'cursor-pointer' : ''}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};
