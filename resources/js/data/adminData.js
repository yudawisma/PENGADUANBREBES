// Data contoh untuk dashboard admin. Nanti ganti dengan data dari API Laravel.

export const adminStats = [
  { label: 'Total Aduan Masuk', labelClass: 'text-on-surface-variant', icon: 'inbox', iconBox: 'bg-surface-container text-primary', blob: 'bg-primary/5 group-hover:bg-primary/10', value: '4.821', valueClass: 'text-primary', aside: { text: '+12%', className: 'font-label-sm text-label-sm text-secondary flex items-center', icon: 'trending_up' }, note: 'Akumulasi per T.A. 2024' },
  { label: 'Perlu Verifikasi Cepat', labelClass: 'text-tertiary-container font-semibold', icon: 'priority_high', filled: true, iconBox: 'bg-tertiary-fixed text-on-tertiary-fixed', blob: 'bg-tertiary-container/10 group-hover:bg-tertiary-container/20', value: '28', valueClass: 'text-tertiary-container', aside: { text: 'Baru Masuk', className: 'px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed-variant font-label-sm text-label-sm' }, note: 'Batas SLA telaah < 2 jam' },
  { label: 'Dikerjakan SKPD', labelClass: 'text-on-surface-variant', icon: 'engineering', iconBox: 'bg-secondary-fixed text-secondary', blob: 'bg-secondary-fixed/30 group-hover:bg-secondary-fixed/50', value: '342', valueClass: 'text-primary', aside: { text: 'unit kerja aktif', className: 'font-label-sm text-label-sm text-outline' }, progress: 68 },
  { label: 'Penyelesaian Bulan Ini', labelClass: 'text-on-surface-variant', icon: 'verified', iconBox: 'bg-surface-container text-primary', blob: 'bg-surface-variant/40 group-hover:bg-surface-variant/70', value: '96.4%', valueClass: 'text-primary', aside: { text: 'Tinggi', className: 'font-label-sm text-label-sm text-secondary font-semibold' }, note: 'Target SPM Pemkab: 90%' },
  { label: 'Rata Respon Awal', labelClass: 'text-on-surface-variant', icon: 'speed', iconBox: 'bg-surface-container text-primary', blob: 'bg-primary/5 group-hover:bg-primary/10', value: '1.8', valueClass: 'text-primary', aside: { text: 'Jam', className: 'font-label-md text-label-md text-on-surface-variant font-medium' }, note: 'Turun 24 mnt vs bln lalu' },
];

export const regionalPills = [
  { dot: 'bg-tertiary-container animate-ping', title: 'Koridor Pantura (Brebes, Wanasari, Bulakamba)', text: '148 aduan jalan berlubang & drainase tersumbat' },
  { dot: 'bg-secondary-container', title: 'Brebes Selatan (Bumiayu, Sirampog, Paguyangan)', text: '64 aduan longsor lereng & irigasi sawah' },
];

export const opdLoad = [
  { name: 'DPU (Pekerjaan Umum)', load: '142 Aktif / 87% Kapasitas', pct: 87, loadClass: 'text-tertiary-container', bar: 'bg-tertiary-container', note: 'Dominan: Penambalan aspal lingkar Ketanggungan' },
  { name: 'Dishub (Perhubungan)', load: '78 Aktif / 54% Kapasitas', pct: 54, loadClass: 'text-secondary', bar: 'bg-secondary-container', note: 'Dominan: LPJU padam jalur alternatif Jatibarang' },
  { name: 'DLH (Lingkungan Hidup)', load: '56 Aktif / 41% Kapasitas', pct: 41, loadClass: 'text-primary', bar: 'bg-primary', note: 'Dominan: TPS Liar Pasar Brebes & sungai Kali Pemali' },
];

export const opdSmall = [
  { name: 'Satpol PP', count: '39 Aduan', note: 'Tertib PKL' },
  { name: 'Dinkes Brebes', count: '27 Aduan', note: 'Pelayanan Faskes' },
];

export const dinasOptions = [
  { value: 'dpu', short: 'DPU Bina Marga', full: 'DPU Bina Marga Kab. Brebes', icon: 'handyman' },
  { value: 'dishub', short: 'Dishub Brebes', full: 'Dishub Brebes', icon: 'traffic' },
  { value: 'dlh', short: 'DLH Kebersihan', full: 'DLH Lingkungan Hidup', icon: 'recycling' },
  { value: 'satpolpp', short: 'Satpol PP', full: 'Satpol PP Brebes', icon: 'shield' },
  { value: 'dinkes', short: 'Dinkes Brebes', full: 'Dinkes Brebes', icon: 'local_hospital' },
];

export const pejabatOptions = [
  'Ir. H. Sudirman, M.T. (Kabid Bina Marga)',
  'Bambang Haryanto, S.T. (Kasi Pemeliharaan)',
  'Tim Reaksi Cepat UPT Wilayah Tanjung',
];

export const stageOptions = [
  { key: 'Diverifikasi', icon: 'verified', status: 'Verifikasi Cepat' },
  { key: 'Diteruskan', icon: 'alt_route', status: 'Diteruskan ke SKPD' },
  { key: 'Dikerjakan', icon: 'handyman', status: 'Sedang Dikerjakan' },
  { key: 'Selesai', icon: 'task_alt', status: 'Selesai (Verifikasi)' },
];

export const priorityStyles = {
  darurat: { label: 'Darurat', badge: 'bg-error-container text-on-error-container', dot: true },
  tinggi: { label: 'Tinggi', badge: 'bg-tertiary-fixed text-on-tertiary-fixed-variant' },
  normal: { label: 'Normal', badge: 'bg-surface-container-high text-on-surface-variant' },
};

export const statusStyles = {
  'Verifikasi Cepat': 'bg-surface-variant text-on-primary-fixed-variant',
  'Diteruskan ke SKPD': 'bg-secondary-fixed text-on-secondary-fixed',
  'Sedang Dikerjakan': 'bg-tertiary-fixed-dim text-on-tertiary-fixed',
  'Selesai (Verifikasi)': 'bg-surface-container-highest text-primary',
};

export const initialTickets = [
  { id: 'LPR-2024-8841', ago: '14 Menit lalu', category: 'Jalan Ambles / Berlubang', desc: 'Kedalaman 40cm mengancam pengendara motor', kecamatan: 'bulakamba', kecLabel: 'Kec. Bulakamba', address: 'Jl. Raya Pantura KM 14, Ds. Kluwut', dinas: 'dpu', priority: 'darurat', stage: 'Diverifikasi', reporter: 'Ahmad Fajar (NIK: 332909*****)', phone: '0819-3321-xxxx', instruction: 'Regu 3 UPT Tanjung diarahkan melakukan cold-mix patching darurat pada KM 14 sebelum pukul 17:00 WIB guna mencegah kecelakaan malam hari.', image: null, action: { label: 'Disposisi', icon: 'arrow_forward', primary: true } },
  { id: 'LPR-2024-8839', ago: '42 Menit lalu', category: 'LPJU Mati Total', desc: 'Lampu jalan 6 titik gelap gulita rawan begal', kecamatan: 'jatibarang', kecLabel: 'Kec. Jatibarang', address: 'Jl. Raya Jatibarang-Slawi KM 3', dinas: 'dishub', priority: 'tinggi', stage: 'Diteruskan', reporter: 'Warga Brebes (Anonim)', phone: '0812-xxxx-xxxx', instruction: '', image: null, action: { label: 'Detail', icon: 'edit_note' } },
  { id: 'LPR-2024-8827', ago: '1.5 Jam lalu', category: 'Sampah Liar Menumpuk', desc: 'Tumpukan sampah pasar meluber ke bahu jalan', kecamatan: 'brebes', kecLabel: 'Kec. Brebes Kota', address: 'Belakang Pasar Induk Brebes', dinas: 'dlh', priority: 'normal', stage: 'Dikerjakan', reporter: 'Warga Brebes (Anonim)', phone: '0812-xxxx-xxxx', instruction: '', image: null, action: { label: 'Update', icon: 'tune' } },
  { id: 'LPR-2024-8815', ago: '3 Jam lalu', category: 'PKL Tutup Trotoar Publik', desc: 'Pedestrian dipasang tenda semi permanen', kecamatan: 'bumiayu', kecLabel: 'Kec. Bumiayu', address: 'Depan RSUD Bumiayu', dinas: 'satpolpp', priority: 'normal', stage: 'Selesai', reporter: 'Warga Brebes (Anonim)', phone: '0812-xxxx-xxxx', instruction: '', image: null, action: { label: 'Arsip', icon: 'visibility' } },
];
