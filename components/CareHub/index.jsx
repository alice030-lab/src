import { useState, useEffect } from 'react';
import {
  LayoutDashboard, Activity, Smartphone, Thermometer, Volume2, Trophy, Heart, Users, Smile,
  Wifi, Utensils, Battery, Droplet, ShoppingBag, Stethoscope, Sparkles, Loader2, PlusCircle,
  AlertCircle, AlertTriangle, CheckCircle, ChevronDown, ClipboardList
} from 'lucide-react';
import { PetSwitcher } from '../PetSwitcher';
import { ReportModal } from '../ReportModal';
import { StatBar } from './StatBar';
import { HealthSection } from './HealthSection';
import { ExpenseTracker } from './ExpenseTracker';
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
  const scheduledItems = healthItems.filter(item => item.status !== 'urgent');
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

  return (
    <div className="pb-24 bg-slate-50 min-h-screen">
      <ReportModal healthReport={healthReport} currentPet={currentPet} setHealthReport={setHealthReport} />

      {/* 頂部卡片 */}
      <div className={`bg-gradient-to-br ${currentPet.themeColor} rounded-b-[2.5rem] pb-6 pt-10 text-white shadow-xl relative overflow-hidden transition-all duration-500`}>
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl -translate-y-10 translate-x-10"></div>
        <div className="mb-6 relative z-10">
          <p className="px-6 text-white/80 text-xs font-bold mb-3 uppercase tracking-wider">
            {isOverview ? '管理中心' : '選擇您的毛孩'}
          </p>
          <PetSwitcher currentPet={currentPet} setCurrentPet={setCurrentPet} pets={MOCK_PETS} overviewObj={overviewObj} />
        </div>

        <div className="px-6 relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {isOverview ? (
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <LayoutDashboard size={24} />
                家庭狀況看板
              </h2>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20">
                  <p className="text-white/70 text-xs">寵物總數</p>
                  <p className="text-2xl font-bold">{totalPets} <span className="text-sm font-normal">隻</span></p>
                </div>
                <div className={`p-4 rounded-xl border backdrop-blur-md ${urgentCount > 0 ? 'bg-red-500/20 border-red-400/50' : 'bg-emerald-500/20 border-emerald-400/50'}`}>
                  <p className="text-white/70 text-xs">待處理事項</p>
                  <p className="text-2xl font-bold flex items-center gap-2">
                    {urgentCount} <span className="text-sm font-normal">項緊急</span>
                    {urgentCount > 0 && <AlertTriangle size={18} className="text-red-300 animate-pulse" />}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-2 mb-3">
                {currentPet.type === 'reptile' ? <Thermometer size={24} /> : <Smartphone size={24} />}
                AI 智能管家
              </h2>

              <div className="bg-white/20 backdrop-blur-md p-3 rounded-xl border border-white/20 flex justify-between items-start mb-6">
                <p className="text-white text-xs leading-relaxed pr-2">
                  <span className="text-base mr-1">🤖</span>
                  {assistantMessage}
                </p>
                <button
                  onClick={handleSpeak}
                  disabled={isSpeaking}
                  className={`p-1.5 rounded-full transition-colors ${isSpeaking ? 'bg-white/40 animate-pulse' : 'bg-white/10 hover:bg-white/20'}`}
                >
                  <Volume2 size={16} />
                </button>
              </div>

              {gameStats && (
                <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-sm flex items-center gap-2">
                      <Trophy size={16} className="text-yellow-300" />
                      寵物養成狀態
                    </h3>
                    <span className="text-xs font-bold bg-white/20 px-2 py-0.5 rounded text-white">
                      Lv. {gameStats.level}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                    <StatBar label="信任值" value={gameStats.trust} color="bg-pink-400" icon={Heart} />
                    <StatBar label="健康值" value={gameStats.health} color="bg-emerald-400" icon={Activity} />
                    <StatBar label="快樂值" value={gameStats.happiness} color="bg-yellow-400" icon={Smile} />
                    <StatBar label="社交值" value={gameStats.social} color="bg-blue-400" icon={Users} />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 下方詳細內容區 */}
      {isOverview ? (
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
            <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2 mb-4">
              <ShoppingBag size={20} className="text-orange-500" />
              全家待購清單
            </h3>
            <div className="space-y-2">
              {shoppingList.map(item => (
                <div key={item.id} className="bg-white p-3 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded border-2 border-orange-300"></div>
                    <div>
                      <p className="font-bold text-slate-700 text-sm">{item.name}</p>
                      {item.forPet && item.forPet !== 'all' && (
                        <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded mt-1 inline-block">
                          {MOCK_PETS.find(p => p.id === item.forPet)?.name}
                        </span>
                      )}
                    </div>
                  </div>
                  {item.urgency === 'high' && <span className="text-[10px] bg-red-50 text-red-500 px-2 py-1 rounded-full font-bold">緊急</span>}
                </div>
              ))}
            </div>
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

          <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2 mb-4">
            <ShoppingBag size={20} className="text-orange-500" />
            {currentPet.name.split(' ')[0]} 的購物清單
          </h3>
          <div className="space-y-2 mb-8">
            {shoppingList.filter(item => item.forPet === 'all' || item.forPet === currentPet.id).length > 0 ? (
              shoppingList.filter(item => item.forPet === 'all' || item.forPet === currentPet.id).map(item => (
                <div key={item.id} className="bg-white p-3 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded border-2 border-orange-300"></div>
                    <div>
                      <p className="font-bold text-slate-700 text-sm">{item.name}</p>
                      {item.autoGenerated && <span className="text-[10px] text-orange-500 flex items-center gap-1"><Smartphone size={8} /> AI自動</span>}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-slate-400 text-sm text-center py-4">目前沒有待購項目</div>
            )}
          </div>

          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
              <Stethoscope size={20} className="text-teal-500" />
              健康護照
            </h3>
            <div className="flex gap-2">
              {healthItems.length > 0 && (
                <button
                  onClick={handleGenerateReport}
                  disabled={isReportLoading}
                  className={`text-sm font-medium px-2 py-1 rounded-lg border border-indigo-100 flex items-center gap-1 transition-all ${isReportLoading ? 'bg-indigo-200 text-indigo-700' : 'bg-indigo-100 text-indigo-600 hover:bg-indigo-200'}`}
                >
                  {isReportLoading ? (
                    <>
                      <Loader2 size={12} className="animate-spin" />
                      AI 分析中...
                    </>
                  ) : (
                    <>
                      <Sparkles size={12} />
                      AI 報告分析
                    </>
                  )}
                </button>
              )}
              <button className="text-teal-600 text-xs font-medium bg-teal-50 px-2 py-1 rounded-lg border border-teal-100 flex items-center gap-1">
                <PlusCircle size={12} /> 新增紀錄
              </button>
            </div>
          </div>

          {urgentItems.length > 0 && (
            <div className="bg-red-50 p-4 rounded-xl shadow-md mb-6 border-l-4 border-red-500">
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
            <div className="mb-8">
              <button
                onClick={() => setIsPassportOpen(!isPassportOpen)}
                className={`w-full flex justify-between items-center p-4 rounded-xl font-bold transition-all duration-300 ${isPassportOpen ? 'bg-teal-600 text-white shadow-lg' : 'bg-white text-teal-600 border border-slate-200 hover:bg-teal-50'}`}
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
      )}

      {/* 概覽模式也顯示財務管家 */}
      {isOverview && (
        <div className="px-6 mt-6">
          <ExpenseTracker currentPet={currentPet} expenses={expenses} setExpenses={setExpenses} />
        </div>
      )}
    </div>
  );
};

