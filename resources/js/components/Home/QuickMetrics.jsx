import { heroMetrics } from '../../data/metrics';

export default function QuickMetrics() {
  return (
    <div className="grid grid-cols-3 gap-space-md pt-space-md w-full max-w-lg">
      {heroMetrics.map((m) => (
        <div key={m.label} className="p-space-sm bg-surface-container-low rounded-xl">
          <p className={`font-headline-sm text-headline-sm font-bold ${m.color}`}>{m.value}</p>
          <p className="font-label-sm text-label-sm text-on-surface-variant">{m.label}</p>
        </div>
      ))}
    </div>
  );
}
