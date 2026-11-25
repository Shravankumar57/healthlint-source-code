import React from 'react';
import {
  ShieldAlert,
  Activity,
  Calendar,
  BookOpen,
  ChevronRight,
  TrendingUp,
  AlertTriangle,
  Play,
} from 'lucide-react';
import type { AnatomyRegionData } from '../../types';
import { StatusBadge } from '../ui/StatusBadge';
import { formatDelta, formatValue } from '../../utils/statusColors';
import { useNavigate } from 'react-router-dom';

interface AnatomyDetailsPanelProps {
  region: AnatomyRegionData;
  onUpdateSampleValue?: (indicatorId: string, val: number) => void;
}

export const AnatomyDetailsPanel: React.FC<AnatomyDetailsPanelProps> = ({
  region,
  onUpdateSampleValue,
}) => {
  const navigate = useNavigate();

  return (
    <div className="glass-card p-6 border-cyan-500/30 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-start justify-between border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-3 mb-1.5">
            <h2 className="text-xl font-bold font-mono text-white tracking-tight">
              {region.name}
            </h2>
            <StatusBadge status={region.status} showGlow />
          </div>
          <p className="text-xs text-gray-300 leading-relaxed font-sans max-w-2xl">
            {region.description}
          </p>
        </div>
      </div>

      {/* Grid: Indicators / Sample Telemetry */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
            <Activity className="w-4 h-4 text-cyan-400" />
            <span>Active Biomarkers & Clinical Indicators</span>
          </div>
          <span className="text-[11px] text-gray-400 font-mono">
            Ground Baseline Grounding (CIPHER / Standard Measures)
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {region.indicators.map((ind) => (
            <div
              key={ind.id}
              className={`p-3.5 rounded-xl border font-mono transition-all ${
                ind.status === 'red'
                  ? 'bg-red-950/30 border-red-500/40 shadow-sm shadow-red-500/10'
                  : ind.status === 'amber'
                  ? 'bg-amber-950/30 border-amber-500/40 shadow-sm shadow-amber-500/10'
                  : 'bg-slate-900/60 border-slate-800'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] text-gray-400 truncate max-w-[170px]" title={ind.name}>
                  {ind.name}
                </span>
                <StatusBadge status={ind.status} size="sm" />
              </div>

              <div className="flex items-baseline justify-between mb-2">
                <div className="text-xl font-bold text-white tracking-tight">
                  {formatValue(ind.value, ind.unit)}
                </div>
                <div
                  className={`text-xs font-semibold flex items-center gap-0.5 ${
                    ind.trend > 0 ? 'text-amber-400' : 'text-emerald-400'
                  }`}
                >
                  <TrendingUp className="w-3 h-3" />
                  <span>{formatDelta(ind.value, ind.baseline)}</span>
                </div>
              </div>

              <div className="text-[10px] text-gray-400 flex items-center justify-between border-t border-slate-800/80 pt-1.5">
                <span>Baseline: {ind.baseline} {ind.unit}</span>
                <span>{ind.lastUpdated}</span>
              </div>

              {/* Interactive Quick Slider / Tester */}
              {onUpdateSampleValue && (
                <div className="mt-2.5 pt-2 border-t border-slate-800/60">
                  <div className="flex items-center justify-between text-[10px] text-gray-400 mb-1">
                    <span>Simulate Value</span>
                    <span className="text-cyan-400 font-bold">{ind.value}</span>
                  </div>
                  <input
                    type="range"
                    min={ind.min}
                    max={ind.max}
                    step={ind.unit === 'mm' || ind.unit === '%' ? 0.1 : 1}
                    value={ind.value}
                    onChange={(e) => onUpdateSampleValue(ind.id, parseFloat(e.target.value))}
                    className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Two Column Layout: Space Hazards & Next Assessment */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Related Spaceflight Hazards */}
        <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-wider mb-2.5">
            <ShieldAlert className="w-4 h-4 text-amber-400" />
            <span>Associated NASA HRP Hazards</span>
          </div>
          <div className="flex flex-wrap gap-2 mb-3">
            {region.hazards.map((h) => (
              <span
                key={h}
                className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-amber-950/40 border border-amber-500/30 text-amber-300 capitalize"
              >
                {h.replace('-', ' ')}
              </span>
            ))}
          </div>
          <p className="text-xs text-gray-300 leading-relaxed font-sans">
            Primary organs involved: <span className="text-white font-medium">{region.organs.join(', ')}</span>.
          </p>
        </div>

        {/* Next Scheduled Assessment */}
        <div className="p-4 rounded-xl bg-slate-900/50 border border-cyan-500/20">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider mb-2.5">
            <Calendar className="w-4 h-4 text-cyan-400" />
            <span>Next Recommended Assessment</span>
          </div>
          <div className="text-sm font-semibold text-white mb-2">
            {region.nextAssessment}
          </div>
          <button
            onClick={() => navigate('/diagnostics')}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-bold transition-all"
          >
            <Play className="w-3.5 h-3.5" />
            <span>Launch Diagnostic Assessment</span>
          </button>
        </div>
      </div>

      {/* Step-by-Step Non-Physician Exam Protocol */}
      <div className="p-5 rounded-xl bg-slate-900/70 border border-cyan-500/20">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider mb-3">
          <BookOpen className="w-4 h-4 text-cyan-400" />
          <span>Non-Physician Astronaut Guided Exam Protocol</span>
        </div>
        <div className="space-y-2.5">
          {region.examInstructions.map((step, idx) => (
            <div key={idx} className="flex items-start gap-3 text-xs text-gray-300 leading-relaxed">
              <span className="shrink-0 w-5 h-5 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-300 font-mono font-bold text-[11px] flex items-center justify-center">
                {idx + 1}
              </span>
              <p className="pt-0.5">{step}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Medical Safety Disclaimer Banner */}
      <div className="p-3 rounded-lg bg-slate-900/40 border border-slate-800 text-[11px] text-gray-400 font-mono flex items-start gap-2">
        <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <span>
          <strong className="text-gray-300">CLINICAL SAFETY NOTE:</strong> HealthLint autonomous triage guidance is an operational prototype built for the NASA Space Apps Challenge, referencing NASA HRP investigations (CIPHER, ARCHeR, Standard Measures). In flight, critical alerts escalate directly to the ground Flight Surgeon.
        </span>
      </div>
    </div>
  );
};
