import { create } from 'zustand';

export interface AppWindow {
  id: string;
  appId: string;
  title: string;
  x: number;
  y: number;
  width: number;
  height: number;
  isMaximized: boolean;
  isMinimized: boolean;
  zIndex: number;
}

export type OSVersion = 'win11' | 'win10' | 'win8' | 'win7' | 'winxp';
type BootPhase = 'loading' | 'desktop';

interface OSState {
  bootPhase: BootPhase;
  windows: AppWindow[];
  activeWindowId: string | null;
  highestZIndex: number;
  setBootPhase: (phase: BootPhase) => void;
  openWindow: (appId: string, title: string) => void;
  closeWindow: (id: string) => void;
  focusWindow: (id: string | null) => void;
  minimizeWindow: (id: string) => void;
  toggleMaximizeWindow: (id: string) => void;
  updateWindowPosition: (id: string, x: number, y: number) => void;
  updateWindowSize: (
    id: string,
    width: number,
    height: number,
    x: number,
    y: number,
  ) => void;
  theme: 'dark' | 'light';
  setTheme: (theme: 'dark' | 'light') => void;
  osVersion: OSVersion;
  setOSVersion: (version: OSVersion) => void;
}

const generateId = () => Math.random().toString(36).substring(2, 9);

export const useOSStore = create<OSState>((set, get) => ({
  bootPhase: 'loading',
  windows: [],
  activeWindowId: null,
  highestZIndex: 10,
  theme: 'dark',
  osVersion: 'win11',

  setTheme: (theme) => set({ theme }),
  setOSVersion: (version) => set({ osVersion: version }),
  setBootPhase: (phase) => set({ bootPhase: phase }),

  openWindow: (appId, title) => {
    const { windows, highestZIndex } = get();
    // Check if single instance app is already open
    const existingWindow = windows.find((w) => w.appId === appId);
    if (existingWindow) {
      if (existingWindow.isMinimized) {
        set({
          windows: windows.map((w) =>
            w.id === existingWindow.id
              ? { ...w, isMinimized: false, zIndex: highestZIndex + 1 }
              : w,
          ),
          highestZIndex: highestZIndex + 1,
          activeWindowId: existingWindow.id,
        });
      } else {
        get().focusWindow(existingWindow.id);
      }
      return;
    }

    // Per-app default sizes
    const defaultSizes: Record<string, { w: number; h: number }> = {
      calc: { w: 320, h: 500 },
      paint: { w: 1000, h: 650 },
      settings: { w: 900, h: 620 },
      edge: { w: 1050, h: 700 },
      mail: { w: 900, h: 620 },
      calendar: { w: 900, h: 620 },
      code: { w: 900, h: 620 },
      store: { w: 1000, h: 650 },
      video: { w: 900, h: 600 },
      game: { w: 500, h: 580 },
      text: { w: 700, h: 500 },
      terminal: { w: 750, h: 480 },
    };
    const size = defaultSizes[appId] || { w: 800, h: 600 };

    const newWindow: AppWindow = {
      id: generateId(),
      appId,
      title,
      x: 100 + windows.length * 30,
      y: 50 + windows.length * 30,
      width: size.w,
      height: size.h,
      isMaximized: false,
      isMinimized: false,
      zIndex: highestZIndex + 1,
    };

    set({
      windows: [...windows, newWindow],
      highestZIndex: highestZIndex + 1,
      activeWindowId: newWindow.id,
    });
  },

  closeWindow: (id) => {
    set((state) => ({
      windows: state.windows.filter((w) => w.id !== id),
      activeWindowId: state.activeWindowId === id ? null : state.activeWindowId,
    }));
  },

  focusWindow: (id) => {
    const { windows, highestZIndex, activeWindowId } = get();
    if (activeWindowId === id) return;
    if (id === null) {
      set({ activeWindowId: null });
      return;
    }

    set({
      windows: windows.map((w) =>
        w.id === id
          ? { ...w, zIndex: highestZIndex + 1, isMinimized: false }
          : w,
      ),
      highestZIndex: highestZIndex + 1,
      activeWindowId: id,
    });
  },

  minimizeWindow: (id) => {
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, isMinimized: true } : w,
      ),
      activeWindowId: state.activeWindowId === id ? null : state.activeWindowId,
    }));
  },

  toggleMaximizeWindow: (id) => {
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, isMaximized: !w.isMaximized } : w,
      ),
    }));
  },

  updateWindowPosition: (id, x, y) => {
    set((state) => ({
      windows: state.windows.map((w) => (w.id === id ? { ...w, x, y } : w)),
    }));
  },

  updateWindowSize: (id, width, height, x, y) => {
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, width, height, x, y } : w,
      ),
    }));
  },
}));
