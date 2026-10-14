import Icon from '../common/Icon';
import QuickMetrics from './QuickMetrics';
import LiveMapCard from './LiveMapCard';

export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden rounded-3xl bg-surface-container-lowest p-space-lg lg:p-space-xl shadow-sm mb-space-xl">
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-primary-fixed/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-tertiary-fixed/30 rounded-full blur-2xl pointer-events-none" />

      <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">
        <div className="lg:col-span-7 flex flex-col items-start gap-space-md">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container text-on-surface-variant text-label-sm font-label-sm shadow-sm">
            <span className="text-base">🏛️</span>
            <span className="font-semibold text-primary">Platform Resmi Pengaduan Masyarakat</span>
            <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
            <span>Kabupaten Brebes • Tanpa Login</span>
          </div>

          <div className="space-y-space-sm">
            <h1 className="font-headline-xl text-headline-xl text-primary tracking-tight leading-tight">
              Laporkan Masalah di{' '}
              <span className="text-tertiary-container relative inline-block">
                Sekitar Anda
                <svg className="absolute left-0 -bottom-1 w-full h-2 text-tertiary-fixed-dim" preserveAspectRatio="none" viewBox="0 0 100 12">
                  <path d="M0,8 Q50,0 100,8" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth={4} />
                </svg>
              </span>
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
              Temukan jalan berlubang, lampu padam, atau tumpukan sampah? Sampaikan laporan langsung kepada instansi
              terkait di lingkungan Kabupaten Brebes secara instan, aman, dan 100% transparan.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-space-md pt-space-xs w-full sm:w-auto">
            <a href="#formulir-aduan" className="inline-flex items-center justify-center h-12 px-space-lg rounded-xl bg-tertiary-container text-on-tertiary font-label-lg text-label-lg hover:bg-tertiary transition-all shadow-md hover:shadow-lg">
              <Icon name="add_circle" className="mr-2 text-[20px]" />
              Buat Laporan Sekarang
            </a>
            <a href="#cek-status" className="inline-flex items-center justify-center h-12 px-space-lg rounded-xl bg-primary text-on-primary font-label-lg text-label-lg hover:bg-primary-container transition-all shadow-sm">
              <Icon name="search_check" className="mr-2 text-[20px]" />
              Cek Status Laporan
            </a>
          </div>

          <QuickMetrics />
        </div>

        <div className="lg:col-span-5 w-full">
          <LiveMapCard />
        </div>
      </div>
    </section>
  );
}
