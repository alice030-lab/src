import { useState } from 'react';
import {
    ShoppingBag, Activity, Gamepad2, Camera, Star,
    Clock, Calendar, CheckCircle, RefreshCw, Plus,
    Filter, History, RotateCcw, ChevronDown, X
} from 'lucide-react';
import { MOCK_PETS } from '../../data/mockData';
import { DatePicker } from '../DatePicker';

export const ToDoList = ({ currentPet, initialTasks = [] }) => {
    // ===== 樣式配置中心 =====
    const styles = {
        //主要顏色
        primaryColor: '#705038ff',      // 主要按鈕顏色
        secondaryColor: '#8b705cff',    // 次要按鈕顏色
        accentColor: '#422603ff',         // 強調色

        // 背景顏色
        cardBackground: '#ffffff',
        completedBackground: '#f8fafc',
        emptyStateBackground: '#f8fafc',

        // 文字顏色
        primaryText: '#1e293b',
        secondaryText: '#64748b',
        mutedText: '#94a3b8',

        // 邊框顏色
        borderColor: '#e2e8f0',

        // 按鈕文字大小
        buttonTextSize: '10px',

        // 過濾器顏色
        filterActive: {
            calendar: { bg: '#f0fdfa', border: '#99f6e4', text: '#0f766e' },
            category: { bg: '#fff7ed', border: '#fed7aa', text: '#c2410c' }
        }
    };

    const [activeCategory, setActiveCategory] = useState('all');
    const [showCompleted, setShowCompleted] = useState(false);
    const [showFilter, setShowFilter] = useState(false);

    // Date Picker State
    const [viewMode, setViewMode] = useState('day'); // 'day', 'month', 'year'
    const [selectedDate, setSelectedDate] = useState(new Date());

    const [tasks, setTasks] = useState([
        { id: 'task_1', title: '買飼料', category: 'shopping', date: '2025-11-30', time: '10:00', completed: false, petId: 'all' },
        { id: 'task_2', title: '打疫苗', category: 'health', date: '2025-12-05', time: '14:00', completed: false, petId: 'pet_1' },
        { id: 'task_3', title: '帶去公園玩', category: 'play', date: '2025-11-30', time: '16:00', completed: true, petId: 'pet_1' },
        ...initialTasks
    ]);

    const categories = [
        { id: 'all', label: '全部', icon: null },
        { id: 'shopping', label: '購物提醒', icon: ShoppingBag, color: 'text-orange-500', bg: 'bg-orange-100' },
        { id: 'health', label: '健康提醒', icon: Activity, color: 'text-red-500', bg: 'bg-red-100' },
        { id: 'play', label: '玩耍提醒', icon: Gamepad2, color: 'text-blue-500', bg: 'bg-blue-100' },
        { id: 'photo', label: '拍照提醒', icon: Camera, color: 'text-purple-500', bg: 'bg-purple-100' },
        { id: 'custom', label: '自訂義', icon: Star, color: 'text-yellow-500', bg: 'bg-yellow-100' },
    ];

    // ===== 核心邏輯函數 =====

    /**
     * 任務篩選邏輯
     * @param {boolean} isCompleted - true: 已完成任務, false: 待辦任務
     * @returns {Array} 篩選後的任務列表
     * 
     * 篩選條件：
     * 1. 完成狀態 (已完成/未完成)
     * 2. 類別 (全部/購物/健康/玩耍/拍照/自訂)
     * 3. 寵物 (全部寵物 / 特定寵物)
     * 4. 日期 (依據選擇的模式：日/月/年)
     */
    const getFilteredTasks = (isCompleted) => {
        return tasks.filter(task => {
            // 1. 篩選完成狀態
            if (task.completed !== isCompleted) return false;

            // 2. 篩選類別
            const categoryMatch = activeCategory === 'all' || task.category === activeCategory;

            // 3. 篩選寵物
            let petMatch;
            if (currentPet.id === 'all') {
                // 概覽模式：顯示所有寵物的任務
                petMatch = true;
            } else {
                // 個別寵物模式：只顯示該寵物的任務
                petMatch = task.petId === currentPet.id;
            }

            // 4. 篩選日期
            const taskDate = new Date(task.date);
            let dateMatch = true;

            if (viewMode === 'day') {
                // 日模式：精確比對日期 (YYYY-MM-DD)
                dateMatch = task.date === selectedDate.toISOString().split('T')[0];
            } else if (viewMode === 'month') {
                // 月模式：比對年份和月份
                dateMatch = taskDate.getFullYear() === selectedDate.getFullYear() &&
                    taskDate.getMonth() === selectedDate.getMonth();
            } else if (viewMode === 'year') {
                // 年模式：只比對年份
                dateMatch = taskDate.getFullYear() === selectedDate.getFullYear();
            }

            // 返回符合所有條件的任務
            return categoryMatch && petMatch && dateMatch;
        });
    };

    // 獲取待辦任務列表 (completed = false)
    const activeTasks = getFilteredTasks(false);

    // 獲取已完成任務列表 (completed = true)
    const completedTasks = getFilteredTasks(true);

    /**
     * 切換任務完成狀態
     * @param {string|number} id - 任務 ID
     * 功能：將任務標記為完成或取消完成
     */
    const toggleComplete = (id) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    };

    /**
     * 還原已完成的任務
     * @param {string|number} id - 任務 ID
     * 功能：將已完成的任務移回待辦列表
     */
    const restoreTask = (id) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, completed: false } : t));
    };

    /**
     * 改期功能
     * @param {string|number} id - 任務 ID
     * 功能：將任務日期延後一天
     */
    const handleReschedule = (id) => {
        setTasks(tasks.map(t => {
            if (t.id === id) {
                const d = new Date(t.date);
                d.setDate(d.getDate() + 1); // 日期 +1 天
                return { ...t, date: d.toISOString().split('T')[0] };
            }
            return t;
        }));
    };

    /**
     * 獲取寵物頭像
     * @param {string} petId - 寵物 ID
     * @returns {string} 頭像 URL
     */
    const getPetAvatar = (petId) => {
        // 'all' 代表全部寵物，返回預設頭像
        if (petId === 'all') return 'https://api.dicebear.com/7.x/avataaars/svg?seed=all';

        try {
            // 從 MOCK_PETS 中查找對應寵物的頭像
            const pet = MOCK_PETS.find(p => p.id === petId);
            return pet?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${petId}`;
        } catch (e) {
            // 錯誤處理：返回預設頭像
            return `https://api.dicebear.com/7.x/avataaars/svg?seed=${petId}`;
        }
    };

    /**
     * 日期選擇器變更處理
     * @param {Date} newDate - 新選擇的日期
     */
    const handleDateChange = (newDate) => {
        setSelectedDate(newDate);
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 relative">
            {/* Header - 標題與主要按鈕 */}
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                    <CheckCircle size={20} className="text-teal-500" />
                    待辦清單
                </h3>
                <div className="flex gap-2">
                    <button
                        onClick={() => setShowCompleted(!showCompleted)}
                        style={{ backgroundColor: showCompleted ? styles.primaryColor : styles.accentColor }}
                        className={`p-2 rounded-xl transition-all ${showCompleted ? 'text-white shadow-md' : 'text-white hover:opacity-90'}`}
                        title="已完成任務"
                    >
                        <History size={12} />
                    </button>
                    <button
                        style={{ backgroundColor: styles.accentColor }}
                        className="p-2 rounded-xl text-white shadow-md hover:opacity-90 transition-all flex items-center gap-1"
                        title="新增待辦"
                    >
                        <Plus size={12} />
                    </button>
                </div>
            </div>

            {/* Sub-Header: Filters - 篩選器區域 */}
            <div className="flex gap-3 mb-4 relative z-20">
                {/* Date Picker - 日期選擇器 */}
                <DatePicker
                    selectedDate={selectedDate}
                    onDateChange={handleDateChange}
                    mode={viewMode}
                    styles={styles}
                    showModeSwitch={true}
                />

                {/* Category Filter - 類別篩選器 */}
                <div className="relative">
                    <button
                        onClick={() => setShowFilter(!showFilter)}
                        style={{ backgroundColor: styles.secondaryColor, fontSize: styles.buttonTextSize }}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg font-bold transition-all border text-white hover:opacity-90"
                    >
                        <Filter size={14} />
                        {categories.find(c => c.id === activeCategory)?.label || '篩選'}
                        <ChevronDown size={12} className={`transition-transform ${showFilter ? 'rotate-180' : ''}`} />
                    </button>

                    {showFilter && (
                        <div className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-xl border border-slate-100 p-2 min-w-[150px] flex flex-col gap-1 animate-in fade-in zoom-in-95 max-h-[200px] overflow-y-auto z-50">
                            {categories.map(cat => (
                                <button
                                    key={cat.id}
                                    onClick={() => { setActiveCategory(cat.id); setShowFilter(false); }}
                                    style={{ fontSize: styles.buttonTextSize }}
                                    className={`flex items-center gap-2 text-left px-3 py-2 rounded-lg font-medium transition-colors ${activeCategory === cat.id ? 'bg-orange-50 text-orange-700' : 'text-slate-600 hover:bg-slate-50'}`}
                                >
                                    {cat.icon && <cat.icon size={12} />}
                                    {cat.label}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Completed Tasks Dropdown Area - 已完成任務區域 */}
            {showCompleted && (
                <div className="mb-4 bg-slate-50 rounded-xl p-3 border border-slate-200 animate-in fade-in slide-in-from-top-2">
                    <div className="flex justify-between items-center mb-2 px-1">
                        <h4 className="text-xs font-bold text-slate-500 flex items-center gap-1">
                            <History size={12} />
                            已完成任務 ({completedTasks.length})
                        </h4>
                        <button onClick={() => setShowCompleted(false)} className="text-slate-400 hover:text-slate-600">
                            <X size={10} />
                        </button>
                    </div>

                    <div className="space-y-2 max-h-[200px] overflow-y-auto pr-1 custom-scrollbar">
                        {completedTasks.length > 0 ? (
                            completedTasks.map(task => (
                                <div key={task.id} className="flex items-center justify-between bg-white p-2 rounded-lg border border-slate-100 opacity-75 hover:opacity-100 transition-opacity">
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-full bg-slate-100 flex-shrink-0 overflow-hidden border border-slate-200">
                                            <img src={getPetAvatar(task.petId)} alt="" className="w-full h-full object-cover grayscale" />
                                        </div>
                                        <span className="text-xs text-slate-500 line-through">{task.title}</span>
                                    </div>
                                    <button
                                        onClick={() => restoreTask(task.id)}
                                        style={{ fontSize: styles.buttonTextSize }}
                                        className="bg-slate-100 text-slate-600 px-2 py-1 rounded hover:bg-slate-200 flex items-center gap-1 transition-colors"
                                    >
                                        <RotateCcw size={10} />
                                        還原
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-xs text-slate-400 py-2">沒有已完成的任務</p>
                        )}
                    </div>
                </div>
            )}

            {/* Active Task List - 待辦任務清單 */}
            <div className="space-y-3">
                {activeTasks.length > 0 ? (
                    activeTasks.map(task => {
                        const catConfig = categories.find(c => c.id === task.category) || categories[5];
                        const Icon = catConfig.icon;
                        const showLabel = task.category !== 'shopping' && task.category !== 'health';

                        return (
                            <div key={task.id} className="p-3 rounded-xl border bg-white border-slate-200 shadow-sm hover:shadow-md transition-all">
                                <div className="flex items-start gap-3">
                                    {/* 寵物頭像 */}
                                    <div className="w-10 h-10 rounded-full bg-slate-200 flex-shrink-0 overflow-hidden border-2 border-slate-100">
                                        <img
                                            src={getPetAvatar(task.petId)}
                                            alt="pet avatar"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <p className="font-bold text-sm text-slate-800">
                                                {task.title}
                                            </p>
                                            {showLabel && (
                                                <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold flex items-center gap-1 ${catConfig.bg} ${catConfig.color}`}>
                                                    {Icon && <Icon size={8} />}
                                                    {catConfig.label}
                                                </span>
                                            )}
                                        </div>

                                        <div className="flex items-center gap-3 mt-2 text-xs text-slate-500">
                                            <span className="flex items-center gap-1">
                                                <Calendar size={12} />
                                                {task.date}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Clock size={12} />
                                                {task.time}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-3 flex justify-end gap-2">
                                    <button
                                        onClick={() => handleReschedule(task.id)}
                                        style={{ backgroundColor: styles.secondaryColor, fontSize: styles.buttonTextSize }}
                                        className="font-medium text-white px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors hover:opacity-90"
                                    >
                                        <RefreshCw size={12} />
                                        改期
                                    </button>
                                    <button
                                        onClick={() => toggleComplete(task.id)}
                                        style={{ backgroundColor: styles.primaryColor, fontSize: styles.buttonTextSize }}
                                        className="font-medium text-white px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors hover:opacity-90"
                                    >
                                        <CheckCircle size={12} />
                                        完成
                                    </button>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="text-center py-12 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                        <p className="text-slate-400 text-sm">此日期沒有待辦事項</p>
                        <p className="text-slate-300 text-xs mt-1">點擊右上角 + 新增</p>
                    </div>
                )}
            </div>
        </div>
    );
};
