'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useFSStore } from '@web-os/os-core';

export const TerminalApp = ({ windowId }: { windowId: string }) => {
  const { readFile, writeFile, makeDir, readDir } = useFSStore();
  const [cwd, setCwd] = useState('C:\\Users\\User');
  const [history, setHistory] = useState<
    { type: 'input' | 'output' | 'system'; content: string }[]
  >([
    { type: 'system', content: 'Windows PowerShell' },
    {
      type: 'system',
      content: 'Copyright (C) Microsoft Corporation. All rights reserved.',
    },
    { type: 'system', content: '' },
    {
      type: 'system',
      content:
        'Install the latest PowerShell for new features and improvements! https://aka.ms/PSWindows',
    },
    { type: 'system', content: '' },
  ]);
  const [input, setInput] = useState('');
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const winPathToUnix = (p: string): string => {
    return (
      p.replace(/^C:\\Users\\User/, '/home/user').replace(/\\/g, '/') || '/'
    );
  };

  const unixPathToWin = (p: string): string => {
    return (
      p.replace(/^\/home\/user/, 'C:\\Users\\User').replace(/\//g, '\\') ||
      'C:\\'
    );
  };

  const exec = (cmdStr: string) => {
    const parts = cmdStr.trim().split(/\s+/);
    const cmd = parts[0]?.toLowerCase();
    const args = parts.slice(1);

    if (!cmd) return;

    if (cmd === 'help' || cmd === 'get-help') {
      return setHistory((h) => [
        ...h,
        {
          type: 'output',
          content:
            'Available commands: help, clear, cls, pwd, ls, dir, cd, cat, Get-Content, echo, Write-Output, mkdir, New-Item, Get-ChildItem',
        },
      ]);
    }
    if (cmd === 'clear' || cmd === 'cls') return setHistory([]);
    if (cmd === 'pwd' || cmd === 'get-location') {
      return setHistory((h) => [
        ...h,
        { type: 'output', content: '' },
        { type: 'output', content: 'Path' },
        { type: 'output', content: '----' },
        { type: 'output', content: cwd },
        { type: 'output', content: '' },
      ]);
    }
    if (cmd === 'ls' || cmd === 'dir' || cmd === 'get-childitem') {
      const unixCwd = winPathToUnix(cwd);
      const files = readDir(unixCwd);
      const lines = [
        '',
        '    Directory: ' + cwd,
        '',
        'Mode                 LastWriteTime         Length Name',
        '----                 -------------         ------ ----',
      ];
      for (const f of files) {
        const name = f.path.split('/').pop() || '';
        const mode = f.type === 'dir' ? 'd----' : '-a---';
        const time = '2/22/2026  12:00 AM';
        const len = f.type === 'dir' ? '' : '0';
        lines.push(
          `${mode.padEnd(20)} ${time.padEnd(22)} ${len.padStart(6)} ${name}`,
        );
      }
      if (files.length === 0) {
        lines.push('(empty directory)');
      }
      lines.push('');
      return setHistory((h) => [
        ...h,
        ...lines.map((l) => ({ type: 'output' as const, content: l })),
      ]);
    }
    if (cmd === 'cd' || cmd === 'set-location') {
      const target = args[0] || 'C:\\Users\\User';
      if (target === '..') {
        const parts2 = cwd.split('\\');
        parts2.pop();
        setCwd(parts2.join('\\') || 'C:\\');
      } else if (target === '~') {
        setCwd('C:\\Users\\User');
      } else if (target.startsWith('C:\\') || target.startsWith('c:\\')) {
        setCwd(target);
      } else {
        setCwd(cwd + '\\' + target);
      }
      return;
    }
    if (cmd === 'cat' || cmd === 'get-content') {
      const file = args[0];
      if (!file) {
        return setHistory((h) => [
          ...h,
          { type: 'output', content: 'Get-Content: Missing file path' },
        ]);
      }
      const unixPath = file.startsWith('/')
        ? file
        : winPathToUnix(cwd) + '/' + file;
      const content = readFile(unixPath);
      if (content === null) {
        return setHistory((h) => [
          ...h,
          {
            type: 'output',
            content: `Get-Content: Cannot find path '${file}' because it does not exist.`,
          },
        ]);
      }
      return setHistory((h) => [...h, { type: 'output', content }]);
    }
    if (cmd === 'mkdir' || cmd === 'new-item') {
      const dir = args[0];
      if (!dir) {
        return setHistory((h) => [
          ...h,
          { type: 'output', content: 'mkdir: missing operand' },
        ]);
      }
      const unixPath = dir.startsWith('/')
        ? dir
        : winPathToUnix(cwd) + '/' + dir;
      makeDir(unixPath);
      setHistory((h) => [
        ...h,
        { type: 'output', content: '' },
        { type: 'output', content: '    Directory: ' + cwd },
        { type: 'output', content: '' },
        {
          type: 'output',
          content: `Mode                 LastWriteTime         Length Name`,
        },
        {
          type: 'output',
          content: `----                 -------------         ------ ----`,
        },
        {
          type: 'output',
          content: `d----                2/22/2026  12:00 AM          ${dir}`,
        },
        { type: 'output', content: '' },
      ]);
      return;
    }
    if (cmd === 'echo' || cmd === 'write-output') {
      const out = args.join(' ');
      return setHistory((h) => [...h, { type: 'output', content: out }]);
    }

    setHistory((h) => [
      ...h,
      {
        type: 'output',
        content: `${cmd}: The term '${cmd}' is not recognized as the name of a cmdlet, function, script file, or operable program.`,
      },
    ]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setHistory((h) => [
        ...h,
        { type: 'input', content: `PS ${cwd}> ${input}` },
      ]);
      exec(input);
      setInput('');
    }
  };

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      className='flex flex-col h-full w-full bg-[#0c0c0c] text-[#cccccc] text-[13px] leading-[20px]'
      style={{
        fontFamily: "'Cascadia Code', 'Cascadia Mono', 'Consolas', monospace",
      }}
    >
      {/* Tab bar */}
      <div className='flex items-center bg-[#1f1f1f] border-b border-white/5 h-8 pl-2 gap-0'>
        <div className='flex items-center gap-1.5 px-3 h-full bg-[#0c0c0c] border-t-2 border-[#0078d4] text-xs text-[#e0e0e0]'>
          <span className='text-[11px]'>⚡</span>
          <span>Windows PowerShell</span>
        </div>
        <button className='w-7 h-7 flex items-center justify-center bg-transparent border-none text-[#888] cursor-pointer text-base hover:bg-white/5 transition-[background] duration-100 rounded-sm'>
          +
        </button>
      </div>

      {/* Terminal content */}
      <div className='flex-1 overflow-auto py-2 px-3'>
        {history.map((h, i) => (
          <div
            key={i}
            className='whitespace-pre-wrap break-all'
            style={{
              minHeight: h.content === '' ? 20 : undefined,
            }}
          >
            {h.type === 'input' ? (
              <span className='text-[#ffff00]'>{h.content}</span>
            ) : h.type === 'system' ? (
              <span className='text-[#888]'>{h.content}</span>
            ) : (
              <span>{h.content}</span>
            )}
          </div>
        ))}
        <div className='flex items-center'>
          <span className='text-[#ffff00] mr-0'>PS {cwd}&gt; </span>
          <input
            ref={inputRef}
            autoFocus
            className='flex-1 bg-transparent outline-none border-none text-[#cccccc] text-[13px] leading-[20px] p-0 m-0'
            style={{
              fontFamily:
                "'Cascadia Code', 'Cascadia Mono', 'Consolas', monospace",
            }}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div ref={endRef} />
      </div>
    </div>
  );
};
