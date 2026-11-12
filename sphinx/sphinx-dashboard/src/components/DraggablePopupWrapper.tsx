"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { GripHorizontal, RotateCcw } from 'lucide-react';

export interface DraggablePopupWrapperProps {
  children: React.ReactNode;
  /** Unique key (e.g. feature ID or coordinates) to reset drag offset when selection changes */
  resetKey?: string | number | null;
  /** Optional extra classes on the inner wrapper */
  className?: string;
  /** Optional custom title for the grip handle tooltip */
  handleLabel?: string;
  /** If false, hides the top grip bar (useful if a custom header uses data-drag-handle) */
  showGripBar?: boolean;
  /** If true, leaves padding on the right of the grip bar for MapLibre's default close button */
  hasCloseButton?: boolean;
}

export const DraggablePopupWrapper: React.FC<DraggablePopupWrapperProps> = ({
  children,
  resetKey,
  className = '',
  handleLabel = 'DRAG TO MOVE',
  showGripBar = true,
  hasCloseButton = true
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{ startX: number; startY: number; initialOffsetX: number; initialOffsetY: number } | null>(null);
  const currentOffsetRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Get the element to translate: prefer .maplibregl-popup-content if inside a MapLibre popup,
  // or fall back to containerRef.current for standalone floating cards.
  const getTargetElement = useCallback((): HTMLElement | null => {
    if (!containerRef.current) return null;
    const popupContent = containerRef.current.closest<HTMLElement>('.maplibregl-popup-content');
    if (popupContent) return popupContent;
    return containerRef.current;
  }, []);

  const getTipElement = useCallback((): HTMLElement | null => {
    if (!containerRef.current) return null;
    const popup = containerRef.current.closest<HTMLElement>('.maplibregl-popup');
    if (popup) {
      return popup.querySelector<HTMLElement>('.maplibregl-popup-tip');
    }
    return null;
  }, []);

  const applyOffset = useCallback((x: number, y: number) => {
    const target = getTargetElement();
    if (!target) return;

    if (x === 0 && y === 0) {
      target.style.transform = '';
      target.style.willChange = 'auto';
      const tip = getTipElement();
      if (tip) tip.style.opacity = '1';
    } else {
      target.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      target.style.willChange = 'transform';
      const tip = getTipElement();
      if (tip) {
        tip.style.transition = 'opacity 0.2s ease';
        tip.style.opacity = '0';
      }
    }
  }, [getTargetElement, getTipElement]);

  // Reset offset when resetKey changes
  useEffect(() => {
    currentOffsetRef.current = { x: 0, y: 0 };
    setOffset({ x: 0, y: 0 });
    applyOffset(0, 0);
  }, [resetKey, applyOffset]);

  // Keep dragged popup within visible viewport on window resize
  useEffect(() => {
    const handleWindowResize = () => {
      const target = getTargetElement();
      if (!target) return;
      const rect = target.getBoundingClientRect();
      const viewportW = window.visualViewport ? window.visualViewport.width : window.innerWidth;
      const viewportH = window.visualViewport ? window.visualViewport.height : window.innerHeight;
      let newX = currentOffsetRef.current.x;
      let newY = currentOffsetRef.current.y;
      if (rect.right > viewportW - 8) newX -= (rect.right - (viewportW - 8));
      if (rect.left < 8) newX += (8 - rect.left);
      if (rect.bottom > viewportH - 8) newY -= (rect.bottom - (viewportH - 8));
      if (rect.top < 8) newY += (8 - rect.top);
      if (newX !== currentOffsetRef.current.x || newY !== currentOffsetRef.current.y) {
        currentOffsetRef.current = { x: Math.round(newX), y: Math.round(newY) };
        setOffset(currentOffsetRef.current);
        applyOffset(currentOffsetRef.current.x, currentOffsetRef.current.y);
      }
    };
    handleWindowResize();
    window.addEventListener('resize', handleWindowResize);
    window.addEventListener('orientationchange', handleWindowResize);
    window.visualViewport?.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
      window.removeEventListener('orientationchange', handleWindowResize);
      window.visualViewport?.removeEventListener('resize', handleWindowResize);
    };
  }, [getTargetElement, applyOffset]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      const target = getTargetElement();
      if (target) {
        target.style.transform = '';
        target.style.willChange = 'auto';
      }
      const tip = getTipElement();
      if (tip) {
        tip.style.opacity = '1';
      }
    };
  }, [getTargetElement, getTipElement]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Left click or touch only
    if (e.button !== 0) return;
    
    // Stop propagation so MapLibre canvas does not intercept the drag and pan the map
    e.stopPropagation();

    const startX = e.clientX;
    const startY = e.clientY;
    const initialOffsetX = currentOffsetRef.current.x;
    const initialOffsetY = currentOffsetRef.current.y;

    dragStartRef.current = { startX, startY, initialOffsetX, initialOffsetY };
    setIsDragging(true);

    const handlePointerMove = (moveEvent: PointerEvent) => {
      if (!dragStartRef.current) return;
      moveEvent.stopPropagation();
      moveEvent.preventDefault();

      const dx = moveEvent.clientX - dragStartRef.current.startX;
      const dy = moveEvent.clientY - dragStartRef.current.startY;
      const newX = Math.round(dragStartRef.current.initialOffsetX + dx);
      const newY = Math.round(dragStartRef.current.initialOffsetY + dy);

      currentOffsetRef.current = { x: newX, y: newY };
      applyOffset(newX, newY);
    };

    const handlePointerUp = (upEvent: PointerEvent) => {
      upEvent.stopPropagation();
      setIsDragging(false);
      setOffset(currentOffsetRef.current);
      dragStartRef.current = null;

      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerUp);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: false });
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointercancel', handlePointerUp);
  };

  const handleReset = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    currentOffsetRef.current = { x: 0, y: 0 };
    setOffset({ x: 0, y: 0 });
    applyOffset(0, 0);
  };

  const isMoved = offset.x !== 0 || offset.y !== 0;

  return (
    <div 
      ref={containerRef} 
      className={`draggable-popup-wrapper ${className}`}
      style={{ touchAction: 'none' }}
    >
      {showGripBar && (
        <div
          onPointerDown={handlePointerDown}
          onDoubleClick={handleReset}
          className={`flex items-center justify-between px-2 py-1 -mt-1 mb-2 bg-slate-900/90 hover:bg-cyan-950/70 border border-cyan-800/50 rounded cursor-grab active:cursor-grabbing select-none text-[9px] font-mono tracking-wider transition-colors ${
            hasCloseButton ? 'pr-7' : ''
          } ${isDragging ? 'border-cyan-400 text-cyan-200 shadow-[0_0_8px_rgba(6,182,212,0.4)]' : 'text-cyan-400/90'}`}
          title="Click and drag to move popup anywhere on the map. Double-click to snap back."
          data-testid="popup-drag-handle"
        >
          <div className="flex items-center gap-1.5 overflow-hidden">
            <GripHorizontal className="w-3.5 h-3.5 shrink-0 text-cyan-400" />
            <span className="font-bold truncate">{handleLabel}</span>
            {isMoved && (
              <span className="text-[8px] px-1 py-0.2 rounded bg-amber-950/80 text-amber-300 border border-amber-700/60 font-semibold shrink-0">
                MOVED
              </span>
            )}
          </div>
          {isMoved && (
            <button
              type="button"
              onClick={handleReset}
              className="flex items-center gap-0.5 text-gray-400 hover:text-cyan-300 px-1 py-0.2 rounded hover:bg-white/10 shrink-0 transition-colors"
              title="Snap back to map anchor"
            >
              <RotateCcw className="w-2.5 h-2.5" />
              <span>SNAP</span>
            </button>
          )}
        </div>
      )}
      {children}
    </div>
  );
};

export default DraggablePopupWrapper;
