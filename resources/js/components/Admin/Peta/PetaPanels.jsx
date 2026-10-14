import Icon from '../../common/Icon';
import { petaKpis, categorySelect, topClusters } from '../../../data/petaData';
import { kecamatanList } from '../../../data/categories';

/* ---------- KPI ---------- */
export function PetaKpis() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-space-md">
      {petaKpis.map((k) => (
        <div key={k.label} className="p-space-lg rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow duration-200">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">{k.label}</span>
              {k.small ? (
                <span className="font-headline-sm text-headline-sm text-primary mt-1 font-bold">{k.value}</span>
              ) : (
                <span className={`font-headline-lg text-headline-lg mt-1 ${k.valueClass}`}>
                  {k.value} <span className="font-headline-sm text-headline-sm text-on-surface-variant font-normal">{k.unit}</span>
                </span>
              )}
            </div>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-sm ${k.iconBox}`}>
              <Icon name={k.icon} className="text-[22px]" />
            </div>
          </div>
          <div className="flex items-center justify-between gap-2 mt-4 pt-3 bg-surface-container-low/40 px-3 py-1.5 rounded-xl">
            <div className="flex items-center gap-2 min-w-0">
              {k.foot.map((f, i) => (
                <span key={i} className={`inline-flex items-center gap-0.5 font-label-sm text-label-sm truncate ${f.className ?? 'text-on-surface-variant'}`}>
                  {f.icon && <Icon name={f.icon} className="text-[16px]" />} {f.text}
                  {i < k.foot.length - 1 && <span className="text-outline ml-2">•</span>}
                </span>
              ))}
            </div>
            {k.chip && <span className={`px-2 py-0.5 rounded-full font-label-sm text-[10px] font-bold shrink-0 ${k.chip.className}`}>{k.chip.text}</span>}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------- Filter toolbar (hanya kategori yang aktif memfilter peta; sisanya menunggu API) ---------- */
const sel = 'w-full h-10 pl-3 pr-8 rounded-xl bg-surface-container-low text-on-surface font-label-md text-label-md appearance-none focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary/20 transition-all cursor-pointer';
function Sel({ children, value, onChange, icon = 'expand_more' }) {
  return (
    <div className="relative">
      <select className={sel} value={value} onChange={onChange}>{children}</select>
      <Icon name={icon} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-outline pointer-events-none text-[18px]" />
    </div>
  );
}

export function PetaFilters({ layer, setLayer }) {
  return (
    <div className="p-space-md rounded-2xl bg-surface-container-lowest shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-space-sm items-center">
        <div className="lg:col-span-3 relative">
          <Icon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]" />
          <input type="text" placeholder="Cari #BRB-..., jalan, desa..." className="w-full h-10 pl-9 pr-3 rounded-xl bg-surface-container-low text-on-surface placeholder-outline font-body-sm text-body-sm focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary/20 transition-all" />
        </div>
        <div className="lg:col-span-2">
          <Sel value={layer} onChange={(e) => setLayer(e.target.value)}>
            {categorySelect.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
          </Sel>
        </div>
        <div className="lg:col-span-2">
          <Sel defaultValue="">
            <option value="">Semua 17 Kecamatan</option>
            {kecamatanList.map((k) => <option key={k} value={k.toLowerCase()}>Kec. {k}</option>)}
          </Sel>
        </div>
        <div className="lg:col-span-2">
          <Sel defaultValue="">
            <option value="">Status: Semua Penanganan</option>
            <option value="baru">Belum Ditangani (Baru)</option>
            <option value="proses">Sedang Diproses OPD</option>
            <option value="selesai">Selesai Dituntaskan</option>
          </Sel>
        </div>
        <div className="lg:col-span-1">
          <Sel defaultValue="30" icon="calendar_today">
            <option value="30">30 Hari</option><option value="7">7 Hari</option><option value="1">Hari ini</option><option value="365">Tahun ini</option>
          </Sel>
        </div>
        <div className="lg:col-span-2 flex items-center justify-end gap-2">
          {/* TODO: kirim semua filter ke API Laravel saat Terapkan ditekan */}
          <button type="button" className="h-10 px-3.5 rounded-xl bg-primary text-on-primary font-label-md text-label-md hover:bg-primary-container transition-colors shadow-sm flex items-center gap-1">
            <Icon name="filter_alt" className="text-[16px]" /> Terapkan
          </button>
          <button type="button" onClick={() => setLayer('semua')} title="Reset Filter" className="h-10 px-2.5 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface-variant transition-colors">
            <Icon name="restart_alt" className="text-[18px]" />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- Inspector titik terpilih ---------- */
function Row({ icon, label, children }) {
  return (
    <div className="flex items-start justify-between gap-3 text-body-sm text-on-surface">
      <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1.5 shrink-0">
        <Icon name={icon} className="text-[16px] text-outline" /> {label}
      </span>
      {children}
    </div>
  );
}

export function ReportInspector({ pin }) {
  return (
    <div className="rounded-2xl bg-surface-container-lowest shadow-sm overflow-hidden">
      <div className="p-space-md bg-surface-container-low flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon name="my_location" className="text-secondary text-[20px]" />
          <span className="font-label-lg text-label-lg text-primary font-bold">Detail Titik Terpilih</span>
        </div>
        <span className="px-2.5 py-0.5 rounded-full bg-surface-container-highest text-primary font-label-sm text-[11px] font-bold">{pin.ticket}</span>
      </div>
      <div className="p-space-lg flex flex-col gap-space-md">
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between gap-2">
            <span className={`px-2.5 py-0.5 rounded-full font-label-sm text-[11px] font-bold uppercase tracking-wider ${pin.priority.className}`}>{pin.priority.label}</span>
            <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1 shrink-0"><Icon name="schedule" className="text-[14px]" /> {pin.time}</span>
          </div>
          <h4 className="font-headline-sm text-headline-sm text-on-surface mt-1 font-bold leading-snug">{pin.title}</h4>
        </div>

        <div className="relative rounded-xl overflow-hidden aspect-video bg-surface-container flex items-center justify-center">
          {pin.image ? <img src={pin.image} alt={pin.title} className="w-full h-full object-cover" /> : <Icon name="image" className="text-[40px] text-on-surface-variant/40" />}
          <div className="absolute bottom-2 left-2 right-2 px-2.5 py-1.5 rounded-lg bg-primary/85 backdrop-blur-md text-on-primary flex items-center justify-between font-label-sm text-[11px]">
            <span className="flex items-center gap-1"><Icon name="check_circle" className="text-[14px] text-emerald-400" /> Geotag Valid ({pin.accuracy})</span>
            <span className="font-mono text-[10px] text-surface-variant">{pin.coords}</span>
          </div>
        </div>

        <div className="flex flex-col gap-2.5 bg-surface-container-low/60 p-3 rounded-xl">
          <Row icon="location_on" label="Lokasi"><span className="font-label-md text-label-md text-right text-on-surface font-semibold">{pin.location}</span></Row>
          <Row icon="person" label="Pelapor">
            <span className="font-label-md text-label-md text-on-surface font-semibold flex items-center gap-1">
              {pin.reporter}
              {pin.verified && <Icon name="verified" className="text-[14px] text-secondary" />}
            </span>
          </Row>
          <Row icon="domain" label="OPD Terkait"><span className="font-label-md text-label-md text-primary font-bold">{pin.opd}</span></Row>
          <Row icon="pending_actions" label="Status">
            <span className="px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed-variant font-label-sm text-[11px] font-bold">{pin.status}</span>
          </Row>
        </div>

        <div className="flex items-center gap-2 pt-1">
          <a href="/admin/verifikasi" className="flex-1 h-10 px-3 rounded-xl bg-primary text-on-primary font-label-md text-label-md hover:bg-primary-container transition-colors shadow-sm flex items-center justify-center gap-1">
            <Icon name="open_in_new" className="text-[16px]" /> Detail Tiket
          </a>
          <a href="/admin" className="flex-1 h-10 px-3 rounded-xl bg-tertiary-container text-on-tertiary font-label-md text-label-md hover:bg-tertiary transition-colors shadow-sm flex items-center justify-center gap-1">
            <Icon name="send_to_mobile" className="text-[16px]" /> Tugaskan TRC
          </a>
        </div>
      </div>
    </div>
  );
}

/* ---------- Top klaster ---------- */
export function TopClusters({ onFocus }) {
  return (
    <div className="rounded-2xl bg-surface-container-lowest shadow-sm p-space-lg flex flex-col gap-space-md">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <span className="font-headline-sm text-headline-sm text-primary font-bold">Top Klaster Wilayah</span>
          <span className="font-label-sm text-label-sm text-on-surface-variant">Konsentrasi titik aduan tertinggi</span>
        </div>
        <Icon name="analytics" className="text-outline text-[20px]" />
      </div>
      <div className="flex flex-col gap-2.5">
        {topClusters.map((c, i) => (
          <div key={c.name} className="p-3 rounded-xl bg-surface-container-low hover:bg-surface-container transition-all flex items-center justify-between group">
            <div className="flex items-start gap-2.5 min-w-0">
              <span className={`w-6 h-6 rounded-full font-label-sm text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5 ${c.rank}`}>{i + 1}</span>
              <div className="flex flex-col min-w-0">
                <span className="font-label-md text-label-md text-on-surface font-semibold truncate group-hover:text-primary transition-colors">{c.name}</span>
                <span className="font-body-sm text-[12px] text-on-surface-variant">{c.desc}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className={`px-2 py-0.5 rounded-full font-label-sm text-[10px] font-bold ${c.badge}`}>{c.count}</span>
              <button type="button" onClick={() => onFocus(c.focus)} title="Pusatkan Peta" className="w-8 h-8 rounded-lg bg-surface-container-lowest flex items-center justify-center text-primary hover:bg-primary hover:text-on-primary transition-colors">
                <Icon name="filter_center_focus" className="text-[16px]" />
              </button>
            </div>
          </div>
        ))}
      </div>
      <button type="button" className="w-full py-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-primary font-label-md text-label-md font-semibold transition-colors flex items-center justify-center gap-1.5 mt-1">
        <span>Lihat Semua 17 Kecamatan</span> <Icon name="arrow_forward" className="text-[16px]" />
      </button>
    </div>
  );
}
