import Icon from '../../common/Icon';
import { verifKpis } from '../../../data/verifikasiData';

export default function VerifKpis() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-lg">
      {verifKpis.map((k) => (
        <div key={k.label} className="relative overflow-hidden bg-surface-container-lowest rounded-xl p-space-lg shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div>
              <span className="font-label-md text-label-md text-on-surface-variant block mb-1">{k.label}</span>
              <div className="flex items-baseline gap-2">
                <span className={`font-headline-xl text-headline-xl font-bold ${k.valueClass}`}>{k.value}</span>
                <span className={`font-label-sm text-label-sm font-semibold ${k.unitClass}`}>{k.unit}</span>
              </div>
            </div>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-inner ${k.iconBox}`}>
              <Icon name={k.icon} className="text-[24px]" />
            </div>
          </div>
          <div className="mt-4 pt-3 flex items-center gap-2 bg-surface-container-low/60 -mx-space-lg -mb-space-lg px-space-lg py-2">
            <span className={`inline-flex items-center gap-1 font-label-sm text-[11px] font-bold px-2 py-0.5 rounded-full ${k.chip.className}`}>
              {k.chip.ping && <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-ping" />}
              {k.chip.icon && <Icon name={k.chip.icon} className="text-[12px]" />}
              {k.chip.text}
            </span>
            <span className="font-label-sm text-[11px] text-on-surface-variant">{k.foot}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
