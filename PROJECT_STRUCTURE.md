# 專案結構說明

本專案已將大型單一組件拆分為模組化的文件結構，便於維護和擴展。

## 📁 資料夾結構

```
src/
├── components/          # React 組件
│   ├── BottomNav.jsx           # 底部導航欄
│   ├── GatheringHub.jsx        # 聚會中心
│   ├── MapView.jsx              # 地圖視圖
│   ├── PetSwitcher.jsx          # 寵物切換器
│   ├── ReportModal.jsx          # 健康報告模態框
│   ├── CareHub/                 # 管家中心（主要功能）
│   │   ├── index.jsx            # 主組件
│   │   ├── StatBar.jsx          # 數值條組件
│   │   └── HealthSection.jsx    # 健康區塊組件
│   └── PhotoAlbum/              # 相冊功能
│       └── index.jsx            # 相冊主組件
│
├── api/                # API 服務
│   └── llmService.js            # LLM 和 TTS API 服務
│
├── constants/          # 常量配置
│   └── api.js                   # API 配置（URL、Key）
│
├── data/               # 模擬數據
│   └── mockData.js              # 所有模擬數據（寵物、回憶、聚會等）
│
├── hooks/              # 自定義 Hooks
│   └── useGameStats.js          # 遊戲化數值計算 Hook
│
├── utils/              # 工具函數
│   ├── apiHelpers.js            # API 輔助函數（重試邏輯）
│   ├── audioUtils.js            # 音頻處理工具
│   └── petHelpers.js            # 寵物相關輔助函數
│
├── App.jsx             # 主應用組件
├── App.css             # 應用樣式
├── main.jsx            # 應用入口
└── index.css           # 全域樣式
```

## 🔧 模組說明

### Components（組件）
- **BottomNav**: 底部導航欄，切換主要功能頁面
- **GatheringHub**: 聚會活動列表頁面
- **MapView**: 地圖視圖頁面
- **PetSwitcher**: 寵物選擇切換器
- **ReportModal**: AI 健康報告顯示模態框
- **CareHub**: 主要的管家功能頁面，包含設備監控、健康護照等
- **PhotoAlbum**: 相冊功能，支援拍立得風格編輯

### API（API 服務）
- **llmService.js**: 
  - `generateHealthReport()`: 生成 AI 健康報告
  - `speakAssistantMessage()`: 文字轉語音功能

### Constants（常量）
- **api.js**: API 端點配置和 API Key

### Data（數據）
- **mockData.js**: 包含所有模擬數據
  - `MOCK_PETS`: 寵物列表
  - `OVERVIEW_OBJ`: 概覽模式物件
  - `INITIAL_MEMORIES`: 初始回憶數據
  - `MOCK_GATHERINGS`: 聚會活動數據
  - `MOCK_HEALTH_DB`: 健康數據庫
  - `DEFAULT_SHOPPING_LIST`: 預設購物清單

### Hooks（自定義 Hooks）
- **useGameStats.js**: 計算寵物養成遊戲化數值（信任值、健康值、快樂值、社交值）

### Utils（工具函數）
- **apiHelpers.js**: API 請求重試邏輯（指數退避）
- **audioUtils.js**: 音頻格式轉換（PCM 轉 WAV）
- **petHelpers.js**: 寵物相關輔助函數（獲取問題列表等）

## 🚀 使用方式

所有組件和工具函數都已模組化，可以直接導入使用：

```javascript
// 導入組件
import { CareHub } from './components/CareHub';
import { PetSwitcher } from './components/PetSwitcher';

// 導入數據
import { MOCK_PETS, OVERVIEW_OBJ } from './data/mockData';

// 導入工具函數
import { useGameStats } from './hooks/useGameStats';
import { getPetIssues } from './utils/petHelpers';

// 導入 API 服務
import { generateHealthReport } from './api/llmService';
```

## 📝 注意事項

1. **依賴**: 已安裝 `lucide-react` 用於圖標
2. **API Key**: 需要在 `constants/api.js` 中配置 API Key
3. **樣式**: 使用 Tailwind CSS 類名，確保已正確配置
4. **數據**: 目前使用模擬數據，可根據需要連接真實 API

## 🔄 擴展建議

- 將模擬數據遷移到真實 API 調用
- 添加狀態管理（如 Redux 或 Zustand）
- 添加路由管理（如 React Router）
- 添加錯誤邊界和加載狀態
- 添加單元測試

