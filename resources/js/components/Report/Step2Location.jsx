import { useState } from 'react';
import Icon from '../common/Icon';
import { kecamatanList } from '../../data/categories';
import { inputClass, labelClass, btnPrimary, btnSecondary } from './styles';

export default function Step2Location({ form, update, onNext, onBack }) {
  const [gpsError, setGpsError] = useState('');
  const [loading, setLoading] = useState(false);

  const detectGPS = () => {
    if (!navigator.geolocation) return setGpsError('Browser tidak mendukung GPS.');
    setLoading(true);
    setGpsError('');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        update('lat', pos.coords.latitude);
        update('lng', pos.coords.longitude);
        setLoading(false);
      },
      () => {
        setGpsError('Gagal mendapatkan lokasi. Pastikan izin lokasi diaktifkan.');
        setLoading(false);
      }
    );
  };

  const hasCoords = form.lat != null && form.lng != null;

  return (
    <div className="space-y-space-md">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
        <div>
          <label className={labelClass}>Kecamatan <span className="text-error">*</span></label>
          <select className={inputClass} value={form.kecamatan} onChange={(e) => update('kecamatan', e.target.value)}>
            <option value="" disabled>Pilih Kecamatan...</option>
            {kecamatanList.map((k) => (
              <option key={k} value={k}>Kecamatan {k}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>Desa / Kelurahan <span className="text-error">*</span></label>
          <input type="text" className={inputClass} value={form.desa} onChange={(e) => update('desa', e.target.value)} placeholder="Misal: Desa Jatibarang Lor, RT 02/RW 04" />
        </div>
      </div>

      <div>
        <label className={labelClass}>Patokan / Alamat Lengkap Titik Masalah</label>
        <input type="text" className={inputClass} value={form.alamat} onChange={(e) => update('alamat', e.target.value)} placeholder="Misal: Depan Gapura Masuk Desa, 50 meter sebelah timur Puskesmas" />
      </div>

      <div className="p-space-md bg-surface-container-low rounded-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm mb-space-sm">
          <span className="font-label-md text-label-md text-primary font-bold flex items-center gap-2">
            <Icon name="explore" className="text-secondary" />
            Tandai Koordinat GPS Presisi
          </span>
          <button
            type="button"
            onClick={detectGPS}
            disabled={loading}
            className="h-9 px-3 rounded-lg bg-surface-container text-primary font-label-sm text-label-sm hover:bg-primary hover:text-on-primary transition-all flex items-center gap-1.5 self-start"
          >
            <Icon name="my_location" className="text-[16px]" />
            {loading ? 'Mencari lokasi...' : 'Gunakan Lokasi GPS Saya'}
          </button>
        </div>
        <div className="h-36 rounded-xl bg-surface-container flex flex-col items-center justify-center text-center p-space-md relative overflow-hidden">
          <Icon name="pin_drop" className="text-secondary text-[32px] mb-1" />
          <p className="font-label-md text-label-md text-primary font-bold">
            {hasCoords ? `${form.lat.toFixed(6)}, ${form.lng.toFixed(6)}` : 'Koordinat Otomatis Belum Dipasang'}
          </p>
          <p className="font-body-sm text-body-sm text-on-surface-variant max-w-sm mt-0.5">
            {gpsError || 'Tekan tombol di atas untuk menyematkan koordinat lokasi Anda secara presisi via sensor perangkat.'}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between pt-space-sm">
        <button type="button" className={btnSecondary} onClick={onBack}>
          <Icon name="arrow_back" className="text-[18px]" /> Kembali
        </button>
        <button type="button" className={btnPrimary} onClick={onNext}>
          Lanjut ke Bukti Foto <Icon name="arrow_forward" className="text-[18px]" />
        </button>
      </div>
    </div>
  );
}
