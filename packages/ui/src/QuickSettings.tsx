'use client';

import React, { useState } from 'react';

interface QuickSettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuickSettings: React.FC<QuickSettingsProps> = ({
  isOpen,
  onClose,
}) => {
  const [wifiOn, setWifiOn] = useState(true);
  const [btOn, setBtOn] = useState(true);
  const [airplaneOn, setAirplaneOn] = useState(false);
  const [energySaver, setEnergySaver] = useState(false);
  const [brightness, setBrightness] = useState(80);
  const [volume, setVolume] = useState(75);

  const toggles: {
    id: string;
    label: string;
    icon: React.ReactNode;
    active: boolean;
    onToggle: () => void;
  }[] = [
    {
      id: 'wifi',
      label: wifiOn ? 'HomeNetwork' : 'Wi-Fi',
      active: wifiOn,
      onToggle: () => setWifiOn((v) => !v),
      icon: (
        <svg width='16' height='16' viewBox='0 0 16 16' fill='none'>
          <path
            d='M8 14C8.6 14 9 13.6 9 13C9 12.4 8.6 12 8 12C7.4 12 7 12.4 7 13C7 13.6 7.4 14 8 14Z'
            fill='currentColor'
          />
          <path
            d='M3 7C4.4 5.6 6.1 5 8 5C9.9 5 11.6 5.6 13 7'
            stroke='currentColor'
            strokeWidth='1.3'
            strokeLinecap='round'
            fill='none'
          />
          <path
            d='M5.5 9.5C6.3 8.7 7.1 8.3 8 8.3C8.9 8.3 9.7 8.7 10.5 9.5'
            stroke='currentColor'
            strokeWidth='1.3'
            strokeLinecap='round'
            fill='none'
          />
        </svg>
      ),
    },
    {
      id: 'bt',
      label: btOn ? 'Not connected' : 'Bluetooth',
      active: btOn,
      onToggle: () => setBtOn((v) => !v),
      icon: (
        <svg width='16' height='16' viewBox='0 0 16 16' fill='none'>
          <path
            d='M6 4L10 8L6 12M10 8L6 4L8 2V14L6 12'
            stroke='currentColor'
            strokeWidth='1.3'
            strokeLinecap='round'
            strokeLinejoin='round'
            fill='none'
          />
        </svg>
      ),
    },
    {
      id: 'airplane',
      label: 'Airplane mode',
      active: airplaneOn,
      onToggle: () => setAirplaneOn((v) => !v),
      icon: (
        <svg width='16' height='16' viewBox='0 0 16 16' fill='none'>
          <path
            d='M8 2L8 5L3 9V10.5L8 8.5V12L6.5 13V14L8 13.5L9.5 14V13L8 12V8.5L13 10.5V9L8 5V2Z'
            fill='currentColor'
          />
        </svg>
      ),
    },
    {
      id: 'energy',
      label: 'Energy saver',
      active: energySaver,
      onToggle: () => setEnergySaver((v) => !v),
      icon: (
        <svg width='16' height='16' viewBox='0 0 16 16' fill='none'>
          <path d='M6 2L4 8H7L5 14L12 7H8L10 2H6Z' fill='currentColor' />
        </svg>
      ),
    },
    {
      id: 'a11y',
      label: 'Accessibility',
      active: false,
      onToggle: () => {},
      icon: (
        <svg width='16' height='16' viewBox='0 0 16 16' fill='none'>
          <circle cx='8' cy='3.5' r='1.5' fill='currentColor' />
          <path
            d='M4 6.5H12M8 6.5V10M5.5 14L8 10L10.5 14'
            stroke='currentColor'
            strokeWidth='1.2'
            strokeLinecap='round'
            strokeLinejoin='round'
            fill='none'
          />
        </svg>
      ),
    },
    {
      id: 'project',
      label: 'Project',
      active: false,
      onToggle: () => {},
      icon: (
        <svg width='16' height='16' viewBox='0 0 16 16' fill='none'>
          <rect
            x='1'
            y='3'
            width='6'
            height='10'
            rx='1'
            stroke='currentColor'
            strokeWidth='1.2'
            fill='none'
          />
          <rect
            x='9'
            y='3'
            width='6'
            height='10'
            rx='1'
            stroke='currentColor'
            strokeWidth='1.2'
            fill='none'
          />
        </svg>
      ),
    },
  ];

  return (
    <>
      {isOpen && <div className='fixed inset-0 z-9950' onClick={onClose} />}
      <div
        className={`fixed bottom-14 right-2 w-[320px] z-9998 transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-2 pointer-events-none'
        }`}
      >
        <div className='bg-os-acrylic backdrop-blur-[60px] backdrop-saturate-150 rounded-os-flyout shadow-os-flyout font-sans overflow-hidden border border-os-border p-4'>
          {/* Toggle buttons grid */}
          <div className='grid grid-cols-3 gap-1 mb-4'>
            {toggles.map((t) => (
              <button
                key={t.id}
                onClick={t.onToggle}
                className={`flex flex-col items-center gap-1.5 pt-3 px-2 pb-2 rounded-md border-none cursor-pointer transition-colors min-h-[64px] ${
                  t.active
                    ? 'bg-os-accent text-white hover:bg-os-accent'
                    : 'bg-os-hover text-os-text-secondary hover:bg-os-active'
                }`}
              >
                <div className='w-5 h-5 flex items-center justify-center'>
                  {t.icon}
                </div>
                <span className='text-[10px] text-center leading-[13px]'>
                  {t.label}
                </span>
              </button>
            ))}
          </div>

          {/* Brightness slider */}
          <div className='flex items-center gap-2.5 py-1 mb-2'>
            <svg
              width='16'
              height='16'
              viewBox='0 0 16 16'
              fill='none'
              className='text-os-text-secondary'
            >
              <circle cx='8' cy='8' r='3' fill='currentColor' />
              <path
                d='M8 2V4M8 12V14M2 8H4M12 8H14M4 4L5.5 5.5M10.5 10.5L12 12M12 4L10.5 5.5M5.5 10.5L4 12'
                stroke='currentColor'
                strokeWidth='1.2'
                strokeLinecap='round'
              />
            </svg>
            <input
              type='range'
              min={0}
              max={100}
              value={brightness}
              onChange={(e) => setBrightness(Number(e.target.value))}
              className='flex-1 accent-os-accent h-1'
            />
          </div>

          {/* Volume slider */}
          <div className='flex items-center gap-2.5 py-1 mb-2'>
            <svg
              width='16'
              height='16'
              viewBox='0 0 16 16'
              fill='none'
              className='text-os-text-secondary'
            >
              <path d='M2 6V10H5L9 13V3L5 6H2Z' fill='currentColor' />
              <path
                d='M11 5.5C12 6.5 12.5 7.3 12.5 8C12.5 8.7 12 9.5 11 10.5'
                stroke='currentColor'
                strokeWidth='1.2'
                strokeLinecap='round'
                fill='none'
              />
            </svg>
            <input
              type='range'
              min={0}
              max={100}
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className='flex-1 accent-os-accent h-1'
            />
            <button className='w-6 h-6 rounded border-none bg-transparent text-os-text-secondary cursor-pointer flex items-center justify-center transition-colors hover:bg-os-hover'>
              <svg width='14' height='14' viewBox='0 0 14 14' fill='none'>
                <path
                  d='M5 3L9 7L5 11'
                  stroke='currentColor'
                  strokeWidth='1.3'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </button>
          </div>

          {/* Battery line */}
          <div className='flex items-center gap-2 py-1.5 border-t border-os-border'>
            <svg
              width='16'
              height='16'
              viewBox='0 0 16 16'
              fill='none'
              className='text-os-text-secondary'
            >
              <rect
                x='1'
                y='5'
                width='12'
                height='7'
                rx='1'
                stroke='currentColor'
                strokeWidth='1.2'
              />
              <rect
                x='13'
                y='7'
                width='2'
                height='3'
                rx='0.5'
                fill='currentColor'
              />
              <rect x='3' y='7' width='6' height='3' rx='0.5' fill='#4CAF50' />
            </svg>
            <span className='text-xs text-os-text-secondary'>
              98% remaining
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
