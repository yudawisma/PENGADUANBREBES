import { useState } from 'react';
import AdminLayout from '../../components/Admin/AdminLayout';
import Icon from '../../components/common/Icon';
import MapView from '../../components/Admin/Peta/MapView';
import { PetaKpis, PetaFilters, ReportInspector, TopClusters } from '../../components/Admin/Peta/PetaPanels';
import { pins } from '../../data/petaData';

export default function Peta() {
  const [layer, setLayer] = useState('semua');
  const [selectedId, setSelectedId] = useState('larangan');
  const [focusId, setFocusId] = useState(null);

  const selectedPin = pins.find((p) => p.id === selectedId);

  const focusTarget = ({ type, id }) => {
    if (type === 'pin') {
      setSelectedId(id);
      setFocusId(null);
    } else {
      setFocusId(id);
      setTimeout(() => setFocusId(null), 4000);
    }
  };

  return (
    <AdminLayout>
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
        <div className="flex flex-col">
          <div className="flex items-center gap-space-xs">
            <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight">Peta Sebaran Kasus Warga</h1>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-ping" /> Live GPS
            </span>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-3xl mt-0.5">
            Pantau pemetaan spasial laporan masyarakat berbasis koordinat GPS, klaster insiden, dan status penanganan se-Kabupaten Brebes.
          </p>
        </div>
        {/* TODO: heatmap/satelit, ekspor GeoJSON, dan sinkronisasi titik dari Laravel */}
        <div className="flex flex-wrap items-center gap-space-sm">
          <button type="button" className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md shadow-sm transition-all">
            <Icon name="layers" className="text-[18px] text-secondary" /> <span>Mode Heatmap / Satelit</span>
          </button>
          <button type="button" className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md shadow-sm transition-all">
            <Icon name="download" className="text-[18px] text-primary" /> <span>Export GIS GeoJSON</span>
          </button>
          <button type="button" className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-primary text-on-primary hover:bg-primary-container font-label-md text-label-md shadow-sm transition-all">
            <Icon name="sync" className="text-[18px]" /> <span>Sinkronisasi Titik</span>
          </button>
        </div>
      </div>

      <PetaKpis />
      <PetaFilters layer={layer} setLayer={setLayer} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
        <div className="lg:col-span-8 flex flex-col gap-space-md">
          <MapView layer={layer} setLayer={setLayer} selectedId={selectedId} onSelectPin={setSelectedId} focusId={focusId} onFocusCluster={(id) => focusTarget({ type: 'cluster', id })} />
          <div className="p-space-md rounded-2xl bg-surface-container-low flex items-center justify-between gap-space-md">
            <div className="flex items-center gap-space-sm">
              <div className="w-8 h-8 rounded-xl bg-secondary flex items-center justify-center text-on-secondary shrink-0">
                <Icon name="info" className="text-[18px]" />
              </div>
              <p className="font-body-sm text-body-sm text-on-surface">
                <strong className="font-semibold text-primary">Deteksi Otomatis AI Spasial:</strong> Terdapat 14 laporan terkonsentrasi di radius 300m sekitar
                Jembatan Sungai Pemali yang berpotensi memiliki akar masalah struktural yang sama.
              </p>
            </div>
            <button type="button" className="shrink-0 px-3 py-1.5 rounded-xl bg-surface-container-lowest hover:bg-surface-container text-primary font-label-sm text-label-sm font-semibold transition-colors">
              Buka Analisis Klaster
            </button>
          </div>
        </div>

        <div className="lg:col-span-4 flex flex-col gap-space-md">
          <ReportInspector pin={selectedPin} />
          <TopClusters onFocus={focusTarget} />
        </div>
      </div>
    </AdminLayout>
  );
}
