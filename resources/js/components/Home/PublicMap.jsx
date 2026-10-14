import { useState } from 'react';
import Icon from '../common/Icon';
import Badge from '../common/Badge';

const filters = [
  { key: 'semua', label: 'Semua (1,482)' },
  { key: 'jalan', label: 'Jalan Rusak' },
  { key: 'drainase', label: 'Drainase/Banjir' },
  { key: 'sampah', label: 'Sampah' },
  { key: 'lampu', label: 'Lampu Jalan' },
];

// Data contoh. Nanti ganti dengan data dari API Laravel.
const markers = [
  { id: 'brebes', filter: 'sampah', pos: 'top-24 left-1/4', ping: 'bg-tertiary-container/40', bg: 'bg-tertiary-container text-on-tertiary', icon: 'delete', label: 'Kec. Brebes', ticket: '#BRB-2026-001278', title: 'Tumpukan Sampah Liar Mengendap di Bibir Saluran Irigasi', loc: 'Kelurahan Brebes, Kec. Brebes (Dekat Pasar Induk)', opd: 'DLH Brebes' },
  { id: 'bulakamba', filter: 'jalan', pos: 'top-36 left-1/2', bg: 'bg-primary text-on-primary', icon: 'traffic', label: 'Kec. Bulakamba', ticket: '#BRB-2026-001279', title: 'Aspal Mengelupas & Berlubang di Ruas Bulakamba', loc: 'Kec. Bulakamba', opd: 'DPUPR Brebes' },
  { id: 'bumiayu', filter: 'lampu', pos: 'bottom-20 right-1/4', ping: 'bg-secondary/40', bg: 'bg-secondary text-on-secondary', icon: 'lightbulb', label: 'Kec. Bumiayu', ticket: '#BRB-2026-001280', title: 'Lampu PJU Padam di Jalur Bumiayu', loc: 'Kec. Bumiayu', opd: 'Dishub Brebes' },
];

export default function PublicMap() {
  const [filter, setFilter] = useState('semua');
  const [selectedId, setSelectedId] = useState('brebes');
  const [cardOpen, setCardOpen] = useState(true);

  const selected = markers.find((m) => m.id === selectedId);
  const visible = markers.filter((m) => filter === 'semua' || m.filter === filter);

  return (
    <section id="peta-publik" className="w-full bg-surface-container-lowest p-space-lg lg:p-space-xl rounded-3xl shadow-sm mb-space-xl">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-lg gap-space-sm">
        <div>
          <span className="font-label-md text-label-md text-secondary font-bold uppercase tracking-wider">Sebaran Geografis Pengaduan</span>
          <h2 className="font-headline-lg text-headline-lg text-primary tracking-tight mt-1">Peta Masalah di Sekitar Brebes</h2>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mt-1">
            Pantau titik-titik keluhan warga secara transparan di seluruh 17 kecamatan di wilayah Brebes Utara, Tengah, dan Brebes Selatan.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-1.5 self-start md:self-auto">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-3 py-1.5 rounded-full font-label-sm text-label-sm ${
                filter === f.key ? 'bg-primary text-on-primary' : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="relative w-full h-96 lg:h-[460px] rounded-2xl overflow-hidden bg-surface-container-low shadow-inner">
        {/* TODO: ganti dengan peta sungguhan (Leaflet / Google Maps). Gambar latar dari Stitch bersifat sementara. */}
        <div className="w-full h-full bg-cover bg-center" data-location="Kabupaten Brebes, Jawa Tengah, Indonesia" />
        <div className="absolute inset-0 bg-primary/20 backdrop-blur-[1px] pointer-events-none" />

        {visible.map((m) => (
          <div
            key={m.id}
            onClick={() => { setSelectedId(m.id); setCardOpen(true); }}
            className={`absolute ${m.pos} group cursor-pointer z-20`}
          >
            <div className="relative flex items-center justify-center">
              {m.ping && <span className={`absolute w-8 h-8 rounded-full animate-ping ${m.ping}`} />}
              <div className={`w-10 h-10 rounded-full shadow-lg flex items-center justify-center font-bold ${m.bg}`}>
                <Icon name={m.icon} className="text-[20px]" />
              </div>
            </div>
            <span className="mt-1 bg-surface-container-lowest/90 px-2 py-0.5 rounded text-[11px] font-bold text-primary shadow">{m.label}</span>
          </div>
        ))}

        {cardOpen && selected && (
          <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:w-96 bg-surface-container-lowest/95 backdrop-blur-md p-space-md rounded-2xl shadow-xl z-30 transition-all">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <Badge tone="amber">Tindak Lanjut &lt; 24 Jam</Badge>
                <span className="text-on-surface-variant font-label-sm text-label-sm">{selected.ticket}</span>
              </div>
              <button className="text-on-surface-variant hover:text-primary" onClick={() => setCardOpen(false)} aria-label="Tutup">
                <Icon name="close" className="text-[18px]" />
              </button>
            </div>
            <h4 className="font-headline-sm text-[16px] text-primary font-bold leading-snug">{selected.title}</h4>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 flex items-center gap-1">
              <Icon name="pin_drop" className="text-[16px] text-tertiary-container" />
              {selected.loc}
            </p>
            <div className="mt-space-sm pt-space-xs flex items-center justify-between border-t border-surface-container">
              <span className="font-label-sm text-label-sm text-primary font-medium">
                OPD Penanggung Jawab: <strong className="text-secondary">{selected.opd}</strong>
              </span>
              <a className="font-label-sm text-label-sm text-tertiary-container font-bold hover:underline" href="#cek-status">Detail Tiket</a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
