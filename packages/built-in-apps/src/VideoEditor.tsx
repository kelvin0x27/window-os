'use client';

import React, { useState } from 'react';

export const VideoEditorApp = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const duration = 120;

  return (
    <div className='flex flex-col h-full w-full bg-[#1a1a2e] text-[#e0e0e0] font-sans'>
      {/* Top Bar */}
      <div className='flex items-center justify-between px-4 h-10 bg-[#16213e] border-b border-white/5 shrink-0'>
        <div className='flex items-center gap-2'>
          <svg width='20' height='20' viewBox='0 0 20 20' fill='none'>
            <rect
              x='2'
              y='4'
              width='16'
              height='12'
              rx='2'
              stroke='#7c3aed'
              strokeWidth='1.5'
              fill='none'
            />
            <path d='M8 8L12 10L8 12V8Z' fill='#7c3aed' />
          </svg>
          <span className='text-[13px] font-semibold'>Clipchamp</span>
          <span className='text-xs text-[#888] ml-2'>Untitled Project</span>
        </div>
        <div className='flex gap-2'>
          <button className='flex items-center gap-1.5 px-3.5 py-1.5 rounded bg-white/5 border-none text-[#ccc] cursor-pointer text-xs transition-[background] duration-100 hover:bg-white/10'>
            <svg width='14' height='14' viewBox='0 0 14 14' fill='none'>
              <path
                d='M7 1V8M3 5L7 1L11 5'
                stroke='currentColor'
                strokeWidth='1.2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M1 10V12H13V10'
                stroke='currentColor'
                strokeWidth='1.2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
            Import
          </button>
          <button className='flex items-center gap-1.5 px-3.5 py-1.5 rounded bg-[#7c3aed] border-none text-white cursor-pointer text-xs font-medium transition-[background] duration-100 hover:bg-[#6d28d9]'>
            <svg width='14' height='14' viewBox='0 0 14 14' fill='none'>
              <path
                d='M7 13V6M3 9L7 13L11 9'
                stroke='currentColor'
                strokeWidth='1.2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M1 1V3H13V1'
                stroke='currentColor'
                strokeWidth='1.2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
            Export
          </button>
        </div>
      </div>

      {/* Main Area */}
      <div className='flex-1 flex overflow-hidden border-b border-white/5'>
        {/* Preview */}
        <div className='flex-1 flex flex-col p-4'>
          <div className='flex-1 bg-[#0f0f23] rounded-lg flex items-center justify-center overflow-hidden relative border border-white/5'>
            <svg
              width='48'
              height='48'
              viewBox='0 0 48 48'
              fill='none'
              className='opacity-30'
            >
              <rect
                x='4'
                y='8'
                width='40'
                height='32'
                rx='3'
                stroke='#888'
                strokeWidth='2'
                fill='none'
              />
              <path d='M20 18L30 24L20 30V18Z' fill='#888' />
            </svg>
            {isPlaying && (
              <div className='absolute bottom-3 right-3 text-[10px] bg-red-500 text-white px-2 py-0.5 rounded font-semibold font-mono'>
                ● REC
              </div>
            )}
            {/* Playback controls overlay */}
            <div className='absolute bottom-0 left-0 right-0 h-12 bg-linear-to-t from-black/60 to-transparent flex items-end justify-center pb-2.5 gap-4'>
              <PlayerBtn
                onClick={() => setCurrentTime(Math.max(0, currentTime - 5))}
              >
                <svg width='16' height='16' viewBox='0 0 16 16' fill='none'>
                  <path
                    d='M11 3L5 8L11 13'
                    stroke='#fff'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </PlayerBtn>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className='w-9 h-9 rounded-full border-none bg-white text-black cursor-pointer flex items-center justify-center hover:bg-[#e0e0e0] transition-colors'
              >
                {isPlaying ? (
                  <svg width='16' height='16' viewBox='0 0 16 16' fill='none'>
                    <rect
                      x='4'
                      y='3'
                      width='3'
                      height='10'
                      rx='1'
                      fill='currentColor'
                    />
                    <rect
                      x='9'
                      y='3'
                      width='3'
                      height='10'
                      rx='1'
                      fill='currentColor'
                    />
                  </svg>
                ) : (
                  <svg width='16' height='16' viewBox='0 0 16 16' fill='none'>
                    <path d='M5 3L13 8L5 13V3Z' fill='currentColor' />
                  </svg>
                )}
              </button>
              <PlayerBtn
                onClick={() =>
                  setCurrentTime(Math.min(duration, currentTime + 5))
                }
              >
                <svg width='16' height='16' viewBox='0 0 16 16' fill='none'>
                  <path
                    d='M5 3L11 8L5 13'
                    stroke='#fff'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </PlayerBtn>
            </div>
          </div>
        </div>

        {/* Properties Panel */}
        <div className='w-[220px] bg-[#16213e] border-l border-white/5 p-4 overflow-auto shrink-0'>
          <h4 className='text-[11px] text-[#888] uppercase tracking-widest mb-4 font-semibold m-0'>
            Properties
          </h4>
          {[
            { label: 'Scale', value: 100 },
            { label: 'Rotation', value: 0, max: 360 },
            { label: 'Opacity', value: 100 },
          ].map((p) => (
            <div key={p.label} className='mb-4'>
              <label className='text-[11px] text-[#888] block mb-1'>
                {p.label}
              </label>
              <input
                type='range'
                min='0'
                max={p.max || 100}
                defaultValue={p.value}
                className='w-full h-1 accent-[#7c3aed]'
              />
            </div>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className='h-[180px] bg-[#0f0f23] shrink-0 flex flex-col px-4 py-2'>
        <div className='flex items-center justify-between mb-2 text-[11px] text-[#888]'>
          <div className='flex gap-3'>
            <span className='cursor-pointer hover:text-white transition-colors'>
              ✂ Split
            </span>
            <span className='cursor-pointer hover:text-white transition-colors'>
              🗑 Delete
            </span>
          </div>
          <span className='font-mono'>
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
        </div>

        <div className='flex-1 bg-[#16213e] rounded-md overflow-hidden relative border border-white/5 flex flex-col gap-1 px-2 pt-6 pb-2'>
          {/* Playhead */}
          <div
            className='absolute top-0 bottom-0 w-0.5 bg-red-500 z-10'
            style={{ left: `${(currentTime / duration) * 100}%` }}
          >
            <div className='w-2.5 h-2.5 bg-red-500 rounded-b-sm absolute top-0 -left-1' />
          </div>

          {/* Video track */}
          <div className='h-9 bg-[#7c3aed26] rounded relative border border-[#7c3aed4d]'>
            <div className='absolute top-1 bottom-1 left-[10%] right-[30%] bg-[#7c3aed] rounded-[3px] opacity-70' />
            <div className='absolute left-0 top-0 bottom-0 w-12 bg-[#16213e] border-r border-white/5 flex items-center justify-center text-[10px] text-[#888] z-5'>
              V1
            </div>
          </div>

          {/* Audio track */}
          <div className='h-9 bg-[#10b98126] rounded relative border border-[#10b9814d]'>
            <div className='absolute top-1 bottom-1 left-[15%] right-[20%] bg-[#10b981] rounded-[3px] opacity-70' />
            <div className='absolute left-0 top-0 bottom-0 w-12 bg-[#16213e] border-r border-white/5 flex items-center justify-center text-[10px] text-[#888] z-5'>
              A1
            </div>
          </div>

          {/* Scrubber */}
          <input
            type='range'
            min={0}
            max={duration}
            value={currentTime}
            onChange={(e) => setCurrentTime(parseInt(e.target.value))}
            className='absolute left-2 right-2 top-0 h-5 opacity-0 cursor-ew-resize z-20 m-0 w-[calc(100%-16px)]'
          />
        </div>
      </div>
    </div>
  );
};

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

const PlayerBtn = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className='w-7 h-7 rounded-full border-none bg-white/15 text-white cursor-pointer flex items-center justify-center hover:bg-white/25 transition-[background] duration-200'
  >
    {children}
  </button>
);
