import { useState } from 'react';
import {
  User, Settings, MessageCircle, Bell, Shield, Palette, Moon, Sun, Globe,
  LogOut, Edit3, Camera, Save, X, Send, Smile, Paperclip
} from 'lucide-react';

export const PetOwnerHub = () => {
  const [activeSection, setActiveSection] = useState('profile'); // profile, settings, chat
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: '米糕媽媽', message: '今天天氣真好，要不要帶毛孩去公園？', time: '10:30', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix' },
    { id: 2, sender: '我', message: '好主意！幾點方便？', time: '10:32', isMe: true },
    { id: 3, sender: '豆漿爸', message: '我也想去！', time: '10:35', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jack' },
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    setChatMessages([
      ...chatMessages,
      {
        id: chatMessages.length + 1,
        sender: '我',
        message: newMessage,
        time: new Date().toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit' }),
        isMe: true,
      },
    ]);
    setNewMessage('');
  };

  // 樣式設定中心 - 在這裡調整顏色、大小、間距和對齊
  const styles = {
    layout: {
      paddingTop: '96px', // 上方內距 (避免被標題擋住)
      paddingBottom: '96px', // 下方內距 (避免被底部導航擋住)
      paddingX: '16px', // 左右內距
      sectionSpacing: '24px', // 區塊間距
    },
    header: {
      backgroundColor: 'rgba(255, 255, 255, 0.9)', // 標題欄背景顏色 (半透明)
      backdropBlur: 'blur(12px)', // 背景模糊
      borderColor: '#F3F4F6', // 邊框顏色
      padding: '12px 16px', // 內距
      titleSize: '20px', // 標題文字大小
      titleColor: 'transparent', // 標題文字顏色 (使用漸層)
      gradientFrom: '#4F46E5', // 漸層起始顏色 (indigo-600)
      gradientTo: '#9333EA', // 漸層結束顏色 (purple-600)
    },
    tabs: {
      // 分頁標籤樣式
      padding: '12px', // 內距
      fontSize: '14px', // 文字大小
      activeColor: '#4F46E5', // 啟用顏色 (indigo-600)
      inactiveColor: '#9CA3AF', // 未啟用顏色 (gray-400)
      borderWidth: '2px', // 邊框寬度
    },
    profile: {
      // 個人資料卡片樣式
      avatarSize: '96px', // 頭像大小
      avatarBorderWidth: '4px', // 頭像邊框寬度
      avatarBorderColor: '#E0E7FF', // 頭像邊框顏色 (indigo-100)
      cardPadding: '24px', // 卡片內距
      cardBorderRadius: '16px', // 卡片圓角
      cardShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)', // 卡片陰影
    },
    chat: {
      // 聊天室樣式
      bubblePadding: '8px 16px', // 訊息泡泡內距
      bubbleBorderRadius: '16px', // 訊息泡泡圓角
      myBubbleColor: '#4F46E5', // 我的訊息背景顏色 (indigo-600)
      otherBubbleColor: '#FFFFFF', // 他人訊息背景顏色
      otherBubbleBorder: '#E5E7EB', // 他人訊息邊框顏色
      inputHeight: '48px', // 輸入框高度
      avatarSize: '40px', // 頭像大小
    },
    settings: {
      // 設定項目樣式
      itemPadding: '16px', // 項目內距
      itemBorderRadius: '16px', // 項目圓角
      toggleWidth: '48px', // 開關寬度
      toggleHeight: '24px', // 開關高度
      toggleBallSize: '20px', // 開關球大小
    },
    buttons: {
      primary: {
        backgroundColor: '#4F46E5', // 主要按鈕背景顏色 (indigo-600)
        color: '#FFFFFF', // 文字顏色
        padding: '8px 16px', // 內距
        borderRadius: '8px', // 圓角大小
        fontSize: '14px', // 文字大小
      },
      secondary: {
        backgroundColor: '#EEF2FF', // 次要按鈕背景顏色 (indigo-50)
        color: '#4F46E5', // 文字顏色 (indigo-600)
        padding: '8px 16px', // 內距
        borderRadius: '8px', // 圓角大小
        fontSize: '14px', // 文字大小
      },
      danger: {
        backgroundColor: '#FEF2F2', // 危險按鈕背景顏色 (red-50)
        color: '#DC2626', // 文字顏色 (red-600)
        padding: '12px', // 內距
        borderRadius: '12px', // 圓角大小
        fontSize: '16px', // 文字大小
      },
      icon: {
        size: 20, // 圖示大小
        padding: '8px', // 內距
        borderRadius: '9999px', // 圓角 (完全圓形)
      }
    },
    text: {
      heading: '20px', // 標題文字大小
      body: '14px', // 內文文字大小
      small: '12px', // 小字文字大小
      tiny: '10px', // 極小字文字大小
    },
    colors: {
      primary: '#4F46E5', // 主要顏色 (indigo-600)
      secondary: '#9333EA', // 次要顏色 (purple-600)
      success: '#10B981', // 成功顏色 (green-500)
      danger: '#DC2626', // 危險顏色 (red-600)
      warning: '#F59E0B', // 警告顏色 (amber-500)
      info: '#3B82F6', // 資訊顏色 (blue-500)
      background: '#F9FAFB', // 背景顏色 (gray-50)
      cardBackground: '#FFFFFF', // 卡片背景顏色
      border: '#E5E7EB', // 邊框顏色 (gray-200)
      textPrimary: '#1F2937', // 主要文字顏色 (gray-800)
      textSecondary: '#6B7280', // 次要文字顏色 (gray-500)
      textLight: '#9CA3AF', // 淺色文字 (gray-400)
    }
  };

  return (
    <div className="pb-24 bg-gray-50 min-h-screen">
      {/* 頂部導航 */}
      <div className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md z-40 border-b border-gray-100">
        <div className="px-4 py-3 flex justify-between items-center">
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
            寵主中心
          </h1>
          <div className="flex gap-2">
            <button
              onClick={() => setActiveSection('chat')}
              className={`p-2 rounded-full ${activeSection === 'chat' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-400'}`}
            >
              <MessageCircle size={20} />
            </button>
            <button
              onClick={() => setActiveSection('settings')}
              className={`p-2 rounded-full ${activeSection === 'settings' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-400'}`}
            >
              <Settings size={20} />
            </button>
          </div>
        </div>
        <div className="flex border-t border-gray-100">
          <button
            onClick={() => setActiveSection('profile')}
            className={`flex-1 py-3 text-sm font-medium ${activeSection === 'profile'
                ? 'text-indigo-600 border-b-2 border-indigo-600'
                : 'text-gray-400'
              }`}
          >
            個人資料
          </button>
          <button
            onClick={() => setActiveSection('chat')}
            className={`flex-1 py-3 text-sm font-medium ${activeSection === 'chat'
                ? 'text-indigo-600 border-b-2 border-indigo-600'
                : 'text-gray-400'
              }`}
          >
            聊天室
          </button>
          <button
            onClick={() => setActiveSection('settings')}
            className={`flex-1 py-3 text-sm font-medium ${activeSection === 'settings'
                ? 'text-indigo-600 border-b-2 border-indigo-600'
                : 'text-gray-400'
              }`}
          >
            設置
          </button>
        </div>
      </div>

      <div className="pt-24 px-4">
        {/* 個人資料區 */}
        {activeSection === 'profile' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex flex-col items-center">
                <div className="relative mb-4">
                  <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=User"
                    alt="頭像"
                    className="w-24 h-24 rounded-full border-4 border-indigo-100"
                  />
                  <button className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full shadow-lg">
                    <Camera size={16} />
                  </button>
                </div>
                <h2 className="text-xl font-bold text-gray-800 mb-1">寵主名稱</h2>
                <p className="text-sm text-gray-500 mb-4">petowner@example.com</p>
                <button className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg text-sm font-bold flex items-center gap-2">
                  <Edit3 size={14} />
                  編輯資料
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <User size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-800">寵物數量</p>
                    <p className="text-xs text-gray-500">4 隻毛孩</p>
                  </div>
                </div>
                <span className="text-2xl font-bold text-indigo-600">4</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <MessageCircle size={20} className="text-green-600" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-800">加入時間</p>
                    <p className="text-xs text-gray-500">2023年1月</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">1 年</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Shield size={20} className="text-purple-600" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-800">會員等級</p>
                    <p className="text-xs text-gray-500">VIP 會員</p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-xs font-bold">VIP</span>
              </div>
            </div>
          </div>
        )}

        {/* 聊天室 */}
        {activeSection === 'chat' && (
          <div className="flex flex-col h-[calc(100vh-180px)] animate-in fade-in slide-in-from-bottom-4">
            <div className="flex-1 overflow-y-auto space-y-4 mb-4">
              {chatMessages.map(msg => (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${msg.isMe ? 'flex-row-reverse' : ''}`}
                >
                  {!msg.isMe && (
                    <img
                      src={msg.avatar}
                      alt={msg.sender}
                      className="w-10 h-10 rounded-full"
                    />
                  )}
                  <div className={`flex-1 ${msg.isMe ? 'flex flex-col items-end' : ''}`}>
                    {!msg.isMe && (
                      <p className="text-xs text-gray-500 mb-1">{msg.sender}</p>
                    )}
                    <div
                      className={`inline-block px-4 py-2 rounded-2xl ${msg.isMe
                          ? 'bg-indigo-600 text-white'
                          : 'bg-white text-gray-800 border border-gray-200'
                        }`}
                    >
                      <p className="text-sm">{msg.message}</p>
                      <p className={`text-[10px] mt-1 ${msg.isMe ? 'text-indigo-100' : 'text-gray-400'}`}>
                        {msg.time}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-3 flex items-center gap-2">
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Paperclip size={20} />
              </button>
              <input
                type="text"
                value={newMessage}
                onChange={e => setNewMessage(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && handleSendMessage()}
                placeholder="輸入訊息..."
                className="flex-1 border-none outline-none text-sm"
              />
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Smile size={20} />
              </button>
              <button
                onClick={handleSendMessage}
                className="bg-indigo-600 text-white p-2 rounded-full"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        )}

        {/* 設置 */}
        {activeSection === 'settings' && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Bell size={18} />
                通知設置
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">推送通知</span>
                  <button
                    onClick={() => setNotifications(!notifications)}
                    className={`w-12 h-6 rounded-full transition-colors ${notifications ? 'bg-indigo-600' : 'bg-gray-300'
                      }`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full transition-transform ${notifications ? 'translate-x-6' : 'translate-x-1'
                        }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Palette size={18} />
                外觀設置
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {darkMode ? <Moon size={18} className="text-gray-600" /> : <Sun size={18} className="text-gray-600" />}
                    <span className="text-sm text-gray-700">深色模式</span>
                  </div>
                  <button
                    onClick={() => setDarkMode(!darkMode)}
                    className={`w-12 h-6 rounded-full transition-colors ${darkMode ? 'bg-indigo-600' : 'bg-gray-300'
                      }`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full transition-transform ${darkMode ? 'translate-x-6' : 'translate-x-1'
                        }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Globe size={18} />
                語言與地區
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">語言</span>
                  <span className="text-sm text-gray-500">繁體中文</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">地區</span>
                  <span className="text-sm text-gray-500">台灣</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Shield size={18} />
                隱私與安全
              </h3>
              <div className="space-y-3">
                <button className="w-full text-left text-sm text-gray-700 py-2">
                  隱私政策
                </button>
                <button className="w-full text-left text-sm text-gray-700 py-2">
                  帳號安全
                </button>
              </div>
            </div>

            <button className="w-full bg-red-50 text-red-600 py-3 rounded-xl font-bold flex items-center justify-center gap-2">
              <LogOut size={18} />
              登出
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

