import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { useFSStore, useOSStore } from '@web-os/os-core';

export const CodeEditorApp = ({ windowId }: { windowId: string }) => {
  const { windows } = useOSStore();
  const { readFile, writeFile } = useFSStore();

  const win = windows.find((w) => w.id === windowId);
  const title = win?.title || 'Code Editor';
  const defaultPath = title.includes(' - ')
    ? title.split(' - ')[1]
    : '/home/user/script.js';

  const [path, setPath] = useState(defaultPath);
  const [content, setContent] = useState('');
  const [isSaved, setIsSaved] = useState(true);

  useEffect(() => {
    const fileContent = readFile(path);
    if (fileContent !== null) {
      setContent(fileContent);
      setIsSaved(true);
    } else {
      setContent('// Write your code here\n');
    }
  }, [path, readFile]);

  const handleSave = () => {
    writeFile(path, content);
    setIsSaved(true);
  };

  const extension = path.split('.').pop();
  let language = 'javascript';
  if (extension === 'ts' || extension === 'tsx') language = 'typescript';
  else if (extension === 'html') language = 'html';
  else if (extension === 'css') language = 'css';
  else if (extension === 'json') language = 'json';
  else if (extension === 'md') language = 'markdown';

  return (
    <div className='flex flex-col h-full w-full bg-[#1e1e1e]'>
      <div className='flex items-center justify-between px-3 py-2 bg-[#2d2d2d] border-b border-[#3e3e42] text-[#cccccc] text-xs'>
        <div className='flex gap-4'>
          <button
            onClick={handleSave}
            className='hover:text-white transition-colors'
          >
            Save
          </button>
        </div>
        <div className='text-[#858585]'>
          {path} {isSaved ? '' : '●'}
        </div>
      </div>
      <div className='flex-1 w-full relative'>
        {/* @ts-ignore */}
        <Editor
          height='100%'
          defaultLanguage={language}
          language={language}
          theme='vs-dark'
          value={content}
          onChange={(value) => {
            setContent(value || '');
            setIsSaved(false);
          }}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            wordWrap: 'on',
            padding: { top: 16 },
          }}
        />
      </div>
    </div>
  );
};
