import { LayoutDashboard } from 'lucide-react';

export const PetSwitcher = ({ currentPet, setCurrentPet, pets, overviewObj }) => (
  <div className="flex space-x-4 overflow-x-auto pb-2 no-scrollbar px-4">
    <button
      onClick={() => setCurrentPet(overviewObj)}
      className={`flex flex-col items-center space-y-1 min-w-[60px] transition-all ${currentPet.id === 'all' ? 'scale-110' : 'opacity-60 hover:opacity-100'}`}
    >
      <div className={`w-14 h-14 rounded-full p-[2px] flex items-center justify-center ${currentPet.id === 'all' ? 'bg-slate-800 border-2 border-slate-400' : 'bg-gray-200'}`}>
        <LayoutDashboard size={24} className={currentPet.id === 'all' ? 'text-white' : 'text-gray-500'} />
      </div>
      <span className={`text-xs font-bold ${currentPet.id === 'all' ? 'text-slate-900' : 'text-gray-500'}`}>
        總覽
      </span>
    </button>

    {pets.map((pet) => (
      <button
        key={pet.id}
        onClick={() => setCurrentPet(pet)}
        className={`flex flex-col items-center space-y-1 min-w-[60px] transition-all ${currentPet.id === pet.id ? 'scale-110' : 'opacity-60 hover:opacity-100'}`}
      >
        <div className={`w-14 h-14 rounded-full p-[2px] ${currentPet.id === pet.id ? `bg-gradient-to-tr ${pet.themeColor}` : 'bg-gray-200'}`}>
          <div className="w-full h-full bg-white rounded-full p-[2px]">
            <img src={pet.avatar} className="w-full h-full rounded-full object-cover" alt={pet.name} />
          </div>
        </div>
        <span className={`text-xs font-bold ${currentPet.id === pet.id ? 'text-gray-800' : 'text-gray-500'}`}>
          {pet.name.split(' ')[0]}
        </span>
      </button>
    ))}
  </div>
);

