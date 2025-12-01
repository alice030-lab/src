import { useState, useMemo } from 'react';
import { Calendar, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * DatePicker Component
 * 
 * @param {Object} props
 * @param {Date} props.selectedDate - 當前選中的日期
 * @param {Function} props.onDateChange - 日期變更回調 (date: Date) => void
 * @param {'day'|'month'|'year'} props.mode - 選擇器模式：'day' | 'month' | 'year'
 * @param {Object} props.styles - 樣式配置
 * @param {string} props.styles.primaryColor - 主要顏色
 * @param {string} props.styles.secondaryColor - 次要顏色
 * @param {string} props.styles.buttonTextSize - 按鈕文字大小
 * @param {boolean} props.showModeSwitch - 是否顯示模式切換按鈕（日/月/年），默認為 true
 */
export const DatePicker = ({
    selectedDate = new Date(),
    onDateChange,
    mode: initialMode = 'day',
    styles = {},
    showModeSwitch = true
}) => {
    const [showCalendar, setShowCalendar] = useState(false);
    const [viewMode, setViewMode] = useState(initialMode);
    const [pickerDate, setPickerDate] = useState(selectedDate);

    // 默認樣式
    const defaultStyles = {
        primaryColor: '#705038ff',
        secondaryColor: '#8b705cff',
        buttonTextSize: '10px',
        ...styles
    };

    // Calendar Logic
    const calendarDays = useMemo(() => {
        const year = pickerDate.getFullYear();
        const month = pickerDate.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDay = firstDay.getDay();

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
        onDateChange?.(date);
        setShowCalendar(false);
    };

    const handleMonthSelect = (monthIndex) => {
        const newDate = new Date(pickerDate);
        newDate.setMonth(monthIndex);
        onDateChange?.(newDate);
        setShowCalendar(false);
    };

    const handleYearSelect = (year) => {
        const newDate = new Date(pickerDate);
        newDate.setFullYear(year);
        onDateChange?.(newDate);
        setShowCalendar(false);
    };

    const isSameDay = (d1, d2) => {
        return d1.getFullYear() === d2.getFullYear() &&
            d1.getMonth() === d2.getMonth() &&
            d1.getDate() === d2.getDate();
    };

    const getDisplayDate = () => {
        if (viewMode === 'day') return selectedDate.toLocaleDateString('zh-TW');
        if (viewMode === 'month') return `${selectedDate.getFullYear()}年 ${selectedDate.getMonth() + 1}月`;
        if (viewMode === 'year') return `${selectedDate.getFullYear()}年`;
    };

    return (
        <div className="relative">
            <button
                onClick={() => { setShowCalendar(!showCalendar); setPickerDate(selectedDate); }}
                style={{ backgroundColor: defaultStyles.secondaryColor, fontSize: defaultStyles.buttonTextSize }}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg font-bold transition-all border text-white hover:opacity-90"
            >
                <Calendar size={12} />
                {getDisplayDate()}
                <ChevronDown size={12} className={`transition-transform ${showCalendar ? 'rotate-180' : ''}`} />
            </button>

            {/* Custom Date Picker Popover */}
            {showCalendar && (
                <div className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-xl border border-slate-100 p-4 min-w-[280px] animate-in fade-in zoom-in-95 z-50">
                    {/* Mode Switcher */}
                    {showModeSwitch && (
                        <div className="flex bg-slate-100 rounded-lg p-1 mb-4">
                            {['day', 'month', 'year'].map(mode => (
                                <button
                                    key={mode}
                                    onClick={() => setViewMode(mode)}
                                    style={{
                                        backgroundColor: viewMode === mode ? defaultStyles.primaryColor : '#a38b79ff',
                                        fontSize: defaultStyles.buttonTextSize
                                    }}
                                    className={`flex-1 py-1 font-bold rounded-md transition-all ${viewMode === mode ? 'text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                                >
                                    {mode === 'day' ? '日' : mode === 'month' ? '月' : '年'}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Calendar Header */}
                    <div className="flex justify-between items-center mb-4">
                        <button onClick={handlePrev} className="p-1 hover:bg-slate-100 rounded-full text-slate-600">
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
                                            style={{
                                                fontSize: defaultStyles.buttonTextSize,
                                                backgroundColor: isSelected ? defaultStyles.primaryColor : undefined
                                            }}
                                            className={`h-8 w-8 rounded-full font-medium flex items-center justify-center transition-all ${isSelected
                                                    ? 'text-white shadow-md'
                                                    : isToday
                                                        ? 'bg-teal-50 text-teal-600 font-bold border border-teal-200'
                                                        : 'text-slate-600 hover:bg-slate-100'
                                                }`}
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
                                        style={{
                                            fontSize: defaultStyles.buttonTextSize,
                                            backgroundColor: isSelected ? defaultStyles.primaryColor : undefined
                                        }}
                                        className={`py-2 rounded-lg font-medium transition-all ${isSelected ? 'text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'
                                            }`}
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
                                        style={{
                                            fontSize: defaultStyles.buttonTextSize,
                                            backgroundColor: isSelected ? defaultStyles.primaryColor : undefined
                                        }}
                                        className={`py-2 rounded-lg font-medium transition-all ${isSelected ? 'text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'
                                            }`}
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
                            onClick={() => {
                                const today = new Date();
                                onDateChange?.(today);
                                setPickerDate(today);
                                setShowCalendar(false);
                            }}
                            style={{ fontSize: defaultStyles.buttonTextSize }}
                            className="font-bold text-teal-600 hover:text-teal-700"
                        >
                            回到今天
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
