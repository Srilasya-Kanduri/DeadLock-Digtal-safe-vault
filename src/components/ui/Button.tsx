import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'subtle';
  size?: 'md' | 'lg';
}

const variants: Record<string, string> = {
  primary: 'bg-graphite-700 text-canvas hover:bg-graphite-800',
  secondary: 'bg-white border border-platinum-300 text-graphite-700 hover:border-graphite-500',
  ghost: 'bg-transparent text-graphite-600 hover:bg-stone-200',
  subtle: 'bg-steel-50 text-steel-600 hover:bg-steel-100',
};

const sizes: Record<string, string> = {
  md: 'px-4 py-2.5 text-[0.9rem]',
  lg: 'px-6 py-3.5 text-base',
};

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', size = 'md', className = '', children, ...rest }) => {
  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      className={`rounded-xl font-medium transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`}
      {...(rest as any)}
    >
      {children}
    </motion.button>
  );
};
