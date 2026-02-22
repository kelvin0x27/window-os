import { create } from 'zustand';

export type FileType = 'file' | 'dir';

export interface VFile {
  path: string;
  type: FileType;
  content: string; // Used for files
  createdAt: number;
}

interface FSState {
  files: VFile[];
  readFile: (path: string) => string | null;
  writeFile: (path: string, content: string) => void;
  makeDir: (path: string) => void;
  deleteNode: (path: string) => void;
  readDir: (path: string) => VFile[];
}

export const useFSStore = create<FSState>((set, get) => ({
  files: [
    { path: '/', type: 'dir', content: '', createdAt: Date.now() },
    { path: '/home', type: 'dir', content: '', createdAt: Date.now() },
    { path: '/home/user', type: 'dir', content: '', createdAt: Date.now() },
    {
      path: '/home/user/Desktop',
      type: 'dir',
      content: '',
      createdAt: Date.now(),
    },
    {
      path: '/home/user/Downloads',
      type: 'dir',
      content: '',
      createdAt: Date.now(),
    },
    {
      path: '/home/user/Documents',
      type: 'dir',
      content: '',
      createdAt: Date.now(),
    },
    {
      path: '/home/user/Pictures',
      type: 'dir',
      content: '',
      createdAt: Date.now(),
    },
    {
      path: '/home/user/Music',
      type: 'dir',
      content: '',
      createdAt: Date.now(),
    },
    {
      path: '/home/user/Videos',
      type: 'dir',
      content: '',
      createdAt: Date.now(),
    },
    {
      path: '/home/user/readme.txt',
      type: 'file',
      content:
        'Welcome to Web OS clone. Built with Next.js, Turborepo, and Zustand.',
      createdAt: Date.now(),
    },
    {
      path: '/home/user/Downloads/setup.exe',
      type: 'file',
      content: '[binary]',
      createdAt: Date.now(),
    },
    {
      path: '/home/user/Downloads/report_2026.pdf',
      type: 'file',
      content: '[PDF Document]',
      createdAt: Date.now(),
    },
    {
      path: '/home/user/Downloads/photo_001.jpg',
      type: 'file',
      content: '[JPEG Image]',
      createdAt: Date.now(),
    },
    {
      path: '/home/user/Documents/notes.txt',
      type: 'file',
      content:
        'Meeting notes - Project kickoff\n\n1. Define scope\n2. Assign tasks\n3. Set timeline',
      createdAt: Date.now(),
    },
    {
      path: '/home/user/Documents/budget.xlsx',
      type: 'file',
      content: '[Excel Spreadsheet]',
      createdAt: Date.now(),
    },
    {
      path: '/home/user/Documents/Work',
      type: 'dir',
      content: '',
      createdAt: Date.now(),
    },
    {
      path: '/home/user/Documents/Work/proposal.docx',
      type: 'file',
      content: '[Word Document]',
      createdAt: Date.now(),
    },
    {
      path: '/home/user/Documents/Work/presentation.pptx',
      type: 'file',
      content: '[PowerPoint]',
      createdAt: Date.now(),
    },
    {
      path: '/home/user/Pictures/wallpaper.jpg',
      type: 'file',
      content: '[JPEG Image]',
      createdAt: Date.now(),
    },
    {
      path: '/home/user/Pictures/Screenshots',
      type: 'dir',
      content: '',
      createdAt: Date.now(),
    },
    {
      path: '/home/user/Pictures/Screenshots/screenshot_1.png',
      type: 'file',
      content: '[PNG Image]',
      createdAt: Date.now(),
    },
    {
      path: '/home/user/Desktop/project_plan.txt',
      type: 'file',
      content:
        'Project Plan\n\nPhase 1: Research\nPhase 2: Design\nPhase 3: Implementation',
      createdAt: Date.now(),
    },
  ],

  readFile: (path: string) => {
    const file = get().files.find((f) => f.path === path && f.type === 'file');
    return file ? file.content : null;
  },

  writeFile: (path: string, content: string) => {
    set((state) => {
      const existing = state.files.find((f) => f.path === path);
      if (existing) {
        if (existing.type === 'dir') return state; // Cannot write to dir
        return {
          files: state.files.map((f) =>
            f.path === path ? { ...f, content } : f,
          ),
        };
      }
      return {
        files: [
          ...state.files,
          { path, type: 'file', content, createdAt: Date.now() },
        ],
      };
    });
  },

  makeDir: (path: string) => {
    set((state) => {
      if (state.files.find((f) => f.path === path)) return state;
      return {
        files: [
          ...state.files,
          { path, type: 'dir', content: '', createdAt: Date.now() },
        ],
      };
    });
  },

  deleteNode: (path: string) => {
    set((state) => ({
      files: state.files.filter((f) => !f.path.startsWith(path)), // removes node and descendants
    }));
  },

  readDir: (path: string) => {
    const cleanPath =
      path.endsWith('/') && path.length > 1 ? path.slice(0, -1) : path;
    const prefix = cleanPath === '/' ? '/' : cleanPath + '/';
    return get().files.filter((f) => {
      if (!f.path.startsWith(prefix) || f.path === cleanPath) return false;
      const rest = f.path.slice(prefix.length);
      return !rest.includes('/'); // Only immediate children
    });
  },
}));
