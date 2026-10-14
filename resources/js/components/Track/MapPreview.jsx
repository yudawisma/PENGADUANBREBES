import Icon from '../common/Icon';

export default function MapPreview() {
  return (
    <section className="mt-space-lg rounded-3xl bg-surface-container-lowest p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div>
          <h3 className="font-headline-sm text-headline-sm text-primary">Peta Sebaran Laporan Aktif</h3>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Titik lokasi geospasial aduan di seluruh 17 Kecamatan Kabupaten Brebes.
          </p>
        </div>
        <a href="/#peta-publik" className="inline-flex items-center gap-1 text-secondary font-label-md text-label-md hover:underline">
          Buka Peta Interaktif Lengkap →
        </a>
      </div>
      {/* TODO: ganti background dengan peta sungguhan (Leaflet / Google Maps) */}
      <div className="w-full h-72 rounded-2xl bg-surface-container-low bg-cover bg-center relative overflow-hidden shadow-xs">
        <div className="absolute inset-0 bg-primary/20 backdrop-blur-[1px] flex items-center justify-center pointer-events-none">
          <div className="bg-surface-container-lowest/90 px-5 py-3 rounded-2xl shadow-md text-center max-w-sm pointer-events-auto">
            <Icon name="pin_drop" className="text-tertiary-container text-[32px]" />
            <p className="font-headline-sm text-headline-sm text-primary">Titik Koordinat Publik</p>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
              Ketanggungan • Bulakamba • Jatibarang • Larangan • Brebes Kota
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
