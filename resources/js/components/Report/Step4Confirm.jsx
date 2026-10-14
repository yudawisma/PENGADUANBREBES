import Icon from '../common/Icon';
import { inputClass, labelClass, btnSecondary } from './styles';

export default function Step4Confirm({ form, update, onBack }) {
  return (
    <div className="space-y-space-md">
      <div className="p-space-md bg-secondary-fixed/50 rounded-2xl flex items-start gap-space-sm">
        <Icon name="verified_user" className="text-secondary text-[24px]" />
        <div>
          <p className="font-headline-sm text-[16px] text-primary font-bold">Nama &amp; Nomor WhatsApp Bersifat Opsional!</p>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
            Laporan Anda <strong>tetap akan diproses dan diteruskan</strong> ke dinas terkait walaupun Anda memilih untuk tidak
            mencantumkan kontak pribadi. Jika diisi, Anda akan menerima nomor tiket dan progres penyelesaian via WhatsApp secara otomatis.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
        <div>
          <label className={labelClass}>Nama Lengkap (Opsional / Boleh Anonim)</label>
          <input type="text" className={inputClass} value={form.name} onChange={(e) => update('name', e.target.value)} placeholder="Anonim (atau nama Anda)" />
        </div>
        <div>
          <label className={labelClass}>Nomor WhatsApp (Opsional untuk Notifikasi)</label>
          <input type="tel" className={inputClass} value={form.phone} onChange={(e) => update('phone', e.target.value)} placeholder="0812-xxxx-xxxx" />
        </div>
      </div>

      <div className="p-space-md bg-surface-container-low rounded-2xl">
        <div className="flex items-center gap-2">
          <input
            id="agree-check"
            type="checkbox"
            checked={form.agree}
            onChange={(e) => update('agree', e.target.checked)}
            className="w-4 h-4 rounded text-tertiary-container focus:ring-tertiary-container cursor-pointer"
          />
          <label htmlFor="agree-check" className="font-body-sm text-body-sm text-on-surface cursor-pointer">
            Saya menyatakan informasi yang saya laporkan adalah benar sesuai fakta di lapangan dan bukan laporan fiktif.
          </label>
        </div>
      </div>

      <div className="flex items-center justify-between pt-space-sm">
        <button type="button" className={btnSecondary} onClick={onBack}>
          <Icon name="arrow_back" className="text-[18px]" /> Kembali
        </button>
        <button
          type="submit"
          disabled={!form.agree}
          className="h-12 px-space-xl rounded-xl bg-tertiary-container text-on-tertiary font-label-lg text-label-lg hover:bg-tertiary transition-all shadow-md hover:shadow-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Icon name="send" className="text-[20px]" />
          Kirim Laporan Sekarang
        </button>
      </div>
    </div>
  );
}
