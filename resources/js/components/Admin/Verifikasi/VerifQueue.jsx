import Icon from '../../common/Icon';
import { statusStyles, rowActions } from '../../../data/verifikasiData';

export default function VerifQueue({ rows, selected, onToggle, onToggleAll, onAction, onBulkVerify, onPreview }) {
  const allChecked = rows.length > 0 && rows.every((r) => selected.has(r.id));

  return (
    <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden">
      <div className="px-space-lg py-space-md bg-surface-container-low/40 flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm">
        <div className="flex items-center gap-3">
          <h2 className="font-headline-sm text-headline-sm text-primary">Daftar Antrean Verifikasi Laporan Masuk</h2>
          <span className="px-2.5 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed-variant font-label-sm text-label-sm font-bold">28 Tertunda</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onBulkVerify}
            disabled={selected.size === 0}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-lowest text-primary font-label-sm text-label-sm hover:bg-surface-container transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Icon name="checklist_rtl" className="text-[16px] text-secondary" />
            <span>Verifikasi Massal ({selected.size})</span>
          </button>
          {/* TODO: unduh rekap dari Laravel */}
          <button type="button" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-lowest text-on-surface-variant font-label-sm text-label-sm hover:bg-surface-container hover:text-primary transition-colors shadow-sm">
            <Icon name="file_download" className="text-[16px]" />
            <span>Unduh Rekap</span>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-surface-container-low text-outline font-label-sm text-label-sm uppercase tracking-wider">
              <th className="py-3.5 px-4 w-12 text-center">
                <input type="checkbox" checked={allChecked} onChange={onToggleAll} className="w-4 h-4 rounded text-secondary focus:ring-0 cursor-pointer" />
              </th>
              <th className="py-3.5 px-4">Kode Tiket</th>
              <th className="py-3.5 px-4 min-w-[280px]">Judul &amp; Uraian Masalah</th>
              <th className="py-3.5 px-4">Kategori &amp; Lokasi</th>
              <th className="py-3.5 px-4">Bukti Lampiran</th>
              <th className="py-3.5 px-4">Waktu Masuk</th>
              <th className="py-3.5 px-4">Status &amp; Verifikator</th>
              <th className="py-3.5 px-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-on-surface font-body-sm text-body-sm">
            {rows.map((t, i) => {
              const st = statusStyles[t.status];
              const act = rowActions[t.status];
              return (
                <tr key={t.id} className={`hover:bg-surface-container-low/40 transition-colors group ${i % 2 === 1 ? 'bg-surface-container-low/20' : ''}`}>
                  <td className="py-4 px-4 text-center">
                    <input type="checkbox" checked={selected.has(t.id)} onChange={() => onToggle(t.id)} className="w-4 h-4 rounded text-secondary focus:ring-0 cursor-pointer" />
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    <div className="flex flex-col">
                      <span className="font-label-md text-label-md text-primary font-bold tracking-tight">#{t.id}</span>
                      <span className="font-label-sm text-[11px] text-outline flex items-center gap-1 mt-0.5">
                        <Icon name={t.channel.icon} className="text-[13px] text-secondary" /> {t.channel.label}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex flex-col">
                      <span className="font-label-lg text-label-lg text-primary font-semibold group-hover:text-secondary transition-colors">{t.title}</span>
                      <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-1 mt-0.5">{t.desc}</p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className="font-label-sm text-[11px] text-on-surface font-medium flex items-center gap-1">
                          <Icon name="person" className="text-[14px] text-outline" /> {t.reporter}
                        </span>
                        <span className="text-outline text-xs">•</span>
                        <span className={`font-label-sm text-[11px] font-medium ${t.noteStrong ? 'text-secondary' : 'text-on-surface-variant'}`}>{t.note}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex flex-col gap-1 items-start">
                      <span className="px-2.5 py-0.5 rounded-full bg-surface-container text-primary font-label-sm text-[11px] font-semibold">{t.categoryLabel}</span>
                      <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
                        <Icon name="location_on" className="text-[14px] text-outline" /> {t.kecLabel}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-surface-container flex-shrink-0 flex items-center justify-center">
                        {t.image ? <img src={t.image} alt={t.title} className="w-full h-full object-cover" /> : <Icon name="image" className="text-[20px] text-on-surface-variant/40" />}
                        <span className="absolute bottom-0 right-0 bg-primary/80 text-on-primary font-label-sm text-[9px] px-1 rounded-tl">{t.photos} Foto</span>
                      </div>
                      <div className="flex flex-col">
                        {t.geotag.ok ? (
                          <span className="inline-flex items-center gap-1 font-label-sm text-[10px] text-primary font-bold bg-primary-fixed px-1.5 py-0.5 rounded">
                            <Icon name="my_location" className="text-[12px]" /> Geotag Valid
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 font-label-sm text-[10px] text-on-error-container font-bold bg-error-container px-1.5 py-0.5 rounded">
                            <Icon name="wrong_location" className="text-[12px]" /> {t.geotag.label}
                          </span>
                        )}
                        <span className="font-label-sm text-[10px] text-outline mt-0.5">{t.geotag.sub}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    <div className="flex flex-col">
                      <span className="font-label-sm text-label-sm text-on-surface font-semibold">{t.date}</span>
                      <span className={`font-label-sm text-[11px] ${t.hot ? 'text-tertiary font-bold' : 'text-outline'}`}>{t.time}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    <div className="flex flex-col gap-1 items-start">
                      <span className={`px-2.5 py-1 rounded-full font-label-sm text-label-sm font-bold flex items-center gap-1 ${st.className}`}>
                        {st.pulse && <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse" />}
                        {st.icon && <Icon name={st.icon} className="text-[13px]" />}
                        {st.label}
                      </span>
                      <span className="font-label-sm text-[11px] text-outline">{t.verifier}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        type="button"
                        disabled={act.disabled}
                        onClick={() => onAction(t)}
                        className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-xl font-label-sm text-label-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                          act.primary ? 'bg-tertiary-container text-on-tertiary hover:bg-tertiary shadow-sm' : 'bg-surface-container-high text-primary hover:bg-surface-variant'
                        }`}
                      >
                        <Icon name={act.icon} className="text-[16px]" />
                        <span>{act.label}</span>
                      </button>
                      <button type="button" onClick={() => onPreview?.(t)} title="Lihat Pratinjau Cepat" className="p-1.5 rounded-lg bg-surface-container text-on-surface-variant hover:text-primary hover:bg-surface-variant transition-colors">
                        <Icon name="visibility" className="text-[18px]" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {rows.length === 0 && <p className="py-10 text-center text-on-surface-variant font-body-md text-body-md">Tidak ada laporan yang cocok dengan filter.</p>}
      </div>

      <div className="px-space-lg py-3.5 bg-surface-container-low/40 flex flex-col sm:flex-row sm:items-center justify-between gap-space-md">
        <div className="flex items-center gap-2 font-body-sm text-body-sm text-on-surface-variant">
          <span>Menampilkan</span>
          <span className="font-label-md text-label-md text-primary font-bold">1 - {rows.length}</span>
          <span>dari</span>
          <span className="font-label-md text-label-md text-primary font-bold">28 antrean laporan</span>
        </div>
        {/* TODO: pagination sungguhan dari Laravel */}
        <div className="flex items-center gap-1">
          <button disabled className="w-8 h-8 rounded-lg flex items-center justify-center bg-surface-container text-outline opacity-40 cursor-not-allowed"><Icon name="chevron_left" className="text-[18px]" /></button>
          <button className="w-8 h-8 rounded-lg flex items-center justify-center bg-primary text-on-primary font-label-sm text-label-sm font-bold shadow-sm">1</button>
          {[2, 3, 4].map((n) => (
            <button key={n} className="w-8 h-8 rounded-lg flex items-center justify-center bg-surface-container-lowest text-on-surface font-label-sm text-label-sm hover:bg-surface-container transition-colors">{n}</button>
          ))}
          <button className="w-8 h-8 rounded-lg flex items-center justify-center bg-surface-container-lowest text-on-surface hover:bg-surface-container transition-colors shadow-sm"><Icon name="chevron_right" className="text-[18px]" /></button>
        </div>
      </div>
    </div>
  );
}
