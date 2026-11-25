import React, { useState } from 'react';
import {
  Menu,
  Bell,
  Radio,
  Flame,
  Award,
  RefreshCw,
  AlertTriangle,
  ChevronDown,
  CheckCircle2,
  X,
} from 'lucide-react';
import { useHealthStore } from '../../store/useHealthStore';
import { StatusBadge } from '../ui/StatusBadge';
import { getCommDelayString } from '../../utils/environmentModifiers';
import { missionEnvironments } from '../../data/healthData';
import type { MissionEnvironment } from '../../types';

export const Navbar: React.FC = () => {
  const {
    currentEnvironment,
    setEnvironment,
    missionDay,
    totalXp,
    currentStreak,
    alerts,
    acknowledgeAlert,
    toggleSidebar,
    resetDemo,
  } = useHealthStore();

  const [showAlertsDropdown, setShowAlertsDropdown] = useState(false);
  const [showEnvDropdown, setShowEnvDropdown] = useState(false);

  const unackAlerts = alerts.filter((a) => !a.acknowledged);
  const currentEnvData = missionEnvironments.find((e) => e.id === currentEnvironment);
  const commDelay = getCommDelayString(currentEnvironment);

  // Compute overall status from alerts
  const hasRed = alerts.some((a) => a.severity === 'red' && !a.acknowledged);
  const hasAmber = alerts.some((a) => a.severity === 'amber' && !a.acknowledged);
  const overallStatus = hasRed ? 'red' : hasAmber ? 'amber' : 'green';

  return (
    <header className="sticky top-0 z-40 bg-slate-950/85 backdrop-blur-md border-b border-cyan-500/20 px-4 py-2.5">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Sidebar toggle & Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleSidebar}
            className="p-1.5 rounded-lg text-gray-400 hover:text-cyan-400 hover:bg-slate-900 border border-transparent hover:border-cyan-500/30 transition-all"
            title="Toggle Sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-700 flex items-center justify-center shadow-lg shadow-cyan-500/20 border border-cyan-300/40">
              <span className="font-mono font-black text-sm text-white tracking-tighter">HL</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold tracking-tight text-white text-base font-mono">
                  Health<span className="text-cyan-400">Lint</span>
                </span>
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30 font-semibold tracking-wider">
                  NASA Space Apps
                </span>
              </div>
              <div className="text-[11px] text-gray-400 font-mono flex items-center gap-1.5">
                <span>AUTONOMOUS CREW TRIAGE</span>
                <span>•</span>
                <span className="text-cyan-400">FD-{missionDay}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Center: Environment Switcher & Comm Status */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Environment Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowEnvDropdown(!showEnvDropdown)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-cyan-500/30 hover:border-cyan-400 text-xs font-mono text-gray-200 transition-all hover:shadow-sm hover:shadow-cyan-500/20"
            >
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-gray-400">HABITAT:</span>
              <span className="font-semibold text-cyan-300">{currentEnvData?.name.split(' (')[0]}</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
            </button>

            {showEnvDropdown && (
              <div className="absolute top-full mt-2 w-72 bg-slate-900 border border-cyan-500/30 rounded-xl shadow-2xl p-2 z-50 animate-fade-in backdrop-blur-xl">
                <div className="text-[10px] font-mono text-gray-400 uppercase tracking-wider px-2 py-1">
                  Select Operating Environment
                </div>
                {missionEnvironments.map((env) => (
                  <button
                    key={env.id}
                    onClick={() => {
                      setEnvironment(env.id as MissionEnvironment);
                      setShowEnvDropdown(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-mono transition-all flex items-center justify-between ${
                      currentEnvironment === env.id
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                        : 'text-gray-300 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <span>{env.name}</span>
                    {currentEnvironment === env.id && <span className="text-cyan-400 font-bold">✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Comm Delay Banner */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/60 border border-slate-800 text-[11px] font-mono text-gray-400">
            <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>COMM LATENCY:</span>
            <span className="text-gray-200 font-semibold">{commDelay}</span>
          </div>

          {/* Overall Health Status */}
          <div className="flex items-center gap-2">
            <StatusBadge status={overallStatus} size="sm" showGlow />
          </div>
        </div>

        {/* Right: Gamification XP, Alerts, Reset */}
        <div className="flex items-center gap-2.5">
          {/* XP & Streak Pills */}
          <div className="flex items-center gap-1.5 bg-slate-900/80 px-2.5 py-1 rounded-lg border border-cyan-500/20 font-mono text-xs">
            <Flame className="w-4 h-4 text-amber-400 animate-bounce" />
            <span className="text-amber-300 font-bold">{currentStreak}D</span>
            <span className="text-gray-500">|</span>
            <Award className="w-4 h-4 text-cyan-400" />
            <span className="text-cyan-300 font-bold">{totalXp} XP</span>
          </div>

          {/* Alerts Bell */}
          <div className="relative">
            <button
              onClick={() => setShowAlertsDropdown(!showAlertsDropdown)}
              className="relative p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-cyan-500/20 hover:border-cyan-400 text-gray-300 transition-all"
              title="Mission Diagnostic Alerts"
            >
              <Bell className="w-4 h-4" />
              {unackAlerts.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-600 text-[10px] font-mono font-bold text-white flex items-center justify-center animate-pulse">
                  {unackAlerts.length}
                </span>
              )}
            </button>

            {showAlertsDropdown && (
              <div className="absolute right-0 top-full mt-2 w-88 bg-slate-900 border border-cyan-500/30 rounded-xl shadow-2xl p-3 z-50 animate-fade-in backdrop-blur-xl">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-2">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-400" />
                    <span className="font-mono text-xs font-semibold text-white">
                      Diagnostic Alerts ({unackAlerts.length})
                    </span>
                  </div>
                  <button
                    onClick={() => setShowAlertsDropdown(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="max-h-72 overflow-y-auto space-y-2 pr-1">
                  {alerts.slice(0, 5).map((alert) => (
                    <div
                      key={alert.id}
                      className={`p-2.5 rounded-lg border text-xs font-mono transition-all ${
                        alert.severity === 'red'
                          ? 'bg-red-950/40 border-red-500/40 text-red-200'
                          : alert.severity === 'amber'
                          ? 'bg-amber-950/40 border-amber-500/40 text-amber-200'
                          : 'bg-slate-800/60 border-slate-700 text-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-[11px] truncate">{alert.title}</span>
                        <span className="text-[10px] text-gray-400">{alert.timestamp}</span>
                      </div>
                      <p className="text-[11px] text-gray-300 leading-relaxed mb-2">
                        {alert.message}
                      </p>
                      <div className="flex items-center justify-between text-[10px] text-gray-400 pt-1 border-t border-slate-800/80">
                        <span>Source: {alert.source}</span>
                        {!alert.acknowledged ? (
                          <button
                            onClick={() => acknowledgeAlert(alert.id)}
                            className="text-cyan-400 hover:text-cyan-300 underline font-semibold"
                          >
                            Acknowledge
                          </button>
                        ) : (
                          <span className="text-gray-500 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-green-400" /> Acknowledged
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Reset Demo button */}
          <button
            onClick={resetDemo}
            className="p-2 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/30 text-gray-400 hover:text-cyan-300 transition-all text-xs"
            title="Reset Demo to Baseline State"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
