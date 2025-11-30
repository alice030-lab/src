import { useState, useMemo } from 'react';
import {
    ShoppingBag, Activity, Gamepad2, Camera, Star,
    Clock, Calendar, CheckCircle, Circle, RefreshCw, Plus,
    Filter, History, RotateCcw, ChevronDown, ChevronLeft, ChevronRight, X
} from 'lucide-react';
import { MOCK_PETS } from '../../data/mockData';

export const ToDoList = ({ currentPet, initialTasks = [] }) => {
    // ===== 樣式配置中心 =====
    const styles = {
        //主要顏色
        primaryColor: '#705038ff',      // 主要按鈕顏色
        secondaryColor: '#8b705cff',    // 次要按鈕顏色
        accentColor: '#422603ff',         // 強調色 (teal)

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
    const [showCalendar, setShowCalendar] = useState(false);
    const [showFilter, setShowFilter] = useState(false);

    // Date Picker State
    const [viewMode, setViewMode] = useState('day'); // 'day', 'month', 'year'
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [pickerDate, setPickerDate] = useState(new Date()); // For navigation within picker

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

    // Calendar Logic
    const calendarDays = useMemo(() => {
        const year = pickerDate.getFullYear();
        const month = pickerDate.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDay = firstDay.getDay(); // 0 = Sunday

        const days = [];
        for (let i = 0; i < startingDay; i++) days.push(null);
        for (let i = 1; i <= daysInMonth; i++) days.push(new Date(year, month, i));
        return days;
    }, [pickerDate]);

    const yearsList = useMemo(() => {
        const currentYear = pickerDate.getFullYear();
        const startYear = currentYear - 5;
        const years = [];
        for (let i = 0; i < 12; i++) {
            years.push(startYear + i);
        }
        return years;
    }, [pickerDate]);

    const handlePrev = () => {
        const newDate = new Date(pickerDate);
        if (viewMode === 'day') newDate.setMonth(newDate.getMonth() - 1);
        if (viewMode === 'month') newDate.setFullYear(newDate.getFullYear() - 1);
        if (viewMode === 'year') newDate.setFullYear(newDate.getFullYear() - 10);
        setPickerDate(newDate);
    };

    const handleNext = () => {
        const newDate = new Date(pickerDate);
        if (viewMode === 'day') newDate.setMonth(newDate.getMonth() + 1);
        if (viewMode === 'month') newDate.setFullYear(newDate.getFullYear() + 1);
        if (viewMode === 'year') newDate.setFullYear(newDate.getFullYear() + 10);
        setPickerDate(newDate);
    };

    const handleDateSelect = (date) => {
        setSelectedDate(date);
        setShowCalendar(false);
    };

    const handleMonthSelect = (monthIndex) => {
        const newDate = new Date(pickerDate);
        newDate.setMonth(monthIndex);
        setSelectedDate(newDate);
        setShowCalendar(false);
    };

    const handleYearSelect = (year) => {
        const newDate = new Date(pickerDate);
        newDate.setFullYear(year);
        setSelectedDate(newDate);
        setShowCalendar(false);
    };

    const isSameDay = (d1, d2) => d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();

    // 篩選邏輯
    const getFilteredTasks = (isCompleted) => {
        return tasks.filter(task => {
            if (task.completed !== isCompleted) return false;
            const categoryMatch = activeCategory === 'all' || task.category === activeCategory;

            let petMatch;
            if (currentPet.id === 'all') {
                petMatch = true;
            } else {
                petMatch = task.petId === currentPet.id;
            }

            // 日期篩選
            const taskDate = new Date(task.date);
            let dateMatch = true;

            if (viewMode === 'day') {
                dateMatch = task.date === selectedDate.toISOString().split('T')[0];
            } else if (viewMode === 'month') {
                dateMatch = taskDate.getFullYear() === selectedDate.getFullYear() &&
                    taskDate.getMonth() === selectedDate.getMonth();
            } else if (viewMode === 'year') {
                dateMatch = taskDate.getFullYear() === selectedDate.getFullYear();
            }

            return categoryMatch && petMatch && dateMatch;
        });
    };

    const activeTasks = getFilteredTasks(false);
    const completedTasks = getFilteredTasks(true);

    const toggleComplete = (id) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    };

    const restoreTask = (id) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, completed: false } : t));
    };

    const handleReschedule = (id) => {
        setTasks(tasks.map(t => {
            if (t.id === id) {
                const d = new Date(t.date);
                d.setDate(d.getDate() + 1);
                return { ...t, date: d.toISOString().split('T')[0] };
            }
            return t;
        }));
    };

    const getPetAvatar = (petId) => {
        if (petId === 'all') return 'https://api.dicebear.com/7.x/avataaars/svg?seed=all';
        try {
            const pet = MOCK_PETS.find(p => p.id === petId);
            return pet?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${petId}`;
        } catch (e) {
            return `https://api.dicebear.com/7.x/avataaars/svg?seed=${petId}`;
        }
    };

    const getDisplayDate = () => {
        if (viewMode === 'day') return selectedDate.toLocaleDateString('zh-TW');
        if (viewMode === 'month') return `${selectedDate.getFullYear()}年 ${selectedDate.getMonth() + 1}月`;
        if (viewMode === 'year') return `${selectedDate.getFullYear()}年`;
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 relative">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                    <CheckCircle size={20} className="text-teal-500" />
                    待辦清單
                </h3>
                <div className="flex gap-2">
                    <button
                        onClick={() => setShowCompleted(!showCompleted)}
                        style={{ backgroundColor: showCompleted ? styles.primaryColor : styles.accentColor }}
                        className={`p-2 rounded-xl transition-all ${showCompleted ? 'text-white shadow-md' : 'text-slate-500 hover:bg-slate-200'}`}
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

            {/* Sub-Header: Filters */}
            <div className="flex gap-3 mb-4 relative z-20">
                {/* Date Picker Trigger */}
                <div className="relative">
                    <button
                        onClick={() => { setShowCalendar(!showCalendar); setShowFilter(false); setPickerDate(selectedDate); }}
                        style={{ backgroundColor: styles.secondaryColor, fontSize: styles.buttonTextSize }}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-bold transition-all border ${showCalendar ? 'bg-teal-50 border-teal-200 text-teal-700' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                    >
                        <Calendar size={12} />
                        {getDisplayDate()}
                        <ChevronDown size={12} className={`transition-transform ${showCalendar ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Custom Date Picker Popover */}
                    {showCalendar && (
                        <div className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-xl border border-slate-100 p-4 min-w-[280px] animate-in fade-in zoom-in-95 z-50">
                            {/* Mode Switcher */}
                            <div className="flex bg-slate-100 rounded-lg p-1 mb-4">
                                {['day', 'month', 'year'].map(mode => (
                                    <button
                                        key={mode}
                                        onClick={() => setViewMode(mode)}
                                        style={{ backgroundColor: viewMode === mode ? styles.primaryColor : '#a38b79ff', fontSize: styles.buttonTextSize }}
                                        className={`flex-1 py-1 font-bold rounded-md transition-all ${viewMode === mode ? 'bg-white text-teal-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                                    >
                                        {mode === 'day' ? '日' : mode === 'month' ? '月' : '年'}
                                    </button>
                                ))}
                            </div>

                            {/* Calendar Header */}
                            <div className="flex justify-between items-center mb-4">
                                <button onClick={handlePrev} className="p-1 hover:bg-slate-100 rounded-full text-slate-600"
                                >
                                    <ChevronLeft size={12} />
                                </button>
                                <span className="font-bold text-slate-800">
                                    {viewMode === 'day' && `${pickerDate.getFullYear()}年 ${pickerDate.getMonth() + 1}月`}
                                    {viewMode === 'month' && `${pickerDate.getFullYear()}年`}
                                    {viewMode === 'year' && `${yearsList[0]} - ${yearsList[yearsList.length - 1]}`}
                                </span>
                                <button onClick={handleNext} className="p-1 hover:bg-slate-100 rounded-full text-slate-600">
                                    <ChevronRight size={12} />
                                </button>
                            </div>

                            {/* Day View */}
                            {viewMode === 'day' && (
                                <>
                                    <div className="grid grid-cols-7 gap-1 mb-2 text-center">
                                        {['日', '一', '二', '三', '四', '五', '六'].map(day => (
                                            <span key={day} className="text-xs font-medium text-slate-400">{day}</span>
                                        ))}
                                    </div>
                                    <div className="grid grid-cols-7 gap-1">
                                        {calendarDays.map((date, idx) => {
                                            if (!date) return <div key={idx} />;
                                            const isSelected = isSameDay(date, selectedDate);
                                            const isToday = isSameDay(date, new Date());
                                            return (
                                                <button
                                                    key={idx}
                                                    onClick={() => handleDateSelect(date)}
                                                    style={{ fontSize: styles.buttonTextSize, backgroundColor: isSelected ? styles.primaryColor : undefined }}
                                                    className={`h-8 w-8 rounded-full font-medium flex items-center justify-center transition-all ${isSelected ? 'text-white shadow-md' : isToday ? 'bg-teal-50 text-teal-600 font-bold border border-teal-200' : 'text-slate-600 hover:bg-slate-100'}`}
                                                >
                                                    {date.getDate()}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </>
                            )}

                            {/* Month View */}
                            {viewMode === 'month' && (
                                <div className="grid grid-cols-3 gap-2">
                                    {Array.from({ length: 12 }).map((_, i) => {
                                        const isSelected = selectedDate.getFullYear() === pickerDate.getFullYear() && selectedDate.getMonth() === i;
                                        return (
                                            <button
                                                key={i}
                                                onClick={() => handleMonthSelect(i)}
                                                style={{ fontSize: styles.buttonTextSize, backgroundColor: isSelected ? styles.primaryColor : undefined }}
                                                className={`py-2 rounded-lg font-medium transition-all ${isSelected ? 'text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'}`}
                                            >
                                                {i + 1}月
                                            </button>
                                        );
                                    })}
                                </div>
                            )}

                            {/* Year View */}
                            {viewMode === 'year' && (
                                <div className="grid grid-cols-3 gap-2">
                                    {yearsList.map(year => {
                                        const isSelected = selectedDate.getFullYear() === year;
                                        return (
                                            <button
                                                key={year}
                                                onClick={() => handleYearSelect(year)}
                                                style={{ fontSize: styles.buttonTextSize, backgroundColor: isSelected ? styles.primaryColor : undefined }}
                                                className={`py-2 rounded-lg font-medium transition-all ${isSelected ? 'text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'}`}
                                            >
                                                {year}
                                            </button>
                                        );
                                    })}
                                </div>
                            )}

                            {/* Footer Actions */}
                            <div className="mt-4 pt-3 border-t border-slate-100 flex justify-center">
                                <button
                                    onClick={() => { setSelectedDate(new Date()); setPickerDate(new Date()); setShowCalendar(false); }}
                                    style={{ fontSize: styles.buttonTextSize }}
                                    className="font-bold text-teal-600 hover:text-teal-700"
                                >
                                    回到今天
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Category Filter */}
                <div className="relative">
                    <button
                        onClick={() => { setShowFilter(!showFilter); setShowCalendar(false); }}
                        style={{ backgroundColor: styles.secondaryColor, fontSize: styles.buttonTextSize }}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-bold transition-all border ${showFilter ? 'bg-orange-50 border-orange-200 text-orange-700' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
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
                                    style={{ backgroundColor: styles.accentColor, fontSize: styles.buttonTextSize }}
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

            {/* Completed Tasks Dropdown Area */}
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

            {/* Active Task List */}
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
