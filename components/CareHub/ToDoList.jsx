import { useState } from 'react';
import {
    ShoppingBag, Activity, Gamepad2, Camera, Star,
    Clock, Calendar, CheckCircle, Circle, RefreshCw, Plus
} from 'lucide-react';

export const ToDoList = ({ currentPet, initialTasks = [] }) => {
    const [activeCategory, setActiveCategory] = useState('all');
    const [viewMode, setViewMode] = useState('day'); // day, month, year
    const [tasks, setTasks] = useState([
        { id: 1, title: '買飼料', category: 'shopping', date: '2025-11-30', time: '10:00', completed: false, petId: 'all' },
        { id: 2, title: '打疫苗', category: 'health', date: '2025-12-05', time: '14:00', completed: false, petId: 'dog1' },
        { id: 3, title: '帶去公園玩', category: 'play', date: '2025-11-30', time: '16:00', completed: true, petId: 'dog1' },
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

    const filteredTasks = tasks.filter(task => {
        const categoryMatch = activeCategory === 'all' || task.category === activeCategory;
        const petMatch = currentPet.id === 'all' || task.petId === 'all' || task.petId === currentPet.id;
        // Simple date filtering for demo purposes
        const today = new Date().toISOString().split('T')[0];
        const taskDate = task.date;
        let dateMatch = true;

        if (viewMode === 'day') {
            // For demo, just show everything or implement strict day filtering
            // dateMatch = taskDate === today; 
        }

        return categoryMatch && petMatch && dateMatch;
    });

    const toggleComplete = (id) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    };

    const handleReschedule = (id) => {
        // Mock reschedule - just push date forward 1 day
        setTasks(tasks.map(t => {
            if (t.id === id) {
                const d = new Date(t.date);
                d.setDate(d.getDate() + 1);
                return { ...t, date: d.toISOString().split('T')[0] };
            }
            return t;
        }));
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                    <CheckCircle size={20} className="text-teal-500" />
                    待辦清單
                </h3>
                <div className="flex bg-slate-100 rounded-lg p-1">
                    {['day', 'month', 'year'].map(mode => (
                        <button
                            key={mode}
                            onClick={() => setViewMode(mode)}
                            style={{
                                backgroundColor: viewMode === mode ? '#705038ff' : '#a38b79ff',
                                fontSize: '10px'
                            }}
                            className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${viewMode === mode ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                                }`}
                        >
                            {mode === 'day' ? '日' : mode === 'month' ? '月' : '年'}
                        </button>
                    ))}
                </div>
            </div>

            {/* Categories */}
            <div className="flex gap-2 overflow-x-auto pb-4 mb-2 no-scrollbar">
                {categories.map(cat => {
                    const Icon = cat.icon;
                    return (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            style={{
                                backgroundColor: activeCategory === cat.id ? '#705038ff' : '#a38b79ff',
                                fontSize: '10px'
                            }}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-bold whitespace-nowrap transition-all border ${activeCategory === cat.id
                                ? 'text-white border-[#47240A]'
                                : 'text-slate-600 border-slate-200 hover:border-slate-300'
                                }`}
                        >
                            {Icon && <Icon size={14} />}
                            {cat.label}
                        </button>
                    );
                })}
            </div>

            {/* Task List */}
            <div className="space-y-3">
                {filteredTasks.length > 0 ? (
                    filteredTasks.map(task => {
                        const catConfig = categories.find(c => c.id === task.category) || categories[5];
                        const Icon = catConfig.icon;

                        return (
                            <div key={task.id} className={`p-3 rounded-xl border transition-all ${task.completed ? 'bg-slate-50 border-slate-100 opacity-60' : 'bg-white border-slate-200 shadow-sm'}`}>
                                <div className="flex items-start gap-3">
                                    <button onClick={() => toggleComplete(task.id)}
                                        style={{
                                            backgroundColor: task.completed ? '#a38b79ff' : '#705038ff',
                                            fontSize: '10px'
                                        }}
                                        className="mt-1 text-slate-400 hover:text-teal-500 transition-colors">
                                        {task.completed ? <CheckCircle size={8} className="text-teal-500" /> : <Circle size={8} />}
                                    </button>

                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <p className={`font-bold text-sm ${task.completed ? 'text-slate-500 line-through' : 'text-slate-800'}`}>
                                                {task.title}
                                            </p>
                                            <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold flex items-center gap-1 ${catConfig.bg} ${catConfig.color}`}>
                                                {Icon && <Icon size={8} />}
                                                {catConfig.label}
                                            </span>
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

                                {!task.completed && (
                                    <div className="mt-3 flex justify-end">
                                        <button
                                            onClick={() => handleReschedule(task.id)}
                                            style={{
                                                backgroundColor: task.completed ? '#a38b79ff' : '#705038ff',
                                                fontSize: '10px'
                                            }}
                                            className="text-xs font-medium text-indigo-600 hover:bg-indigo-50 px-2 py-1 rounded flex items-center gap-1 transition-colors"
                                        >
                                            <RefreshCw size={12} />
                                            改期
                                        </button>
                                    </div>
                                )}
                            </div>
                        );
                    })
                ) : (
                    <div className="text-center py-8 text-slate-400 text-sm">
                        沒有待辦事項
                    </div>
                )}
            </div>

            <button
                style={{
                    backgroundColor: '#705038ff',
                    fontSize: '12px'
                }}
                className="w-full mt-4 py-2 border-2 border-dashed border-slate-200 rounded-xl text-slate-500 text-sm font-bold hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center justify-center gap-2">
                <Plus size={12} />
                新增待辦
            </button>
        </div>
    );
};
