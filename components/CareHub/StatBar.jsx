export const StatBar = ({ label, value, color, icon: Icon, textColor = '#FFFFFF' }) => (
  <div className="mb-3">
    <div className="flex justify-between items-center mb-1">
      <div className="flex items-center gap-1.5">
        <Icon size={14} className="opacity-90" style={{ color: textColor }} />
        <span className="text-xs font-bold" style={{ color: textColor }}>{label}</span>
      </div>
      <span className="text-xs font-mono" style={{ color: textColor }}>{value}</span>
    </div>
    <div className="h-2 bg-black/20 rounded-full overflow-hidden">
      <div
        className={`h-full rounded-full transition-all duration-1000 ${color}`}
        style={{ width: `${value}%` }}
      ></div>
    </div>
  </div>
);

