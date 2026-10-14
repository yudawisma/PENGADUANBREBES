import Icon from '../../common/Icon';
import { kecamatanList } from '../../../data/categories';
import { categoryFilter, statusFilter } from '../../../data/verifikasiData';

const selectClass =
  'w-full h-11 px-3.5 pr-8 rounded-xl bg-surface-container-low font-body-sm text-body-sm text-on-surface appearance-none focus:outline-none focus:bg-surface-container-lowest transition-all cursor-pointer';

function Select({ value, onChange, placeholder, options }) {
  return (
    <div className="relative">
      <select className={selectClass} value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="">{placeholder}</option>
        {options.map(([v, l]) => (
          <option key={v} value={v}>{l}</option>
        ))}
      </select>
      <Icon name="expand_more" className="absolute right-2.5 top-1/2 -translate-y-1/2 text-outline text-[18px] pointer-events-none" />
    </div>
  );
}

export default function VerifFilterBar({ draft, setDraft, onApply, onReset }) {
  const set = (key) => (value) => setDraft((d) => ({ ...d, [key]: value }));
  return (
    <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-space-md items-center">
        <div className="lg:col-span-4 relative">
          <Icon name="search" className="absolute left-3.5 top-1/2 -translate-y-1/2 text-outline text-[20px]" />
          <input
            type="text"
            value={draft.search}
            onChange={(e) => set('search')(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && onApply()}
            placeholder="Cari kode tiket (#BRB-...), judul laporan, atau nama pelapor..."
            className="w-full h-11 pl-11 pr-4 rounded-xl bg-surface-container-low font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:bg-surface-container-lowest transition-all"
          />
        </div>
        <div className="lg:col-span-2"><Select value={draft.category} onChange={set('category')} placeholder="Semua Kategori" options={categoryFilter} /></div>
        <div className="lg:col-span-2">
          <Select value={draft.kecamatan} onChange={set('kecamatan')} placeholder="Semua 17 Kecamatan" options={kecamatanList.map((k) => [k.toLowerCase(), `Kec. ${k}`])} />
        </div>
        <div className="lg:col-span-2"><Select value={draft.status} onChange={set('status')} placeholder="Semua Status" options={statusFilter} /></div>
        <div className="lg:col-span-2 flex items-center gap-2">
          <button type="button" onClick={onApply} className="flex-1 h-11 inline-flex items-center justify-center gap-1 px-3 rounded-xl bg-secondary text-on-secondary font-label-md text-label-md hover:bg-secondary-container transition-colors shadow-sm">
            <Icon name="tune" className="text-[18px]" />
            <span>Filter</span>
          </button>
          <button type="button" onClick={onReset} title="Reset Filter" className="h-11 w-11 inline-flex items-center justify-center rounded-xl bg-surface-container-low text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors">
            <Icon name="refresh" className="text-[18px]" />
          </button>
        </div>
      </div>
    </div>
  );
}
