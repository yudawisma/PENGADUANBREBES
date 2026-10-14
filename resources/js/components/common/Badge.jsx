const tones = {
  amber: 'bg-amber-100 text-amber-800',
  green: 'bg-green-100 text-green-800',
  blue: 'bg-blue-100 text-blue-800',
};

export default function Badge({ tone = 'amber', className = '', children }) {
  return (
    <span className={`px-2.5 py-0.5 rounded-full font-label-sm text-label-sm font-bold ${tones[tone]} ${className}`}>
      {children}
    </span>
  );
}
