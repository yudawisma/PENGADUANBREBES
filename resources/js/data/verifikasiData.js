// Data contoh halaman Verifikasi Laporan. Nanti ganti dengan data dari API Laravel.

export const verifKpis = [
  { label: 'Menunggu Verifikasi', value: '28', valueClass: 'text-primary', unit: 'Laporan', unitClass: 'text-tertiary-container', icon: 'pending_actions', iconBox: 'bg-tertiary-fixed text-on-tertiary-fixed', chip: { text: 'Prioritas Tinggi', className: 'text-on-tertiary-fixed-variant bg-tertiary-fixed/80', ping: true }, foot: 'SLA rata-rata < 4 jam' },
  { label: 'Sedang Diverifikasi', value: '14', valueClass: 'text-primary', unit: 'Laporan', unitClass: 'text-secondary', icon: 'troubleshoot', iconBox: 'bg-secondary-fixed text-secondary', chip: { text: '4 Staf Aktif', className: 'text-secondary bg-secondary-fixed/50', icon: 'group' }, foot: 'Penelaahan deskripsi' },
  { label: 'Laporan Valid', value: '1,420', valueClass: 'text-primary', unit: 'Bulan ini', unitClass: 'text-primary', icon: 'verified', iconBox: 'bg-surface-container-high text-primary', chip: { text: '16 OPD Terusan', className: 'text-primary bg-primary-fixed', icon: 'hub' }, foot: 'Tingkat akurasi 98.2%' },
  { label: 'Perlu Perbaikan', value: '8', valueClass: 'text-error', unit: 'Tertunda', unitClass: 'text-error', icon: 'report_problem', iconBox: 'bg-error-container text-on-error-container', chip: { text: 'Duplikasi & Buram', className: 'text-on-error-container bg-error-container/70' }, foot: 'Menanti konfirmasi warga' },
];

export const categoryFilter = [
  ['infrastruktur', 'Infrastruktur Jalan'], ['drainase', 'Drainase & Banjir'], ['kebersihan', 'Kebersihan Lingkungan'],
  ['lampu', 'Penerangan Jalan (LPJU)'], ['kesehatan', 'Layanan Kesehatan'], ['pendidikan', 'Fasilitas Sekolah'],
];

export const statusFilter = [
  ['menunggu', 'Menunggu Verifikasi (28)'], ['ditelaah', 'Sedang Ditelaah (14)'],
  ['butuh_bukti', 'Butuh Bukti Ulang (8)'], ['duplikasi', 'Potensi Duplikasi (3)'], ['valid', 'Sudah Terverifikasi'],
];

export const statusStyles = {
  menunggu: { label: 'Menunggu Verifikasi', className: 'bg-tertiary-fixed text-on-tertiary-fixed-variant shadow-sm', pulse: true },
  ditelaah: { label: 'Sedang Ditelaah', className: 'bg-secondary-fixed text-on-secondary-fixed-variant', icon: 'person_pin' },
  butuh_bukti: { label: 'Perlu Bukti Ulang', className: 'bg-error-container text-on-error-container shadow-sm', icon: 'contact_support' },
  duplikasi: { label: 'Potensi Duplikasi', className: 'bg-surface-container-high text-on-surface-variant', icon: 'content_copy' },
  valid: { label: 'Terverifikasi', className: 'bg-primary-fixed text-primary', icon: 'verified' },
};

export const initialQueue = [
  { id: 'BRB-2026-001302', channel: { icon: 'smartphone', label: 'Aplikasi Warga' }, title: 'Jalan Ambles & Lubang Parah Ruas Klampok - Sitanggal KM 4.2', desc: 'Kedalaman lubang mencapai 25cm di sisi timur jembatan irigasi. Sering memicu kecelakaan pemotor saat malam hari tanpa penerangan.', reporter: 'Bambang Hariyanto', note: 'KTP Terverifikasi (Brebes)', noteStrong: true, category: 'infrastruktur', categoryLabel: 'Infrastruktur Jalan', kecamatan: 'larangan', kecLabel: 'Kec. Larangan', photos: 2, geotag: { ok: true, sub: 'Akurasi 8m' }, date: '15 Feb 2026', time: '09:42 WIB (2 jam lalu)', hot: true, status: 'menunggu', verifier: 'Belum ada verifikator', image: null },
  { id: 'BRB-2026-001298', channel: { icon: 'public', label: 'Web Portal' }, title: 'Drainase Tersumbat Limbah Pasar Larangan Meluap ke Jalan', desc: 'Gorong-gorong induk dipenuhi tumpukan kantong plastik dan endapan lumpur pekat menyebabkan genangan setinggi mata kaki bau menyengat.', reporter: 'Nur Kholis', note: 'Warga Pasar', noteStrong: true, category: 'drainase', categoryLabel: 'Drainase & Banjir', kecamatan: 'larangan', kecLabel: 'Kec. Larangan', photos: 3, geotag: { ok: true, sub: 'Akurasi 5m' }, date: '15 Feb 2026', time: '08:15 WIB (3.5 jam lalu)', status: 'ditelaah', verifier: 'Oleh: Dedi (DLH)', image: null },
  { id: 'BRB-2026-001295', channel: { icon: 'smartphone', label: 'Aplikasi Warga' }, title: 'Tumpukan Sampah Liar Menggunung di Bahu Jalan Bulakamba', desc: 'TPS liar muncul di dekat area persawahan perbatasan desa. Memanjang 15 meter mengganggu pandangan pengemudi jalan pantura alternatif.', reporter: 'Siti Rohmah', note: 'KTP Terverifikasi (Brebes)', noteStrong: true, category: 'kebersihan', categoryLabel: 'Kebersihan Lingkungan', kecamatan: 'bulakamba', kecLabel: 'Kec. Bulakamba', photos: 1, geotag: { ok: true, sub: 'Akurasi 12m' }, date: '15 Feb 2026', time: '07:20 WIB (4 jam lalu)', hot: true, status: 'menunggu', verifier: 'Belum ada verifikator', image: null },
  { id: 'BRB-2026-001291', channel: { icon: 'phone_iphone', label: 'WhatsApp Bot' }, title: 'LPJU Padam Total di Perempatan Puskesmas Ketanggungan', desc: 'Sebanyak 4 titik lampu penerangan jalan umum mati sejak badai angin 3 hari lalu. Simpang jalan menjadi sangat gelap dan rawan kriminalitas.', reporter: 'Agus Salim', note: 'Nomor WA Terverifikasi', category: 'lampu', categoryLabel: 'Lampu Penerangan', kecamatan: 'ketanggungan', kecLabel: 'Kec. Ketanggungan', photos: 2, geotag: { ok: false, label: 'EXIF Kosong', sub: 'Validasi manual' }, date: '14 Feb 2026', time: '22:30 WIB (Kemarin)', status: 'menunggu', verifier: 'Antrean prioritas 4', image: null },
  { id: 'BRB-2026-001287', channel: { icon: 'smartphone', label: 'Aplikasi Warga' }, title: 'Fasilitas Ruang Tunggu & Farmasi Puskesmas Jatibarang Rusak', desc: 'Plafon atap ruang antrean resep jebol terkena rembesan air hujan. Kursi tunggu pasien lansia banyak yang patah belum diganti.', reporter: 'Hendra Wijaya', note: 'KTP Terverifikasi (Brebes)', noteStrong: true, category: 'kesehatan', categoryLabel: 'Fasilitas Kesehatan', kecamatan: 'jatibarang', kecLabel: 'Kec. Jatibarang', photos: 4, geotag: { ok: true, sub: 'Akurasi 6m' }, date: '14 Feb 2026', time: '16:45 WIB (Kemarin)', status: 'butuh_bukti', verifier: 'Foto plafon agak buram', image: null },
  { id: 'BRB-2026-001284', channel: { icon: 'public', label: 'Web Portal' }, title: 'Jembatan Gantung Desa Kedungbokor Goyang & Baut Terlepas', desc: 'Tali seling penahan sisi barat mulai renggang dan papan lintasan berlubang. Digunakan anak-anak sekolah setiap hari menyeberangi sungai.', reporter: 'M. Ridwan', note: 'KTP Terverifikasi (Brebes)', noteStrong: true, category: 'infrastruktur', categoryLabel: 'Infrastruktur Jalan', kecamatan: 'larangan', kecLabel: 'Kec. Larangan', photos: 3, geotag: { ok: true, sub: 'Akurasi 4m' }, date: '14 Feb 2026', time: '14:10 WIB (Kemarin)', status: 'menunggu', verifier: 'Potensi rawan darurat', image: null },
];

// Tombol aksi di tiap baris mengikuti status
export const rowActions = {
  menunggu: { label: 'Verifikasi', icon: 'rule', primary: true },
  ditelaah: { label: 'Lanjutkan', icon: 'edit_note' },
  butuh_bukti: { label: 'Minta Foto', icon: 'mark_chat_unread' },
  duplikasi: { label: 'Tinjau', icon: 'content_copy' },
  valid: { label: 'Selesai', icon: 'check', disabled: true },
};
