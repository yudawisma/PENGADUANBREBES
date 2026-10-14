import { useState, useRef, useCallback } from 'react';
import AdminLayout from '../../components/Admin/AdminLayout';
import StatCards from '../../components/Admin/StatCards';
import ComplaintMap from '../../components/Admin/ComplaintMap';
import OpdLoadPanel from '../../components/Admin/OpdLoadPanel';
import DispatchTable from '../../components/Admin/DispatchTable';
import DispatchDrawer from '../../components/Admin/DispatchDrawer';
import Toast from '../../components/Admin/Toast';
import Icon from '../../components/common/Icon';
import { initialTickets } from '../../data/adminData';

export default function Dashboard() {
  const [tickets, setTickets] = useState(initialTickets);
  const [selected, setSelected] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [toast, setToast] = useState(false);
  const toastTimer = useRef(null);

  const openDrawer = (ticket) => {
    setSelected(ticket);
    setDrawerOpen(true);
  };
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  const saveDispatch = (id, data) => {
    // TODO: axios.put(`/admin/tickets/${id}`, data) lalu update state dari response
    setTickets((list) => list.map((t) => (t.id === id ? { ...t, stage: data.stage, dinas: data.dinas, instruction: data.instruction } : t)));
    setDrawerOpen(false);
    setToast(true);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(false), 3500);
  };

  return (
    <AdminLayout>
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-space-md mb-space-lg">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-tertiary-container/10 text-tertiary-container font-label-sm text-label-sm uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-tertiary-container animate-pulse" />
              Pusat Komando &amp; Disposisi OPD
            </span>
            <span className="font-label-sm text-label-sm text-outline">v4.2 Siklus Real-Time</span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight">Monitor Aduan Warga Brebes</h1>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Kendali terpadu verifikasi lapangan, penugasan teknis dinas, dan pemantauan SLA pengaduan masyarakat.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-space-sm bg-surface-container-low p-1.5 rounded-xl">
          <button className="px-3 py-1.5 rounded-lg bg-surface-container-lowest text-primary font-label-md text-label-md shadow-sm hover:bg-surface-container-lowest/80 flex items-center gap-1.5">
            <Icon name="sync" className="text-[16px] text-tertiary-container" />
            Sinkron Otomatis (30d)
          </button>
          <div className="h-4 w-px bg-surface-container-highest" />
          <button className="px-3 py-1.5 rounded-lg text-on-surface-variant font-label-md text-label-md hover:bg-surface-container transition-colors">
            Shift Siang (07:00 - 15:30)
          </button>
          {/* TODO: ekspor rekap (CSV/Excel) dari Laravel */}
          <button className="px-3 py-1.5 rounded-lg bg-primary text-on-primary font-label-md text-label-md shadow-sm flex items-center gap-1">
            <Icon name="file_download" className="text-[16px]" />
            Ekspor Rekap
          </button>
        </div>
      </div>

      <StatCards />

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg mb-space-xl">
        <ComplaintMap />
        <OpdLoadPanel />
      </section>

      <DispatchTable tickets={tickets} onOpen={openDrawer} />

      <DispatchDrawer ticket={selected} open={drawerOpen} onClose={closeDrawer} onSave={saveDispatch} />
      <Toast show={toast} />
    </AdminLayout>
  );
}
