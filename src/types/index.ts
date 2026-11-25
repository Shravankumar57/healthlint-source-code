// HealthLint Type Definitions
// NASA Space Apps Challenge — Team CompileCrew

export type HealthStatus = 'green' | 'amber' | 'red';
export type MissionEnvironment = 'spacecraft' | 'space-station' | 'surface-rover' | 'planetary-base' | 'earth-remote';

export interface CrewMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  xp: number;
  streak: number;
  overallStatus: HealthStatus;
  badges: Badge[];
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  earned: boolean;
  earnedDate?: string;
}

export interface HealthIndicator {
  id: string;
  name: string;
  value: number;
  unit: string;
  baseline: number;
  min: number;
  max: number;
  status: HealthStatus;
  trend: number; // percentage change from baseline
  category: AnatomyRegion;
  lastUpdated: string;
}

export type AnatomyRegion =
  | 'cranium-eyes'
  | 'heart-vessels'
  | 'lungs'
  | 'spine-musculoskeletal'
  | 'gut-metabolic'
  | 'neuro-sleep'
  | 'skin-immune';

export interface AnatomyRegionData {
  id: AnatomyRegion;
  name: string;
  description: string;
  icon: string;
  organs: string[];
  hazards: SpaceflightHazard[];
  biomarkers: string[];
  measurements: string[];
  status: HealthStatus;
  indicators: HealthIndicator[];
  nextAssessment: string;
  examInstructions: string[];
}

export type SpaceflightHazard =
  | 'gravity-fields'
  | 'space-radiation'
  | 'hostile-environments'
  | 'isolation-confinement'
  | 'distance-from-earth';

export interface HazardData {
  id: SpaceflightHazard;
  name: string;
  icon: string;
  description: string;
  risks: HazardRisk[];
  indicators: string[];
  status: HealthStatus;
  assessments: string[];
  preventiveMeasures: string[];
  interactions: SpaceflightHazard[];
}

export interface HazardRisk {
  name: string;
  description: string;
  severity: HealthStatus;
}

export interface DiagnosticInput {
  id: string;
  category: 'camera' | 'manual' | 'wearable' | 'other';
  name: string;
  value: number | string;
  unit: string;
  timestamp: string;
  status?: HealthStatus;
}

export interface DiagnosticResult {
  id: string;
  timestamp: string;
  inputs: DiagnosticInput[];
  status: HealthStatus;
  findings: DiagnosticFinding[];
  recommendations: string[];
  escalationRequired: boolean;
  escalationReason?: string;
}

export interface DiagnosticFinding {
  indicator: string;
  value: number | string;
  baseline: number | string;
  status: HealthStatus;
  explanation: string;
  delta?: number;
}

export interface DiagnosticRule {
  id: string;
  indicatorId: string;
  greenRange: [number, number];
  amberRange: [number, number];
  redThreshold: number;
  direction: 'above' | 'below' | 'both';
  explanation: string;
  action: string;
  escalation: string;
}

export interface WellnessTask {
  id: string;
  name: string;
  category: 'exercise' | 'nutrition' | 'sleep' | 'mental' | 'medical';
  description: string;
  xpReward: number;
  completed: boolean;
  completedDate?: string;
  recurring: boolean;
  icon: string;
}

export interface NASAResearch {
  id: string;
  name: string;
  category: 'artemis-ii' | 'leo' | 'past-hrp';
  description: string;
  healthlintRelevance: string;
  url?: string;
  relatedHazards: SpaceflightHazard[];
  relatedRegions: AnatomyRegion[];
}

export interface MissionEnvironmentData {
  id: MissionEnvironment;
  name: string;
  icon: string;
  description: string;
  primaryHazards: SpaceflightHazard[];
  gravityLevel: string;
  communicationDelay: string;
  medicalCapability: string;
  activeMonitoring: string[];
}

export interface HealthTrendPoint {
  date: string;
  value: number;
  baseline: number;
  status: HealthStatus;
}

export interface Alert {
  id: string;
  timestamp: string;
  type: 'diagnostic' | 'hazard' | 'system' | 'wellness';
  severity: HealthStatus;
  title: string;
  message: string;
  acknowledged: boolean;
  source: string;
}

export interface CountermeasureProtocol {
  id: string;
  name: string;
  category: string;
  hazards: SpaceflightHazard[];
  description: string;
  steps: string[];
  duration: string;
  frequency: string;
  nasaSource: string;
}
