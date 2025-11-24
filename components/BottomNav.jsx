import { Users, Activity, Plus, User, Image as ImageIcon } from 'lucide-react';

export const BottomNav = ({ activeTab, setActiveTab, onAddClick }) => (
  <div className="fixed bottom-0 left-0 right-0 border-t border-gray-100 px-6 py-1.5 flex justify-between items-center z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]" style={{ backgroundColor: '#86572C' }}>
    <button onClick={() => setActiveTab('gather')} className={`flex flex-col items-center space-y-0.5 ${activeTab === 'gather' ? 'text-indigo-600' : 'text-gray-400'}`}>
      <Users size={16} fill={activeTab === 'gather' ? "currentColor" : "none"} />
      <span className="text-[10px] font-medium">聚會</span>
    </button>
    <button onClick={() => setActiveTab('care')} className={`flex flex-col items-center space-y-0.5 ${activeTab === 'care' ? 'text-indigo-600' : 'text-gray-400'}`}>
      <Activity size={16} />
      <span className="text-[10px] font-medium">管家</span>
    </button>
    <button onClick={onAddClick} className="flex flex-col items-center space-y-0.5 text-gray-400 hover:text-indigo-600">
      <Plus size={16} />
      <span className="text-[10px] font-medium">新增</span>
    </button>
    <button onClick={() => setActiveTab('owner')} className={`flex flex-col items-center space-y-0.5 ${activeTab === 'owner' ? 'text-indigo-600' : 'text-gray-400'}`}>
      <User size={16} fill={activeTab === 'owner' ? "currentColor" : "none"} />
      <span className="text-[10px] font-medium">寵主</span>
    </button>
    <button onClick={() => setActiveTab('profile')} className={`flex flex-col items-center space-y-0.5 ${activeTab === 'profile' ? 'text-indigo-600' : 'text-gray-400'}`}>
      <ImageIcon size={16} fill={activeTab === 'profile' ? "currentColor" : "none"} />
      <span className="text-[10px] font-medium">相冊</span>
    </button>
  </div>
);
