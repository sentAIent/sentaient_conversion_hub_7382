'use client'

import { useBetSlip, BetTarget } from './BetSlipContext'

type BetButtonProps = {
  bet: BetTarget;
  className?: string;
  variant?: 'solid' | 'outline' | 'ghost';
  size?: 'sm' | 'md';
}

export function BetButton({ bet, className = '', variant = 'solid', size = 'sm' }: BetButtonProps) {
  const { openBetSlip } = useBetSlip()

  const baseStyles = 'inline-flex items-center justify-center font-bold rounded-lg transition-all active:scale-95'
  
  const sizeStyles = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1.5'
  }

  const variantStyles = {
    solid: 'bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 border border-blue-500/30',
    outline: 'border border-gray-700 text-gray-400 hover:border-gray-500 hover:text-white',
    ghost: 'text-gray-400 hover:bg-gray-800 hover:text-white'
  }

  return (
    <button
      onClick={(e) => {
        e.stopPropagation(); // prevent clicking the player row
        openBetSlip(bet);
      }}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      title="Place a Paper Bet"
    >
      Bet {bet.selection}
    </button>
  )
}
