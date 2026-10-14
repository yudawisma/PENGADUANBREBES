import { opdLoad, opdSmall } from '../../data/adminData';

export default function OpdLoadPanel() {
  return (
    <div className="lg:col-span-4 bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-space-sm">
          <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">Kapasitas Disposisi</span>
          <span className="font-label-md text-label-md text-secondary font-bold">5 SKPD Utama</span>
        </div>
        <h2 className="font-headline-sm text-headline-sm text-primary mb-space-md">Beban Penanganan Dinas</h2>

        <div className="flex flex-col gap-space-md">
          {opdLoad.map((o) => (
            <div key={o.name} className="flex flex-col gap-1.5 p-3 rounded-xl bg-surface-container-low">
              <div className="flex justify-between items-center font-label-md text-label-md">
                <span className="text-primary font-bold">{o.name}</span>
                <span className={`font-semibold ${o.loadClass}`}>{o.load}</span>
              </div>
              <div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${o.bar}`} style={{ width: `${o.pct}%` }} />
              </div>
              <span className="font-body-sm text-body-sm text-[12px] text-on-surface-variant">{o.note}</span>
            </div>
          ))}

          <div className="grid grid-cols-2 gap-2 mt-1">
            {opdSmall.map((o) => (
              <div key={o.name} className="p-2.5 rounded-xl bg-surface-container-low flex flex-col">
                <span className="font-label-sm text-label-sm text-on-surface-variant">{o.name}</span>
                <span className="font-label-lg text-label-lg text-primary font-bold">{o.count}</span>
                <span className="font-label-sm text-label-sm text-outline">{o.note}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-space-md pt-3 flex items-center justify-between">
        <span className="font-label-sm text-label-sm text-on-surface-variant">Waktu respon tercepat hari ini:</span>
        <span className="px-2 py-1 rounded bg-surface-container font-label-sm text-label-sm text-primary font-bold">Satpol PP (42 mnt)</span>
      </div>
    </div>
  );
}
