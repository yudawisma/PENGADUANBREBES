import Icon from '../common/Icon';
import Badge from '../common/Badge';
import { latestReports } from '../../data/metrics';

export default function LatestReports() {
  return (
    <section className="w-full mb-space-xl">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-space-lg gap-space-sm">
        <div>
          <span className="font-label-md text-label-md text-secondary font-bold uppercase tracking-wider">Suara Masyarakat Terkini</span>
          <h2 className="font-headline-lg text-headline-lg text-primary tracking-tight mt-1">Laporan Terbaru Warga Brebes</h2>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mt-1">
            Pantau aduan warga di lingkungan sekitar Anda yang baru saja diverifikasi dan sedang ditindaklanjuti.
          </p>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
          <span className="font-label-sm text-label-sm text-primary font-bold">Siaran Langsung Pemkab</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
        {latestReports.map((r) => (
          <div key={r.title} className="bg-surface-container-lowest p-space-md rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-space-sm">
                <Badge tone={r.tone} className="uppercase">{r.status}</Badge>
                <span className="font-label-sm text-label-sm text-on-surface-variant">{r.ago}</span>
              </div>
              <div className="aspect-video w-full rounded-xl overflow-hidden mb-space-sm bg-surface-container flex items-center justify-center">
                {r.image ? (
                  <img src={r.image} alt={r.title} className="w-full h-full object-cover" />
                ) : (
                  <Icon name="image" className="text-[32px] text-on-surface-variant/40" />
                )}
              </div>
              <span className="font-label-sm text-label-sm text-secondary font-semibold">{r.category}</span>
              <h3 className="font-headline-sm text-[16px] text-primary font-bold mt-1 line-clamp-2">{r.title}</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1.5 line-clamp-2">{r.text}</p>
            </div>
            <div className="mt-space-md pt-space-sm border-t border-surface-container flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
                <Icon name="location_on" className="text-[16px]" /> {r.loc}
              </span>
              <span className={`font-label-sm text-label-sm font-bold ${r.agencyColor}`}>{r.agency}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-space-lg p-space-md bg-primary rounded-2xl text-on-primary flex flex-col sm:flex-row items-center justify-between gap-space-md">
        <div className="flex items-center gap-space-md">
          <div className="w-12 h-12 rounded-xl bg-primary-container text-on-primary flex items-center justify-center shrink-0">
            <Icon name="record_voice_over" className="text-[26px]" />
          </div>
          <div>
            <p className="font-headline-sm text-[18px] font-bold">Punya Laporan Masalah Serupa di Wilayah Anda?</p>
            <p className="font-body-sm text-body-sm text-surface-variant">Setiap aduan yang masuk dipantau langsung oleh Bupati &amp; Inspektorat Daerah.</p>
          </div>
        </div>
        <a href="#formulir-aduan" className="h-11 px-space-lg rounded-xl bg-tertiary-container text-on-tertiary font-label-md text-label-md hover:bg-tertiary transition-all whitespace-nowrap flex items-center">
          Tulis Laporan Sekarang
        </a>
      </div>
    </section>
  );
}
