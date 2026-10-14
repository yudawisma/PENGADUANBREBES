import { useState } from 'react';
import Icon from '../common/Icon';
import Badge from '../common/Badge';
import { ticketTimeline } from '../../data/metrics';

function Dot({ state }) {
  if (state === 'done')
    return (
      <div className="w-7 h-7 rounded-full bg-green-600 text-white flex items-center justify-center shadow-sm z-10">
        <Icon name="check" className="text-[16px]" />
      </div>
    );
  if (state === 'active')
    return (
      <div className="w-7 h-7 rounded-full bg-tertiary-container text-on-tertiary flex items-center justify-center shadow-md ring-4 ring-tertiary-container/20 z-10 animate-pulse">
        <Icon name="engineering" className="text-[16px]" />
      </div>
    );
  return (
    <div className="w-7 h-7 rounded-full bg-surface-container text-on-surface-variant flex items-center justify-center z-10">
      <Icon name="schedule" className="text-[16px]" />
    </div>
  );
}

export default function StatusTracker() {
  const [ticket, setTicket] = useState('BRB-2026-001284');

  const handleSearch = (e) => {
    e.preventDefault();
    // TODO: fetch(`/api/tickets/${ticket}`) ke Laravel lalu tampilkan hasilnya
    console.log('Cari tiket:', ticket);
  };

  return (
    <section id="cek-status" className="w-full bg-surface-container-lowest p-space-lg lg:p-space-xl rounded-3xl shadow-sm mb-space-xl">
      <div className="max-w-4xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-space-lg">
          <span className="font-label-md text-label-md text-secondary font-bold uppercase tracking-wider">Transparansi Real-Time</span>
          <h2 className="font-headline-lg text-headline-lg text-primary tracking-tight mt-1">Pantau Perkembangan Pengaduan</h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">
            Lacak setiap tahap investigasi dan aksi perbaikan tim OPD Pemkab Brebes menggunakan kode tiket unik Anda.
          </p>
        </div>

        <div className="p-space-sm bg-surface-container-low rounded-2xl shadow-inner mb-space-lg">
          <form className="flex flex-col sm:flex-row gap-2" onSubmit={handleSearch}>
            <div className="relative flex-1">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-on-surface-variant">
                <Icon name="confirmation_number" className="text-[20px]" />
              </span>
              <input
                type="text"
                value={ticket}
                onChange={(e) => setTicket(e.target.value)}
                placeholder="Masukkan Kode Tiket (Contoh: BRB-2026-001284)"
                className="w-full h-12 pl-10 pr-4 rounded-xl bg-surface-container-lowest text-on-surface font-body-md font-mono focus:outline-none focus:ring-2 focus:ring-secondary uppercase transition-all"
              />
            </div>
            <button type="submit" className="h-12 px-space-lg rounded-xl bg-primary text-on-primary font-label-lg text-label-lg hover:bg-primary-container transition-all flex items-center justify-center gap-2">
              <Icon name="search" className="text-[20px]" />
              Lacak Tiket
            </button>
          </form>
        </div>

        <div className="bg-surface-container-low p-space-md lg:p-space-lg rounded-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-space-md gap-space-sm border-b border-surface-container">
            <div>
              <div className="flex items-center gap-space-sm">
                <span className="font-mono font-bold text-headline-sm text-primary">#BRB-2026-001284</span>
                <Badge tone="amber" className="px-3 py-1 uppercase tracking-wider">Sedang Diproses</Badge>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-primary mt-1">
                Jalan Rusak Berlubang Parah di Jl. Raya Jatibarang - Brebes
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-2 mt-0.5">
                <Icon name="location_on" className="text-[16px] text-tertiary-container" />
                Kecamatan Jatibarang (Dekat Pasar Jatibarang) • Dilaporkan 14 Okt 2026
              </p>
            </div>
            <span className="px-3 py-1.5 bg-surface-container rounded-xl font-label-sm text-label-sm text-primary font-medium self-start sm:self-auto">
              Instansi: DPUPR Brebes
            </span>
          </div>

          <div className="pt-space-lg pl-2 sm:pl-4 space-y-space-lg relative before:absolute before:inset-y-0 before:left-5 sm:before:left-7 before:w-0.5 before:bg-surface-container-high">
            {ticketTimeline.map((t) => {
              const active = t.state === 'active';
              return (
                <div key={t.title} className={`relative flex items-start gap-space-md ${t.state === 'pending' ? 'opacity-60' : ''}`}>
                  <Dot state={t.state} />
                  <div className={`flex-1 bg-surface-container-lowest p-space-sm rounded-xl ${active ? 'border-l-4 border-tertiary-container shadow-sm' : ''}`}>
                    <div className="flex items-center justify-between gap-2">
                      <p className={`font-label-md text-label-md font-bold ${active ? 'text-tertiary-container' : t.state === 'pending' ? 'text-on-surface-variant' : 'text-primary'}`}>
                        {t.title}
                      </p>
                      <span className={`font-label-sm text-label-sm shrink-0 ${active ? 'text-tertiary-container font-semibold' : 'text-on-surface-variant'}`}>{t.time}</span>
                    </div>
                    <p className={`font-body-sm text-body-sm mt-0.5 ${active ? 'text-on-surface mt-1' : 'text-on-surface-variant'}`}>{t.text}</p>
                    {t.note && (
                      <div className="mt-space-sm p-2 bg-surface-container-low rounded-lg flex items-center gap-2">
                        <Icon name="info" className="text-secondary text-[18px]" />
                        <span className="font-label-sm text-label-sm text-on-surface-variant">{t.note}</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
