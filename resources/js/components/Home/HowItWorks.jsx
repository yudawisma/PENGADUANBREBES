import Icon from '../common/Icon';

const steps = [
  {
    no: '01', badge: 'bg-surface-container text-primary', title: 'Pilih Kategori Masalah',
    text: 'Tentukan jenis laporan Anda dari infrastruktur jalan, sanitasi lingkungan, hingga pelayanan birokrasi pemerintahan daerah.',
    icon: 'check_circle', foot: 'Tanpa Perlu Login / Registrasi Akun',
  },
  {
    no: '02', badge: 'bg-tertiary-fixed text-tertiary-container', title: 'Lengkapi Bukti & Lokasi',
    text: 'Sertakan foto bukti kejadian, pin titik koordinat peta lokasi di kecamatan Anda, dan beri deskripsi singkat yang jelas.',
    icon: 'pin_drop', foot: 'Dukungan Deteksi Lokasi Otomatis GPS',
  },
  {
    no: '03', badge: 'bg-secondary-fixed text-secondary', title: 'Pantau Tindak Lanjut',
    text: null, icon: 'notifications_active', foot: 'Notifikasi Status via WhatsApp (Opsional)',
  },
];

export default function HowItWorks() {
  return (
    <section id="cara-kerja" className="w-full bg-surface-container-low p-space-lg lg:p-space-xl rounded-3xl mb-space-xl">
      <div className="text-center max-w-2xl mx-auto mb-space-xl">
        <span className="font-label-md text-label-md text-secondary font-bold uppercase tracking-wider">Alur Pengaduan Transparan</span>
        <h2 className="font-headline-lg text-headline-lg text-primary tracking-tight mt-1">Melapor Hanya 3 Langkah Mudah</h2>
        <p className="font-body-md text-body-md text-on-surface-variant mt-2">
          Kami memotong birokrasi berbelit. Siapa pun dapat melapor secara anonim tanpa harus mendaftar akun sebelumnya.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg relative">
        {steps.map((s) => (
          <div key={s.no} className="bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm relative flex flex-col justify-between">
            <div className="space-y-space-md">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-headline-md font-bold ${s.badge}`}>{s.no}</div>
              <div>
                <h3 className="font-headline-sm text-headline-sm text-primary mb-1">{s.title}</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  {s.text ?? (
                    <>
                      Dapatkan Kode Tiket Unik resmi (misal:{' '}
                      <code className="bg-surface-container px-1 py-0.5 rounded font-mono font-bold text-primary">BRB-2026-001284</code>
                      ) untuk memantau progress penanganan OPD.
                    </>
                  )}
                </p>
              </div>
            </div>
            <div className="mt-space-lg pt-space-sm flex items-center gap-2 text-primary font-label-sm text-label-sm">
              <Icon name={s.icon} className="text-[18px] text-secondary" />
              {s.foot}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
