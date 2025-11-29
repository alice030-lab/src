import { LayoutDashboard } from 'lucide-react';

export const PetSwitcher = ({ currentPet, setCurrentPet, pets, overviewObj }) => {
  // Centralized style configuration
  const styles = {
    overview: {
      activeBackground: '#FFFFFF', // white when active (no black)
      activeBorder: '#CBD5E1',
      activeIconColor: '#475569',
      activeTextColor: '#000000',
      inactiveBackground: '#E5E7EB',
      inactiveIconColor: '#6B7280',
      inactiveTextColor: '#6B7280',
    },
    avatar: {
      size: '56px', // avatar size
      borderWidth: '2px', // border width when active
    },
    text: {
      fontSize: '12px', // label font size
    },
  };

  return (
    <div className="flex space-x-4 overflow-x-auto py-3 no-scrollbar px-4">
      {/* Overview / "All" button */}
      <button
        onClick={() => setCurrentPet(overviewObj)}
        className={`flex flex-col items-center space-y-1 min-w-[60px] transition-all ${currentPet.id === 'all' ? 'scale-110' : 'opacity-60 hover:opacity-100'}`}
        style={{ backgroundColor: 'transparent' }}
      >
        <div
          className="rounded-full p-[2px] flex items-center justify-center"
          style={{
            width: styles.avatar.size,
            height: styles.avatar.size,
            backgroundColor:
              currentPet.id === 'all'
                ? styles.overview.activeBackground
                : styles.overview.inactiveBackground,
            border:
              currentPet.id === 'all'
                ? `${styles.avatar.borderWidth} solid ${styles.overview.activeBorder}`
                : 'none',
          }}
        >
          <LayoutDashboard
            size={24}
            style={{
              color:
                currentPet.id === 'all'
                  ? styles.overview.activeIconColor
                  : styles.overview.inactiveIconColor,
            }}
          />
        </div>
        {/* Name span removed as per user request */}
      </button>

      {/* Individual pet buttons */}
      {pets.map((pet) => (
        <button
          key={pet.id}
          onClick={() => setCurrentPet(pet)}
          className={`flex flex-col items-center space-y-1 min-w-[60px] transition-all ${currentPet.id === pet.id ? 'scale-110' : 'opacity-60 hover:opacity-100'}`}
          style={{ backgroundColor: 'transparent' }}
        >
          <div
            className={`rounded-full p-[2px] ${currentPet.id === pet.id ? `bg-gradient-to-tr ${pet.themeColor}` : 'bg-gray-200'}`}
            style={{ width: styles.avatar.size, height: styles.avatar.size }}
          >
            <div className="w-full h-full bg-white rounded-full p-[2px]">
              <img src={pet.avatar} alt={pet.name} className="w-full h-full rounded-full object-cover" />
            </div>
          </div>
          {/* Name span removed as per user request */}
        </button>
      ))}
    </div>
  );
};
