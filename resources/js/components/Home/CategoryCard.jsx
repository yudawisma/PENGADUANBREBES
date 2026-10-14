import Icon from '../common/Icon';

export default function CategoryCard({ category, onSelect }) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onSelect(category.value)}
      onKeyDown={(e) => e.key === 'Enter' && onSelect(category.value)}
      className="group cursor-pointer bg-surface-container-lowest p-space-md rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between hover:-translate-y-1"
    >
      <div className="flex items-start justify-between mb-space-sm">
        <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
          <Icon name={category.icon} className="text-[24px]" />
        </div>
        <span className="px-2 py-0.5 rounded-full bg-surface-container-low font-label-sm text-label-sm text-on-surface-variant">
          {category.count} lap.
        </span>
      </div>
      <div>
        <h3 className="font-headline-sm text-[16px] leading-tight text-primary font-bold group-hover:text-tertiary-container transition-colors">
          {category.title}
        </h3>
        <p className="font-body-sm text-[13px] text-on-surface-variant mt-1 leading-snug">{category.desc}</p>
      </div>
    </div>
  );
}
