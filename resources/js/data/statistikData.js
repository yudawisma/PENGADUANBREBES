// Data contoh halaman Statistik & Kinerja OPD. Nanti ganti dengan data dari API Laravel.

export const periods = ['7 Hari', '30 Hari', '90 Hari', '2026'];

export const statKpis = [
  { blob: 'bg-surface-variant/40', icon: 'inbox', iconBox: 'bg-primary-fixed text-primary', chip: { text: '+12.4%', className: 'bg-surface-container text-primary', icon: 'trending_up' }, value: '4.821', valueClass: 'text-primary', label: 'Total Laporan Masuk', note: '30 Hari Terakhir' },
  { blob: 'bg-surface-container/50', icon: 'check_circle', iconBox: 'bg-surface-container-high text-secondary', chip: { text: '96.4% Rasio', className: 'bg-surface-container-high text-secondary' }, value: '4.648', valueClass: 'text-primary', label: 'Laporan Dituntaskan', note: '173 Dalam Pengerjaan' },
  { blob: 'bg-surface-container-highest/40', icon: 'verified', iconBox: 'bg-secondary-fixed text-secondary', chip: { text: 'Target: >90%', className: 'bg-surface-container-low text-secondary' }, value: '96.4%', valueClass: 'text-secondary', label: 'Tingkat Penyelesaian', note: '+1.8% di atas standar SPM' },
  { blob: 'bg-tertiary-fixed/30', icon: 'bolt', iconBox: 'bg-tertiary-fixed text-on-tertiary-fixed', chip: { text: 'SLA Maks 4 Jam', className: 'bg-tertiary-fixed-dim text-on-tertiary-fixed' }, value: '1.8 Jam', valueClass: 'text-tertiary-container', label: 'Rata-rata Waktu Respons', note: 'Disposisi awal & telaah OPD' },
  { blob: 'bg-primary-fixed/30', icon: 'timer', iconBox: 'bg-surface-container-high text-primary-container', chip: { text: '3.2 Hari Kerja', className: 'bg-surface-container text-primary' }, value: '38.2 Jam', valueClass: 'text-primary', label: 'Rata-rata Waktu Tuntas', note: 'Penanganan fisik lapangan' },
];

export const categoryBars = [
  { label: 'Infrastruktur Jalan & Jembatan', count: '1.842 laporan', pct: 38, color: 'bg-secondary-container' },
  { label: 'Lampu Penerangan Jalan Umum (LPJU)', count: '984 laporan', pct: 20, color: 'bg-secondary' },
  { label: 'Sampah & Kebersihan Lingkungan', count: '745 laporan', pct: 15, color: 'bg-primary-container' },
  { label: 'Saluran Air & Banjir Drainase', count: '612 laporan', pct: 13, color: 'bg-primary' },
  { label: 'Fasilitas Kesehatan & Puskesmas', count: '380 laporan', pct: 8, color: 'bg-tertiary-container' },
  { label: 'Pelayanan Administrasi & Lainnya', count: '258 laporan', pct: 6, color: 'bg-outline' },
];

export const statusSegments = [
  { label: 'Selesai Ditangani', count: 4648, stroke: '#0051d5', dot: 'bg-secondary' },
  { label: 'Sedang Dikerjakan Lapangan', count: 124, stroke: '#316bf3', dot: 'bg-secondary-container' },
  { label: 'Verifikasi & Telaah Teknis', count: 37, stroke: '#aac9f4', dot: 'bg-primary-fixed-dim' },
  { label: 'Menunggu Tanggapan OPD', count: 12, stroke: '#ba1a1a', dot: 'bg-error', danger: true },
];

export const spmStyles = {
  'Sangat Baik': { text: 'text-secondary', bar: 'bg-secondary', badge: 'bg-surface-container-high text-secondary' },
  Baik: { text: 'text-primary', bar: 'bg-primary', badge: 'bg-surface-container text-primary' },
  Cukup: { text: 'text-outline', bar: 'bg-outline', badge: 'bg-surface-container text-outline' },
};

export const topOpd = [
  { name: 'DPUPR Brebes', resp: '1.4 Jam', respNote: '(SLA Max 4h)', pct: '97.2%', spm: 'Sangat Baik' },
  { name: 'Dishub Brebes', resp: '1.1 Jam', respNote: '(Tercepat)', pct: '98.5%', spm: 'Sangat Baik' },
  { name: 'Dinas Lingkungan Hidup (DLH)', resp: '1.9 Jam', pct: '95.8%', spm: 'Baik' },
  { name: 'Satpol PP Brebes', resp: '1.2 Jam', pct: '96.0%', spm: 'Baik' },
  { name: 'Dinas Kesehatan (Dinkes)', resp: '2.1 Jam', pct: '94.3%', spm: 'Cukup' },
];

export const bidangOptions = [
  ['infra', 'Infrastruktur & Pekerjaan Umum'], ['lingkungan', 'Lingkungan & Tata Kota'],
  ['sosial', 'Sosial & Kesehatan'], ['ketertiban', 'Ketenteraman & Ketertiban'],
];

export const opdRows = [
  { name: 'Dinas Pekerjaan Umum & Penataan Ruang (DPUPR)', task: 'Jalan Kabupaten, Jembatan & Irigasi', bidang: 'infra', forwarded: '1.842', overdue: 4, proses: 48, selesai: '1.790', pct: 97.2, resp: '1.4 Jam', spm: 'Sangat Baik' },
  { name: 'Dinas Perhubungan (Dishub)', task: 'LPJU, Rambu Lalu Lintas & Terminal', bidang: 'infra', forwarded: '984', overdue: 1, proses: 14, selesai: '969', pct: 98.5, resp: '1.1 Jam', spm: 'Sangat Baik', fastest: true },
  { name: 'Dinas Lingkungan Hidup (DLH)', task: 'TPS, Pengangkutan Sampah & Ruang Terbuka Hijau', bidang: 'lingkungan', forwarded: '745', overdue: 3, proses: 28, selesai: '714', pct: 95.8, resp: '1.9 Jam', spm: 'Baik' },
  { name: 'Satuan Polisi Pamong Praja (Satpol PP)', task: 'Ketertiban Umum, PKL & Penegakan Perda', bidang: 'ketertiban', forwarded: '420', overdue: 1, proses: 16, selesai: '403', pct: 96.0, resp: '1.2 Jam', spm: 'Baik' },
  { name: 'Dinas Kesehatan (Dinkes)', task: 'Pelayanan Puskesmas, Obat & Jaminan Kesehatan', bidang: 'sosial', forwarded: '380', overdue: 2, proses: 20, selesai: '358', pct: 94.2, resp: '2.1 Jam', spm: 'Cukup' },
  { name: 'Dinas Sosial (Dinsos)', task: 'Bansos, DTKS & Bantuan Disabilitas', bidang: 'sosial', forwarded: '215', overdue: 0, proses: 8, selesai: '207', pct: 96.3, resp: '1.6 Jam', spm: 'Baik' },
  { name: 'Dinas Pendidikan, Pemuda & Olahraga (Dindikpora)', task: 'Sarpras Gedung Sekolah & Bantuan PIP Daerah', bidang: 'sosial', forwarded: '142', overdue: 1, proses: 5, selesai: '136', pct: 95.8, resp: '2.4 Jam', spm: 'Baik' },
  { name: 'Perumda Air Minum Tirta Baribis (PDAM Brebes)', task: 'Kebocoran Pipa, Distribusi Air Bersih', bidang: 'lingkungan', forwarded: '93', overdue: 0, proses: 3, selesai: '90', pct: 96.8, resp: '1.5 Jam', spm: 'Sangat Baik' },
];
