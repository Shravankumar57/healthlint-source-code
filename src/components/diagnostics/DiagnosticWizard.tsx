import React, { useState } from 'react';
import {
  Camera,
  Upload,
  Cpu,
  Activity,
  Droplets,
  Heart,
  Thermometer,
  Moon,
  AlertTriangle,
  Send,
  Eye,
  CheckCircle2,
} from 'lucide-react';
import type { DiagnosticInput, DiagnosticResult } from '../../types';
import { useHealthStore } from '../../store/useHealthStore';
import { StatusBadge } from '../ui/StatusBadge';

interface DiagnosticWizardProps {
  onComplete: (result: DiagnosticResult) => void;
}

export const DiagnosticWizard: React.FC<DiagnosticWizardProps> = ({ onComplete }) => {
  const { submitDiagnostic } = useHealthStore();

  const [activeTab, setActiveTab] = useState<'camera' | 'manual' | 'wearable' | 'other'>('camera');

  // Input states
  const [onsdValue, setOnsdValue] = useState<number>(5.8);
  const [ultrasoundType, setUltrasoundType] = useState<'ocular' | 'spine' | 'skin'>('ocular');
  const [hasUltrasoundFile, setHasUltrasoundFile] = useState<boolean>(true);

  const [glucoseValue, setGlucoseValue] = useState<number>(142);
  const [cortisolValue, setCortisolValue] = useState<number>(28.4);
  const [urineKetones, setUrineKetones] = useState<string>('Negative');
  const [symptoms, setSymptoms] = useState<string>('Mild retro-orbital headache, visual blurring under high cabin PCO2.');

  const [spo2Value, setSpo2Value] = useState<number>(98.2);
  const [heartRateValue, setHeartRateValue] = useState<number>(68);
  const [co2Value, setCo2Value] = useState<number>(2.8);
  const [tempValue, setTempValue] = useState<number>(36.8);
  const [sleepValue, setSleepValue] = useState<number>(5.2);

  const [vestibularScore, setVestibularScore] = useState<number>(84);
  const [exerciseLoad, setExerciseLoad] = useState<number>(1420);

  const handleRunEvaluation = () => {
    const inputs: DiagnosticInput[] = [
      {
        id: 'optic-nerve-sheath',
        category: 'camera',
        name: 'Optic Nerve Sheath Diameter (ONSD)',
        value: onsdValue,
        unit: 'mm',
        timestamp: new Date().toISOString(),
      },
      {
        id: 'fasting-glucose',
        category: 'manual',
        name: 'Fasting Blood Glucose',
        value: glucoseValue,
        unit: 'mg/dL',
        timestamp: new Date().toISOString(),
      },
      {
        id: 'salivary-cortisol',
        category: 'manual',
        name: 'Salivary Cortisol',
        value: cortisolValue,
        unit: 'nmol/L',
        timestamp: new Date().toISOString(),
      },
      {
        id: 'spo2',
        category: 'wearable',
        name: 'Suit Blood Oxygen Saturation (SpO2)',
        value: spo2Value,
        unit: '%',
        timestamp: new Date().toISOString(),
      },
      {
        id: 'heart-rate',
        category: 'wearable',
        name: 'Resting Heart Rate',
        value: heartRateValue,
        unit: 'bpm',
        timestamp: new Date().toISOString(),
      },
      {
        id: 'co2-partial',
        category: 'wearable',
        name: 'Ambient CO2 Partial Pressure',
        value: co2Value,
        unit: 'mmHg',
        timestamp: new Date().toISOString(),
      },
      {
        id: 'sleep-duration',
        category: 'wearable',
        name: 'Sleep Duration (Last Cycle)',
        value: sleepValue,
        unit: 'hrs',
        timestamp: new Date().toISOString(),
      },
      {
        id: 'vestibular-score',
        category: 'other',
        name: 'Vestibular Sensorimotor Score',
        value: vestibularScore,
        unit: '/100',
        timestamp: new Date().toISOString(),
      },
      {
        id: 'resistive-load',
        category: 'other',
        name: 'Daily Zero T2 Resistance Load',
        value: exerciseLoad,
        unit: 'kJ',
        timestamp: new Date().toISOString(),
      },
    ];

    const result = submitDiagnostic(inputs);
    onComplete(result);
  };

  // Preset scenarios to demonstrate Slide 5 demo outputs effortlessly
  const loadSlide5Scenario = (preset: 'sans' | 'glucose' | 'prebreathe' | 'spine' | 'skin') => {
    if (preset === 'sans') {
      setOnsdValue(5.8);
      setGlucoseValue(95);
      setSleepValue(7.2);
      setActiveTab('camera');
    } else if (preset === 'glucose') {
      setOnsdValue(4.9);
      setGlucoseValue(142);
      setCortisolValue(28.4);
      setSleepValue(5.2);
      setActiveTab('manual');
    } else if (preset === 'prebreathe') {
      setSpo2Value(98.0);
      setCo2Value(2.5);
      setActiveTab('wearable');
    } else if (preset === 'spine') {
      setExerciseLoad(1600);
      setActiveTab('other');
    } else if (preset === 'skin') {
      setActiveTab('camera');
      setUltrasoundType('skin');
    }
  };

  return (
    <div className="glass-card p-6 border-cyan-500/30 space-y-6">
      {/* Header & Quick Scenarios */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-lg font-bold font-mono text-white flex items-center gap-2">
            <Cpu className="w-5 h-5 text-cyan-400" />
            <span>Autonomous Multi-Modal Diagnostic Ingestion</span>
          </h2>
          <p className="text-xs text-gray-400 font-mono mt-0.5">
            Ingests camera ultrasound, fingerstick glucose, saliva cortisol, and EVA suit telemetry
          </p>
        </div>

        {/* Quick Scenario Buttons from Slide 5 */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[10px] text-gray-500 font-mono uppercase mr-1">NASA Deck Scenarios:</span>
          <button
            onClick={() => loadSlide5Scenario('sans')}
            className="px-2 py-1 rounded bg-amber-950/40 hover:bg-amber-900/50 border border-amber-500/30 text-amber-300 font-mono text-[10px] transition-all"
          >
            SANS (ONSD 5.8mm)
          </button>
          <button
            onClick={() => loadSlide5Scenario('glucose')}
            className="px-2 py-1 rounded bg-red-950/40 hover:bg-red-900/50 border border-red-500/30 text-red-300 font-mono text-[10px] transition-all"
          >
            Glycemia (142 mg/dL)
          </button>
          <button
            onClick={() => loadSlide5Scenario('prebreathe')}
            className="px-2 py-1 rounded bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-500/30 text-emerald-300 font-mono text-[10px] transition-all"
          >
            Pre-Breathe Nominal
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-800 gap-2">
        <button
          onClick={() => setActiveTab('camera')}
          className={`flex items-center gap-2 px-4 py-2.5 font-mono text-xs font-semibold rounded-t-lg transition-all border-b-2 ${
            activeTab === 'camera'
              ? 'border-cyan-400 text-cyan-300 bg-slate-900/80'
              : 'border-transparent text-gray-400 hover:text-gray-200'
          }`}
        >
          <Camera className="w-4 h-4" />
          <span>A. Camera & Ultrasound</span>
        </button>

        <button
          onClick={() => setActiveTab('manual')}
          className={`flex items-center gap-2 px-4 py-2.5 font-mono text-xs font-semibold rounded-t-lg transition-all border-b-2 ${
            activeTab === 'manual'
              ? 'border-cyan-400 text-cyan-300 bg-slate-900/80'
              : 'border-transparent text-gray-400 hover:text-gray-200'
          }`}
        >
          <Droplets className="w-4 h-4" />
          <span>B. Manual Biomarkers</span>
        </button>

        <button
          onClick={() => setActiveTab('wearable')}
          className={`flex items-center gap-2 px-4 py-2.5 font-mono text-xs font-semibold rounded-t-lg transition-all border-b-2 ${
            activeTab === 'wearable'
              ? 'border-cyan-400 text-cyan-300 bg-slate-900/80'
              : 'border-transparent text-gray-400 hover:text-gray-200'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>C. Wearable & Telemetry</span>
        </button>

        <button
          onClick={() => setActiveTab('other')}
          className={`flex items-center gap-2 px-4 py-2.5 font-mono text-xs font-semibold rounded-t-lg transition-all border-b-2 ${
            activeTab === 'other'
              ? 'border-cyan-400 text-cyan-300 bg-slate-900/80'
              : 'border-transparent text-gray-400 hover:text-gray-200'
          }`}
        >
          <Cpu className="w-4 h-4" />
          <span>D. Sensorimotor & Logs</span>
        </button>
      </div>

      {/* Tab 1: Camera & Ultrasound */}
      {activeTab === 'camera' && (
        <div className="space-y-4 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { id: 'ocular', label: 'Optic Nerve Sheath (SANS)', icon: Eye },
              { id: 'spine', label: 'Spinal Ultrasound', icon: Activity },
              { id: 'skin', label: 'Dermal Photo Scan / Rash', icon: Camera },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setUltrasoundType(tab.id as 'ocular' | 'spine' | 'skin')}
                  className={`p-3 rounded-xl border text-left font-mono transition-all flex items-center gap-3 ${
                    ultrasoundType === tab.id
                      ? 'bg-cyan-950/60 border-cyan-400 text-cyan-300'
                      : 'bg-slate-900/50 border-slate-800 text-gray-400 hover:bg-slate-900'
                  }`}
                >
                  <Icon className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs font-semibold">{tab.label}</span>
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Image Preview / File Dropzone */}
            <div className="border border-dashed border-cyan-500/30 rounded-xl p-5 bg-slate-900/40 flex flex-col items-center justify-center text-center relative overflow-hidden">
              <div className="w-12 h-12 rounded-full bg-cyan-950 flex items-center justify-center mb-2 border border-cyan-500/40 text-cyan-400">
                <Upload className="w-6 h-6" />
              </div>
              <p className="text-xs font-mono text-white font-semibold">
                {ultrasoundType === 'ocular'
                  ? 'Butterfly iQ+ Ocular Ultrasound B-Scan'
                  : ultrasoundType === 'spine'
                  ? 'Lumbar Spine Handheld Ultrasound Feed'
                  : 'Macro Dermal Rash Color Camera Scan'}
              </p>
              <p className="text-[11px] text-gray-400 font-mono mt-1">
                DICOM / PNG / MP4 video stream simulated from Tempus Pro
              </p>
              <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/50 border border-emerald-500/30 text-[10px] font-mono text-emerald-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Probe Calibrated & Coupled (Grade A Acoustic Window)</span>
              </div>
            </div>

            {/* Parameter Measurement Inputs */}
            <div className="space-y-4 p-4 rounded-xl bg-slate-900/50 border border-slate-800">
              {ultrasoundType === 'ocular' && (
                <div>
                  <div className="flex items-center justify-between mb-1 font-mono text-xs">
                    <span className="text-gray-300">Optic Nerve Sheath Diameter (ONSD):</span>
                    <span className="font-bold text-cyan-400 text-sm">{onsdValue} mm</span>
                  </div>
                  <input
                    type="range"
                    min="3.5"
                    max="7.0"
                    step="0.1"
                    value={onsdValue}
                    onChange={(e) => setOnsdValue(parseFloat(e.target.value))}
                    className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                  />
                  <div className="flex justify-between text-[10px] text-gray-500 font-mono mt-1">
                    <span>Baseline (5.0 mm)</span>
                    <span className="text-amber-400 font-semibold">Caution (&gt;5.5 mm)</span>
                    <span className="text-red-400 font-semibold">Critical (&gt;6.5 mm)</span>
                  </div>
                  <div className="mt-3 p-2.5 rounded bg-slate-950 text-[11px] font-mono text-gray-300 border border-slate-800">
                    <span className="text-amber-400 font-bold">Slide 5 Grounding:</span> At 5.8 mm, delta is +16% vs baseline. Deploys Thigh Cuff 4-hr protocol + daily B-Complex.
                  </div>
                </div>
              )}

              {ultrasoundType === 'spine' && (
                <div className="font-mono text-xs space-y-2 text-gray-300">
                  <div className="flex justify-between">
                    <span>Disc Height Expansion:</span>
                    <span className="text-cyan-400 font-bold">4.2 cm</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Bone Mineral Retention:</span>
                    <span className="text-emerald-400 font-bold">95.2%</span>
                  </div>
                  <div className="p-2.5 rounded bg-slate-950 text-[11px] text-gray-300 border border-slate-800 mt-2">
                    <span className="text-emerald-400 font-bold">Nominal Spine:</span> Zero T2 workout maintained; spine cleared for dynamic landing loads (+200 XP streak).
                  </div>
                </div>
              )}

              {ultrasoundType === 'skin' && (
                <div className="font-mono text-xs space-y-2 text-gray-300">
                  <div className="flex justify-between">
                    <span>Dermal Erythema Index:</span>
                    <span className="text-emerald-400 font-bold">Negative</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Veggie Swab Flora:</span>
                    <span className="text-emerald-400 font-bold">Normal Flora</span>
                  </div>
                  <div className="p-2.5 rounded bg-slate-950 text-[11px] text-gray-300 border border-slate-800 mt-2">
                    <span className="text-emerald-400 font-bold">Immune Integrity:</span> No viral rash reactivation. Complete 15-min Space Gardening tending routine.
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Manual Biomarkers */}
      {activeTab === 'manual' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in font-mono text-xs">
          {/* Fasting Blood Glucose */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-gray-300 font-semibold flex items-center gap-1.5">
                <Droplets className="w-4 h-4 text-red-400" />
                <span>Fasting Blood Glucose (mg/dL)</span>
              </label>
              <span className={`font-bold text-sm ${glucoseValue > 140 ? 'text-red-400' : 'text-emerald-400'}`}>
                {glucoseValue} mg/dL
              </span>
            </div>
            <input
              type="range"
              min="60"
              max="220"
              value={glucoseValue}
              onChange={(e) => setGlucoseValue(parseInt(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-red-400"
            />
            <div className="flex justify-between text-[10px] text-gray-500">
              <span>Nominal (70-110)</span>
              <span className="text-amber-400">Caution (111-140)</span>
              <span className="text-red-400 font-bold">Critical (&gt;140)</span>
            </div>
            <div className="p-2 rounded bg-slate-950 text-[11px] text-gray-300 border border-slate-800 mt-2">
              <strong className="text-red-400">Slide 5 Reading:</strong> 142 mg/dL exceeds threshold. Generates priority Tempus Pro burst + Food Physiology meal plan.
            </div>
          </div>

          {/* Salivary Cortisol */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-gray-300 font-semibold flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-amber-400" />
                <span>Salivary Cortisol (nmol/L)</span>
              </label>
              <span className="font-bold text-sm text-amber-400">
                {cortisolValue} nmol/L
              </span>
            </div>
            <input
              type="range"
              min="5"
              max="45"
              step="0.5"
              value={cortisolValue}
              onChange={(e) => setCortisolValue(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
            />
            <div className="flex justify-between text-[10px] text-gray-500">
              <span>Nominal (5-20)</span>
              <span className="text-amber-400">Caution (20-35)</span>
              <span className="text-red-400">Critical (&gt;35)</span>
            </div>
            <div className="p-2 rounded bg-slate-950 text-[11px] text-gray-300 border border-slate-800 mt-2">
              <strong className="text-amber-400">Stress Spike:</strong> +89.3% delta vs mission baseline, reflecting cumulative mission confinement and circadian fatigue.
            </div>
          </div>

          {/* Urine Strip & Symptoms */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2 md:col-span-2">
            <label className="text-gray-300 font-semibold">Astronaut Subjective Observations & Symptoms</label>
            <textarea
              rows={2}
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-gray-200 text-xs font-mono focus:border-cyan-400 focus:outline-none"
            />
          </div>
        </div>
      )}

      {/* Tab 3: Wearable & Suit Telemetry */}
      {activeTab === 'wearable' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-in font-mono text-xs">
          {/* SpO2 */}
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-400 flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-cyan-400" />
                <span>Suit SpO2 (%)</span>
              </span>
              <span className="font-bold text-sm text-emerald-400">{spo2Value}%</span>
            </div>
            <input
              type="range"
              min="85"
              max="100"
              step="0.1"
              value={spo2Value}
              onChange={(e) => setSpo2Value(parseFloat(e.target.value))}
              className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
            <span className="text-[10px] text-gray-500">Nominal 95-100%</span>
          </div>

          {/* Heart Rate */}
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-400 flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-red-400" />
                <span>Heart Rate (bpm)</span>
              </span>
              <span className="font-bold text-sm text-cyan-300">{heartRateValue} bpm</span>
            </div>
            <input
              type="range"
              min="45"
              max="150"
              value={heartRateValue}
              onChange={(e) => setHeartRateValue(parseInt(e.target.value))}
              className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-red-400"
            />
            <span className="text-[10px] text-gray-500">Resting 55-90 bpm</span>
          </div>

          {/* Cabin CO2 */}
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-400 flex items-center gap-1.5">
                <Thermometer className="w-4 h-4 text-amber-400" />
                <span>Ambient PCO2 (mmHg)</span>
              </span>
              <span className="font-bold text-sm text-amber-300">{co2Value} mmHg</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="8.0"
              step="0.1"
              value={co2Value}
              onChange={(e) => setCo2Value(parseFloat(e.target.value))}
              className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
            />
            <span className="text-[10px] text-gray-500">Target &lt; 4.0 mmHg</span>
          </div>

          {/* Sleep Duration */}
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2 md:col-span-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-300 font-semibold flex items-center gap-1.5">
                <Moon className="w-4 h-4 text-indigo-400" />
                <span>ARCHeR Actigraphy Sleep Duration (Last Cycle)</span>
              </span>
              <span className={`font-bold text-sm ${sleepValue < 6 ? 'text-red-400' : 'text-emerald-400'}`}>
                {sleepValue} Hours
              </span>
            </div>
            <input
              type="range"
              min="3.0"
              max="10.0"
              step="0.1"
              value={sleepValue}
              onChange={(e) => setSleepValue(parseFloat(e.target.value))}
              className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-400"
            />
            <div className="flex justify-between text-[10px] text-gray-500">
              <span className="text-red-400 font-semibold">Critical Deficit (&lt; 5.5 hrs)</span>
              <span className="text-amber-400">Caution (5.5 - 6.9 hrs)</span>
              <span className="text-emerald-400">Target (7.0 - 9.0 hrs)</span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Other / Sensorimotor */}
      {activeTab === 'other' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in font-mono text-xs">
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-300 font-semibold">Vestibular Sensorimotor Score</span>
              <span className="text-cyan-400 font-bold">{vestibularScore}/100</span>
            </div>
            <input
              type="range"
              min="40"
              max="100"
              value={vestibularScore}
              onChange={(e) => setVestibularScore(parseInt(e.target.value))}
              className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
            <p className="text-[10px] text-gray-400">
              Tested prior to manual lunar descent / piloting tasks. Minimum safe threshold is 80/100.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-300 font-semibold">Zero T2 Resistive Work Done</span>
              <span className="text-emerald-400 font-bold">{exerciseLoad} kJ</span>
            </div>
            <input
              type="range"
              min="800"
              max="2200"
              step="20"
              value={exerciseLoad}
              onChange={(e) => setExerciseLoad(parseInt(e.target.value))}
              className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
            />
            <p className="text-[10px] text-gray-400">
              Daily target: 1350 kJ. Maintaining this countermeasure clears the spine for dynamic landing loads (+200 XP).
            </p>
          </div>
        </div>
      )}

      {/* Trigger Evaluation Button */}
      <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
        <div className="text-[11px] text-gray-400 font-mono flex items-center gap-1.5">
          <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
          <span>Transparent Rule-Based Inference • Evaluated against NASA HRP Baselines</span>
        </div>

        <button
          onClick={handleRunEvaluation}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-mono font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all hover:scale-[1.02]"
        >
          <Send className="w-4 h-4" />
          <span>Execute Multi-Modal Triage Evaluation</span>
        </button>
      </div>
    </div>
  );
};
