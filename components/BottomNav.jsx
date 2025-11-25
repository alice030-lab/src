import { Users, Activity, Plus, User, Image as ImageIcon } from 'lucide-react';

export const BottomNav = ({ activeTab, setActiveTab, onAddClick }) => (
  <div className="fixed bottom-0 left-0 right-0 border-t border-gray-100 px-6 py-1.5 flex justify-between items-center z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]" style={{ backgroundColor: '#86572C' }}>
    <button onClick={() => setActiveTab('gather')} style={{ backgroundColor: 'transparent', border: 'none', padding: 0 }} className="flex flex-col items-center space-y-0.5 text-white">
      <Users size={16} fill={activeTab === 'gather' ? "currentColor" : "none"} />
      <span className="text-[10px] font-medium"></span>
    </button>
    <button onClick={() => setActiveTab('care')} style={{ backgroundColor: 'transparent', border: 'none', padding: 0 }} className="flex flex-col items-center space-y-0.5 text-white">
      <Activity size={16} />
      <span className="text-[10px] font-medium"></span>
    </button>
    <button onClick={onAddClick} style={{ backgroundColor: 'transparent', border: 'none', padding: 0 }} className="flex flex-col items-center space-y-0.5 text-white">
      <Plus size={16} />
      <span className="text-[10px] font-medium">新增</span>
    </button>
    <button onClick={() => setActiveTab('owner')} style={{ backgroundColor: 'transparent', border: 'none', padding: 0 }} className="flex flex-col items-center space-y-0.5 text-white">
      <User size={16} fill={activeTab === 'owner' ? "currentColor" : "none"} />
      <span className="text-[10px] font-medium"></span>
    </button>
    <button onClick={() => setActiveTab('profile')} style={{ backgroundColor: 'transparent', border: 'none', padding: 0 }} className="flex flex-col items-center space-y-0.5 text-white">
      <ImageIcon size={16} fill={activeTab === 'profile' ? "currentColor" : "none"} />
      <span className="text-[10px] font-medium"></span>
    </button>
  </div>
);
