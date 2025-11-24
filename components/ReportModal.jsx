import { X, Stethoscope } from 'lucide-react';

export const ReportModal = ({ healthReport, currentPet, setHealthReport }) => {
  if (!healthReport) return null;

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl animate-in fade-in slide-in-from-bottom-8">
        <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center z-10">
          <h3 className="text-lg font-bold text-teal-600 flex items-center gap-2">
            <Stethoscope size={20} />
            {currentPet.name} - AI 健康報告
          </h3>
          <button
            onClick={() => setHealthReport(null)}
            className="p-1 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-4 prose max-w-none text-slate-700">
          {healthReport.split('\n').map((line, index) => {
            if (line.startsWith('## ')) {
              return <h3 key={index} className="text-xl font-bold mt-4 mb-2 text-slate-800">{line.substring(3)}</h3>;
            }
            if (line.startsWith('* ')) {
              return <li key={index} className="text-sm ml-4 mb-1">{line.substring(2)}</li>
            }
            if (line.trim().length === 0) return <br key={index} />;
            return <p key={index} className="text-sm leading-relaxed mb-2">{line}</p>;
          })}
        </div>
        <div className="p-4 border-t bg-gray-50 text-xs text-gray-500">
          * 本報告由 AI 模型生成，僅供參考，不應取代專業獸醫的診斷。
        </div>
      </div>
    </div>
  );
};

