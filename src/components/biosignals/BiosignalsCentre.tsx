import React, { useState, useEffect } from 'react';
import {
  Activity,
  Radio,
  Wifi,
  HardDrive,
  ShieldCheck,
  Zap,
  RefreshCw,
  Heart,
  Wind,
  Thermometer,
} from 'lucide-react';
import { useHealthStore } from '../../store/useHealthStore';
import { StatusBadge } from '../ui/StatusBadge';
import { formatValue } from '../../utils/statusColors';

export const BiosignalsCentre: React.FC = () => {
  const { currentEnvironment, healthIndicators } = useHealthStore();

  // Simulated live waveform tick
  const [ecgTicks, setEcgTicks] = useState<number[]>([]);
  const [pulseRate, setPulseRate] = useState<number>(68);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulseRate((prev) => Math.max(64, Math.min(74, prev + (Math.random() - 0.5) * 2)));
      setEcgTicks((prev) => {
        const nextVal = Math.sin(Date.now() / 200) * 20 + (Math.random() - 0.5) * 10;
        const updated = [...prev.slice(-40), nextVal];
        return updated;
      });
    }, 250);
    return () => clearInterval(interval);
  }, []);

  const streamSources = [
    {
      name: 'Tempus Pro Tactical Vitals Stream',
      protocol: 'BT-LE 5.2 / IEEE 11073 Point-of-Care Medical Format',
      status: 'green' as const,
      latency: '12 ms',
      packetLoss: '0.00%',
      metrics: '12-Lead ECG, NIBP, SpO2, EtCO2, Temp',
    },
    {
      name: 'Spacesuit EVA Telemetry Stream',
      protocol: 'CAN-Bus / Mil-Std-1553 Hab Link',
      status: 'green' as const,
      latency: '24 ms',
      packetLoss: '0.02%',
      metrics: 'Suit Pressure (4.3 psi), PCO2, Glove Joint Torque',
    },
    {
      name: 'ARCHeR Actigraphy Wristband & Sleep Sensor',
      protocol: 'Encrypted Flash Micro-Sync',
      status: 'red' as const,
      latency: 'Batch (Every 4h)',
      packetLoss: '0.00%',
      metrics: '3-Axis Accelerometry, Photoplethysmography, PVT Reaction',
    },
    {
      name: 'Butterfly iQ+ Handheld Ultrasound Feeds',
      protocol: 'USB-C Ultrasound Frame Stream (DICOM v3.0)',
      status: 'amber' as const,
      latency: '8 ms',
      packetLoss: '0.00%',
      metrics: 'Optic Nerve B-Scan, Jugular Flow Doppler, Lumbar Spine',
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in font-mono">
      {/* Telemetry Ingestion Architecture Header */}
      <div className="glass-card p-6 border-cyan-500/30">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-4">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Radio className="w-4 h-4 animate-pulse" />
              <span>Multi-Modal Biosignal Ingestion Pipeline</span>
            </div>
            <h2 className="text-xl font-bold text-white">
              Autonomous Telemetry Routing & Data Gateway
            </h2>
            <p className="text-xs text-gray-400 mt-1">
              Unifies commercial spaceflight medical kits with suit telemetry and onboard point-of-care diagnostics
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Offline Radiation-Hardened Buffer Active</span>
            </div>
          </div>
        </div>

        {/* Live ECG & Hemodynamic Monitor Screen */}
        <div className="p-5 rounded-xl bg-slate-950 border border-cyan-500/30 relative overflow-hidden shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3 text-xs">
            <div className="flex items-center gap-2 text-cyan-300">
              <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span className="font-bold">LIVE TELEMETRY TRACE • LEAD II ECG</span>
            </div>
            <div className="flex items-center gap-4 text-gray-400 text-[11px]">
              <span>SWEEP: 25 mm/s</span>
              <span>FILTER: 0.05-150 Hz</span>
              <span className="text-emerald-400 font-bold">HR: {Math.round(pulseRate)} BPM</span>
            </div>
          </div>

          {/* Simulated Waveform Canvas */}
          <div className="h-28 w-full flex items-center justify-around gap-1 relative px-2">
            <div className="absolute inset-0 grid grid-cols-12 grid-rows-4 pointer-events-none opacity-20">
              {Array.from({ length: 48 }).map((_, i) => (
                <div key={i} className="border border-emerald-500/30" />
              ))}
            </div>

            {/* Dynamic Waveform SVG */}
            <svg className="w-full h-full relative z-10" viewBox="0 0 600 100" preserveAspectRatio="none">
              <polyline
                fill="none"
                stroke="#00E676"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                points="
                  0,50 30,50 45,48 50,50 60,50 65,40 70,85 78,15 85,60 90,50 110,50 125,45 135,50 170,50
                  200,50 215,48 220,50 230,50 235,40 240,85 248,15 255,60 260,50 280,50 295,45 305,50 340,50
                  370,50 385,48 390,50 400,50 405,40 410,85 418,15 425,60 430,50 450,50 465,45 475,50 510,50
                  540,50 555,48 560,50 570,50 575,40 580,85 588,15 595,60 600,50
                "
              />
            </svg>
          </div>

          {/* Quick Real-Time Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-900 mt-2">
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-emerald-400" />
              <div>
                <div className="text-[10px] text-gray-500">PULSE RATE</div>
                <div className="text-sm font-bold text-white">{Math.round(pulseRate)} bpm</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Wind className="w-4 h-4 text-cyan-400" />
              <div>
                <div className="text-[10px] text-gray-500">SpO2 SATURATION</div>
                <div className="text-sm font-bold text-emerald-400">98.2%</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Thermometer className="w-4 h-4 text-amber-400" />
              <div>
                <div className="text-[10px] text-gray-500">CORE TEMP</div>
                <div className="text-sm font-bold text-white">36.8°C</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-cyan-400" />
              <div>
                <div className="text-[10px] text-gray-500">CABIN PCO2</div>
                <div className="text-sm font-bold text-cyan-300">2.8 mmHg</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Connected Stream Sources Table */}
      <div className="glass-card p-6 border-cyan-500/30">
        <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-4 flex items-center gap-2">
          <HardDrive className="w-4 h-4 text-cyan-400" />
          <span>Active Ingestion Ports & Hardware Interfaces</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-gray-400 text-[11px]">
                <th className="pb-3 font-semibold">HARDWARE SOURCE</th>
                <th className="pb-3 font-semibold">TRANSPORT / PROTOCOL</th>
                <th className="pb-3 font-semibold">TELEMETRY INGESTED</th>
                <th className="pb-3 font-semibold">LATENCY</th>
                <th className="pb-3 font-semibold">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {streamSources.map((s, idx) => (
                <tr key={idx} className="hover:bg-slate-900/40 transition-colors">
                  <td className="py-3 font-semibold text-white">{s.name}</td>
                  <td className="py-3 text-gray-400 text-[11px]">{s.protocol}</td>
                  <td className="py-3 text-cyan-300 text-[11px]">{s.metrics}</td>
                  <td className="py-3 text-gray-300">{s.latency}</td>
                  <td className="py-3">
                    <StatusBadge status={s.status} size="sm" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
