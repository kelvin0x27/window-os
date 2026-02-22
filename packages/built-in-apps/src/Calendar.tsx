'use client';

import React, { useState } from 'react';

export const CalendarApp = () => {
  const [currentDate] = useState(new Date());

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0,
  ).getDate();
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1,
  ).getDay();

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const calendarGrid = [];
  let dayCounter = 1;

  for (let i = 0; i < 6; i++) {
    const week = [];
    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < firstDayOfMonth) {
        week.push(null);
      } else if (dayCounter <= daysInMonth) {
        week.push(dayCounter);
        dayCounter++;
      } else {
        week.push(null);
      }
    }
    calendarGrid.push(week);
    if (dayCounter > daysInMonth) break;
  }

  const events = [
    { id: 1, title: 'Team Standup', time: '10:00 AM', color: 'bg-blue-600' },
    {
      id: 2,
      title: 'Lunch with Client',
      time: '12:30 PM',
      color: 'bg-green-600',
    },
    {
      id: 3,
      title: 'Sync with Design',
      time: '3:00 PM',
      color: 'bg-purple-600',
    },
  ];

  return (
    <div className='flex h-full w-full bg-[#1c1c1c] text-white font-sans select-none'>
      {/* Sidebar */}
      <div className='w-56 bg-[#181818] border-r border-[#333] flex flex-col'>
        <div className='h-14 flex items-center px-4 shrink-0'>
          <button className='flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors w-full shadow-md'>
            <svg width='16' height='16' viewBox='0 0 16 16' fill='none'>
              <path
                d='M8 2v12m-6-6h12'
                stroke='currentColor'
                strokeWidth='1.5'
                strokeLinecap='round'
              />
            </svg>
            <span className='font-semibold text-sm'>New event</span>
          </button>
        </div>

        <div className='p-4 pt-2 flex-1 overflow-y-auto'>
          {/* Mini Calendar */}
          <div className='mb-6'>
            <div className='flex items-center justify-between font-semibold mb-3 px-1'>
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              <div className='flex gap-2 text-gray-400'>
                <button className='hover:text-white'>↑</button>
                <button className='hover:text-white'>↓</button>
              </div>
            </div>
            <div className='grid grid-cols-7 gap-1 text-center text-xs'>
              {days.map((d) => (
                <div key={d} className='text-gray-400 font-semibold mb-2'>
                  {d.charAt(0)}
                </div>
              ))}
              {calendarGrid.map((week, i) => (
                <React.Fragment key={i}>
                  {week.map((day, j) => (
                    <div
                      key={`${i}-${j}`}
                      className={`w-6 h-6 flex items-center justify-center rounded-full mx-auto ${day === currentDate.getDate() ? 'bg-blue-600 text-white font-bold' : day ? 'hover:bg-white/10 cursor-pointer' : ''}`}
                    >
                      {day}
                    </div>
                  ))}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Calendars List */}
          <div>
            <h3 className='text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3'>
              My Calendars
            </h3>
            <label className='flex items-center gap-3 mb-2 cursor-pointer group'>
              <div className='w-4 h-4 rounded border-2 border-blue-500 bg-blue-500 flex items-center justify-center group-active:scale-95 transition-transform'>
                <svg width='10' height='10' viewBox='0 0 16 16' fill='white'>
                  <path
                    d='M2 8l4 4 8-8'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </div>
              <span className='text-sm text-gray-200'>Personal</span>
            </label>
            <label className='flex items-center gap-3 mb-2 cursor-pointer group'>
              <div className='w-4 h-4 rounded border-2 border-green-500 bg-green-500 flex items-center justify-center group-active:scale-95 transition-transform'>
                <svg width='10' height='10' viewBox='0 0 16 16' fill='white'>
                  <path
                    d='M2 8l4 4 8-8'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </div>
              <span className='text-sm text-gray-200'>Work</span>
            </label>
          </div>
        </div>

        <div className='h-12 border-t border-[#333] flex items-center justify-between px-4 text-gray-400'>
          <button className='hover:bg-white/10 p-2 rounded transition-colors text-blue-400'>
            <svg width='18' height='18' viewBox='0 0 24 24'>
              <path
                d='M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7v-5z'
                fill='currentColor'
              />
            </svg>
          </button>
          <button className='hover:bg-white/10 p-2 rounded transition-colors'>
            <svg width='18' height='18' viewBox='0 0 24 24'>
              <path
                d='M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.06-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.73,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.06,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.43-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.49-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z'
                fill='currentColor'
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Main Calendar View */}
      <div className='flex-1 flex flex-col'>
        {/* Action Bar */}
        <div className='h-14 flex items-center px-6 border-b border-[#333] mb-4 gap-4 shrink-0'>
          <h1 className='text-2xl font-semibold min-w-40'>
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h1>
          <div className='flex items-center gap-1 bg-[#2d2d2d] rounded px-1'>
            <button className='px-3 py-1.5 text-sm font-semibold rounded hover:bg-white/10'>
              Day
            </button>
            <button className='px-3 py-1.5 text-sm font-semibold rounded bg-[#4a4a4a]'>
              Work week
            </button>
            <button className='px-3 py-1.5 text-sm font-semibold rounded hover:bg-white/10'>
              Week
            </button>
            <button className='px-3 py-1.5 text-sm font-semibold rounded hover:bg-white/10'>
              Month
            </button>
          </div>
          <div className='flex-1' />
          <button className='text-base px-2 py-1 rounded hover:bg-white/10 text-gray-400'>
            Today
          </button>
          <div className='flex gap-1'>
            <button className='w-8 h-8 rounded hover:bg-white/10 flex items-center justify-center font-bold text-gray-400'>
              ↑
            </button>
            <button className='w-8 h-8 rounded hover:bg-white/10 flex items-center justify-center font-bold text-gray-400'>
              ↓
            </button>
          </div>
        </div>

        {/* Daily Column Mockup */}
        <div className='flex-1 overflow-y-auto px-6 pb-6 relative'>
          {/* Fixed Time Axis */}
          <div className='absolute left-6 top-0 bottom-0 w-16 border-r border-[#333] pt-6'>
            {[8, 9, 10, 11, 12, 1, 2, 3, 4, 5].map((hour) => (
              <div
                key={hour}
                className='h-16 text-right pr-4 text-xs font-medium text-gray-500'
              >
                {hour === 12 ? '12 PM' : hour < 6 ? `${hour} PM` : `${hour} AM`}
              </div>
            ))}
          </div>

          {/* Day Columns Container */}
          <div className='ml-16 flex-1 flex relative border-t border-[#333] pt-6'>
            {/* Day Headers */}
            <div className='absolute -top-10 left-0 right-0 flex'>
              {['Mon 12', 'Tue 13', 'Wed 14', 'Thu 15', 'Fri 16'].map(
                (day, i) => (
                  <div
                    key={day}
                    className={`flex-1 text-center pb-2 border-b-2 text-sm font-semibold ${i === 2 ? 'border-blue-500 text-blue-500' : 'border-transparent text-gray-400'}`}
                  >
                    {day}
                  </div>
                ),
              )}
            </div>

            {/* Grid lines */}
            <div className='absolute inset-0 pointer-events-none'>
              {[...Array(10)].map((_, i) => (
                <div
                  key={i}
                  className='h-16 w-full border-b border-[#333]/50'
                />
              ))}
            </div>

            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day, colIdx) => (
              <div
                key={day}
                className={`flex-1 relative border-r border-[#333]/30 ${colIdx === 2 ? 'bg-blue-500/5' : ''}`}
              >
                {colIdx === 2 &&
                  events.map((event, idx) => (
                    <div
                      key={event.id}
                      className={`absolute left-1 right-1 p-2 rounded shadow-sm text-sm cursor-pointer hover:brightness-110 active:scale-95 transition-all ${event.color}`}
                      style={{
                        top: `${(idx + 1) * 64 + 16}px`,
                        height: '56px',
                        borderLeft: '4px solid rgba(255,255,255,0.4)',
                      }}
                    >
                      <div className='font-semibold truncate leading-tight'>
                        {event.title}
                      </div>
                      <div className='text-xs opacity-90'>{event.time}</div>
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
