import React from 'react';
import { TrendingUp, AlertOctagon, Target, Zap } from 'lucide-react';

type SwotType = 'strengths' | 'weaknesses' | 'opportunities' | 'threats';

interface SwotCardProps {
    type: SwotType;
    items: string[];
}

const SWOT_STYLES = {
    strengths: {
        icon: TrendingUp,
        color: 'text-emerald-600',
        bg: 'bg-emerald-50',
        border: 'border-emerald-200',
        title: 'Strengths'
    },
    weaknesses: {
        icon: AlertOctagon,
        color: 'text-red-600',
        bg: 'bg-red-50',
        border: 'border-red-200',
        title: 'Weaknesses'
    },
    opportunities: {
        icon: Target,
        color: 'text-blue-600',
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        title: 'Opportunities'
    },
    threats: {
        icon: Zap,
        color: 'text-orange-600',
        bg: 'bg-orange-50',
        border: 'border-orange-200',
        title: 'Threats'
    }
};

export const SwotCard: React.FC<SwotCardProps> = ({ type, items }) => {
    const style = SWOT_STYLES[type];
    const Icon = style.icon;

    return (
        <div className={`p-5 rounded-xl border ${style.border} ${style.bg} h-full`}>
            <div className="flex items-center gap-2 mb-4">
                <Icon className={`w-5 h-5 ${style.color}`} />
                <h3 className={`font-bold uppercase tracking-wide text-sm ${style.color}`}>
                    {style.title}
                </h3>
            </div>
            <ul className="space-y-2">
                {items && items.length > 0 ? (
                    items.map((item, idx) => (
                        <li
                            key={idx}
                            className="text-sm text-slate-700 leading-relaxed flex items-start gap-2"
                        >
                            <span
                                className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${style.color.replace('text', 'bg')}`}
                            />
                            {item}
                        </li>
                    ))
                ) : (
                    <li className="text-xs text-slate-400 italic">None identified.</li>
                )}
            </ul>
        </div>
    );
};

export default SwotCard;
