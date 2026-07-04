import React from 'react';
import { Flame } from 'lucide-react';
import type { Theme } from '@/types';

interface ScoreCircleProps {
    value: number;
    size?: 'sm' | 'md' | 'lg';
    isRoastMode?: boolean;
    theme: Theme;
}

export const ScoreCircle: React.FC<ScoreCircleProps> = ({
    value,
    size = 'md',
    isRoastMode = false,
    theme
}) => {
    const radius = 30;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (value / 100) * circumference;

    // Determine color based on score
    let color = 'text-red-500';
    if (value > 70) color = 'text-yellow-500';
    if (value > 90) color = 'text-emerald-500';
    if (isRoastMode) color = 'text-red-600';

    // Determine text size based on size prop and value
    let textSize = 'text-lg';
    if (size === 'lg') {
        textSize = value === 100 ? 'text-sm' : 'text-lg';
    } else if (size === 'sm') {
        textSize = 'text-sm';
    } else {
        textSize = value === 100 ? 'text-xs' : 'text-lg';
    }

    // Container sizes
    const sizeClasses = {
        sm: 'w-12 h-12',
        md: 'w-16 h-16',
        lg: 'w-32 h-32'
    };

    // Background circle color based on theme
    const bgCircleClass = ['dark', 'navy', 'colorful', 'gray'].includes(theme.id)
        ? 'text-slate-700'
        : 'text-slate-200';

    return (
        <div className={`relative flex items-center justify-center ${sizeClasses[size]} ${textSize}`}>
            <svg className="transform -rotate-90 w-full h-full">
                <circle
                    className={bgCircleClass}
                    strokeWidth="6"
                    stroke="currentColor"
                    fill="transparent"
                    r={radius}
                    cx="50%"
                    cy="50%"
                />
                <circle
                    className={`${color} transition-all duration-1000 ease-out`}
                    strokeWidth="6"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r={radius}
                    cx="50%"
                    cy="50%"
                />
            </svg>
            <span className={`absolute font-bold ${color}`}>{value}%</span>
            {isRoastMode && (
                <Flame className={`absolute -top-3 -right-3 w-9 h-9 ${color} animate-pulse`} />
            )}
        </div>
    );
};

export default ScoreCircle;
