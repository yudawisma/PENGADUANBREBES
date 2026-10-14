export const heroMetrics = [
  { value: '18.4 Jam', label: 'Rata-rata Respon', color: 'text-primary' },
  { value: '91.0%', label: 'Penyelesaian SLA', color: 'text-secondary' },
  { value: '17 Kec.', label: 'Cakupan Wilayah', color: 'text-tertiary-container' },
];

export const stats = [
  { label: 'Total Laporan Masuk', value: '4.821', valueColor: 'text-primary', sub: '+184 aduan bulan ini', subColor: 'text-secondary font-semibold', bar: 'bg-primary', width: 'w-full' },
  { label: 'Selesai Ditangani', value: '4.389', valueColor: 'text-green-700', sub: '91.0% Tingkat Keberhasilan', subColor: 'text-green-700 font-bold', bar: 'bg-green-600', width: 'w-[91%]' },
  { label: 'Sedang Ditindaklanjuti', value: '342', valueColor: 'text-amber-700', sub: 'Dalam masa tenggang SLA', subColor: 'text-amber-700 font-medium', bar: 'bg-amber-500', width: 'w-[7%]' },
  { label: 'Rerata Respon Pertama', value: '18.4', valueColor: 'text-tertiary-container', sub: 'Jam Kerja (< Target 24 Jam)', subColor: 'text-tertiary-container font-bold', bar: 'bg-tertiary-container', width: 'w-[76%]' },
];

export const monthlyTrend = [
  { month: 'Mei', pct: 87 }, { month: 'Jun', pct: 89 }, { month: 'Jul', pct: 86 },
  { month: 'Agu', pct: 92 }, { month: 'Sep', pct: 90 }, { month: 'Okt', pct: 94, current: true },
];

export const agencyPerformance = [
  { name: 'DPUPR (Bina Marga)', time: '14.2 Jam', dot: 'bg-green-500', color: 'text-green-700' },
  { name: 'Dishub (PJU & Lalu Lintas)', time: '16.8 Jam', dot: 'bg-green-500', color: 'text-green-700' },
  { name: 'DLH (Pengelolaan Sampah)', time: '19.5 Jam', dot: 'bg-secondary', color: 'text-secondary' },
  { name: 'Disdukcapil (Adminduk)', time: '21.0 Jam', dot: 'bg-secondary', color: 'text-secondary' },
];

export const ticketTimeline = [
  { state: 'done', title: 'Laporan Masuk Sistem Terpadu', time: '14 Okt 2026, 08:30 WIB', text: 'Pengaduan tercatat melalui kanal daring portal publik Lapor Brebes dengan bukti lampiran 2 foto.' },
  { state: 'done', title: 'Verifikasi Lapangan & Validasi Data', time: '14 Okt 2026, 09:15 WIB', text: 'Diverifikasi oleh Tim Helpdesk Diskominfo & Inspektorat. Kondisi valid dan memenuhi unsur urgensi keselamatan warga.' },
  { state: 'done', title: 'Diteruskan ke DPUPR (Dinas Pekerjaan Umum & Penataan Ruang)', time: '14 Okt 2026, 10:00 WIB', text: 'Disposisi ditandatangani Kepala Bidang Bina Marga. Surat tugas regu reaksi cepat (URC) diterbitkan.' },
  { state: 'active', title: 'Unit Reaksi Cepat Melakukan Perbaikan & Penambalan Aspal (Hotmix)', time: '14 Okt 2026, 14:20 WIB', text: 'Regu 2 Bina Marga DPUPR sedang berada di lokasi untuk penambalan lubang sedalam 15cm dengan material campuran aspal panas demi mencegah kecelakaan kendaraan bermotor.', note: 'Estimasi pekerjaan tuntas: 18:00 WIB Hari Ini' },
  { state: 'pending', title: 'Penyelesaian Akhir & Umpan Balik Warga', time: 'Menunggu Tindakan Tuntas', text: 'Unggah foto hasil penanganan selesai dan konfirmasi kepuasan pelayanan oleh pelapor.' },
];

export const latestReports = [
  { tone: 'amber', status: 'Diproses', ago: '15 menit yang lalu', category: 'Infrastruktur Jalan', title: 'Aspal Mengelupas & Berlubang Membahayakan Pengendara Motor di Ruas Bulakamba', text: 'Lubang sedalam 10 cm tertutup genangan air pasca hujan lebat kemarin sore. Sangat rawan bagi pemudik dan pelajar.', loc: 'Kec. Bulakamba', agency: 'DPUPR Brebes', agencyColor: 'text-primary', image: null },
  { tone: 'green', status: 'Selesai', ago: '1 jam yang lalu', category: 'Kebersihan & DLH', title: 'Pembersihan Sampah Liar Menumpuk di Bantaran Sungai Sigeleng', text: 'Truk kontainer pengangkut sampah DLH Kabupaten Brebes telah mengangkut 4 ton sampah liar dan memasang plang larangan.', loc: 'Kec. Brebes Kota', agency: 'Tuntas Ditangani', agencyColor: 'text-green-700', image: null },
  { tone: 'blue', status: 'Diverifikasi', ago: '3 jam yang lalu', category: 'PJU & Keamanan', title: 'Tiang Penerangan Jalan Umum Miring di Tanjakan Paguyangan - Bumiayu', text: 'Tiang besi condong ke arah badan jalan setelah tersenggol dahan pohon tumbang. Memerlukan penarikan ulang tali pengaman.', loc: 'Kec. Paguyangan', agency: 'Dishub Brebes', agencyColor: 'text-primary', image: null },
];
