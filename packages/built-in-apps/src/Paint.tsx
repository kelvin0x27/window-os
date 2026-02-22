'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';

type Tool =
  | 'pencil'
  | 'eraser'
  | 'fill'
  | 'rectangle'
  | 'circle'
  | 'line'
  | 'text';

const COLORS = [
  '#000000',
  '#ffffff',
  '#808080',
  '#c0c0c0',
  '#800000',
  '#ff0000',
  '#808000',
  '#ffff00',
  '#008000',
  '#00ff00',
  '#008080',
  '#00ffff',
  '#000080',
  '#0000ff',
  '#800080',
  '#ff00ff',
  '#ff6600',
  '#ff9900',
  '#99cc00',
  '#33cccc',
];

export const PaintApp = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(3);
  const [tool, setTool] = useState<Tool>('pencil');
  const [canvasSize, setCanvasSize] = useState({ w: 800, h: 500 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (canvas && container) {
      const w = container.clientWidth - 32;
      const h = container.clientHeight - 32;
      canvas.width = Math.max(w, 400);
      canvas.height = Math.max(h, 300);
      setCanvasSize({ w: canvas.width, h: canvas.height });
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
  }, []);

  const getPos = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }, []);

  const startDrawing = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      setIsDrawing(true);
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      const pos = getPos(e);

      if (tool === 'fill') {
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        setIsDrawing(false);
        return;
      }

      ctx.beginPath();
      ctx.moveTo(pos.x, pos.y);
    },
    [tool, color, getPos],
  );

  const draw = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (!isDrawing) return;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      const pos = getPos(e);

      ctx.lineWidth = brushSize;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.strokeStyle = tool === 'eraser' ? '#ffffff' : color;

      if (tool === 'pencil' || tool === 'eraser') {
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
      }
    },
    [isDrawing, brushSize, color, tool, getPos],
  );

  const stopDrawing = useCallback(() => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx?.beginPath();
    }
  }, []);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
  };

  const tools: { id: Tool; icon: React.ReactNode; label: string }[] = [
    {
      id: 'pencil',
      label: 'Pencil',
      icon: (
        <svg width='16' height='16' viewBox='0 0 16 16' fill='none'>
          <path
            d='M2 14L1 15H15L14 14L12 12L4 4L2 6L10 14L8 14L2 14Z'
            fill='currentColor'
            opacity='0.2'
          />
          <path
            d='M11 2L14 5L6 13H3V10L11 2Z'
            stroke='currentColor'
            strokeWidth='1.2'
            strokeLinejoin='round'
          />
        </svg>
      ),
    },
    {
      id: 'eraser',
      label: 'Eraser',
      icon: (
        <svg width='16' height='16' viewBox='0 0 16 16' fill='none'>
          <rect
            x='2'
            y='8'
            width='12'
            height='5'
            rx='1'
            stroke='currentColor'
            strokeWidth='1.2'
            transform='rotate(-30 8 10.5)'
          />
          <path
            d='M4 14H12'
            stroke='currentColor'
            strokeWidth='1.2'
            strokeLinecap='round'
          />
        </svg>
      ),
    },
    {
      id: 'fill',
      label: 'Fill',
      icon: (
        <svg width='16' height='16' viewBox='0 0 16 16' fill='none'>
          <path
            d='M3 10L7 2L11 10'
            stroke='currentColor'
            strokeWidth='1.2'
            strokeLinejoin='round'
          />
          <path d='M4.5 8H9.5' stroke='currentColor' strokeWidth='1.2' />
          <path
            d='M12 10C12 10 14 12 14 13C14 14 13 14.5 12 14.5C11 14.5 10 14 10 13C10 12 12 10 12 10Z'
            fill='currentColor'
          />
        </svg>
      ),
    },
  ];

  const sizes = [1, 3, 5, 8, 12];

  return (
    <div className='flex flex-col h-full w-full bg-[#202020] text-[#e0e0e0] font-sans'>
      {/* Toolbar / Ribbon */}
      <div className='flex flex-wrap items-center gap-4 px-4 py-2 bg-[#2d2d2d] border-b border-white/5 shrink-0'>
        {/* Tools group */}
        <div className='flex flex-col items-center gap-0.5'>
          <span className='text-[10px] text-[#888]'>Tools</span>
          <div className='flex gap-0.5'>
            {tools.map((t) => (
              <button
                key={t.id}
                onClick={() => setTool(t.id)}
                title={t.label}
                className={`w-8 h-8 rounded border-none flex items-center justify-center cursor-pointer transition-[background] duration-100 ${
                  tool === t.id
                    ? 'bg-white/10 text-white'
                    : 'bg-transparent text-[#aaa] hover:bg-white/5'
                }`}
              >
                {t.icon}
              </button>
            ))}
          </div>
        </div>

        {/* Separator */}
        <div className='w-px h-10 bg-white/10' />

        {/* Brush size */}
        <div className='flex flex-col items-center gap-0.5'>
          <span className='text-[10px] text-[#888]'>Size</span>
          <div className='flex items-center gap-0.5'>
            {sizes.map((s) => (
              <button
                key={s}
                onClick={() => setBrushSize(s)}
                className={`w-7 h-7 rounded border-none flex items-center justify-center cursor-pointer transition-[background] duration-100 ${
                  brushSize === s
                    ? 'bg-white/10'
                    : 'bg-transparent hover:bg-white/5'
                }`}
              >
                <div
                  className='rounded-full bg-[#ccc]'
                  style={{
                    width: Math.max(4, s * 1.5),
                    height: Math.max(4, s * 1.5),
                  }}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Separator */}
        <div className='w-px h-10 bg-white/10' />

        {/* Colors */}
        <div className='flex flex-col items-center gap-0.5'>
          <span className='text-[10px] text-[#888]'>Colors</span>
          <div className='flex flex-wrap gap-0.5 max-w-[200px]'>
            <div
              className='w-7 h-7 rounded border-2 border-[#0078d4] mr-1'
              style={{ background: color }}
            />
            {COLORS.map((c) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                className={`w-4 h-4 rounded-sm p-0 cursor-pointer ${
                  color === c
                    ? 'border-2 border-white'
                    : 'border border-white/15'
                }`}
                style={{ background: c }}
              />
            ))}
            <input
              type='color'
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className='w-4 h-4 p-0 border-none cursor-pointer bg-transparent'
            />
          </div>
        </div>

        <div className='flex-1' />

        {/* Actions */}
        <button
          onClick={clearCanvas}
          className='px-3.5 py-1.5 rounded border-none bg-white/5 text-[#ccc] cursor-pointer text-xs transition-[background] duration-100 hover:bg-white/10'
        >
          Clear all
        </button>
      </div>

      {/* Canvas Area */}
      <div
        ref={containerRef}
        className='flex-1 overflow-auto flex items-center justify-center bg-[#1a1a1a] p-4'
      >
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseOut={stopDrawing}
          className='bg-white rounded-[2px] shadow-[0_4px_24px_rgba(0,0,0,0.5)] cursor-crosshair'
        />
      </div>

      {/* Status Bar */}
      <div className='flex items-center justify-between h-6 px-3 bg-[#252525] border-t border-white/5 text-[11px] text-[#888] shrink-0'>
        <span>
          {canvasSize.w} × {canvasSize.h}px
        </span>
        <span>
          {tool.charAt(0).toUpperCase() + tool.slice(1)} — {brushSize}px
        </span>
      </div>
    </div>
  );
};
