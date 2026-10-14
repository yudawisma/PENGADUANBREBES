import Icon from './Icon';

const navItems = [
  { label: 'Beranda', href: '/' },
  { label: 'Cara Kerja', href: '/#cara-kerja' },
  { label: 'Cek Laporan', href: '/cek-laporan' },
  { label: 'Peta Masalah', href: '/#peta-publik' },
  { label: 'Statistik', href: '/#statistik' },
  { label: 'Dashboard Admin', href: '/admin' },
];

export default function Header({ active = 'Beranda' }) {
  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50 bg-surface-container-lowest/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="h-20 max-w-7xl mx-auto px-margin-sm lg:px-margin flex items-center justify-between gap-space-md">
        <div className="flex items-center gap-space-lg">
          <a className="flex items-center gap-space-sm group" href="/">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-on-primary shadow-sm">
              <Icon name="location_city" className="text-[22px]" />
            </div>
            <div className="flex flex-col">
              <span className="font-headline-sm text-headline-sm text-primary leading-tight tracking-tight flex items-center gap-1">
                Lapor Brebes <Icon name="location_on" className="text-tertiary-container text-[18px]" />
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                Pemkab Brebes
              </span>
            </div>
          </a>
          <nav className="hidden xl:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = item.label === active;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={
                    isActive
                      ? 'px-3 py-2 transition-colors bg-surface-container text-primary font-label-md rounded-lg'
                      : 'px-3 py-2 rounded-lg font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors'
                  }
                >
                  {item.label}
                </a>
              );
            })}
          </nav>
        </div>
        <div className="flex items-center gap-space-md">
          <a
            href="/#formulir-aduan"
            className="inline-flex items-center justify-center h-12 px-space-lg rounded-xl bg-tertiary-container text-on-tertiary font-label-lg text-label-lg hover:bg-tertiary transition-all shadow-[0_2px_8px_rgba(111,36,0,0.2)] hover:shadow-none"
          >
            <Icon name="campaign" className="mr-2 text-[20px]" />
            Buat Laporan
          </a>
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <Icon name="person" className="text-on-primary text-[18px]" />
          </div>
        </div>
      </div>
    </header>
  );
}
