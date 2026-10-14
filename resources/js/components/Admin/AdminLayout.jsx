import { Link, usePage } from '@inertiajs/react';
import Icon from '../common/Icon';

// Semua menu admin ada di sini. Tambah menu baru cukup tambah satu objek.
const sections = [
  {
    title: 'Menu Utama',
    items: [
      { label: 'Ringkasan Aduan', icon: 'dashboard', href: '/admin', exact: true, badge: { dot: true } },
      { label: 'Verifikasi Laporan', icon: 'fact_check', href: '/admin/verifikasi', badge: { text: '28 Baru', className: 'bg-tertiary-fixed text-on-tertiary-fixed-variant font-bold shadow-sm' } },
    ],
  },
  {
    title: 'Analitik & Monitoring',
    items: [
      { label: 'Peta Sebaran Kasus', icon: 'explore', href: '/admin/peta', badge: { text: '17 Kec.', pulse: true, className: 'bg-surface-container text-primary font-semibold' } },
      { label: 'Statistik & Kinerja OPD', icon: 'monitoring', href: '/admin/statistik', badge: { text: '96.4% SPM', className: 'bg-secondary-fixed/50 text-secondary font-bold' } },
    ],
  },
];

function Badge({ badge, active }) {
  if (!badge) return null;
  if (badge.dot) return <span className={`w-2 h-2 rounded-full ${active ? 'bg-on-primary-container' : 'bg-secondary-fixed'}`} />;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full font-label-sm text-[11px] ${badge.className}`}>
      {badge.pulse && <span className="w-1.5 h-1.5 rounded-full bg-secondary-container animate-pulse" />}
      {badge.text}
    </span>
  );
}

function Sidebar() {
  const { url } = usePage();
  const path = url.split('?')[0];

  return (
    <aside className="fixed left-0 top-0 h-full w-72 bg-surface-container-low shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-50 flex flex-col justify-between py-space-lg">
      <div className="flex flex-col gap-space-lg">
        <div className="px-space-lg flex items-center gap-space-sm">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-on-primary shadow-sm">
            <Icon name="location_city" className="text-[22px]" />
          </div>
          <div>
            <span className="font-headline-sm text-headline-sm text-primary block leading-tight">Lapor Brebes</span>
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Portal OPD &amp; Admin</span>
          </div>
        </div>

        <nav className="flex flex-col px-space-md gap-space-xs">
          {sections.map((sec, i) => (
            <div key={sec.title} className="flex flex-col gap-space-xs">
              <div className={`px-3 pb-1 ${i === 0 ? 'pt-2' : 'pt-4'}`}>
                <span className="font-label-sm text-[11px] font-bold text-outline uppercase tracking-wider">{sec.title}</span>
              </div>
              {sec.items.map((it) => {
                const active = it.exact ? path === it.href : path.startsWith(it.href);
                return (
                  <Link
                    key={it.href}
                    href={it.href}
                    aria-current={active ? 'page' : undefined}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl font-label-md text-label-md transition-colors group ${
                      active ? 'bg-primary-container text-on-primary-container' : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                    }`}
                  >
                    <div className="flex items-center">
                      <Icon name={it.icon} className={`mr-3 text-[20px] ${active ? '' : 'group-hover:text-primary transition-colors'}`} />
                      <span>{it.label}</span>
                    </div>
                    <Badge badge={it.badge} active={active} />
                  </Link>
                );
              })}
            </div>
          ))}

          <div className="px-3 pt-4 pb-1">
            <span className="font-label-sm text-[11px] font-bold text-outline uppercase tracking-wider">Akses Publik</span>
          </div>
          <a href="/" target="_blank" rel="noopener" className="flex items-center justify-between px-3.5 py-2.5 rounded-xl font-label-md text-label-md text-on-surface-variant hover:bg-surface-container hover:text-primary transition-colors group">
            <div className="flex items-center">
              <Icon name="travel_explore" className="mr-3 text-[20px] group-hover:text-secondary transition-colors" />
              <span>Lihat Portal Warga</span>
            </div>
            <div className="flex items-center gap-1 text-outline group-hover:text-primary transition-colors">
              <span className="px-1.5 rounded bg-surface-container-highest/60 font-label-sm text-[10px] uppercase font-bold text-on-surface-variant">Web</span>
              <Icon name="open_in_new" className="text-[16px]" />
            </div>
          </a>
        </nav>
      </div>

      <div className="px-space-md flex flex-col gap-space-sm">
        <div className="p-space-md rounded-xl bg-surface-container-highest/60 flex items-center gap-space-sm">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <Icon name="person" className="text-on-primary text-[18px]" />
          </div>
          <div className="flex flex-col">
            <span className="font-label-md text-label-md text-on-surface leading-tight">Admin Diskominfo</span>
            <span className="font-label-sm text-label-sm text-on-surface-variant">Pemkab Brebes</span>
          </div>
        </div>
      </div>
    </aside>
  );
}

function Topbar() {
  return (
    <header className="fixed top-0 left-72 right-0 h-20 bg-surface-container-lowest/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 flex items-center justify-between px-space-xl">
      <span className="font-label-md text-label-md text-on-surface-variant flex items-center gap-1">
        <Icon name="verified_user" className="text-[18px]" />
        Sistem Manajemen Pengaduan Pelayanan Publik
      </span>
      <div className="flex items-center gap-space-md">
        <a href="/#formulir-aduan" className="inline-flex items-center justify-center h-10 px-4 rounded-xl bg-tertiary-container text-on-tertiary font-label-md text-label-md hover:bg-tertiary transition-colors shadow-sm">
          <Icon name="add" className="mr-1.5 text-[18px]" />
          Input Aduan Manual
        </a>
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
          <Icon name="person" className="text-on-primary text-[18px]" />
        </div>
      </div>
    </header>
  );
}

export default function AdminLayout({ children }) {
  return (
    <>
      <Sidebar />
      <div className="pl-72 flex flex-col min-h-screen">
        <Topbar />
        <main className="relative pt-20 bg-background flex-1 w-full px-space-xl pb-space-xl">
          <div className="flex flex-col w-full gap-space-lg">{children}</div>
        </main>
      </div>
    </>
  );
}