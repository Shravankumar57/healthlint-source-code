import React, { useState } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
  AreaChart,
  Area,
} from 'recharts';
import {
  TrendingUp,
  Calendar,
  Layers,
  Activity,
  AlertTriangle,
  History,
} from 'lucide-react';
import { healthTrends, missionTimeline } from '../../data/trendData';
import { StatusBadge } from '../ui/StatusBadge';

export const HealthAnalytics: React.FC = () => {
  const [selectedSeries, setSelectedSeries] = useState<string>('fasting-glucose');

  const seriesOptions = [
    { id: 'fasting-glucose', name: 'Fasting Blood Glucose', unit: 'mg/dL', baseline: 92, caution: 111, critical: 140 },
    { id: 'optic-nerve-sheath', name: 'Optic Nerve Sheath (ONSD)', unit: 'mm', baseline: 5.0, caution: 5.5, critical: 6.5 },
    { id: 'sleep-duration', name: 'Sleep Duration', unit: 'hrs', baseline: 7.8, caution: 6.9, critical: 5.4 },
    { id: 'bone-density', name: 'Bone Retention Index', unit: '%', baseline: 98.0, caution: 91.9, critical: 84.9 },
    { id: 'salivary-cortisol', name: 'Salivary Cortisol', unit: 'nmol/L', baseline: 15.0, caution: 20.0, critical: 35.0 },
    { id: 'cognitive-score', name: 'Cognitive Vigilance', unit: '/100', baseline: 94.0, caution: 80.0, critical: 60.0 },
  ];

  const currentOption = seriesOptions.find((s) => s.id === selectedSeries) || seriesOptions[0];
  const chartData = healthTrends[selectedSeries] || [];

  return (
    <div className="space-y-6 animate-fade-in font-mono">
      {/* Series Selector Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {seriesOptions.map((opt) => (
          <button
            key={opt.id}
            onClick={() => setSelectedSeries(opt.id)}
            className={`p-3 rounded-xl border text-left transition-all ${
              selectedSeries === opt.id
                ? 'bg-cyan-950/70 border-cyan-400 text-cyan-300 shadow-lg shadow-cyan-500/10'
                : 'bg-slate-900/40 border-slate-800 text-gray-400 hover:text-gray-200 hover:bg-slate-900'
            }`}
          >
            <div className="text-[10px] text-gray-500 uppercase truncate">
              {opt.unit}
            </div>
            <div className="text-xs font-bold truncate mt-0.5 text-white">
              {opt.name}
            </div>
          </button>
        ))}
      </div>

      {/* Main Longitudinal Trend Chart */}
      <div className="glass-card p-6 border-cyan-500/30 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-white">
                {currentOption.name} Longitudinal Mission Trajectory
              </h2>
              <span className="text-xs px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                Unit: {currentOption.unit}
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-1">
              Flight Day 1 to Flight Day 30 • Grounded in NASA HRP flight baselines
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-0.5 bg-cyan-400" />
              <span className="text-gray-300">Measured Trajectory</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-0.5 border-t border-dashed border-emerald-400" />
              <span className="text-gray-400">Baseline ({currentOption.baseline})</span>
            </div>
          </div>
        </div>

        {/* Recharts Area Container */}
        <div className="h-80 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#22d3ee" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(34,211,238,0.08)" />
              <XAxis dataKey="date" stroke="#64748b" tick={{ fontSize: 11 }} />
              <YAxis stroke="#64748b" tick={{ fontSize: 11 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0a0f1e',
                  borderColor: 'rgba(34,211,238,0.3)',
                  borderRadius: '8px',
                  fontFamily: 'monospace',
                  fontSize: '12px',
                }}
              />
              <ReferenceLine
                y={currentOption.baseline}
                stroke="#00E676"
                strokeDasharray="4 4"
                label={{ value: 'Target Baseline', fill: '#00E676', fontSize: 10, position: 'right' }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#22d3ee"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#trendGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Clinical Interpretation Footer */}
        <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-gray-300 flex items-start gap-2.5">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-white">NASA Longitudinal Insight:</strong> On Day 25, notice the sharp metabolic excursion and concurrent sleep debt drop described in Slide 5 of the CompileCrew presentation deck. Triage rules successfully generated timely countermeasure recommendations prior to irreversible clinical decline.
          </div>
        </div>
      </div>

      {/* Mission Timeline & Clinical Milestones */}
      <div className="glass-card p-6 border-cyan-500/30">
        <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-4 flex items-center gap-2">
          <History className="w-4 h-4 text-cyan-400" />
          <span>Mission Clinical Milestones & Event Log</span>
        </h3>

        <div className="relative border-l border-cyan-500/20 ml-3 space-y-6 pl-6 py-2">
          {missionTimeline.map((item, idx) => (
            <div key={idx} className="relative group">
              {/* Dot on timeline line */}
              <div className="absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-cyan-500 border-2 border-slate-950 group-hover:scale-125 transition-all shadow-md shadow-cyan-500/30" />

              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] font-bold text-cyan-400">{item.date}</span>
                <span className="text-gray-500">•</span>
                <span className="text-xs font-bold text-white">{item.title}</span>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-gray-400 uppercase">
                  {item.category}
                </span>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed font-sans mb-1">
                {item.description}
              </p>
              <p className="text-[11px] text-emerald-400 font-mono">
                Outcome: {item.impact}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
