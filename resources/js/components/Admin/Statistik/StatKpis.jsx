import Icon from '../../common/Icon';
import { statKpis } from '../../../data/statistikData';

export default function StatKpis() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-space-md">
      {statKpis.map((k) => (
        <div key={k.label} className="bg-surface-container-lowest rounded-xl p-space-md flex flex-col justify-between shadow-sm relative overflow-hidden hover:shadow-md transition-shadow">
          <div className={`absolute -right-4 -top-4 w-20 h-20 rounded-full blur-xl pointer-events-none ${k.blob}`} />
          <div className="flex items-start justify-between">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${k.iconBox}`}>
              <Icon name={k.icon} className="text-[22px]" />
            </div>
            <span className={`px-2 py-0.5 rounded-full font-label-sm text-label-sm font-semibold flex items-center gap-1 ${k.chip.className}`}>
              {k.chip.icon && <Icon name={k.chip.icon} className="text-[12px]" />} {k.chip.text}
            </span>
          </div>
          <div className="mt-4 flex flex-col">
            <span className={`font-headline-lg text-headline-lg tracking-tight font-bold ${k.valueClass}`}>{k.value}</span>
            <span className="font-label-md text-label-md text-on-surface font-semibold mt-0.5">{k.label}</span>
            <span className="font-body-sm text-body-sm text-outline mt-1">{k.note}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
