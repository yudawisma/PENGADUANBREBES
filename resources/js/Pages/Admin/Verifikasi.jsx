import { useState, useMemo, useRef } from 'react';
import AdminLayout from '../../components/Admin/AdminLayout';
import Toast from '../../components/Admin/Toast';
import Icon from '../../components/common/Icon';
import VerifKpis from '../../components/Admin/Verifikasi/VerifKpis';
import VerifFilterBar from '../../components/Admin/Verifikasi/VerifFilterBar';
import VerifQueue from '../../components/Admin/Verifikasi/VerifQueue';
import { initialQueue } from '../../data/verifikasiData';

const emptyFilter = { search: '', category: '', kecamatan: '', status: '' };

export default function Verifikasi() {
  const [tickets, setTickets] = useState(initialQueue);
  const [draft, setDraft] = useState(emptyFilter);
  const [applied, setApplied] = useState(emptyFilter);
  const [selected, setSelected] = useState(new Set());
  const [toast, setToast] = useState({ show: false, title: '', text: '' });
  const timer = useRef(null);

  const notify = (title, text) => {
    setToast({ show: true, title, text });
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast((t) => ({ ...t, show: false })), 3500);
  };

  const rows = useMemo(() => {
    const q = applied.search.trim().toLowerCase();
    return tickets.filter(
      (t) =>
        (!applied.category || t.category === applied.category) &&
        (!applied.kecamatan || t.kecamatan === applied.kecamatan) &&
        (!applied.status || t.status === applied.status) &&
        (!q || [t.id, t.title, t.reporter].join(' ').toLowerCase().includes(q))
    );
  }, [tickets, applied]);

  const toggle = (id) =>
    setSelected((s) => {
      const n = new Set(s);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  const toggleAll = () =>
    setSelected((s) => (rows.every((r) => s.has(r.id)) ? new Set() : new Set(rows.map((r) => r.id))));

  const patch = (ids, changes) => setTickets((list) => list.map((t) => (ids.includes(t.id) ? { ...t, ...changes } : t)));

  // TODO: semua perubahan di bawah ini perlu dikirim ke Laravel (axios.put)
  const handleAction = (t) => {
    if (t.status === 'menunggu') {
      patch([t.id], { status: 'ditelaah', verifier: 'Oleh: Admin Diskominfo' });
      notify('Laporan Mulai Ditelaah', `#${t.id} kini berstatus Sedang Ditelaah.`);
    } else if (t.status === 'ditelaah') {
      patch([t.id], { status: 'valid', verifier: 'Diteruskan ke OPD teknis' });
      notify('Laporan Terverifikasi', `#${t.id} siap diteruskan ke OPD teknis.`);
    } else if (t.status === 'butuh_bukti') {
      notify('Permintaan Foto Terkirim', `Pelapor #${t.id} diminta mengunggah foto yang lebih jelas.`);
    }
  };

  const handleBulk = () => {
    const ids = tickets.filter((t) => selected.has(t.id) && ['menunggu', 'ditelaah'].includes(t.status)).map((t) => t.id);
    if (ids.length === 0) return notify('Tidak Ada yang Diproses', 'Laporan terpilih tidak berstatus menunggu / ditelaah.');
    patch(ids, { status: 'valid', verifier: 'Diverifikasi massal' });
    setSelected(new Set());
    notify('Verifikasi Massal Berhasil', `${ids.length} laporan terverifikasi.`);
  };

  return (
    <AdminLayout>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider font-bold">Portal Pengaduan Warga</span>
            <span className="text-outline text-xs">•</span>
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Diskominfo Brebes</span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight">Verifikasi Laporan</h1>
          <p className="font-body-sm text-body-sm text-on-surface-variant max-w-2xl mt-0.5">
            Periksa kelengkapan administrasi, keaslian berkas geotag, dan validitas laporan masyarakat sebelum diteruskan ke OPD teknis Kabupaten Brebes.
          </p>
        </div>
        <div className="flex items-center gap-space-sm self-start md:self-auto">
          <button type="button" className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-surface-container-high text-primary font-label-md text-label-md hover:bg-surface-variant transition-all shadow-sm group">
            <Icon name="sync" className="text-[18px] group-hover:rotate-180 transition-transform duration-500 text-secondary" />
            <span>Sinkronisasi Data</span>
          </button>
          <button type="button" className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary-container text-on-primary font-label-md text-label-md hover:bg-primary transition-all shadow-sm">
            <Icon name="download_for_offline" className="text-[18px]" />
            <span>Export Antrean</span>
          </button>
        </div>
      </div>

      <VerifKpis />
      <VerifFilterBar draft={draft} setDraft={setDraft} onApply={() => setApplied(draft)} onReset={() => { setDraft(emptyFilter); setApplied(emptyFilter); }} />
      <VerifQueue rows={rows} selected={selected} onToggle={toggle} onToggleAll={toggleAll} onAction={handleAction} onBulkVerify={handleBulk} />

      <div className="rounded-xl bg-surface-container-high/60 p-space-md flex flex-col sm:flex-row sm:items-center justify-between gap-space-md">
        <div className="flex items-start sm:items-center gap-space-sm">
          <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center text-on-primary flex-shrink-0 shadow-sm">
            <Icon name="policy" className="text-[20px]" />
          </div>
          <div>
            <h4 className="font-label-lg text-label-lg text-primary font-bold leading-tight">Pedoman Standar Verifikasi OPD Brebes Berhias</h4>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
              Pastikan keabsahan koordinat geotag pada foto aduan dan cek radius 150 meter di peta sistem untuk mengeliminasi tiket duplikasi warga.
              Laporan terverifikasi wajib diteruskan ke OPD teknis dalam waktu maksimal 24 jam kerja.
            </p>
          </div>
        </div>
        <a href="#" className="inline-flex items-center gap-1 font-label-sm text-label-sm text-secondary hover:text-primary font-bold flex-shrink-0">
          <span>Baca SOP Verifikasi</span>
          <Icon name="arrow_forward" className="text-[16px]" />
        </a>
      </div>

      <Toast show={toast.show} title={toast.title} text={toast.text} />
    </AdminLayout>
  );
}
