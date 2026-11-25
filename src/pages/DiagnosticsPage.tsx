import React, { useState } from 'react';
import { DiagnosticWizard } from '../components/diagnostics/DiagnosticWizard';
import { DiagnosticResultsView } from '../components/diagnostics/DiagnosticResultsView';
import type { DiagnosticResult } from '../types';
import { useHealthStore } from '../store/useHealthStore';
import { Stethoscope, History } from 'lucide-react';

export const DiagnosticsPage: React.FC = () => {
  const { diagnosticResults } = useHealthStore();
  const [currentResult, setCurrentResult] = useState<DiagnosticResult | null>(
    diagnosticResults.length > 0 ? diagnosticResults[0] : null
  );

  return (
    <div className="space-y-6 animate-fade-in font-mono">
      {currentResult ? (
        <DiagnosticResultsView
          result={currentResult}
          onNewEvaluation={() => setCurrentResult(null)}
        />
      ) : (
        <DiagnosticWizard onComplete={(res) => setCurrentResult(res)} />
      )}

      {/* Historical Diagnostics Runs */}
      {diagnosticResults.length > 0 && (
        <div className="glass-card p-6 border-cyan-500/30">
          <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider mb-3">
            <History className="w-4 h-4 text-cyan-400" />
            <span>Evaluation History Logs ({diagnosticResults.length})</span>
          </div>

          <div className="space-y-2">
            {diagnosticResults.slice(0, 5).map((dr) => (
              <div
                key={dr.id}
                onClick={() => setCurrentResult(dr)}
                className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 cursor-pointer flex items-center justify-between text-xs transition-all"
              >
                <div>
                  <span className="font-bold text-white">{dr.id}</span>
                  <span className="text-gray-400 ml-2 text-[11px]">{new Date(dr.timestamp).toLocaleTimeString()}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-gray-400 text-[11px]">{dr.findings.length} Indicators</span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      dr.status === 'red'
                        ? 'bg-red-950 text-red-300 border border-red-500/30'
                        : dr.status === 'amber'
                        ? 'bg-amber-950 text-amber-300 border border-amber-500/30'
                        : 'bg-emerald-950 text-emerald-300 border border-emerald-500/30'
                    }`}
                  >
                    {dr.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
