import { useRef, useEffect, useMemo } from 'react';
import Icon from '../common/Icon';
import { labelClass, btnPrimary, btnSecondary } from './styles';

export default function Step3Evidence({ form, update, onNext, onBack }) {
  const inputRef = useRef(null);

  const previews = useMemo(() => form.files.map((f) => ({ file: f, url: URL.createObjectURL(f) })), [form.files]);
  useEffect(() => () => previews.forEach((p) => URL.revokeObjectURL(p.url)), [previews]);

  const addFiles = (list) => {
    const valid = Array.from(list).filter((f) => /^image\/(jpeg|png|webp)$/.test(f.type) && f.size <= 10 * 1024 * 1024);
    update('files', [...form.files, ...valid]);
  };
  const removeFile = (i) => update('files', form.files.filter((_, idx) => idx !== i));

  return (
    <div className="space-y-space-md">
      <div>
        <label className={labelClass}>Unggah Bukti Lapangan (Foto / Tangkapan Layar)</label>
        <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-sm">
          Sertakan foto jelas kondisi masalah agar petugas dapat memverifikasi tingkat keparahan.
        </p>
        <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp" multiple hidden onChange={(e) => addFiles(e.target.files)} />
        <div
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => { e.preventDefault(); addFiles(e.dataTransfer.files); }}
          className="cursor-pointer border-2 border-dashed border-outline/30 hover:border-secondary transition-all rounded-2xl bg-surface-container-low p-space-lg flex flex-col items-center justify-center text-center"
        >
          <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center text-secondary mb-space-sm">
            <Icon name="cloud_upload" className="text-[32px]" />
          </div>
          <p className="font-headline-sm text-[16px] text-primary font-bold">Tarik &amp; Lepaskan Foto di Sini, atau Klik untuk Menelusuri</p>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Mendukung format JPG, PNG, WEBP (Maksimal 10 MB per foto)</p>
          <span className="mt-space-sm px-3 py-1 bg-surface-container rounded-full text-secondary font-label-sm text-label-sm font-semibold">Pilih File dari Galeri</span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-space-md pt-space-xs">
        {previews.map((p, i) => (
          <div key={p.url} className="relative rounded-xl overflow-hidden bg-surface-container aspect-video flex items-center justify-center group shadow-sm">
            <img src={p.url} alt={p.file.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button type="button" onClick={() => removeFile(i)} className="text-on-primary font-label-sm text-label-sm bg-error px-2 py-1 rounded">Hapus</button>
            </div>
            <span className="absolute bottom-1 left-2 font-label-sm text-[10px] text-on-primary bg-primary/80 px-1.5 py-0.5 rounded max-w-[90%] truncate">{p.file.name}</span>
          </div>
        ))}
        <div
          onClick={() => inputRef.current?.click()}
          className="relative rounded-xl border-2 border-dashed border-outline/20 aspect-video flex flex-col items-center justify-center text-on-surface-variant/60 cursor-pointer hover:bg-surface-container-low"
        >
          <Icon name="add_a_photo" className="text-[24px]" />
          <span className="font-label-sm text-label-sm mt-1">Tambah Foto Lain</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-space-sm">
        <button type="button" className={btnSecondary} onClick={onBack}>
          <Icon name="arrow_back" className="text-[18px]" /> Kembali
        </button>
        <button type="button" className={btnPrimary} onClick={onNext}>
          Lanjut ke Kontak &amp; Kirim <Icon name="arrow_forward" className="text-[18px]" />
        </button>
      </div>
    </div>
  );
}
