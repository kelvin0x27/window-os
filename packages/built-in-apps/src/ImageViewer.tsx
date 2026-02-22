'use client';

import React, { useState } from 'react';

interface ImageViewerProps {
  windowId: string;
  imageSrc?: string;
  fileName?: string;
}

export const ImageViewerApp: React.FC<ImageViewerProps> = ({
  windowId,
  imageSrc,
  fileName,
}) => {
  const [zoom, setZoom] = useState(100);
  const [rotation, setRotation] = useState(0);

  const displayName = fileName || 'Image';

  return (
    <div className='flex flex-col h-full w-full bg-[#1a1a1a] text-[#e0e0e0] font-sans'>
      {/* Toolbar */}
      <div className='flex items-center justify-center gap-2 py-2 px-4 bg-[#252525] border-b border-white/5 shrink-0'>
        {/* Zoom controls */}
        <ToolBtn
          onClick={() => setZoom((z) => Math.max(10, z - 10))}
          title='Zoom out'
        >
          <svg width='16' height='16' viewBox='0 0 16 16' fill='none'>
            <circle
              cx='7'
              cy='7'
              r='5'
              stroke='currentColor'
              strokeWidth='1.2'
            />
            <path
              d='M11 11L14 14'
              stroke='currentColor'
              strokeWidth='1.2'
              strokeLinecap='round'
            />
            <path
              d='M5 7H9'
              stroke='currentColor'
              strokeWidth='1.2'
              strokeLinecap='round'
            />
          </svg>
        </ToolBtn>
        <span className='text-[11px] text-[#888] min-w-[36px] text-center'>
          {zoom}%
        </span>
        <ToolBtn
          onClick={() => setZoom((z) => Math.min(400, z + 10))}
          title='Zoom in'
        >
          <svg width='16' height='16' viewBox='0 0 16 16' fill='none'>
            <circle
              cx='7'
              cy='7'
              r='5'
              stroke='currentColor'
              strokeWidth='1.2'
            />
            <path
              d='M11 11L14 14'
              stroke='currentColor'
              strokeWidth='1.2'
              strokeLinecap='round'
            />
            <path
              d='M5 7H9M7 5V9'
              stroke='currentColor'
              strokeWidth='1.2'
              strokeLinecap='round'
            />
          </svg>
        </ToolBtn>

        <div className='w-px h-5 bg-white/10 mx-1' />

        {/* Rotation */}
        <ToolBtn onClick={() => setRotation((r) => r - 90)} title='Rotate left'>
          <svg width='16' height='16' viewBox='0 0 16 16' fill='none'>
            <path
              d='M4 7L2 5L4 3'
              stroke='currentColor'
              strokeWidth='1.2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path
              d='M2 5H10C12.2 5 14 6.8 14 9C14 11.2 12.2 13 10 13H8'
              stroke='currentColor'
              strokeWidth='1.2'
              strokeLinecap='round'
              fill='none'
            />
          </svg>
        </ToolBtn>
        <ToolBtn
          onClick={() => setRotation((r) => r + 90)}
          title='Rotate right'
        >
          <svg width='16' height='16' viewBox='0 0 16 16' fill='none'>
            <path
              d='M12 7L14 5L12 3'
              stroke='currentColor'
              strokeWidth='1.2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path
              d='M14 5H6C3.8 5 2 6.8 2 9C2 11.2 3.8 13 6 13H8'
              stroke='currentColor'
              strokeWidth='1.2'
              strokeLinecap='round'
              fill='none'
            />
          </svg>
        </ToolBtn>

        <div className='w-px h-5 bg-white/10 mx-1' />

        {/* Fit to window */}
        <ToolBtn
          onClick={() => {
            setZoom(100);
            setRotation(0);
          }}
          title='Fit to window'
        >
          <svg width='16' height='16' viewBox='0 0 16 16' fill='none'>
            <rect
              x='2'
              y='2'
              width='12'
              height='12'
              rx='1.5'
              stroke='currentColor'
              strokeWidth='1.2'
              fill='none'
            />
            <path
              d='M5 6L8 3L11 6M6 10L3 7'
              stroke='currentColor'
              strokeWidth='1'
              strokeLinecap='round'
              strokeLinejoin='round'
              opacity='0.5'
            />
          </svg>
        </ToolBtn>
      </div>

      {/* Image display area */}
      <div className='flex-1 overflow-auto flex items-center justify-center bg-[#111] relative'>
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={displayName}
            className='max-w-full max-h-full object-contain transition-transform duration-200 ease-out'
            style={{
              transform: `scale(${zoom / 100}) rotate(${rotation}deg)`,
            }}
            draggable={false}
          />
        ) : (
          <div className='text-center text-[#555]'>
            <svg
              width='64'
              height='64'
              viewBox='0 0 64 64'
              fill='none'
              className='mb-3'
            >
              <rect
                x='8'
                y='12'
                width='48'
                height='40'
                rx='3'
                stroke='#555'
                strokeWidth='2'
                fill='none'
              />
              <circle
                cx='22'
                cy='26'
                r='5'
                stroke='#555'
                strokeWidth='2'
                fill='none'
              />
              <path
                d='M8 42L22 30L32 40L40 34L56 44'
                stroke='#555'
                strokeWidth='2'
                strokeLinejoin='round'
                fill='none'
              />
            </svg>
            <div className='text-sm mb-1'>No image loaded</div>
            <div className='text-xs text-[#444]'>
              Open an image file to view it here
            </div>
          </div>
        )}
      </div>

      {/* Status bar */}
      <div className='flex items-center justify-between h-6 px-3 bg-[#252525] border-t border-white/5 text-[11px] text-[#888] shrink-0'>
        <span>{displayName}</span>
        <span>
          {zoom}% — {rotation}°
        </span>
      </div>
    </div>
  );
};

const ToolBtn = ({
  children,
  onClick,
  title,
}: {
  children: React.ReactNode;
  onClick: () => void;
  title: string;
}) => (
  <button
    onClick={onClick}
    title={title}
    className='w-8 h-8 rounded border-none bg-transparent text-[#ccc] cursor-pointer flex items-center justify-center transition-[background] duration-100 hover:bg-white/10'
  >
    {children}
  </button>
);
