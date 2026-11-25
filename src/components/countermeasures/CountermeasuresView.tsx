import React, { useState } from 'react';
import {
  ClipboardList,
  CheckCircle2,
  Clock,
  Shield,
  BookOpen,
  Play,
  Check,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';
import { countermeasureProtocols } from '../../data/healthData';
import { useHealthStore } from '../../store/useHealthStore';

export const CountermeasuresView: React.FC = () => {
  const [selectedProtocolId, setSelectedProtocolId] = useState<string>(countermeasureProtocols[0].id);
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({});

  const { completeTask } = useHealthStore();

  const activeProtocol =
    countermeasureProtocols.find((p) => p.id === selectedProtocolId) || countermeasureProtocols[0];

  const toggleStep = (stepIdx: number) => {
    const key = `${activeProtocol.id}-${stepIdx}`;
    setCompletedSteps((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleProtocolDone = () => {
    // If thigh cuff or zero T2, mark matching wellness task done
    if (activeProtocol.id === 'cm-thigh-cuff') {
      completeTask('task-thigh-cuff');
    } else if (activeProtocol.id === 'cm-zero-t2') {
      completeTask('task-zero-t2');
    } else if (activeProtocol.id === 'cm-archer-sleep') {
      completeTask('task-sleep-reset');
    } else if (activeProtocol.id === 'cm-food-physiology') {
      completeTask('task-food-physiology');
    } else if (activeProtocol.id === 'cm-space-gardening') {
      completeTask('task-space-gardening');
    }
  };

  return (
    <div className="space-y-6 animate-fade-in font-mono">
      {/* Header */}
      <div className="glass-card p-6 border-cyan-500/30">
        <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1">
          <ClipboardList className="w-4 h-4" />
          <span>Non-Physician Astronaut Clinical Guidance</span>
        </div>
        <h2 className="text-xl font-bold text-white">
          Preventive Countermeasures & Guided Exam Protocols
        </h2>
        <p className="text-xs text-gray-400 mt-1">
          Standardized step-by-step procedures designed for deep-space autonomy when live Earth telemedicine is delayed
        </p>
      </div>

      {/* Main Grid: Protocol List & Interactive Guide */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Protocol Selector List */}
        <div className="space-y-2">
          {countermeasureProtocols.map((p) => {
            const isSelected = selectedProtocolId === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setSelectedProtocolId(p.id)}
                className={`w-full p-4 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'bg-cyan-950/70 border-cyan-400 text-cyan-300 shadow-md shadow-cyan-500/10'
                    : 'bg-slate-900/50 border-slate-800 text-gray-400 hover:text-gray-200 hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] text-gray-500 uppercase">{p.category}</span>
                  <span className="text-[10px] text-cyan-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{p.duration}</span>
                  </span>
                </div>
                <div className="text-xs font-bold text-white mb-1">{p.name}</div>
                <div className="text-[11px] text-gray-400 line-clamp-1">
                  {p.description}
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Column: Step-by-Step Interactive Guided Workflow */}
        <div className="lg:col-span-2 glass-card p-6 border-cyan-500/30 space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs px-2.5 py-1 rounded-lg bg-cyan-950 border border-cyan-500/30 text-cyan-300 font-semibold">
                {activeProtocol.category}
              </span>
              <div className="text-xs text-gray-400 flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Duration: {activeProtocol.duration}</span>
                </span>
                <span>•</span>
                <span>Freq: {activeProtocol.frequency}</span>
              </div>
            </div>

            <h3 className="text-lg font-bold text-white mb-2">{activeProtocol.name}</h3>
            <p className="text-xs text-gray-300 leading-relaxed font-sans">
              {activeProtocol.description}
            </p>
          </div>

          {/* Interactive Steps Checklist */}
          <div>
            <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-cyan-400" />
              <span>Execution Steps & Instructions</span>
            </h4>

            <div className="space-y-3">
              {activeProtocol.steps.map((step, idx) => {
                const key = `${activeProtocol.id}-${idx}`;
                const isDone = !!completedSteps[key];
                return (
                  <div
                    key={idx}
                    onClick={() => toggleStep(idx)}
                    className={`p-3.5 rounded-xl border text-xs cursor-pointer transition-all flex items-start gap-3 ${
                      isDone
                        ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                        : 'bg-slate-900/60 border-slate-800 text-gray-300 hover:border-slate-700'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                        isDone
                          ? 'bg-emerald-500 border-emerald-400 text-black'
                          : 'border-slate-600 bg-slate-950'
                      }`}
                    >
                      {isDone && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                    <div className="space-y-1">
                      <div className="font-bold text-white">Step {idx + 1}</div>
                      <p className="leading-relaxed font-sans">{step}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* NASA Research Grounding */}
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] text-gray-400 flex items-start gap-2">
            <Shield className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-gray-200">NASA HRP Investigation Grounding:</strong>{' '}
              {activeProtocol.nasaSource}
            </div>
          </div>

          {/* Mark Complete & Log Countermeasure Button */}
          <div className="pt-2 flex items-center justify-between">
            <span className="text-[11px] text-gray-500">
              Logging execution verifies adherence & awards XP
            </span>
            <button
              onClick={handleProtocolDone}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-black font-bold text-xs transition-all shadow-lg shadow-emerald-500/20"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Verify & Log Countermeasure Completion</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
