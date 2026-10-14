import Icon from '../common/Icon';

const pins = [
  { pos: 'top-20 left-16', ping: 'w-8 h-8 bg-error/30', box: 'w-9 h-9', color: 'text-error', icon: 'traffic', iconSize: 'text-[18px]', tip: { side: 'left-10 -top-3', title: 'Jalan Rusak', loc: 'Kec. Ketanggungan', opd: 'Tindak Cepat DPUPR', opdColor: 'text-tertiary-container' } },
  { pos: 'bottom-12 right-20', ping: 'w-7 h-7 bg-secondary/30', box: 'w-9 h-9', color: 'text-secondary', icon: 'lightbulb', iconSize: 'text-[18px]', tip: { side: 'right-10 -top-4', title: 'Lampu PJU Padam', loc: 'Kec. Bumiayu', opd: 'Dishub Brebes', opdColor: 'text-secondary' } },
  { pos: 'top-10 right-28', box: 'w-8 h-8', color: 'text-tertiary-container', icon: 'delete_sweep', iconSize: 'text-[17px]' },
  { pos: 'top-36 left-48', box: 'w-8 h-8', color: 'text-primary', icon: 'water_drop', iconSize: 'text-[17px]' },
];

export default function LiveMapCard() {
  return (
    <div className="relative bg-surface-container-low p-space-md rounded-2xl shadow-md overflow-hidden">
      <div className="flex items-center justify-between pb-space-sm">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-error animate-pulse" />
          <span className="font-label-md text-label-md text-primary font-bold">Peta Pantauan Wilayah Langsung</span>
        </div>
        <span className="font-label-sm text-label-sm text-on-surface-variant bg-surface-container px-2 py-0.5 rounded-full">
          Live Monitor
        </span>
      </div>

      <div className="relative h-72 w-full rounded-xl overflow-hidden bg-primary-container/10 flex items-center justify-center">
        <svg className="absolute inset-0 w-full h-full opacity-25 text-primary" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern height={28} id="civic-map-grid" patternUnits="userSpaceOnUse" width={28}>
              <path d="M 28 0 L 0 0 0 28" fill="none" stroke="currentColor" strokeWidth="0.75" />
            </pattern>
          </defs>
          <rect fill="url(#civic-map-grid)" height="100%" width="100%" />
          <path
            d="M 30,190 Q 70,80 160,70 T 320,60 T 380,180 T 260,250 T 80,240 Z"
            fill="rgba(1, 40, 75, 0.08)"
            stroke="currentColor"
            strokeDasharray="4 2"
            strokeWidth={2}
          />
        </svg>

        <div className="absolute top-6 left-1/3 font-label-sm text-label-sm text-primary/40 pointer-events-none uppercase tracking-widest font-bold">
          Pantai Laut Jawa
        </div>
        <div className="absolute bottom-4 right-8 font-label-sm text-label-sm text-primary/40 pointer-events-none uppercase tracking-wider font-bold">
          Wilayah Brebes Selatan
        </div>

        {pins.map((p) => (
          <div key={p.icon} className={`absolute ${p.pos} group cursor-pointer`}>
            <div className="relative flex items-center justify-center">
              {p.ping && <span className={`absolute rounded-full animate-ping ${p.ping}`} />}
              <div className={`${p.box} rounded-xl bg-surface-container-lowest shadow-md flex items-center justify-center ${p.color} z-10 hover:scale-110 transition-transform`}>
                <Icon name={p.icon} className={p.iconSize} />
              </div>
            </div>
            {p.tip && (
              <div className={`absolute ${p.tip.side} w-44 bg-surface-container-lowest p-2 rounded-xl shadow-lg pointer-events-none opacity-90 transition-opacity z-20`}>
                <p className="font-label-sm text-label-sm font-bold text-primary truncate">{p.tip.title}</p>
                <p className="font-label-sm text-label-sm text-on-surface-variant truncate">{p.tip.loc}</p>
                <span className={`font-label-sm text-label-sm font-semibold ${p.tip.opdColor}`}>{p.tip.opd}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-space-sm p-space-sm bg-surface-container-lowest rounded-xl flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon name="radar" className="text-secondary text-[20px]" />
          <span className="font-label-sm text-label-sm text-on-surface font-medium">
            32 Laporan Baru Hari Ini Tersebar di 12 Kecamatan
          </span>
        </div>
        <a className="font-label-sm text-label-sm text-secondary font-bold hover:underline flex items-center gap-0.5" href="#peta-publik">
          Jelajahi <Icon name="chevron_right" className="text-[16px]" />
        </a>
      </div>
    </div>
  );
}
