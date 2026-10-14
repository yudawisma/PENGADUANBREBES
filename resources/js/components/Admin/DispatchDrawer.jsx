import { useState, useEffect } from 'react';
import Icon from '../common/Icon';
import { dinasOptions, pejabatOptions, stageOptions, priorityStyles } from '../../data/adminData';

const fieldClass = 'w-full h-11 px-3 rounded-xl bg-surface-container-low text-on-surface font-body-sm text-body-sm focus:outline-none';

export default function DispatchDrawer({ ticket, open, onClose, onSave }) {
  const [stage, setStage] = useState('Diverifikasi');
  const [dinas, setDinas] = useState('dpu');
  const [pejabat, setPejabat] = useState(pejabatOptions[0]);
  const [instruction, setInstruction] = useState('');
  const [notify, setNotify] = useState(true);

  // Reset isi form setiap tiket berganti
  useEffect(() => {
    if (!ticket) return;
    setStage(ticket.stage);
    setDinas(ticket.dinas);
    setPejabat(pejabatOptions[0]);
    setInstruction(ticket.instruction || '');
    setNotify(true);
  }, [ticket]);

  // Tutup dengan tombol Esc
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!ticket) return null;

  const p = priorityStyles[ticket.priority];
  const dinasLabel = dinasOptions.find((d) => d.value === dinas)?.short;

  const handleSave = () => onSave(ticket.id, { stage, dinas, pejabat, instruction, notify });

  return (
    <div className={`fixed inset-0 bg-primary/40 backdrop-blur-sm z-50 transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="absolute inset-0" onClick={onClose} />

      <div className={`absolute right-0 top-0 bottom-0 w-full max-w-xl bg-surface-container-lowest shadow-2xl flex flex-col transform transition-transform duration-300 ease-out z-10 ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-space-lg bg-surface-container-low flex items-center justify-between">
          <div className="flex items-center gap-space-sm">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-on-primary shadow-sm">
              <Icon name="assignment_turned_in" className="text-[20px]" />
            </div>
            <div>
              <span className="font-headline-sm text-headline-sm text-primary block leading-tight">#{ticket.id}</span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">Tindak Lanjut &amp; Disposisi OPD</span>
            </div>
          </div>
          <button onClick={onClose} aria-label="Tutup" className="w-9 h-9 rounded-xl bg-surface-container-lowest text-outline hover:text-primary hover:bg-surface-container transition-colors flex items-center justify-center">
            <Icon name="close" className="text-[20px]" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-space-lg flex flex-col gap-space-lg">
          <div className="p-space-md rounded-2xl bg-surface-container-low flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className={`px-2.5 py-0.5 rounded-full font-label-sm text-label-sm font-bold ${p.badge}`}>{p.label}</span>
              <span className="text-on-surface-variant font-body-sm text-body-sm text-[12px]">Pelapor: {ticket.reporter}</span>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-primary">{ticket.category}</h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1">
              <Icon name="location_on" className="text-[16px] text-tertiary-container" />
              {ticket.kecLabel}, {ticket.address}
            </p>
          </div>

          <div className="flex flex-col gap-space-sm">
            <label className="font-label-md text-label-md text-primary font-bold">1. Perbarui Tahapan Status Tiket</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {stageOptions.map((s) => (
                <button
                  key={s.key}
                  type="button"
                  onClick={() => setStage(s.key)}
                  className={`px-3 py-2 rounded-xl font-label-sm text-label-sm font-bold flex flex-col items-center gap-1 text-center transition-all ${
                    stage === s.key
                      ? 'bg-primary text-on-primary shadow-sm'
                      : 'bg-surface-container-low text-on-surface-variant hover:bg-primary hover:text-on-primary'
                  }`}
                >
                  <Icon name={s.icon} className="text-[18px]" />
                  {s.key}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-space-sm">
            <label className="font-label-md text-label-md text-primary font-bold">2. Penugasan SKPD &amp; Pejabat Teknis</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
              <div className="flex flex-col gap-1">
                <span className="font-label-sm text-label-sm text-on-surface-variant">Dinas Penanggung Jawab</span>
                <select className={fieldClass} value={dinas} onChange={(e) => setDinas(e.target.value)}>
                  {dinasOptions.map((d) => (
                    <option key={d.value} value={d.value}>{d.full}</option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-label-sm text-label-sm text-on-surface-variant">Pejabat Pengawas / Koordinator</span>
                <select className={fieldClass} value={pejabat} onChange={(e) => setPejabat(e.target.value)}>
                  {pejabatOptions.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-space-sm">
            <label className="font-label-md text-label-md text-primary font-bold">3. Instruksi Kerja &amp; Bukti Penanganan Fisik</label>
            <textarea
              rows={3}
              value={instruction}
              onChange={(e) => setInstruction(e.target.value)}
              placeholder="Tuliskan instruksi penanganan teknis untuk regu di lapangan..."
              className="w-full p-3 rounded-xl bg-surface-container-low text-on-surface font-body-sm text-body-sm focus:outline-none resize-none"
            />
            <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col items-center justify-center text-center cursor-pointer hover:bg-surface-container transition-colors">
              <div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center text-primary mb-2">
                <Icon name="add_a_photo" className="text-[22px]" />
              </div>
              <span className="font-label-md text-label-md text-primary font-bold">Unggah Foto Progres / Surat Tugas SPK</span>
              <span className="font-body-sm text-body-sm text-outline text-[12px] mt-0.5">JPG, PNG atau Dokumen Berita Acara (Maks. 10MB)</span>
            </div>
          </div>

          <div className="p-space-md rounded-2xl bg-surface-container-high/60 flex flex-col gap-space-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon name="mark_chat_read" className="text-secondary text-[20px]" />
                <span className="font-label-md text-label-md text-primary font-bold">Notifikasi Otomatis ke Warga</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" checked={notify} onChange={(e) => setNotify(e.target.checked)} />
                <div className="w-11 h-6 bg-surface-container-highest rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" />
              </label>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant text-[13px]">
              Sistem akan mengirimkan pesan WhatsApp real-time ke nomor <strong>{ticket.phone}</strong> mengabarkan bahwa
              tiket telah diteruskan ke {dinasLabel} beserta estimasi penanganan.
            </p>
          </div>
        </div>

        <div className="p-space-lg bg-surface-container-low flex items-center justify-between gap-space-sm shadow-md">
          <button onClick={onClose} className="px-4 py-2.5 rounded-xl bg-surface-container text-on-surface font-label-md text-label-md hover:bg-surface-container-high transition-colors">
            Batal
          </button>
          <button onClick={handleSave} className="flex-1 py-2.5 rounded-xl bg-tertiary-container text-on-tertiary font-label-md text-label-md hover:bg-tertiary transition-colors shadow-sm flex items-center justify-center gap-1.5 font-bold">
            <Icon name="send" className="text-[18px]" />
            Simpan &amp; Kirim Disposisi
          </button>
        </div>
      </div>
    </div>
  );
}
