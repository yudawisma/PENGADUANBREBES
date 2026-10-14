import Icon from '../common/Icon';
import { categories } from '../../data/categories';
import { inputClass, labelClass, btnPrimary } from './styles';

export default function Step1Info({ form, update, onNext }) {
  return (
    <div className="space-y-space-md">
      <div>
        <label className={labelClass}>Kategori Masalah <span className="text-error">*</span></label>
        <select className={inputClass} value={form.category} onChange={(e) => update('category', e.target.value)}>
          <option value="" disabled>Pilih Kategori Pengaduan...</option>
          {categories.map((c) => (
            <option key={c.value} value={c.value}>{c.option}</option>
          ))}
        </select>
      </div>
      <div>
        <label className={labelClass}>Judul Pengaduan <span className="text-error">*</span></label>
        <input
          type="text"
          className={inputClass}
          value={form.title}
          onChange={(e) => update('title', e.target.value)}
          placeholder="Contoh: Aspal Amblas dan Berlubang Parah di Depan SMPN 1 Jatibarang"
        />
      </div>
      <div>
        <label className={labelClass}>Deskripsi Kronologi Kejadian <span className="text-error">*</span></label>
        <textarea
          rows={4}
          className="w-full p-4 rounded-xl bg-surface-container-low text-on-surface font-body-md focus:outline-none focus:ring-2 focus:ring-secondary transition-all resize-none"
          value={form.description}
          onChange={(e) => update('description', e.target.value)}
          placeholder="Jelaskan kondisi secara detail, sejak kapan terjadi, dan potensi dampak bahayanya bagi masyarakat sekitar..."
        />
      </div>
      <div className="flex justify-end pt-space-sm">
        <button type="button" className={btnPrimary} onClick={onNext}>
          Lanjut ke Lokasi <Icon name="arrow_forward" className="text-[18px]" />
        </button>
      </div>
    </div>
  );
}
