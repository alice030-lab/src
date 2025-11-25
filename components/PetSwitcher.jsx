import { LayoutDashboard } from 'lucide-react';

export const PetSwitcher = ({ currentPet, setCurrentPet, pets, overviewObj }) => {
  // 樣式設定中心 - 在這裡調整顏色、大小、間距和對齊
  const styles = {
    overview: {
      // 總覽按鈕樣式
      activeBackground: '#FFFFFF', // 啟用時的背景顏色 (白色，不是黑色)
      activeBorder: '#CBD5E1', // 啟用時的邊框顏色
      activeIconColor: '#475569', // 啟用時的圖示顏色
      activeTextColor: '#ffffffff', // 啟用時的文字顏色
      inactiveBackground: '#E5E7EB', // 未啟用時的背景顏色
      inactiveIconColor: '#6B7280', // 未啟用時的圖示顏色
      inactiveTextColor: '#6B7280', // 未啟用時的文字顏色
    },
    avatar: {
      size: '56px', // 頭像大小
      borderWidth: '2px', // 邊框寬度
    },
    text: {
      fontSize: '12px', // 文字大小
    }
  };

  return (
    <div className="flex space-x-4 overflow-x-auto pb-2 no-scrollbar px-4">
      <button
        onClick={() => setCurrentPet(overviewObj)}
        className={`flex flex-col items-center space-y-1 min-w-[60px] transition-all ${currentPet.id === 'all' ? 'scale-110' : 'opacity-60 hover:opacity-100'}`}
      >
        <div
          className="rounded-full p-[2px] flex items-center justify-center"
          style={{
            width: styles.avatar.size,
            height: styles.avatar.size,
            backgroundColor: currentPet.id === 'all' ? styles.overview.activeBackground : styles.overview.inactiveBackground,
            border: currentPet.id === 'all' ? `${styles.avatar.borderWidth} solid ${styles.overview.activeBorder}` : 'none'
          }}
        >
          <LayoutDashboard
            size={24}
            style={{ color: currentPet.id === 'all' ? styles.overview.activeIconColor : styles.overview.inactiveIconColor }}
          />
        </div>
        <span
          className="font-bold"
          style={{
            fontSize: styles.text.fontSize,
            color: currentPet.id === 'all' ? styles.overview.activeTextColor : styles.overview.inactiveTextColor
          }}
        >
          總
        </span>
      </button>

      {pets.map((pet) => (
        <button
          key={pet.id}
          onClick={() => setCurrentPet(pet)}
          className={`flex flex-col items-center space-y-1 min-w-[60px] transition-all ${currentPet.id === pet.id ? 'scale-110' : 'opacity-60 hover:opacity-100'}`}
        >
          <div
            className={`rounded-full p-[2px] ${currentPet.id === pet.id ? `bg-gradient-to-tr ${pet.themeColor}` : 'bg-gray-200'}`}
            style={{ width: styles.avatar.size, height: styles.avatar.size }}
          >
            <div className="w-full h-full bg-white rounded-full p-[2px]">
              <img src={pet.avatar} className="w-full h-full rounded-full object-cover" alt={pet.name} />
            </div>
          </div>
          <span
            className="font-bold"
            style={{
              fontSize: styles.text.fontSize,
              color: currentPet.id === pet.id ? '#ffffffff' : '#6B7280'
            }}
          >
            {pet.name.split(' ')[0]}
          </span>
        </button>
      ))}
    </div>
  );
};


