'use client';

import React, { useState } from 'react';

export const StoreApp = () => {
  const [activeTab, setActiveTab] = useState('Home');

  const tabs = [
    {
      name: 'Home',
      icon: (
        <svg width='16' height='16' viewBox='0 0 16 16'>
          <path d='M8 1L1 7h2v7h4v-4h2v4h4V7h2L8 1z' fill='currentColor' />
        </svg>
      ),
    },
    {
      name: 'Apps',
      icon: (
        <svg width='16' height='16' viewBox='0 0 16 16'>
          <path
            d='M2 2h4v4H2V2zm6 0h4v4H8V2zm-6 6h4v4H2V8zm6 0h4v4H8V8z'
            fill='currentColor'
          />
        </svg>
      ),
    },
    {
      name: 'Gaming',
      icon: (
        <svg width='16' height='16' viewBox='0 0 16 16'>
          <path
            d='M2 5h12v6H2V5zm3 3h2v2H5V8zm4 0h2v2H9V8z'
            fill='currentColor'
          />
        </svg>
      ),
    },
    {
      name: 'Movies & TV',
      icon: (
        <svg width='16' height='16' viewBox='0 0 16 16'>
          <path
            d='M2 3h12v10H2V3zm2 2v6h8V5H4zm2 2h4v2H6V7z'
            fill='currentColor'
          />
        </svg>
      ),
    },
  ];

  const featuredApps = [
    {
      name: 'WhatsApp',
      developer: 'WhatsApp Inc.',
      rating: '4.5',
      icon: '📞',
      price: 'Free',
    },
    {
      name: 'Netflix',
      developer: 'Netflix, Inc.',
      rating: '4.7',
      icon: '▶',
      price: 'Free',
    },
    {
      name: 'Spotify',
      developer: 'Spotify AB',
      rating: '4.6',
      icon: '🎵',
      price: 'Free',
    },
    {
      name: 'TikTok',
      developer: 'TikTok Pte. Ltd.',
      rating: '4.4',
      icon: '📱',
      price: 'Free',
    },
    {
      name: 'Discord',
      developer: 'Discord Inc.',
      rating: '4.8',
      icon: '💬',
      price: 'Free',
    },
    {
      name: 'iTunes',
      developer: 'Apple Inc.',
      rating: '4.1',
      icon: '🍎',
      price: 'Free',
    },
  ];

  return (
    <div className='flex h-full w-full bg-[#1c1c1c] text-white font-sans select-none'>
      {/* Sidebar */}
      <div className='w-16 md:w-48 bg-[#181818] border-r border-[#333] flex flex-col pt-2 transition-all duration-300'>
        {tabs.map((tab) => (
          <button
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className={`flex items-center gap-3 w-full h-10 px-0 md:px-4 mb-2 relative transition-colors ${activeTab === tab.name ? 'text-white' : 'text-[#a0a0a0] hover:text-white hover:bg-white/5'}`}
          >
            {activeTab === tab.name && (
              <div className='absolute left-0 top-2 bottom-2 w-1 bg-[#0078d4] rounded-r-full' />
            )}
            <div className='w-full md:w-auto flex justify-center md:block'>
              {tab.icon}
            </div>
            <span className='hidden md:block text-xs font-semibold tracking-wide'>
              {tab.name}
            </span>
          </button>
        ))}
        <div className='flex-1' />
        <button className='flex items-center gap-3 w-full h-10 px-0 md:px-4 mb-4 text-[#a0a0a0] hover:text-white hover:bg-white/5 transition-colors'>
          <div className='w-full md:w-auto flex justify-center md:block'>
            <svg width='16' height='16' viewBox='0 0 16 16'>
              <path
                d='M8 12a4 4 0 100-8 4 4 0 000 8zm0-1.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z'
                fill='currentColor'
              />
            </svg>
          </div>
          <span className='hidden md:block text-xs font-semibold tracking-wide'>
            Library
          </span>
        </button>
      </div>

      {/* Content Area */}
      <div className='flex-1 flex flex-col overflow-hidden relative'>
        {/* Search Bar */}
        <div className='h-14 flex items-center justify-center border-b border-[#333] shrink-0 absolute top-0 w-full bg-[#1c1c1c]/80 backdrop-blur-md z-10'>
          <div className='w-full max-w-lg mx-4 bg-[#2d2d2d] border border-[#444] rounded h-8 flex items-center px-3 focus-within:border-[#0078d4] focus-within:ring-1 focus-within:ring-[#0078d4] transition-all'>
            <svg
              width='14'
              height='14'
              viewBox='0 0 16 16'
              className='text-gray-400 mr-2'
            >
              <circle
                cx='6'
                cy='6'
                r='4'
                stroke='currentColor'
                strokeWidth='1.5'
                fill='none'
              />
              <path
                d='M9 9L14 14'
                stroke='currentColor'
                strokeWidth='1.5'
                strokeLinecap='round'
              />
            </svg>
            <input
              type='text'
              placeholder={`Search ${activeTab}`}
              className='bg-transparent border-none outline-none text-xs w-full text-white placeholder-gray-400'
            />
          </div>
        </div>

        <div className='flex-1 overflow-y-auto p-6 pt-20'>
          <h1 className='text-3xl font-bold mb-6 tracking-tight'>
            {activeTab}
          </h1>

          {/* Hero Banner */}
          <div className='w-full h-64 bg-gradient-to-tr from-[#004b8b] to-[#0078d4] rounded-xl mb-8 p-8 flex flex-col justify-end shadow-lg relative overflow-hidden group cursor-pointer'>
            <div className='absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors z-0' />
            <div className='relative z-10'>
              <h2 className='text-white text-sm font-bold tracking-wider mb-2 uppercase opacity-80'>
                Featured App
              </h2>
              <h3 className='text-white text-4xl font-extrabold tracking-tight mb-2'>
                Microsoft Copilot
              </h3>
              <p className='text-white/80 text-sm max-w-md'>
                Your everyday AI companion. Get answers, create content, and
                boost productivity automatically.
              </p>
              <button className='mt-4 bg-white/20 hover:bg-white/30 text-white border border-white/10 px-6 py-2 rounded font-semibold text-sm transition-all shadow-md active:scale-95'>
                Get
              </button>
            </div>
          </div>

          {/* Top Free Apps Grid */}
          <div className='flex items-center justify-between mb-4'>
            <h2 className='text-xl font-bold tracking-wide'>Top free apps</h2>
            <button className='text-[#0078d4] text-xs font-semibold hover:underline'>
              See all
            </button>
          </div>

          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4'>
            {featuredApps.map((app) => (
              <div
                key={app.name}
                className='bg-[#2b2b2b] p-4 rounded-lg flex flex-col items-center cursor-pointer hover:bg-[#333] transition-colors border border-transparent hover:border-[#444]'
              >
                <div className='w-16 h-16 bg-[#1f1f1f] rounded-2xl mb-3 flex items-center justify-center text-3xl shadow-inner'>
                  {app.icon}
                </div>
                <span className='font-semibold text-sm text-center truncate w-full'>
                  {app.name}
                </span>
                <span className='text-xs text-gray-400 mt-0.5 truncate w-full text-center'>
                  {app.developer}
                </span>
                <div className='flex items-center justify-between w-full mt-3'>
                  <span className='text-xs font-bold text-[#e1e1e1]'>
                    {app.price}
                  </span>
                  <div className='flex items-center gap-1 text-[10px] text-gray-400'>
                    <span>{app.rating}</span>
                    <svg width='8' height='8' viewBox='0 0 24 24'>
                      <path
                        d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z'
                        fill='#f1c40f'
                      />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
