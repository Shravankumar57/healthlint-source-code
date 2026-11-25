import React, { useState } from 'react';
import {
  Orbit,
  Radiation,
  Container,
  Users,
  Radio,
  AlertTriangle,
  Shield,
  Activity,
  CheckCircle2,
} from 'lucide-react';
import { hazardData } from '../../data/healthData';
import { StatusBadge } from '../ui/StatusBadge';
import type { SpaceflightHazard } from '../../types';

export const HazardsMatrix: React.FC = () => {
  const [selectedHazardId, setSelectedHazardId] = useState<SpaceflightHazard>('gravity-fields');
  const [expandedRisk, setExpandedRisk] = useState<string | null>(null);

  const selectedHazard = hazardData.find((h) => h.id === selectedHazardId) || hazardData[0];

  const hazardIcons = {
    'gravity-fields': Orbit,
    'space-radiation': Radiation,
    'hostile-environments': Container,
    'isolation-confinement': Users,
    'distance-from-earth': Radio,
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* 5 Hazard Selector Ribbon */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {hazardData.map((hazard) => {
          const Icon = hazardIcons[hazard.id];
          const isSelected = selectedHazardId === hazard.id;
          return (
            <button
              key={hazard.id}
              onClick={() => setSelectedHazardId(hazard.id)}
              className={`p-4 rounded-xl border text-left font-mono transition-all flex flex-col justify-between relative group ${
                isSelected
                  ? 'bg-gradient-to-br from-cyan-950/70 to-slate-900 border-cyan-400 shadow-lg shadow-cyan-500/10'
                  : 'bg-slate-900/50 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
              }`}
            >
              <div className="flex items-center justify-between mb-3 w-full">
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center border ${
                    isSelected
                      ? 'bg-cyan-500/20 text-cyan-400 border-cyan-400/40'
                      : 'bg-slate-800 text-gray-400 border-slate-700'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <StatusBadge status={hazard.status} size="sm" />
              </div>

              <div>
                <h3 className="text-xs font-bold text-white mb-1 tracking-tight">
                  {hazard.name.split(' (')[0]}
                </h3>
                <p className="text-[10px] text-gray-400 line-clamp-2">
                  {hazard.description}
                </p>
              </div>

              {isSelected && (
                <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-8 h-1 bg-cyan-400 rounded-full" />
              )}
            </button>
          );
        })}
      </div>

      {/* Selected Hazard Comprehensive Detail Card */}
      <div className="glass-card p-6 border-cyan-500/30 space-y-6">
        {/* Title & Core Hazard Overview */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            {React.createElement(hazardIcons[selectedHazard.id], {
              className: 'w-7 h-7 text-cyan-400',
            })}
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-bold font-mono text-white">
                  {selectedHazard.name}
                </h2>
                <StatusBadge status={selectedHazard.status} showGlow />
              </div>
              <p className="text-xs text-gray-300 font-mono mt-0.5">
                NASA Human Research Program (HRP) Primary Hazard Assessment
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-gray-400">Compounding Cross-Interactions:</span>
            <div className="flex gap-1.5">
              {selectedHazard.interactions.map((interaction) => (
                <span
                  key={interaction}
                  className="px-2 py-0.5 rounded bg-slate-900 border border-cyan-500/20 text-[10px] font-mono text-cyan-300 capitalize"
                >
                  {interaction.replace('-', ' ')}
                </span>
              ))}
            </div>
          </div>
        </div>

        <p className="text-sm text-gray-200 leading-relaxed font-sans">
          {selectedHazard.description}
        </p>

        {/* Real-Time Monitored Indicators in HealthLint */}
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 font-mono">
          <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider mb-2.5">
            <Activity className="w-4 h-4 text-cyan-400" />
            <span>Monitored Hazard Biomarkers & Clinical Telemetry</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedHazard.indicators.map((ind, idx) => (
              <div
                key={idx}
                className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-gray-200 flex items-center gap-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <span>{ind}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Compounding Physiological & Behavioral Risks Accordion */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <span>Compounding Physiological & Behavioral Risks</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {selectedHazard.risks.map((risk, idx) => {
              const isExpanded = expandedRisk === risk.name;
              return (
                <div
                  key={idx}
                  onClick={() => setExpandedRisk(isExpanded ? null : risk.name)}
                  className={`p-4 rounded-xl border font-mono transition-all cursor-pointer ${
                    risk.severity === 'red'
                      ? 'bg-red-950/20 border-red-500/30'
                      : risk.severity === 'amber'
                      ? 'bg-amber-950/20 border-amber-500/30'
                      : 'bg-slate-900/40 border-slate-800'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-xs">{risk.name}</span>
                    </div>
                    <StatusBadge status={risk.severity} size="sm" />
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed font-sans">
                    {risk.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Two Columns: Clinical Assessments & Preventive Countermeasures */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {/* Clinical Assessments */}
          <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 font-mono">
            <div className="flex items-center gap-2 text-xs font-bold text-cyan-300 uppercase tracking-wider mb-3">
              <Activity className="w-4 h-4 text-cyan-400" />
              <span>Routine Diagnostic Protocols</span>
            </div>
            <ul className="space-y-2 text-xs text-gray-300">
              {selectedHazard.assessments.map((a, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold shrink-0">▸</span>
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Preventive Countermeasures */}
          <div className="p-4 rounded-xl bg-slate-900/50 border border-emerald-500/20 font-mono">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-300 uppercase tracking-wider mb-3">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>Prescribed Preventive Countermeasures</span>
            </div>
            <ul className="space-y-2 text-xs text-gray-300">
              {selectedHazard.preventiveMeasures.map((pm, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{pm}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
