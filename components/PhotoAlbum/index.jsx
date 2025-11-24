import { useState, useEffect } from 'react';
import { Image as ImageIcon, Edit3, Palette, X, Save, Sticker } from 'lucide-react';
import { PetSwitcher } from '../PetSwitcher';
import { MOCK_PETS, OVERVIEW_OBJ } from '../../data/mockData';

export const PhotoAlbum = ({ currentPet, setCurrentPet, memories, setMemories }) => {
  const [selectedYear, setSelectedYear] = useState('2023');
  const [editingPhoto, setEditingPhoto] = useState(null);
  const [tempTheme, setTempTheme] = useState('classic');
  const [tempDeco, setTempDeco] = useState('none');

  const filteredMemories = memories.filter(m => {
    const isPetMatch = currentPet.id === 'all' || m.petId === currentPet.id;
    const isYearMatch = m.date.startsWith(selectedYear);
    return isPetMatch && isYearMatch;
  });

  const groupedMemories = filteredMemories.reduce((acc, memory) => {
    const month = memory.date.split('-')[1];
    if (!acc[month]) acc[month] = [];
    acc[month].push(memory);
    return acc;
  }, {});

  useEffect(() => {
    if (editingPhoto) {
      setTempTheme(editingPhoto.theme);
      setTempDeco(editingPhoto.decoration);
    }
  }, [editingPhoto]);

  const savePhotoStyle = (newStyle) => {
    setMemories(memories.map(m => m.id === editingPhoto.id ? { ...m, ...newStyle } : m));
    setEditingPhoto(null);
  };

  const getThemeClass = (theme) => {
    switch (theme) {
      case 'vintage': return 'bg-[#fdf6e3] text-slate-700 border-[#fdf6e3]';
      case 'dark': return 'bg-[#2d2d2d] text-gray-200 border-[#2d2d2d]';
      default: return 'bg-white text-gray-800 border-white';
    }
  };

  const getDecoration = (type) => {
    switch (type) {
      case 'tape-red': return <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-8 bg-red-400/80 rotate-2 shadow-sm backdrop-blur-sm transform skew-x-12"></div>;
      case 'tape-blue': return <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-8 bg-blue-400/80 -rotate-1 shadow-sm backdrop-blur-sm transform -skew-x-12"></div>;
      case 'sticker-heart': return <div className="absolute -bottom-2 -right-2 text-3xl drop-shadow-md rotate-12">❤️</div>;
      case 'sticker-star': return <div className="absolute -top-2 -left-2 text-3xl drop-shadow-md -rotate-12">⭐</div>;
      default: return null;
    }
  };

  const PhotoEditor = () => {
    if (!editingPhoto) return null;

    return (
      <div className="fixed inset-0 bg-black/80 z-50 flex flex-col items-center justify-center p-6 animate-in fade-in duration-200">
        <div className="w-full max-w-sm relative">
          <div className={`relative p-4 pb-12 shadow-2xl rotate-2 transition-colors duration-300 ${getThemeClass(tempTheme)}`}>
            {getDecoration(tempDeco)}
            <img src={editingPhoto.url} className="w-full aspect-square object-cover border-2 border-black/5 mb-4 bg-gray-100" alt="preview" />
            <p className={`font-serif text-center ${tempTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              {editingPhoto.caption}
            </p>
            <p className="text-[10px] text-center mt-1 opacity-50 font-mono">{editingPhoto.date}</p>
          </div>

          <div className="mt-10 bg-white rounded-2xl p-4 w-full shadow-xl">
            <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-2">
              <h3 className="font-bold text-slate-800 flex items-center gap-2"><Edit3 size={18} /> 自定義拍立得</h3>
              <button onClick={() => setEditingPhoto(null)}><X size={20} className="text-slate-400" /></button>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-xs text-slate-500 font-bold mb-2 flex items-center gap-1"><Palette size={12} /> 相紙底色</p>
                <div className="flex gap-3">
                  <button onClick={() => setTempTheme('classic')} className={`w-8 h-8 rounded-full border bg-white ${tempTheme === 'classic' ? 'ring-2 ring-indigo-500' : ''}`}></button>
                  <button onClick={() => setTempTheme('vintage')} className={`w-8 h-8 rounded-full border bg-[#fdf6e3] ${tempTheme === 'vintage' ? 'ring-2 ring-indigo-500' : ''}`}></button>
                  <button onClick={() => setTempTheme('dark')} className={`w-8 h-8 rounded-full border bg-[#2d2d2d] ${tempTheme === 'dark' ? 'ring-2 ring-indigo-500' : ''}`}></button>
                </div>
              </div>
              <div>
                <p className="text-xs text-slate-500 font-bold mb-2 flex items-center gap-1"><Sticker size={12} /> 裝飾貼紙</p>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  <button onClick={() => setTempDeco('none')} className="px-3 py-1 text-xs border rounded-full">無</button>
                  <button onClick={() => setTempDeco('tape-red')} className="px-3 py-1 text-xs border rounded-full bg-red-50 text-red-500">紅膠帶</button>
                  <button onClick={() => setTempDeco('tape-blue')} className="px-3 py-1 text-xs border rounded-full bg-blue-50 text-blue-500">藍膠帶</button>
                  <button onClick={() => setTempDeco('sticker-heart')} className="px-3 py-1 text-xs border rounded-full">愛心</button>
                  <button onClick={() => setTempDeco('sticker-star')} className="px-3 py-1 text-xs border rounded-full">星星</button>
                </div>
              </div>
            </div>

            <button
              onClick={() => savePhotoStyle({ theme: tempTheme, decoration: tempDeco })}
              className="w-full mt-6 bg-slate-800 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 active:scale-95 transition-transform"
            >
              <Save size={18} /> 儲存樣式
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="pb-24 bg-[#f8f5f2] min-h-screen relative">
      <div className="sticky top-0 bg-[#f8f5f2]/90 backdrop-blur-sm z-40 pt-4 pb-2 border-b border-stone-200">
        <div className="flex justify-between items-center px-6 mb-4">
          <h2 className="text-2xl font-serif font-bold text-stone-700">時光相冊</h2>
          <div className="flex gap-2">
            {['2023', '2022'].map(year => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`px-4 py-1 rounded-full text-sm font-bold transition-all ${selectedYear === year ? 'bg-stone-800 text-white shadow-md' : 'bg-white text-stone-400'}`}
              >
                {year}
              </button>
            ))}
          </div>
        </div>
        <PetSwitcher currentPet={currentPet} setCurrentPet={setCurrentPet} pets={MOCK_PETS} overviewObj={OVERVIEW_OBJ} />
      </div>

      <div className="px-4 mt-4 space-y-8">
        {Object.keys(groupedMemories).sort((a, b) => b - a).map(month => (
          <div key={month} className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="flex items-center gap-4 mb-4">
              <h3 className="text-4xl font-serif text-stone-300 font-bold">{month}</h3>
              <div className="h-[1px] flex-1 bg-stone-200"></div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {groupedMemories[month].map((photo, idx) => (
                <div
                  key={photo.id}
                  onClick={() => setEditingPhoto(photo)}
                  className={`
                    relative group cursor-pointer transition-transform duration-300 hover:z-10 hover:scale-105
                    p-2 pb-8 shadow-md hover:shadow-xl
                    ${getThemeClass(photo.theme)}
                    ${idx % 2 === 0 ? '-rotate-2' : 'rotate-1'}
                  `}
                >
                  {getDecoration(photo.decoration)}
                  <div className="aspect-square overflow-hidden bg-gray-100 mb-2 border border-black/5">
                    <img src={photo.url} className="w-full h-full object-cover" alt={photo.caption} />
                  </div>
                  <p className={`font-serif text-xs text-center leading-tight px-1 ${photo.theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    {photo.caption}
                  </p>
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 p-1 rounded-full text-white">
                    <Edit3 size={12} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {filteredMemories.length === 0 && (
          <div className="text-center py-20 text-stone-400">
            <ImageIcon size={48} className="mx-auto mb-2 opacity-50" />
            <p>這段時間沒有回憶呢</p>
            <button className="mt-4 px-6 py-2 border border-stone-300 rounded-full text-sm hover:bg-white transition-colors">
              上傳第一張照片
            </button>
          </div>
        )}
      </div>

      <PhotoEditor />
    </div>
  );
};

