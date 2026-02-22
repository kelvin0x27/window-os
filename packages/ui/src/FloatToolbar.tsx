'use client';

import React, { useState } from 'react';

const OS_VERSIONS = [
  { id: 'win7', label: '7', enabled: false },
  { id: 'win8', label: '8', enabled: false },
  { id: 'win10', label: '10', enabled: false },
  { id: 'win11', label: '11', enabled: true },
] as const;

type OsVersionId = (typeof OS_VERSIONS)[number]['id'];

interface FloatToolbarProps {
  activeVersion?: OsVersionId;
  onVersionChange?: (version: OsVersionId) => void;
}

export const FloatToolbar: React.FC<FloatToolbarProps> = ({
  activeVersion = 'win11',
  onVersionChange,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div
      style={{ position: 'fixed', top: 16, right: 16, zIndex: 99990 }}
      className='select-none'
    >
      <div className='flex items-center gap-1 bg-white/80 backdrop-blur-xl rounded-full shadow-[0_2px_12px_rgba(0,0,0,0.12),0_0_0_1px_rgba(0,0,0,0.05)] px-1 py-1 transition-all duration-300'>
        {/* Toggle button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className='w-7 h-7 rounded-full flex items-center justify-center hover:bg-black/5 transition-colors text-neutral-500 shrink-0'
          title={isCollapsed ? 'Expand' : 'Collapse'}
        >
          <svg width='12' height='12' viewBox='0 0 12 12' fill='none'>
            <rect
              x='1'
              y='1'
              width='4.5'
              height='4.5'
              rx='0.8'
              fill='currentColor'
            />
            <rect
              x='6.5'
              y='1'
              width='4.5'
              height='4.5'
              rx='0.8'
              fill='currentColor'
            />
            <rect
              x='1'
              y='6.5'
              width='4.5'
              height='4.5'
              rx='0.8'
              fill='currentColor'
            />
            <rect
              x='6.5'
              y='6.5'
              width='4.5'
              height='4.5'
              rx='0.8'
              fill='currentColor'
            />
          </svg>
        </button>

        {/* OS Version Buttons */}
        {!isCollapsed && (
          <div className='flex items-center gap-0.5 pr-0.5'>
            {OS_VERSIONS.map((ver) => (
              <button
                key={ver.id}
                disabled={!ver.enabled}
                onClick={() => ver.enabled && onVersionChange?.(ver.id)}
                className={`
                  h-7 min-w-[28px] px-2 rounded-full text-[11px] font-semibold transition-all duration-200
                  ${
                    ver.id === activeVersion
                      ? 'bg-[#0078d4] text-white shadow-sm'
                      : ver.enabled
                        ? 'text-neutral-700 hover:bg-black/5 cursor-pointer'
                        : 'text-neutral-300 cursor-not-allowed'
                  }
                `}
                title={
                  ver.enabled
                    ? `Windows ${ver.label}`
                    : `Windows ${ver.label} (Coming soon)`
                }
              >
                {ver.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
