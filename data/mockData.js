// 模擬資料庫

// 1. 寵物名單 (新增 rawStats 用於計算遊戲數值)
export const MOCK_PETS = [
  {
    id: 'pet_1',
    name: "米糕 (Migao)",
    type: "dog",
    breed: "柯基",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
    themeColor: "from-orange-400 to-amber-500",
    stats: { weight: "12.5 kg", sleep: "8.5 hr", activity: "4,200 步" },
    deviceStatus: { feeder: 15, water: 98, temp: 26 },
    rawStats: {
      taskCompletion: 90,
      interaction: 95,
      healthPassport: 70,
      funTasks: 85,
      outdoor: 80,
      gathering: 60
    }
  },
  {
    id: 'pet_2',
    name: "豆漿 (Soy)",
    type: "cat",
    breed: "英國短毛貓",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jack",
    themeColor: "from-blue-400 to-indigo-500",
    stats: { weight: "4.2 kg", sleep: "14.0 hr", activity: "低 (室內)" },
    deviceStatus: { feeder: 80, water: 65, temp: 24 },
    rawStats: {
      taskCompletion: 85,
      interaction: 90,
      healthPassport: 90,
      funTasks: 95,
      outdoor: 10,
      gathering: 20
    }
  },
  {
    id: 'pet_3',
    name: "龜仙人",
    type: "reptile",
    breed: "蘇卡達陸龜",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Turtle",
    themeColor: "from-green-500 to-emerald-700",
    stats: { weight: "850 g", sleep: "10.0 hr", activity: "曬背中" },
    deviceStatus: { feeder: 95, water: 90, temp: 32 },
    rawStats: {
      taskCompletion: 98,
      interaction: 70,
      healthPassport: 100,
      funTasks: 60,
      outdoor: 50,
      gathering: 10
    }
  },
  {
    id: 'pet_4',
    name: "哈利",
    type: "dog",
    breed: "黃金獵犬",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Harry",
    themeColor: "from-yellow-400 to-orange-500",
    stats: { weight: "28.0 kg", sleep: "9.0 hr", activity: "8,500 步" },
    deviceStatus: { feeder: 40, water: 88, temp: 25 },
    rawStats: {
      taskCompletion: 60,
      interaction: 80,
      healthPassport: 60,
      funTasks: 90,
      outdoor: 95,
      gathering: 85
    }
  }
];

// 用於概覽模式的虛擬物件
export const OVERVIEW_OBJ = {
  id: 'all',
  name: "家庭概覽",
  themeColor: "from-slate-700 to-slate-900",
  avatar: null
};

// 2. 相簿回憶資料
export const INITIAL_MEMORIES = [
  { id: 101, petId: 'pet_1', date: '2023-12-25', url: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=400&q=80', caption: '聖誕節快樂！🎄', theme: 'classic', decoration: 'tape-red' },
  { id: 102, petId: 'pet_1', date: '2023-10-10', url: 'https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?auto=format&fit=crop&w=400&q=80', caption: '公園跑跑', theme: 'vintage', decoration: 'none' },
  { id: 103, petId: 'pet_1', date: '2023-05-20', url: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=400&q=80', caption: '兩歲生日快樂 🎂', theme: 'dark', decoration: 'sticker-star' },
  { id: 104, petId: 'pet_2', date: '2023-11-15', url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=400&q=80', caption: '厭世臉', theme: 'classic', decoration: 'tape-blue' },
  { id: 105, petId: 'pet_2', date: '2022-12-01', url: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=400&q=80', caption: '剛來家裡的第一天', theme: 'vintage', decoration: 'sticker-heart' },
  { id: 106, petId: 'pet_3', date: '2023-08-08', url: 'https://images.unsplash.com/photo-1505148230895-7153362c75b1?auto=format&fit=crop&w=400&q=80', caption: '吃菜菜 🥬', theme: 'classic', decoration: 'none' },
];

// 3. 聚會活動
export const MOCK_GATHERINGS = [
  {
    id: 1,
    host: "米糕媽媽",
    hostAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
    title: "週末柯基屁屁路跑大賽 🏃‍♂️",
    type: "運動",
    location: "大安森林公園 - 音樂台",
    date: "本週六 15:00",
    image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=800&q=80",
    participants: 12,
    description: "短腿狗狗的專屬運動會！歡迎柯基、臘腸一起來賽跑，輸的要請吃零食喔！",
    isJoined: false
  },
  {
    id: 2,
    host: "豆漿爸",
    hostAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jack",
    title: "貓咪野餐日 & 罐罐交流 🧺",
    type: "休閒",
    location: "華山大草原 (陰涼處)",
    date: "本週日 14:00",
    image: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&w=800&q=80",
    participants: 5,
    description: "帶著你的貓主子來曬太陽吧！我會準備一些自製肉泥給大家試吃。",
    isJoined: true
  }
];

// 4. 健檢細項
export const MOCK_HEALTH_DB = {
  'pet_1': [
    { category: 'physical', id: 1, name: "體重 (Weight)", value: "12.5 kg", lastDate: "2023-11-10", status: "ok" },
    { category: 'physical', id: 2, name: "體溫 (Temp)", value: "38.5 °C", lastDate: "2023-11-10", status: "ok" },
    { category: 'physical', id: 3, name: "體態評分 (BCS)", value: "5/9 (標準)", lastDate: "2023-11-10", status: "ok" },
    { category: 'physical', id: 4, name: "牙科檢查 (Dental)", value: "輕微牙結石", lastDate: "2023-11-10", status: "warning" },
    { category: 'preventive', id: 5, name: "核心疫苗 (八合一)", value: "已接種", lastDate: "2023-05-20", nextDue: "2024-05-20", status: "ok" },
    { category: 'preventive', id: 6, name: "狂犬病疫苗", value: "已接種", lastDate: "2022-11-15", nextDue: "2023-11-15", status: "urgent", note: "已過期，請盡快補打" },
    { category: 'preventive', id: 7, name: "心絲蟲快篩 (4Dx)", value: "陰性 (-)", lastDate: "2023-05-20", nextDue: "2024-05-20", status: "ok" },
    { category: 'blood', id: 8, name: "紅血球 (RBC)", value: "6.8 M/µL", lastDate: "2023-05-20", status: "ok" },
    { category: 'blood', id: 9, name: "白血球 (WBC)", value: "12.5 K/µL", lastDate: "2023-05-20", status: "ok" },
    { category: 'blood', id: 10, name: "肝指數 (ALT)", value: "45 U/L", lastDate: "2023-05-20", status: "ok" },
    { category: 'blood', id: 11, name: "腎指數 (BUN)", value: "28 mg/dL", lastDate: "2023-05-20", status: "urgent", note: "偏高，需多喝水並追蹤" },
    { category: 'imaging', id: 12, name: "腹部超音波", value: "未發現異常", lastDate: "2023-01-10", status: "ok" },
  ],
  'pet_2': [
    { category: 'physical', id: 20, name: "體重", value: "4.2 kg", lastDate: "2023-09-15", status: "ok" },
    { category: 'preventive', id: 21, name: "貓三合一疫苗", value: "已接種", lastDate: "2022-12-10", nextDue: "2023-12-10", status: "warning" },
    { category: 'blood', id: 22, name: "腎指數 (CREA)", value: "1.4 mg/dL", lastDate: "2023-09-15", status: "ok" },
    { category: 'blood', id: 23, name: "貓白血病/愛滋 (FeLV/FIV)", value: "陰性 (-)", lastDate: "2022-12-01", status: "ok" },
  ],
  'pet_3': [
    { category: 'physical', id: 30, name: "腹甲長度", value: "15 cm", lastDate: "2023-06-15", status: "ok" },
    { category: 'preventive', id: 31, name: "糞便寄生蟲檢查", value: "未檢出", lastDate: "2023-06-15", nextDue: "2023-12-15", status: "ok" },
  ],
  'pet_4': []
};

// 5. 採買清單
export const DEFAULT_SHOPPING_LIST = [
  { id: 1, name: "處方飼料 (腎臟保養)", urgency: "high", forPet: "pet_2", autoGenerated: true },
  { id: 2, name: "寵物尿布墊", urgency: "low", forPet: "all", autoGenerated: false },
];

// 6. 財務支出記錄
export const MOCK_EXPENSES = [
  { id: 1, petId: 'pet_1', title: '心絲蟲藥', amount: 1200, category: 'medical', date: '2023-11-01' },
  { id: 2, petId: 'pet_1', title: '狗罐頭一箱', amount: 850, category: 'food', date: '2023-11-05' },
  { id: 3, petId: 'pet_2', title: '貓砂', amount: 450, category: 'supplies', date: '2023-11-10' },
  { id: 4, petId: 'all', title: '寵物展門票', amount: 600, category: 'entertainment', date: '2023-11-15' },
  { id: 5, petId: 'pet_3', title: '保溫燈泡', amount: 300, category: 'equipment', date: '2023-10-20' },
  { id: 6, petId: 'pet_1', title: '年度健檢', amount: 3500, category: 'medical', date: '2023-05-20' },
  { id: 7, petId: 'pet_1', title: '洗澡美容', amount: 800, category: 'grooming', date: '2023-11-20' },
  { id: 8, petId: 'all', title: '飼料補貨', amount: 2000, category: 'food', date: '2023-10-01' },
  { id: 9, petId: 'pet_2', title: '疫苗', amount: 1000, category: 'medical', date: '2023-09-15' },
];

// 7. 支出分類配置
export const EXPENSE_CATEGORIES = {
  medical: { label: '醫療', color: 'bg-red-500' },
  food: { label: '飲食', color: 'bg-orange-500' },
  supplies: { label: '用品', color: 'bg-blue-500' },
  grooming: { label: '美容', color: 'bg-pink-500' },
  entertainment: { label: '娛樂', color: 'bg-purple-500' },
  equipment: { label: '設備', color: 'bg-gray-600' },
  other: { label: '其他', color: 'bg-slate-400' },
};

