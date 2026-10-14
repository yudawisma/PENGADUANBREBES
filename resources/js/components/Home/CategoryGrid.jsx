import Icon from '../common/Icon';
import CategoryCard from './CategoryCard';
import { categories } from '../../data/categories';

export default function CategoryGrid({ onSelect }) {
  return (
    <section className="w-full mb-space-xl">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-lg gap-space-sm">
        <div>
          <div className="inline-flex items-center gap-1.5 text-secondary font-label-md text-label-md font-bold uppercase tracking-wider mb-1">
            <Icon name="category" className="text-[18px]" />
            Klasifikasi Pengaduan
          </div>
          <h2 className="font-headline-lg text-headline-lg text-primary tracking-tight">Laporkan Apa yang Anda Temukan</h2>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mt-1">
            Pilih kategori yang paling sesuai. Laporan Anda langsung diteruskan otomatis ke Organisasi Perangkat Daerah
            (OPD) teknis yang berwenang.
          </p>
        </div>
        <a href="#formulir-aduan" className="font-label-md text-label-md text-primary font-bold hover:text-tertiary-container flex items-center gap-1 transition-colors self-start md:self-auto">
          Buka Formulir Penuh <Icon name="arrow_forward" className="text-[18px]" />
        </a>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-space-md">
        {categories.map((c) => (
          <CategoryCard key={c.value} category={c} onSelect={onSelect} />
        ))}
      </div>
    </section>
  );
}
