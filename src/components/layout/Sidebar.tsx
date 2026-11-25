import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  User,
  Stethoscope,
  ShieldAlert,
  Activity,
  LineChart,
  ClipboardList,
  Sparkles,
  Compass,
  FileText,
  Users,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { useHealthStore } from '../../store/useHealthStore';

interface NavItem {
  name: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  badgeColor?: string;
}

const navItems: NavItem[] = [
  { name: 'Mission Overview', path: '/', icon: LayoutDashboard },
  { name: 'Interactive 3D Anatomy', path: '/anatomy', icon: User, badge: '3D/WebGL', badgeColor: 'bg-cyan-950 text-cyan-300 border-cyan-500/30' },
  { name: 'Diagnostic Assessment', path: '/diagnostics', icon: Stethoscope, badge: 'Engine', badgeColor: 'bg-red-950 text-red-300 border-red-500/30' },
  { name: 'Five-Hazard Monitoring', path: '/hazards', icon: ShieldAlert, badge: 'HRP', badgeColor: 'bg-amber-950 text-amber-300 border-amber-500/30' },
  { name: 'Biosignal Data Centre', path: '/biosignals', icon: Activity, badge: 'Live', badgeColor: 'bg-emerald-950 text-emerald-300 border-emerald-500/30' },
  { name: 'Trends & Analytics', path: '/analytics', icon: LineChart },
  { name: 'Countermeasures & Exams', path: '/countermeasures', icon: ClipboardList },
  { name: 'Crew Wellness & XP', path: '/wellness', icon: Sparkles, badge: 'Gamified', badgeColor: 'bg-purple-950 text-purple-300 border-purple-500/30' },
  { name: 'Environment Settings', path: '/environment', icon: Compass },
  { name: 'NASA Research Bank', path: '/research', icon: FileText },
  { name: 'About Team CompileCrew', path: '/about', icon: Users },
];

export const Sidebar: React.FC = () => {
  const { sidebarOpen } = useHealthStore();

  if (!sidebarOpen) {
    return (
      <aside className="w-16 bg-slate-950/90 border-r border-cyan-500/15 flex flex-col items-center py-4 space-y-4 shrink-0 transition-all duration-300 z-30">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              title={item.name}
              className={({ isActive }) =>
                `p-2.5 rounded-xl transition-all relative group flex items-center justify-center ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-400/50 shadow-md shadow-cyan-500/20'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-slate-900'
                }`
              }
            >
              <Icon className="w-5 h-5" />
            </NavLink>
          );
        })}
      </aside>
    );
  }

  return (
    <aside className="w-64 bg-slate-950/95 border-r border-cyan-500/15 flex flex-col shrink-0 transition-all duration-300 z-30 overflow-y-auto">
      {/* Flight Subsystem Header */}
      <div className="p-4 border-b border-slate-900">
        <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-semibold tracking-wider uppercase mb-1">
          <ShieldCheck className="w-4 h-4 text-cyan-400" />
          <span>Flight Medical Deck</span>
        </div>
        <p className="text-[11px] text-gray-400 font-mono">
          Autonomous Clinical Triage Subsystem
        </p>
      </div>

      {/* Navigation List */}
      <nav className="p-3 space-y-1 flex-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center justify-between px-3 py-2.5 rounded-xl font-mono text-xs transition-all group ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-950/80 to-blue-950/60 text-cyan-300 border border-cyan-500/40 shadow-sm shadow-cyan-500/10'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-slate-900/80 border border-transparent hover:border-slate-800'
                }`
              }
            >
              <div className="flex items-center gap-3">
                <Icon className="w-4 h-4 text-cyan-400/80 group-hover:text-cyan-300 group-hover:scale-110 transition-all" />
                <span className="font-medium tracking-tight">{item.name}</span>
              </div>
              <div className="flex items-center gap-1.5">
                {item.badge && (
                  <span
                    className={`text-[9px] font-mono px-1.5 py-0.5 rounded border uppercase font-bold tracking-wider ${item.badgeColor}`}
                  >
                    {item.badge}
                  </span>
                )}
                <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-cyan-400" />
              </div>
            </NavLink>
          );
        })}
      </nav>

      {/* Footer Info Box */}
      <div className="p-4 border-t border-slate-900 text-[11px] font-mono text-gray-400 space-y-1 bg-slate-950/40">
        <div className="flex items-center justify-between">
          <span className="text-gray-400">BUILD:</span>
          <span className="text-cyan-400 font-bold">HRP-v4.6.0-PRO</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-400">ENGINE:</span>
          <span className="text-emerald-400">Autonomous Tri-Mesh</span>
        </div>
        <div className="text-[10px] text-gray-400 pt-2 border-t border-slate-900/80 text-center">
          Team CompileCrew • NASA Space Apps
        </div>
      </div>
    </aside>
  );
};
