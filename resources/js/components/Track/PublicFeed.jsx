import { useState } from 'react';
import Icon from '../common/Icon';
import { publicReports, statusTabs, kecamatanFilter, toneStyles } from '../../data/tickets';

export default function PublicFeed({ onOpen }) {
  const [status, setStatus] = useState('semua');
  const [kecamatan, setKecamatan] = useState('semua');

  const visible = publicReports.filter(
    (r) => (status === 'semua' || r.status === status) && (kecamatan === 'semua' || r.kecamatan === kecamatan)
  );

  return (
    <section className="mt-space-xl pt-space-lg">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-space-md">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container text-primary font-label-sm text-label-sm mb-1 uppercase">
            <Icon name="feed" className="text-[16px] text-secondary" />
            Kanal Terbuka Brebes
          </div>
          <h2 className="font-headline-lg text-headline-lg text-primary tracking-tight">Riwayat Pengaduan Publik Terverifikasi</h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">
            Laporan masyarakat yang telah melalui kurasi awal Inspektorat untuk transparansi tata kelola wilayah.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="filter-kecamatan" className="font-label-sm text-label-sm text-outline uppercase">Wilayah:</label>
          <select
            id="filter-kecamatan"
            value={kecamatan}
            onChange={(e) => setKecamatan(e.target.value)}
            className="h-11 px-3 bg-surface-container-lowest rounded-xl font-label-md text-label-md text-primary outline-none shadow-xs cursor-pointer"
          >
            {kecamatanFilter.map(([val, label]) => (
              <option key={val} value={val}>{label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-4">
        {statusTabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setStatus(t.key)}
            className={`px-4 py-2 rounded-xl font-label-md text-label-md whitespace-nowrap transition-colors ${
              status === t.key ? 'bg-primary text-on-primary shadow-xs' : 'bg-surface-container-low text-on-surface-variant hover:text-on-surface'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {visible.length === 0 && (
        <p className="p-6 rounded-2xl bg-surface-container-low text-on-surface-variant font-body-md text-body-md text-center">
          Belum ada laporan yang cocok dengan filter ini.
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-md">
        {visible.map((r) => (
          <article key={r.code} className="bg-surface-container-lowest p-6 rounded-2xl shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="font-label-sm text-label-sm text-secondary font-bold tracking-wider">#{r.code}</span>
                <span className={`px-3 py-1 rounded-full font-label-sm text-label-sm font-semibold ${toneStyles[r.tone].badge}`}>{r.status}</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-surface-container text-primary font-label-sm text-label-sm mb-2">
                <Icon name={r.icon} className="text-[16px]" />
                <span>{r.tag}</span>
              </div>
              <p className="font-body-md text-body-md text-on-surface line-clamp-3 mb-4">{r.text}</p>
            </div>
            <div className="pt-4 bg-surface-container-low/40 -mx-6 -mb-6 p-4 rounded-b-2xl mt-4 space-y-2">
              <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
                <span className="flex items-center gap-1">
                  <Icon name="location_on" className="text-[16px] text-tertiary-container" /> {r.kecLabel}
                </span>
                <span>{r.date}</span>
              </div>
              <button onClick={() => onOpen(r.code)} className="w-full py-2 rounded-lg bg-surface-container-lowest hover:bg-surface-container-high text-primary font-label-sm text-label-sm text-center transition-colors cursor-pointer">
                Lihat Kronologi Berkas →
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
