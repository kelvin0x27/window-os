'use client';

import React, { useCallback } from 'react';
import { Rnd } from 'react-rnd';
import { useOSStore, AppWindow } from '@web-os/os-core';

export interface WindowProps {
  windowState: AppWindow;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export const OsWindow: React.FC<WindowProps> = ({
  windowState,
  children,
  icon,
}) => {
  const {
    focusWindow,
    closeWindow,
    minimizeWindow,
    toggleMaximizeWindow,
    updateWindowPosition,
    updateWindowSize,
    activeWindowId,
  } = useOSStore();

  const isActive = activeWindowId === windowState.id;

  const handleDragStop = useCallback(
    (_e: unknown, d: { x: number; y: number }) => {
      if (!windowState.isMaximized) {
        updateWindowPosition(windowState.id, d.x, d.y);
      }
    },
    [windowState.id, windowState.isMaximized, updateWindowPosition],
  );

  const handleResizeStop = useCallback(
    (
      _e: unknown,
      _dir: unknown,
      ref: HTMLElement,
      _delta: unknown,
      position: { x: number; y: number },
    ) => {
      if (!windowState.isMaximized) {
        updateWindowSize(
          windowState.id,
          parseInt(ref.style.width, 10),
          parseInt(ref.style.height, 10),
          position.x,
          position.y,
        );
      }
    },
    [windowState.id, windowState.isMaximized, updateWindowSize],
  );

  return (
    <>
      {/* @ts-ignore */}

      <Rnd
        size={{
          width: windowState.isMaximized ? '100vw' : windowState.width,
          height: windowState.isMaximized
            ? 'calc(100vh - 48px)'
            : windowState.height,
        }}
        position={{
          x: windowState.isMaximized ? 0 : windowState.x,
          y: windowState.isMaximized ? 0 : windowState.y,
        }}
        onDragStart={() => focusWindow(windowState.id)}
        onDragStop={handleDragStop}
        onResizeStart={() => focusWindow(windowState.id)}
        onResizeStop={handleResizeStop}
        disableDragging={windowState.isMaximized || windowState.isMinimized}
        enableResizing={!windowState.isMaximized && !windowState.isMinimized}
        minWidth={400}
        minHeight={280}
        bounds={windowState.isMaximized ? undefined : 'parent'}
        dragHandleClassName='os-window-header'
        style={{
          zIndex: windowState.zIndex,
          display: windowState.isMinimized ? 'none' : undefined,
        }}
        onMouseDown={() => {
          if (!isActive) focusWindow(windowState.id);
        }}
        className={`absolute will-change-[box-shadow,transform] transition-shadow duration-200 ease-out ${
          windowState.isMaximized ? 'os-window-maximized' : 'rounded-os-window'
        } ${
          isActive
            ? 'shadow-os-window-active z-50'
            : 'shadow-os-window-inactive z-0'
        } win11-window-open ring-1 ring-white/10 bg-[#191919]`}
      >
        {/* Window Title Bar — Dark Mica */}
        <div
          className={`os-window-header absolute top-0 left-0 right-0 flex items-center justify-between h-8 border-b border-os-border cursor-grab select-none transition-colors duration-200 z-10 ${
            isActive ? 'bg-[#2b2b2b]' : 'bg-[#1c1c1c]'
          } ${windowState.isMaximized ? 'rounded-none' : 'rounded-t-os-window'}`}
          onDoubleClick={() => toggleMaximizeWindow(windowState.id)}
        >
          {/* App Icon + Title */}
          <div className='flex items-center gap-2 pl-3 overflow-hidden min-w-0'>
            {icon && (
              <div className='w-4 h-4 flex items-center justify-center shrink-0'>
                {icon}
              </div>
            )}
            <span
              className={`text-xs whitespace-nowrap overflow-hidden text-ellipsis font-sans ${
                isActive ? 'text-os-text' : 'text-os-text-secondary'
              }`}
            >
              {windowState.title}
            </span>
          </div>

          {/* Window Controls */}
          <div className='flex items-center h-full shrink-0'>
            {/* Minimize */}
            <WindowControlButton
              onMouseDown={(e) => {
                e.stopPropagation();
                e.preventDefault();
                minimizeWindow(windowState.id);
              }}
              title='Minimize'
            >
              <svg width='10' height='1' viewBox='0 0 10 1'>
                <rect
                  width='10'
                  height='1'
                  fill={isActive ? 'currentColor' : '#888'}
                />
              </svg>
            </WindowControlButton>

            {/* Maximize/Restore */}
            <WindowControlButton
              onMouseDown={(e) => {
                e.stopPropagation();
                e.preventDefault();
                toggleMaximizeWindow(windowState.id);
              }}
              title={windowState.isMaximized ? 'Restore Down' : 'Maximize'}
            >
              {windowState.isMaximized ? (
                <svg width='10' height='10' viewBox='0 0 10 10' fill='none'>
                  <path
                    d='M2.5 0.5H8.5C9.05 0.5 9.5 0.95 9.5 1.5V7.5H7.5V2.5H2.5V0.5Z'
                    fill={isActive ? 'currentColor' : '#888'}
                  />
                  <rect
                    x='0.5'
                    y='2.5'
                    width='7'
                    height='7'
                    rx='0.5'
                    stroke={isActive ? 'currentColor' : '#888'}
                    strokeWidth='1'
                    fill='none'
                  />
                </svg>
              ) : (
                <svg width='10' height='10' viewBox='0 0 10 10' fill='none'>
                  <rect
                    x='0.5'
                    y='0.5'
                    width='9'
                    height='9'
                    rx='0.5'
                    stroke={isActive ? 'currentColor' : '#888'}
                    strokeWidth='1'
                  />
                </svg>
              )}
            </WindowControlButton>

            {/* Close */}
            <button
              onMouseDown={(e) => {
                e.stopPropagation();
                e.preventDefault();
                closeWindow(windowState.id);
              }}
              className={`h-full w-[46px] flex items-center justify-center border-none bg-transparent cursor-pointer transition-colors hover:bg-red-600 hover:text-white ${
                windowState.isMaximized
                  ? 'rounded-tr-none'
                  : 'rounded-tr-os-window'
              } text-os-text`}
              title='Close'
            >
              <svg width='10' height='10' viewBox='0 0 10 10' fill='none'>
                <path
                  d='M1 1L9 9M9 1L1 9'
                  stroke='currentColor'
                  strokeWidth='1.2'
                  strokeLinecap='round'
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Window Content */}
        <div
          className={`absolute top-8 bottom-0 left-0 right-0 overflow-hidden bg-[#191919] ${
            !windowState.isMaximized ? 'rounded-b-os-window' : ''
          }`}
        >
          {children}
        </div>
      </Rnd>
    </>
  );
};

const WindowControlButton = ({
  children,
  onMouseDown,
  title,
}: {
  children: React.ReactNode;
  onMouseDown: (e: React.MouseEvent) => void;
  title: string;
}) => (
  <button
    onMouseDown={onMouseDown}
    title={title}
    className='h-full w-[46px] flex items-center justify-center border-none bg-transparent cursor-pointer transition-colors hover:bg-os-hover text-os-text'
  >
    {children}
  </button>
);
