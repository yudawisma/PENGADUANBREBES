import { useState, useMemo } from 'react';
import Icon from '../../common/Icon';
import { opdRows, bidangOptions, spmStyles } from '../../../data/statistikData';

const selectClass = 'h-10 px-3 rounded-lg bg-surface-container-low text-on-surface text-label-md font-label-md outline-none cursor-pointer';

export default function OpdTable({ onRapor }) {
  const [search, setSearch] = useState('');
  const [bidang, setBidang] = useState('');
  const [spm, setSpm] = useState('');

  const rows = useMemo(() => {
    const q = search.trim().toLowerCase();
    return opdRows.filter(
      (r) => (!bidang || r.bidang === bidang) && (!spm || r.spm === spm) && (!q || `${r.name} ${r.task}`.toLowerCase().includes(q))
    );
  }, [search, bidang, spm]);

  return (
    <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
        <div>
          <h3 className="font-headline-sm text-headline-sm text-primary font-semibold">Tabel Akuntabilitas Kinerja Perangkat Daerah (OPD)</h3>
          <p className="font-body-sm text-body-sm text-on-surface-variant">Rincian beban kerja, waktu tindak lanjut, dan rasio penyelesaian setiap instansi</p>
        </div>
        <div className="flex flex-wrap items-center gap-space-sm">
          <div className="relative min-w-[240px]">
            <Icon name="search" className="absolute left-3 top-2.5 text-outline text-[18px]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari nama dinas atau unit..."
              className="w-full h-10 pl-9 pr-3 rounded-lg bg-surface-container-low text-on-surface text-body-sm font-body-sm outline-none focus:bg-surface-container transition-colors"
            />
          </div>
          <select className={selectClass} value={bidang} onChange={(e) => setBidang(e.target.value)}>
            <option value="">Semua Bidang Urusan</option>
            {bidangOptions.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
          </select>
          <select className={selectClass} value={spm} onChange={(e) => setSpm(e.target.value)}>
            <option value="">Status: Semua</option>
            <option value="Sangat Baik">Sangat Baik (SPM Hijau)</option>
            <option value="Baik">Baik (SPM Hijau)</option>
            <option value="Cukup">Cukup (Perlu Evaluasi)</option>
          </select>
        </div>
      </div>

      <div className="flex items-center justify-between text-outline font-label-sm text-label-sm pt-1">
        <span>Menampilkan {rows.length} Perangkat Daerah Teknis Utama (Periode Aktif)</span>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-secondary" /> SPM Hijau (≥95%)</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-outline" /> Cukup (≥90%)</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-error" /> Dibawah Target (&lt;90%)</span>
        </div>
      </div>

      <div className="overflow-x-auto -mx-space-lg px-space-lg">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container-low text-on-surface-variant font-label-md text-label-md">
              <th className="py-3 px-3 rounded-l-lg font-semibold">No</th>
              <th className="py-3 px-4 font-semibold">Perangkat Daerah (OPD) &amp; Tugas Teknis</th>
              <th className="py-3 px-3 font-semibold text-center">Diteruskan</th>
              <th className="py-3 px-3 font-semibold text-center text-error">Overdue</th>
              <th className="py-3 px-3 font-semibold text-center">Proses</th>
              <th className="py-3 px-3 font-semibold text-center">Selesai</th>
              <th className="py-3 px-4 font-semibold text-center">Penyelesaian</th>
              <th className="py-3 px-3 font-semibold text-center">Waktu Respons</th>
              <th className="py-3 px-3 font-semibold text-center">Status SPM</th>
              <th className="py-3 px-3 rounded-r-lg font-semibold text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-container font-body-sm text-body-sm text-on-surface">
            {rows.map((r, i) => {
              const s = spmStyles[r.spm];
              return (
                <tr key={r.name} className="hover:bg-surface-container-low/60 transition-colors">
                  <td className="py-3.5 px-3 text-outline font-semibold">{String(i + 1).padStart(2, '0')}</td>
                  <td className="py-3.5 px-4">
                    <div className="flex flex-col">
                      <span className="font-bold text-primary">{r.name}</span>
                      <span className="text-on-surface-variant font-label-sm text-label-sm">{r.task}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-3 text-center font-bold">{r.forwarded}</td>
                  <td className="py-3.5 px-3 text-center">
                    <span className={`px-2 py-0.5 rounded-full font-label-sm text-label-sm ${r.overdue >= 2 ? 'bg-error-container text-on-error-container font-bold' : 'bg-surface-container text-on-surface-variant font-semibold'}`}>{r.overdue}</span>
                  </td>
                  <td className="py-3.5 px-3 text-center text-on-surface-variant">{r.proses}</td>
                  <td className="py-3.5 px-3 text-center font-bold text-secondary">{r.selesai}</td>
                  <td className="py-3.5 px-4 text-center">
                    <div className="flex flex-col items-center gap-1">
                      <span className={`font-bold text-label-md font-label-md ${s.text}`}>{r.pct.toFixed(1)}%</span>
                      <div className="w-16 h-1.5 bg-surface-container-high rounded-full overflow-hidden">
                        <div className={`h-full ${s.bar}`} style={{ width: `${r.pct}%` }} />
                      </div>
                    </div>
                  </td>
                  <td className={`py-3.5 px-3 text-center font-semibold ${r.fastest ? 'text-secondary' : 'text-primary'}`}>{r.resp}</td>
                  <td className="py-3.5 px-3 text-center">
                    <span className={`px-2.5 py-0.5 rounded-full font-label-sm text-label-sm font-bold ${s.badge}`}>{r.spm}</span>
                  </td>
                  <td className="py-3.5 px-3 text-right">
                    <button type="button" onClick={() => onRapor?.(r)} className="px-3 py-1 rounded bg-surface-container hover:bg-surface-variant text-primary font-label-sm text-label-sm font-bold transition-colors">Rapor</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {rows.length === 0 && <p className="py-8 text-center text-on-surface-variant font-body-md text-body-md">Tidak ada perangkat daerah yang cocok.</p>}
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 text-on-surface-variant font-label-sm text-label-sm">
        <span>Menampilkan 1-{rows.length} dari 23 Perangkat Daerah Terdaftar</span>
        {/* TODO: pagination sungguhan dari Laravel */}
        <div className="flex items-center gap-1">
          <button disabled className="w-8 h-8 rounded-lg bg-surface-container-low flex items-center justify-center text-outline"><Icon name="chevron_left" className="text-[18px]" /></button>
          <button className="w-8 h-8 rounded-lg bg-primary text-on-primary font-bold">1</button>
          {[2, 3].map((n) => <button key={n} className="w-8 h-8 rounded-lg bg-surface-container-low text-on-surface-variant hover:bg-surface-container transition-colors">{n}</button>)}
          <button className="w-8 h-8 rounded-lg bg-surface-container-low flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors"><Icon name="chevron_right" className="text-[18px]" /></button>
        </div>
      </div>
    </div>
  );
}
