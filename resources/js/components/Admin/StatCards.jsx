import Icon from '../common/Icon';
import { adminStats } from '../../data/adminData';

export default function StatCards() {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-space-md mb-space-xl">
      {adminStats.map((s) => (
        <div key={s.label} className="p-space-lg rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className={`absolute -right-3 -top-3 w-16 h-16 rounded-full transition-colors ${s.blob}`} />
          <div className="flex items-center justify-between">
            <span className={`font-label-md text-label-md ${s.labelClass}`}>{s.label}</span>
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${s.iconBox}`}>
              <Icon name={s.icon} filled={s.filled} className="text-[18px]" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-baseline gap-2">
              <span className={`font-headline-xl text-headline-xl font-bold tracking-tight ${s.valueClass}`}>{s.value}</span>
              <span className={s.aside.className}>
                {s.aside.icon && <Icon name={s.aside.icon} className="text-[14px]" />} {s.aside.text}
              </span>
            </div>
            {s.note && <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">{s.note}</p>}
            {s.progress && (
              <div className="w-full bg-surface-container h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-secondary-container h-full rounded-full" style={{ width: `${s.progress}%` }} />
              </div>
            )}
          </div>
        </div>
      ))}
    </section>
  );
}
