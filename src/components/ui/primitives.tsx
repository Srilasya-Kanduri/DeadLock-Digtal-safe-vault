import React from 'react';
import { motion } from 'framer-motion';

export const Card: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className = '', children, ...rest }) => (
  <div className={`bg-white/80 border border-platinum-200 rounded-2xl shadow-card ${className}`} {...rest}>
    {children}
  </div>
);

export const AnimatedCard: React.FC<React.HTMLAttributes<HTMLDivElement> & { delay?: number }> = ({
  className = '',
  children,
  delay = 0,
  ...rest
}) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] }}
    className={`bg-white/80 border border-platinum-200 rounded-2xl shadow-card ${className}`}
    {...(rest as any)}
  >
    {children}
  </motion.div>
);

const badgeTones: Record<string, string> = {
  neutral: 'bg-stone-200 text-graphite-600',
  verified: 'bg-emerald-50 text-emerald-700',
  pending: 'bg-amber-50 text-amber-700',
  critical: 'bg-rose-50 text-rose-700',
  steel: 'bg-steel-50 text-steel-600',
};

export const Badge: React.FC<{ tone?: keyof typeof badgeTones; children: React.ReactNode }> = ({
  tone = 'neutral',
  children,
}) => (
  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${badgeTones[tone]}`}>
    {children}
  </span>
);

export const ProgressBar: React.FC<{ value: number; className?: string }> = ({ value, className = '' }) => (
  <div className={`h-2 w-full bg-stone-200 rounded-full overflow-hidden ${className}`}>
    <motion.div
      className="h-full bg-steel-500 rounded-full"
      initial={{ width: 0 }}
      animate={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    />
  </div>
);

export const Field: React.FC<{
  label: string;
  children: React.ReactNode;
  hint?: string;
}> = ({ label, children, hint }) => (
  <label className="block">
    <span className="block text-sm font-medium text-graphite-600 mb-1.5">{label}</span>
    {children}
    {hint && <span className="block text-xs text-graphite-400 mt-1">{hint}</span>}
  </label>
);

export const inputClass =
  'w-full rounded-xl border border-platinum-300 bg-white px-3.5 py-2.5 text-[0.95rem] text-graphite-700 placeholder:text-graphite-400 focus:border-steel-500 transition-colors';

export const PageHeader: React.FC<{ title: string; subtitle?: string; action?: React.ReactNode }> = ({
  title,
  subtitle,
  action,
}) => (
  <div className="flex items-start justify-between mb-8 gap-4">
    <div>
      <h1 className="text-[1.75rem] font-semibold text-graphite-800 tracking-tightest2">{title}</h1>
      {subtitle && <p className="text-graphite-500 mt-1.5 max-w-xl leading-relaxed">{subtitle}</p>}
    </div>
    {action}
  </div>
);

export const EmptyState: React.FC<{ title: string; body: string; action?: React.ReactNode }> = ({
  title,
  body,
  action,
}) => (
  <div className="flex flex-col items-center justify-center text-center py-16 px-8 border border-dashed border-platinum-300 rounded-2xl">
    <h3 className="text-lg font-semibold text-graphite-700 mb-1.5">{title}</h3>
    <p className="text-graphite-500 max-w-sm mb-5 leading-relaxed">{body}</p>
    {action}
  </div>
);
