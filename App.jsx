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
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}
