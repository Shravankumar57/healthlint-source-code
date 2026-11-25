import React from 'react';
import {
  Compass,
  Rocket,
  Building2,
  Truck,
  Tent,
  Globe,
  Radio,
  Clock,
  Shield,
  Activity,
  CheckCircle2,
} from 'lucide-react';
import { missionEnvironments } from '../../data/healthData';
import { useHealthStore } from '../../store/useHealthStore';
import {
  getEnvironmentModifiers,
  getCommDelayString,
} from '../../utils/environmentModifiers';
import type { MissionEnvironment } from '../../types';

export const EnvironmentManager: React.FC = () => {
  const { currentEnvironment, setEnvironment } = useHealthStore();

  const envIcons = {
    spacecraft: Rocket,
    'space-station': Building2,
    'surface-rover': Truck,
    'planetary-base': Tent,
    'earth-remote': Globe,
  };

  const activeEnv = missionEnvironments.find((e) => e.id === currentEnvironment) || missionEnvironments[0];
  const modifiers = getEnvironmentModifiers(currentEnvironment);
  const commDelay = getCommDelayString(currentEnvironment);

  return (
    <div className="space-y-6 animate-fade-in font-mono">
      {/* Header */}
      <div className="glass-card p-6 border-cyan-500/30">
        <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1">
          <Compass className="w-4 h-4" />
          <span>Mission Habitat Context Engine</span>
        </div>
        <h2 className="text-xl font-bold text-white">
          Adaptive Mission Environments & Operational Triage Context
        </h2>
        <p className="text-xs text-gray-400 mt-1">
          Switches autonomous diagnostic rules, hazard weightings, and comm delay buffers across multi-habitat exploration architectures
        </p>
      </div>

      {/* 5 Environment Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        {missionEnvironments.map((env) => {
          const Icon = envIcons[env.id];
          const isSelected = currentEnvironment === env.id;
          return (
            <button
              key={env.id}
              onClick={() => setEnvironment(env.id as MissionEnvironment)}
              className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between relative group ${
                isSelected
                  ? 'bg-gradient-to-b from-cyan-950/80 to-slate-900 border-cyan-400 shadow-xl shadow-cyan-500/20'
                  : 'bg-slate-900/40 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center border ${
                      isSelected
                        ? 'bg-cyan-500/20 text-cyan-400 border-cyan-400/50'
                        : 'bg-slate-800 text-gray-400 border-slate-700'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  {isSelected && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-500/40 font-bold">
                      ACTIVE
                    </span>
                  )}
                </div>

                <h3 className="text-xs font-bold text-white mb-1">{env.name}</h3>
                <p className="text-[11px] text-gray-400 line-clamp-3">
                  {env.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 text-[10px] text-gray-500">
                G-Level: <span className="text-gray-300 font-bold">{env.gravityLevel.split(' ')[0]}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Environment Detailed Configuration */}
      <div className="glass-card p-6 border-cyan-500/30 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            {React.createElement(envIcons[activeEnv.id], { className: 'w-7 h-7 text-cyan-400' })}
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white">{activeEnv.name}</h3>
                <span className="text-xs px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/30 font-bold">
                  Telemetry Linked
                </span>
              </div>
              <p className="text-xs text-gray-300 mt-0.5">{activeEnv.description}</p>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900 border border-cyan-500/30 text-xs space-y-1">
            <div className="text-gray-400 flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span>ROUND-TRIP COMM DELAY:</span>
            </div>
            <div className="text-cyan-300 font-bold text-sm">{commDelay}</div>
          </div>
        </div>

        {/* Environmental Parameter Multipliers Grid */}
        <div>
          <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-3 flex items-center gap-2">
            <Activity className="w-4 h-4 text-cyan-400" />
            <span>Active Environmental Risk Weighting Multipliers</span>
          </h4>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="text-[10px] text-gray-400">RADIATION MULTIPLIER</div>
              <div className="text-base font-bold text-cyan-300 mt-1">{modifiers.radiationMultiplier}x</div>
              <div className="text-[10px] text-gray-500 mt-0.5">GCR & Solar Protons</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="text-[10px] text-gray-400">FLUID SHIFT (SANS)</div>
              <div className="text-base font-bold text-amber-300 mt-1">{modifiers.fluidShiftMultiplier}x</div>
              <div className="text-[10px] text-gray-500 mt-0.5">Cephalad Pressure</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="text-[10px] text-gray-400">DECOMPRESSION (DCS)</div>
              <div className="text-base font-bold text-cyan-300 mt-1">{modifiers.decompressionMultiplier}x</div>
              <div className="text-[10px] text-gray-500 mt-0.5">Suit Delta Pressure</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="text-[10px] text-gray-400">BONE MINERAL LOSS</div>
              <div className="text-base font-bold text-cyan-300 mt-1">{modifiers.boneLossMultiplier}x</div>
              <div className="text-[10px] text-gray-500 mt-0.5">Weightless Osteopenia</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="text-[10px] text-gray-400">CONFINEMENT STRESS</div>
              <div className="text-base font-bold text-amber-300 mt-1">{modifiers.confinementMultiplier}x</div>
              <div className="text-[10px] text-gray-500 mt-0.5">Circadian & Isolation</div>
            </div>
          </div>
        </div>

        {/* Priority Focus & Medical Capabilities */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
            <h5 className="text-xs font-bold text-cyan-300 uppercase tracking-wider mb-2 flex items-center gap-2">
              <Shield className="w-4 h-4 text-cyan-400" />
              <span>Prioritized Health Surveillance</span>
            </h5>
            <ul className="space-y-1.5 text-xs text-gray-300">
              {activeEnv.activeMonitoring.map((item, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
            <h5 className="text-xs font-bold text-cyan-300 uppercase tracking-wider mb-2 flex items-center gap-2">
              <Clock className="w-4 h-4 text-cyan-400" />
              <span>Habitat Medical Kit & Equipment</span>
            </h5>
            <p className="text-xs text-gray-300 leading-relaxed font-sans mb-3">
              {activeEnv.medicalCapability}
            </p>
            <div className="text-[11px] text-gray-400">
              Gravity Standard: <strong className="text-white">{activeEnv.gravityLevel}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
