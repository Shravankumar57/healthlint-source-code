import React, { useState } from 'react';
import { User, Layers, Box, Compass } from 'lucide-react';
import { useHealthStore } from '../store/useHealthStore';
import { anatomyRegions } from '../data/healthData';
import { Anatomy3DCanvas } from '../components/anatomy/Anatomy3DCanvas';
import { AnatomySVG } from '../components/anatomy/AnatomySVG';
import { AnatomyDetailsPanel } from '../components/anatomy/AnatomyDetailsPanel';
import type { AnatomyRegion, HealthStatus } from '../types';

export const AnatomyPage: React.FC = () => {
  const { selectedRegion, selectRegion, healthIndicators, updateIndicator } = useHealthStore();
  const [viewMode, setViewMode] = useState<'3d' | '2d' | 'split'>('3d');

  // Compute status per region based on current store health indicators
  const regionStatuses: Record<AnatomyRegion, HealthStatus> = {
    'cranium-eyes': 'amber',
    'heart-vessels': 'green',
    lungs: 'green',
    'spine-musculoskeletal': 'green',
    'gut-metabolic': 'red',
    'neuro-sleep': 'red',
    'skin-immune': 'green',
  };

  for (const reg of anatomyRegions) {
    const matching = healthIndicators.filter((i) => i.category === reg.id);
    const hasRed = matching.some((i) => i.status === 'red');
    const hasAmber = matching.some((i) => i.status === 'amber');
    regionStatuses[reg.id] = hasRed ? 'red' : hasAmber ? 'amber' : 'green';
  }

  const activeRegionData =
    anatomyRegions.find((r) => r.id === selectedRegion) || anatomyRegions[0];

  return (
    <div className="space-y-6 animate-fade-in font-mono">
      {/* Top Header & View Mode Switcher */}
      <div className="glass-card p-6 border-cyan-500/30">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1">
              <User className="w-4 h-4" />
              <span>Interactive Human Anatomy Interface</span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-white">
              Anatomical Tri-Mesh & Organ System Health
            </h1>
            <p className="text-xs text-gray-400 mt-1">
              Select body regions to inspect physiological adaptations, biomarker telemetry, and guided non-physician exam protocols
            </p>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800">
            <button
              onClick={() => setViewMode('3d')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === '3d'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-sm'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Box className="w-3.5 h-3.5" />
              <span>Interactive 3D</span>
            </button>
            <button
              onClick={() => setViewMode('2d')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === '2d'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-sm'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Schematic 2D</span>
            </button>
            <button
              onClick={() => setViewMode('split')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'split'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-sm'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Split View</span>
            </button>
          </div>
        </div>

        {/* 7 Quick Region Pills */}
        <div className="mt-4 flex flex-wrap gap-2">
          {anatomyRegions.map((r) => {
            const isSelected = selectedRegion === r.id;
            const status = regionStatuses[r.id];
            return (
              <button
                key={r.id}
                onClick={() => selectRegion(r.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all flex items-center gap-2 border ${
                  isSelected
                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200 shadow-md shadow-cyan-500/10'
                    : 'bg-slate-900/50 border-slate-800 text-gray-400 hover:text-gray-200 hover:bg-slate-900'
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    status === 'red'
                      ? 'bg-red-400 shadow-sm shadow-red-500'
                      : status === 'amber'
                      ? 'bg-amber-400 shadow-sm shadow-amber-500'
                      : 'bg-emerald-400'
                  }`}
                />
                <span>{r.name.split(' (')[0]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Grid: Visual Viewer + Detailed Telemetry Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Visual Viewport */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {viewMode === '3d' && (
            <Anatomy3DCanvas
              selectedRegion={selectedRegion}
              onSelectRegion={selectRegion}
              regionStatuses={regionStatuses}
            />
          )}

          {viewMode === '2d' && (
            <AnatomySVG
              selectedRegion={selectedRegion}
              onSelectRegion={selectRegion}
              regionStatuses={regionStatuses}
            />
          )}

          {viewMode === 'split' && (
            <div className="space-y-4">
              <Anatomy3DCanvas
                selectedRegion={selectedRegion}
                onSelectRegion={selectRegion}
                regionStatuses={regionStatuses}
              />
              <AnatomySVG
                selectedRegion={selectedRegion}
                onSelectRegion={selectRegion}
                regionStatuses={regionStatuses}
              />
            </div>
          )}
        </div>

        {/* Right Column: Detailed Clinical Telemetry Panel */}
        <div className="lg:col-span-7">
          <AnatomyDetailsPanel
            region={activeRegionData}
            onUpdateSampleValue={(indId, val) => updateIndicator(indId, val)}
          />
        </div>
      </div>
    </div>
  );
};
