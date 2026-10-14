import Icon from '../common/Icon';
import ReportMap from '../common/Report.Map';
import { regionalPills } from '../../data/adminData';

const legend = [
  ['bg-tertiary-container', 'Padat Tinggi'],
  ['bg-secondary-container', 'Moderat'],
  ['bg-surface-dim', 'Terkendali'],
];

// Koordinat perkiraan kasar. Ganti dengan koordinat laporan asli dari database.
const markers = [
  { id: 1, lat: -6.8722, lng: 109.0408, color: '#a33800', title: 'Brebes Kota', location: '148 aduan jalan & drainase' },
  { id: 2, lat: -6.8869, lng: 108.9528, color: '#a33800', title: 'Bulakamba', location: 'Jalan berlubang' },
  { id: 3, lat: -6.8786, lng: 109.0, color: '#a33800', title: 'Wanasari', location: 'Drainase tersumbat' },
  { id: 4, lat: -7.2, lng: 109.0167, color: '#0f766e', title: 'Bumiayu', location: 'Longsor lereng & irigasi' },
  { id: 5, lat: -6.8667, lng: 108.9, color: '#a33800', title: 'Tanjung', location: 'Penerangan jalan mati KM 18-22' },
];

export default function ComplaintMap() {
  return (
    <div className="lg:col-span-8 bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-space-md">
        <div>
          <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">Pemetaan Spasial 17 Kecamatan</span>
          <h2 className="font-headline-sm text-headline-sm text-primary">Peta Konsentrasi Aduan Terbuka</h2>
        </div>
        <div className="flex items-center gap-2">
          {legend.map(([dot, label]) => (
            <span key={label} className="inline-flex items-center gap-1 font-label-sm text-label-sm text-on-surface-variant ml-2 first:ml-0">
              <span className={`w-2.5 h-2.5 rounded-full ${dot}`} /> {label}
            </span>
          ))}
        </div>
      </div>

      {/* Wrapper wajib punya tinggi pasti, kalau tidak peta tidak tampil */}
      <div className="relative w-full h-[380px] rounded-xl overflow-hidden shadow-inner">
        <ReportMap className="h-full" markers={markers} zoom={10} />

        {/* Kartu melayang di atas peta */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 z-[500] pointer-events-none">
          {regionalPills.map((p) => (
            <div key={p.title} className="bg-surface-container-lowest/90 backdrop-blur-md px-3 py-2 rounded-xl shadow-md flex items-center gap-3">
              <div className={`w-2.5 h-2.5 rounded-full ${p.dot}`} />
              <div>
                <p className="font-label-sm text-label-sm text-primary font-bold">{p.title}</p>
                <p className="font-body-sm text-body-sm text-on-surface-variant">{p.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="absolute bottom-4 left-4 right-4 z-[500] bg-primary/90 text-on-primary backdrop-blur-md p-space-md rounded-xl flex flex-wrap items-center justify-between gap-space-sm">
          <div className="flex items-center gap-space-sm">
            <Icon name="pin_drop" className="text-secondary-fixed" />
            <div>
              <span className="font-label-md text-label-md block">Fokus Radar: Ruas Pantura Tanjung - Losari</span>
              <span className="font-body-sm text-body-sm text-inverse-primary text-[12px]">Penerangan jalan mati pada KM 18-22</span>
            </div>
          </div>
          <button className="px-3 py-1.5 rounded-lg bg-surface-container-lowest text-primary font-label-md text-label-md hover:bg-surface-container-low transition-colors">
            Perbesar Klaster Kasus
          </button>
        </div>
      </div>
    </div>
  );
}