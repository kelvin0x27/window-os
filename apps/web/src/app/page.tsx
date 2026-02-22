'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { useOSStore, useFSStore, AppWindow } from '@web-os/os-core';
import {
  OsWindow,
  Taskbar,
  BootScreen,
  StartMenu,
  DesktopIcons,
  FloatToolbar,
  CalendarFlyout,
  QuickSettings,
  ContextMenu,
  getDesktopContextMenuItems,
} from '@web-os/ui';
import type { AppDefinition, ContextMenuItem, WindowProps } from '@web-os/ui';
import {
  TerminalApp,
  TextEditor,
  CodeEditorApp,
  FileManagerApp,
  PaintApp,
  VideoEditorApp,
  GameApp,
  SettingsApp,
  ImageViewerApp,
  EdgeBrowserApp,
  CalculatorApp,
  StoreApp,
  MailApp,
  CalendarApp,
} from '@web-os/built-in-apps';

/* ====== Windows 11 Fluent SVG Icons ====== */

const TerminalIcon = ({ size = 40 }: { size?: number }) => (
  <svg width={size} height={size} viewBox='0 0 48 48' fill='none'>
    <rect width='48' height='48' rx='6' fill='#1e1e1e' />
    <path
      d='M14 16l8 7-8 7'
      stroke='#ccc'
      strokeWidth='2.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <line
      x1='24'
      y1='32'
      x2='34'
      y2='32'
      stroke='#ccc'
      strokeWidth='2.5'
      strokeLinecap='round'
    />
  </svg>
);

const CodeIcon = ({ size = 40 }: { size?: number }) => (
  <svg width={size} height={size} viewBox='0 0 48 48' fill='none'>
    <rect width='48' height='48' rx='6' fill='#2d7fd3' />
    <path
      d='M18 16l-7 8 7 8'
      stroke='white'
      strokeWidth='2.2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M30 16l7 8-7 8'
      stroke='white'
      strokeWidth='2.2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <line
      x1='26'
      y1='13'
      x2='22'
      y2='35'
      stroke='white'
      strokeWidth='1.8'
      strokeLinecap='round'
      opacity='0.7'
    />
  </svg>
);

const TextIcon = ({ size = 40 }: { size?: number }) => (
  <svg width={size} height={size} viewBox='0 0 48 48' fill='none'>
    <rect width='48' height='48' rx='6' fill='#0078d4' />
    <rect
      x='12'
      y='10'
      width='24'
      height='28'
      rx='2'
      fill='white'
      fillOpacity='0.9'
    />
    <line
      x1='16'
      y1='17'
      x2='32'
      y2='17'
      stroke='#0078d4'
      strokeWidth='1.5'
      strokeLinecap='round'
    />
    <line
      x1='16'
      y1='21'
      x2='28'
      y2='21'
      stroke='#0078d4'
      strokeWidth='1.5'
      strokeLinecap='round'
      opacity='0.6'
    />
    <line
      x1='16'
      y1='25'
      x2='30'
      y2='25'
      stroke='#0078d4'
      strokeWidth='1.5'
      strokeLinecap='round'
      opacity='0.4'
    />
    <line
      x1='16'
      y1='29'
      x2='24'
      y2='29'
      stroke='#0078d4'
      strokeWidth='1.5'
      strokeLinecap='round'
      opacity='0.3'
    />
  </svg>
);

const FolderIcon = ({ size = 40 }: { size?: number }) => (
  <svg width={size} height={size} viewBox='0 0 48 48' fill='none'>
    <path
      d='M6 14C6 12.9 6.9 12 8 12H18L22 16H40C41.1 16 42 16.9 42 18V36C42 37.1 41.1 38 40 38H8C6.9 38 6 37.1 6 36V14Z'
      fill='#FFB900'
    />
    <path
      d='M6 18H42V36C42 37.1 41.1 38 40 38H8C6.9 38 6 37.1 6 36V18Z'
      fill='#FFC83D'
    />
  </svg>
);

const PaintIcon = ({ size = 40 }: { size?: number }) => (
  <svg width={size} height={size} viewBox='0 0 48 48' fill='none'>
    <rect width='48' height='48' rx='6' fill='white' />
    <circle cx='17' cy='17' r='4' fill='#FF6B6B' />
    <circle cx='31' cy='17' r='4' fill='#4ECB71' />
    <circle cx='24' cy='28' r='4' fill='#339AF0' />
    <circle cx='15' cy='28' r='3' fill='#FFD43B' />
    <circle cx='33' cy='28' r='3' fill='#CC5DE8' />
  </svg>
);

const VideoIcon = ({ size = 40 }: { size?: number }) => (
  <svg width={size} height={size} viewBox='0 0 48 48' fill='none'>
    <rect width='48' height='48' rx='6' fill='#7C3AED' />
    <rect
      x='8'
      y='14'
      width='22'
      height='20'
      rx='2'
      fill='white'
      fillOpacity='0.9'
    />
    <polygon points='34,18 42,14 42,34 34,30' fill='white' fillOpacity='0.7' />
  </svg>
);

const GameIcon = ({ size = 40 }: { size?: number }) => (
  <svg width={size} height={size} viewBox='0 0 48 48' fill='none'>
    <rect width='48' height='48' rx='6' fill='#059669' />
    <rect
      x='10'
      y='10'
      width='8'
      height='8'
      rx='1'
      fill='white'
      fillOpacity='0.9'
    />
    <rect
      x='20'
      y='10'
      width='8'
      height='8'
      rx='1'
      fill='white'
      fillOpacity='0.9'
    />
    <rect
      x='30'
      y='10'
      width='8'
      height='8'
      rx='1'
      fill='white'
      fillOpacity='0.9'
    />
    <rect
      x='10'
      y='20'
      width='8'
      height='8'
      rx='1'
      fill='white'
      fillOpacity='0.9'
    />
    <rect x='20' y='20' width='8' height='8' rx='1' fill='#ef4444' />
    <rect
      x='30'
      y='20'
      width='8'
      height='8'
      rx='1'
      fill='white'
      fillOpacity='0.9'
    />
    <rect
      x='10'
      y='30'
      width='8'
      height='8'
      rx='1'
      fill='white'
      fillOpacity='0.9'
    />
    <rect
      x='20'
      y='30'
      width='8'
      height='8'
      rx='1'
      fill='white'
      fillOpacity='0.9'
    />
    <rect
      x='30'
      y='30'
      width='8'
      height='8'
      rx='1'
      fill='white'
      fillOpacity='0.7'
    />
  </svg>
);

const SettingsIcon = ({ size = 40 }: { size?: number }) => (
  <svg width={size} height={size} viewBox='0 0 48 48' fill='none'>
    <rect width='48' height='48' rx='6' fill='#4B5563' />
    <circle cx='24' cy='24' r='8' stroke='white' strokeWidth='2' fill='none' />
    <circle cx='24' cy='24' r='3' fill='white' />
    <line
      x1='24'
      y1='8'
      x2='24'
      y2='14'
      stroke='white'
      strokeWidth='2'
      strokeLinecap='round'
    />
    <line
      x1='24'
      y1='34'
      x2='24'
      y2='40'
      stroke='white'
      strokeWidth='2'
      strokeLinecap='round'
    />
    <line
      x1='8'
      y1='24'
      x2='14'
      y2='24'
      stroke='white'
      strokeWidth='2'
      strokeLinecap='round'
    />
    <line
      x1='34'
      y1='24'
      x2='40'
      y2='24'
      stroke='white'
      strokeWidth='2'
      strokeLinecap='round'
    />
  </svg>
);

const EdgeIcon = ({ size = 40 }: { size?: number }) => (
  <svg width={size} height={size} viewBox='0 0 48 48' fill='none'>
    <rect width='48' height='48' rx='6' fill='#0078D4' />
    <circle cx='24' cy='24' r='14' stroke='white' strokeWidth='3' fill='none' />
    <path
      d='M16 28C18 32 22 34 26 34C30 34 34 30 34 24'
      stroke='white'
      strokeWidth='2.5'
      strokeLinecap='round'
      fill='none'
    />
    <circle cx='24' cy='24' r='4' fill='white' />
  </svg>
);

const CalculatorIcon = ({ size = 40 }: { size?: number }) => (
  <svg width={size} height={size} viewBox='0 0 48 48' fill='none'>
    <rect width='48' height='48' rx='6' fill='#1a1a2e' />
    <rect
      x='10'
      y='8'
      width='28'
      height='32'
      rx='3'
      fill='#2d2d44'
      stroke='#444'
      strokeWidth='1'
    />
    <rect x='13' y='11' width='22' height='8' rx='1.5' fill='#3a3a5c' />
    <text
      x='32'
      y='17'
      fontSize='8'
      fill='#fff'
      textAnchor='end'
      fontFamily='Segoe UI'
    >
      123
    </text>
    <rect x='13' y='22' width='5' height='4' rx='1' fill='#444' />
    <rect x='21' y='22' width='5' height='4' rx='1' fill='#444' />
    <rect x='29' y='22' width='5' height='4' rx='1' fill='#444' />
    <rect x='13' y='28' width='5' height='4' rx='1' fill='#444' />
    <rect x='21' y='28' width='5' height='4' rx='1' fill='#444' />
    <rect x='29' y='28' width='5' height='4' rx='1' fill='#444' />
    <rect x='13' y='34' width='5' height='4' rx='1' fill='#444' />
    <rect x='21' y='34' width='5' height='4' rx='1' fill='#0078d4' />
    <rect x='29' y='34' width='5' height='4' rx='1' fill='#444' />
  </svg>
);

const StoreIcon = ({ size = 40 }: { size?: number }) => (
  <svg width={size} height={size} viewBox='0 0 48 48' fill='none'>
    <rect width='48' height='48' rx='6' fill='#0078D4' />
    <rect
      x='10'
      y='20'
      width='28'
      height='20'
      rx='2'
      fill='white'
      fillOpacity='0.2'
    />
    <path d='M10 16L14 8H34L38 16Z' fill='white' fillOpacity='0.3' />
    <path d='M10 16H38' stroke='white' strokeWidth='2' />
  </svg>
);

const MailIcon = ({ size = 40 }: { size?: number }) => (
  <svg width={size} height={size} viewBox='0 0 48 48' fill='none'>
    <rect width='48' height='48' rx='6' fill='#0078D4' />
    <rect
      x='8'
      y='14'
      width='32'
      height='20'
      rx='2'
      fill='white'
      fillOpacity='0.2'
    />
    <path d='M8 14L24 26L40 14' stroke='white' strokeWidth='2' fill='none' />
  </svg>
);

const CalendarIcon = ({ size = 40 }: { size?: number }) => (
  <svg width={size} height={size} viewBox='0 0 48 48' fill='none'>
    <rect width='48' height='48' rx='6' fill='#0078D4' />
    <rect
      x='10'
      y='12'
      width='28'
      height='26'
      rx='2'
      fill='white'
      fillOpacity='0.9'
    />
    <rect x='10' y='12' width='28' height='8' rx='2' fill='#C42B1C' />
    <text
      x='24'
      y='34'
      fontSize='14'
      fill='#333'
      textAnchor='middle'
      fontWeight='bold'
      fontFamily='Segoe UI'
    >
      22
    </text>
  </svg>
);

const PhotosIcon = ({ size = 40 }: { size?: number }) => (
  <svg width={size} height={size} viewBox='0 0 48 48' fill='none'>
    <rect width='48' height='48' rx='6' fill='#1B9CFC' />
    <rect
      x='8'
      y='12'
      width='32'
      height='24'
      rx='2'
      fill='white'
      fillOpacity='0.2'
    />
    <circle cx='18' cy='20' r='4' fill='white' fillOpacity='0.6' />
    <path
      d='M8 32L18 24L28 30L34 26L40 30V36H8V32Z'
      fill='white'
      fillOpacity='0.5'
    />
  </svg>
);

/* ====== App Registry ====== */

interface AppDef {
  id: string;
  name: string;
  icon: React.ReactNode;
  desktopIcon?: boolean;
}

const OS_APPS: AppDef[] = [
  {
    id: 'terminal',
    name: 'Terminal',
    icon: <TerminalIcon />,
    desktopIcon: true,
  },
  { id: 'code', name: 'Code Editor', icon: <CodeIcon />, desktopIcon: true },
  { id: 'text', name: 'Notepad', icon: <TextIcon />, desktopIcon: true },
  {
    id: 'files',
    name: 'File Explorer',
    icon: <FolderIcon />,
    desktopIcon: true,
  },
  { id: 'paint', name: 'Paint', icon: <PaintIcon />, desktopIcon: true },
  { id: 'video', name: 'Clipchamp', icon: <VideoIcon />, desktopIcon: true },
  { id: 'game', name: 'Minesweeper', icon: <GameIcon />, desktopIcon: true },
  {
    id: 'settings',
    name: 'Settings',
    icon: <SettingsIcon />,
    desktopIcon: true,
  },
  { id: 'photos', name: 'Photos', icon: <PhotosIcon />, desktopIcon: false },
  { id: 'edge', name: 'Microsoft Edge', icon: <EdgeIcon /> },
  { id: 'calc', name: 'Calculator', icon: <CalculatorIcon /> },
  { id: 'store', name: 'Microsoft Store', icon: <StoreIcon /> },
  { id: 'mail', name: 'Mail', icon: <MailIcon /> },
  { id: 'calendar', name: 'Calendar', icon: <CalendarIcon /> },
];

/* Icon map for window title bars (small 16px) */
const APP_ICON_MAP: Record<string, WindowProps['icon']> = Object.fromEntries(
  OS_APPS.map((a) => {
    const IconComponent = {
      terminal: TerminalIcon,
      code: CodeIcon,
      text: TextIcon,
      files: FolderIcon,
      paint: PaintIcon,
      video: VideoIcon,
      game: GameIcon,
      settings: SettingsIcon,
      photos: PhotosIcon,
      edge: EdgeIcon,
      calc: CalculatorIcon,
      store: StoreIcon,
      mail: MailIcon,
      calendar: CalendarIcon,
    }[a.id];
    return [a.id, IconComponent ? <IconComponent size={16} /> : null];
  }).filter(([, v]) => v),
);

/* Taskbar icons (20px) - pinned apps shown always, others only when running */
const PINNED_APP_IDS = [
  'terminal',
  'code',
  'text',
  'files',
  'paint',
  'video',
  'game',
  'settings',
];

const TASKBAR_APPS = OS_APPS.map((a) => {
  const IconComponent = {
    terminal: TerminalIcon,
    code: CodeIcon,
    text: TextIcon,
    files: FolderIcon,
    paint: PaintIcon,
    video: VideoIcon,
    game: GameIcon,
    settings: SettingsIcon,
    edge: EdgeIcon,
    calc: CalculatorIcon,
    store: StoreIcon,
    mail: MailIcon,
    calendar: CalendarIcon,
    photos: PhotosIcon,
  }[a.id];
  return {
    id: a.id,
    title: a.name,
    icon: IconComponent ? <IconComponent size={20} /> : null,
    pinned: PINNED_APP_IDS.includes(a.id),
  };
});

/* Start Menu apps (32px, default) */
const START_MENU_APPS = OS_APPS.map((a) => ({
  id: a.id,
  name: a.name,
  icon: a.icon,
})) as AppDefinition[];

/* Desktop apps */
const DESKTOP_APPS = OS_APPS.filter((a) => a.desktopIcon) as AppDefinition[];

/* ====== Image store for dropped files ====== */
const droppedImages: Record<string, string> = {};

function renderApp(
  appId: string,
  windowId: string,
  windows: AppWindow[],
): React.ReactNode {
  const win = windows.find((w: AppWindow) => w.id === windowId);
  switch (appId) {
    case 'terminal':
      return <TerminalApp windowId={windowId} />;
    case 'text':
      return <TextEditor windowId={windowId} />;
    case 'code':
      return <CodeEditorApp windowId={windowId} />;
    case 'files':
      return <FileManagerApp windowId={windowId} />;
    case 'paint':
      return <PaintApp />;
    case 'video':
      return <VideoEditorApp />;
    case 'game':
      return <GameApp />;
    case 'settings':
      return <SettingsApp />;
    case 'photos': {
      const filePath = win?.title?.split(' - ')[1] || '';
      return (
        <ImageViewerApp
          windowId={windowId}
          imageSrc={droppedImages[filePath]}
          fileName={filePath.split('/').pop()}
        />
      );
    }
    case 'edge':
      return <EdgeBrowserApp />;
    case 'calc':
      return <CalculatorApp />;
    case 'store':
      return <StoreApp />;
    case 'mail':
      return <MailApp />;
    case 'calendar':
      return <CalendarApp />;
    default:
      return (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            color: '#888',
            fontSize: 14,
            background: '#1e1e1e',
          }}
        >
          {appId} — Coming Soon
        </div>
      );
  }
}

/* ====== SearchOverlay ====== */
const SearchOverlay = ({
  isOpen,
  onClose,
  onOpenApp,
}: {
  isOpen: boolean;
  onClose: () => void;
  onOpenApp: (appId: string) => void;
}) => {
  const [query, setQuery] = useState('');
  const results = query.trim()
    ? OS_APPS.filter((a) => a.name.toLowerCase().includes(query.toLowerCase()))
    : OS_APPS.slice(0, 6);

  if (!isOpen) return null;
  return (
    <>
      <div className='fixed inset-0 z-9950' onClick={onClose} />
      <div
        className='fixed bottom-14 left-1/2 -translate-x-1/2 w-[580px] z-9998 bg-os-acrylic backdrop-blur-[60px] rounded-os-flyout shadow-os-flyout font-sans overflow-hidden border border-os-border'
        style={{ animation: 'searchMenuIn 0.15s ease-out' }}
      >
        <div className='p-4'>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            placeholder='Type here to search'
            className='w-full px-4 py-2.5 rounded-md border border-os-border bg-os-hover text-os-text text-sm outline-none placeholder:text-os-text-secondary'
          />
        </div>
        <div className='px-4 pb-4 max-h-[300px] overflow-y-auto'>
          <div className='text-xs text-os-text-secondary mb-2'>
            {query ? 'Results' : 'Recent apps'}
          </div>
          {results.map((app) => (
            <button
              key={app.id}
              onClick={() => {
                onOpenApp(app.id);
                onClose();
                setQuery('');
              }}
              className='flex items-center gap-3 px-3 py-2 bg-transparent border-none text-os-text cursor-pointer rounded-md w-full text-left text-[13px] transition-colors hover:bg-os-hover'
            >
              <div className='w-8 h-8 flex items-center justify-center'>
                {app.icon}
              </div>
              <div>
                <div className='font-medium'>{app.name}</div>
                <div className='text-[11px] text-os-text-secondary'>App</div>
              </div>
            </button>
          ))}
          {results.length === 0 && (
            <div className='text-os-text-secondary opacity-70 text-[13px] p-3'>
              No results found
            </div>
          )}
        </div>
      </div>
    </>
  );
};

/* ====== Desktop Component ====== */
export default function Desktop() {
  const { bootPhase, windows, openWindow, theme, osVersion, focusWindow } =
    useOSStore();
  const { makeDir, writeFile } = useFSStore();
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [quickSettingsOpen, setQuickSettingsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [ctxMenu, setCtxMenu] = useState<{
    x: number;
    y: number;
    items: ContextMenuItem[];
  } | null>(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-os-theme', osVersion);
    document.documentElement.setAttribute('data-theme', theme);
  }, [osVersion, theme]);

  const closeAllFlyouts = useCallback(() => {
    setStartMenuOpen(false);
    setCalendarOpen(false);
    setQuickSettingsOpen(false);
    setSearchOpen(false);
  }, []);

  // Global contextmenu listener — intercept all right-clicks, show desktop menu unless inside a window
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Skip if right-click is inside an open window (react-rnd container)
      if (target.closest('.win11-window-open')) return;
      // Skip if inside a context menu, flyout, start menu, or taskbar
      if (target.closest('[class*="z-99999"]')) return;
      if (target.closest('.os-taskbar')) return;
      e.preventDefault();
      setStartMenuOpen(false);
      setCalendarOpen(false);
      setQuickSettingsOpen(false);
      setSearchOpen(false);
      setCtxMenu({
        x: e.clientX,
        y: e.clientY,
        items: getDesktopContextMenuItems({
          onNewFolder: () => {
            makeDir('/home/user/Desktop/New Folder');
          },
          onNewFile: () => {
            writeFile('/home/user/Desktop/New Document.txt', '');
          },
          onRefresh: () => {
            window.location.reload();
          },
          onOpenTerminal: () => {
            openWindow('terminal', 'Terminal');
          },
          onOpenSettings: () => {
            openWindow('settings', 'Settings');
          },
        }),
      });
    };
    document.addEventListener('contextmenu', handler);
    return () => document.removeEventListener('contextmenu', handler);
  }, [makeDir, writeFile, openWindow]);

  const handleOpenApp = useCallback(
    (appId: string) => {
      const app = OS_APPS.find((a) => a.id === appId);
      if (app) openWindow(app.id, app.name);
    },
    [openWindow],
  );

  /* ---- Handle file drop on desktop ---- */
  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const files = e.dataTransfer.files;
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const isImage = file.type.startsWith('image/');
        const isVideo = file.type.startsWith('video/');
        if (!isImage && !isVideo) continue;

        const reader = new FileReader();
        reader.onload = () => {
          const dataUrl = reader.result as string;
          const vPath = `/home/user/Desktop/${file.name}`;
          writeFile(vPath, isImage ? '[Dropped Image]' : '[Dropped Video]');

          if (isImage) {
            droppedImages[vPath] = dataUrl;
            // Auto-open in Photos
            openWindow('photos', `Photos - ${vPath}`);
          }
        };
        reader.readAsDataURL(file);
      }
    },
    [writeFile, openWindow],
  );

  if (bootPhase === 'loading') {
    return (
      <div className='w-screen h-screen bg-black'>
        <BootScreen />
      </div>
    );
  }

  return (
    <div
      className='relative w-screen h-screen overflow-hidden win11-wallpaper select-none flex flex-col bg-os-desktop text-os-text'
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) focusWindow(null);
      }}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      {/* Desktop Icons */}
      <DesktopIcons apps={DESKTOP_APPS} />

      {/* Render Open Windows */}
      {windows.map((win) => (
        <OsWindow key={win.id} windowState={win} icon={APP_ICON_MAP[win.appId]}>
          {
            renderApp(
              win.appId,
              win.id,
              windows,
            ) as unknown as React.JSX.Element
          }
        </OsWindow>
      ))}

      {/* Start Menu */}
      <StartMenu
        isOpen={startMenuOpen}
        onClose={() => setStartMenuOpen(false)}
        onSearchClick={() => {
          setStartMenuOpen(false);
          setSearchOpen(true);
        }}
        apps={START_MENU_APPS}
      />

      {/* Calendar Flyout */}
      <CalendarFlyout
        isOpen={calendarOpen}
        onClose={() => setCalendarOpen(false)}
      />

      {/* Quick Settings */}
      <QuickSettings
        isOpen={quickSettingsOpen}
        onClose={() => setQuickSettingsOpen(false)}
      />

      {/* Search Overlay */}
      <SearchOverlay
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onOpenApp={handleOpenApp}
      />

      {/* Context Menu */}
      {ctxMenu && (
        <ContextMenu
          items={ctxMenu.items}
          x={ctxMenu.x}
          y={ctxMenu.y}
          onClose={() => setCtxMenu(null)}
        />
      )}

      {/* Taskbar */}
      <Taskbar
        onStartClick={() => {
          const wasOpen = startMenuOpen;
          closeAllFlyouts();
          if (!wasOpen) setStartMenuOpen(true);
        }}
        onCalendarClick={() => {
          const wasOpen = calendarOpen;
          closeAllFlyouts();
          if (!wasOpen) setCalendarOpen(true);
        }}
        onQuickSettingsClick={() => {
          const wasOpen = quickSettingsOpen;
          closeAllFlyouts();
          if (!wasOpen) setQuickSettingsOpen(true);
        }}
        onSearchClick={() => {
          const wasOpen = searchOpen;
          closeAllFlyouts();
          if (!wasOpen) setSearchOpen(true);
        }}
        apps={TASKBAR_APPS as any}
      />

      {/* Float Toolbar */}
      <FloatToolbar />
    </div>
  );
}
