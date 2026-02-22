'use client';

import React, { useState } from 'react';

export const EdgeBrowserApp = () => {
  const [urlInput, setUrlInput] = useState('');
  const [currentUrl, setCurrentUrl] = useState('');
  const [isHome, setIsHome] = useState(true);

  const handleNavigate = (e: React.FormEvent) => {
    e.preventDefault();
    let query = urlInput.trim();
    if (!query) return;

    // Simple URL detection
    if (!query.startsWith('http://') && !query.startsWith('https://')) {
      if (query.includes('.') && !query.includes(' ')) {
        query = 'https://' + query;
      } else {
        // Search
        query = 'https://www.bing.com/search?q=' + encodeURIComponent(query);
      }
    }

    setCurrentUrl(query);
    setIsHome(false);
  };

  const goHome = () => {
    setIsHome(true);
    setUrlInput('');
    setCurrentUrl('');
  };

  return (
    <div className='flex flex-col h-full w-full bg-[#1c1c1c] text-white font-sans'>
      {/* Edge Title/Tab Bar */}
      <div className='flex items-end px-2 pt-2 h-10 bg-[#121212] shrink-0 border-b border-black select-none gap-1'>
        <div className='flex items-center gap-2 px-3 py-1.5 min-w-[200px] max-w-[240px] bg-[#2b2b2b] rounded-t-lg border border-black border-b-0 text-xs shrink-0 relative group'>
          <img
            src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'><path fill='%230078D7' d='M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm0 36c-8.82 0-16-7.18-16-16S15.18 8 24 8s16 7.18 16 16-7.18 16-16 16z'/><path fill='%2300A4EF' d='M34 22H14c-1.1 0-2-.9-2-2s.9-2 2-2h20c1.1 0 2 .9 2 2s-.9 2-2 2z'/></svg>"
            alt='Edge'
            className='w-4 h-4'
          />
          <span className='truncate'>{isHome ? 'New tab' : currentUrl}</span>
          <button className='ml-auto w-5 h-5 rounded hover:bg-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity'>
            <svg width='10' height='10' viewBox='0 0 10 10'>
              <path
                d='M1 1L9 9M9 1L1 9'
                stroke='currentColor'
                strokeWidth='1.5'
                strokeLinecap='round'
              />
            </svg>
          </button>
        </div>
        <button className='w-8 h-8 rounded hover:bg-white/10 flex items-center justify-center mb-0.5'>
          <svg width='12' height='12' viewBox='0 0 12 12'>
            <path
              d='M6 1v10M1 6h10'
              stroke='currentColor'
              strokeWidth='1.5'
              strokeLinecap='round'
            />
          </svg>
        </button>
      </div>

      {/* Address Bar Row */}
      <div className='flex items-center h-12 bg-[#2b2b2b] px-2 gap-2 shrink-0 border-b border-white/10'>
        <div className='flex gap-1'>
          <button
            className='w-8 h-8 rounded hover:bg-white/10 flex items-center justify-center'
            onClick={() => goHome()}
          >
            <svg width='14' height='14' viewBox='0 0 16 16'>
              <path
                d='M15 8H1M1 8L8 1M1 8L8 15'
                stroke='currentColor'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </button>
          <button className='w-8 h-8 rounded hover:bg-white/10 flex items-center justify-center opacity-50 cursor-not-allowed'>
            <svg width='14' height='14' viewBox='0 0 16 16'>
              <path
                d='M1 8H15M15 8L8 1M15 8L8 15'
                stroke='currentColor'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </button>
          <button className='w-8 h-8 rounded hover:bg-white/10 flex items-center justify-center'>
            <svg width='14' height='14' viewBox='0 0 16 16'>
              <path
                d='M1 4h14M1 8h14M1 12h14'
                stroke='currentColor'
                strokeWidth='1.5'
                strokeLinecap='round'
              />
            </svg>
          </button>
          <button
            className='w-8 h-8 rounded hover:bg-white/10 flex items-center justify-center'
            onClick={goHome}
          >
            <svg width='16' height='16' viewBox='0 0 24 24'>
              <path
                d='M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z'
                fill='currentColor'
              />
            </svg>
          </button>
        </div>

        <form
          onSubmit={handleNavigate}
          className='flex-1 flex items-center bg-[#1c1c1c] rounded-full px-4 h-8 border border-white/10 mx-2 focus-within:border-[#0078d4] focus-within:ring-1 focus-within:ring-[#0078d4] transition-all'
        >
          <svg
            width='14'
            height='14'
            viewBox='0 0 16 16'
            className='text-gray-400 mr-2 shrink-0'
          >
            <circle
              cx='7'
              cy='7'
              r='5'
              stroke='currentColor'
              strokeWidth='1.5'
              fill='none'
            />
            <path
              d='M11 11L15 15'
              stroke='currentColor'
              strokeWidth='1.5'
              strokeLinecap='round'
            />
          </svg>
          <input
            type='text'
            className='bg-transparent border-none outline-none text-sm w-full text-white'
            placeholder='Search or enter web address'
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
          />
        </form>

        <div className='flex gap-1'>
          <button className='w-8 h-8 rounded hover:bg-white/10 flex items-center justify-center'>
            <svg width='16' height='16' viewBox='0 0 24 24'>
              <path
                d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z'
                fill='currentColor'
              />
            </svg>
          </button>
          <button className='w-8 h-8 rounded hover:bg-white/10 flex items-center justify-center'>
            <svg width='16' height='16' viewBox='0 0 24 24'>
              <path
                d='M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z'
                fill='currentColor'
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Bookmarks Bar */}
      <div className='flex items-center h-8 bg-[#2b2b2b] px-3 gap-4 text-xs shrink-0 select-none'>
        <button className='flex items-center gap-1.5 hover:bg-white/10 px-2 py-1 rounded transition-colors'>
          <svg width='14' height='14' viewBox='0 0 24 24'>
            <path
              d='M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z'
              fill='#f1c40f'
            />
          </svg>
          Favorites
        </button>
        <button className='flex items-center gap-1.5 hover:bg-white/10 px-2 py-1 rounded transition-colors'>
          <img
            src='https://github.com/favicon.ico'
            className='w-3.5 h-3.5 rounded'
          />
          GitHub
        </button>
      </div>

      {/* Viewport */}
      <div className='flex-1 relative bg-white overflow-hidden'>
        {isHome ? (
          <div
            className='absolute inset-0 bg-[#2b2b2b] flex flex-col items-center pt-24'
            style={{
              backgroundImage:
                'url("https://images.unsplash.com/photo-1506744626753-1fa44df31c78?q=80&w=2000&auto=format&fit=crop")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className='absolute inset-0 bg-black/40' />
            <div className='relative z-10 flex flex-col items-center w-full max-w-2xl px-6'>
              <h1 className='text-4xl font-bold text-white mb-8 drop-shadow-lg tracking-wide'>
                Microsoft Bing
              </h1>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleNavigate(e);
                }}
                className='w-full bg-white rounded-full flex items-center px-4 h-12 shadow-2xl'
              >
                <svg
                  width='20'
                  height='20'
                  viewBox='0 0 24 24'
                  className='text-gray-500 mr-2'
                >
                  <path
                    d='M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z'
                    fill='currentColor'
                  />
                </svg>
                <input
                  type='text'
                  className='flex-1 bg-transparent border-none outline-none text-black text-base h-full'
                  placeholder='Search the web'
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                />
              </form>
            </div>
          </div>
        ) : currentUrl.includes('google.com') ? (
          <div className='w-full h-full bg-white flex flex-col items-center pt-32 font-sans'>
            <h1 className='text-7xl font-sans font-medium text-black tracking-tighter mb-8 select-none'>
              <span className='text-[#4285F4]'>G</span>
              <span className='text-[#EA4335]'>o</span>
              <span className='text-[#FBBC05]'>o</span>
              <span className='text-[#4285F4]'>g</span>
              <span className='text-[#34A853]'>l</span>
              <span className='text-[#EA4335]'>e</span>
            </h1>
            <div className='w-full max-w-xl flex items-center border border-gray-200 rounded-full px-4 py-3 hover:shadow-md transition-shadow'>
              <svg
                width='20'
                height='20'
                viewBox='0 0 24 24'
                fill='#9aa0A6'
                className='mr-3'
              >
                <path d='M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z' />
              </svg>
              <input
                type='text'
                className='flex-1 border-none outline-none text-black text-base'
                defaultValue=''
              />
              <svg
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='#4285F4'
                className='ml-3'
              >
                <path d='M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z' />
                <path d='M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z' />
              </svg>
            </div>
            <div className='flex gap-3 mt-8 text-black'>
              <button className='bg-[#f8f9fa] border border-[#f8f9fa] hover:border-[#dadce0] hover:shadow-sm px-4 py-2 text-sm rounded transition-all cursor-pointer'>
                Google Search
              </button>
              <button className='bg-[#f8f9fa] border border-[#f8f9fa] hover:border-[#dadce0] hover:shadow-sm px-4 py-2 text-sm rounded transition-all cursor-pointer'>
                I'm Feeling Lucky
              </button>
            </div>
            <div className='mt-8 text-sm text-[#4d5156]'>
              Google offered in:{' '}
              <a href='#' className='text-[#1a0dab] hover:underline'>
                Tiếng Việt
              </a>{' '}
              <a href='#' className='text-[#1a0dab] hover:underline'>
                Français
              </a>
            </div>
          </div>
        ) : currentUrl.includes('bing.com/search') ? (
          <div className='w-full h-full bg-white flex flex-col items-center pt-32 font-sans select-none'>
            <h2 className='text-2xl font-semibold text-gray-800 mb-4'>
              Web OS Search (Mock)
            </h2>
            <p className='text-gray-500 mb-8 max-w-md text-center'>
              Live search engines block iframe embedding. This is a mock search
              for:{' '}
              <strong className='text-black'>
                {decodeURIComponent(currentUrl.split('q=')[1] || '')}
              </strong>
            </p>
            <div className='w-full max-w-2xl text-left border-t border-gray-200 pt-6 px-4'>
              <div className='mb-6'>
                <div className='text-sm text-[#202124]'>
                  https://en.wikipedia.org/wiki/
                  {decodeURIComponent(currentUrl.split('q=')[1] || 'WebOS')}
                </div>
                <a
                  href='#'
                  className='text-xl text-[#1a0dab] hover:underline mb-1 inline-block'
                >
                  {decodeURIComponent(
                    currentUrl.split('q=')[1] || 'Search Results',
                  )}{' '}
                  - Wikipedia
                </a>
                <p className='text-sm text-[#4d5156]'>
                  This is a simulated search result for demonstration purposes.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <iframe
            src={currentUrl}
            className='w-full h-full border-none bg-white'
            sandbox='allow-same-origin allow-scripts allow-forms allow-popups'
            title='Edge Content'
          />
        )}
      </div>
    </div>
  );
};
