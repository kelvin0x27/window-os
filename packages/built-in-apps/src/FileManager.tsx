'use client';

import React, { useState, useCallback } from 'react';
import { useFSStore, useOSStore } from '@web-os/os-core';

/* Module-level store for dropped file data URLs */
const droppedFileData: Record<string, string> = {};
export function getDroppedFileData(path: string): string | undefined {
  return droppedFileData[path];
}

interface SidebarItem {
  label: string;
  icon: React.ReactNode;
  path: string;
}

const FolderIcon = ({
  size = 16,
  className = '',
}: {
  size?: number;
  className?: string;
}) => (
  <svg
    width={size}
    height={size}
    viewBox='0 0 20 20'
    fill='none'
    className={className}
  >
    <path
      d='M2 5.5C2 4.67 2.67 4 3.5 4H8l1.5 2H16.5C17.33 6 18 6.67 18 7.5V14.5C18 15.33 17.33 16 16.5 16H3.5C2.67 16 2 15.33 2 14.5V5.5Z'
      fill='#FFB900'
    />
    <path
      d='M2 7H18V14.5C18 15.33 17.33 16 16.5 16H3.5C2.67 16 2 15.33 2 14.5V7Z'
      fill='#FFD75E'
      opacity='0.5'
    />
  </svg>
);

const FileIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox='0 0 20 20' fill='none'>
    <path
      d='M5 2C4.45 2 4 2.45 4 3V17C4 17.55 4.45 18 5 18H15C15.55 18 16 17.55 16 17V7L11 2H5Z'
      fill='#4A4A4A'
    />
    <path d='M11 2V6C11 6.55 11.45 7 12 7H16' fill='#3A3A3A' />
    <path d='M11 2L16 7H12C11.45 7 11 6.55 11 6V2Z' fill='#5A5A5A' />
    <rect x='6' y='9' width='8' height='1' rx='0.5' fill='#888' />
    <rect x='6' y='11' width='6' height='1' rx='0.5' fill='#888' />
    <rect x='6' y='13' width='7' height='1' rx='0.5' fill='#888' />
  </svg>
);

const SIDEBAR_ITEMS: SidebarItem[] = [
  {
    label: 'Quick Access',
    icon: (
      <svg width='16' height='16' viewBox='0 0 16 16' fill='none'>
        <path
          d='M8 1L10 5.5L15 6.2L11.5 9.5L12.4 14.5L8 12L3.6 14.5L4.5 9.5L1 6.2L6 5.5L8 1Z'
          fill='#FFB900'
        />
      </svg>
    ),
    path: '/home/user',
  },
  {
    label: 'Desktop',
    icon: (
      <svg width='16' height='16' viewBox='0 0 16 16' fill='none'>
        <rect x='1' y='2' width='14' height='10' rx='1' fill='#0078D4' />
        <rect x='5' y='13' width='6' height='1' rx='0.5' fill='#555' />
      </svg>
    ),
    path: '/home/user/Desktop',
  },
  {
    label: 'Downloads',
    icon: (
      <svg width='16' height='16' viewBox='0 0 16 16' fill='none'>
        <path
          d='M8 1V10M8 10L5 7M8 10L11 7'
          stroke='#0078D4'
          strokeWidth='1.5'
          strokeLinecap='round'
        />
        <path
          d='M2 12V13.5C2 14.33 2.67 15 3.5 15H12.5C13.33 15 14 14.33 14 13.5V12'
          stroke='#0078D4'
          strokeWidth='1.5'
          strokeLinecap='round'
        />
      </svg>
    ),
    path: '/home/user/Downloads',
  },
  {
    label: 'Documents',
    icon: (
      <svg width='16' height='16' viewBox='0 0 16 16' fill='none'>
        <path
          d='M3 1.5C3 1.22 3.22 1 3.5 1H9L13 5V14.5C13 14.78 12.78 15 12.5 15H3.5C3.22 15 3 14.78 3 14.5V1.5Z'
          fill='#0078D4'
        />
        <path d='M9 1L13 5H9.5C9.22 5 9 4.78 9 4.5V1Z' fill='#3AA0F0' />
      </svg>
    ),
    path: '/home/user/Documents',
  },
  {
    label: 'Pictures',
    icon: (
      <svg width='16' height='16' viewBox='0 0 16 16' fill='none'>
        <rect x='1' y='2' width='14' height='12' rx='1' fill='#107C10' />
        <circle cx='5' cy='6' r='1.5' fill='#FFB900' />
        <path
          d='M1 12L5 8L8 11L11 7L15 12V13C15 13.55 14.55 14 14 14H2C1.45 14 1 13.55 1 13V12Z'
          fill='#0B5D0B'
        />
      </svg>
    ),
    path: '/home/user/Pictures',
  },
  {
    label: 'This PC',
    icon: (
      <svg width='16' height='16' viewBox='0 0 16 16' fill='none'>
        <rect x='2' y='3' width='12' height='8' rx='1' fill='#555' />
        <rect x='3' y='4' width='10' height='6' rx='0.5' fill='#0078D4' />
        <rect x='5' y='12' width='6' height='1.5' rx='0.5' fill='#555' />
        <rect x='4' y='13.5' width='8' height='0.5' rx='0.25' fill='#444' />
      </svg>
    ),
    path: '/',
  },
];

/* Context Menu Button */
const CtxBtn = ({
  label,
  onClick,
  shortcut,
  danger,
}: {
  label: string;
  onClick: () => void;
  shortcut?: string;
  danger?: boolean;
}) => (
  <button
    onClick={onClick}
    className={`flex items-center justify-between w-full px-4 py-1.5 bg-transparent border-none text-xs text-left cursor-pointer transition-[background] duration-75 hover:bg-white/5 ${
      danger ? 'text-red-500' : 'text-os-text'
    }`}
  >
    <span>{label}</span>
    {shortcut && <span className='text-[11px] text-[#666]'>{shortcut}</span>}
  </button>
);

export const FileManagerApp = ({ windowId }: { windowId: string }) => {
  const { readDir, makeDir, writeFile, deleteNode } = useFSStore();
  const { openWindow } = useOSStore();
  const [currentPath, setCurrentPath] = useState('/home/user');
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  const files = readDir(currentPath);
  const pathParts = currentPath.split('/').filter(Boolean);

  const navigateTo = (path: string) => {
    setCurrentPath(path);
    setSelectedFile(null);
  };

  const navigateUp = () => {
    if (currentPath === '/') return;
    const parts = currentPath.split('/');
    parts.pop();
    navigateTo(parts.join('/') || '/');
  };

  const handleCreateDir = useCallback(() => {
    // Auto-create "New Folder" with incrementing suffix if name exists
    let name = 'New Folder';
    let counter = 1;
    const existingNames = files.map((f) => f.path.split('/').pop() || '');
    while (existingNames.includes(name)) {
      counter++;
      name = `New Folder (${counter})`;
    }
    const path = currentPath === '/' ? `/${name}` : `${currentPath}/${name}`;
    makeDir(path);
    // Start inline rename
    setRenamingFile(name);
    setRenameValue(name);
  }, [currentPath, files, makeDir]);

  const handleCreateFile = useCallback(() => {
    let name = 'New Document.txt';
    let counter = 1;
    const existingNames = files.map((f) => f.path.split('/').pop() || '');
    while (existingNames.includes(name)) {
      counter++;
      name = `New Document (${counter}).txt`;
    }
    const path = currentPath === '/' ? `/${name}` : `${currentPath}/${name}`;
    writeFile(path, '');
    setRenamingFile(name);
    setRenameValue(name);
  }, [currentPath, files, writeFile]);

  const handleOpenFile = (path: string) => {
    const ext = (path.split('.').pop() || '').toLowerCase();
    if (['ts', 'tsx', 'js', 'json', 'html', 'css', 'md'].includes(ext)) {
      openWindow('code', `Code Editor - ${path}`);
    } else if (
      ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp', 'svg'].includes(ext)
    ) {
      openWindow('photos', `Photos - ${path}`);
    } else {
      openWindow('text', `Notepad - ${path}`);
    }
  };

  /* ---- Rename ---- */
  const [renamingFile, setRenamingFile] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState('');

  const startRename = (name: string) => {
    setRenamingFile(name);
    setRenameValue(name);
  };

  const commitRename = () => {
    if (!renamingFile || !renameValue || renameValue === renamingFile) {
      setRenamingFile(null);
      return;
    }
    const oldPath =
      currentPath === '/'
        ? `/${renamingFile}`
        : `${currentPath}/${renamingFile}`;
    const newPath =
      currentPath === '/' ? `/${renameValue}` : `${currentPath}/${renameValue}`;
    // Read old, write new, delete old
    const content = readFile(oldPath);
    if (content !== null) {
      writeFile(newPath, content);
      deleteNode(oldPath);
    } else {
      // It's a directory - create new dir and delete old
      makeDir(newPath);
      deleteNode(oldPath);
    }
    setRenamingFile(null);
  };

  /* ---- Drag & Drop real files ---- */
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
      const droppedFiles = e.dataTransfer.files;
      for (let i = 0; i < droppedFiles.length; i++) {
        const file = droppedFiles[i];
        const isImage = file.type.startsWith('image/');
        const isVideo = file.type.startsWith('video/');
        if (!isImage && !isVideo) continue;
        const vPath =
          currentPath === '/' ? `/${file.name}` : `${currentPath}/${file.name}`;
        const reader = new FileReader();
        reader.onload = () => {
          const dataUrl = reader.result as string;
          droppedFileData[vPath] = dataUrl;
          writeFile(
            vPath,
            isImage ? `[Image: ${file.name}]` : `[Video: ${file.name}]`,
          );
        };
        reader.readAsDataURL(file);
      }
    },
    [currentPath, writeFile],
  );

  /* ---- Right-click context menu ---- */
  const [ctxMenu, setCtxMenu] = useState<{
    x: number;
    y: number;
    fileName: string | null;
  } | null>(null);

  const { readFile } = useFSStore();

  const handleBreadcrumbClick = (index: number) => {
    const newPath = '/' + pathParts.slice(0, index + 1).join('/');
    navigateTo(newPath);
  };

  return (
    <div className='flex w-full h-full bg-[#191919] text-os-text font-sans text-[13px]'>
      {/* Sidebar */}
      <div className='w-[200px] min-w-[200px] bg-[#252525] border-r border-os-border flex flex-col pt-2'>
        {SIDEBAR_ITEMS.map((item) => (
          <button
            key={item.label}
            onClick={() => navigateTo(item.path)}
            className={`flex items-center gap-2.5 py-1.5 px-3 mx-1 my-px rounded border-none w-[calc(100%-8px)] text-left text-[13px] cursor-pointer hover:bg-white/5 ${
              currentPath === item.path
                ? 'bg-white/10 text-white hover:bg-white/10'
                : 'bg-transparent text-[#bbb]'
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className='flex-1 flex flex-col min-w-0'>
        {/* Toolbar */}
        <div className='flex items-center gap-0.5 px-2 py-1 bg-[#2d2d2d] border-b border-os-border'>
          <ToolbarButton
            label='New'
            icon='+'
            onClick={handleCreateDir}
            primary
          />
          <ToolbarDivider />
          <ToolbarButton label='Cut' icon='✂' />
          <ToolbarButton label='Copy' icon='⧉' />
          <ToolbarButton label='Paste' icon='📋' />
          <ToolbarButton label='Rename' icon='✏' />
          <ToolbarButton
            label='Delete'
            icon='🗑'
            onClick={() => {
              if (selectedFile) deleteNode(selectedFile);
              setSelectedFile(null);
            }}
          />
          <ToolbarDivider />
          <ToolbarButton label='Sort' icon='↕' />
        </div>

        {/* Navigation Bar */}
        <div className='flex items-center gap-1 px-2 py-1 bg-[#2d2d2d] border-b border-os-border'>
          {/* Nav buttons */}
          <NavButton onClick={() => {}} disabled>
            ←
          </NavButton>
          <NavButton onClick={() => {}} disabled>
            →
          </NavButton>
          <NavButton onClick={navigateUp} disabled={currentPath === '/'}>
            ↑
          </NavButton>
          <NavButton onClick={() => {}}>⟳</NavButton>

          {/* Breadcrumb */}
          <div className='flex-1 flex items-center bg-[#1e1e1e] border border-white/10 rounded px-2.5 mx-1 min-h-[28px]'>
            <span
              onClick={() => navigateTo('/')}
              className='cursor-pointer text-[#aaa] text-xs hover:text-white'
            >
              💻
            </span>
            {pathParts.map((part, i) => (
              <React.Fragment key={i}>
                <span className='text-[#555] mx-1 text-[11px]'>›</span>
                <span
                  onClick={() => handleBreadcrumbClick(i)}
                  className='cursor-pointer text-[#ccc] text-xs hover:text-white'
                >
                  {part}
                </span>
              </React.Fragment>
            ))}
          </div>

          {/* Search */}
          <div className='flex items-center bg-[#1e1e1e] border border-white/10 rounded px-2.5 min-h-[28px] w-[180px]'>
            <span className='text-[#666] text-xs mr-1.5'>🔍</span>
            <span className='text-[#666] text-xs'>Search</span>
          </div>
        </div>

        {/* File Grid */}
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragOver(true);
          }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={handleFileDrop}
          onClick={() => setCtxMenu(null)}
          onContextMenu={(e) => {
            if (!(e.target as HTMLElement).closest('[data-file]')) {
              e.preventDefault();
              setCtxMenu({ x: e.clientX, y: e.clientY, fileName: null });
            }
          }}
          className={`flex-1 overflow-auto p-4 relative transition-[background,border] duration-150 border-2 ${
            isDragOver
              ? 'bg-[#0078d4]/5 border-[#0078d4]/40 border-dashed'
              : 'bg-[#191919] border-transparent border-solid'
          }`}
        >
          {isDragOver && (
            <div className='absolute inset-0 flex items-center justify-center bg-[#0078d4]/10 z-10 pointer-events-none'>
              <div className='text-[#0078d4] text-sm font-medium'>
                Drop images or videos here
              </div>
            </div>
          )}
          <div className='grid grid-cols-[repeat(auto-fill,minmax(80px,1fr))] gap-1 content-start'>
            {files.map((file) => {
              const name = file.path.split('/').pop() || '';
              const isSelected = selectedFile === file.path;
              const isRenaming = renamingFile === name;
              const ext = (name.split('.').pop() || '').toLowerCase();
              const isImageFile = [
                'jpg',
                'jpeg',
                'png',
                'gif',
                'webp',
                'bmp',
                'svg',
              ].includes(ext);
              const thumbSrc = droppedFileData[file.path];
              return (
                <div
                  key={file.path}
                  data-file={name}
                  onClick={() => setSelectedFile(file.path)}
                  onDoubleClick={() => {
                    if (file.type === 'dir') navigateTo(file.path);
                    else handleOpenFile(file.path);
                  }}
                  onContextMenu={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setSelectedFile(file.path);
                    setCtxMenu({ x: e.clientX, y: e.clientY, fileName: name });
                  }}
                  className={`flex flex-col items-center gap-1 py-2 px-1 rounded cursor-pointer border transition-[background] duration-100 ${
                    isSelected
                      ? 'bg-[#0078d4]/20 border-[#0078d4]/40'
                      : 'bg-transparent border-transparent hover:bg-white/5'
                  }`}
                >
                  <div className='w-12 h-12 flex items-center justify-center overflow-hidden rounded'>
                    {file.type === 'dir' ? (
                      <FolderIcon size={40} />
                    ) : thumbSrc && isImageFile ? (
                      <img
                        src={thumbSrc}
                        alt={name}
                        className='w-12 h-12 object-cover rounded'
                      />
                    ) : (
                      <FileIcon size={40} />
                    )}
                  </div>
                  {isRenaming ? (
                    <input
                      value={renameValue}
                      onChange={(e) => setRenameValue(e.target.value)}
                      onBlur={commitRename}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') commitRename();
                        if (e.key === 'Escape') setRenamingFile(null);
                      }}
                      autoFocus
                      className='text-[11px] text-white bg-[#333] border border-[#0078d4] rounded-[2px] px-1 py-[1px] w-[72px] text-center outline-none'
                      onClick={(e) => e.stopPropagation()}
                    />
                  ) : (
                    <span className='text-[11px] text-[#ddd] text-center break-words leading-[14px] max-w-[72px]'>
                      {name}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
          {files.length === 0 && (
            <div className='flex items-center justify-center h-[200px] text-[#666] text-[13px]'>
              This folder is empty
            </div>
          )}

          {/* Context Menu */}
          {ctxMenu && (
            <div
              className='fixed z-99999 bg-[#282828]/95 backdrop-blur-[40px] rounded-lg shadow-[0_8px_32px_rgba(0,0,0,0.45),0_0_0_1px_rgba(255,255,255,0.06)] py-1 min-w-[180px]'
              style={{ left: ctxMenu.x, top: ctxMenu.y }}
              onClick={(e) => e.stopPropagation()}
            >
              {ctxMenu.fileName ? (
                <>
                  <CtxBtn
                    label='Open'
                    onClick={() => {
                      const f = files.find((f) =>
                        f.path.endsWith(ctxMenu.fileName!),
                      );
                      if (f) {
                        if (f.type === 'dir') navigateTo(f.path);
                        else handleOpenFile(f.path);
                      }
                      setCtxMenu(null);
                    }}
                  />
                  <div className='h-px bg-white/5 mx-3 my-1' />
                  <CtxBtn
                    label='Cut'
                    shortcut='Ctrl+X'
                    onClick={() => setCtxMenu(null)}
                  />
                  <CtxBtn
                    label='Copy'
                    shortcut='Ctrl+C'
                    onClick={() => setCtxMenu(null)}
                  />
                  <CtxBtn
                    label='Rename'
                    shortcut='F2'
                    onClick={() => {
                      startRename(ctxMenu.fileName!);
                      setCtxMenu(null);
                    }}
                  />
                  <div className='h-px bg-white/5 mx-3 my-1' />
                  <CtxBtn
                    label='Delete'
                    shortcut='Del'
                    onClick={() => {
                      const f = files.find((f) =>
                        f.path.endsWith(ctxMenu.fileName!),
                      );
                      if (f) deleteNode(f.path);
                      setCtxMenu(null);
                    }}
                    danger
                  />
                  <div className='h-px bg-white/5 mx-3 my-1' />
                  <CtxBtn label='Properties' onClick={() => setCtxMenu(null)} />
                </>
              ) : (
                <>
                  <CtxBtn label='View' onClick={() => setCtxMenu(null)} />
                  <CtxBtn label='Sort by' onClick={() => setCtxMenu(null)} />
                  <CtxBtn label='Refresh' onClick={() => setCtxMenu(null)} />
                  <div className='h-px bg-white/5 mx-3 my-1' />
                  <CtxBtn
                    label='New folder'
                    onClick={() => {
                      handleCreateDir();
                      setCtxMenu(null);
                    }}
                  />
                  <CtxBtn
                    label='New text document'
                    onClick={() => {
                      handleCreateFile();
                      setCtxMenu(null);
                    }}
                  />
                  <div className='h-px bg-white/5 mx-3 my-1' />
                  <CtxBtn
                    label='Paste'
                    shortcut='Ctrl+V'
                    onClick={() => setCtxMenu(null)}
                  />
                  <div className='h-px bg-white/5 mx-3 my-1' />
                  <CtxBtn
                    label='Open in Terminal'
                    onClick={() => {
                      openWindow('terminal', 'Terminal');
                      setCtxMenu(null);
                    }}
                  />
                  <CtxBtn label='Properties' onClick={() => setCtxMenu(null)} />
                </>
              )}
            </div>
          )}
        </div>

        {/* Status Bar */}
        <div className='flex items-center justify-between px-3 py-1 bg-[#2d2d2d] border-t border-os-border text-[11px] text-[#888]'>
          <span>
            {files.length} item{files.length !== 1 ? 's' : ''}
          </span>
          <div className='flex gap-1'>
            <button className='bg-transparent border-none text-[#888] cursor-pointer text-[13px] px-1'>
              ⊞
            </button>
            <button className='bg-transparent border-none text-[#888] cursor-pointer text-[13px] px-1'>
              ☰
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ToolbarButton = ({
  label,
  icon,
  onClick,
  primary,
}: {
  label: string;
  icon: string;
  onClick?: () => void;
  primary?: boolean;
}) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-1 px-2 py-1 rounded border-none text-xs whitespace-nowrap cursor-pointer transition-[background] duration-75 ${
      primary
        ? 'bg-[#0078d4]/15 text-[#60b0f4] hover:bg-[#0078d4]/25'
        : 'bg-transparent text-[#bbb] hover:bg-white/5'
    }`}
  >
    <span className='text-[13px]'>{icon}</span>
    <span>{label}</span>
  </button>
);

const ToolbarDivider = () => <div className='w-px h-5 bg-white/10 mx-1' />;

const NavButton = ({
  children,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`w-7 h-7 flex items-center justify-center rounded border-none text-sm transition-[background] duration-75 ${
      disabled
        ? 'bg-transparent text-[#555] cursor-default'
        : 'bg-transparent text-[#ccc] cursor-pointer hover:bg-white/5'
    }`}
  >
    {children}
  </button>
);
