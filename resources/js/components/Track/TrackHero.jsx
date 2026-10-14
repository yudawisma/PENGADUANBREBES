import Icon from '../common/Icon';
import { sampleChips } from '../../data/tickets';

export default function TrackHero({ query, onQueryChange, onSearch, onPick, error }) {
  return (
    <section className="relative pt-space-lg pb-space-xl px-4 sm:px-6 rounded-3xl bg-gradient-to-b from-surface-container-low via-surface to-background mb-space-lg overflow-hidden shadow-sm">
      <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-surface-container-high/60 blur-3xl pointer-events-none" />
      <div className="absolute left-1/3 -bottom-24 w-96 h-96 rounded-full bg-primary-fixed/20 blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto flex flex-col items-center text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container-highest text-primary font-label-sm text-label-sm uppercase mb-space-sm shadow-xs">
          <Icon name="travel_explore" filled className="text-[16px] text-tertiary-container" />
          Transparansi Layanan Publik Brebes
        </div>
        <h1 className="font-headline-xl text-headline-xl text-primary tracking-tight max-w-2xl">
          Pelacakan Tiket &amp; Akuntabilitas Pengaduan
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant mt-2 mb-space-lg max-w-xl">
          Pantau tahap penyelesaian aduan Anda secara real-time. Setiap tindak lanjut dikawal langsung oleh OPD pengampu
          dan terbuka bagi warga Kabupaten Brebes.
        </p>

        <form onSubmit={onSearch} className="w-full bg-surface-container-lowest p-2 sm:p-3 rounded-2xl shadow-md flex flex-col sm:flex-row items-center gap-2">
          <div className="flex items-center gap-3 w-full px-3 py-2">
            <Icon name="tag" className="text-outline text-[24px]" />
            <div className="flex flex-col w-full text-left">
              <label htmlFor="ticket-input" className="font-label-sm text-label-sm text-outline uppercase tracking-wider">
                KODE TIKET RESMI
              </label>
              <input
                id="ticket-input"
                type="text"
                value={query}
                onChange={(e) => onQueryChange(e.target.value)}
                placeholder="Contoh: BRB-2026-001284"
                className="w-full bg-transparent font-headline-sm text-headline-sm text-primary tracking-wide outline-none placeholder:text-outline-variant font-semibold uppercase"
              />
            </div>
          </div>
          <button type="submit" className="w-full sm:w-auto shrink-0 h-14 px-8 rounded-xl bg-tertiary-container hover:bg-tertiary text-on-tertiary font-label-lg text-label-lg shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2">
            <Icon name="search" className="text-[20px]" />
            <span>Lacak Tiket</span>
          </button>
        </form>

        {error && (
          <p className="mt-3 px-4 py-2 rounded-xl bg-error/10 text-error font-label-md text-label-md">{error}</p>
        )}

        <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-on-surface-variant font-label-sm text-label-sm">
          <span className="text-outline">Contoh tiket publik:</span>
          {sampleChips.map((c) => (
            <button key={c.code} type="button" onClick={() => onPick(c.code)} className="px-2.5 py-1 rounded-lg bg-surface-container hover:bg-surface-container-high text-primary transition-colors cursor-pointer">
              {c.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
