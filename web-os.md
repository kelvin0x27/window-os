# Web OS Clone Plan

## Overview

A fully functional Web OS mimicking Windows OS with a suite of built-in applications including a text editor, terminal, code editor, game, file manager, paint, and video editor.

## Project Type

WEB

## Success Criteria

- Monorepo structure using Turborepo is set up successfully.
- Window Manager handles resizing, dragging, maximizing, minimizing, and z-index ordering.
- Applications (Text Editor, Terminal, Code Editor, Game, File Manager, Paint, Video Editor) are fully functional within the window system.
- UI components are reusable and flexible to simulate different OS versions.

## Tech Stack

- Frontend: Next.js (App Router), React.js
- Monorepo: Turborepo, pnpm
- Styling: Tailwind CSS
- State Management: Zustand (for window states and file system)

## File Structure

```text
window-11/
├── apps/
│   └── web/             # Next.js web application
├── packages/
│   ├── ui/              # Shared UI components (Start Menu, Taskbar, Window Frame)
│   ├── os-core/         # Window Manager, File System Logic
│   └── built-in-apps/   # OS applications (Notepad, Terminal, etc.)
├── turbo.json
├── pnpm-workspace.yaml
└── package.json
```

## Task Breakdown

1. **Initialize Monorepo** (Agent: frontend-specialist)
   - INPUT: Empty directory
   - OUTPUT: Turborepo setup with `apps/web` and `packages/ui`
   - VERIFY: `pnpm dev` starts the blank Next.js app successfully.

2. **Implement Core Window Manager** (Agent: frontend-specialist)
   - INPUT: Next.js app
   - OUTPUT: A draggable, resizable window component with state management.
   - VERIFY: Can open multiple windows and interact with them independently.

3. **Develop Built-in Applications (Batch 1)** (Agent: frontend-specialist)
   - INPUT: Window Manager
   - OUTPUT: Text Editor, Code Editor, and Terminal apps.
   - VERIFY: Can launch apps from the Start Menu, type text, and execute simulated commands.

4. **Develop Built-in Applications (Batch 2)** (Agent: frontend-specialist)
   - INPUT: Window Manager
   - OUTPUT: File Manager, Game (Minesweeper/Solitaire), Paint, Video Editor.
   - VERIFY: Can navigate files, play the game, draw on canvas, and interact with the media editor.

5. **System Polish and Optimization** (Agent: frontend-specialist)
   - INPUT: Functional OS
   - OUTPUT: Theming, animations, performance tuning.
   - VERIFY: Smooth animations, clean UX, light/dark mode support.

## Phase X: Verification

- Lint: [ ]
- Security: [ ]
- Build: [ ]
- Date: [ ]
