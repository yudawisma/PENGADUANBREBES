import Icon from '../common/Icon';

const dotStyles = [
  { wrap: 'bg-secondary-container text-on-secondary', inner: 'w-2 h-2 bg-white', card: 'bg-surface-container-low' },
  { wrap: 'bg-surface-container-highest text-primary', inner: 'w-2 h-2 bg-primary', card: 'bg-surface-container-lowest shadow-xs' },
];
const fallback = { wrap: 'bg-surface-container-high text-outline', inner: 'w-1.5 h-1.5 bg-outline', card: 'bg-surface-container-lowest shadow-xs' };

export default function CaseTimeline({ items }) {
  return (
    <div className="pt-6">
      <h3 className="font-headline-sm text-headline-sm text-primary mb-4">Catatan Kronologis &amp; Tanggapan OPD</h3>
      <div className="space-y-6 relative pl-6 before:content-[''] before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-surface-container-high">
        {items.map((t, i) => {
          const s = dotStyles[i] ?? fallback;
          return (
            <div key={t.time + t.actor} className="relative group">
              <div className={`absolute -left-6 top-1 w-5 h-5 rounded-full flex items-center justify-center shadow-xs ${s.wrap}`}>
                <span className={`rounded-full ${s.inner}`} />
              </div>
              <div className={`p-4 rounded-xl space-y-1.5 ${s.card}`}>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-label-md text-label-md text-primary font-bold">{t.actor}</span>
                  <span className="font-label-sm text-label-sm text-outline">{t.time}</span>
                </div>
                <p className={`font-body-sm text-body-sm ${i === 0 ? 'text-on-surface' : 'text-on-surface-variant'}`}>"{t.text}"</p>
                {t.note && (
                  <div className="inline-flex items-center gap-1.5 text-secondary font-label-sm text-label-sm pt-1">
                    <Icon name="assignment_turned_in" className="text-[16px]" />
                    <span>{t.note}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
