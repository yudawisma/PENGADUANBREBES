export default function Icon({ name, className = '', filled = false }) {
  return (
    <span
      className={`material-symbols-outlined notranslate ${className}`}
      translate="no"
      style={filled ? { fontVariationSettings: '"FILL" 1' } : undefined}
    >
      {name}
    </span>
  );
}