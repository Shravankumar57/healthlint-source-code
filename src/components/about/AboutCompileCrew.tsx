import React from 'react';
import {
  Users,
  Award,
  Globe,
  Shield,
  HeartHandshake,
  Compass,
  FileCheck,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';

export const AboutCompileCrew: React.FC = () => {
  const teamMembers = [
    {
      name: 'Pavan R Mudigoudra',
      role: 'Lead Systems & NASA Data Architect',
      avatar: '👨‍🚀',
      contributions: [
        'Architected the NASA HRP multi-modal telemetry ingestion pipeline.',
        'Engineered the multi-environment state engine (Spacecraft, Space Station, Rover, Planetary Base, Earth Remote).',
        'Built the Tempus Pro and NASA Standard Measures telemetry routing layer.',
        'Structured the offline data persistence engine for deep-space latency resilience.',
      ],
    },
    {
      name: 'Shravankumar K Bandi',
      role: 'Clinical Decision & Biomarker Engine Lead',
      avatar: '👨‍⚕️',
      contributions: [
        'Developed the 5-Hazard diagnostic inference rule matrix grounded in NASA flight thresholds.',
        'Created multi-modal biomarker algorithms for optic nerve ultrasound, blood glucose, SpO2, and salivary cortisol.',
        'Implemented the dual-mode Flight Surgeon escalation vs. crew autonomous self-care decision logic.',
        'Ensured clinical safety distinctions between prototype rules and licensed medical judgment.',
      ],
    },
    {
      name: 'Mithil A',
      role: 'Interactive UX, Anatomy & Visualization Lead',
      avatar: '👨‍🎨',
      contributions: [
        'Designed the interactive 3D human anatomy WebGL viewport and schematic 2D body map.',
        'Created color-coded Green / Amber / Red clinical triage cards and longitudinal time-series charts.',
        'Crafted the gamified HealthLint XP and crew streak behavioral countermeasure engine.',
        'Authored plain-language, non-physician guided exam tutorials for emergency autonomous care.',
      ],
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in font-mono">
      {/* Top Project Mission Banner */}
      <div className="glass-card p-6 border-cyan-500/30">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-4">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Users className="w-4 h-4" />
              <span>NASA Space Apps Challenge 2026 • Team CompileCrew</span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              HealthLint: Autonomous Crew Health Monitoring & Triage
            </h1>
            <p className="text-xs text-gray-300 font-sans max-w-3xl mt-1 leading-relaxed">
              HealthLint is an interactive anatomical diagnostic and countermeasure platform empowering astronauts across spacecraft, orbital stations, surface rovers, and planetary bases to self-assess physiological and behavioral health using multi-modal biosignals and NASA Human Research Program (HRP) clinical baselines.
            </p>
          </div>

          <div className="shrink-0 p-3 rounded-xl bg-slate-900 border border-cyan-500/30 text-center">
            <span className="text-[10px] text-gray-400 uppercase">CHALLENGE TRACK</span>
            <div className="text-xs font-bold text-cyan-300 mt-0.5">
              Health Monitoring Software for Astronauts
            </div>
          </div>
        </div>

        {/* 3 Core Pillars Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs">
            <div className="text-cyan-400 font-bold mb-1">01. Interactive 3D Anatomy</div>
            <p className="text-gray-300 text-[11px] font-sans leading-relaxed">
              Clickable body regions display organ function, live health status, color coding, and non-physician exam tutorials.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs">
            <div className="text-cyan-400 font-bold mb-1">02. Multi-Modal Biosignals</div>
            <p className="text-gray-300 text-[11px] font-sans leading-relaxed">
              Captures ultrasound images, fingerstick glucose, saliva cortisol, and live EVA suit telemetry.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs">
            <div className="text-cyan-400 font-bold mb-1">03. 5-Hazard & Gamified Engine</div>
            <p className="text-gray-300 text-[11px] font-sans leading-relaxed">
              Plots longitudinal indicator trends and awards crew XP streaks for completing prescribed countermeasures.
            </p>
          </div>
        </div>
      </div>

      {/* Team Members Roster */}
      <div>
        <h2 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-3 flex items-center gap-2">
          <Award className="w-4 h-4 text-cyan-400" />
          <span>Team CompileCrew Engineering Roles (Slide 07 of 07)</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {teamMembers.map((member, idx) => (
            <div
              key={idx}
              className="glass-card p-5 border-slate-800 hover:border-cyan-500/40 transition-all space-y-4"
            >
              <div className="flex items-center gap-3">
                <div className="text-3xl p-2 bg-slate-900 rounded-xl border border-slate-800">
                  {member.avatar}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">{member.name}</h3>
                  <p className="text-xs text-cyan-300 font-semibold">{member.role}</p>
                </div>
              </div>

              <div className="space-y-2 border-t border-slate-800/80 pt-3">
                <div className="text-[10px] text-gray-500 uppercase font-bold">
                  Core Technical Contributions:
                </div>
                <ul className="space-y-1.5 text-xs text-gray-300 font-sans">
                  {member.contributions.map((c, cIdx) => (
                    <li key={cIdx} className="flex items-start gap-2 leading-relaxed">
                      <span className="text-cyan-400 font-bold shrink-0">▸</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Complete NASA HRP Reference Architecture Box (from Slide 7) */}
      <div className="glass-card p-6 border-cyan-500/30 space-y-4">
        <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
          <Shield className="w-4 h-4 text-cyan-400" />
          <span>Complete NASA HRP Reference Architecture (All 20+ Studies Grounded)</span>
        </h3>

        <div className="space-y-3 text-xs leading-relaxed font-sans text-gray-300">
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <strong className="text-white font-mono uppercase text-xs">Five Spaceflight Hazards: </strong>
            <span className="text-cyan-300 font-mono">
              Space Radiation | Isolation & Confinement | Distance from Earth | Gravity Fields | Hostile/Closed Environments.
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <strong className="text-white font-mono uppercase text-xs">Physiological & Behavioral Risks: </strong>
            <span className="text-gray-200">
              Altered Immunity, Sensorimotor/Vestibular, Cardiovascular, Decompression Sickness, Host-Microorganism Interactions, Hypoxia, Inadequate Food/Nutrition, Spacewalk Injury, Reduced Fitness, SANS, Bone Changes, Behavioral/Psychiatric, Inadequate Teamwork, Sleep/Schedules, Systems Support, Dynamic Landing Loads, Radiation-Induced Cancers.
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <strong className="text-white font-mono uppercase text-xs">Integrated NASA Investigations: </strong>
            <span className="text-emerald-300 font-mono text-[11px]">
              ARCHeR, Immune Biomarkers, Artemis II Standard Measures, B-Complex, Brain Fluid Pressure, CIPHER, Simulating Manual Piloting, Spacecraft Occupant Protection, Spinal Fluid Biomarkers, Standard Measures, Thigh Cuff, Venous Haemostasis, Zero T2, Altered Immunity, Food Acceptability, Food Physiology, Omics Archive, Space Gardening, Spinal Health, Tempus Pro, Veggie Monitoring.
            </span>
          </div>
        </div>
      </div>

      {/* Terrestrial Telemedicine Application (Slide 6) */}
      <div className="glass-card p-6 border-emerald-500/30 space-y-3">
        <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
          <Globe className="w-4 h-4 text-emerald-400" />
          <span>Terrestrial Scaling: Remote & Rural Healthcare on Earth</span>
        </div>
        <h3 className="text-base font-bold text-white">
          Transformative Benefits for Remote Clinics, Polar Stations & Disaster Response
        </h3>
        <p className="text-xs text-gray-300 leading-relaxed font-sans">
          The same constraints governing a Mars exploration base—severe physician shortages, delayed emergency transport, communications blackouts, and reliance on non-physician operators—apply directly to polar research stations, remote indigenous communities, and humanitarian disaster zones on Earth. HealthLint pairs handheld USB ultrasounds, point-of-care fingerstick glucometers, and consumer wearables with guided offline self-triage to democratize clinical diagnostic capability anywhere on Earth.
        </p>
      </div>
    </div>
  );
};
