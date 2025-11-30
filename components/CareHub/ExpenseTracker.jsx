import { useState, useMemo } from 'react';
import { DollarSign, TrendingUp, PieChart, Tag, Plus, X } from 'lucide-react';
import { MOCK_PETS } from '../../data/mockData';
import { EXPENSE_CATEGORIES } from '../../data/mockData';

export const ExpenseTracker = ({ currentPet, expenses, setExpenses }) => {
  const [timeframe, setTimeframe] = useState('month');
  const [isAdding, setIsAdding] = useState(false);
  const [newExpense, setNewExpense] = useState({
    title: '',
    amount: '',
    category: 'food',
    date: new Date().toISOString().split('T')[0]
  });

  const filteredExpenses = useMemo(() => {
    return expenses.filter(ex => {
      const exDate = new Date(ex.date);
      const now = new Date();
      const isPetMatch = currentPet.id === 'all' ? true : (ex.petId === currentPet.id || ex.petId === 'all');

      let isTimeMatch = false;
      if (timeframe === 'day') {
        isTimeMatch = exDate.toDateString() === now.toDateString();
      } else if (timeframe === 'month') {
        isTimeMatch = exDate.getMonth() === now.getMonth() && exDate.getFullYear() === now.getFullYear();
      } else if (timeframe === 'year') {
        isTimeMatch = exDate.getFullYear() === now.getFullYear();
      }

      return isPetMatch && isTimeMatch;
    }).sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [expenses, currentPet, timeframe]);

  const totalAmount = filteredExpenses.reduce((sum, ex) => sum + ex.amount, 0);

  const categoryData = useMemo(() => {
    const data = {};
    filteredExpenses.forEach(ex => {
      data[ex.category] = (data[ex.category] || 0) + ex.amount;
    });
    return Object.entries(data).sort((a, b) => b[1] - a[1]);
  }, [filteredExpenses]);

  const trendData = useMemo(() => {
    const data = {};
    filteredExpenses.forEach(ex => {
      let key = ex.date;
      if (timeframe === 'year') key = ex.date.substring(0, 7);
      data[key] = (data[key] || 0) + ex.amount;
    });
    const sortedKeys = Object.keys(data).sort();
    return sortedKeys.map(k => ({ date: k, amount: data[k] }));
  }, [filteredExpenses, timeframe]);

  const handleAddExpense = () => {
    if (!newExpense.title || !newExpense.amount) return;
    const petIdToAdd = currentPet.id === 'all' ? 'all' : currentPet.id;
    setExpenses([{
      id: Date.now(),
      petId: petIdToAdd,
      ...newExpense,
      amount: parseInt(newExpense.amount)
    }, ...expenses]);
    setIsAdding(false);
    setNewExpense({ title: '', amount: '', category: 'food', date: new Date().toISOString().split('T')[0] });
  };

  const renderTrendChart = () => {
    if (trendData.length < 2) {
      return <div className="text-center text-gray-400 py-4 text-xs">數據積累中...</div>;
    }

    const h = 60;
    const w = 300;
    const maxVal = Math.max(...trendData.map(d => d.amount));
    const points = trendData.map((d, i) => {
      const x = (i / (trendData.length - 1)) * w;
      const y = h - (d.amount / maxVal) * h;
      return `${x},${y}`;
    }).join(' ');

    return (
      <svg width="100%" height={h} viewBox={`0 0 ${w} ${h}`} className="overflow-visible">
        <polyline
          fill="none"
          stroke="#6366f1"
          strokeWidth="2"
          points={points}
        />
        <circle
          cx={(trendData.length - 1) / (trendData.length - 1) * w}
          cy={h - (trendData[trendData.length - 1].amount / maxVal) * h}
          r="3"
          fill="#6366f1"
        />
      </svg>
    );
  };

  return (
    <div className="mt-8 mb-8 animate-in fade-in slide-in-from-bottom-4">
      {/* 財務管家卡片容器 */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
            <DollarSign size={20} className="text-yellow-500" />
            財務管家
          </h3>
          <div className="bg-gray-100 p-1 rounded-lg flex text-xs font-medium">
            {['day', 'month', 'year'].map(t => (
              <button
                key={t}
                onClick={() => setTimeframe(t)}
                style={{
                  fontSize: '10px',
                  backgroundColor: timeframe === t ? '#705038ff' : '#a38b79ff'
                }}
                className={`px-2 py-1 rounded-md transition-all ${timeframe === t
                  ? 'bg-white shadow text-slate-800'
                  : 'text-gray-400'
                  }`}
              >
                {t === 'day' ? '日' : t === 'month' ? '月' : '年'}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-slate-50 p-4 rounded-xl mb-4">
          <div className="flex justify-between items-end mb-4">
            <div>
              <p className="text-xs text-gray-400 mb-1">
                {timeframe === 'year' ? '本年度' : timeframe === 'month' ? '本月' : '今日'}總支出
              </p>
              <p className="text-3xl font-bold text-slate-800">
                NT$ {totalAmount.toLocaleString()}
              </p>
            </div>
            <button
              onClick={() => setIsAdding(true)}
              className="bg-slate-800 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg active:scale-95"
              style={{
                fontSize: '10px',
                backgroundColor: '#705038ff',
              }}
            >
              <Plus size={16} /> 記一筆
            </button>
          </div>

          <div className="mb-4 border-b border-gray-200 pb-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp size={14} className="text-indigo-500" />
              <span className="text-xs font-bold text-gray-500">消費趨勢</span>
            </div>
            <div className="px-2 py-2">{renderTrendChart()}</div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <PieChart size={14} className="text-orange-500" />
              <span className="text-xs font-bold text-gray-500">分類分析</span>
            </div>
            <div className="space-y-2">
              {categoryData.map(([cat, amount]) => (
                <div key={cat} className="flex items-center text-xs">
                  <span
                    className={`w-2 h-2 rounded-full mr-2 ${EXPENSE_CATEGORIES[cat]?.color || 'bg-gray-400'
                      }`}
                  ></span>
                  <span className="w-12 text-gray-500">
                    {EXPENSE_CATEGORIES[cat]?.label || '其他'}
                  </span>
                  <div className="flex-1 h-1.5 bg-gray-100 rounded-full mx-2 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${EXPENSE_CATEGORIES[cat]?.color || 'bg-gray-400'
                        }`}
                      style={{ width: `${(amount / totalAmount) * 100}%` }}
                    ></div>
                  </div>
                  <span className="font-mono font-bold text-gray-700">
                    NT${amount}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-bold text-slate-600 mb-3">近期明細</h4>
          <div className="space-y-2">
            {filteredExpenses.length > 0 ? (
              filteredExpenses.map(ex => (
                <div
                  key={ex.id}
                  className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-full text-white ${EXPENSE_CATEGORIES[ex.category]?.color || 'bg-gray-400'
                        }`}
                    >
                      <Tag size={16} />
                    </div>
                    <div>
                      <p className="font-bold text-slate-700 text-sm">{ex.title}</p>
                      <div className="flex items-center gap-2 text-[10px] text-gray-400">
                        <span>{ex.date}</span>
                        {currentPet.id === 'all' && (
                          <span className="bg-white px-1.5 rounded text-slate-500">
                            {ex.petId === 'all'
                              ? '全家'
                              : MOCK_PETS.find(p => p.id === ex.petId)?.name.split(' ')[0]}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <span className="font-bold text-slate-800">- NT${ex.amount}</span>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-400 text-sm py-4 bg-slate-50 rounded-xl">此期間無支出紀錄</p>
            )}
          </div>
        </div>
      </div>

      {isAdding && (
        <div className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm p-5 shadow-2xl animate-in fade-in zoom-in-95">
            <h3 className="text-lg font-bold text-slate-800 mb-4">新增支出</h3>
            <div className="space-y-3">
              <input
                type="number"
                value={newExpense.amount}
                onChange={e => setNewExpense({ ...newExpense, amount: e.target.value })}
                className="w-full border rounded-lg p-2 text-lg font-bold"
                placeholder="金額"
              />
              <input
                type="text"
                value={newExpense.title}
                onChange={e => setNewExpense({ ...newExpense, title: e.target.value })}
                className="w-full border rounded-lg p-2 text-sm"
                placeholder="項目名稱"
              />
              <div className="flex flex-wrap gap-2">
                {Object.entries(EXPENSE_CATEGORIES).map(([key, config]) => (
                  <button
                    key={key}
                    onClick={() => setNewExpense({ ...newExpense, category: key })}
                    style={{ fontSize: '12px', backgroundColor: '#705038ff' }}
                    className={`px-3 py-1.5 rounded-lg font-bold border ${newExpense.category === key
                      ? `${config.color} text-white`
                      : 'bg-white text-gray-600'
                      }`}
                  >
                    {config.label}
                  </button>
                ))}
              </div>
              <input
                type="date"
                value={newExpense.date}
                onChange={e => setNewExpense({ ...newExpense, date: e.target.value })}
                className="w-full border rounded-lg p-2 text-sm text-gray-600"
              />
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setIsAdding(false)}
                style={{ fontSize: '12px', backgroundColor: '#705038ff' }}
                className="flex-1 py-3 text-gray-600 rounded-xl font-bold"
              >
                取消
              </button>
              <button
                onClick={handleAddExpense}
                style={{ fontSize: '12px', backgroundColor: '#705038ff' }}
                className="flex-1 py-3 text-white rounded-xl font-bold"
              >
                儲存
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

