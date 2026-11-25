import React from 'react';
import {
  Sparkles,
  Flame,
  Award,
  CheckCircle2,
  Clock,
  Dumbbell,
  Moon,
  Utensils,
  Sprout,
  Activity,
  Shield,
  Droplets,
  Eye,
  Plus,
} from 'lucide-react';
import { useHealthStore } from '../../store/useHealthStore';
import { Card } from '../ui/Card';

export const CrewWellnessView: React.FC = () => {
  const { crew, wellnessTasks, totalXp, currentStreak, completeTask, missionDay } = useHealthStore();

  const taskIcons = {
    Dumbbell,
    Moon,
    Activity,
    Utensils,
    Sprout,
    Eye,
    Shield,
    Droplets,
  };

  const completedCount = wellnessTasks.filter((t) => t.completed).length;
  const progressPercent = Math.round((completedCount / wellnessTasks.length) * 100);

  return (
    <div className="space-y-6 animate-fade-in font-mono">
      {/* Top Banner: XP & Streak Status */}
      <div className="glass-card p-6 border-cyan-500/30">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>Behavioral Health & Positive Reinforcement Engine</span>
            </div>
            <h2 className="text-xl font-bold text-white">
              Crew Wellness, Streaks & HealthLint XP
            </h2>
            <p className="text-xs text-gray-400 mt-1">
              Sustaining multi-year crew adherence to rigorous preventive countermeasures through gamification
            </p>
          </div>

          {/* Gamification Stats Ribbon */}
          <div className="flex items-center gap-4">
            <div className="p-4 rounded-xl bg-slate-900/80 border border-amber-500/30 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-950 flex items-center justify-center text-amber-400 border border-amber-500/40">
                <Flame className="w-6 h-6 animate-bounce" />
              </div>
              <div>
                <div className="text-[10px] text-gray-400 uppercase">CREW STREAK</div>
                <div className="text-xl font-bold text-amber-300">{currentStreak} Days</div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-cyan-500/30 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-cyan-950 flex items-center justify-center text-cyan-400 border border-cyan-500/40">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <div className="text-[10px] text-gray-400 uppercase">HEALTHLINT XP</div>
                <div className="text-xl font-bold text-cyan-300">{totalXp} XP</div>
              </div>
            </div>
          </div>
        </div>

        {/* Daily Progress Bar */}
        <div className="mt-6 pt-4 border-t border-slate-800">
          <div className="flex justify-between items-center text-xs mb-2">
            <span className="text-gray-300 font-semibold">
              Daily Mission Health Routines: {completedCount} / {wellnessTasks.length} Completed
            </span>
            <span className="text-cyan-400 font-bold">{progressPercent}% Adherence</span>
          </div>
          <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 transition-all duration-500 shadow-sm shadow-cyan-500/50"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Daily Routine Tasks Grid */}
      <div className="glass-card p-6 border-cyan-500/30 space-y-4">
        <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-cyan-400" />
          <span>Flight Day {missionDay} Prescribed Wellness Tasks</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {wellnessTasks.map((task) => {
            const Icon = (taskIcons as any)[task.icon] || Activity;
            return (
              <div
                key={task.id}
                className={`p-4 rounded-xl border transition-all flex items-start justify-between gap-3 ${
                  task.completed
                    ? 'bg-slate-900/40 border-emerald-500/30 text-gray-300'
                    : 'bg-slate-900/70 border-slate-800 hover:border-cyan-500/40'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 border ${
                      task.completed
                        ? 'bg-emerald-950 text-emerald-400 border-emerald-500/40'
                        : 'bg-cyan-950/60 text-cyan-400 border-cyan-500/40'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-bold ${task.completed ? 'text-gray-300 line-through' : 'text-white'}`}>
                        {task.name}
                      </span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-purple-950 border border-purple-500/30 text-purple-300 font-bold">
                        +{task.xpReward} XP
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-400 font-sans leading-relaxed">
                      {task.description}
                    </p>
                    {task.completed && task.completedDate && (
                      <div className="text-[10px] text-emerald-400 font-mono">
                        ✓ Logged {task.completedDate}
                      </div>
                    )}
                  </div>
                </div>

                {!task.completed ? (
                  <button
                    onClick={() => completeTask(task.id)}
                    className="shrink-0 px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 text-xs font-bold transition-all"
                  >
                    Complete
                  </button>
                ) : (
                  <span className="shrink-0 p-1 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/30">
                    <CheckCircle2 className="w-4 h-4" />
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Crew Leaderboard & Unlocked Badges */}
      <div className="glass-card p-6 border-cyan-500/30 space-y-4">
        <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
          <Award className="w-4 h-4 text-cyan-400" />
          <span>Team CompileCrew Roster & Unlocked Flight Badges</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {crew.map((member) => (
            <div
              key={member.id}
              className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="text-2xl p-1 bg-slate-800 rounded-lg">{member.avatar}</div>
                  <div>
                    <h4 className="text-xs font-bold text-white">{member.name}</h4>
                    <p className="text-[10px] text-gray-400 truncate max-w-[150px]">{member.role}</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center text-xs pt-1 border-t border-slate-800">
                <span className="text-gray-400">Total Score:</span>
                <span className="text-cyan-300 font-bold">{member.xp} XP</span>
              </div>

              {/* Badges */}
              <div className="space-y-1.5 pt-1">
                <div className="text-[10px] text-gray-500 uppercase font-bold">Badges</div>
                <div className="flex flex-wrap gap-1.5">
                  {member.badges.map((badge) => (
                    <div
                      key={badge.id}
                      title={`${badge.name}: ${badge.description}`}
                      className={`px-2 py-1 rounded-lg border text-[11px] flex items-center gap-1.5 ${
                        badge.earned
                          ? 'bg-amber-950/40 border-amber-500/30 text-amber-200'
                          : 'bg-slate-950 border-slate-800 text-gray-600 opacity-60'
                      }`}
                    >
                      <span>{badge.icon}</span>
                      <span className="text-[10px] font-semibold">{badge.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
