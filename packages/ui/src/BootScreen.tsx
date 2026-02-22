'use client';

import React, { useEffect } from 'react';
import { useOSStore } from '@web-os/os-core';

export const BootScreen: React.FC = () => {
  const { setBootPhase } = useOSStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      setBootPhase('desktop');
    }, 3200);
    return () => clearTimeout(timer);
  }, [setBootPhase]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        background: '#000',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        userSelect: 'none',
        width: '100vw',
        height: '100vh',
      }}
      className='boot-screen-container'
    >
      {/* Windows Logo */}
      <div className='mb-10 opacity-0 boot-logo-fade-in'>
        <svg
          width='88'
          height='88'
          viewBox='0 0 88 88'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <rect x='2' y='2' width='40' height='40' rx='1' fill='#0078D4' />
          <rect x='46' y='2' width='40' height='40' rx='1' fill='#0078D4' />
          <rect x='2' y='46' width='40' height='40' rx='1' fill='#0078D4' />
          <rect x='46' y='46' width='40' height='40' rx='1' fill='#0078D4' />
        </svg>
      </div>

      {/* Loading Spinner */}
      <div className='boot-spinner'>
        <div className='boot-spinner-dot' />
        <div className='boot-spinner-dot' />
        <div className='boot-spinner-dot' />
        <div className='boot-spinner-dot' />
        <div className='boot-spinner-dot' />
      </div>
    </div>
  );
};
