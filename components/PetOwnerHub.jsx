import { useState } from 'react';
import {
  User, Settings, MessageCircle, Bell, Shield, Palette, Moon, Sun, Globe,
  LogOut, Edit3, Camera, Save, X, Send, Smile, Paperclip, Dog, Search
} from 'lucide-react';

export const PetOwnerHub = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [showChatModal, setShowChatModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [activeChatCategory, setActiveChatCategory] = useState('寵友群組'); // 寵友群組, 私人朋友, 活動專用

  // 不同分類的聊天訊息
  const chatData = {
    '寵友群組': [
      { id: 1, sender: '米糕媽媽', message: '今天天氣真好，要不要帶毛孩去公園？', time: '10:30', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix' },
      { id: 2, sender: '我', message: '好主意！幾點方便？', time: '10:32', isMe: true },
      { id: 3, sender: '豆漿爸', message: '我也想去！', time: '10:35', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jack' },
    ],
    '私人朋友': [
      { id: 1, sender: 'Amy', message: '週末有空嗎？', time: '09:15', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Amy' },
      { id: 2, sender: '我', message: '有啊，怎麼了？', time: '09:20', isMe: true },
    ],
    '活動專用': [
      { id: 1, sender: '活動小組', message: '下週六的寵物聚會記得報名喔！', time: '14:00', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Event' },
      { id: 2, sender: '我', message: '已報名！', time: '14:05', isMe: true },
    ],
  };

  const [chatMessages, setChatMessages] = useState(chatData);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    const updatedMessages = {
      ...chatMessages,
      [activeChatCategory]: [
        ...chatMessages[activeChatCategory],
        {
          id: chatMessages[activeChatCategory].length + 1,
          sender: '我',
          message: newMessage,
          time: new Date().toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit' }),
          isMe: true,
        },
      ],
    };
    setChatMessages(updatedMessages);
    setNewMessage('');
    setNewMessage('');
  };

  // 樣式設定中心 - 參考 GatheringHub
  const styles = {
    layout: {
      paddingTop: '40px',
    },
    header: {
      backgroundColor: '#86572C',
      padding: '12px 16px',
      titleSize: '14px',
      titleColor: '#FFFFFF',
    },
    searchBar: {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      textColor: '#FFFFFF',
      placeholderColor: 'rgba(255, 255, 255, 0.7)',
      width: '112px',
      height: '28px',
      fontSize: '14px',
    },
  };

  return (
    <div className="pb-24 bg-gray-50 min-h-screen">
      {/* 頂部導航 */}
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
            寵主中心
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Bell className="text-white" />
            {notifications && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                3
              </span>
            )}
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="搜尋..."
              className="rounded-full px-3 focus:outline-none focus:ring-2 focus:ring-white/50"
              style={{
                backgroundColor: styles.searchBar.backgroundColor,
                color: styles.searchBar.textColor,
                width: styles.searchBar.width,
                height: styles.searchBar.height,
                fontSize: styles.searchBar.fontSize,
                '--placeholder-color': styles.searchBar.placeholderColor
              }}
            />
            <style jsx>{`
              input::placeholder {
                color: ${styles.searchBar.placeholderColor};
              }
            `}</style>
            <Search className="absolute right-2 top-1.5 text-white/70" size={14} />
          </div>
        </div>
      </div>

      <div className="pt-16 px-4 space-y-6" style={{ paddingTop: styles.layout.paddingTop }}>
        {/* 個人資料區 */}
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
          </div>
        </div>

        {/* 功能按鈕區 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => setShowEditModal(true)}
              className="flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors" style={{ backgroundColor: 'transparent' }}
            >
              <div className="p-3 bg-blue-100 rounded-full">
                <Edit3 size={20} className="text-blue-600" />
              </div>
              <span className="text-xs font-medium text-gray-700">編輯資料</span>
            </button>

            <button
              onClick={() => setShowSettingsModal(true)}
              className="flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors" style={{ backgroundColor: 'transparent' }}
            >
              <div className="p-3 bg-purple-100 rounded-full">
                <Settings size={20} className="text-purple-600" />
              </div>
              <span className="text-xs font-medium text-gray-700">設置</span>
            </button>

            <button
              onClick={() => setShowChatModal(true)}
              className="flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors" style={{ backgroundColor: 'transparent' }}
            >
              <div className="p-3 bg-indigo-100 rounded-full">
                <MessageCircle size={20} className="text-indigo-600" />
              </div>
              <span className="text-xs font-medium text-gray-700">聊天室</span>
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

      {/* 聊天室模態框 */}
      {showChatModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center">
          <div className="bg-white w-full sm:max-w-2xl sm:rounded-2xl rounded-t-2xl max-h-[90vh] flex flex-col animate-in slide-in-from-bottom-4 fade-in">
            {/* 模態框標題 */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <MessageCircle size={20} className="text-indigo-600" />
                聊天室
              </h2>
              <button
                onClick={() => setShowChatModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            {/* 分類標籤 */}
            <div className="flex border-b border-gray-100 px-4">
              {['寵友群組', '私人朋友', '活動專用'].map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveChatCategory(category)}
                  className={`flex-1 py-3 text-sm font-medium transition-colors ${activeChatCategory === category
                    ? 'text-indigo-600 border-b-2 border-indigo-600'
                    : 'text-gray-400 hover:text-gray-600'
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* 聊天訊息區域 */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {chatMessages[activeChatCategory].map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${msg.isMe ? 'flex-row-reverse' : ''}`}
                >
                  {!msg.isMe && (
                    <img
                      src={msg.avatar}
                      alt={msg.sender}
                      className="w-10 h-10 rounded-full flex-shrink-0"
                    />
                  )}
                  <div className={`flex-1 ${msg.isMe ? 'flex flex-col items-end' : ''}`}>
                    {!msg.isMe && (
                      <p className="text-xs text-gray-500 mb-1">{msg.sender}</p>
                    )}
                    <div
                      className={`inline-block px-4 py-2 rounded-2xl max-w-[80%] ${msg.isMe
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 text-gray-800'
                        }`}
                    >
                      <p className="text-sm">{msg.message}</p>
                      <p
                        className={`text-[10px] mt-1 ${msg.isMe ? 'text-indigo-100' : 'text-gray-400'
                          }`}
                      >
                        {msg.time}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 輸入框 */}
            <div className="p-4 border-t border-gray-100">
              <div className="bg-gray-50 rounded-2xl border border-gray-200 p-3 flex items-center gap-2">
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <Paperclip size={20} />
                </button>
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="輸入訊息..."
                  className="flex-1 border-none outline-none text-sm bg-transparent"
                />
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <Smile size={20} />
                </button>
                <button
                  onClick={handleSendMessage}
                  className="bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 transition-colors"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 設置模態框 */}
      {showSettingsModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center">
          <div className="bg-white w-full sm:max-w-2xl sm:rounded-2xl rounded-t-2xl max-h-[90vh] flex flex-col animate-in slide-in-from-bottom-4 fade-in">
            {/* 模態框標題 */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <Settings size={20} className="text-indigo-600" />
                設置
              </h2>
              <button
                onClick={() => setShowSettingsModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            {/* 設置內容 */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* 通知設置 */}
              <div className="bg-gray-50 rounded-2xl p-4">
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

              {/* 外觀設置 */}
              <div className="bg-gray-50 rounded-2xl p-4">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Palette size={18} />
                  外觀設置
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {darkMode ? (
                        <Moon size={18} className="text-gray-600" />
                      ) : (
                        <Sun size={18} className="text-gray-600" />
                      )}
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

              {/* 語言與地區 */}
              <div className="bg-gray-50 rounded-2xl p-4">
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

              {/* 隱私與安全 */}
              <div className="bg-gray-50 rounded-2xl p-4">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Shield size={18} />
                  隱私與安全
                </h3>
                <div className="space-y-3">
                  <button className="w-full text-left text-sm text-gray-700 py-2 hover:text-indigo-600 transition-colors">
                    隱私政策
                  </button>
                  <button className="w-full text-left text-sm text-gray-700 py-2 hover:text-indigo-600 transition-colors">
                    帳號安全
                  </button>
                </div>
              </div>

              {/* 登出按鈕 */}
              <button className="w-full bg-red-50 text-red-600 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-red-100 transition-colors">
                <LogOut size={18} />
                登出
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 編輯資料模態框 */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center">
          <div className="bg-white w-full sm:max-w-2xl sm:rounded-2xl rounded-t-2xl max-h-[90vh] flex flex-col animate-in slide-in-from-bottom-4 fade-in">
            {/* 模態框標題 */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <Edit3 size={20} className="text-indigo-600" />
                編輯資料
              </h2>
              <button
                onClick={() => setShowEditModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            {/* 編輯表單 */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* 頭像編輯 */}
              <div className="flex flex-col items-center mb-6">
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
                <p className="text-sm text-gray-500">點擊相機圖示更換頭像</p>
              </div>

              {/* 姓名 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  姓名
                </label>
                <input
                  type="text"
                  defaultValue="寵主名稱"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  defaultValue="petowner@example.com"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* 電話 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  電話
                </label>
                <input
                  type="tel"
                  placeholder="0912-345-678"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* 地址 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  地址
                </label>
                <input
                  type="text"
                  placeholder="台北市信義區..."
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* 自我介紹 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  自我介紹
                </label>
                <textarea
                  rows={4}
                  placeholder="分享一些關於你和你的寵物的故事..."
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                />
              </div>

              {/* 儲存按鈕 */}
              <button className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 transition-colors">
                <Save size={18} />
                儲存變更
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
