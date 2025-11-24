import { Users, Activity, Plus, User, Image as ImageIcon } from 'lucide-react';

export const BottomNav = ({ activeTab, setActiveTab }) => (
  <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-3 flex justify-between items-center z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
    <button onClick={() => setActiveTab('gather')} className={`flex flex-col items-center space-y-1 ${activeTab === 'gather' ? 'text-indigo-600' : 'text-gray-400'}`}>
      <Users size={24} fill={activeTab === 'gather' ? "currentColor" : "none"} />
      <span className="text-xs font-medium">聚會</span>
    </button>
    <button onClick={() => setActiveTab('care')} className={`flex flex-col items-center space-y-1 ${activeTab === 'care' ? 'text-indigo-600' : 'text-gray-400'}`}>
      <Activity size={24} />
      <span className="text-xs font-medium">管家</span>
    </button>
    <div className="relative -top-6">
      <button className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 border-4 border-gray-50">
        <Plus size={28} />
      </button>
    </div>
    <button onClick={() => setActiveTab('owner')} className={`flex flex-col items-center space-y-1 ${activeTab === 'owner' ? 'text-indigo-600' : 'text-gray-400'}`}>
      <User size={24} fill={activeTab === 'owner' ? "currentColor" : "none"} />
      <span className="text-xs font-medium">寵主</span>
    </button>
    <button onClick={() => setActiveTab('profile')} className={`flex flex-col items-center space-y-1 ${activeTab === 'profile' ? 'text-indigo-600' : 'text-gray-400'}`}>
      <ImageIcon size={24} fill={activeTab === 'profile' ? "currentColor" : "none"} />
      <span className="text-xs font-medium">相冊</span>
    </button>
  </div>
);

