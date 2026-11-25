import React from 'react';
import type { HealthStatus } from '../../types';
import {
  getStatusColor,
  getStatusBg,
  getStatusBorder,
  getStatusLabel,
  getStatusGlow,
} from '../../utils/statusColors';

interface StatusBadgeProps {
  status: HealthStatus;
  size?: 'sm' | 'md' | 'lg';
  showDot?: boolean;
  showGlow?: boolean;
  label?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  size = 'md',
  showDot = true,
  showGlow = false,
  label,
}) => {
  const color = getStatusColor(status);
  const bg = getStatusBg(status);
  const border = getStatusBorder(status);
  const glow = showGlow ? getStatusGlow(status) : 'none';
  const text = label || getStatusLabel(status);

  const sizeClasses = {
    sm: 'text-[10px] px-1.5 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5',
    lg: 'text-sm px-3.5 py-1.5 gap-2',
  }[size];

  const dotSize = {
    sm: 'w-1.5 h-1.5',
    md: 'w-2 h-2',
    lg: 'w-2.5 h-2.5',
  }[size];

  return (
    <span
      className={`inline-flex items-center font-mono font-semibold tracking-wider rounded-full border transition-all ${sizeClasses}`}
      style={{
        backgroundColor: bg,
        borderColor: border,
        color,
        boxShadow: glow,
      }}
    >
      {showDot && (
        <span
          className={`rounded-full ${dotSize} ${
            status === 'green'
              ? 'status-dot-green'
              : status === 'amber'
              ? 'status-dot-amber'
              : 'status-dot-red'
          }`}
        />
      )}
      {text}
    </span>
  );
};
