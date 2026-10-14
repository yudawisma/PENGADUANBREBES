import Icon from '../../common/Icon';
import { topOpd, spmStyles } from '../../../data/statistikData';

export default function TopOpd() {
  return (
    <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-headline-sm text-headline-sm text-primary font-semibold">Kecepatan &amp; Kinerja Top OPD</h3>
          <p className="font-body-sm text-body-sm text-on-surface-variant">Perangkat daerah dengan volume tertinggi</p>
        </div>
        <Icon name="speed" className="text-secondary text-[22px]" />
      </div>
      <div className="flex flex-col gap-3">
        {topOpd.map((o) => {
          const s = spmStyles[o.spm];
          return (
            <div key={o.name} className="p-3 bg-surface-container-low rounded-lg flex items-center justify-between">
              <div className="flex flex-col">
                <span className="font-label-md text-label-md text-on-surface font-bold">{o.name}</span>
                <span className="font-body-sm text-body-sm text-outline">
                  Respons: <strong>{o.resp}</strong> {o.respNote}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className={`font-bold font-label-lg text-label-lg ${s.text}`}>{o.pct}</span>
                <span className={`px-2 py-0.5 rounded font-label-sm text-label-sm font-semibold ${s.badge}`}>{o.spm}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
