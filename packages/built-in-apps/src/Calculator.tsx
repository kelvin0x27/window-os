'use client';

import React, { useState } from 'react';

export const CalculatorApp = () => {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');
  const [prevVal, setPrevVal] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForNewVal, setWaitingForNewVal] = useState(false);

  const handleNum = (num: string) => {
    if (waitingForNewVal) {
      setDisplay(num);
      setWaitingForNewVal(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const handleOp = (op: string) => {
    const current = parseFloat(display);

    if (prevVal === null) {
      setPrevVal(current);
      setEquation(`${current} ${op}`);
    } else if (operator && !waitingForNewVal) {
      const result = calculate(prevVal, current, operator);
      setDisplay(String(result));
      setPrevVal(result);
      setEquation(`${result} ${op}`);
    } else {
      setEquation(`${current} ${op}`);
    }

    setOperator(op);
    setWaitingForNewVal(true);
  };

  const calculate = (a: number, b: number, op: string) => {
    switch (op) {
      case '+':
        return a + b;
      case '-':
        return a - b;
      case '×':
        return a * b;
      case '÷':
        return b === 0 ? NaN : a / b;
      default:
        return b;
    }
  };

  const handleEqual = () => {
    if (operator && prevVal !== null) {
      const current = parseFloat(display);
      const result = calculate(prevVal, current, operator);
      setDisplay(String(result));
      setEquation(`${prevVal} ${operator} ${current} =`);
      setPrevVal(result);
      setOperator(null);
      setWaitingForNewVal(true);
    }
  };

  const handleCommand = (cmd: string) => {
    switch (cmd) {
      case 'C':
        setDisplay('0');
        setEquation('');
        setPrevVal(null);
        setOperator(null);
        setWaitingForNewVal(false);
        break;
      case 'CE':
        setDisplay('0');
        break;
      case '⌫':
        setDisplay(display.length > 1 ? display.slice(0, -1) : '0');
        break;
      case '.':
        if (!display.includes('.')) setDisplay(display + '.');
        break;
      case '±':
        setDisplay(String(parseFloat(display) * -1));
        break;
    }
  };

  const buttons = [
    ['%', 'CE', 'C', '⌫'],
    ['1/x', 'x²', '√x', '÷'],
    ['7', '8', '9', '×'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['±', '0', '.', '='],
  ];

  return (
    <div className='flex flex-col h-full w-full bg-[#202020] text-white font-sans p-1 select-none'>
      {/* Header Options */}
      <div className='flex items-center h-10 px-2'>
        <button className='p-2 hover:bg-white/10 rounded-md transition-colors'>
          <svg width='16' height='16' viewBox='0 0 16 16' fill='currentColor'>
            <path d='M2 4h12v1H2zM2 7h12v1H2zM2 10h12v1H2z' />
          </svg>
        </button>
        <span className='ml-2 text-sm font-semibold tracking-wide'>
          Standard
        </span>
        <button className='p-2 hover:bg-white/10 rounded-md transition-colors ml-1'>
          <svg width='12' height='12' viewBox='0 0 16 16' fill='currentColor'>
            <path d='M5 1v14M12 1v14' stroke='currentColor' strokeWidth='1.5' />
          </svg>
        </button>
        <div className='flex-1' />
        <button className='p-2 hover:bg-white/10 rounded-md transition-colors'>
          <svg width='16' height='16' viewBox='0 0 16 16' fill='currentColor'>
            <path d='M8 12a4 4 0 100-8 4 4 0 000 8zm0-1.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z' />
          </svg>
        </button>
      </div>

      {/* Screen */}
      <div className='flex flex-col items-end justify-end px-4 py-2 mt-2 mb-4 h-24'>
        <div className='text-[#888] text-sm h-6 mb-1 tracking-wide'>
          {equation}
        </div>
        <div
          className='text-5xl font-semibold tracking-tight'
          style={{ fontSize: display.length > 10 ? '36px' : '48px' }}
        >
          {display}
        </div>
      </div>

      {/* Memory row */}
      <div className='flex items-center justify-between px-1 mb-2 text-xs text-[#ccc] opacity-50'>
        {['MC', 'MR', 'M+', 'M-', 'MS', 'M▾'].map((m) => (
          <button
            key={m}
            className='flex-1 text-center py-2 hover:bg-white/10 rounded transition-colors cursor-not-allowed'
          >
            {m}
          </button>
        ))}
      </div>

      {/* Buttons Grid */}
      <div className='grid grid-cols-4 gap-1 flex-1 px-1 pb-1'>
        {buttons.map((row, i) => (
          <React.Fragment key={i}>
            {row.map((btn) => {
              const isNum = !isNaN(parseFloat(btn));
              const isOp = ['÷', '×', '-', '+', '='].includes(btn);
              return (
                <button
                  key={btn}
                  onClick={() => {
                    if (isNum) handleNum(btn);
                    else if (isOp && btn !== '=') handleOp(btn);
                    else if (btn === '=') handleEqual();
                    else handleCommand(btn);
                  }}
                  className={`
                    rounded-md text-sm font-medium transition-all active:scale-[0.97]
                    ${isNum || btn === '.' || btn === '±' ? 'bg-[#333] hover:bg-[#3a3a3a] text-white ' : ''}
                    ${!isNum && btn !== '=' && btn !== '.' && btn !== '±' ? 'bg-[#2b2b2b] hover:bg-[#323232] text-[#e0e0e0]' : ''}
                    ${btn === '=' ? 'bg-[#005fb8] hover:bg-[#0074e0] text-white' : ''}
                  `}
                >
                  {btn}
                </button>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
