// Data contoh halaman Peta Sebaran Kasus. Nanti ganti dengan GeoJSON / data dari API Laravel.

export const petaKpis = [
  { label: 'Total Laporan pada Peta', value: '1,448', valueClass: 'text-primary', unit: 'Titik', icon: 'pin_drop', iconBox: 'bg-secondary-fixed/50 text-secondary', foot: [{ icon: 'trending_up', text: '+38 hari ini', className: 'text-secondary' }, { text: 'Radius 1,657 km²' }] },
  { label: 'Laporan Belum Selesai', value: '186', valueClass: 'text-error', unit: 'Kasus', icon: 'warning', iconBox: 'bg-error-container text-on-error-container', foot: [{ text: 'Menunggu verifikasi OPD teknis' }], chip: { text: '12.8% Beban', className: 'bg-tertiary-fixed text-on-tertiary-fixed-variant' } },
  { label: 'Area Prioritas', value: 'Koridor Pantura', small: true, icon: 'radar', iconBox: 'bg-tertiary-fixed text-tertiary', foot: [{ text: 'Bulakamba & Brebes Kota' }], chip: { text: 'Zona Merah', className: 'bg-error-container text-on-error-container' } },
  { label: 'Kecamatan Terbanyak', value: 'Kec. Bulakamba', small: true, icon: 'bar_chart', iconBox: 'bg-surface-container-high text-primary', foot: [{ text: '312 Laporan terdata' }], chip: { text: 'Jalan & Banjir', className: 'bg-surface-container text-primary' } },
];

export const layerOptions = [
  { key: 'semua', label: 'Semua (1,448)' },
  { key: 'jalan', label: 'Jalan Rusak', dot: 'bg-error' },
  { key: 'drainase', label: 'Banjir & Drainase', dot: 'bg-secondary' },
  { key: 'lampu', label: 'LPJU Padam', dot: 'bg-amber-500' },
  { key: 'sampah', label: 'Persampahan', dot: 'bg-emerald-600' },
];

export const categorySelect = [
  ['semua', 'Semua Kategori (Jalan, Drainase, dll)'], ['jalan', 'Infrastruktur Jalan'], ['drainase', 'Banjir & Sungai'],
  ['sampah', 'Persampahan'], ['lampu', 'LPJU & Listrik'],
];

// Poligon kecamatan (koordinat SVG ilustratif, bukan batas wilayah resmi)
const W = { fill: '#ffffff', fo: 0.85, stroke: '#cbd5e1', sw: 1.5, tc: '#64748b', fs: 11, fw: 600 };
export const districts = [
  { name: 'Losari', d: 'M 90,148 L 190,145 L 210,210 L 140,240 L 80,210 Z', ...W, fo: 0.8, tx: 120, ty: 195 },
  { name: 'Tanjung', d: 'M 190,145 L 320,140 L 330,225 L 210,210 Z', ...W, fo: 0.9, tx: 235, ty: 185 },
  { name: 'Bulakamba', d: 'M 320,140 L 490,135 L 485,230 L 330,225 Z', ...W, fill: '#fee2e2', fo: 0.45, stroke: '#fca5a5', tc: '#991b1b', fw: 700, tx: 375, ty: 180, hover: 'hover:fill-error-container' },
  { name: 'Wanasari', d: 'M 490,135 L 610,138 L 600,240 L 485,230 Z', ...W, fo: 0.9, tx: 520, ty: 185 },
  { name: 'Brebes Kota', d: 'M 610,138 L 740,142 L 725,235 L 600,240 Z', ...W, fill: '#fef3c7', fo: 0.5, stroke: '#fde68a', tc: '#b45309', fs: 12, fw: 700, tx: 640, ty: 180 },
  { name: 'Jatibarang', d: 'M 600,240 L 725,235 L 705,310 L 590,305 Z', ...W, tx: 625, ty: 275 },
  { name: 'Songgom', d: 'M 590,305 L 705,310 L 685,385 L 565,370 Z', ...W, tx: 615, ty: 345 },
  { name: 'Larangan', d: 'M 400,230 L 590,235 L 565,370 L 410,350 Z', ...W, fill: '#dbeafe', fo: 0.5, stroke: '#3b82f6', sw: 2, tc: '#1d4ed8', fs: 12, fw: 700, tx: 465, ty: 295, hover: 'hover:fill-secondary-fixed' },
  { name: 'Ketanggungan', d: 'M 230,225 L 400,230 L 410,350 L 260,345 Z', ...W, tx: 280, ty: 285 },
  { name: 'Banjarharjo', d: 'M 110,240 L 230,225 L 260,345 L 140,370 Z', ...W, tx: 155, ty: 295 },
  { name: 'Salem', d: 'M 120,380 L 280,360 L 310,480 L 150,510 Z', ...W, fill: '#f1f5f9', fo: 1, tx: 180, ty: 445 },
  { name: 'Bantarkawung', d: 'M 280,360 L 450,365 L 460,490 L 310,480 Z', ...W, fill: '#f1f5f9', fo: 1, tx: 345, ty: 430 },
  { name: 'Tonjong', d: 'M 565,370 L 710,385 L 680,480 L 540,460 Z', ...W, tx: 590, ty: 425 },
  { name: 'Bumiayu', d: 'M 460,490 L 620,470 L 610,580 L 440,570 Z', ...W, fill: '#fef3c7', fo: 0.35, stroke: '#fde68a', tc: '#92400e', fs: 12, fw: 700, tx: 500, ty: 530 },
  { name: 'Sirampog', d: 'M 620,470 L 760,480 L 740,600 L 610,580 Z', ...W, fill: '#f8fafc', fo: 1, tx: 655, ty: 540 },
  { name: 'Paguyangan', d: 'M 440,570 L 610,580 L 590,660 L 420,640 Z', ...W, fill: '#f1f5f9', fo: 1, tx: 480, ty: 620 },
];

export const clusters = [
  { id: 'bulakamba', layer: 'jalan', cx: 410, cy: 168, r: 16, halo: 22, color: '#ba1a1a', haloColor: '#ef4444', count: 48, fs: 11, ping: true },
  { id: 'wanasari', layer: 'drainase', cx: 545, cy: 170, r: 14, halo: 19, color: '#ba1a1a', haloColor: '#ef4444', count: 34, fs: 10 },
  { id: 'brebes', layer: 'sampah', cx: 660, cy: 175, r: 13, halo: 18, color: '#b45309', haloColor: '#f59e0b', count: 28, fs: 10 },
  { id: 'bumiayu', layer: 'lampu', cx: 520, cy: 515, r: 12, halo: 16, color: '#15803d', haloColor: '#10b981', count: 19, fs: 10 },
];

// Titik laporan tunggal. Semua data di bawah ini contoh (kecuali kode tiket yang selaras dengan halaman Verifikasi).
export const pins = [
  { id: 'larangan', layer: 'jalan', cx: 490, cy: 305, color: '#0051d5', shortId: '#BRB-001302', ticket: '#BRB-2026-001302', priority: { label: 'Prioritas Tinggi (Darurat)', className: 'bg-error-container text-on-error-container' }, time: '15 Feb, 09:42 WIB', title: 'Jalan Ambles & Lubang Ruas Klampok - Sitanggal KM 4.2', location: 'Desa Sitanggal, Kec. Larangan', reporter: 'Bambang Hariyanto', verified: true, opd: 'DPUPR Brebes', status: 'Menunggu Disposisi TRC', coords: '-6.9421° S, 109.0312° E', accuracy: '±8m', image: null },
  { id: 'ketanggungan', layer: 'lampu', cx: 340, cy: 270, color: '#f59e0b', shortId: '#BRB-001291', ticket: '#BRB-2026-001291', priority: { label: 'Prioritas Sedang', className: 'bg-tertiary-fixed text-on-tertiary-fixed-variant' }, time: '14 Feb, 22:30 WIB', title: 'LPJU Padam Total di Perempatan Puskesmas Ketanggungan', location: 'Perempatan Puskesmas, Kec. Ketanggungan', reporter: 'Agus Salim', verified: false, opd: 'Dishub Brebes', status: 'Sedang Dikerjakan', coords: '-6.9012° S, 108.9875° E', accuracy: 'EXIF kosong', image: null },
  { id: 'jatibarang', layer: 'sampah', cx: 640, cy: 280, color: '#15803d', shortId: '#BRB-000870', ticket: '#BRB-2026-000870', priority: { label: 'Selesai Ditangani', className: 'bg-secondary-fixed text-on-secondary-fixed' }, time: '12 Feb, 10:05 WIB', title: 'Tumpukan Sampah Pasar Jatibarang Telah Diangkut', location: 'Pasar Jatibarang, Kec. Jatibarang', reporter: 'Warga Brebes (Anonim)', verified: false, opd: 'DLH Brebes', status: 'Selesai', coords: '-6.9302° S, 109.0588° E', accuracy: '±10m', image: null },
  { id: 'salem', layer: 'jalan', cx: 230, cy: 430, color: '#ba1a1a', shortId: '#BRB-001266', ticket: '#BRB-2026-001266', priority: { label: 'Prioritas Tinggi (Darurat)', className: 'bg-error-container text-on-error-container' }, time: '13 Feb, 17:20 WIB', title: 'Tebing Rawan Longsor di Ruas Salem - Majenang', location: 'Ruas Salem - Majenang, Kec. Salem', reporter: 'Warga Brebes (Anonim)', verified: false, opd: 'DPUPR Brebes', status: 'Menunggu Disposisi TRC', coords: '-7.1904° S, 108.8123° E', accuracy: '±15m', image: null },
];

// focus: { type: 'cluster' | 'pin', id }
export const topClusters = [
  { name: 'Jl. Raya Pantura Bulakamba', desc: '48 aduan jalan berlubang & aspal rusak', count: '48 Titik', rank: 'bg-error-container text-on-error-container', badge: 'bg-error text-on-error', focus: { type: 'cluster', id: 'bulakamba' } },
  { name: 'Bantaran Kali Pemali Wanasari', desc: '34 aduan tanggul & sumbatan sampah', count: '34 Titik', rank: 'bg-error-container text-on-error-container', badge: 'bg-error text-on-error', focus: { type: 'cluster', id: 'wanasari' } },
  { name: 'Pasar Larangan & Sekitarnya', desc: '26 aduan drainase meluap saat hujan', count: '26 Titik', rank: 'bg-tertiary-fixed text-on-tertiary-fixed-variant', badge: 'bg-amber-500 text-white', focus: { type: 'pin', id: 'larangan' } },
  { name: 'Simpang Ketanggungan - Pejagan', desc: '19 aduan LPJU padam di persimpangan', count: '19 Titik', rank: 'bg-secondary-fixed text-on-secondary-fixed', badge: 'bg-surface-container-highest text-primary', focus: { type: 'pin', id: 'ketanggungan' } },
  { name: 'Ruas Salem - Majenang', desc: '14 aduan rawan longsor tebing curam', count: '14 Titik', rank: 'bg-secondary-fixed text-on-secondary-fixed', badge: 'bg-surface-container-highest text-primary', focus: { type: 'pin', id: 'salem' } },
];
