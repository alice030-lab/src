import { useState } from 'react';
import './App.css';

// 組件
import { BottomNav } from './components/BottomNav';
import { GatheringHub } from './components/GatheringHub';
import { CareHub } from './components/CareHub';
import { PhotoAlbum } from './components/PhotoAlbum';
import { PetOwnerHub } from './components/PetOwnerHub';

// 數據
import { OVERVIEW_OBJ, INITIAL_MEMORIES, MOCK_GATHERINGS, DEFAULT_SHOPPING_LIST, MOCK_EXPENSES } from './data/mockData';

export default function App() {
  const [activeTab, setActiveTab] = useState('care'); // 改回管家頁面
  const [currentPet, setCurrentPet] = useState(OVERVIEW_OBJ);

  // 狀態
  const [notificationCount] = useState(3);
  const [healthItems, setHealthItems] = useState([]);
  const [shoppingList] = useState(DEFAULT_SHOPPING_LIST);
  const [deviceStatus, setDeviceStatus] = useState({});
  const [memories, setMemories] = useState(INITIAL_MEMORIES);
  const [expenses, setExpenses] = useState(MOCK_EXPENSES);

  // LLM 相關狀態
  const [healthReport, setHealthReport] = useState(null);
  const [isReportLoading, setIsReportLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // 新增模態框狀態
  const [showAddModal, setShowAddModal] = useState(false);

  const handleAddClick = () => {
    setShowAddModal(true);
  };

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen shadow-2xl overflow-hidden relative font-sans text-gray-900">
      {activeTab === 'gather' && (
        <GatheringHub gatherings={MOCK_GATHERINGS} notificationCount={notificationCount} />
      )}
      {activeTab === 'care' && (
        <CareHub
          currentPet={currentPet}
          setCurrentPet={setCurrentPet}
          overviewObj={OVERVIEW_OBJ}
          healthItems={healthItems}
          setHealthItems={setHealthItems}
          shoppingList={shoppingList}
          deviceStatus={deviceStatus}
          setDeviceStatus={setDeviceStatus}
          healthReport={healthReport}
          setHealthReport={setHealthReport}
          isReportLoading={isReportLoading}
          setIsReportLoading={setIsReportLoading}
          isSpeaking={isSpeaking}
          setIsSpeaking={setIsSpeaking}
          expenses={expenses}
          setExpenses={setExpenses}
        />
      )}
      {activeTab === 'profile' && (
        <PhotoAlbum
          currentPet={currentPet}
          setCurrentPet={setCurrentPet}
          memories={memories}
          setMemories={setMemories}
        />
      )}
      {activeTab === 'owner' && <PetOwnerHub />}

      {/* 新增功能的底部彈出模態框 */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end" onClick={() => setShowAddModal(false)}>
          <div
            className="bg-white w-full rounded-t-3xl p-6 pb-20 animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-6"></div>
            <h2 className="text-xl font-bold mb-4">新增內容</h2>
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 bg-indigo-50 rounded-xl text-center hover:bg-indigo-100 transition-colors">
                <div className="text-2xl mb-2">📝</div>
                <div className="font-medium">新增記錄</div>
              </button>
              <button className="p-4 bg-purple-50 rounded-xl text-center hover:bg-purple-100 transition-colors">
                <div className="text-2xl mb-2">📸</div>
                <div className="font-medium">上傳照片</div>
              </button>
              <button className="p-4 bg-pink-50 rounded-xl text-center hover:bg-pink-100 transition-colors">
                <div className="text-2xl mb-2">🎉</div>
                <div className="font-medium">建立聚會</div>
              </button>
              <button className="p-4 bg-blue-50 rounded-xl text-center hover:bg-blue-100 transition-colors">
                <div className="text-2xl mb-2">💰</div>
                <div className="font-medium">記帳</div>
              </button>
            </div>
          </div>
        </div>
      )}

      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} onAddClick={handleAddClick} />
    </div>
  );
}
