'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useFSStore, useOSStore } from '@web-os/os-core';

export const TextEditor = ({ windowId }: { windowId: string }) => {
  const { windows } = useOSStore();
  const { readFile, writeFile } = useFSStore();

  const win = windows.find((w) => w.id === windowId);
  const title = win?.title || 'Notepad';
  const defaultPath = title.includes(' - ')
    ? title.split(' - ')[1]
    : '/home/user/scratch.txt';

  const [path] = useState(defaultPath);
  const [content, setContent] = useState('');
  const [isSaved, setIsSaved] = useState(true);
  const [fontSize, setFontSize] = useState(14);
  const [wordWrap, setWordWrap] = useState(true);
  const [showStatusBar, setShowStatusBar] = useState(true);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [cursorPos, setCursorPos] = useState({ line: 1, col: 1 });

  useEffect(() => {
    const fileContent = readFile(path);
    if (fileContent !== null) {
      setContent(fileContent);
      setIsSaved(true);
    }
  }, [path, readFile]);

  const handleSave = () => {
    writeFile(path, content);
    setIsSaved(true);
  };

  const updateCursor = () => {
    const ta = textareaRef.current;
    if (!ta) return;
    const pos = ta.selectionStart;
    const lines = content.substring(0, pos).split('\n');
    setCursorPos({
      line: lines.length,
      col: lines[lines.length - 1].length + 1,
    });
  };

  const fileName = path.split('/').pop() || 'Untitled';

  // Menu bar items
  const menus = ['File', 'Edit', 'View'];

  return (
    <div className='flex flex-col h-full w-full bg-[#1e1e1e] text-[#d4d4d4] font-sans'>
      {/* Menu Bar */}
      <div className='flex items-center gap-0 px-2 h-8 bg-[#2d2d2d] border-b border-white/5 text-xs shrink-0'>
        {menus.map((m) => (
          <button
            key={m}
            className='px-2.5 py-1 bg-transparent border-none text-[#ccc] cursor-pointer rounded text-xs transition-[background] duration-100 hover:bg-white/5'
            onClick={m === 'File' ? handleSave : undefined}
          >
            {m}
          </button>
        ))}
        <div className='flex-1' />
        <span className='text-[11px] text-[#888]'>
          {isSaved ? '' : '● '}
          {fileName}
        </span>
      </div>

      {/* Tab Bar */}
      <div className='flex items-center h-[34px] bg-[#252525] border-b border-white/5 pl-2 shrink-0'>
        <div className='flex items-center gap-2 px-3.5 py-1 bg-[#1e1e1e] rounded-t-md border-t-2 border-[#0078d4] text-xs text-[#e0e0e0] relative top-px'>
          <svg width='14' height='14' viewBox='0 0 16 16' fill='none'>
            <rect
              x='2'
              y='2'
              width='12'
              height='12'
              rx='1'
              stroke='#888'
              strokeWidth='1.2'
              fill='none'
            />
            <path
              d='M5 5H11M5 8H11M5 11H8'
              stroke='#888'
              strokeWidth='1'
              strokeLinecap='round'
            />
          </svg>
          <span>{fileName}</span>
          {!isSaved && <span className='text-[#888]'>●</span>}
        </div>
        <button className='w-7 h-7 bg-transparent border-none text-[#888] cursor-pointer text-base ml-1 rounded hover:bg-white/5 transition-[background]'>
          +
        </button>
      </div>

      {/* Editor Area */}
      <div className='flex-1 relative overflow-hidden'>
        <textarea
          ref={textareaRef}
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
            setIsSaved(false);
          }}
          onClick={updateCursor}
          onKeyUp={updateCursor}
          spellCheck={false}
          className='w-full h-full py-3 px-4 bg-[#1e1e1e] text-[#d4d4d4] border-none outline-none resize-none font-mono leading-[1.6]'
          style={{
            fontSize,
            whiteSpace: wordWrap ? 'pre-wrap' : 'pre',
            overflowWrap: wordWrap ? 'break-word' : 'normal',
          }}
          onKeyDown={(e) => {
            if (e.ctrlKey && e.key === 's') {
              e.preventDefault();
              handleSave();
            }
          }}
        />
      </div>

      {/* Status Bar */}
      {showStatusBar && (
        <div className='flex items-center justify-between h-6 px-3 bg-[#252525] border-t border-white/5 text-[11px] text-[#888] shrink-0'>
          <div className='flex gap-4'>
            <span>
              Ln {cursorPos.line}, Col {cursorPos.col}
            </span>
            <span>{content.length} characters</span>
          </div>
          <div className='flex gap-3 items-center'>
            <span>UTF-8</span>
            <span>Windows (CRLF)</span>
            <button
              onClick={() => setWordWrap((w) => !w)}
              className={`bg-transparent border-none cursor-pointer text-[11px] ${wordWrap ? 'text-[#0078d4]' : 'text-[#888]'}`}
            >
              Word Wrap {wordWrap ? 'On' : 'Off'}
            </button>
            <button
              onClick={() => setFontSize((s) => Math.min(24, s + 1))}
              className='bg-transparent border-none text-[#888] cursor-pointer text-xs'
            >
              A+
            </button>
            <button
              onClick={() => setFontSize((s) => Math.max(10, s - 1))}
              className='bg-transparent border-none text-[#888] cursor-pointer text-xs'
            >
              A-
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
