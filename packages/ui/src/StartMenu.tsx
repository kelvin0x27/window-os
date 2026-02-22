'use client';

import React from 'react';
import { useOSStore } from '@web-os/os-core';

export interface AppInfo {
  id: string;
  name: string;
  icon: React.ReactNode;
}

interface StartMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onSearchClick?: () => void;
  apps: AppInfo[];
}

export const StartMenu: React.FC<StartMenuProps> = ({
  isOpen,
  onClose,
  onSearchClick,
  apps,
}) => {
  const { openWindow } = useOSStore();

  const handleAppClick = (app: AppInfo) => {
    openWindow(app.id, app.name);
    onClose();
  };

  return (
    <>
      {/* Backdrop overlay */}
      {isOpen && <div className='absolute inset-0 z-9900' onClick={onClose} />}

      {/* Start Menu Panel */}
      <div
        className={`absolute bottom-14 left-1/2 -translate-x-1/2 w-[640px] z-9998 transition-all duration-250 ease-[cubic-bezier(0.16,1,0.3,1)] origin-bottom ${
          isOpen
            ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 scale-95 translate-y-2 pointer-events-none'
        }`}
      >
        <div className='bg-os-acrylic backdrop-blur-[60px] backdrop-saturate-150 rounded-os-flyout shadow-os-flyout overflow-hidden flex flex-col h-[580px] font-sans border border-os-border'>
          {/* Search bar */}
          <div className='pt-4 pb-2 px-6'>
            <div
              onClick={onSearchClick}
              className='flex items-center gap-2.5 h-9 bg-os-hover border border-os-border rounded-full px-3.5 transition-colors cursor-pointer hover:bg-os-active'
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
              <span className='text-[13px] text-os-text-secondary'>
                Type here to search
              </span>
            </div>
          </div>

          {/* Pinned section */}
          <div className='py-2 px-6'>
            <div className='flex items-center justify-between mb-3'>
              <span className='text-sm font-semibold text-os-text'>Pinned</span>
              <button className='text-xs text-os-text-secondary bg-os-hover rounded-os-elm px-2.5 py-1 hover:bg-os-active transition-colors cursor-pointer border-none'>
                All apps &gt;
              </button>
            </div>
            <div className='grid grid-cols-6 gap-0.5'>
              {apps.map((app) => (
                <button
                  key={app.id}
                  onClick={() => handleAppClick(app)}
                  className='flex flex-col items-center gap-1.5 py-2.5 px-1 rounded-os-elm border-none bg-transparent hover:bg-os-hover transition-colors cursor-pointer'
                >
                  <div className='w-8 h-8 flex items-center justify-center'>
                    {app.icon}
                  </div>
                  <span className='text-[11px] text-os-text leading-[14px] max-w-[72px] truncate'>
                    {app.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className='h-px bg-os-border mx-6 my-1' />

          {/* Recommended section */}
          <div className='flex-1 py-2 px-6 overflow-auto'>
            <div className='flex items-center justify-between mb-2'>
              <span className='text-sm font-semibold text-os-text'>
                Recommended
              </span>
              <button className='text-xs text-os-text-secondary bg-os-hover rounded-os-elm px-2.5 py-1 hover:bg-os-active transition-colors cursor-pointer border-none'>
                More &gt;
              </button>
            </div>
            <div className='grid grid-cols-2 gap-0.5'>
              {[
                {
                  name: 'readme.txt',
                  time: 'Recently added',
                  icon: '📄',
                  app: 'text',
                  title: 'Notepad - /home/user/readme.txt',
                },
                {
                  name: 'Wallpaper_1.jpg',
                  time: 'Yesterday',
                  icon: '🖼️',
                  app: 'photos',
                  title: 'Photos - Wallpaper_1.jpg',
                },
                {
                  name: 'Documents',
                  time: 'Yesterday',
                  icon: '📁',
                  app: 'explorer',
                  title: 'File Explorer',
                },
                {
                  name: 'Project Notes',
                  time: '2 days ago',
                  icon: '📝',
                  app: 'text',
                  title: 'Notepad - Project Notes.txt',
                },
              ].map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    openWindow(item.app, item.title);
                    onClose();
                  }}
                  className='flex items-center gap-3 py-2 px-2.5 rounded-os-elm border-none bg-transparent hover:bg-os-hover transition-colors cursor-pointer text-left'
                >
                  <span className='text-2xl'>{item.icon}</span>
                  <div>
                    <div className='text-xs text-os-text'>{item.name}</div>
                    <div className='text-[11px] text-os-text-secondary'>
                      {item.time}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Bottom bar: User + Power */}
          <div className='flex items-center justify-between py-2 px-6 border-t border-os-border bg-os-active'>
            <button className='flex items-center gap-2.5 border-none bg-transparent hover:bg-os-hover transition-colors cursor-pointer py-1.5 px-2.5 rounded-os-elm'>
              <div className='w-7 h-7 rounded-full bg-orange-500 flex items-center justify-center text-white text-[13px] font-semibold'>
                U
              </div>
              <span className='text-[13px] text-os-text font-medium'>User</span>
            </button>
            <button className='flex items-center justify-center w-8 h-8 border-none bg-transparent hover:bg-os-hover transition-colors cursor-pointer rounded-os-elm'>
              <svg
                width='16'
                height='16'
                viewBox='0 0 16 16'
                fill='none'
                className='text-os-text'
              >
                <circle cx='8' cy='10' r='2' fill='currentColor' />
                <path
                  d='M8 2V5'
                  stroke='currentColor'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                />
                <path
                  d='M8 13V15'
                  stroke='currentColor'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
