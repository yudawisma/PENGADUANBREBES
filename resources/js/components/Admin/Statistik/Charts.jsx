import Icon from '../../common/Icon';
import { categoryBars, statusSegments } from '../../../data/statistikData';

/* ---------- Tren Laporan Masuk vs Selesai (SVG statis, ganti dengan data API / chart library) ---------- */
export function TrendChart() {
  const grid = [30, 80, 130];
  return (
    <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h3 className="font-headline-sm text-headline-sm text-primary font-semibold">Tren Laporan Masuk vs Selesai</h3>
          <p className="font-body-sm text-body-sm text-on-surface-variant">Dinamika volume 14 hari terakhir di Kabupaten Brebes</p>
        </div>
        <div className="flex items-center gap-4 text-label-sm font-label-sm">
          <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-secondary-container" /><span className="text-on-surface-variant">Laporan Masuk (4.821)</span></div>
          <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-secondary" /><span className="text-on-surface-variant">Selesai (4.648)</span></div>
        </div>
      </div>

      <div className="w-full h-64 relative pt-4 flex flex-col justify-end">
        <svg className="w-full h-full overflow-visible" fill="none" viewBox="0 0 650 200" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="blueGradient" x1={0} x2={0} y1={0} y2={1}>
              <stop offset="0%" stopColor="#316bf3" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#316bf3" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="navyGradient" x1={0} x2={0} y1={0} y2={1}>
              <stop offset="0%" stopColor="#0051d5" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#0051d5" stopOpacity={0} />
            </linearGradient>
          </defs>
          {grid.map((y) => (
            <line key={y} stroke="#d3e4fe" strokeDasharray="4 4" strokeOpacity="0.6" x1={0} x2={650} y1={y} y2={y} />
          ))}
          <line stroke="#d3e4fe" strokeOpacity="0.9" x1={0} x2={650} y1={180} y2={180} />

          <path d="M 10 120 Q 55 105, 100 115 T 200 90 T 300 110 T 400 70 T 500 55 T 600 45 L 640 40 L 640 180 L 10 180 Z" fill="url(#blueGradient)" />
          <path d="M 10 120 Q 55 105, 100 115 T 200 90 T 300 110 T 400 70 T 500 55 T 600 45 L 640 40" stroke="#316bf3" strokeLinecap="round" strokeWidth={3} />
          <path d="M 10 135 Q 55 125, 100 130 T 200 105 T 300 120 T 400 85 T 500 68 T 600 58 L 640 50 L 640 180 L 10 180 Z" fill="url(#navyGradient)" />
          <path d="M 10 135 Q 55 125, 100 130 T 200 105 T 300 120 T 400 85 T 500 68 T 600 58 L 640 50" stroke="#0051d5" strokeLinecap="round" strokeWidth="2.5" />

          {[[500, 55, '#316bf3', 4.5], [500, 68, '#0051d5', 4], [600, 45, '#316bf3', 4.5], [600, 58, '#0051d5', 4]].map(([cx, cy, fill, r]) => (
            <circle key={`${cx}-${cy}`} cx={cx} cy={cy} fill={fill} r={r} stroke="#ffffff" strokeWidth={2} />
          ))}

          <g transform="translate(450, 10)">
            <rect fill="#01284b" fillOpacity="0.95" height={34} rx={6} width={102} />
            <text fill="#d3e4ff" fontFamily="Plus Jakarta Sans" fontSize={9} fontWeight={600} textAnchor="middle" x={51} y={14}>12 Feb: 342 Aduan</text>
            <text fill="#f8f9ff" fontFamily="Inter" fontSize={9} textAnchor="middle" x={51} y={26}>330 Selesai (96%)</text>
          </g>
        </svg>
        <div className="flex justify-between items-center text-outline font-label-sm text-label-sm pt-2">
          {['01', '03', '05', '07', '09', '11', '13', '15'].map((d) => (
            <span key={d}>{d} Feb</span>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between pt-2 text-on-surface-variant font-label-md text-label-md bg-surface-container-low px-4 py-2.5 rounded-lg">
        <span className="flex items-center gap-1.5">
          <Icon name="insights" className="text-[18px] text-secondary" /> Tren penyelesaian harian konsisten melampaui 95% sejak 3 Februari 2026.
        </span>
        <span className="font-bold text-primary">SLA 4 Jam Tercapai</span>
      </div>
    </div>
  );
}

/* ---------- Laporan berdasarkan kategori ---------- */
export function CategoryBars() {
  return (
    <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-headline-sm text-headline-sm text-primary font-semibold">Laporan Berdasarkan Kategori Utama</h3>
          <p className="font-body-sm text-body-sm text-on-surface-variant">Sebaran sektor kewenangan pengaduan warga</p>
        </div>
        <span className="font-label-sm text-label-sm bg-surface-container-high text-primary px-3 py-1 rounded-full font-semibold">Total: {categoryBars.length} Kategori</span>
      </div>
      <div className="flex flex-col gap-3.5 pt-1">
        {categoryBars.map((c) => (
          <div key={c.label} className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between text-body-sm font-body-sm">
              <span className="text-on-surface font-semibold flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${c.color}`} /> {c.label}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-outline">{c.count}</span>
                <span className="font-bold text-primary bg-surface-container px-2 py-0.5 rounded text-label-sm">{c.pct}%</span>
              </div>
            </div>
            <div className="w-full h-2.5 bg-surface-container-high rounded-full overflow-hidden">
              <div className={`h-full rounded-full ${c.color}`} style={{ width: `${c.pct}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Donut distribusi status (dihitung dari data) ---------- */
export function StatusDonut() {
  const R = 40;
  const C = 2 * Math.PI * R;
  const total = statusSegments.reduce((s, x) => s + x.count, 0);
  let offset = 0;
  const arcs = statusSegments.map((s) => {
    const len = (s.count / total) * C;
    const arc = { ...s, len, offset: -offset, pct: ((s.count / total) * 100).toFixed(1) };
    offset += len;
    return arc;
  });

  return (
    <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-headline-sm text-headline-sm text-primary font-semibold">Distribusi Status Penanganan</h3>
          <p className="font-body-sm text-body-sm text-on-surface-variant">Posisi tahapan seluruh laporan aktif</p>
        </div>
        <Icon name="info" className="text-outline text-[20px]" />
      </div>

      <div className="flex items-center justify-center py-2">
        <div className="relative w-48 h-48 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            {arcs.map((a) => (
              <circle key={a.label} cx={50} cy={50} r={R} fill="transparent" stroke={a.stroke} strokeWidth={14} strokeDasharray={`${a.len} ${C}`} strokeDashoffset={a.offset} />
            ))}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="font-headline-lg text-headline-lg text-primary font-bold leading-tight">{total.toLocaleString('id-ID')}</span>
            <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider font-semibold">Total Laporan</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2.5 pt-1">
        {arcs.map((a) => (
          <div key={a.label} className={`flex items-center justify-between p-2.5 rounded-lg ${a.danger ? 'bg-error-container' : 'bg-surface-container-low'}`}>
            <div className="flex items-center gap-2">
              <span className={`w-3 h-3 rounded-full ${a.dot}`} />
              <span className={`font-label-md text-label-md font-medium ${a.danger ? 'text-on-error-container' : 'text-on-surface'}`}>{a.label}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className={`font-bold font-label-md text-label-md ${a.danger ? 'text-error' : 'text-primary'}`}>{a.count.toLocaleString('id-ID')}</span>
              <span className={`font-label-sm text-label-sm ${a.danger ? 'text-on-error-container' : 'text-on-surface-variant'}`}>({a.pct}%)</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
