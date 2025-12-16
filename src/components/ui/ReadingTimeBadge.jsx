import React from 'react';
import { Clock } from 'lucide-react';

const ReadingTimeBadge = ({ time }) => {
    if (!time) return null;

    return (
        <span className="inline-flex items-center gap-1.5 ml-3 px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-500 text-xs font-medium border border-stone-200/50 select-none">
            <Clock size={10} className="text-stone-400" />
            {time}
        </span>
    );
};

export default ReadingTimeBadge;
