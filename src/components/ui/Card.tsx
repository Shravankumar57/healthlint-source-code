import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  glow?: 'none' | 'cyan' | 'green' | 'amber' | 'red';
  scanEffect?: boolean;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  glow = 'none',
  scanEffect = false,
  onClick,
}) => {
  const glowClasses = {
    none: '',
    cyan: 'glow-cyan',
    green: 'glow-green',
    amber: 'glow-amber',
    red: 'glow-red',
  }[glow];

  return (
    <div
      onClick={onClick}
      className={`glass-card p-5 relative overflow-hidden transition-all duration-300 ${
        onClick ? 'cursor-pointer hover:border-cyan-500/40 hover:bg-slate-900/80' : ''
      } ${glowClasses} ${scanEffect ? 'scan-effect' : ''} ${className}`}
    >
      {children}
    </div>
  );
};
