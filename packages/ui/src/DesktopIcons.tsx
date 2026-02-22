'use client';

import React from 'react';
import { useOSStore } from '@web-os/os-core';

export interface AppDefinition {
  id: string;
  name: string;
  icon: React.ReactNode;
}

interface DesktopIconsProps {
  apps: AppDefinition[];
}

export const DesktopIcons: React.FC<DesktopIconsProps> = ({ apps }) => {
  const { openWindow } = useOSStore();

  return (
    <div className='flex flex-col flex-wrap gap-1 py-4 px-2 h-[calc(100vh-48px)] content-start w-max'>
      {apps.map((app) => (
        <div
          key={app.id}
          className='flex flex-col items-center gap-1.5 w-[76px] pt-2 px-1.5 pb-1 rounded cursor-pointer border border-transparent transition-colors hover:bg-white/10 hover:border-white/15'
          onClick={() => openWindow(app.id, app.name)}
          onDoubleClick={() => openWindow(app.id, app.name)}
        >
          <div className='w-10 h-10 flex items-center justify-center drop-shadow-md'>
            {app.icon}
          </div>
          <span className='text-white text-[11px] font-normal text-center leading-[14px] tracking-[0.01em] w-full overflow-hidden line-clamp-2 font-sans [text-shadow:0_1px_3px_rgba(0,0,0,0.8),0_0_8px_rgba(0,0,0,0.4)]'>
            {app.name}
          </span>
        </div>
      ))}
    </div>
  );
};
