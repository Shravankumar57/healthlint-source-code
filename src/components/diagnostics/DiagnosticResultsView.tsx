import React from 'react';
import {
  AlertOctagon,
  AlertTriangle,
  CheckCircle2,
  Radio,
  FileCheck,
  ChevronRight,
  ShieldAlert,
} from 'lucide-react';
import type { DiagnosticResult } from '../../types';
import { StatusBadge } from '../ui/StatusBadge';
import { formatDate } from '../../utils/statusColors';
import { useNavigate } from 'react-router-dom';

interface DiagnosticResultsViewProps {
  result: DiagnosticResult;
  onNewEvaluation: () => void;
}

export const DiagnosticResultsView: React.FC<DiagnosticResultsViewProps> = ({
  result,
  onNewEvaluation,
}) => {
  const navigate = useNavigate();

  return (
    <div className="glass-card p-6 border-cyan-500/30 space-y-6 animate-fade-in">
      {/* Triage Status Banner */}
      <div
        className={`p-4 rounded-xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 font-mono ${
          result.status === 'red'
            ? 'bg-red-950/40 border-red-500/50 text-red-200'
            : result.status === 'amber'
            ? 'bg-amber-950/40 border-amber-500/50 text-amber-200'
            : 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
        }`}
      >
        <div className="flex items-center gap-3">
          {result.status === 'red' ? (
            <AlertOctagon className="w-8 h-8 text-red-400 shrink-0 animate-pulse" />
          ) : result.status === 'amber' ? (
            <AlertTriangle className="w-8 h-8 text-amber-400 shrink-0" />
          ) : (
            <CheckCircle2 className="w-8 h-8 text-emerald-400 shrink-0" />
          )}
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-base uppercase">
                {result.status === 'red'
                  ? 'RED CRITICAL TRIAGE CLASSIFICATION'
                  : result.status === 'amber'
                  ? 'AMBER CAUTION STATUS'
                  : 'GREEN NOMINAL FLIGHT STATUS'}
              </span>
              <StatusBadge status={result.status} showGlow />
            </div>
            <p className="text-xs text-gray-300 mt-0.5">
              Evaluation Reference: {result.id} • Processed {formatDate(result.timestamp)} UTC
            </p>
          </div>
        </div>

        <button
          onClick={onNewEvaluation}
          className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-gray-200 transition-all shrink-0"
        >
          New Evaluation Run
        </button>
      </div>

      {/* Flight Surgeon Escalation Alert Box (If Red) */}
      {result.escalationRequired && (
        <div className="p-4 rounded-xl bg-red-950/60 border border-red-500/60 text-red-200 font-mono text-xs space-y-2 shadow-lg shadow-red-950/40">
          <div className="flex items-center gap-2 text-red-400 font-bold tracking-wide">
            <Radio className="w-4 h-4 animate-ping" />
            <span>FLIGHT SURGEON ESCALATION MANDATED (LEVEL 1 PRIORITY)</span>
          </div>
          <p className="text-red-100 text-[11px] leading-relaxed">
            {result.escalationReason ||
              'One or more parameters exceed permissible mission autonomous boundaries. Encrypted Tempus Pro data burst queued for downlink to Houston/Flight Control via Deep Space Network.'}
          </p>
          <div className="flex items-center justify-between pt-2 border-t border-red-900/60 text-[11px]">
            <span>Ground Response Window: Dependent on Current Comm Delay</span>
            <span className="font-bold text-red-300">Burst Protocol: DSN-BURST-08-TEMPUS</span>
          </div>
        </div>
      )}

      {/* Detailed Diagnostic Findings */}
      <div>
        <h3 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider mb-3 flex items-center gap-2">
          <FileCheck className="w-4 h-4 text-cyan-400" />
          <span>Biomarker Evaluations & Algorithmic Explanations</span>
        </h3>

        <div className="space-y-2.5">
          {result.findings.map((f, idx) => (
            <div
              key={idx}
              className={`p-3.5 rounded-xl border text-xs font-mono transition-all flex flex-col md:flex-row md:items-center justify-between gap-3 ${
                f.status === 'red'
                  ? 'bg-red-950/25 border-red-500/40'
                  : f.status === 'amber'
                  ? 'bg-amber-950/25 border-amber-500/40'
                  : 'bg-slate-900/50 border-slate-800'
              }`}
            >
              <div className="space-y-1 max-w-xl">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-sm">{f.indicator}</span>
                  <StatusBadge status={f.status} size="sm" />
                </div>
                <p className="text-gray-300 text-[11px] leading-relaxed">
                  {f.explanation}
                </p>
              </div>

              <div className="shrink-0 text-right md:border-l md:border-slate-800 md:pl-4 space-y-0.5">
                <div className="text-sm font-bold text-white">
                  Recorded: {f.value}
                </div>
                <div className="text-[11px] text-gray-400">
                  Target: {f.baseline}
                </div>
                {f.delta !== undefined && (
                  <div
                    className={`text-[11px] font-semibold ${
                      f.delta > 0 ? 'text-amber-400' : 'text-emerald-400'
                    }`}
                  >
                    Delta: {f.delta > 0 ? `+${f.delta}%` : `${f.delta}%`}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Actionable Recommendations & Guided Countermeasures */}
      <div className="p-4 rounded-xl bg-slate-900/70 border border-cyan-500/20">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-cyan-400" />
            <span>Autonomous Crew Self-Care Countermeasures</span>
          </h3>
          <button
            onClick={() => navigate('/countermeasures')}
            className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
          >
            <span>View All Countermeasure Protocols</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <ul className="space-y-2">
          {result.recommendations.map((rec, idx) => (
            <li
              key={idx}
              className={`text-xs leading-relaxed font-mono flex items-start gap-2.5 p-2 rounded-lg ${
                rec.startsWith('CRITICAL')
                  ? 'bg-red-950/40 text-red-200 border border-red-500/30'
                  : rec.startsWith('CREW CAUTION')
                  ? 'bg-amber-950/40 text-amber-200 border border-amber-500/30'
                  : rec.startsWith('NASA SPACE APPS')
                  ? 'bg-slate-950 text-gray-400 border border-slate-800 text-[10px]'
                  : 'bg-slate-900/60 text-gray-300'
              }`}
            >
              <span className="text-cyan-400 font-bold shrink-0">▸</span>
              <span>{rec}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
