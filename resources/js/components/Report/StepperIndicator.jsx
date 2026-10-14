const labels = ['1. Info Laporan', '2. Lokasi', '3. Bukti Foto', '4. Konfirmasi'];

export default function StepperIndicator({ step, onChange }) {
  return (
    <div className="grid grid-cols-4 gap-2 mb-space-lg">
      {labels.map((label, i) => {
        const n = i + 1;
        const reached = n <= step;
        return (
          <div key={label} className="flex flex-col gap-1 cursor-pointer" onClick={() => onChange(n)}>
            <div className={`h-2 rounded-full transition-all ${reached ? 'bg-tertiary-container' : 'bg-surface-container'}`} />
            <span className={`font-label-sm text-label-sm ${n === step ? 'text-primary font-bold' : 'text-on-surface-variant font-medium'}`}>
              {label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
