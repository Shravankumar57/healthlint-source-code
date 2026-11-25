import React from 'react';
import type { AnatomyRegion, HealthStatus } from '../../types';
import { getStatusColor } from '../../utils/statusColors';

interface AnatomySVGProps {
  selectedRegion: AnatomyRegion | null;
  onSelectRegion: (region: AnatomyRegion) => void;
  regionStatuses: Record<AnatomyRegion, HealthStatus>;
}

export const AnatomySVG: React.FC<AnatomySVGProps> = ({
  selectedRegion,
  onSelectRegion,
  regionStatuses,
}) => {
  return (
    <div className="w-full flex items-center justify-center p-4 bg-slate-950/60 rounded-xl border border-cyan-500/20 relative">
      <div className="absolute top-3 left-3 font-mono text-[11px] text-cyan-400 bg-slate-950/80 px-2.5 py-1 rounded border border-cyan-500/20">
        <span>SCHEMATIC 2D ANATOMICAL MAP</span>
      </div>

      <svg
        viewBox="0 0 340 540"
        className="w-full max-w-[320px] h-auto drop-shadow-[0_0_20px_rgba(34,211,238,0.15)]"
      >
        {/* Holographic grid and concentric scan circles */}
        <circle cx="170" cy="240" r="180" fill="none" stroke="rgba(34,211,238,0.06)" strokeDasharray="4 4" />
        <circle cx="170" cy="240" r="130" fill="none" stroke="rgba(34,211,238,0.08)" strokeDasharray="3 3" />
        <line x1="170" y1="10" x2="170" y2="520" stroke="rgba(34,211,238,0.1)" strokeDasharray="2 4" />

        {/* Human Silhouette Outline */}
        <path
          d="M 170 30 
             C 152 30, 140 45, 140 68 
             C 140 88, 150 102, 160 108 
             L 155 125 
             L 115 140 
             C 105 144, 95 160, 92 185 
             L 75 290 
             C 72 305, 80 315, 88 312 
             C 96 310, 102 298, 106 280 
             L 120 205 
             L 122 305 
             L 125 435 
             C 126 470, 132 505, 138 510 
             C 144 515, 152 505, 152 485 
             L 156 350 
             L 170 340 
             L 184 350 
             L 188 485 
             C 188 505, 196 515, 202 510 
             C 208 505, 214 470, 215 435 
             L 218 305 
             L 220 205 
             L 234 280 
             C 238 298, 244 310, 252 312 
             C 260 315, 268 305, 265 290 
             L 248 185 
             C 245 160, 235 144, 225 140 
             L 185 125 
             L 180 108 
             C 190 102, 200 88, 200 68 
             C 200 45, 188 30, 170 30 Z"
          fill="rgba(15, 23, 42, 0.7)"
          stroke="rgba(34, 211, 238, 0.35)"
          strokeWidth="1.5"
        />

        {/* 1. Cranium & Eyes */}
        <g
          className="cursor-pointer transition-all hover:scale-105"
          onClick={() => onSelectRegion('cranium-eyes')}
        >
          <circle
            cx="170"
            cy="68"
            r="28"
            fill={
              selectedRegion === 'cranium-eyes'
                ? 'rgba(34,211,238,0.3)'
                : 'rgba(34,211,238,0.1)'
            }
            stroke={getStatusColor(regionStatuses['cranium-eyes'])}
            strokeWidth={selectedRegion === 'cranium-eyes' ? '3' : '1.5'}
          />
          {/* Eyes schematic */}
          <circle cx="160" cy="62" r="3.5" fill="#38bdf8" />
          <circle cx="180" cy="62" r="3.5" fill="#38bdf8" />
          {/* Optic Sheath indicator */}
          <line x1="160" y1="62" x2="152" y2="78" stroke="#f59e0b" strokeWidth="1.5" />
          <line x1="180" y1="62" x2="188" y2="78" stroke="#f59e0b" strokeWidth="1.5" />
          <text x="170" y="85" textAnchor="middle" fontSize="9" fill="#e2e8f0" fontFamily="monospace">
            CRANIUM / SANS
          </text>
        </g>

        {/* 2. Heart & Vessels */}
        <g
          className="cursor-pointer transition-all"
          onClick={() => onSelectRegion('heart-vessels')}
        >
          <circle
            cx="155"
            cy="165"
            r="18"
            fill={
              selectedRegion === 'heart-vessels'
                ? 'rgba(34,211,238,0.35)'
                : 'rgba(34,211,238,0.1)'
            }
            stroke={getStatusColor(regionStatuses['heart-vessels'])}
            strokeWidth={selectedRegion === 'heart-vessels' ? '3' : '1.5'}
          />
          {/* Vascular lines */}
          <path d="M 155 147 L 155 130" stroke="#00E676" strokeWidth="2" />
          <path d="M 155 183 L 155 210" stroke="#00E676" strokeWidth="1.5" />
          <text x="135" y="170" textAnchor="end" fontSize="9" fill="#00E676" fontFamily="monospace">
            HEART
          </text>
        </g>

        {/* 3. Lungs */}
        <g
          className="cursor-pointer transition-all"
          onClick={() => onSelectRegion('lungs')}
        >
          <ellipse
            cx="186"
            cy="168"
            rx="14"
            ry="20"
            fill={
              selectedRegion === 'lungs'
                ? 'rgba(34,211,238,0.35)'
                : 'rgba(34,211,238,0.1)'
            }
            stroke={getStatusColor(regionStatuses['lungs'])}
            strokeWidth={selectedRegion === 'lungs' ? '3' : '1.5'}
          />
          <text x="206" y="172" textAnchor="start" fontSize="9" fill="#00E676" fontFamily="monospace">
            LUNGS / SpO2
          </text>
        </g>

        {/* 4. Spine & Musculoskeletal */}
        <g
          className="cursor-pointer transition-all"
          onClick={() => onSelectRegion('spine-musculoskeletal')}
        >
          <rect
            x="166"
            y="120"
            width="8"
            height="145"
            rx="4"
            fill={
              selectedRegion === 'spine-musculoskeletal'
                ? 'rgba(34,211,238,0.4)'
                : 'rgba(34,211,238,0.15)'
            }
            stroke={getStatusColor(regionStatuses['spine-musculoskeletal'])}
            strokeWidth={selectedRegion === 'spine-musculoskeletal' ? '2.5' : '1'}
          />
          {/* Vertebrae segments */}
          {[130, 145, 160, 175, 190, 205, 220, 235, 250].map((y) => (
            <line key={y} x1="165" y1={y} x2="175" y2={y} stroke="#38bdf8" strokeWidth="1" />
          ))}
          <text x="170" y="278" textAnchor="middle" fontSize="8" fill="#38bdf8" fontFamily="monospace">
            SPINE (L1-L5)
          </text>
        </g>

        {/* 5. Gut & Metabolic */}
        <g
          className="cursor-pointer transition-all"
          onClick={() => onSelectRegion('gut-metabolic')}
        >
          <circle
            cx="170"
            cy="235"
            r="20"
            fill={
              selectedRegion === 'gut-metabolic'
                ? 'rgba(255,23,68,0.35)'
                : 'rgba(255,23,68,0.15)'
            }
            stroke={getStatusColor(regionStatuses['gut-metabolic'])}
            strokeWidth={selectedRegion === 'gut-metabolic' ? '3' : '1.5'}
          />
          <text x="170" y="238" textAnchor="middle" fontSize="8" fill="#ff1744" fontFamily="monospace" fontWeight="bold">
            GLUCOSE: 142
          </text>
        </g>

        {/* 6. Neuro & Sleep */}
        <g
          className="cursor-pointer transition-all"
          onClick={() => onSelectRegion('neuro-sleep')}
        >
          <path
            d="M 152 48 Q 170 38 188 48 Q 188 64 170 64 Q 152 64 152 48 Z"
            fill={
              selectedRegion === 'neuro-sleep'
                ? 'rgba(255,23,68,0.35)'
                : 'rgba(255,23,68,0.15)'
            }
            stroke={getStatusColor(regionStatuses['neuro-sleep'])}
            strokeWidth={selectedRegion === 'neuro-sleep' ? '2.5' : '1'}
          />
          <text x="110" y="52" textAnchor="end" fontSize="8" fill="#ff1744" fontFamily="monospace">
            SLEEP 5.2h
          </text>
        </g>

        {/* 7. Skin & Immune */}
        <g
          className="cursor-pointer transition-all"
          onClick={() => onSelectRegion('skin-immune')}
        >
          <ellipse
            cx="245"
            cy="240"
            rx="12"
            ry="30"
            fill={
              selectedRegion === 'skin-immune'
                ? 'rgba(0,230,118,0.35)'
                : 'rgba(0,230,118,0.12)'
            }
            stroke={getStatusColor(regionStatuses['skin-immune'])}
            strokeWidth={selectedRegion === 'skin-immune' ? '2.5' : '1'}
          />
          <text x="262" y="244" textAnchor="start" fontSize="8" fill="#00e676" fontFamily="monospace">
            SKIN/IMMUNE
          </text>
        </g>
      </svg>
    </div>
  );
};
