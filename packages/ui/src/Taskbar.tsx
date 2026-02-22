'use client';

import React, { useState, useEffect } from 'react';
import { useOSStore, AppWindow } from '@web-os/os-core';

interface TaskbarProps {
  onStartClick: () => void;
  onCalendarClick?: () => void;
  onQuickSettingsClick?: () => void;
  onSearchClick?: () => void;
  apps: {
    id: string;
    title: string;
    icon: React.ReactNode;
    pinned?: boolean;
  }[];
}

function useCurrentTime() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  return now;
}

export const Taskbar: React.FC<TaskbarProps> = ({
  onStartClick,
  onCalendarClick,
  onQuickSettingsClick,
  onSearchClick,
  apps,
}) => {
  const { windows, openWindow, minimizeWindow, focusWindow, activeWindowId } =
    useOSStore();
  const now = useCurrentTime();

  const timeStr = now.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
  const dateStr = now.toLocaleDateString('en-US', {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
  });

  const openWindows = windows.filter((w: AppWindow) => !w.isMinimized);

  // Show pinned apps always + unpinned apps only if they have a running window
  const visibleApps = apps.filter((app) => {
    if (app.pinned) return true;
    return windows.some((w: AppWindow) => w.appId === app.id);
  });

  return (
    <div className='fixed bottom-0 left-0 right-0 h-[var(--taskbar-height)] bg-os-acrylic backdrop-blur-[60px] backdrop-saturate-150 border-t border-os-border flex items-center z-[9999] select-none text-os-text font-sans'>
      {/* Left: Weather widget */}
      <div className='shrink-0 flex items-center h-full pl-3'>
        <TaskbarButton>
          <span className='text-sm'>🌤️</span>
          <span className='text-xs text-os-text-secondary ml-1'>28°C</span>
        </TaskbarButton>
      </div>

      {/* Center: Start + Search + Apps (absolutely centered) */}
      <div className='flex-1 flex items-center justify-center h-full gap-0'>
        {/* Start Button */}
        <TaskbarButton onClick={onStartClick}>
          <svg width='18' height='18' viewBox='0 0 88 88' fill='none'>
            <rect x='2' y='2' width='40' height='40' rx='2' fill='#0078D4' />
            <rect x='46' y='2' width='40' height='40' rx='2' fill='#0078D4' />
            <rect x='2' y='46' width='40' height='40' rx='2' fill='#0078D4' />
            <rect x='46' y='46' width='40' height='40' rx='2' fill='#0078D4' />
          </svg>
        </TaskbarButton>

        {/* Search Bar */}
        <div
          onClick={onSearchClick}
          className='flex items-center gap-2 h-[30px] bg-os-hover border border-os-border rounded-full px-3 mx-1 cursor-pointer min-w-[150px] transition-colors hover:bg-os-active'
        >
          <svg width='14' height='14' viewBox='0 0 16 16' fill='none'>
            <circle
              cx='6.5'
              cy='6.5'
              r='5.5'
              stroke='currentColor'
              strokeWidth='1.3'
              className='text-os-text-secondary'
            />
            <path
              d='M11 11L14.5 14.5'
              stroke='currentColor'
              strokeWidth='1.3'
              strokeLinecap='round'
              className='text-os-text-secondary'
            />
          </svg>
          <span className='text-xs text-os-text-secondary'>Search</span>
        </div>

        {/* Separator */}
        <div className='w-[1px] h-5 bg-os-border mx-1' />

        {/* Pinned & Open App Icons */}
        {visibleApps.map((app) => {
          const appWindow = windows.find((w: AppWindow) => w.appId === app.id);
          const isOpen = !!appWindow;
          const isActiveApp = appWindow?.id === activeWindowId;

          return (
            <div key={app.id} className='relative group flex'>
              <TaskbarButton
                onClick={() => {
                  if (appWindow) {
                    if (appWindow.isMinimized || !isActiveApp) {
                      focusWindow(appWindow.id);
                    } else {
                      minimizeWindow(appWindow.id);
                    }
                  } else {
                    openWindow(app.id, app.title);
                  }
                }}
                active={isActiveApp}
                hasIndicator={isOpen}
              >
                <div className='w-5 h-5 flex items-center justify-center transition-transform active:scale-75'>
                  {app.icon}
                </div>
              </TaskbarButton>

              {/* Window Preview Popup */}
              {isOpen && (
                <div className='absolute bottom-[calc(100%+8px)] left-1/2 -translate-x-1/2 w-56 bg-[#202020]/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-os-flyout opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[10000] flex flex-col pointer-events-none scale-95 group-hover:scale-100 origin-bottom overflow-hidden'>
                  <div className='flex items-center gap-2 px-3 py-2 border-b border-white/5'>
                    <div className='w-4 h-4 shrink-0'>{app.icon}</div>
                    <span className='text-[11px] font-medium text-white truncate flex-1'>
                      {appWindow.title}
                    </span>
                    <button
                      className='w-6 h-6 rounded flex items-center justify-center hover:bg-white/10 text-white/70 hover:text-white transition-colors pointer-events-auto cursor-pointer shrink-0'
                      onClick={(e) => {
                        e.stopPropagation();
                        useOSStore.getState().closeWindow(appWindow.id);
                      }}
                    >
                      <svg
                        width='10'
                        height='10'
                        viewBox='0 0 10 10'
                        fill='none'
                      >
                        <path
                          d='M1 1L9 9M9 1L1 9'
                          stroke='currentColor'
                          strokeWidth='1.5'
                          strokeLinecap='round'
                        />
                      </svg>
                    </button>
                  </div>
                  <div className='p-3'>
                    <div
                      className='w-full aspect-[16/10] bg-[#191919] rounded border border-white/10 flex items-center justify-center overflow-hidden relative shadow-inner pointer-events-auto cursor-pointer hover:border-white/20 transition-colors'
                      onClick={() => {
                        focusWindow(appWindow.id);
                        if (appWindow.isMinimized) minimizeWindow(appWindow.id);
                      }}
                    >
                      <div className='absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent' />
                      <div className='scale-[3] opacity-30 drop-shadow-2xl'>
                        {app.icon}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Right: System Tray */}
      <div className='shrink-0 flex items-center gap-0 pr-2 h-full'>
        {/* Hidden icons arrow */}
        <TaskbarButton>
          <svg
            width='10'
            height='10'
            viewBox='0 0 10 10'
            fill='none'
            className='text-os-text-secondary'
          >
            <path
              d='M2 6L5 3L8 6'
              stroke='currentColor'
              strokeWidth='1.2'
              strokeLinecap='round'
            />
          </svg>
        </TaskbarButton>

        {/* Language */}
        <TaskbarButton>
          <span className='text-[11px] text-os-text-secondary font-medium'>
            ENG
          </span>
        </TaskbarButton>

        {/* Network/Sound/Battery group */}
        <TaskbarButton onClick={onQuickSettingsClick}>
          <div className='flex items-center gap-1.5'>
            <svg
              width='14'
              height='14'
              viewBox='0 0 16 16'
              fill='none'
              className='text-os-text-secondary'
            >
              <path
                d='M8 3C5.5 3 3.3 4.1 1.8 5.8L3.2 7.2C4.3 5.9 5.9 5 8 5C10.1 5 11.7 5.9 12.8 7.2L14.2 5.8C12.7 4.1 10.5 3 8 3Z'
                fill='currentColor'
              />
              <path
                d='M8 7C6.5 7 5.2 7.7 4.3 8.7L5.7 10.1C6.3 9.4 7.1 9 8 9C8.9 9 9.7 9.4 10.3 10.1L11.7 8.7C10.8 7.7 9.5 7 8 7Z'
                fill='currentColor'
              />
              <circle cx='8' cy='12' r='1.5' fill='currentColor' />
            </svg>
            <svg
              width='14'
              height='14'
              viewBox='0 0 16 16'
              fill='none'
              className='text-os-text-secondary'
            >
              <path d='M2 6V10H5L9 13V3L5 6H2Z' fill='currentColor' />
              <path
                d='M11 5.5C12 6.5 12.5 7.7 12.5 9C12.5 10.3 12 11.5 11 12.5'
                stroke='currentColor'
                strokeWidth='1.2'
                strokeLinecap='round'
              />
            </svg>
            <svg
              width='14'
              height='14'
              viewBox='0 0 16 16'
              fill='none'
              className='text-os-text-secondary'
            >
              <rect
                x='1'
                y='5'
                width='12'
                height='7'
                rx='1'
                stroke='currentColor'
                strokeWidth='1.2'
              />
              <rect
                x='13'
                y='7'
                width='2'
                height='3'
                rx='0.5'
                fill='currentColor'
              />
              <rect x='3' y='7' width='6' height='3' rx='0.5' fill='#4CAF50' />
            </svg>
          </div>
        </TaskbarButton>

        {/* Clock */}
        <TaskbarButton onClick={onCalendarClick}>
          <div
            className='flex flex-col items-end leading-[15px]'
            suppressHydrationWarning
          >
            <span className='text-[11px] text-os-text' suppressHydrationWarning>
              {timeStr}
            </span>
            <span className='text-[11px] text-os-text' suppressHydrationWarning>
              {dateStr}
            </span>
          </div>
        </TaskbarButton>

        {/* Notification bell */}
        <TaskbarButton>
          <svg
            width='14'
            height='14'
            viewBox='0 0 16 16'
            fill='none'
            className='text-os-text-secondary'
          >
            <path
              d='M8 2C5.8 2 4 3.8 4 6V9L3 11H13L12 9V6C12 3.8 10.2 2 8 2Z'
              fill='currentColor'
            />
            <rect
              x='6.5'
              y='12'
              width='3'
              height='1.5'
              rx='0.75'
              fill='currentColor'
            />
          </svg>
        </TaskbarButton>
      </div>
    </div>
  );
};

/* Taskbar icon button wrapper */
const TaskbarButton = ({
  children,
  onClick,
  active,
  hasIndicator,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  active?: boolean;
  hasIndicator?: boolean;
}) => (
  <button
    onClick={onClick}
    className={`flex items-center justify-center h-10 min-w-10 px-1 border-none rounded-os-elm relative cursor-pointer transition-colors ${
      active
        ? 'bg-os-active hover:bg-os-hover'
        : 'bg-transparent hover:bg-os-hover'
    }`}
  >
    {children}
    {hasIndicator && (
      <div
        className={`absolute bottom-[2px] left-1/2 -translate-x-1/2 h-[3px] rounded-full transition-all duration-150 ${
          active ? 'w-4 bg-os-accent' : 'w-1.5 bg-os-text-secondary opacity-70'
        }`}
      />
    )}
  </button>
);
