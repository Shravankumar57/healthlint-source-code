import React, { useState } from 'react';
import {
  FileText,
  ExternalLink,
  BookOpen,
  Search,
  Filter,
  Layers,
  ChevronRight,
  Shield,
  Activity,
} from 'lucide-react';
import { nasaResearch } from '../../data/healthData';

export const NASAResearchBank: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'artemis-ii' | 'leo' | 'past-hrp'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredResearch = nasaResearch.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.healthlintRelevance.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = [
    { id: 'all', label: 'All NASA Investigations', count: nasaResearch.length },
    {
      id: 'artemis-ii',
      label: 'Artemis II Deep-Space Suite',
      count: nasaResearch.filter((r) => r.category === 'artemis-ii').length,
    },
    {
      id: 'leo',
      label: 'LEO Neuro-Ocular & Multi-System',
      count: nasaResearch.filter((r) => r.category === 'leo').length,
    },
    {
      id: 'past-hrp',
      label: 'Past HRP Archives & Telemedicine',
      count: nasaResearch.filter((r) => r.category === 'past-hrp').length,
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in font-mono">
      {/* Header */}
      <div className="glass-card p-6 border-cyan-500/30">
        <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1">
          <BookOpen className="w-4 h-4" />
          <span>Scientific Grounding & Literature Integration</span>
        </div>
        <h2 className="text-xl font-bold text-white">
          NASA Human Research Program (HRP) Knowledge Bank
        </h2>
        <p className="text-xs text-gray-400 mt-1">
          Every threshold, exam prompt, and countermeasure in HealthLint is grounded in active Artemis II deep-space experiments, ISS LEO investigations, and NASA HRP archives
        </p>

        {/* Search & Filter Bar */}
        <div className="mt-6 flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search studies by title, physiological mechanism, or HealthLint feature..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-gray-200 placeholder-gray-500 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="flex flex-wrap gap-1.5">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id as any)}
                className={`px-3 py-1.5 rounded-xl text-xs transition-all flex items-center gap-1.5 ${
                  selectedCategory === c.id
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50'
                    : 'bg-slate-900/60 text-gray-400 hover:text-white border border-slate-800'
                }`}
              >
                <span>{c.label}</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-800 text-gray-300 font-bold">
                  {c.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Studies Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredResearch.map((item) => (
          <div
            key={item.id}
            className="glass-card p-5 border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-2">
                <span
                  className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${
                    item.category === 'artemis-ii'
                      ? 'bg-indigo-950/60 text-indigo-300 border-indigo-500/30'
                      : item.category === 'leo'
                      ? 'bg-cyan-950/60 text-cyan-300 border-cyan-500/30'
                      : 'bg-emerald-950/60 text-emerald-300 border-emerald-500/30'
                  }`}
                >
                  {item.category === 'artemis-ii'
                    ? 'Artemis II Deep Space'
                    : item.category === 'leo'
                    ? 'LEO ISS Investigation'
                    : 'NASA HRP Core Archive'}
                </span>

                {item.url && (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-cyan-400 text-xs flex items-center gap-1 shrink-0"
                    title="Open official NASA investigation source"
                  >
                    <span className="text-[10px]">NASA Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>

              <h3 className="text-sm font-bold text-white mb-2">{item.name}</h3>
              <p className="text-xs text-gray-300 leading-relaxed font-sans mb-3">
                {item.description}
              </p>
            </div>

            {/* HealthLint Core Relevance Callout */}
            <div className="p-3 rounded-xl bg-cyan-950/30 border border-cyan-500/20 text-xs space-y-1">
              <div className="flex items-center gap-1.5 text-cyan-400 text-[11px] font-bold uppercase tracking-wider">
                <Activity className="w-3.5 h-3.5 text-cyan-400" />
                <span>How this drives HealthLint Core Logic:</span>
              </div>
              <p className="text-cyan-100/90 text-[11px] leading-relaxed font-sans">
                {item.healthlintRelevance}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
