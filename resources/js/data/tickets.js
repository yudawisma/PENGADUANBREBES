export const toneStyles = {
  amber: { badge: 'bg-amber-100 text-amber-900', dot: 'bg-amber-500' },
  green: { badge: 'bg-emerald-100 text-emerald-900', dot: 'bg-emerald-500' },
  indigo: { badge: 'bg-indigo-100 text-indigo-900', dot: 'bg-indigo-500' },
};

// Data contoh. Nanti ganti dengan response API Laravel (GET /api/tickets/{kode}).
export const sampleTickets = {
  'BRB-2026-001284': {
    code: 'BRB-2026-001284',
    category: 'Infrastruktur & Jalan Rusak',
    location: 'Jl. Raya Ketanggungan KM 4, Kec. Ketanggungan',
    submittedAt: '24 Okt 2025, 08:42 WIB',
    reporter: 'Warga Brebes (Terverifikasi NIK)',
    statusLabel: 'SEDANG DITINDAKLANJUTI',
    tone: 'amber',
    step: 3,
    agency: 'Dinas Pekerjaan Umum (DPU)',
    description:
      'Lubang jalan berdiameter ± 80cm dengan kedalaman 15cm tepat di depan pangkalan ojek KM 4 Ketanggungan arah Banjarharjo. Sudah menyebabkan 2 pengendara motor jatuh saat hujan deras malam hari karena tertutup genangan air. Mohon segera dilakukan penambalan aspal.',
    evidence: [
      { tag: 'Kondisi Awal (Pelapor)', tagClass: 'bg-error text-on-error', date: '24 Okt 2025', caption: 'Foto aduan warga: lubang berpotensi membahayakan', image: null },
      { tag: 'Proses DPU di Lokasi', tagClass: 'bg-secondary text-on-secondary', date: '26 Okt 2025', caption: 'Tim UPTD DPU Wilayah Ketanggungan pemadatan agregat', image: null },
    ],
    timeline: [
      { actor: 'Dinas Pekerjaan Umum (DPU) - Tim Respon Cepat', time: '26 Okt 2025 • 10:15 WIB', text: 'Alat berat perata jalan dan 4 ton aspal hotmix telah tiba di lokasi KM 4 Ketanggungan. Tim teknis sedang melaksanakan penambalan bertahap guna memastikan keselamatan pengguna jalan lintas Ketanggungan-Banjarharjo.', note: 'Surat Tugas Lapangan: ST/620/DPU-BBS/X/2025' },
      { actor: 'Inspektorat / Desk Admin Lapor Brebes', time: '25 Okt 2025 • 09:20 WIB', text: 'Laporan diverifikasi valid. Titik koordinat teridentifikasi di jalan kabupaten kewenangan DPU Brebes. Disposisi diteruskan ke Kepala Bidang Bina Marga DPU Kabupaten Brebes dengan prioritas Sedang-Tinggi.' },
      { actor: 'Sistem Otomatisasi Publik', time: '24 Okt 2025 • 08:42 WIB', text: 'Aduan berhasil tercatat di server sentral. Tiket BRB-2026-001284 diterbitkan secara terenkripsi untuk menjaga privasi identitas pengadu.' },
    ],
  },
  'BRB-2026-000912': {
    code: 'BRB-2026-000912',
    category: 'Penerangan Jalan Umum',
    location: 'Jembatan Bulakamba arah Kluwut, Kec. Bulakamba',
    submittedAt: '19 Okt 2025, 19:10 WIB',
    reporter: 'Warga Brebes (Anonim)',
    statusLabel: 'SELESAI DIPERBAIKI',
    tone: 'green',
    step: 4,
    agency: 'Dinas Perhubungan (Dishub)',
    description:
      'Lampu penerangan jalan umum sepanjang 3 tiang mati di jembatan Bulakamba arah Kluwut. Wilayah menjadi sangat gelap saat malam hari.',
    evidence: [
      { tag: 'Kondisi Awal (Pelapor)', tagClass: 'bg-error text-on-error', date: '19 Okt 2025', caption: 'Foto aduan warga: 3 tiang PJU padam', image: null },
      { tag: 'Hasil Perbaikan', tagClass: 'bg-secondary text-on-secondary', date: '22 Okt 2025', caption: 'Lampu telah menyala kembali', image: null },
    ],
    timeline: [
      { actor: 'Dinas Perhubungan (Dishub) - Bidang PJU', time: '22 Okt 2025 • 15:30 WIB', text: 'Perbaikan kabel dan penggantian lampu selesai. Seluruh 3 titik PJU sudah menyala normal.' },
      { actor: 'Inspektorat / Desk Admin Lapor Brebes', time: '20 Okt 2025 • 08:05 WIB', text: 'Laporan diverifikasi valid dan didisposisikan ke Dishub Brebes.' },
      { actor: 'Sistem Otomatisasi Publik', time: '19 Okt 2025 • 19:10 WIB', text: 'Aduan berhasil tercatat di server sentral. Tiket BRB-2026-000912 diterbitkan.' },
    ],
  },
  'BRB-2026-001402': {
    code: 'BRB-2026-001402',
    category: 'Saluran Irigasi Bawang',
    location: 'Pintu Air Timur Desa Larangan, Kec. Larangan',
    submittedAt: '26 Okt 2025, 07:55 WIB',
    reporter: 'Warga Brebes (Anonim)',
    statusLabel: 'DIVERIFIKASI OPD',
    tone: 'indigo',
    step: 2,
    agency: 'Dinas Pertanian (Distan)',
    description:
      'Pintu air tersumbat enceng gondok dan sampah plastik tebal sehingga air menggenangi 12 hektar lahan bawang merah di Larangan.',
    evidence: [
      { tag: 'Kondisi Awal (Pelapor)', tagClass: 'bg-error text-on-error', date: '26 Okt 2025', caption: 'Foto aduan warga: pintu air tersumbat', image: null },
    ],
    timeline: [
      { actor: 'Dinas Pertanian (Distan) - Validasi OPD', time: '26 Okt 2025 • 13:40 WIB', text: 'Laporan divalidasi. Tim akan melakukan peninjauan lapangan dan pembersihan pintu air.' },
      { actor: 'Sistem Otomatisasi Publik', time: '26 Okt 2025 • 07:55 WIB', text: 'Aduan berhasil tercatat di server sentral. Tiket BRB-2026-001402 diterbitkan.' },
    ],
  },
};

export const defaultTicketCode = 'BRB-2026-001284';

export const sampleChips = [
  { code: 'BRB-2026-001284', label: '#BRB-2026-001284 (Ketanggungan)' },
  { code: 'BRB-2026-000912', label: '#BRB-2026-000912 (Bulakamba)' },
  { code: 'BRB-2026-001402', label: '#BRB-2026-001402 (Larangan)' },
];

export const statusTabs = [
  { key: 'semua', label: 'Semua Aduan (1.482)' },
  { key: 'Diproses', label: 'Sedang Dikerjakan (38)' },
  { key: 'Diverifikasi', label: 'Diverifikasi OPD (19)' },
  { key: 'Selesai', label: 'Selesai Diperbaiki (1.390)' },
];

export const kecamatanFilter = [
  ['semua', 'Semua Kecamatan (17 Wilayah)'],
  ['ketanggungan', 'Kec. Ketanggungan'], ['brebes', 'Kec. Brebes'], ['bulakamba', 'Kec. Bulakamba'],
  ['jatibarang', 'Kec. Jatibarang'], ['larangan', 'Kec. Larangan'], ['bumiayu', 'Kec. Bumiayu'],
];

export const publicReports = [
  { code: 'BRB-2026-001284', status: 'Diproses', kecamatan: 'ketanggungan', kecLabel: 'Ketanggungan', tone: 'amber', icon: 'construction', tag: 'Jalan Rusak & Aspal Amblas', date: '24 Okt 2025', text: 'Lubang jalan berdiameter 80cm dengan kedalaman 15cm tepat di depan pangkalan ojek KM 4 Ketanggungan membahayakan pengendara roda dua.' },
  { code: 'BRB-2026-000912', status: 'Selesai', kecamatan: 'bulakamba', kecLabel: 'Bulakamba', tone: 'green', icon: 'lightbulb', tag: 'PJU Mati & Rawan Kriminalitas', date: '19 Okt 2025', text: 'Lampu penerangan jalan umum sepanjang 3 tiang mati di jembatan Bulakamba arah Kluwut. Wilayah menjadi sangat gelap saat malam hari.' },
  { code: 'BRB-2026-001402', status: 'Diverifikasi', kecamatan: 'larangan', kecLabel: 'Larangan', tone: 'indigo', icon: 'water_damage', tag: 'Saluran Irigasi Tersumbat Sampah', date: '26 Okt 2025', text: 'Pintu air tersumbat enceng gondok dan sampah plastik tebal sehingga air menggenangi 12 hektar lahan bawang merah di Larangan.' },
];
