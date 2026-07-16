'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

export type BetTarget = {
  targetId: string;
  targetName: string; // e.g. "Patrick Mahomes" or "KC Chiefs"
  betType: 'player_prop' | 'game_spread' | 'game_moneyline' | 'game_total';
  market: string; // e.g. "passing_yds", "spread"
  line: number | null; 
  selection: string; // e.g. "OVER", "UNDER", "HOME", "AWAY"
  odds: number;
}

type BetSlipContextType = {
  isOpen: boolean;
  activeBet: BetTarget | null;
  openBetSlip: (bet: BetTarget) => void;
  closeBetSlip: () => void;
}

const BetSlipContext = createContext<BetSlipContextType | undefined>(undefined)

export function BetSlipProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeBet, setActiveBet] = useState<BetTarget | null>(null)

  const openBetSlip = (bet: BetTarget) => {
    setActiveBet(bet)
    setIsOpen(true)
  }

  const closeBetSlip = () => {
    setIsOpen(false)
    // Keep activeBet for animation out, clear it later if needed
  }

  return (
    <BetSlipContext.Provider value={{ isOpen, activeBet, openBetSlip, closeBetSlip }}>
      {children}
    </BetSlipContext.Provider>
  )
}

export function useBetSlip() {
  const context = useContext(BetSlipContext)
  if (context === undefined) {
    throw new Error('useBetSlip must be used within a BetSlipProvider')
  }
  return context
}
