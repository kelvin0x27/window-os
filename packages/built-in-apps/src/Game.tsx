'use client';

import React, { useState, useCallback } from 'react';

const ROWS = 9;
const COLS = 9;
const MINES = 10;

interface Cell {
  mine: boolean;
  revealed: boolean;
  flagged: boolean;
  adjacent: number;
}

type GameState = 'playing' | 'won' | 'lost';

function createBoard(): Cell[][] {
  const board: Cell[][] = Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS }, () => ({
      mine: false,
      revealed: false,
      flagged: false,
      adjacent: 0,
    })),
  );
  // Place mines
  let placed = 0;
  while (placed < MINES) {
    const r = Math.floor(Math.random() * ROWS);
    const c = Math.floor(Math.random() * COLS);
    if (!board[r][c].mine) {
      board[r][c].mine = true;
      placed++;
    }
  }
  // Calculate adjacents
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (board[r][c].mine) continue;
      let count = 0;
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          const nr = r + dr,
            nc = c + dc;
          if (
            nr >= 0 &&
            nr < ROWS &&
            nc >= 0 &&
            nc < COLS &&
            board[nr][nc].mine
          )
            count++;
        }
      }
      board[r][c].adjacent = count;
    }
  }
  return board;
}

const NUM_COLORS: Record<number, string> = {
  1: '#4fc3f7',
  2: '#81c784',
  3: '#e57373',
  4: '#7986cb',
  5: '#ff8a65',
  6: '#4dd0e1',
  7: '#f06292',
  8: '#a1887f',
};

export const GameApp = () => {
  const [board, setBoard] = useState<Cell[][]>(createBoard);
  const [gameState, setGameState] = useState<GameState>('playing');
  const [time, setTime] = useState(0);
  const [timerActive, setTimerActive] = useState(false);

  // Timer
  React.useEffect(() => {
    if (!timerActive || gameState !== 'playing') return;
    const t = setInterval(() => setTime((prev) => prev + 1), 1000);
    return () => clearInterval(t);
  }, [timerActive, gameState]);

  const flagCount = board.flat().filter((c) => c.flagged).length;

  const reveal = useCallback(
    (board: Cell[][], r: number, c: number): Cell[][] => {
      if (r < 0 || r >= ROWS || c < 0 || c >= COLS) return board;
      const cell = board[r][c];
      if (cell.revealed || cell.flagged) return board;
      const newBoard = board.map((row) => row.map((cell) => ({ ...cell })));
      newBoard[r][c].revealed = true;
      if (newBoard[r][c].adjacent === 0 && !newBoard[r][c].mine) {
        const queue: [number, number][] = [[r, c]];
        while (queue.length > 0) {
          const [cr, cc] = queue.shift()!;
          for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
              const nr = cr + dr,
                nc = cc + dc;
              if (
                nr >= 0 &&
                nr < ROWS &&
                nc >= 0 &&
                nc < COLS &&
                !newBoard[nr][nc].revealed &&
                !newBoard[nr][nc].mine
              ) {
                newBoard[nr][nc].revealed = true;
                if (newBoard[nr][nc].adjacent === 0) queue.push([nr, nc]);
              }
            }
          }
        }
      }
      return newBoard;
    },
    [],
  );

  const handleClick = useCallback(
    (r: number, c: number) => {
      if (gameState !== 'playing') return;
      if (!timerActive) setTimerActive(true);
      const cell = board[r][c];
      if (cell.flagged || cell.revealed) return;

      if (cell.mine) {
        const newBoard = board.map((row) =>
          row.map((c) => (c.mine ? { ...c, revealed: true } : { ...c })),
        );
        setBoard(newBoard);
        setGameState('lost');
        return;
      }

      const newBoard = reveal(board, r, c);
      setBoard(newBoard);

      // Check win
      const unrevealed = newBoard
        .flat()
        .filter((c) => !c.revealed && !c.mine).length;
      if (unrevealed === 0) setGameState('won');
    },
    [board, gameState, timerActive, reveal],
  );

  const handleRightClick = useCallback(
    (e: React.MouseEvent, r: number, c: number) => {
      e.preventDefault();
      if (gameState !== 'playing') return;
      const cell = board[r][c];
      if (cell.revealed) return;
      const newBoard = board.map((row) => row.map((c) => ({ ...c })));
      newBoard[r][c].flagged = !newBoard[r][c].flagged;
      setBoard(newBoard);
    },
    [board, gameState],
  );

  const restart = () => {
    setBoard(createBoard());
    setGameState('playing');
    setTime(0);
    setTimerActive(false);
  };

  return (
    <div className='flex flex-col items-center justify-center h-full w-full bg-[#1a1a2e] font-sans'>
      {/* Header */}
      <div
        className='flex items-center justify-between mb-3 px-1'
        style={{ width: COLS * 36 + 8 }}
      >
        <div className='flex items-center gap-1 text-base font-mono text-[#e57373]'>
          💣 {MINES - flagCount}
        </div>
        <button
          onClick={restart}
          className='w-9 h-9 flex items-center justify-center rounded-lg border-none bg-white/10 cursor-pointer text-xl hover:bg-white/20 transition-colors'
        >
          {gameState === 'lost' ? '😵' : gameState === 'won' ? '😎' : '🙂'}
        </button>
        <div className='text-base font-mono text-[#4fc3f7]'>
          ⏱ {time.toString().padStart(3, '0')}
        </div>
      </div>

      {/* Board */}
      <div
        className='grid gap-[2px] bg-[#0f0f23] p-1 rounded-lg border border-white/5'
        style={{ gridTemplateColumns: `repeat(${COLS}, 36px)` }}
      >
        {board.map((row, r) =>
          row.map((cell, c) => (
            <button
              key={`${r}-${c}`}
              onClick={() => handleClick(r, c)}
              onContextMenu={(e) => handleRightClick(e, r, c)}
              className='w-9 h-9 rounded flex items-center justify-center border-none font-mono transition-all duration-75'
              style={{
                background: cell.revealed
                  ? cell.mine
                    ? '#ef4444'
                    : '#16213e'
                  : 'rgba(255,255,255,0.08)',
                color:
                  cell.revealed && cell.adjacent
                    ? NUM_COLORS[cell.adjacent] || '#fff'
                    : '#fff',
                cursor: gameState === 'playing' ? 'pointer' : 'default',
                fontSize: cell.revealed && cell.adjacent ? 14 : 16,
                fontWeight: 700,
              }}
              onMouseEnter={(e) => {
                if (!cell.revealed && gameState === 'playing')
                  e.currentTarget.style.background = 'rgba(255,255,255,0.12)';
              }}
              onMouseLeave={(e) => {
                if (!cell.revealed)
                  e.currentTarget.style.background = cell.revealed
                    ? '#16213e'
                    : 'rgba(255,255,255,0.08)';
              }}
            >
              {cell.revealed
                ? cell.mine
                  ? '💣'
                  : cell.adjacent || ''
                : cell.flagged
                  ? '🚩'
                  : ''}
            </button>
          )),
        )}
      </div>

      {/* Status */}
      {gameState !== 'playing' && (
        <div
          className={`mt-4 px-5 py-2 rounded-md text-sm font-semibold ${
            gameState === 'won'
              ? 'bg-[#10b98133] text-[#10b981]'
              : 'bg-[#ef444433] text-[#ef4444]'
          }`}
        >
          {gameState === 'won' ? '🎉 You Won!' : '💥 Game Over!'}
        </div>
      )}
    </div>
  );
};
