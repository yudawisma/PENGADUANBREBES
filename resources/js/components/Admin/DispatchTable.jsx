import { useState, useMemo } from 'react';
import Icon from '../common/Icon';
import { kecamatanList } from '../../data/categories';
import { dinasOptions, priorityStyles, statusStyles, stageOptions } from '../../data/adminData';

const selectClass =
  'h-10 px-3 pr-8 rounded-xl bg-surface-container-low text-on-surface font-label-md text-label-md appearance-none cursor-pointer focus:outline-none';

export default function DispatchTable({ tickets, onOpen }) {
  const [search, setSearch] = useState('');
  const [kecamatan, setKecamatan] = useState('');
  const [dinas, setDinas] = useState('');
  const [priority, setPriority] = useState('');

  const rows = useMemo(() => {
    const q = search.trim().toLowerCase();
    return tickets.filter(
      (t) =>
        (!kecamatan || t.kecamatan === kecamatan) &&
        (!dinas || t.dinas === dinas) &&
        (!priority || t.priority === priority) &&
        (!q || [t.id, t.category, t.desc, t.address, t.kecLabel].join(' ').toLowerCase().includes(q))
    );
  }, [tickets, search, kecamatan, dinas, priority]);

  return (
    <section className="bg-surface-container-lowest rounded-2xl shadow-sm p-space-lg mb-space-xl flex flex-col">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-space-md mb-space-lg">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-headline-sm text-headline-sm text-primary font-bold">Antrean Disposisi Insiden</h2>
            <span className="px-2.5 py-0.5 rounded-full bg-surface-container-high text-primary font-label-sm text-label-sm font-semibold">124 Menunggu Tindakan</span>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Kelola verifikasi berkas masyarakat, distribusikan tiket ke dinas pelaksana, dan awasi tindak lanjut.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-space-sm">
          <div className="relative min-w-[220px]">
            <Icon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari ID Tiket, Lokasi, Kata Kunci..."
              className="w-full h-10 pl-9 pr-3 rounded-xl bg-surface-container-low text-on-surface font-body-sm text-body-sm focus:outline-none focus:bg-surface-container-lowest focus:shadow-sm"
            />
          </div>
          <div className="relative">
            <select className={selectClass} value={kecamatan} onChange={(e) => setKecamatan(e.target.value)}>
              <option value="">Semua Kecamatan (17)</option>
              {kecamatanList.map((k) => (
                <option key={k} value={k.toLowerCase()}>Kec. {k}</option>
              ))}
            </select>
            <Icon name="expand_more" className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-outline text-[18px]" />
          </div>
          <div className="relative">
            <select className={selectClass} value={dinas} onChange={(e) => setDinas(e.target.value)}>
              <option value="">Semua Dinas Tujuan</option>
              {dinasOptions.map((d) => (
                <option key={d.value} value={d.value}>{d.full}</option>
              ))}
            </select>
            <Icon name="expand_more" className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-outline text-[18px]" />
          </div>
          <div className="relative">
            <select className={selectClass} value={priority} onChange={(e) => setPriority(e.target.value)}>
              <option value="">Prioritas: Semua</option>
              <option value="darurat">Darurat (Merah)</option>
              <option value="tinggi">Tinggi (Kuning)</option>
              <option value="normal">Normal (Biru)</option>
            </select>
            <Icon name="filter_list" className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-outline text-[18px]" />
          </div>
        </div>
      </div>

      <div className="w-full overflow-x-auto">
        <table className="w-full text-left font-body-sm text-body-sm">
          <thead>
            <tr className="bg-surface-container-low/70 text-on-surface-variant font-label-md text-label-md">
              <th className="py-3 px-4 rounded-l-xl">ID Tiket &amp; Jam</th>
              <th className="py-3 px-4">Kategori Masalah</th>
              <th className="py-3 px-4">Lokasi Administratif</th>
              <th className="py-3 px-4">Foto Bukti</th>
              <th className="py-3 px-4">Disposisi SKPD</th>
              <th className="py-3 px-4">Tingkat Urgensi</th>
              <th className="py-3 px-4">Status Progres</th>
              <th className="py-3 px-4 rounded-r-xl text-right">Aksi Tindakan</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((t) => {
              const d = dinasOptions.find((x) => x.value === t.dinas);
              const p = priorityStyles[t.priority];
              const status = stageOptions.find((s) => s.key === t.stage)?.status;
              return (
                <tr key={t.id} className="hover:bg-surface-container-low/40 transition-colors group">
                  <td className="py-4 px-4 font-mono font-medium">
                    <span className="text-primary font-bold block">#{t.id}</span>
                    <span className="text-on-surface-variant text-[12px] flex items-center gap-1">
                      <Icon name="schedule" className="text-[13px]" /> {t.ago}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex flex-col">
                      <span className="font-label-md text-label-md text-on-surface">{t.category}</span>
                      <span className="text-on-surface-variant text-[13px] line-clamp-1 max-w-[200px]">{t.desc}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex flex-col">
                      <span className="font-label-md text-label-md text-primary">{t.kecLabel}</span>
                      <span className="text-outline text-[12px]">{t.address}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-surface-container flex items-center justify-center">
                      {t.image ? (
                        <img src={t.image} alt={t.category} className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform" />
                      ) : (
                        <Icon name="image" className="text-[20px] text-on-surface-variant/40" />
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-surface-container text-primary font-label-sm text-label-sm font-semibold">
                      <Icon name={d.icon} className="text-[14px]" />
                      {d.short}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-label-sm text-label-sm font-bold ${p.badge}`}>
                      {p.dot && <span className="w-1.5 h-1.5 rounded-full bg-error" />} {p.label}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full font-label-sm text-label-sm font-semibold ${statusStyles[status]}`}>{status}</span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <button
                      onClick={() => onOpen(t)}
                      className={`px-3 py-1.5 rounded-xl font-label-md text-label-md transition-colors inline-flex items-center gap-1 ${
                        t.action.primary
                          ? 'bg-primary text-on-primary hover:bg-primary-container shadow-sm'
                          : 'bg-surface-container-high text-primary hover:bg-surface-container'
                      }`}
                    >
                      <span>{t.action.label}</span>
                      <Icon name={t.action.icon} className="text-[16px]" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {rows.length === 0 && (
          <p className="py-8 text-center text-on-surface-variant font-body-md text-body-md">Tidak ada aduan yang cocok dengan filter.</p>
        )}
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-space-sm pt-space-lg mt-space-md">
        <span className="font-body-sm text-body-sm text-on-surface-variant">
          Menampilkan 1 - {rows.length} dari 124 aduan aktif
        </span>
        {/* TODO: pagination sungguhan dari Laravel (paginate()) */}
        <div className="flex items-center gap-1">
          <button disabled className="w-9 h-9 rounded-lg bg-surface-container-low flex items-center justify-center text-outline disabled:opacity-40">
            <Icon name="chevron_left" className="text-[18px]" />
          </button>
          <button className="w-9 h-9 rounded-lg bg-primary text-on-primary font-label-md text-label-md flex items-center justify-center shadow-sm">1</button>
          {[2, 3].map((n) => (
            <button key={n} className="w-9 h-9 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md flex items-center justify-center transition-colors">{n}</button>
          ))}
          <span className="px-2 text-outline">...</span>
          <button className="w-9 h-9 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md flex items-center justify-center transition-colors">31</button>
          <button className="w-9 h-9 rounded-lg bg-surface-container-low flex items-center justify-center text-primary hover:bg-surface-container transition-colors">
            <Icon name="chevron_right" className="text-[18px]" />
          </button>
        </div>
      </div>
    </section>
  );
}
