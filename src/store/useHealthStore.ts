import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  HealthStatus,
  MissionEnvironment,
  AnatomyRegion,
  HealthIndicator,
  Alert,
  DiagnosticInput,
  DiagnosticResult,
  WellnessTask,
  CrewMember,
} from '../types';
import {
  anatomyRegions,
  diagnosticRules,
  missionEnvironments,
} from '../data/healthData';
import { evaluateDiagnostics } from '../utils/diagnosticEngine';
import { getEnvironmentModifiers } from '../utils/environmentModifiers';

interface HealthStore {
  currentEnvironment: MissionEnvironment;
  missionDay: number;
  missionName: string;
  crew: CrewMember[];
  healthIndicators: HealthIndicator[];
  alerts: Alert[];
  diagnosticResults: DiagnosticResult[];
  selectedRegion: AnatomyRegion | null;
  wellnessTasks: WellnessTask[];
  totalXp: number;
  currentStreak: number;
  sidebarOpen: boolean;

  // Actions
  setEnvironment: (env: MissionEnvironment) => void;
  selectRegion: (region: AnatomyRegion | null) => void;
  updateIndicator: (id: string, value: number) => void;
  submitDiagnostic: (inputs: DiagnosticInput[]) => DiagnosticResult;
  completeTask: (taskId: string) => void;
  acknowledgeAlert: (alertId: string) => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  resetDemo: () => void;
}

const initialCrew: CrewMember[] = [
  {
    id: 'crew-1',
    name: 'Pavan R Mudigoudra',
    role: 'Lead Systems & NASA Data Architect',
    avatar: '👨‍🚀',
    xp: 1850,
    streak: 12,
    overallStatus: 'green',
    badges: [
      { id: 'b1', name: 'Systems Master', icon: '⚡', description: 'Zero telemetry packet drop for 10 straight days', earned: true, earnedDate: 'Mission Day 10' },
      { id: 'b2', name: 'Zero T2 Veteran', icon: '🏋️', description: 'Completed 20 high-load resistance sessions', earned: true, earnedDate: 'Mission Day 18' },
      { id: 'b3', name: 'Mission Guardian', icon: '🛡️', description: 'Maintained habitat ECLSS scrubbers flawlessly', earned: true, earnedDate: 'Mission Day 22' },
    ],
  },
  {
    id: 'crew-2',
    name: 'Shravankumar K Bandi',
    role: 'Clinical Decision & Biomarker Engine Lead',
    avatar: '👨‍⚕️',
    xp: 1420,
    streak: 8,
    overallStatus: 'amber',
    badges: [
      { id: 'b4', name: 'Diagnostic Prodigy', icon: '🔬', description: 'Successfully resolved 15 autonomous triage alerts', earned: true, earnedDate: 'Mission Day 14' },
      { id: 'b5', name: 'Fluid Shift Sleuth', icon: '👁️', description: 'Early detection of SANS optic nerve enlargement', earned: true, earnedDate: 'Mission Day 18' },
      { id: 'b6', name: 'Flight Surgeon Link', icon: '📡', description: 'Transmitted priority Tempus Pro burst in < 60s', earned: false },
    ],
  },
  {
    id: 'crew-3',
    name: 'Mithil A',
    role: 'Interactive UX, Anatomy & Visualization Lead',
    avatar: '👨‍🎨',
    xp: 1280,
    streak: 7,
    overallStatus: 'green',
    badges: [
      { id: 'b7', name: 'UI Navigator', icon: '🧭', description: 'Completed 100% of non-physician guided exam tutorials', earned: true, earnedDate: 'Mission Day 12' },
      { id: 'b8', name: 'Green Thumb', icon: '🌱', description: 'Cultivated 5 fresh romaine crop harvests in Veggie module', earned: true, earnedDate: 'Mission Day 19' },
      { id: 'b9', name: 'Circadian Champion', icon: '🌙', description: '8 hours sleep target hit 5 nights consecutively', earned: false },
    ],
  },
];

const initialIndicators: HealthIndicator[] = anatomyRegions.flatMap((r) => r.indicators);

const initialAlerts: Alert[] = [
  {
    id: 'alert-glucose',
    timestamp: '25m ago',
    type: 'diagnostic',
    severity: 'red',
    title: 'RED CRITICAL: Fasting Glucose Exceeds Threshold',
    message: 'Capillary glucose logged at 142 mg/dL with concurrent salivary cortisol spike. Transmit priority Tempus Pro packet; initiate Food Physiology low-glycemic meal plan + ARCHeR 8-hr sleep reset.',
    acknowledged: false,
    source: 'Gut & Metabolic Telemetry',
  },
  {
    id: 'alert-sleep',
    timestamp: '1h ago',
    type: 'wellness',
    severity: 'red',
    title: 'RED CRITICAL: Cumulative Sleep Deficit',
    message: 'Recorded 5.2 hrs sleep duration. Psychomotor vigilance scores degraded by -17%. Scheduled non-critical tasks suspended.',
    acknowledged: false,
    source: 'ARCHeR Actigraphy Wristband',
  },
  {
    id: 'alert-onsd',
    timestamp: '3h ago',
    type: 'hazard',
    severity: 'amber',
    title: 'AMBER CAUTION: SANS Optic Nerve Enlargement',
    message: 'Optic nerve sheath diameter measured at 5.8 mm (+16% vs baseline). Deploy Thigh Cuff protocol (4 hrs) + take daily B-Complex.',
    acknowledged: false,
    source: 'Cranium & Neuro-Ocular Ultrasound',
  },
];

const initialTasks: WellnessTask[] = [
  {
    id: 'task-zero-t2',
    name: 'Zero T2 Resistive Strength Training',
    category: 'exercise',
    description: 'Execute prescribed 2.5-hr high-load squat, deadlift, and heel-raise sets at 85% 1RM on ARED/Zero T2 device to halt osteopenia.',
    xpReward: 200,
    completed: true,
    completedDate: 'Today 10:30 UTC',
    recurring: true,
    icon: 'Dumbbell',
  },
  {
    id: 'task-sleep-reset',
    name: 'ARCHeR 8-Hour Circadian Sleep Reset',
    category: 'sleep',
    description: 'Activate 18°C berth cooling, red-spectrum blue-depleted lighting, and acoustic noise canceling for protected sleep cycle.',
    xpReward: 150,
    completed: false,
    recurring: true,
    icon: 'Moon',
  },
  {
    id: 'task-thigh-cuff',
    name: 'Thigh Cuff Fluid Redistribution (4 hrs)',
    category: 'medical',
    description: 'Deploy pneumatic occlusive cuffs to proximal thighs at 35 mmHg to mitigate cephalad venous congestion and SANS.',
    xpReward: 120,
    completed: true,
    completedDate: 'Today 14:00 UTC',
    recurring: true,
    icon: 'Activity',
  },
  {
    id: 'task-food-physiology',
    name: 'Food Physiology Low-Glycemic Meal Package',
    category: 'nutrition',
    description: 'Consume high-fiber legume bowl with 2.5g omega-3 EPA/DHA supplement to stabilize fasting blood glucose below 110 mg/dL.',
    xpReward: 100,
    completed: false,
    recurring: true,
    icon: 'Utensils',
  },
  {
    id: 'task-space-gardening',
    name: '15-Min Space Gardening & Crop Microbiome Swab',
    category: 'mental',
    description: 'Tend to Veggie chamber romaine lettuce pillows and collect weekly leaf swab for miniPCR microbial safety validation.',
    xpReward: 80,
    completed: true,
    completedDate: 'Today 16:15 UTC',
    recurring: true,
    icon: 'Sprout',
  },
  {
    id: 'task-onsd-ultrasound',
    name: 'Optic Nerve Ultrasound Sheath Verification',
    category: 'medical',
    description: 'Capture bilateral 3mm retrobulbar B-scan ultrasound to re-evaluate optic sheath diameter post-countermeasure.',
    xpReward: 110,
    completed: false,
    recurring: true,
    icon: 'Eye',
  },
  {
    id: 'task-pre-breathe',
    name: 'Denitrogenation Nitrogen Purge Protocol',
    category: 'medical',
    description: '120-minute pure O2 pre-breathe purge on cycle ergometer to prevent decompression sickness prior to EVA egress.',
    xpReward: 140,
    completed: false,
    recurring: true,
    icon: 'Shield',
  },
  {
    id: 'task-hydration',
    name: 'Electrolyte Fluid Loading Check',
    category: 'nutrition',
    description: 'Consume 1.0 L isotonic electrolyte beverage prior to high-workload EVA tasks for plasma volume expansion.',
    xpReward: 60,
    completed: true,
    completedDate: 'Today 09:00 UTC',
    recurring: true,
    icon: 'Droplets',
  },
];

export const useHealthStore = create<HealthStore>()(
  persist(
    (set, get) => ({
      currentEnvironment: 'space-station',
      missionDay: 25,
      missionName: 'ARTEMIS EXPLORATION SIMULATION • FLIGHT DAY 25',
      crew: initialCrew,
      healthIndicators: initialIndicators,
      alerts: initialAlerts,
      diagnosticResults: [],
      selectedRegion: 'cranium-eyes',
      wellnessTasks: initialTasks,
      totalXp: 1450,
      currentStreak: 8,
      sidebarOpen: true,

      setEnvironment: (env: MissionEnvironment) => {
        const envData = missionEnvironments.find((e) => e.id === env);
        const mods = getEnvironmentModifiers(env);

        // Adjust relevant indicators dynamically based on selected environment
        const updatedIndicators = get().healthIndicators.map((ind) => {
          let updatedVal = ind.value;
          let updatedStatus: HealthStatus = ind.status;

          if (env === 'surface-rover') {
            if (ind.id === 'spo2') {
              updatedVal = 97.5;
            }
            if (ind.id === 'co2-partial') {
              updatedVal = 3.6;
            }
          } else if (env === 'spacecraft') {
            if (ind.id === 'circadian-shift') {
              updatedVal = 3.1;
              updatedStatus = 'amber';
            }
          } else if (env === 'earth-remote') {
            if (ind.id === 'bone-density') {
              updatedVal = 99.2;
              updatedStatus = 'green';
            }
            if (ind.id === 'optic-nerve-sheath') {
              updatedVal = 4.9;
              updatedStatus = 'green';
            }
          }

          return {
            ...ind,
            value: updatedVal,
            status: updatedStatus,
          };
        });

        const newAlert: Alert = {
          id: `alert-env-${Date.now()}`,
          timestamp: 'Just now',
          type: 'system',
          severity: 'green',
          title: `Environment Switched: ${envData?.name || env.toUpperCase()}`,
          message: `Diagnostic rules, atmospheric telemetry, and hazard matrices re-calibrated. Multipliers applied: Radiation (${mods.radiationMultiplier}x), Fluid Shift (${mods.fluidShiftMultiplier}x), Decompression (${mods.decompressionMultiplier}x).`,
          acknowledged: false,
          source: 'Environment Manager',
        };

        set({
          currentEnvironment: env,
          healthIndicators: updatedIndicators,
          alerts: [newAlert, ...get().alerts.slice(0, 9)],
        });
      },

      selectRegion: (region: AnatomyRegion | null) => {
        set({ selectedRegion: region });
      },

      updateIndicator: (id: string, value: number) => {
        const rule = diagnosticRules.find((r) => r.indicatorId === id);
        let newStatus: HealthStatus = 'green';

        if (rule) {
          if (rule.direction === 'above') {
            if (value >= rule.redThreshold) newStatus = 'red';
            else if (value >= rule.amberRange[0] && value <= rule.amberRange[1]) newStatus = 'amber';
            else newStatus = 'green';
          } else if (rule.direction === 'below') {
            if (value <= rule.redThreshold) newStatus = 'red';
            else if (value >= rule.amberRange[0] && value <= rule.amberRange[1]) newStatus = 'amber';
            else newStatus = 'green';
          }
        }

        const updatedIndicators = get().healthIndicators.map((ind) => {
          if (ind.id === id) {
            const trend = ind.baseline !== 0 ? ((value - ind.baseline) / ind.baseline) * 100 : 0;
            return {
              ...ind,
              value,
              status: newStatus,
              trend: Math.round(trend * 10) / 10,
              lastUpdated: 'Just now',
            };
          }
          return ind;
        });

        set({ healthIndicators: updatedIndicators });
      },

      submitDiagnostic: (inputs: DiagnosticInput[]) => {
        const result = evaluateDiagnostics(inputs, diagnosticRules);

        // Update corresponding indicators
        const updatedIndicators = get().healthIndicators.map((ind) => {
          const match = inputs.find((inp) => inp.id === ind.id);
          if (match && typeof match.value === 'number') {
            const finding = result.findings.find((f) => f.indicator === match.name);
            return {
              ...ind,
              value: match.value,
              status: finding?.status || ind.status,
              lastUpdated: 'Just now',
            };
          }
          return ind;
        });

        // Generate alert if non-green
        const newAlerts: Alert[] = [];
        if (result.status !== 'green') {
          newAlerts.push({
            id: `alert-diag-${Date.now()}`,
            timestamp: 'Just now',
            type: 'diagnostic',
            severity: result.status,
            title: `${result.status.toUpperCase()} DIAGNOSTIC TRIAGE: ${result.findings[0]?.indicator || 'Biomarker Anomaly'}`,
            message: result.recommendations[0] || 'Abnormal diagnostic evaluation detected.',
            acknowledged: false,
            source: 'Diagnostic Rule Engine',
          });
        }

        set({
          healthIndicators: updatedIndicators,
          diagnosticResults: [result, ...get().diagnosticResults],
          alerts: [...newAlerts, ...get().alerts.slice(0, 8)],
        });

        return result;
      },

      completeTask: (taskId: string) => {
        const task = get().wellnessTasks.find((t) => t.id === taskId);
        if (!task || task.completed) return;

        const updatedTasks = get().wellnessTasks.map((t) => {
          if (t.id === taskId) {
            return {
              ...t,
              completed: true,
              completedDate: `Mission Day ${get().missionDay} • ${new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} UTC`,
            };
          }
          return t;
        });

        const newXp = get().totalXp + task.xpReward;
        const newStreak = get().currentStreak + 1;

        // Check if milestone badges unlocked
        const updatedCrew = get().crew.map((member) => {
          if (member.id === 'crew-2' && taskId === 'task-food-physiology') {
            return {
              ...member,
              xp: member.xp + task.xpReward,
              streak: member.streak + 1,
              overallStatus: 'green' as HealthStatus,
            };
          }
          return {
            ...member,
            xp: member.xp + Math.round(task.xpReward / 3),
          };
        });

        const taskAlert: Alert = {
          id: `alert-task-${Date.now()}`,
          timestamp: 'Just now',
          type: 'wellness',
          severity: 'green',
          title: `Task Completed: +${task.xpReward} XP`,
          message: `"${task.name}" completed. Current crew streak extended to ${newStreak} consecutive days!`,
          acknowledged: false,
          source: 'Gamified Wellness Engine',
        };

        set({
          wellnessTasks: updatedTasks,
          totalXp: newXp,
          currentStreak: newStreak,
          crew: updatedCrew,
          alerts: [taskAlert, ...get().alerts.slice(0, 9)],
        });
      },

      acknowledgeAlert: (alertId: string) => {
        const updatedAlerts = get().alerts.map((a) => {
          if (a.id === alertId) {
            return { ...a, acknowledged: true };
          }
          return a;
        });
        set({ alerts: updatedAlerts });
      },

      toggleSidebar: () => {
        set({ sidebarOpen: !get().sidebarOpen });
      },

      setSidebarOpen: (open: boolean) => {
        set({ sidebarOpen: open });
      },

      resetDemo: () => {
        set({
          currentEnvironment: 'space-station',
          missionDay: 25,
          crew: initialCrew,
          healthIndicators: initialIndicators,
          alerts: initialAlerts,
          diagnosticResults: [],
          selectedRegion: 'cranium-eyes',
          wellnessTasks: initialTasks,
          totalXp: 1450,
          currentStreak: 8,
        });
      },
    }),
    {
      name: 'healthlint-storage-v2',
      partialize: (state) => ({
        wellnessTasks: state.wellnessTasks,
        totalXp: state.totalXp,
        currentStreak: state.currentStreak,
        currentEnvironment: state.currentEnvironment,
      }),
    }
  )
);
