import Icon from '../common/Icon';
import CaseTimeline from './CaseTimeline';
import RatingBox from './RatingBox';
import { toneStyles } from '../../data/tickets';

const stepLabels = ['1. Diterima', '2. Validasi OPD', '3. Pengerjaan', '4. Selesai'];

function ProgressBar({ step }) {
  const fill = step >= 4 ? 100 : ((step - 1) / 3) * 100;
  return (
    <div className="py-6 my-2 bg-surface-container-low/50 rounded-2xl px-4 sm:px-6">
      <div className="flex items-center justify-between text-center relative">
        <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-1 bg-surface-container-high -z-0">
          <div className="h-1 bg-secondary transition-all duration-500" style={{ width: `${fill}%` }} />
        </div>
        {stepLabels.map((label, i) => {
          const n = i + 1;
          const done = n < step || step >= 4;
          const active = n === step && step < 4;
          return (
            <div key={label} className="flex flex-col items-center gap-2 relative z-10">
              {done && (
                <div className="w-10 h-10 rounded-full bg-secondary text-on-secondary flex items-center justify-center shadow-sm">
                  <Icon name="check" className="text-[18px]" />
                </div>
              )}
              {active && (
                <div className="w-10 h-10 rounded-full bg-tertiary-container text-on-tertiary flex items-center justify-center shadow-md animate-bounce">
                  <Icon name="engineering" className="text-[20px]" />
                </div>
              )}
              {!done && !active && (
                <div className="w-10 h-10 rounded-full bg-surface-container-high text-outline flex items-center justify-center font-label-sm text-label-sm">{n}</div>
              )}
              <span className={`font-label-sm text-label-sm ${active ? 'text-tertiary-container font-bold' : done ? 'text-primary font-semibold' : 'text-outline'}`}>{label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function CaseFileCard({ ticket }) {
  const tone = toneStyles[ticket.tone];

  return (
    <div id="case-file-card" className="lg:col-span-8 flex flex-col gap-space-lg transition-all duration-300">
      <div className="bg-surface-container-lowest rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full font-label-sm text-label-sm bg-surface-container-high text-primary">BERKAS PENGADUAN AKTIF</span>
              <span className="inline-flex items-center gap-1 font-label-sm text-label-sm text-outline">
                <Icon name="security" className="text-[16px] text-tertiary-container" />
                Anonimitas Terproteksi
              </span>
            </div>
            <h2 className="font-headline-lg text-headline-lg text-primary tracking-tight font-bold">{ticket.code}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-1.5 gap-x-6 text-on-surface-variant font-body-sm text-body-sm pt-1">
              <div className="flex items-center gap-2">
                <Icon name="category" className="text-secondary text-[18px]" />
                <span>Kategori: <strong className="text-on-surface font-semibold">{ticket.category}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="location_on" className="text-tertiary-container text-[18px]" />
                <span className="truncate">{ticket.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="schedule" className="text-outline text-[18px]" />
                <span>Diajukan: <strong>{ticket.submittedAt}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="account_circle" className="text-outline text-[18px]" />
                <span>Pelapor: <strong>{ticket.reporter}</strong></span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:items-end gap-1">
            <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Status Penanganan</span>
            <span className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full font-label-md text-label-md shadow-xs ${tone.badge}`}>
              <span className={`w-2.5 h-2.5 rounded-full animate-pulse ${tone.dot}`} />
              {ticket.statusLabel}
            </span>
            <span className="font-label-sm text-label-sm text-outline mt-1">{ticket.agency}</span>
          </div>
        </div>

        <ProgressBar step={ticket.step} />

        <div className="pt-6 space-y-4">
          <div>
            <h3 className="font-headline-sm text-headline-sm text-primary">Detail Deskripsi Masalah</h3>
            <p className="font-body-md text-body-md text-on-surface-variant mt-1 leading-relaxed bg-surface-container-low p-4 rounded-xl">
              "{ticket.description}"
            </p>
          </div>

          <div className="pt-2">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-headline-sm text-headline-sm text-primary">Dokumentasi Bukti Lapangan</h4>
              <span className="font-label-sm text-label-sm text-outline">Geotagging Terverifikasi GPS</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {ticket.evidence.map((ev) => (
                <div key={ev.tag} className="group relative rounded-2xl overflow-hidden bg-surface-container shadow-xs h-52">
                  {ev.image ? (
                    <img src={ev.image} alt={ev.caption} className="w-full h-52 object-cover transition-transform group-hover:scale-105 duration-300" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Icon name="image" className="text-[40px] text-on-surface-variant/40" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent flex flex-col justify-end p-4 text-on-primary">
                    <div className="flex items-center justify-between">
                      <span className={`px-2.5 py-1 rounded-md font-label-sm text-label-sm uppercase font-bold ${ev.tagClass}`}>{ev.tag}</span>
                      <span className="font-label-sm text-label-sm text-surface-variant">{ev.date}</span>
                    </div>
                    <p className="font-body-sm text-body-sm text-surface-container-lowest mt-1">{ev.caption}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <CaseTimeline items={ticket.timeline} />
          <RatingBox key={ticket.code} ticketCode={ticket.code} />
        </div>
      </div>
    </div>
  );
}
