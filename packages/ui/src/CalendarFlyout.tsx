'use client';

import React, { useState, useEffect } from 'react';

interface CalendarFlyoutProps {
  isOpen: boolean;
  onClose: () => void;
}

const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

export const CalendarFlyout: React.FC<CalendarFlyoutProps> = ({
  isOpen,
  onClose,
}) => {
  const [now, setNow] = useState(new Date());
  const [viewMonth, setViewMonth] = useState(new Date().getMonth());
  const [viewYear, setViewYear] = useState(new Date().getFullYear());
  const [focusMins, setFocusMins] = useState(30);

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const today = new Date();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(viewYear, viewMonth, 1).getDay();

  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else setViewMonth((m) => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else setViewMonth((m) => m + 1);
  };

  const monthStr = new Date(viewYear, viewMonth).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  // Previous month spillover
  const prevDaysInMonth = new Date(viewYear, viewMonth, 0).getDate();
  const prevDays: number[] = [];
  for (let i = firstDayOfWeek - 1; i >= 0; i--)
    prevDays.push(prevDaysInMonth - i);

  // Next month spillover
  const totalCells = prevDays.length + daysInMonth;
  const nextDaysCount = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);
  const nextDays: number[] = [];
  for (let i = 1; i <= nextDaysCount; i++) nextDays.push(i);

  const dateStr = now.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <>
      {isOpen && <div className='fixed inset-0 z-9950' onClick={onClose} />}
      <div
        className={`fixed bottom-14 right-2 w-[340px] z-9998 transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-2 pointer-events-none'
        }`}
      >
        <div className='bg-os-acrylic backdrop-blur-[60px] backdrop-saturate-150 rounded-os-flyout shadow-os-flyout font-sans overflow-hidden border border-os-border'>
          {/* Date header */}
          <div className='px-5 pt-4 pb-3 flex items-center justify-between'>
            <span
              className='text-sm font-semibold text-os-text'
              suppressHydrationWarning
            >
              {dateStr}
            </span>
            <button className='bg-transparent border-none text-os-text-secondary cursor-pointer text-xs'>
              ▼
            </button>
          </div>

          {/* Month navigation */}
          <div className='px-5 pb-2 flex items-center justify-between'>
            <span className='text-[13px] font-semibold text-os-text'>
              {monthStr}
            </span>
            <div className='flex gap-1'>
              <NavBtn onClick={prevMonth}>▲</NavBtn>
              <NavBtn onClick={nextMonth}>▼</NavBtn>
            </div>
          </div>

          {/* Day headers */}
          <div className='grid grid-cols-7 px-3'>
            {DAYS.map((d) => (
              <div
                key={d}
                className='text-center text-[11px] font-semibold text-os-text-secondary py-1'
              >
                {d}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className='grid grid-cols-7 px-3 pb-3'>
            {/* Previous month days */}
            {prevDays.map((d) => (
              <CalDay key={`prev-${d}`} day={d} faded />
            ))}
            {/* Current month days */}
            {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((d) => {
              const isToday =
                d === today.getDate() &&
                viewMonth === today.getMonth() &&
                viewYear === today.getFullYear();
              return <CalDay key={d} day={d} isToday={isToday} />;
            })}
            {/* Next month days */}
            {nextDays.map((d) => (
              <CalDay key={`next-${d}`} day={d} faded />
            ))}
          </div>

          {/* Divider */}
          <div className='h-px bg-os-border' />

          {/* Focus timer */}
          <div className='p-3 px-5 flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <FocusBtn onClick={() => setFocusMins((m) => Math.max(5, m - 5))}>
                −
              </FocusBtn>
              <span className='text-sm text-os-text min-w-[50px] text-center'>
                {focusMins} mins
              </span>
              <FocusBtn onClick={() => setFocusMins((m) => m + 5)}>+</FocusBtn>
            </div>
            <button className='flex items-center gap-1.5 py-1.5 px-3.5 rounded-os-elm border-none bg-os-hover text-os-text cursor-pointer text-xs font-medium transition-colors hover:bg-os-active'>
              ▶ Focus
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const CalDay = ({
  day,
  isToday,
  faded,
}: {
  day: number;
  isToday?: boolean;
  faded?: boolean;
}) => (
  <div
    className={`flex items-center justify-center w-9 h-9 mx-auto my-px rounded-full text-xs cursor-pointer transition-colors ${
      isToday
        ? 'bg-os-accent text-white hover:bg-os-accent'
        : faded
          ? 'text-os-text-secondary opacity-50 bg-transparent hover:bg-os-hover'
          : 'text-os-text bg-transparent hover:bg-os-hover'
    }`}
  >
    {day}
  </div>
);

const NavBtn = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className='w-6 h-6 rounded border-none bg-transparent text-os-text-secondary cursor-pointer flex items-center justify-center text-[10px] transition-colors hover:bg-os-hover'
  >
    {children}
  </button>
);

const FocusBtn = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className='w-7 h-7 rounded border border-os-border bg-transparent text-os-text-secondary cursor-pointer flex items-center justify-center text-sm transition-colors hover:bg-os-hover'
  >
    {children}
  </button>
);
