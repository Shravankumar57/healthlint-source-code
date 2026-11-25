import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Activity,
  AlertTriangle,
  Award,
  CheckCircle2,
  ChevronRight,
  Clock,
  Compass,
  Flame,
  LineChart,
  Radio,
  Shield,
  ShieldAlert,
  Sparkles,
  Stethoscope,
  TrendingUp,
  User,
} from 'lucide-react';
import { useHealthStore } from '../store/useHealthStore';
import { StatusBadge } from '../components/ui/StatusBadge';
import { Card } from '../components/ui/Card';
import { formatDelta, formatValue } from '../utils/statusColors';
import { hazardData, missionEnvironments } from '../data/healthData';
import { getCommDelayString } from '../utils/environmentModifiers';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import { healthTrends } from '../data/trendData';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const {
    currentEnvironment,
    missionDay,
    missionName,
    crew,
    healthIndicators,
    alerts,
    wellnessTasks,
    totalXp,
    currentStreak,
    selectedRegion,
    selectRegion,
  } = useHealthStore();

  const currentEnv = missionEnvironments.find((e) => e.id === currentEnvironment) || missionEnvironments[0];
  const commDelay = getCommDelayString(currentEnvironment);

  // Overall counts
  const redIndicators = healthIndicators.filter((i) => i.status === 'red');
  const amberIndicators = healthIndicators.filter((i) => i.status === 'amber');
  const greenIndicators = healthIndicators.filter((i) => i.status === 'green');

  const unackAlerts = alerts.filter((a) => !a.acknowledged);
  const completedTasks = wellnessTasks.filter((t) => t.completed).length;

  return (
    <div className="space-y-6 animate-fade-in font-mono">
      {/* Top Mission Status Hero Banner */}
      <div className="glass-card p-6 border-cyan-500/30 scan-effect">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
              <span className="text-xs font-bold text-cyan-400 tracking-wider uppercase">
                MISSION STATUS: FLIGHT DECK ACTIVE
              </span>
              <span className="text-gray-500">•</span>
              <span className="text-xs text-gray-400">{missionName}</span>
            </div>

            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight font-mono">
              Autonomous Crew Health & Clinical Triage System
            </h1>

            <p className="text-xs text-gray-300 font-sans max-w-3xl leading-relaxed">
              Real-time physiological surveillance, 5-hazard prognostic modeling, and non-physician countermeasure guidance operationalized for deep-space mission independence.
            </p>
          </div>

          {/* Quick Habitat & Comm Delay Badge */}
          <div className="flex flex-wrap lg:flex-nowrap items-center gap-3">
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-cyan-500/30 text-xs">
              <div className="text-[10px] text-gray-400 uppercase">ACTIVE HABITAT</div>
              <div className="text-sm font-bold text-cyan-300 flex items-center gap-1.5 mt-0.5">
                <Compass className="w-4 h-4 text-cyan-400" />
                <span>{currentEnv.name.split(' (')[0]}</span>
              </div>
              <div className="text-[10px] text-gray-500 mt-0.5">
                Latency: <span className="text-gray-300">{commDelay}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-amber-500/30 text-xs">
              <div className="text-[10px] text-gray-400 uppercase">CREW STREAK & XP</div>
              <div className="text-sm font-bold text-amber-300 flex items-center gap-1.5 mt-0.5">
                <Flame className="w-4 h-4 text-amber-400 animate-bounce" />
                <span>{currentStreak} Days • {totalXp} XP</span>
              </div>
              <div className="text-[10px] text-emerald-400 mt-0.5">
                {completedTasks}/{wellnessTasks.length} Daily Countermeasures Logged
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Primary 4-Metric Vitals Overview Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Optic Nerve Sheath (SANS) */}
        <div
          onClick={() => {
            selectRegion('cranium-eyes');
            navigate('/anatomy');
          }}
          className="p-4 rounded-xl glass-card-hover glass-card border-amber-500/40 cursor-pointer space-y-2"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-gray-400 font-bold uppercase">SANS / Optic Sheath</span>
            <StatusBadge status="amber" size="sm" />
          </div>
          <div className="flex items-baseline justify-between">
            <div className="text-2xl font-bold text-white">5.8 mm</div>
            <div className="text-xs text-amber-400 font-semibold flex items-center gap-0.5">
              <TrendingUp className="w-3 h-3" />
              <span>+16.0%</span>
            </div>
          </div>
          <div className="text-[10px] text-gray-400 flex justify-between pt-1 border-t border-slate-800">
            <span>Target: 5.0 mm</span>
            <span className="text-amber-300">Thigh Cuff Active</span>
          </div>
        </div>

        {/* Metric 2: Fasting Blood Glucose (Metabolic) */}
        <div
          onClick={() => {
            selectRegion('gut-metabolic');
            navigate('/diagnostics');
          }}
          className="p-4 rounded-xl glass-card-hover glass-card border-red-500/40 cursor-pointer space-y-2"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-gray-400 font-bold uppercase">Metabolic / Glucose</span>
            <StatusBadge status="red" size="sm" />
          </div>
          <div className="flex items-baseline justify-between">
            <div className="text-2xl font-bold text-white">142 mg/dL</div>
            <div className="text-xs text-red-400 font-semibold flex items-center gap-0.5">
              <TrendingUp className="w-3 h-3" />
              <span>+54.3%</span>
            </div>
          </div>
          <div className="text-[10px] text-gray-400 flex justify-between pt-1 border-t border-slate-800">
            <span>Target: 92 mg/dL</span>
            <span className="text-red-300">Tempus Burst Queued</span>
          </div>
        </div>

        {/* Metric 3: Suit SpO2 (Hypoxia / EVA) */}
        <div
          onClick={() => {
            selectRegion('lungs');
            navigate('/biosignals');
          }}
          className="p-4 rounded-xl glass-card-hover glass-card border-emerald-500/40 cursor-pointer space-y-2"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-gray-400 font-bold uppercase">EVA Suit / SpO2</span>
            <StatusBadge status="green" size="sm" />
          </div>
          <div className="flex items-baseline justify-between">
            <div className="text-2xl font-bold text-white">98.2%</div>
            <div className="text-xs text-emerald-400 font-semibold">Nominal</div>
          </div>
          <div className="text-[10px] text-gray-400 flex justify-between pt-1 border-t border-slate-800">
            <span>Pre-Breathe: Verified</span>
            <span className="text-emerald-300">PCO2: 2.8 mmHg</span>
          </div>
        </div>

        {/* Metric 4: Bone Retention (Musculoskeletal) */}
        <div
          onClick={() => {
            selectRegion('spine-musculoskeletal');
            navigate('/countermeasures');
          }}
          className="p-4 rounded-xl glass-card-hover glass-card border-emerald-500/40 cursor-pointer space-y-2"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-gray-400 font-bold uppercase">Zero T2 / Bone Retention</span>
            <StatusBadge status="green" size="sm" />
          </div>
          <div className="flex items-baseline justify-between">
            <div className="text-2xl font-bold text-white">95.2%</div>
            <div className="text-xs text-cyan-400 font-semibold">+200 XP Streak</div>
          </div>
          <div className="text-[10px] text-gray-400 flex justify-between pt-1 border-t border-slate-800">
            <span>Spine Status: Nominal</span>
            <span className="text-emerald-300">Dynamic Load Cleared</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Hazard Cards + Live Alerts + Inline Mini Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Five Hazards Grid & Longitudinal Trajectory */}
        <div className="lg:col-span-2 space-y-6">
          {/* Five Hazards Overview */}
          <div className="glass-card p-6 border-cyan-500/30 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-cyan-400" />
                <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                  NASA Human Research Program: Five Spaceflight Hazards
                </h2>
              </div>
              <button
                onClick={() => navigate('/hazards')}
                className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
              >
                <span>Full Matrix</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5">
              {hazardData.map((hazard) => (
                <div
                  key={hazard.id}
                  onClick={() => navigate('/hazards')}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    hazard.status === 'red'
                      ? 'bg-red-950/30 border-red-500/40 hover:bg-red-950/50'
                      : hazard.status === 'amber'
                      ? 'bg-amber-950/30 border-amber-500/40 hover:bg-amber-950/50'
                      : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <StatusBadge status={hazard.status} size="sm" />
                  </div>
                  <h3 className="text-xs font-bold text-white truncate mb-1">
                    {hazard.name.split(' (')[0]}
                  </h3>
                  <p className="text-[10px] text-gray-400 line-clamp-2">
                    {hazard.risks[0]?.name}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Inline Longitudinal Trends Chart */}
          <div className="glass-card p-6 border-cyan-500/30 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <LineChart className="w-5 h-5 text-cyan-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Longitudinal Indicator Trend (Mission Days 1 to 30)
                </h3>
              </div>
              <button
                onClick={() => navigate('/analytics')}
                className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
              >
                <span>Analytics Suite</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={healthTrends['fasting-glucose']} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="dashGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ff1744" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#ff1744" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" stroke="#64748b" tick={{ fontSize: 10 }} />
                  <YAxis stroke="#64748b" tick={{ fontSize: 10 }} domain={[60, 160]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0a0f1e',
                      borderColor: 'rgba(255,23,68,0.4)',
                      borderRadius: '8px',
                      fontSize: '11px',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#ff1744"
                    strokeWidth={2}
                    fill="url(#dashGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="text-[11px] text-gray-400 flex justify-between">
              <span>Showing: Fasting Blood Glucose (mg/dL)</span>
              <span className="text-red-400 font-bold">FD-25 Critical Alert: 142 mg/dL</span>
            </div>
          </div>
        </div>

        {/* Right Col: Active Alerts & Crew Status */}
        <div className="space-y-6">
          {/* Recent Diagnostic Alerts */}
          <div className="glass-card p-6 border-cyan-500/30 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Priority Clinical Alerts
                </h3>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-red-950 text-red-300 font-bold border border-red-500/30">
                {unackAlerts.length} Active
              </span>
            </div>

            <div className="space-y-3">
              {alerts.slice(0, 3).map((alert) => (
                <div
                  key={alert.id}
                  className={`p-3.5 rounded-xl border text-xs space-y-1.5 transition-all ${
                    alert.severity === 'red'
                      ? 'bg-red-950/30 border-red-500/40 text-red-200'
                      : alert.severity === 'amber'
                      ? 'bg-amber-950/30 border-amber-500/40 text-amber-200'
                      : 'bg-slate-900/50 border-slate-800 text-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between font-bold">
                    <span className="truncate max-w-[200px]">{alert.title}</span>
                    <span className="text-[10px] text-gray-400">{alert.timestamp}</span>
                  </div>
                  <p className="text-[11px] text-gray-300 font-sans leading-relaxed">
                    {alert.message}
                  </p>
                  <div className="text-[10px] text-gray-500 pt-1 border-t border-slate-800/80 flex justify-between">
                    <span>Source: {alert.source}</span>
                    <button
                      onClick={() => navigate('/diagnostics')}
                      className="text-cyan-400 hover:text-cyan-300 font-semibold"
                    >
                      Triage &rarr;
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Team CompileCrew Status */}
          <div className="glass-card p-6 border-cyan-500/30 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-cyan-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Astronaut Crew Status
                </h3>
              </div>
              <button
                onClick={() => navigate('/wellness')}
                className="text-xs text-cyan-400 hover:text-cyan-300"
              >
                XP Log &rarr;
              </button>
            </div>

            <div className="space-y-2.5">
              {crew.map((member) => (
                <div
                  key={member.id}
                  className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl p-1 bg-slate-800 rounded">{member.avatar}</span>
                    <div>
                      <div className="text-xs font-bold text-white">{member.name}</div>
                      <div className="text-[10px] text-gray-400 truncate max-w-[150px]">{member.role}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <StatusBadge status={member.overallStatus} size="sm" />
                    <div className="text-[10px] text-cyan-300 font-bold mt-1">{member.xp} XP</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
