import { useState, useEffect } from 'react';
import {
  LayoutDashboard, Activity, Smartphone, Thermometer, Volume2, Trophy, Heart, Users, Smile,
  Wifi, Utensils, Battery, Droplet, ShoppingBag, Stethoscope, Sparkles, Loader2, PlusCircle,
  AlertCircle, AlertTriangle, CheckCircle, ChevronDown, ClipboardList, Dog, Plus, FileText
} from 'lucide-react';
import { PetSwitcher } from '../PetSwitcher';
import { ReportModal } from '../ReportModal';
import { StatBar } from './StatBar';
import { HealthSection } from './HealthSection';
import { ExpenseTracker } from './ExpenseTracker';
import { ToDoList } from './ToDoList';
import { useGameStats } from '../../hooks/useGameStats';
import { getPetIssues } from '../../utils/petHelpers';
import { MOCK_PETS, MOCK_HEALTH_DB } from '../../data/mockData';
import { generateHealthReport, speakAssistantMessage } from '../../api/llmService';

export const CareHub = ({
  currentPet,
  setCurrentPet,
  overviewObj,
  healthItems,
  setHealthItems,
  shoppingList,
  deviceStatus,
  setDeviceStatus,
  healthReport,
  setHealthReport,
  isReportLoading,
  setIsReportLoading,
  isSpeaking,
  setIsSpeaking,
  expenses,
  setExpenses
}) => {
  const isOverview = currentPet.id === 'all';
  const totalPets = MOCK_PETS.length;
  const urgentCount = MOCK_PETS.reduce((acc, pet) => acc + getPetIssues(pet).filter(i => i.urgent).length, 0);
  const [isPassportOpen, setIsPassportOpen] = useState(false);
  const urgentItems = healthItems.filter(item => item.status === 'urgent');
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const scheduledItems = healthItems.filter(item => {
    if (item.status === 'urgent') return false;
    // Filter by year if lastDate exists
    if (item.lastDate) {
      const itemYear = new Date(item.lastDate).getFullYear();
      return itemYear === selectedYear;
    }
    return true;
  });
  const gameStats = useGameStats(currentPet);

  useEffect(() => {
    if (currentPet.id !== 'all') {
      setHealthItems(MOCK_HEALTH_DB[currentPet.id] || []);
      setDeviceStatus(currentPet.deviceStatus);
      setHealthReport(null);
    }
  }, [currentPet, setHealthItems, setDeviceStatus, setHealthReport]);

  const handleGenerateReport = async () => {
    if (isReportLoading) return;
    try {
      setIsReportLoading(true);
      const report = await generateHealthReport(currentPet, healthItems);
      setHealthReport(report);
    } catch (error) {
      setHealthReport("報告生成失敗，連線或 API 發生錯誤。詳情請見控制台 (Console)。");
    } finally {
      setIsReportLoading(false);
    }
  };

  const handleSpeak = async () => {
    if (isSpeaking) return;
    try {
      setIsSpeaking(true);
      const message = (() => {
        if (currentPet.type === 'dog') return `早安！今天 ${currentPet.name.split(' ')[0]} 活力充沛，建議散步 45 分鐘。`;
        if (currentPet.type === 'cat') return `主子 ${currentPet.name.split(' ')[0]} 昨晚跑酷了 2 次，現在正在補眠。`;
        if (currentPet.type === 'reptile') return `${currentPet.name.split(' ')[0]} 的保溫箱目前 ${deviceStatus.temp}°C，濕度適中，適合曬背。`;
        return '早安！記得查看您的寵物狀態。';
      })();
      await speakAssistantMessage(message);
    } catch (error) {
      console.error('TTS Error:', error);
    } finally {
      setIsSpeaking(false);
    }
  };

  const assistantMessage = (() => {
    if (currentPet.type === 'dog') return `早安！今天 ${currentPet.name.split(' ')[0]} 活力充沛，建議散步 45 分鐘。`;
    if (currentPet.type === 'cat') return `主子 ${currentPet.name.split(' ')[0]} 昨晚跑酷了 2 次，現在正在補眠。`;
    if (currentPet.type === 'reptile') return `${currentPet.name.split(' ')[0]} 的保溫箱目前 ${deviceStatus.temp}°C，濕度適中，適合曬背。`;
    return '早安！記得查看您的寵物狀態。';
  })();

  // 根據數值決定進度條顏色
  const getStatColor = (value) => {
    if (value >= 70) return 'bg-[#579F87]'; // 良好 (70-100)
    if (value >= 40) return 'bg-[#B68E39]'; // 中等 (40-69)
    return 'bg-[#B1543D]'; // 緊急 (0-39)
  };

  // 樣式設定中心 - 參考 GatheringHub
  const styles = {
    layout: {
      paddingTop: '-10px',
      backgroundColor: '#fff5ebff',
    },
    header: {
      backgroundColor: '#86572C',
      padding: '6px 16px',
      titleSize: '14px',
      titleColor: '#FFFFFF',
    },
    card: {
      backgroundColor: '#f5eee0ff', // 可在此處更改卡片背景顏色
      textColor: '#86572C',         // 主要文字顏色
      subTextColor: '#86572C', // 次要文字顏色
      titleSize: '24px',            // 標題文字大小
      textSize: '16px',             // 一般文字大小
    }
  };

  return (
    <div className="pb-24 min-h-screen"
      style={{ backgroundColor: styles.layout.backgroundColor }}>
      <ReportModal healthReport={healthReport} currentPet={currentPet} setHealthReport={setHealthReport} />

      {/* 頂部導航 */}
      <div
        className="fixed top-0 left-0 right-0 z-40 flex justify-between items-center shadow-md"
        style={{
          backgroundColor: styles.header.backgroundColor,
          padding: styles.header.padding
        }}
      >
        <div className="flex items-center gap-2" style={{ flex: 1 }}>
          <Dog className="text-white" size={24} style={{ marginRight: '8px' }} />
          <h1
            className="font-bold"
            style={{
              fontSize: styles.header.titleSize,
              color: styles.header.titleColor,
            }}
          >
            寵物管家
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <button
            className="p-2 rounded-full text-white hover:bg-white/10 transition-colors"
            style={{ backgroundColor: 'transparent' }}
          >
            <Plus size={20} />
          </button>
          <button
            className="p-2 rounded-full text-white hover:bg-white/10 transition-colors"
            style={{ backgroundColor: 'transparent' }}
          >
            <FileText size={20} />
          </button>
        </div>
      </div>

      {/* 頂部卡片 */}
      <div
        className="rounded-b-[2.5rem] pb-6 pt-10 shadow-x2 relative overflow-hidden transition-all duration-500"
        style={{
          marginTop: styles.layout.paddingTop,
          backgroundColor: '#e5d2beff',
          color: styles.card.textColor
        }}
      >
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl -translate-y-10 translate-x-10"></div>
        <div className="mb-6 relative z-10">
          <p
            className="px-6 font-bold mb-3 uppercase tracking-wider"
            style={{ color: styles.card.subTextColor, fontSize: '16px' }}
          >
            {/* {isOverview && '選擇您的毛孩'} */}
          </p>
          <PetSwitcher currentPet={currentPet} setCurrentPet={setCurrentPet} pets={MOCK_PETS} overviewObj={overviewObj} />
        </div>

        <div className="px-6 relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {isOverview ? (
            <div>
              <h2
                className="font-bold flex items-center gap-2"
                style={{ fontSize: styles.card.titleSize, color: '#47240A' }}
              >
                <LayoutDashboard size={24} />
                家庭狀況看板
              </h2>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="bg-white/70 backdrop-blur-md p-4 rounded-xl border border-color: '#86572C'">
                  <p style={{ color: '#86572C', fontSize: '12px' }}>寵物總數</p>
                  <p className="font-bold" style={{ fontSize: '24px' }}>{totalPets} <span style={{ fontSize: styles.card.textSize, fontWeight: 'normal' }}>隻</span></p>
                </div>
                <div className={`p-4 rounded-xl bg-white/70 border backdrop-blur-md ${urgentCount > 0 ? 'border-color: #86572C ' : 'border-color: #86572C '}`}>
                  <p style={{ color: '#86572C', fontSize: '12px' }}>待處理事項</p>
                  <p className="font-bold flex items-center gap-2" style={{ fontSize: '24px' }}>
                    {urgentCount} <span style={{ fontSize: styles.card.textSize, fontWeight: 'normal' }}>項緊急</span>
                    {urgentCount > 0 && <AlertTriangle size={18} className="text-red-300 animate-pulse" />}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <h2
                className="font-bold flex items-center gap-2 mb-3"
                style={{ fontSize: styles.card.titleSize, color: '#47240A' }}
              >
                {currentPet.type === 'reptile' ? <Thermometer size={24} /> : <Smartphone size={24} />}
                {currentPet.name} {currentPet.sound}
              </h2>

              {/* --- 修改開始：助手插圖與對話框區域 --- */}
              <div className="flex items-start gap-3 mb 0 px-2 pb-2">

                {/* 左側：插圖角色 */}
                <div className="w-24 flex-shrink-0 relative z-10 translate-y12">
                  <img
                    src="https://i.meee.com.tw/MUEnaER.png"
                    alt="Assistant"
                    className="w-full object-contain drop-shadow-md transform scale-110 -mb-2"
                  />
                </div>

                {/* 右側：對話氣泡 */}
                <div
                  className="flex-1 bg-[#fdfbf7] p-4 rounded-2xl rounded-bl-none shadow-sm relative border border-[#E6D5C3]"
                  style={{
                    // 這裡模擬截圖中的立體邊框感
                    boxShadow: '0 4px 6px -1px rgba(134, 87, 44, 0.1), 0 2px 4px -1px rgba(134, 87, 44, 0.06)'
                  }}
                >
                  {/* 氣泡的小尾巴 (指向左下角角色) */}
                  <div
                    className="absolute bottom-0 -left-2 w-4 h-4 bg-[#fdfbf7] border-b border-l border-[#E6D5C3]"
                    style={{
                      clipPath: 'polygon(100% 0, 100% 100%, 0% 100%)' // 裁切成三角形
                    }}
                  ></div>

                  {/* 內容區域 */}
                  <div className="flex justify-between items-start">
                    <p
                      className="leading-relaxed pr-2 font-bold text-sm tracking-wide"
                      style={{ color: '#86572C' }} // 使用截圖中的深棕色文字
                    >
                      {assistantMessage}
                    </p>
                  </div>
                </div>
              </div>
              {/* --- 修改結束 --- */}
              {gameStats && (
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 border border-#86572C relative z-20">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-sm flex items-center gap-2">
                      <Trophy size={16} className="text-#86572C" />
                      寵物養成狀態
                    </h3>
                    <span className="text-xs font-bold bg-white/100 px-2 py-0.5 rounded text-#86572C">
                      Lv. {gameStats.level}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                    <StatBar label="信任值" value={gameStats.trust} color={getStatColor(gameStats.trust)} icon={Heart} textColor={styles.card.textColor} />
                    <StatBar label="健康值" value={gameStats.health} color={getStatColor(gameStats.health)} icon={Activity} textColor={styles.card.textColor} />
                    <StatBar label="快樂值" value={gameStats.happiness} color={getStatColor(gameStats.happiness)} icon={Smile} textColor={styles.card.textColor} />
                    <StatBar label="社交值" value={gameStats.social} color={getStatColor(gameStats.social)} icon={Users} textColor={styles.card.textColor} />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 下方詳細內容區 */}
      {
        isOverview ? (
          <div className="px-6 mt-6 animate-in fade-in duration-500">
            <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2 mb-4">
              <ClipboardList size={20} className="text-slate-500" />
              各寵物狀態一覽
            </h3>
            <div className="space-y-3">
              {MOCK_PETS.map(pet => {
                const issues = getPetIssues(pet);
                const isUrgent = issues.some(i => i.urgent);

                return (
                  <div key={pet.id} className={`bg-white p-4 rounded-2xl shadow-sm border transition-all ${isUrgent ? 'border-red-200 ring-1 ring-red-100' : 'border-slate-100'}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <img src={pet.avatar} alt={pet.name} className="w-12 h-12 rounded-full bg-gray-100 object-cover border border-slate-100" />
                        <div>
                          <p className="font-bold text-slate-800">{pet.name}</p>
                          <p className="text-xs text-slate-500">{pet.breed}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setCurrentPet(pet)}
                        className="px-3 py-1 text-xs font-medium bg-slate-50 text-slate-600 rounded-lg hover:bg-slate-100"
                      >
                        查看詳情
                      </button>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {issues.length > 0 ? (
                        issues.map((issue, idx) => (
                          <span key={idx} className={`text-xs px-2 py-1 rounded-md font-bold flex items-center gap-1 ${issue.urgent ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600'}`}>
                            {issue.urgent ? <AlertCircle size={10} /> : <AlertTriangle size={10} />}
                            {issue.label}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs px-2 py-1 rounded-md bg-green-50 text-green-600 font-bold flex items-center gap-1">
                          <CheckCircle size={10} /> 狀態良好
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8">
              <ToDoList currentPet={currentPet} initialTasks={shoppingList.map(item => ({
                id: item.id,
                title: item.name,
                category: 'shopping',
                date: new Date().toISOString().split('T')[0],
                time: '10:00',
                completed: false,
                petId: item.forPet || 'all'
              }))} />
            </div>
          </div>
        ) : (
          <div className="px-6 mt-6 animate-in fade-in duration-500">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                <Wifi size={18} className="text-indigo-500" />
                {currentPet.name.split(' ')[0]} 的設備
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden">
                <div className="flex justify-between items-start mb-2">
                  <Utensils size={16} className="text-orange-500" />
                  <Battery size={12} className="text-gray-400" />
                </div>
                <p className="text-xs text-gray-400">餵食器餘量</p>
                <div className="w-full bg-gray-100 h-2 rounded-full mt-2 mb-1 overflow-hidden">
                  <div className={`h-full rounded-full ${deviceStatus.feeder < 20 ? 'bg-red-500' : 'bg-orange-400'}`} style={{ width: `${deviceStatus.feeder}%` }}></div>
                </div>
                <span className="text-xl font-bold text-slate-700">{deviceStatus.feeder}%</span>
                {deviceStatus.feeder < 20 && <p className="text-[10px] text-red-500 mt-1">⚠ 已自動加入採買</p>}
              </div>
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                <div className="flex justify-between items-start mb-2">
                  {currentPet.type === 'reptile' ? <Thermometer size={16} className="text-red-500" /> : <Droplet size={16} className="text-blue-500" />}
                  <Wifi size={12} className="text-gray-400" />
                </div>
                <p className="text-xs text-gray-400">{currentPet.type === 'reptile' ? '熱點溫度' : '水質分數'}</p>
                <span className="text-xl font-bold text-slate-700">
                  {currentPet.type === 'reptile' ? `${deviceStatus.temp}°C` : deviceStatus.water}
                </span>
              </div>
            </div>

            <div className="mb-8">
              <ToDoList currentPet={currentPet} initialTasks={shoppingList.filter(item => item.forPet === 'all' || item.forPet === currentPet.id).map(item => ({
                id: item.id,
                title: item.name,
                category: 'shopping',
                date: new Date().toISOString().split('T')[0],
                time: '10:00',
                completed: false,
                petId: item.forPet || 'all'
              }))} />
            </div>

            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                  <Stethoscope size={20} className="text-teal-500" />
                  健康護照
                </h3>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                  className="text-xs font-bold bg-white border border-slate-200 rounded-lg px-2 py-1 text-slate-600 outline-none focus:border-teal-500"
                >
                  {[2023, 2024, 2025, 2026].map(year => (
                    <option key={year} value={year}>{year}年</option>
                  ))}
                </select>
              </div>
              <div className="flex gap-2" >
                {healthItems.length > 0 && (
                  <button
                    style={{ backgroundColor: '#a38b79ff', fontSize: '12px' }}
                    onClick={handleGenerateReport}
                    disabled={isReportLoading}
                    className={`font-medium px-2 py-1 rounded-lg border border-indigo-100 flex items-center gap-1 transition-all ${isReportLoading ? 'bg-indigo-200 text-indigo-700' : 'bg-indigo-100 text-indigo-600 hover:bg-indigo-200'}`}
                  >
                    {isReportLoading ? (
                      <>
                        <Loader2 size={8} className="animate-spin" />
                        AI 分析中...
                      </>
                    ) : (
                      <>
                        AI分析
                      </>
                    )}
                  </button>
                )}
                <button style={{ backgroundColor: '#a38b79ff', fontSize: '12px' }} className="text-teal-600 font-medium bg-teal-50 px-2 py-1 rounded-lg border border-teal-100 flex items-center gap-1">
                  新增紀錄
                </button>
              </div>

            </div>

            {urgentItems.length > 0 && (
              <div style={{ backgroundColor: '#ffffffff' }} className="p-4 rounded-xl shadow-md mb-6 border-l-4 border-#d1b59aff">
                <h4 className="flex items-center text-sm font-bold text-red-600 mb-3">
                  <AlertCircle size={16} className="mr-1" />
                  建議立即回診/追蹤項目
                </h4>
                <div className="space-y-3">

                  {urgentItems.map(item => (
                    <div key={item.id} className="flex justify-between items-center p-3 bg-white rounded-lg border border-red-200 shadow-sm">
                      <div>
                        <p className="font-bold text-slate-800 text-sm">{item.name}</p>
                        {item.note && <p className="text-xs text-red-500">{item.note}</p>}
                      </div>
                      <span className="text-xs text-red-700 font-bold bg-red-100 px-2 py-1 rounded-full">
                        {item.nextDue ? `過期於 ${item.nextDue}` : '數值異常'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {scheduledItems.length > 0 && (
              <div className="mb-8" >
                <button
                  onClick={() => setIsPassportOpen(!isPassportOpen)}
                  className={`w-full flex justify-between items-center p-4 rounded-xl font-bold transition-all duration-300 ${isPassportOpen ? 'bg-[#3D2209]text-white shadow-lg' : 'bg-white text-teal-600 border border-slate-200 hover:bg-teal-50'}`}
                  style={{
                    backgroundColor: isPassportOpen ? '#3D2209' : '#3D2209'
                  }}
                >
                  <span>完整健康護照 (共 {scheduledItems.length} 項紀錄)</span>
                  <ChevronDown size={20} className={`transition-transform duration-300 ${isPassportOpen ? 'rotate-180' : ''}`} />
                </button>

                <div
                  className="transition-all duration-500 ease-in-out overflow-hidden"
                  style={{
                    maxHeight: isPassportOpen ? '1500px' : '0',
                    opacity: isPassportOpen ? 1 : 0,
                    paddingTop: isPassportOpen ? '1rem' : '0'
                  }}
                >
                  <HealthSection items={scheduledItems} />
                </div>
              </div>
            )}

            {urgentItems.length === 0 && scheduledItems.length === 0 && (
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 text-center text-slate-400 text-sm">
                尚無詳細健檢紀錄
              </div>
            )}

            {/* 財務管家 */}
            <ExpenseTracker currentPet={currentPet} expenses={expenses} setExpenses={setExpenses} />
          </div>
        )
      }

      {/* 概覽模式也顯示財務管家 */}
      {
        isOverview && (
          <div className="px-6 mt-6">
            <ExpenseTracker currentPet={currentPet} expenses={expenses} setExpenses={setExpenses} />
          </div>
        )
      }
    </div >
  );
};

