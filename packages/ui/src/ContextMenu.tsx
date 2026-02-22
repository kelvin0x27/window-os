'use client';

import React, { useState, useEffect, useCallback } from 'react';

export interface ContextMenuItem {
  label: string;
  icon?: React.ReactNode;
  shortcut?: string;
  onClick?: () => void;
  divider?: boolean;
  disabled?: boolean;
}

interface ContextMenuProps {
  items: ContextMenuItem[];
  x: number;
  y: number;
  onClose: () => void;
}

export const ContextMenu: React.FC<ContextMenuProps> = ({
  items,
  x,
  y,
  onClose,
}) => {
  const [adjustedPos, setAdjustedPos] = useState({ x, y });

  useEffect(() => {
    // Adjust position to stay within viewport
    const menuWidth = 240;
    const menuHeight = items.length * 34;
    const adjustedX = x + menuWidth > window.innerWidth ? x - menuWidth : x;
    const adjustedY =
      y + menuHeight > window.innerHeight - 48 ? y - menuHeight : y;
    setAdjustedPos({ x: Math.max(0, adjustedX), y: Math.max(0, adjustedY) });
  }, [x, y, items.length]);

  useEffect(() => {
    const handler = () => onClose();
    window.addEventListener('click', handler);
    window.addEventListener('contextmenu', handler, { once: true });
    return () => {
      window.removeEventListener('click', handler);
      window.removeEventListener('contextmenu', handler);
    };
  }, [onClose]);

  return (
    <div
      className='fixed z-99999 bg-os-acrylic backdrop-blur-2xl rounded-lg shadow-os-flyout py-1 min-w-[200px] font-sans border border-os-border'
      style={{
        left: adjustedPos.x,
        top: adjustedPos.y,
        animation: 'ctxMenuIn 0.12s ease-out',
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {items.map((item, i) => {
        if (item.divider) {
          return <div key={i} className='h-px bg-os-border my-1 mx-3' />;
        }
        return (
          <button
            key={i}
            onClick={() => {
              item.onClick?.();
              onClose();
            }}
            disabled={item.disabled}
            className={`flex items-center gap-3 w-full px-3 py-1.5 bg-transparent border-none text-left rounded-none transition-colors text-xs ${
              item.disabled
                ? 'text-os-text-secondary opacity-50 cursor-default'
                : 'text-os-text cursor-pointer hover:bg-os-hover'
            }`}
          >
            <div className='w-4 h-4 flex items-center justify-center shrink-0 text-os-text-secondary'>
              {item.icon}
            </div>
            <span className='flex-1'>{item.label}</span>
            {item.shortcut && (
              <span className='text-[11px] text-os-text-secondary opacity-70 ml-4'>
                {item.shortcut}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

/* ---- Default menu items for desktop right-click ---- */
const ctxIcons = {
  viewLarge: (
    <svg width='14' height='14' viewBox='0 0 14 14' fill='none'>
      <rect
        x='1'
        y='1'
        width='5'
        height='5'
        rx='1'
        stroke='currentColor'
        strokeWidth='1.1'
      />
      <rect
        x='8'
        y='1'
        width='5'
        height='5'
        rx='1'
        stroke='currentColor'
        strokeWidth='1.1'
      />
      <rect
        x='1'
        y='8'
        width='5'
        height='5'
        rx='1'
        stroke='currentColor'
        strokeWidth='1.1'
      />
      <rect
        x='8'
        y='8'
        width='5'
        height='5'
        rx='1'
        stroke='currentColor'
        strokeWidth='1.1'
      />
    </svg>
  ),
  sortBy: (
    <svg width='14' height='14' viewBox='0 0 14 14' fill='none'>
      <path
        d='M2 4H12M2 7H9M2 10H6'
        stroke='currentColor'
        strokeWidth='1.1'
        strokeLinecap='round'
      />
    </svg>
  ),
  refresh: (
    <svg width='14' height='14' viewBox='0 0 14 14' fill='none'>
      <path
        d='M2 7C2 4.2 4.2 2 7 2C8.8 2 10.3 3 11 4.5'
        stroke='currentColor'
        strokeWidth='1.1'
        strokeLinecap='round'
      />
      <path
        d='M10 4H12V2'
        stroke='currentColor'
        strokeWidth='1.1'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M12 7C12 9.8 9.8 12 7 12C5.2 12 3.7 11 3 9.5'
        stroke='currentColor'
        strokeWidth='1.1'
        strokeLinecap='round'
      />
      <path
        d='M4 10H2V12'
        stroke='currentColor'
        strokeWidth='1.1'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  ),
  newFolder: (
    <svg width='14' height='14' viewBox='0 0 14 14' fill='none'>
      <path
        d='M2 4V11C2 11.6 2.4 12 3 12H11C11.6 12 12 11.6 12 11V6C12 5.4 11.6 5 11 5H7L5.5 3H3C2.4 3 2 3.4 2 4Z'
        stroke='currentColor'
        strokeWidth='1.1'
        fill='none'
      />
      <path
        d='M7 7.5V10.5M5.5 9H8.5'
        stroke='currentColor'
        strokeWidth='1.1'
        strokeLinecap='round'
      />
    </svg>
  ),
  newFile: (
    <svg width='14' height='14' viewBox='0 0 14 14' fill='none'>
      <path
        d='M4 2H8.5L11 4.5V12H4V2Z'
        stroke='currentColor'
        strokeWidth='1.1'
        fill='none'
      />
      <path
        d='M8.5 2V5H11'
        stroke='currentColor'
        strokeWidth='1.1'
        fill='none'
      />
      <path
        d='M7 8V11M5.5 9.5H8.5'
        stroke='currentColor'
        strokeWidth='1.1'
        strokeLinecap='round'
      />
    </svg>
  ),
  paste: (
    <svg width='14' height='14' viewBox='0 0 14 14' fill='none'>
      <rect
        x='3'
        y='4'
        width='8'
        height='9'
        rx='1'
        stroke='currentColor'
        strokeWidth='1.1'
        fill='none'
      />
      <path
        d='M5 4V3C5 2.4 5.4 2 6 2H8C8.6 2 9 2.4 9 3V4'
        stroke='currentColor'
        strokeWidth='1.1'
        fill='none'
      />
    </svg>
  ),
  terminal: (
    <svg width='14' height='14' viewBox='0 0 14 14' fill='none'>
      <rect
        x='1'
        y='2'
        width='12'
        height='10'
        rx='1.5'
        stroke='currentColor'
        strokeWidth='1.1'
        fill='none'
      />
      <path
        d='M4 6L6 7.5L4 9'
        stroke='currentColor'
        strokeWidth='1.1'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M7 9H10'
        stroke='currentColor'
        strokeWidth='1.1'
        strokeLinecap='round'
      />
    </svg>
  ),
  display: (
    <svg width='14' height='14' viewBox='0 0 14 14' fill='none'>
      <rect
        x='1.5'
        y='2'
        width='11'
        height='8'
        rx='1'
        stroke='currentColor'
        strokeWidth='1.1'
        fill='none'
      />
      <path
        d='M5 12H9'
        stroke='currentColor'
        strokeWidth='1.1'
        strokeLinecap='round'
      />
    </svg>
  ),
  personalize: (
    <svg width='14' height='14' viewBox='0 0 14 14' fill='none'>
      <circle
        cx='7'
        cy='7'
        r='5.5'
        stroke='currentColor'
        strokeWidth='1.1'
        fill='none'
      />
      <circle cx='5' cy='5.5' r='1' fill='currentColor' />
      <circle cx='9' cy='5.5' r='1' fill='currentColor' />
      <circle cx='5' cy='9.5' r='1' fill='currentColor' />
    </svg>
  ),
};

export function getDesktopContextMenuItems(callbacks: {
  onNewFolder: () => void;
  onNewFile: () => void;
  onRefresh: () => void;
  onOpenTerminal: () => void;
  onOpenSettings: () => void;
}): ContextMenuItem[] {
  return [
    { label: 'View', icon: ctxIcons.viewLarge },
    { label: 'Sort by', icon: ctxIcons.sortBy },
    {
      label: 'Refresh',
      icon: ctxIcons.refresh,
      shortcut: 'F5',
      onClick: callbacks.onRefresh,
    },
    { label: '', divider: true },
    {
      label: 'New folder',
      icon: ctxIcons.newFolder,
      onClick: callbacks.onNewFolder,
    },
    {
      label: 'New text document',
      icon: ctxIcons.newFile,
      onClick: callbacks.onNewFile,
    },
    { label: '', divider: true },
    {
      label: 'Paste',
      icon: ctxIcons.paste,
      shortcut: 'Ctrl+V',
      disabled: true,
    },
    { label: '', divider: true },
    {
      label: 'Open in Terminal',
      icon: ctxIcons.terminal,
      onClick: callbacks.onOpenTerminal,
    },
    {
      label: 'Display settings',
      icon: ctxIcons.display,
      onClick: callbacks.onOpenSettings,
    },
    {
      label: 'Personalize',
      icon: ctxIcons.personalize,
      onClick: callbacks.onOpenSettings,
    },
  ];
}
