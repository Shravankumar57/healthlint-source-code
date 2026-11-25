import type { HealthStatus } from '../types';

export function getStatusColor(status: HealthStatus): string {
  switch (status) {
    case 'green':
      return '#00E676'; // Vibrant medical green
    case 'amber':
      return '#FFB300'; // Amber alert
    case 'red':
      return '#FF1744'; // Red critical
    default:
      return '#94A3B8';
  }
}

export function getStatusBg(status: HealthStatus): string {
  switch (status) {
    case 'green':
      return 'rgba(0, 230, 118, 0.12)';
    case 'amber':
      return 'rgba(255, 179, 0, 0.12)';
    case 'red':
      return 'rgba(255, 23, 68, 0.15)';
    default:
      return 'rgba(148, 163, 184, 0.1)';
  }
}

export function getStatusBorder(status: HealthStatus): string {
  switch (status) {
    case 'green':
      return 'rgba(0, 230, 118, 0.35)';
    case 'amber':
      return 'rgba(255, 179, 0, 0.4)';
    case 'red':
      return 'rgba(255, 23, 68, 0.5)';
    default:
      return 'rgba(148, 163, 184, 0.2)';
  }
}

export function getStatusGlow(status: HealthStatus): string {
  switch (status) {
    case 'green':
      return '0 0 16px rgba(0, 230, 118, 0.25)';
    case 'amber':
      return '0 0 16px rgba(255, 179, 0, 0.28)';
    case 'red':
      return '0 0 20px rgba(255, 23, 68, 0.35)';
    default:
      return 'none';
  }
}

export function getStatusLabel(status: HealthStatus): string {
  switch (status) {
    case 'green':
      return 'NOMINAL';
    case 'amber':
      return 'CAUTION';
    case 'red':
      return 'CRITICAL';
    default:
      return 'UNKNOWN';
  }
}

export function getStatusIcon(status: HealthStatus): string {
  switch (status) {
    case 'green':
      return '●';
    case 'amber':
      return '▲';
    case 'red':
      return '■';
    default:
      return '○';
  }
}

export function formatValue(value: number, unit: string): string {
  if (unit === 'T-score') {
    return `${value >= 0 ? '+' : ''}${value.toFixed(1)} ${unit}`;
  }
  if (value % 1 === 0) {
    return `${value} ${unit}`;
  }
  return `${value.toFixed(1)} ${unit}`;
}

export function formatDelta(current: number, baseline: number): string {
  if (baseline === 0) return '0%';
  const delta = ((current - baseline) / baseline) * 100;
  const sign = delta > 0 ? '+' : '';
  return `${sign}${delta.toFixed(1)}%`;
}

export function formatDate(dateStr: string): string {
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return dateStr;
  }
}
