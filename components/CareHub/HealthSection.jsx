import { AlertCircle, AlertTriangle, CheckCircle } from 'lucide-react';

export const HealthSection = ({ items }) => {
  const categories = [
    { key: 'physical', label: '📋 基本理學檢查' },
    { key: 'preventive', label: '💉 預防醫學' },
    { key: 'blood', label: '🩸 血液與實驗室檢查' },
    { key: 'imaging', label: '🩻 影像與其他' }
  ];

  return (
    <div className="space-y-6">
      {categories.map(cat => {
        const catItems = items.filter(i => i.category === cat.key);
        if (catItems.length === 0) return null;

        return (
          <div key={cat.key}>
            <h4 className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider ml-1">{cat.label}</h4>
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="divide-y divide-slate-50">
                {catItems.map(item => (
                  <div key={item.id} className="p-4 hover:bg-slate-50 transition-colors">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-bold text-slate-800 text-sm">{item.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          {item.value && <span className="text-sm font-mono text-slate-600">{item.value}</span>}
                          {item.note && <span className="text-[10px] bg-yellow-50 text-yellow-600 px-1.5 rounded">{item.note}</span>}
                        </div>
                        <p className="text-[10px] text-slate-400 mt-1">紀錄於: {item.lastDate}</p>
                      </div>
                      <div className="flex flex-col items-end">
                        {item.status === 'urgent' ? <AlertCircle size={18} className="text-red-500 mb-1" /> :
                          item.status === 'warning' ? <AlertTriangle size={18} className="text-amber-500 mb-1" /> :
                            <CheckCircle size={18} className="text-green-500 mb-1" />}

                        {item.nextDue && (
                          <span className={`text-[10px] font-medium ${item.status === 'urgent' ? 'text-red-600' : 'text-slate-400'}`}>
                            下次: {item.nextDue}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

