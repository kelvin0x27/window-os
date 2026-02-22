'use client';

import React, { useState } from 'react';

export const MailApp = () => {
  const [activeFolder, setActiveFolder] = useState('Inbox');
  const [activeMail, setActiveMail] = useState<number | null>(1);

  const folders = [
    { name: 'Inbox', icon: '📥', count: 3 },
    { name: 'Drafts', icon: '📝', count: 0 },
    { name: 'Sent Items', icon: '📤', count: 12 },
    { name: 'Deleted Items', icon: '🗑️', count: 45 },
    { name: 'Junk Email', icon: '⚠️', count: 2 },
  ];

  const emails = [
    {
      id: 1,
      sender: 'Microsoft Team',
      subject: 'Welcome to your new Windows 11 PC!',
      preview: 'Get started with these tips to master your new...',
      time: '10:42 AM',
      unread: true,
    },
    {
      id: 2,
      sender: 'GitHub',
      subject: '[GitHub] Please verify your device',
      preview: 'We detected a new sign-in to your GitHub account...',
      time: 'Yesterday',
      unread: true,
    },
    {
      id: 3,
      sender: 'Spotify',
      subject: 'Your week in music is here',
      preview: 'Discover new releases from your favorite artists, curated...',
      time: 'Monday',
      unread: false,
    },
    {
      id: 4,
      sender: 'Netflix',
      subject: 'New arrivals just for you',
      preview: 'See what is new this week. We have added highly requested...',
      time: 'Oct 12',
      unread: false,
    },
  ];

  const activeEmailData = emails.find((e) => e.id === activeMail);

  return (
    <div className='flex h-full w-full bg-[#1c1c1c] text-white font-sans select-none'>
      {/* Sidebar - Folders */}
      <div className='w-48 bg-[#181818] border-r border-white/5 flex flex-col'>
        <div className='h-12 flex items-center px-4 shrink-0'>
          <button className='flex items-center gap-2 hover:bg-white/10 px-2 py-1 rounded transition-colors text-sm font-semibold'>
            <div className='w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-xs'>
              A
            </div>
            Personal
            <svg width='10' height='10' viewBox='0 0 10 10' fill='none'>
              <path
                d='M2 3l3 3 3-3'
                stroke='currentColor'
                strokeWidth='1.5'
                strokeLinecap='round'
              />
            </svg>
          </button>
        </div>

        <div className='px-2 flex-1 overflow-y-auto'>
          <button className='w-full flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md mb-4 mt-2 transition-colors'>
            <svg width='14' height='14' viewBox='0 0 16 16' fill='none'>
              <path
                d='M8 2v12m-6-6h12'
                stroke='currentColor'
                strokeWidth='1.5'
                strokeLinecap='round'
              />
            </svg>
            <span className='text-sm font-semibold'>New mail</span>
          </button>

          <div className='text-xs font-semibold text-gray-400 px-2 mb-2'>
            Favorites
          </div>

          {folders.map((folder) => (
            <button
              key={folder.name}
              onClick={() => setActiveFolder(folder.name)}
              className={`w-full flex items-center justify-between px-2 py-1.5 rounded transition-colors text-sm ${activeFolder === folder.name ? 'bg-white/10 font-semibold' : 'hover:bg-white/5 text-gray-300'}`}
            >
              <div className='flex items-center gap-3'>
                <span>{folder.icon}</span>
                <span className='truncate'>{folder.name}</span>
              </div>
              {folder.count > 0 && (
                <span className='text-xs font-semibold'>{folder.count}</span>
              )}
            </button>
          ))}
        </div>

        <div className='h-10 mt-auto border-t border-white/5 flex items-center px-4 gap-4'>
          <button className='hover:bg-white/10 p-1.5 rounded transition-colors text-blue-400'>
            <svg width='16' height='16' viewBox='0 0 24 24'>
              <path
                d='M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z'
                fill='currentColor'
              />
            </svg>
          </button>
          <button className='hover:bg-white/10 p-1.5 rounded transition-colors text-gray-400'>
            <svg width='16' height='16' viewBox='0 0 24 24'>
              <path
                d='M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7v-5z'
                fill='currentColor'
              />
            </svg>
          </button>
          <div className='flex-1' />
          <button className='hover:bg-white/10 p-1.5 rounded transition-colors text-gray-400'>
            <svg width='16' height='16' viewBox='0 0 24 24'>
              <path
                d='M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.06-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.73,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.06,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.43-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.49-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z'
                fill='currentColor'
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Message List */}
      <div className='w-80 bg-[#1c1c1c] border-r border-white/5 flex flex-col'>
        <div className='h-12 flex items-center justify-between px-4 shrink-0 border-b border-white/5'>
          <h2 className='font-bold text-lg'>{activeFolder}</h2>
          <div className='flex items-center gap-1'>
            <button className='w-8 h-8 rounded hover:bg-white/10 flex items-center justify-center transition-colors'>
              <svg width='16' height='16' viewBox='0 0 24 24'>
                <path
                  d='M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z'
                  fill='currentColor'
                />
              </svg>
            </button>
            <button className='w-8 h-8 rounded hover:bg-white/10 flex items-center justify-center transition-colors'>
              <svg width='20' height='20' viewBox='0 0 24 24'>
                <path
                  d='M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z'
                  fill='currentColor'
                />
              </svg>
            </button>
          </div>
        </div>
        <div className='flex items-center gap-4 px-4 py-2 border-b border-white/5 shrink-0 text-sm font-semibold'>
          <button className='text-blue-400'>Focused</button>
          <button className='text-gray-400 hover:text-white transition-colors'>
            Other
          </button>
        </div>

        <div className='flex-1 overflow-y-auto w-full'>
          {emails.map((email) => (
            <button
              key={email.id}
              onClick={() => setActiveMail(email.id)}
              className={`w-full text-left p-3 border-l-4 transition-colors relative flex flex-col ${activeMail === email.id ? 'bg-white/10 border-blue-500' : 'border-transparent hover:bg-white/5'} ${email.unread ? 'bg-white/5 border-l-blue-500' : ''}`}
            >
              <div className='flex items-center justify-between mb-1'>
                <span
                  className={`text-sm truncate pr-2 ${email.unread ? 'font-bold' : 'font-semibold text-gray-200'}`}
                >
                  {email.sender}
                </span>
                <span
                  className={`text-xs whitespace-nowrap ${email.unread ? 'text-blue-400 font-bold' : 'text-gray-400'}`}
                >
                  {email.time}
                </span>
              </div>
              <span
                className={`text-[13px] truncate w-full block mb-1 ${email.unread ? 'font-semibold text-white' : 'text-gray-300'}`}
              >
                {email.subject}
              </span>
              <span className='text-xs text-gray-500 truncate w-full block'>
                {email.preview}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Message Preview */}
      <div className='flex-1 bg-[#191919] flex flex-col'>
        {activeEmailData ? (
          <>
            <div className='h-12 flex items-center justify-end px-4 gap-1 shrink-0 border-b border-white/5 text-gray-400'>
              <button className='w-8 h-8 rounded hover:bg-white/10 flex items-center justify-center'>
                <span className='text-sm'>↩️</span>
              </button>
              <button className='w-8 h-8 rounded hover:bg-white/10 flex items-center justify-center'>
                <span className='text-sm transform scale-x-[-1] inline-block'>
                  ↩️
                </span>
              </button>
              <button className='w-8 h-8 rounded hover:bg-white/10 flex items-center justify-center text-[#ff4b4b]'>
                <span className='text-sm'>🗑️</span>
              </button>
              <button className='w-8 h-8 rounded hover:bg-white/10 flex items-center justify-center'>
                <span className='text-sm'>•••</span>
              </button>
            </div>

            <div className='p-8 flex-1 overflow-y-auto max-w-4xl'>
              <h1 className='text-2xl font-semibold mb-6'>
                {activeEmailData.subject}
              </h1>
              <div className='flex items-center gap-3 mb-8'>
                <div className='w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-lg font-bold shadow-md'>
                  {activeEmailData.sender.charAt(0)}
                </div>
                <div>
                  <div className='font-semibold text-sm'>
                    {activeEmailData.sender}
                  </div>
                  <div className='text-xs text-gray-400'>
                    To: You • {activeEmailData.time}
                  </div>
                </div>
              </div>

              <div className='text-sm text-gray-300 leading-relaxed max-w-2xl'>
                <p className='mb-4'>Hi there,</p>
                <p className='mb-4'>{activeEmailData.preview}</p>
                <p className='mb-4'>
                  We're excited to have you on board. Here are some quick tips
                  to get you started:
                </p>
                <ul className='list-disc pl-5 mb-4 space-y-2'>
                  <li>Check out the new centralized taskbar.</li>
                  <li>Snap layouts help you arrange windows seamlessly.</li>
                  <li>
                    Widgets keep you up to date with the things you care about.
                  </li>
                </ul>
                <p>Thanks,</p>
                <p className='font-semibold'>{activeEmailData.sender}</p>

                <div className='mt-8 pt-6 border-t border-white/10'>
                  <button className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-semibold text-sm transition-colors'>
                    Reply
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className='flex-1 flex items-center justify-center text-gray-500'>
            Select an item to read
          </div>
        )}
      </div>
    </div>
  );
};
