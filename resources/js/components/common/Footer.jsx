import Icon from './Icon';

const contacts = [
  { icon: 'emergency', color: 'text-tertiary-container', text: <>Darurat Brebes Siaga: <strong>112</strong></>, strong: true },
  { icon: 'call', color: 'text-secondary', text: 'Call Center: (0283) 671234' },
  { icon: 'mail', color: 'text-secondary', text: 'lapor@brebeskab.go.id' },
  { icon: 'schedule', color: 'text-secondary', text: 'Senin - Jumat (07.30 - 16.00 WIB)' },
];

const categoryLinks = [
  ['Infrastruktur & Jalan Rusak', 'DPUPR'],
  ['Pelayanan Kesehatan & RSUD', 'Dinkes'],
  ['Bantuan Sosial & Kemiskinan', 'Dinsos'],
  ['Pendidikan & Sekolah', 'Dindikpora'],
  ['Pertanian & Tata Air Bawang', 'Distan'],
];

export default function Footer() {
  return (
    <footer className="w-full bg-surface-container-lowest shadow-[0_-1px_8px_rgba(0,0,0,0.03)] mt-space-xl">
      <div className="max-w-7xl mx-auto px-margin-sm lg:px-margin py-space-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-xl pb-space-xl">
          <div className="space-y-space-md">
            <div className="flex items-center gap-space-sm">
              <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-on-primary">
                <Icon name="verified" className="text-[20px]" />
              </div>
              <div>
                <p className="font-headline-sm text-headline-sm text-primary leading-tight">Pemerintah Kabupaten Brebes</p>
                <p className="font-label-sm text-label-sm text-on-surface-variant uppercase">Layanan Pengaduan Resmi</p>
              </div>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              Kanal aspirasi dan pengaduan daring terpadu untuk masyarakat Kabupaten Brebes. Wujud tata kelola
              pemerintahan yang terbuka, akuntabel, dan solutif.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm">
              <Icon name="policy" className="text-[16px] text-primary" />
              Pakta Transparansi Terbuka
            </div>
          </div>

          <div className="space-y-space-md">
            <h3 className="font-headline-sm text-headline-sm text-primary">Layanan Publik</h3>
            <ul className="space-y-space-sm">
              {contacts.map((c) => (
                <li key={c.icon} className="flex items-center gap-2">
                  <Icon name={c.icon} className={`${c.color} text-[18px]`} />
                  <span className={`font-body-sm text-body-sm ${c.strong ? 'text-on-surface' : 'text-on-surface-variant'}`}>{c.text}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-space-md">
            <h3 className="font-headline-sm text-headline-sm text-primary">Kategori Aduan</h3>
            <ul className="space-y-space-sm font-body-sm text-body-sm text-on-surface-variant">
              {categoryLinks.map(([label, opd]) => (
                <li key={label}>
                  <a href="#peta-publik" className="hover:text-primary transition-colors flex items-center justify-between">
                    {label} <span className="font-label-sm text-label-sm text-outline">{opd}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-space-md">
            <h3 className="font-headline-sm text-headline-sm text-primary">Pilar Integritas</h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              Setiap laporan terlindungi oleh kode anonimitas pelapor dan dipantau langsung oleh Inspektorat Kabupaten Brebes.
            </p>
            <div className="p-space-md rounded-xl bg-surface-container-low space-y-space-xs">
              <p className="font-headline-sm text-headline-sm text-primary">"Suaramu, Perubahan Brebes"</p>
              <p className="font-label-sm text-label-sm text-on-surface-variant">
                Komitmen Bersama Menuju Brebes Berhias &amp; Bermartabat
              </p>
            </div>
          </div>
        </div>

        <div className="pt-space-lg flex flex-col sm:flex-row items-center justify-between gap-space-md">
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            © {new Date().getFullYear()} Pemerintah Kabupaten Brebes. Hak Cipta Dilindungi Undang-Undang.
          </p>
          <div className="flex items-center gap-space-md font-label-sm text-label-sm text-on-surface-variant">
            <a className="hover:text-primary transition-colors" href="#">Ketentuan Layanan</a>
            <a className="hover:text-primary transition-colors" href="#">Kebijakan Privasi Pelapor</a>
            <a className="hover:text-primary transition-colors" href="#">Akses Petugas OPD</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
