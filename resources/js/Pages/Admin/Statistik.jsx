import { useState } from 'react';
import AdminLayout from '../../components/Admin/AdminLayout';
import Icon from '../../components/common/Icon';
import StatKpis from '../../components/Admin/Statistik/StatKpis';
import { TrendChart, CategoryBars, StatusDonut } from '../../components/Admin/Statistik/Charts';
import TopOpd from '../../components/Admin/Statistik/TopOpd';
import OpdTable from '../../components/Admin/Statistik/OpdTable';
import { periods } from '../../data/statistikData';

export default function Statistik() {
  const [period, setPeriod] = useState('30 Hari'); // TODO: kirim ke API agar semua angka ikut berubah

  return (
    <AdminLayout>
      <nav className="flex items-center gap-2 text-on-surface-variant font-label-md text-label-md">
        <span>Portal Pengaduan Warga</span>
        <Icon name="chevron_right" className="text-[14px] text-outline" />
        <span>Diskominfo Brebes</span>
        <Icon name="chevron_right" className="text-[14px] text-outline" />
        <span className="text-primary font-bold">Analitik Eksekutif</span>
      </nav>

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
        <div className="flex flex-col gap-1 max-w-3xl">
          <div className="flex items-center gap-3">
            <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight">Statistik &amp; Kinerja OPD</h1>
            <span className="px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm uppercase font-bold tracking-wider">Kuartal I 2026</span>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
            Evaluasi volume aduan masyarakat, kecepatan respons, dan rasio penyelesaian perangkat daerah se-Kabupaten Brebes. Data berikut merupakan sampel simulasi pengawasan berkala.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-space-sm self-start lg:self-auto">
          <div className="flex items-center bg-surface-container-low rounded-lg p-1 shadow-sm">
            {periods.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPeriod(p)}
                className={`px-3 py-1.5 rounded-md font-label-md text-label-md transition-colors ${period === p ? 'bg-surface-container-lowest text-primary shadow-sm font-semibold' : 'text-on-surface-variant hover:text-on-surface'}`}
              >
                {p}
              </button>
            ))}
          </div>
          {/* TODO: unduh PDF / Excel dari Laravel */}
          <button type="button" className="h-10 px-3.5 rounded-lg bg-surface-container-lowest text-primary font-label-lg text-label-lg flex items-center gap-2 shadow-sm hover:bg-surface-container-high transition-colors">
            <Icon name="picture_as_pdf" className="text-[18px]" /> <span>Unduh PDF Rapor</span>
          </button>
          <button type="button" className="h-10 px-3.5 rounded-lg bg-primary-container text-on-primary font-label-lg text-label-lg flex items-center gap-2 shadow-sm hover:bg-primary transition-colors">
            <Icon name="table_view" className="text-[18px]" /> <span>Ekspor Excel</span>
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm py-1">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
          <span>Pembaruan otomatis: <strong>15 Feb 2026, 10:15 WIB</strong> (Sinkronisasi Server SP4N-Lapor)</span>
        </div>
        <span className="flex items-center gap-1">
          <Icon name="verified_user" className="text-[16px]" /> Target Standar Pelayanan Minimal (SPM) Brebes: &gt;90%
        </span>
      </div>

      <StatKpis />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
        <div className="lg:col-span-7 flex flex-col gap-space-lg">
          <TrendChart />
          <CategoryBars />
        </div>
        <div className="lg:col-span-5 flex flex-col gap-space-lg">
          <StatusDonut />
          <TopOpd />
        </div>
      </div>

      {/* TODO: sambungkan tombol Rapor ke halaman detail OPD */}
      <OpdTable />

      <div className="bg-surface-container-low rounded-xl p-space-md flex items-start gap-space-sm">
        <div className="w-6 h-6 rounded-md bg-secondary/10 flex items-center justify-center text-secondary shrink-0 mt-0.5">
          <Icon name="format_image_left" className="text-[18px]" />
        </div>
        <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
          <strong>Catatan Integritas Data &amp; Transparansi:</strong> Metrik dan persentase di atas disusun sebagai data ilustratif simulasi pemantauan Sistem
          Pengelolaan Pengaduan Pelayanan Publik Pemerintah Kabupaten Brebes. Evaluasi resmi Standar Pelayanan Minimal (SPM) disahkan triwulanan oleh
          Inspektorat Daerah Kabupaten Brebes sesuai Permendagri No. 59 Tahun 2021.
        </p>
      </div>
    </AdminLayout>
  );
}
