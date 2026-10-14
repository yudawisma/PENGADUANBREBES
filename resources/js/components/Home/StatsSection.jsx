import { stats, monthlyTrend, agencyPerformance } from '../../data/metrics';

export default function StatsSection() {
  return (
    <section id="statistik" className="w-full bg-surface-container-lowest p-space-lg lg:p-space-xl rounded-3xl shadow-sm mb-space-xl">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-space-xl gap-space-md">
        <div>
          <span className="font-label-md text-label-md text-secondary font-bold uppercase tracking-wider">Akuntabilitas Publik</span>
          <h2 className="font-headline-lg text-headline-lg text-primary tracking-tight mt-1">Statistik &amp; Kinerja Penanganan</h2>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mt-1">
            Seluruh data pengaduan dihimpun dan dipublikasikan tanpa rekayasa. Terbuka bagi pengawasan publik masyarakat Brebes.
          </p>
        </div>
        <div className="flex items-center gap-2 text-on-surface-variant font-label-sm text-label-sm bg-surface-container-low px-3 py-1.5 rounded-full self-start lg:self-auto">
          <span className="w-2 h-2 rounded-full bg-green-500" />
          Data Diperbarui Otomatis Setiap 10 Menit
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-space-md mb-space-lg">
        {stats.map((s) => (
          <div key={s.label} className="p-space-lg rounded-2xl bg-surface-container-low flex flex-col justify-between">
            <span className="font-label-sm text-label-sm uppercase font-bold text-on-surface-variant">{s.label}</span>
            <div className="my-space-sm">
              <p className={`font-headline-xl text-headline-xl font-bold ${s.valueColor}`}>{s.value}</p>
              <span className={`font-label-sm text-label-sm ${s.subColor}`}>{s.sub}</span>
            </div>
            <div className="w-full bg-surface-container rounded-full h-1.5">
              <div className={`h-1.5 rounded-full ${s.bar} ${s.width}`} />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-center bg-surface-container-low p-space-lg rounded-2xl">
        <div className="lg:col-span-8">
          <div className="flex items-center justify-between mb-space-md">
            <h3 className="font-headline-sm text-[18px] text-primary font-bold">Tren Penyelesaian Masalah Bulanan (2026)</h3>
            <span className="font-label-sm text-label-sm text-on-surface-variant">Target Minimum: 85%</span>
          </div>
          <div className="h-48 w-full flex items-end justify-between gap-2 sm:gap-4 pt-4 px-2">
            {monthlyTrend.map((m) => (
              <div key={m.month} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                <span className={`font-label-sm text-[11px] ${m.current ? 'text-tertiary-container font-bold' : 'text-on-surface-variant'}`}>{m.pct}%</span>
                <div
                  style={{ height: `${m.pct}%` }}
                  className={`w-full max-w-[42px] rounded-t-lg ${m.current ? 'bg-tertiary-container shadow-sm' : 'bg-primary/20 hover:bg-primary transition-colors'}`}
                />
                <span className={`font-label-sm text-label-sm ${m.current ? 'text-tertiary-container font-bold' : 'text-primary'}`}>{m.month}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-4 bg-surface-container-lowest p-space-md rounded-xl space-y-space-sm">
          <h4 className="font-headline-sm text-[16px] text-primary font-bold">Kinerja Tercepat OPD Brebes</h4>
          <div className="space-y-space-sm">
            {agencyPerformance.map((a) => (
              <div key={a.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${a.dot}`} />
                  <span className="font-body-sm text-body-sm font-medium text-primary">{a.name}</span>
                </div>
                <span className={`font-label-sm text-label-sm font-bold ${a.color}`}>{a.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
