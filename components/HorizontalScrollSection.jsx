import { MapPin, ChevronRight } from 'lucide-react';

export const HorizontalScrollSection = ({ title, items, onItemClick, buttonAlign = 'center', titleStyle = {} }) => {
    const alignmentClass = buttonAlign === 'left' ? 'justify-start pl-4' : 'justify-center';
    const textAlignmentClass = buttonAlign === 'left' ? 'text-left pl-4' : 'text-center';

    return (
        <div className="space-y-3">
            {title && (
                <div className="flex items-center justify-between px-1" style={{ justifyContent: titleStyle.textAlign === 'center' ? 'center' : 'space-between' }}>
                    <h3
                        className="font-bold flex items-center gap-2"
                        style={{
                            fontSize: titleStyle.fontSize || '18.66px', // Default 14pt
                            color: titleStyle.color,
                            textAlign: titleStyle.textAlign,
                            width: titleStyle.textAlign === 'center' ? '100%' : 'auto',
                            ...titleStyle
                        }}
                    >
                        {title}
                    </h3>
                    {titleStyle.textAlign !== 'center' && (
                        <div className="text-black hover:text-gray-600 transition-colors cursor-pointer">
                            <ChevronRight size={25} />
                        </div>
                    )}
                </div>
            )}

            <div className="flex overflow-x-auto space-x-4 pb-4 snap-x no-scrollbar -mx-4 px-4">
                {items.map(item => (
                    <div
                        key={item.id}
                        className="min-w-[60vw] max-w-[260px] sm:min-w-[300px] snap-center bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex-shrink-0"
                    >
                        <img src={item.image} className="h-40 w-full object-cover" alt={item.title} />
                        <div className="p-4">
                            <h3 className="font-bold text-lg">{item.title}</h3>
                            <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                                <MapPin size={14} />
                                {item.date} @ {item.location}
                            </p>
                            <div className="flex items-center justify-between mt-3 gap-3">
                                <div className="flex -space-x-2">
                                    {(item.participantList || [])
                                        .sort((a, b) => (b.isFriend ? 1 : 0) - (a.isFriend ? 1 : 0))
                                        .slice(0, 3)
                                        .map((participant) => (
                                            <img
                                                key={participant.id}
                                                src={participant.avatar}
                                                alt={participant.name}
                                                className={`inline-block h-6 w-6 rounded-full ring-2 ring-white object-cover ${participant.isFriend ? 'ring-yellow-300' : ''}`}
                                            />
                                        ))}
                                    {(item.participantList?.length || 0) > 4 && (
                                        <div className="flex h-6 w-6 items-center justify-center rounded-full ring-2 ring-white bg-gray-100 text-[10px] font-bold text-gray-500">
                                            +{item.participantList.length - 4}
                                        </div>
                                    )}
                                </div>
                                <button className={`bg-indigo-600 text-white text-xs font-bold py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-200 ${textAlignmentClass}`}>
                                    來去參加
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
