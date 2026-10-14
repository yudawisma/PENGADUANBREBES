import { useState } from 'react';
import Icon from '../../common/Icon';
import { districts, clusters, pins, layerOptions } from '../../../data/petaData';

const viewStyles = ['Vektor', 'Satelit', 'Topografi'];

function SelectedPin({ pin }) {
  return (
    <g transform={`translate(${pin.cx} ${pin.cy})`} className="cursor-pointer">
      <circle className="animate-pulse" r={32} fill={pin.color} fillOpacity="0.15" />
      <circle r={20} fill="none" stroke={pin.color} strokeWidth={2} />
      <path d="M 0,-20 C -12,-20 -20,-12 -20,0 C -20,15 0,30 0,30 C 0,30 20,15 20,0 C 20,-12 12,-20 0,-20 Z" fill={pin.color} filter="url(#softGlow)" />
      <circle cy={-3} r={5} fill="#ffffff" />
      <rect x={-65} y={-57} width={130} height={28} rx={6} fill="#01284b" />
      <text x={0} y={-39} textAnchor="middle" fill="#ffffff" fontFamily="Plus Jakarta Sans" fontSize={11} fontWeight={700}>{pin.shortId} (Aktif)</text>
      <polygon points="-5,-29 5,-29 0,-23" fill="#01284b" />
    </g>
  );
}

export default function MapView({ layer, setLayer, selectedId, onSelectPin, focusId, onFocusCluster }) {
  const [zoom, setZoom] = useState(1);
  const [viewStyle, setViewStyle] = useState('Vektor'); // TODO: ganti tile layer saat memakai peta sungguhan
  const show = (l) => layer === 'semua' || layer === l;

  return (
    <div className="relative w-full rounded-2xl bg-surface-container-lowest shadow-sm overflow-hidden" style={{ height: 680 }}>
      <div className="absolute inset-0 transition-transform duration-300 origin-center" style={{ transform: `scale(${zoom})` }}>
        <svg className="absolute inset-0 w-full h-full select-none" fill="none" viewBox="0 0 950 680" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="seaGradient" x1={0} x2={0} y1={0} y2={1}>
              <stop offset="0%" stopColor="#d9ebff" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#eff6ff" stopOpacity="0.2" />
            </linearGradient>
            <radialGradient cx="0.48" cy="0.27" id="heatBulakamba" r="0.16"><stop offset="0%" stopColor="#ba1a1a" stopOpacity="0.25" /><stop offset="100%" stopColor="#ba1a1a" stopOpacity={0} /></radialGradient>
            <radialGradient cx="0.59" cy="0.29" id="heatPemali" r="0.14"><stop offset="0%" stopColor="#ba1a1a" stopOpacity="0.2" /><stop offset="100%" stopColor="#ba1a1a" stopOpacity={0} /></radialGradient>
            <radialGradient cx="0.52" cy="0.48" id="heatLarangan" r="0.18"><stop offset="0%" stopColor="#316bf3" stopOpacity="0.18" /><stop offset="100%" stopColor="#316bf3" stopOpacity={0} /></radialGradient>
            <filter height="140%" id="softGlow" width="140%" x="-20%" y="-20%">
              <feGaussianBlur result="blur" stdDeviation={3} />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Laut Jawa */}
          <rect fill="url(#seaGradient)" height={150} width={950} />
          <path d="M 0,140 Q 200,165 420,135 T 780,145 T 950,130 L 950,0 L 0,0 Z" fill="#d0e5ff" opacity="0.6" />
          <text fill="#426086" fontFamily="Plus Jakarta Sans" fontSize={13} fontWeight={600} letterSpacing="0.15em" x={440} y={55}>LAUT JAWA (PANTAI UTARA BREBES)</text>
          <path d="M 120,60 Q 320,80 520,65 T 840,70" fill="none" stroke="#b9d6fc" strokeDasharray="4 4" strokeWidth="1.5" />
          <path d="M 60,95 Q 260,110 580,95 T 920,105" fill="none" stroke="#b9d6fc" strokeDasharray="6 4" strokeWidth={1} />

          {/* Heatmap */}
          <circle cx={456} cy={183} fill="url(#heatBulakamba)" r={130} />
          <circle cx={560} cy={197} fill="url(#heatPemali)" r={110} />
          <circle cx={494} cy={326} fill="url(#heatLarangan)" r={140} />

          {/* Kecamatan */}
          {districts.map((d) => (
            <g key={d.name}>
              <path className={`transition-colors ${d.hover ?? 'hover:fill-surface-container-high'}`} d={d.d} fill={d.fill} fillOpacity={d.fo} stroke={d.stroke} strokeWidth={d.sw} />
              <text x={d.tx} y={d.ty} fill={d.tc} fontFamily="Plus Jakarta Sans" fontSize={d.fs} fontWeight={d.fw} pointerEvents="none">{d.name}</text>
            </g>
          ))}

          {/* Jalur utama */}
          <path d="M 70,165 Q 260,160 480,158 T 760,165" fill="none" opacity="0.85" stroke="#f97316" strokeLinecap="round" strokeWidth={4} />
          <path d="M 70,165 Q 260,160 480,158 T 760,165" fill="none" stroke="#ffffff" strokeDasharray="8 6" strokeLinecap="round" strokeWidth="1.5" />
          <text fill="#ea580c" fontFamily="Plus Jakarta Sans" fontSize={10} fontWeight={700} x={210} y={152}>KORIDOR JALUR PANTURA (ARAH TEGAL / CIREBON)</text>
          <path d="M 80,195 Q 250,190 490,190 T 750,200" fill="none" opacity="0.7" stroke="#0284c7" strokeLinecap="round" strokeWidth={3} />
          <path d="M 80,195 Q 250,190 490,190 T 750,200" fill="none" stroke="#ffffff" strokeDasharray="6 4" strokeWidth={1} />
          <path d="M 330,225 Q 430,340 515,490 T 525,650" fill="none" stroke="#94a3b8" strokeLinecap="round" strokeWidth="2.5" />
          <path d="M 570,138 Q 550,220 540,310 T 490,440 T 470,540" fill="none" opacity="0.6" stroke="#38bdf8" strokeWidth={3} />
          <path d="M 710,500 Q 770,550 730,620" fill="none" opacity="0.5" stroke="#a3e635" strokeLinecap="round" strokeWidth={2} />
          <text fill="#4d7c0f" fontFamily="Plus Jakarta Sans" fontSize={9} fontWeight={600} x={715} y={525}>Gn. Slamet (Elev. +3428m)</text>

          {/* Klaster */}
          {clusters.filter((c) => show(c.layer)).map((c) => (
            <g key={c.id} className="cursor-pointer" onClick={() => onFocusCluster(c.id)}>
              <circle cx={c.cx} cy={c.cy} r={c.halo} fill={c.haloColor} fillOpacity="0.2" />
              <circle cx={c.cx} cy={c.cy} r={c.r} fill={c.color} />
              <text x={c.cx} y={c.cy + 4} textAnchor="middle" fill="#ffffff" fontFamily="Plus Jakarta Sans" fontSize={c.fs} fontWeight={700}>{c.count}</text>
              {(c.ping || focusId === c.id) && (
                <circle className="animate-ping" cx={c.cx} cy={c.cy} r={c.halo + 4} fill="none" stroke={c.color} strokeWidth={focusId === c.id ? 3 : 1.5} style={{ transformOrigin: `${c.cx}px ${c.cy}px`, animationDuration: '2.5s' }} />
              )}
            </g>
          ))}

          {/* Pin tunggal */}
          {pins.filter((p) => show(p.layer) || p.id === selectedId).map((p) =>
            p.id === selectedId ? (
              <SelectedPin key={p.id} pin={p} />
            ) : (
              <g key={p.id} className="cursor-pointer" onClick={() => onSelectPin(p.id)}>
                <circle cx={p.cx} cy={p.cy} r={10} fill={p.color} />
                <circle cx={p.cx} cy={p.cy} r={4} fill="#ffffff" />
              </g>
            )
          )}
        </svg>
      </div>

      {/* Chip layer */}
      <div className="absolute top-4 left-4 z-20 flex flex-wrap gap-1.5 max-w-lg bg-surface-container-lowest/80 backdrop-blur-md p-1.5 rounded-2xl shadow-sm">
        {layerOptions.map((l) => (
          <button
            key={l.key}
            type="button"
            onClick={() => setLayer(l.key)}
            className={`px-3 py-1.5 rounded-xl font-label-sm text-label-sm transition-colors flex items-center gap-1 ${
              layer === l.key ? 'bg-primary text-on-primary shadow-xs' : 'bg-surface-container hover:bg-surface-container-high text-on-surface'
            }`}
          >
            {l.dot && <span className={`w-2 h-2 rounded-full ${l.dot}`} />} {l.label}
          </button>
        ))}
      </div>

      {/* Kontrol kanan atas */}
      <div className="absolute top-4 right-4 z-20 flex flex-col items-end gap-2">
        <div className="flex items-center p-1 rounded-xl bg-surface-container-lowest/90 backdrop-blur-md shadow-sm">
          {viewStyles.map((v) => (
            <button key={v} type="button" onClick={() => setViewStyle(v)} className={`px-2.5 py-1 rounded-lg font-label-sm text-[11px] ${viewStyle === v ? 'bg-primary-container text-on-primary font-bold' : 'hover:bg-surface-container text-on-surface-variant'}`}>{v}</button>
          ))}
        </div>
        <div className="flex flex-col rounded-xl bg-surface-container-lowest/90 backdrop-blur-md shadow-sm overflow-hidden">
          <button type="button" title="Perbesar" onClick={() => setZoom((z) => Math.min(2, +(z + 0.25).toFixed(2)))} className="w-9 h-9 flex items-center justify-center hover:bg-surface-container text-on-surface transition-colors"><Icon name="add" className="text-[20px]" /></button>
          <button type="button" title="Perkecil" onClick={() => setZoom((z) => Math.max(1, +(z - 0.25).toFixed(2)))} className="w-9 h-9 flex items-center justify-center hover:bg-surface-container text-on-surface transition-colors"><Icon name="remove" className="text-[20px]" /></button>
          <button type="button" title="Reset Tampilan" onClick={() => setZoom(1)} className="w-9 h-9 flex items-center justify-center hover:bg-surface-container text-on-surface transition-colors"><Icon name="navigation" className="text-[18px] text-error" /></button>
          <button type="button" title="Layar Penuh" className="w-9 h-9 flex items-center justify-center hover:bg-surface-container text-on-surface transition-colors"><Icon name="fullscreen" className="text-[18px]" /></button>
        </div>
      </div>

      {/* Legenda */}
      <div className="absolute bottom-4 left-4 z-20 flex flex-col gap-2">
        <div className="p-3 rounded-2xl bg-surface-container-lowest/95 backdrop-blur-md shadow-sm flex flex-col gap-1.5 max-w-xs">
          <span className="font-label-sm text-[10px] font-bold text-outline uppercase tracking-wider">Legenda Spasial</span>
          <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-on-surface font-label-sm text-[11px]">
            <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-error" /><span>Prioritas / Baru</span></div>
            <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500" /><span>Sedang Diproses</span></div>
            <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-600" /><span>Selesai</span></div>
            <div className="flex items-center gap-1.5"><span className="w-3.5 h-3.5 rounded-full bg-secondary-fixed text-secondary flex items-center justify-center font-bold text-[8px]">●</span><span>Klaster Kepadatan</span></div>
          </div>
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-lowest/80 backdrop-blur-sm text-outline font-label-sm text-[10px]">
          <Icon name="verified" className="text-[14px] text-secondary" />
          Sistem GIS Terpadu Diskominfotik Kab. Brebes • WGS84 EPSG:4326
        </div>
      </div>

      {/* Kotak metrik */}
      <div className="absolute bottom-4 right-4 z-20">
        <div className="px-3.5 py-2 rounded-xl bg-primary text-on-primary shadow-sm flex items-center gap-3">
          <div className="flex flex-col">
            <span className="font-label-sm text-[10px] text-primary-fixed uppercase tracking-wider">Kecepatan Respons Lapangan</span>
            <span className="font-label-md text-label-md font-bold">Rata-rata 4.2 Jam</span>
          </div>
          <Icon name="speed" className="text-[20px] text-secondary-fixed" />
        </div>
      </div>
    </div>
  );
}
