import { useState } from 'react';
import { Bell, MapPin, Navigation, X } from 'lucide-react';
import { HorizontalScrollSection } from './HorizontalScrollSection';

export const GatheringHub = ({ gatherings, notificationCount }) => {
  const [showMap, setShowMap] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleViewMap = (event) => {
    setSelectedEvent(event);
    setShowMap(true);
  };

  return (
    <div className="pb-24 pt-16 px-4 space-y-6 bg-gray-50 min-h-screen">
      <div className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md z-40 border-b border-gray-100 px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">PetPals 聚會</h1>
        <div className="relative">
          <Bell className="text-gray-600" />
          {notificationCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {notificationCount}
            </span>
          )}
        </div>
      </div>

      {/* 功能按鈕區 */}
      <div className="grid grid-cols-2 gap-4 mt-4">
        <button
          className="p-2 rounded-2xl shadow-lg hover:shadow-xl transition-shadow flex flex-col items-center justify-center gap-2 group"
          style={{ backgroundColor: '#DDCCB5', color: '#47240A' }}>
          <div className="bg-white/20 p-3 rounded-full group-hover:scale-110 transition-transform">
            <Bell size={24} />
          </div>
          <span className="font-bold">我要舉辦聚會</span>
        </button>

        <button
          onClick={() => setShowMap(true)}
          style={{ backgroundColor: '#DDCCB5', color: '#47240A' }}
          className="p-2 rounded-2xl shadow-lg hover:shadow-xl transition-shadow flex flex-col items-center justify-center gap-2 group"
        >
          <div className="bg-white/20 p-3 rounded-full group-hover:scale-110 transition-transform">
            <MapPin size={24} />
          </div>
          <span className="font-bold">我要參加聚會</span>
        </button>
      </div>

      {/* 2功能按鈕區 */}
      <div className="grid grid-cols-4 gap-2 mt-4">
        <button
          onClick={() => setShowMap(true)}
          style={{ backgroundColor: '#DDCCB5', color: '#47240A' }}
          className="p-2 rounded-2xl shadow-lg hover:shadow-xl transition-shadow flex flex-col items-center justify-center gap-2 group"
        >
          <span className="font-bold text-sm">尋找保母</span>
        </button>

        <button
          onClick={() => setShowMap(true)}
          style={{ backgroundColor: '#DDCCB5', color: '#47240A' }}
          className="p-2 rounded-2xl shadow-lg hover:shadow-xl transition-shadow flex flex-col items-center justify-center gap-2 group"
        >
          <span className="font-bold text-sm">來去美麗</span>
        </button>

        <button
          onClick={() => setShowMap(true)}
          style={{ backgroundColor: '#DDCCB5', color: '#47240A' }}
          className="p-2 rounded-2xl shadow-lg hover:shadow-xl transition-shadow flex flex-col items-center justify-center gap-2 group"
        >
          <span className="font-bold text-sm">來去走走</span>
        </button>

        <button
          onClick={() => setShowMap(true)}
          style={{ backgroundColor: '#DDCCB5', color: '#47240A' }}
          className="p-2 rounded-2xl shadow-lg hover:shadow-xl transition-shadow flex flex-col items-center justify-center gap-2 group"
        >
          <span className="font-bold text-sm">寵友社群</span>
        </button>

      </div>

      <div className="mt-4">
        <HorizontalScrollSection
          title="探索附近的聚會"
          items={gatherings}
          buttonAlign="center"
          onItemClick={handleViewMap}
        />
      </div>

      <div className="mt-4">
        <HorizontalScrollSection
          title="探索附近的聚會"
          items={gatherings}
          buttonAlign="center"
          onItemClick={handleViewMap}
        />
      </div>

      {/* 地圖模態框 */}
      {showMap && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md h-[80vh] flex flex-col shadow-2xl">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <MapPin size={20} className="text-indigo-600" />
                {selectedEvent ? selectedEvent.location : '聚會地圖'}
              </h3>
              <button
                onClick={() => {
                  setShowMap(false);
                  setSelectedEvent(null);
                }}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 bg-gray-100 relative overflow-hidden">
              {/* 模擬地圖區域 */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="bg-blue-100 text-blue-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin size={40} />
                  </div>
                  <h4 className="font-bold text-gray-800 mb-2">
                    {selectedEvent ? selectedEvent.location : '大安森林公園'}
                  </h4>
                  <p className="text-sm text-gray-500 mb-4">
                    {selectedEvent ? selectedEvent.title : '附近的聚會地點'}
                  </p>
                  <button className="bg-blue-500 text-white px-6 py-2 rounded-xl font-bold shadow-lg">
                    開啟定位權限
                  </button>
                </div>
              </div>
              {/* 模擬地圖標記 */}
              {gatherings.map((event, idx) => (
                <div
                  key={event.id}
                  className="absolute"
                  style={{
                    left: `${20 + idx * 30}%`,
                    top: `${30 + idx * 20}%`,
                  }}
                >
                  <div className="bg-red-500 text-white p-2 rounded-full shadow-lg flex items-center gap-1 text-xs font-bold">
                    <MapPin size={12} />
                    {event.title.split(' ')[0]}
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t bg-gray-50">
              <p className="text-xs text-gray-500 text-center">
                在地圖上查看附近的寵物友善公園、餐廳，以及正在散步的朋友們！
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
