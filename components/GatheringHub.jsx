import { useState } from 'react';
import { Bell, MapPin, Navigation, X, Dog, Search } from 'lucide-react';
import { HorizontalScrollSection } from './HorizontalScrollSection';

export const GatheringHub = ({ gatherings, notificationCount }) => {
  const [showMap, setShowMap] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // 樣式設定中心 - 在這裡調整顏色、大小、間距和對齊
  const styles = {
    layout: {
      backgroundColor: '#fff5ebff',
      paddingTop: '64px', // 上方內距 (避免被標題擋住)
      paddingBottom: '64px', // 下方內距 (避免被底部導航擋住)
      paddingX: '16px', // 左右內距
      sectionSpacing: '24px', // 區塊間距
      gridGap: '16px', // 主要按鈕網格間距
      secondaryGridGap: '12px', // 次要按鈕網格間距
      marginTopPrimary: '-20px', // 主要按鈕區上方間距
      marginTopSecondary: '-10px', // 次要按鈕區上方間距
    },
    header: {
      backgroundColor: '#86572C', // 標題欄背景顏色
      height: 'auto', // 高度 (auto 為自適應)
      padding: '12px 16px', // 內距 (上下 左右)
      titleSize: '13.33px', // 標題文字大小 (10pt)
      titleColor: '#FFFFFF', // 標題文字顏色
      titleAlign: 'left', // 標題對齊 (left: 靠左, center: 置中, right: 靠右)
    },
    searchBar: {
      backgroundColor: 'rgba(255, 255, 255, 0.2)', // 搜尋欄背景顏色 (含透明度)
      textColor: '#FFFFFF', // 輸入文字顏色
      placeholderColor: 'rgba(255, 255, 255, 0.7)', // 提示文字顏色
      width: '112px', // 寬度
      height: '28px', // 高度
      fontSize: '14px', // 文字大小
      textAlign: 'left', // 文字對齊 (left, center, right)
    },
    actionButtons: {
      primary: { // 主要按鈕 (舉辦/參加聚會)
        backgroundColor: '#47240A', // 背景顏色
        color: '#f6f1ebff', // 文字顏色
        padding: '8px', // 內距
        borderRadius: '28px', // 圓角大小
        fontSize: '16px', // 文字大小
        iconSize: 20, // 圖示大小
        textAlign: 'center', // 文字對齊 (left, center, right)
      },
      secondary: { // 次要按鈕 (尋找保母等)
        backgroundColor: '#47240A', // 背景顏色
        color: '#f6f1ebff', // 文字顏色
        padding: '8px', // 內距
        borderRadius: '24px', // 圓角大小
        fontSize: '16px', // 文字大小
        textAlign: 'center', // 文字對齊 (left, center, right)
      }
    },
    sectionTitles: { // 區塊標題 (探索附近的聚會等)
      fontSize: '20px', // 文字大小 (14pt)
      color: '#000000', // 文字顏色
      textAlign: 'left', // 對齊方式 (left, center, right)
      padding: '0 4px', // 內距
    }
  };

  const handleViewMap = (event) => {
    setSelectedEvent(event);
    setShowMap(true);
  };

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: styles.layout.backgroundColor,
        paddingTop: styles.layout.paddingTop,
        paddingBottom: styles.layout.paddingBottom,
        paddingLeft: styles.layout.paddingX,
        paddingRight: styles.layout.paddingX,
      }}
    >
      {/* 頂部導航欄 */}
      <div
        className="fixed top-0 left-0 right-0 z-40 flex justify-between items-center shadow-md"
        style={{
          backgroundColor: styles.header.backgroundColor,
          padding: styles.header.padding
        }}
      >
        <div className="flex items-center gap-2" style={{ flex: 1, justifyContent: styles.header.titleAlign === 'center' ? 'center' : (styles.header.titleAlign === 'right' ? 'flex-end' : 'flex-start') }}>
          <Dog className="text-white" size={24} style={{ marginRight: '8px' }} />
          <h1
            className="font-bold"
            style={{
              fontSize: styles.header.titleSize,
              color: styles.header.titleColor,
              textAlign: styles.header.titleAlign
            }}
          >
            PetPals 聚會
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Bell className="text-white" />
            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {notificationCount}
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
                textAlign: styles.searchBar.textAlign,
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

      <div style={{ display: 'flex', flexDirection: 'column', gap: styles.layout.sectionSpacing }}>
        {/* 功能按鈕區 - 主要操作 */}
        <div
          className="grid grid-cols-2"
          style={{
            marginTop: styles.layout.marginTopPrimary,
            gap: styles.layout.gridGap
          }}
        >
          <button
            className="shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center gap-4 group"
            style={{
              backgroundColor: styles.actionButtons.primary.backgroundColor,
              color: styles.actionButtons.primary.color,
              padding: styles.actionButtons.primary.padding,
              borderRadius: styles.actionButtons.primary.borderRadius,
              alignItems: styles.actionButtons.primary.textAlign === 'center' ? 'center' : (styles.actionButtons.primary.textAlign === 'right' ? 'flex-end' : 'flex-start')
            }}>
            <div className="bg-white/20 p-3 rounded-full group-hover:scale-110 transition-transform">
              <Bell size={styles.actionButtons.primary.iconSize} />
            </div>
            <span
              className="font-bold"
              style={{
                fontSize: styles.actionButtons.primary.fontSize,
                textAlign: styles.actionButtons.primary.textAlign,
                width: '100%'
              }}
            >
              我要舉辦聚會
            </span>
          </button>

          <button
            onClick={() => setShowMap(true)}
            className="shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center gap-2 group"
            style={{
              backgroundColor: styles.actionButtons.primary.backgroundColor,
              color: styles.actionButtons.primary.color,
              padding: styles.actionButtons.primary.padding,
              borderRadius: styles.actionButtons.primary.borderRadius,
              alignItems: styles.actionButtons.primary.textAlign === 'center' ? 'center' : (styles.actionButtons.primary.textAlign === 'right' ? 'flex-end' : 'flex-start')
            }}
          >
            <div className="bg-white/20 p-3 rounded-full group-hover:scale-110 transition-transform">
              <MapPin size={styles.actionButtons.primary.iconSize} />
            </div>
            <span
              className="font-bold"
              style={{
                fontSize: styles.actionButtons.primary.fontSize,
                textAlign: styles.actionButtons.primary.textAlign,
                width: '100%'
              }}
            >
              我要參加聚會
            </span>
          </button>
        </div>

        {/* 功能按鈕區 - 次要操作 */}
        <div
          className="grid grid-cols-4"
          style={{
            marginTop: styles.layout.marginTopSecondary,
            gap: styles.layout.secondaryGridGap
          }}
        >
          {['尋找保母', '來去美麗', '來去走走', '寵友社群'].map((text, index) => (
            <button
              key={index}
              onClick={() => setShowMap(true)}
              className="shadow-lg hover:shadow-xl transition-shadow flex flex-col items-center justify-center gap-2 group"
              style={{
                backgroundColor: styles.actionButtons.secondary.backgroundColor,
                color: styles.actionButtons.secondary.color,
                padding: styles.actionButtons.secondary.padding,
                borderRadius: styles.actionButtons.secondary.borderRadius,
                alignItems: styles.actionButtons.secondary.textAlign === 'center' ? 'center' : (styles.actionButtons.secondary.textAlign === 'right' ? 'flex-end' : 'flex-start')
              }}
            >
              <span
                className="font-bold"
                style={{
                  fontSize: styles.actionButtons.secondary.fontSize,
                  textAlign: styles.actionButtons.secondary.textAlign,
                  width: '100%'
                }}
              >
                {text}
              </span>
            </button>
          ))}
        </div>

        <div style={{ marginTop: '4px' }}>
          <HorizontalScrollSection
            title="探索附近的聚會"
            items={gatherings}
            buttonAlign="center"
            onItemClick={handleViewMap}
            titleStyle={styles.sectionTitles}
          />
        </div>

        <div style={{ marginTop: '4px' }}>
          <HorizontalScrollSection
            title="你會喜歡的寵團"
            items={gatherings}
            buttonAlign="center"
            onItemClick={handleViewMap}
            titleStyle={styles.sectionTitles}
          />
        </div>
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
