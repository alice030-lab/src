// Tailwind CSS 測試組件
export const TailwindTest = () => {
  return (
    <div className="p-8 bg-gradient-to-r from-blue-500 to-purple-600 min-h-screen">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-4">
          🎨 Tailwind CSS 測試
        </h1>

        <div className="bg-white rounded-lg shadow-xl p-6 mb-4">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">基礎樣式測試</h2>

          <div className="space-y-4">
            {/* 顏色測試 */}
            <div className="flex gap-2">
              <div className="w-16 h-16 bg-red-500 rounded-lg"></div>
              <div className="w-16 h-16 bg-green-500 rounded-lg"></div>
              <div className="w-16 h-16 bg-blue-500 rounded-lg"></div>
              <div className="w-16 h-16 bg-yellow-500 rounded-lg"></div>
              <div className="w-16 h-16 bg-purple-500 rounded-lg"></div>
            </div>

            {/* 文字樣式測試 */}
            <div className="space-y-2">
              <p className="text-sm text-gray-600">小字體</p>
              <p className="text-base text-gray-700">基礎字體</p>
              <p className="text-lg font-semibold text-gray-800">大字體</p>
              <p className="text-xl font-bold text-gray-900">超大字體</p>
            </div>

            {/* 按鈕測試 */}
            <div className="flex gap-3 flex-wrap">
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                主要按鈕
              </button>
              <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                成功按鈕
              </button>
              <button className="px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                次要按鈕
              </button>
            </div>

            {/* Flexbox 測試 */}
            <div className="flex items-center justify-between p-4 bg-gray-100 rounded-lg">
              <span className="text-gray-700">左側內容</span>
              <span className="text-gray-700">右側內容</span>
            </div>

            {/* Grid 測試 */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-pink-100 p-4 rounded text-center">1</div>
              <div className="bg-pink-200 p-4 rounded text-center">2</div>
              <div className="bg-pink-300 p-4 rounded text-center">3</div>
            </div>

            {/* 響應式測試 */}
            <div className="bg-indigo-100 p-4 rounded-lg">
              <p className="text-sm md:text-base lg:text-lg text-indigo-800">
                響應式文字：在小螢幕顯示小字，大螢幕顯示大字
              </p>
            </div>

            {/* 動畫測試 */}
            <div className="flex gap-4">
              <div className="w-20 h-20 bg-orange-400 rounded-full animate-pulse"></div>
              <div className="w-20 h-20 bg-teal-400 rounded-full animate-bounce"></div>
              <div className="w-20 h-20 bg-rose-400 rounded-full hover:scale-110 transition-transform cursor-pointer"></div>
            </div>
          </div>
        </div>

        {/* 狀態指示 */}
        <div className="bg-green-500 text-white p-4 rounded-lg text-center">
          <p className="text-lg font-bold">✅ Tailwind CSS 正常工作！</p>
          <p className="text-sm mt-2">如果您看到這些樣式，表示 Tailwind 已成功配置</p>
        </div>
      </div>
    </div>
  );
};

