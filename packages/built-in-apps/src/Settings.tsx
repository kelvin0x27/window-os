'use client';

import React, { useState } from 'react';
import { useOSStore } from '@web-os/os-core';

/* ====== Types ====== */
interface SettingsPage {
  id: string;
  label: string;
  icon: React.ReactNode;
  children?: SettingsSubPage[];
}

interface SettingsSubPage {
  id: string;
  label: string;
  desc?: string;
  icon?: React.ReactNode;
  content?: React.ReactNode;
}

/* ====== Toggle Switch Component ====== */
const Toggle = ({
  value,
  onChange,
  disabled,
}: {
  value: boolean;
  onChange?: (v: boolean) => void;
  disabled?: boolean;
}) => (
  <button
    onClick={() => !disabled && onChange?.(!value)}
    className={`w-10 h-5 rounded-full border-none relative shrink-0 transition-colors ${
      disabled ? 'cursor-default' : 'cursor-pointer'
    } ${value ? 'bg-[#0078d4]' : 'bg-[#555]'}`}
  >
    <div
      className={`w-3.5 h-3.5 rounded-full bg-white absolute top-[3px] transition-all shadow-[0_1px_3px_rgba(0,0,0,0.3)] ${
        value ? 'left-[23px]' : 'left-[3px]'
      }`}
    />
  </button>
);

/* ====== Slider Component ====== */
const Slider = ({
  value,
  onChange,
  min = 0,
  max = 100,
}: {
  value: number;
  onChange?: (v: number) => void;
  min?: number;
  max?: number;
}) => (
  <div className="flex items-center gap-3 w-full">
    <input
      type='range'
      min={min}
      max={max}
      value={value}
      onChange={(e) => onChange?.(Number(e.target.value))}
      className="flex-1 h-1 cursor-pointer accent-[#0078d4]"
    />
    <span className="text-xs text-os-text-secondary min-w-[32px] text-right">
      {value}%
    </span>
  </div>
);

/* ====== Settings Row Component ====== */
const SettingsRow = ({
  icon,
  label,
  desc,
  onClick,
  right,
}: {
  icon?: React.ReactNode;
  label: string;
  desc?: string;
  onClick?: () => void;
  right?: React.ReactNode;
}) => (
  <button
    onClick={onClick}
    className={`flex items-center justify-between py-3 px-4 bg-transparent border-none rounded-md w-full text-left transition-colors gap-3 ${
      onClick ? 'cursor-pointer hover:bg-os-hover' : 'cursor-default'
    }`}
  >
    <div className="flex items-center gap-3.5 min-w-0">
      {icon && (
        <div className="w-5 h-5 text-os-text-secondary shrink-0 flex items-center justify-center">
          {icon}
        </div>
      )}
      <div className="min-w-0">
        <div className="text-[13px] text-os-text">{label}</div>
        {desc && (
          <div className="text-[11px] text-os-text-secondary mt-0.5">
            {desc}
          </div>
        )}
      </div>
    </div>
    <div className="flex items-center gap-2 shrink-0">
      {right}
      {onClick && <span className="text-os-text-secondary text-sm">›</span>}
    </div>
  </button>
);

/* ====== Card Component ====== */
const Card = ({
  children,
  style,
  className = '',
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}) => (
  <div
    className={`bg-[#2d2d2d] rounded-lg border border-os-border overflow-hidden mb-2 ${className}`}
    style={{ ...style }}
  >
    {children}
  </div>
);

/* ====== SVG Icons ====== */
const icons = {
  home: (
    <svg width='20' height='20' viewBox='0 0 20 20' fill='none'>
      <path d='M3 10L10 3L17 10V17H12V13H8V17H3V10Z' fill='currentColor' />
    </svg>
  ),
  system: (
    <svg width='20' height='20' viewBox='0 0 20 20' fill='none'>
      <rect
        x='2'
        y='3'
        width='16'
        height='11'
        rx='1.5'
        stroke='currentColor'
        strokeWidth='1.5'
        fill='none'
      />
      <path
        d='M7 16H13'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
      />
    </svg>
  ),
  bluetooth: (
    <svg width='20' height='20' viewBox='0 0 20 20' fill='none'>
      <path
        d='M7 5L13 10L7 15M13 10L7 5L10 2V18L7 15'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
        fill='none'
      />
    </svg>
  ),
  wifi: (
    <svg width='20' height='20' viewBox='0 0 20 20' fill='none'>
      <path
        d='M10 16.5C10.8 16.5 11.5 15.8 11.5 15C11.5 14.2 10.8 13.5 10 13.5C9.2 13.5 8.5 14.2 8.5 15C8.5 15.8 9.2 16.5 10 16.5Z'
        fill='currentColor'
      />
      <path
        d='M4 8C5.7 6.3 7.7 5.5 10 5.5C12.3 5.5 14.3 6.3 16 8'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
        fill='none'
      />
      <path
        d='M6.5 11C7.5 10 8.7 9.5 10 9.5C11.3 9.5 12.5 10 13.5 11'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
        fill='none'
      />
    </svg>
  ),
  palette: (
    <svg width='20' height='20' viewBox='0 0 20 20' fill='none'>
      <circle
        cx='10'
        cy='10'
        r='8'
        stroke='currentColor'
        strokeWidth='1.5'
        fill='none'
      />
      <circle cx='7' cy='7' r='1.5' fill='currentColor' />
      <circle cx='13' cy='7' r='1.5' fill='currentColor' />
      <circle cx='7' cy='13' r='1.5' fill='currentColor' />
    </svg>
  ),
  apps: (
    <svg width='20' height='20' viewBox='0 0 20 20' fill='none'>
      <rect
        x='2'
        y='2'
        width='7'
        height='7'
        rx='1.5'
        stroke='currentColor'
        strokeWidth='1.5'
        fill='none'
      />
      <rect
        x='11'
        y='2'
        width='7'
        height='7'
        rx='1.5'
        stroke='currentColor'
        strokeWidth='1.5'
        fill='none'
      />
      <rect
        x='2'
        y='11'
        width='7'
        height='7'
        rx='1.5'
        stroke='currentColor'
        strokeWidth='1.5'
        fill='none'
      />
      <rect
        x='11'
        y='11'
        width='7'
        height='7'
        rx='1.5'
        stroke='currentColor'
        strokeWidth='1.5'
        fill='none'
      />
    </svg>
  ),
  user: (
    <svg width='20' height='20' viewBox='0 0 20 20' fill='none'>
      <circle
        cx='10'
        cy='7'
        r='3.5'
        stroke='currentColor'
        strokeWidth='1.5'
        fill='none'
      />
      <path
        d='M3 17.5C3 14 6 12 10 12C14 12 17 14 17 17.5'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
        fill='none'
      />
    </svg>
  ),
  clock: (
    <svg width='20' height='20' viewBox='0 0 20 20' fill='none'>
      <circle
        cx='10'
        cy='10'
        r='8'
        stroke='currentColor'
        strokeWidth='1.5'
        fill='none'
      />
      <path
        d='M10 5V10L13 12'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
        fill='none'
      />
    </svg>
  ),
  gamepad: (
    <svg width='20' height='20' viewBox='0 0 20 20' fill='none'>
      <rect
        x='2'
        y='6'
        width='16'
        height='9'
        rx='2'
        stroke='currentColor'
        strokeWidth='1.5'
        fill='none'
      />
      <path
        d='M6 9V12M4.5 10.5H7.5'
        stroke='currentColor'
        strokeWidth='1.3'
        strokeLinecap='round'
      />
      <circle cx='13' cy='10' r='0.8' fill='currentColor' />
      <circle cx='15' cy='11' r='0.8' fill='currentColor' />
    </svg>
  ),
  accessibility: (
    <svg width='20' height='20' viewBox='0 0 20 20' fill='none'>
      <circle cx='10' cy='4' r='2' fill='currentColor' />
      <path
        d='M5 8H15M10 8V12M7 18L10 12L13 18'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
        fill='none'
      />
    </svg>
  ),
  shield: (
    <svg width='20' height='20' viewBox='0 0 20 20' fill='none'>
      <path
        d='M10 2L3 5V10C3 14.4 6 17.5 10 18.5C14 17.5 17 14.4 17 10V5L10 2Z'
        stroke='currentColor'
        strokeWidth='1.5'
        fill='none'
      />
      <path
        d='M7.5 10L9.5 12L13 8'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
        fill='none'
      />
    </svg>
  ),
  update: (
    <svg width='20' height='20' viewBox='0 0 20 20' fill='none'>
      <path
        d='M3 10C3 6.1 6.1 3 10 3C12.5 3 14.7 4.3 16 6.2'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
        fill='none'
      />
      <path
        d='M14 6H17V3'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
        fill='none'
      />
      <path
        d='M17 10C17 13.9 13.9 17 10 17C7.5 17 5.3 15.7 4 13.8'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
        fill='none'
      />
      <path
        d='M6 14H3V17'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
        fill='none'
      />
    </svg>
  ),
  display: (
    <svg width='20' height='20' viewBox='0 0 20 20' fill='none'>
      <rect
        x='2'
        y='3'
        width='16'
        height='11'
        rx='1.5'
        stroke='currentColor'
        strokeWidth='1.5'
        fill='none'
      />
      <circle cx='10' cy='14' r='0.3' fill='currentColor' />
    </svg>
  ),
  sound: (
    <svg width='20' height='20' viewBox='0 0 20 20' fill='none'>
      <path d='M3 8V12H6L10 15V5L6 8H3Z' fill='currentColor' />
      <path
        d='M13 7.5C14 8.5 14.5 9.7 14.5 11C14.5 12.3 14 13.5 13 14.5'
        stroke='currentColor'
        strokeWidth='1.3'
        strokeLinecap='round'
        fill='none'
      />
    </svg>
  ),
  battery: (
    <svg width='20' height='20' viewBox='0 0 20 20' fill='none'>
      <rect
        x='2'
        y='6'
        width='14'
        height='8'
        rx='1.5'
        stroke='currentColor'
        strokeWidth='1.5'
        fill='none'
      />
      <rect x='16' y='8' width='2' height='4' rx='0.5' fill='currentColor' />
      <rect x='4' y='8' width='6' height='4' rx='0.5' fill='#4CAF50' />
    </svg>
  ),
  night: (
    <svg width='20' height='20' viewBox='0 0 20 20' fill='none'>
      <path
        d='M15 12C13.3 13.3 11.2 14 9 14C5 14 2 11 2 7.5C2 5.8 2.8 4 4 2.7C3 4.5 3 7.5 5 9.5C7 11.5 10 12 12.5 11C14 10.3 15 9 15 7C16.5 8.5 16.5 10.7 15 12Z'
        fill='currentColor'
      />
    </svg>
  ),
  multitask: (
    <svg width='20' height='20' viewBox='0 0 20 20' fill='none'>
      <rect
        x='1'
        y='1'
        width='9'
        height='9'
        rx='1'
        stroke='currentColor'
        strokeWidth='1.3'
        fill='none'
      />
      <rect
        x='10'
        y='1'
        width='9'
        height='9'
        rx='1'
        stroke='currentColor'
        strokeWidth='1.3'
        fill='none'
      />
      <rect
        x='1'
        y='10'
        width='9'
        height='9'
        rx='1'
        stroke='currentColor'
        strokeWidth='1.3'
        fill='none'
      />
      <rect
        x='10'
        y='10'
        width='9'
        height='9'
        rx='1'
        stroke='currentColor'
        strokeWidth='1.3'
        fill='none'
      />
    </svg>
  ),
  storage: (
    <svg width='20' height='20' viewBox='0 0 20 20' fill='none'>
      <rect
        x='3'
        y='3'
        width='14'
        height='14'
        rx='2'
        stroke='currentColor'
        strokeWidth='1.5'
        fill='none'
      />
      <rect
        x='5'
        y='13'
        width='10'
        height='2'
        rx='1'
        fill='currentColor'
        opacity='0.5'
      />
    </svg>
  ),
  about: (
    <svg width='20' height='20' viewBox='0 0 20 20' fill='none'>
      <circle
        cx='10'
        cy='10'
        r='8'
        stroke='currentColor'
        strokeWidth='1.5'
        fill='none'
      />
      <path
        d='M10 9V14'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
      />
      <circle cx='10' cy='6.5' r='1' fill='currentColor' />
    </svg>
  ),
  chevron: (
    <svg width='14' height='14' viewBox='0 0 14 14' fill='none'>
      <path
        d='M5 3L9 7L5 11'
        stroke='#888'
        strokeWidth='1.3'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  ),
  back: (
    <svg width='16' height='16' viewBox='0 0 16 16' fill='none'>
      <path
        d='M10 3L5 8L10 13'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  ),
  search: (
    <svg width='16' height='16' viewBox='0 0 16 16' fill='none'>
      <circle cx='6.5' cy='6.5' r='5' stroke='currentColor' strokeWidth='1.3' />
      <path
        d='M10.5 10.5L14 14'
        stroke='currentColor'
        strokeWidth='1.3'
        strokeLinecap='round'
      />
    </svg>
  ),
};

/* ====== Pages Data ====== */
const SETTINGS_PAGES: SettingsPage[] = [
  { id: 'home', label: 'Home', icon: icons.home, children: [] },
  {
    id: 'system',
    label: 'System',
    icon: icons.system,
    children: [
      {
        id: 'display',
        label: 'Display',
        desc: 'Brightness, night light, color profile',
        icon: icons.display,
      },
      {
        id: 'sound',
        label: 'Sound',
        desc: 'Volume, output, input devices',
        icon: icons.sound,
      },
      {
        id: 'battery',
        label: 'Power & battery',
        desc: 'Sleep, battery usage, battery saver',
        icon: icons.battery,
      },
      {
        id: 'multitasking',
        label: 'Multitasking',
        desc: 'Snap windows, desktops, task switching',
        icon: icons.multitask,
      },
      {
        id: 'storage',
        label: 'Storage',
        desc: 'Storage usage, drives, configuration',
        icon: icons.storage,
      },
      {
        id: 'about',
        label: 'About',
        desc: 'Device specs, rename, Windows specs',
        icon: icons.about,
      },
    ],
  },
  {
    id: 'bluetooth',
    label: 'Bluetooth & devices',
    icon: icons.bluetooth,
    children: [
      {
        id: 'bt-devices',
        label: 'Devices',
        desc: 'Add or manage Bluetooth devices',
      },
      {
        id: 'bt-printers',
        label: 'Printers & scanners',
        desc: 'Preferences, troubleshoot',
      },
      {
        id: 'bt-mouse',
        label: 'Mouse',
        desc: 'Buttons, scrolling, pointer speed',
      },
      {
        id: 'bt-touchpad',
        label: 'Touchpad',
        desc: 'Gestures, tapping, scrolling',
      },
    ],
  },
  {
    id: 'network',
    label: 'Network & internet',
    icon: icons.wifi,
    children: [
      { id: 'net-wifi', label: 'Wi-Fi', desc: 'Manage known networks' },
      {
        id: 'net-ethernet',
        label: 'Ethernet',
        desc: 'IP, DNS, metered connections',
      },
      { id: 'net-vpn', label: 'VPN', desc: 'Add, connect, manage' },
      {
        id: 'net-proxy',
        label: 'Proxy',
        desc: 'Manual or automatic proxy setup',
      },
      {
        id: 'net-airplane',
        label: 'Airplane mode',
        desc: 'Turn off all wireless',
      },
    ],
  },
  {
    id: 'personalization',
    label: 'Personalization',
    icon: icons.palette,
    children: [
      {
        id: 'pers-background',
        label: 'Background',
        desc: 'Wallpaper, color, slideshow',
      },
      {
        id: 'pers-colors',
        label: 'Colors',
        desc: 'Accent color, dark mode, transparency',
      },
      { id: 'pers-themes', label: 'Themes', desc: 'Install, change themes' },
      {
        id: 'pers-lockscreen',
        label: 'Lock screen',
        desc: 'Background, status apps',
      },
      {
        id: 'pers-taskbar',
        label: 'Taskbar',
        desc: 'Icons, position, behavior',
      },
    ],
  },
  {
    id: 'apps',
    label: 'Apps',
    icon: icons.apps,
    children: [
      {
        id: 'apps-installed',
        label: 'Installed apps',
        desc: 'Uninstall, move, modify programs',
      },
      {
        id: 'apps-default',
        label: 'Default apps',
        desc: 'Set defaults for file types',
      },
      {
        id: 'apps-startup',
        label: 'Startup',
        desc: 'Manage apps that start with sign-in',
      },
    ],
  },
  {
    id: 'accounts',
    label: 'Accounts',
    icon: icons.user,
    children: [
      { id: 'acc-info', label: 'Your info', desc: 'Profile, account settings' },
      {
        id: 'acc-email',
        label: 'Email & accounts',
        desc: 'Accounts for email, calendar, contacts',
      },
      {
        id: 'acc-signin',
        label: 'Sign-in options',
        desc: 'Password, PIN, fingerprint',
      },
    ],
  },
  {
    id: 'time',
    label: 'Time & language',
    icon: icons.clock,
    children: [
      {
        id: 'time-datetime',
        label: 'Date & time',
        desc: 'Time zone, clock, calendar',
      },
      {
        id: 'time-region',
        label: 'Language & region',
        desc: 'Language, format, input',
      },
      {
        id: 'time-typing',
        label: 'Typing',
        desc: 'Autocorrect, text suggestions, touch keyboard',
      },
    ],
  },
  {
    id: 'gaming',
    label: 'Gaming',
    icon: icons.gamepad,
    children: [
      {
        id: 'game-bar',
        label: 'Game Bar',
        desc: 'Customize keyboard shortcuts and widgets',
      },
      {
        id: 'game-captures',
        label: 'Captures',
        desc: 'Screenshots, recordings',
      },
      {
        id: 'game-mode',
        label: 'Game Mode',
        desc: 'Optimize your PC for gaming',
      },
    ],
  },
  {
    id: 'accessibility',
    label: 'Accessibility',
    icon: icons.accessibility,
    children: [
      {
        id: 'a11y-visual',
        label: 'Visual effects',
        desc: 'Animation, transparency, scrollbars',
      },
      { id: 'a11y-magnifier', label: 'Magnifier', desc: 'Zoom, lens, docked' },
      { id: 'a11y-narrator', label: 'Narrator', desc: 'Screen reader' },
    ],
  },
  {
    id: 'privacy',
    label: 'Privacy & security',
    icon: icons.shield,
    children: [
      {
        id: 'priv-general',
        label: 'General',
        desc: 'Ads, language list, tracking',
      },
      {
        id: 'priv-location',
        label: 'Location',
        desc: 'Allow apps to use your location',
      },
      { id: 'priv-camera', label: 'Camera', desc: 'App access to camera' },
      {
        id: 'priv-microphone',
        label: 'Microphone',
        desc: 'App access to microphone',
      },
    ],
  },
  {
    id: 'update',
    label: 'Windows Update',
    icon: icons.update,
    children: [
      {
        id: 'update-check',
        label: 'Check for updates',
        desc: 'Download and install',
      },
      {
        id: 'update-history',
        label: 'Update history',
        desc: 'View previously installed updates',
      },
      {
        id: 'update-advanced',
        label: 'Advanced options',
        desc: 'Delivery optimization, active hours',
      },
    ],
  },
];

/* ====== Sub-page Content Renderers (Level 3) ====== */
const DisplayContent = () => {
  const [brightness, setBrightness] = useState(80);
  const [nightLight, setNightLight] = useState(false);
  return (
    <div>
      <Card>
        <div className="p-4">
          <div className="text-[13px] text-os-text mb-3">
            Brightness
          </div>
          <Slider value={brightness} onChange={setBrightness} />
        </div>
      </Card>
      <Card>
        <SettingsRow
          icon={icons.night}
          label='Night light'
          desc={nightLight ? 'On' : 'Off'}
          right={<Toggle value={nightLight} onChange={setNightLight} />}
        />
      </Card>
      <Card>
        <SettingsRow
          label='Scale'
          desc='125% (Recommended)'
          right={<span className="text-xs text-os-accent">125%</span>}
        />
        <div className="h-px bg-os-border" />
        <SettingsRow
          label='Display resolution'
          desc='1920 x 1080 (Recommended)'
          right={<span className="text-xs text-os-text-secondary">1920 x 1080</span>}
        />
        <div className="h-px bg-os-border" />
        <SettingsRow
          label='Display orientation'
          desc='Landscape'
          right={<span className="text-xs text-os-text-secondary">Landscape</span>}
        />
      </Card>
    </div>
  );
};

const SoundContent = () => {
  const [volume, setVolume] = useState(75);
  return (
    <div>
      <Card>
        <div className="p-4">
          <div className="text-[13px] text-os-text mb-3">
            Volume
          </div>
          <Slider value={volume} onChange={setVolume} />
        </div>
      </Card>
      <Card>
        <SettingsRow
          icon={icons.sound}
          label='Output'
          desc='Speakers (Realtek Audio)'
        />
        <div className="h-px bg-os-border" />
        <SettingsRow label='Input' desc='Microphone (Realtek Audio)' />
      </Card>
    </div>
  );
};

const BatteryContent = () => (
  <div>
    <Card>
      <div className="p-5 flex items-center gap-4">
        <div className="flex items-center gap-2">
          {icons.battery}
          <span className="text-[28px] font-semibold text-os-text">
            98%
          </span>
        </div>
        <div className="text-xs text-os-text-secondary">
          Estimated time remaining: 4 hr 32 min
        </div>
      </div>
    </Card>
    <Card>
      <SettingsRow
        label='Screen and sleep'
        desc='Screen: 5 minutes • Sleep: 15 minutes'
      />
      <div className="h-px bg-os-border" />
      <SettingsRow
        label='Power mode'
        desc='Balanced'
        right={<span className="text-xs text-os-text-secondary">Balanced</span>}
      />
    </Card>
  </div>
);

const AboutContent = () => (
  <div>
    <Card>
      <div className="p-5">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-lg bg-os-accent flex items-center justify-center">
            <svg width='24' height='24' viewBox='0 0 88 88' fill='none'>
              <rect x='2' y='2' width='40' height='40' rx='2' fill='#fff' />
              <rect x='46' y='2' width='40' height='40' rx='2' fill='#fff' />
              <rect x='2' y='46' width='40' height='40' rx='2' fill='#fff' />
              <rect x='46' y='46' width='40' height='40' rx='2' fill='#fff' />
            </svg>
          </div>
          <div>
            <div className="text-[15px] font-semibold text-os-text">
              DESKTOP-WEB11
            </div>
            <div className="text-xs text-os-text-secondary">Web OS Desktop</div>
          </div>
        </div>
        {[
          ['Device name', 'DESKTOP-WEB11'],
          ['Processor', 'Web Runtime Engine'],
          ['Installed RAM', '8.00 GB'],
          ['System type', '64-bit operating system'],
        ].map(([k, v]) => (
          <div
            key={k}
            className="flex justify-between py-1.5 border-b border-os-border last:border-0"
          >
            <span className="text-xs text-os-text-secondary">{k}</span>
            <span className="text-xs text-os-text">{v}</span>
          </div>
        ))}
      </div>
    </Card>
    <Card>
      <div className="p-5">
        <div className="text-sm font-semibold text-os-text mb-3">
          Windows specifications
        </div>
        {[
          ['Edition', 'Windows 11 Pro'],
          ['Version', '23H2'],
          ['OS build', '22631.3085'],
        ].map(([k, v]) => (
          <div
            key={k}
            className="flex justify-between py-1.5 border-b border-os-border last:border-0"
          >
            <span className="text-xs text-os-text-secondary">{k}</span>
            <span className="text-xs text-os-text">{v}</span>
          </div>
        ))}
      </div>
    </Card>
  </div>
);

const WifiContent = () => {
  const [wifiOn, setWifiOn] = useState(true);
  return (
    <div>
      <Card>
        <SettingsRow
          icon={icons.wifi}
          label='Wi-Fi'
          right={<Toggle value={wifiOn} onChange={setWifiOn} />}
        />
      </Card>
      {wifiOn && (
        <Card>
          <div className="px-4 py-3 text-[13px] font-semibold text-os-text">
            Available networks
          </div>
          {[
            'HomeNetwork',
            'Office_WiFi_5G',
            'CoffeeShop_Free',
            'Neighbor_AP',
          ].map((n, i) => (
            <SettingsRow
              key={n}
              icon={icons.wifi}
              label={n}
              desc={i === 0 ? 'Connected, secured' : 'Secured'}
              right={
                i === 0 ? (
                  <span className="text-[11px] text-[#4CAF50]">
                    ✓ Connected
                  </span>
                ) : undefined
              }
              onClick={i !== 0 ? () => {} : undefined}
            />
          ))}
        </Card>
      )}
    </div>
  );
};

/* ====== Personalization > Background Content ====== */
const WALLPAPERS = [
  {
    id: 'w1',
    label: 'Default',
    gradient: 'linear-gradient(135deg, #1a237e 0%, #4a148c 50%, #1a237e 100%)',
  },
  {
    id: 'w2',
    label: 'Sunrise',
    gradient: 'linear-gradient(135deg, #ff6b35 0%, #f7c948 50%, #ff88a2 100%)',
  },
  {
    id: 'w3',
    label: 'Ocean',
    gradient: 'linear-gradient(135deg, #0077b6 0%, #00b4d8 50%, #90e0ef 100%)',
  },
  {
    id: 'w4',
    label: 'Forest',
    gradient: 'linear-gradient(135deg, #1b5e20 0%, #2e7d32 50%, #66bb6a 100%)',
  },
  {
    id: 'w5',
    label: 'Midnight',
    gradient: 'linear-gradient(135deg, #0d0d0d 0%, #1a1a2e 50%, #16213e 100%)',
  },
  {
    id: 'w6',
    label: 'Rose',
    gradient: 'linear-gradient(135deg, #880e4f 0%, #ad1457 50%, #ec407a 100%)',
  },
];

const PersonalizationBackgroundContent = () => {
  const [selectedWp, setSelectedWp] = useState('w1');

  return (
    <>
      <Card className='p-4'>
        <div className="text-[13px] text-os-text mb-3">
          Personalize your background
        </div>
        <div className="text-[11px] text-os-text-secondary mb-4">
          Choose a wallpaper for your desktop
        </div>
        <div className="grid grid-cols-3 gap-2">
          {WALLPAPERS.map((wp) => (
            <button
              key={wp.id}
              onClick={() => {
                setSelectedWp(wp.id);
                // Apply wallpaper to the desktop
                const desktop = document.querySelector(
                  '.win11-wallpaper',
                ) as HTMLElement;
                if (desktop) desktop.style.background = wp.gradient;
              }}
              className={`h-[70px] rounded-md cursor-pointer relative overflow-hidden transition-colors border-2 ${
                selectedWp === wp.id ? 'border-os-accent' : 'border-transparent'
              }`}
              style={{ background: wp.gradient }}
            >
              <span className="absolute bottom-1 left-1.5 text-[10px] text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.6)]">
                {wp.label}
              </span>
            </button>
          ))}
        </div>
      </Card>
      <Card className="mt-2">
        <SettingsRow
          label='Choose a fit'
          desc='Fill'
          right={<span className="text-xs text-os-accent">Fill ▾</span>}
        />
      </Card>
    </>
  );
};

/* ====== Personalization > Colors Content ====== */
const PersonalizationColorsContent = () => {
  const { theme, setTheme } = useOSStore();
  const darkMode = theme === 'dark';
  const setDarkMode = (isDark: boolean) => setTheme(isDark ? 'dark' : 'light');
  const [transparency, setTransparency] = useState(true);
  const [accentColor, setAccentColor] = useState('#0078d4');

  const ACCENT_COLORS = [
    '#0078d4',
    '#0099bc',
    '#7a7574',
    '#767676',
    '#ff8c00',
    '#e81123',
    '#0063b1',
    '#6b69d6',
    '#038387',
    '#00b7c3',
    '#ca5010',
    '#da3b01',
    '#ef6950',
    '#d13438',
    '#c30052',
    '#bf0077',
    '#9a0089',
    '#881798',
    '#744da9',
    '#8764b8',
  ];

  return (
    <>
      <Card>
        <SettingsRow
          label='Choose your mode'
          desc={darkMode ? 'Dark' : 'Light'}
          right={
            <div className="flex gap-2">
              <button
                onClick={() => setDarkMode(false)}
                className={`px-3 py-1 rounded border-none text-[11px] cursor-pointer ${
                  !darkMode ? 'bg-os-accent text-white' : 'bg-white/5 text-os-text-secondary'
                }`}
              >
                Light
              </button>
              <button
                onClick={() => setDarkMode(true)}
                className={`px-3 py-1 rounded border-none text-[11px] cursor-pointer ${
                  darkMode ? 'bg-os-accent text-white' : 'bg-white/5 text-os-text-secondary'
                }`}
              >
                Dark
              </button>
            </div>
          }
        />
      </Card>
      <Card className="mt-2">
        <SettingsRow
          label='Transparency effects'
          desc='Apply transparency to surfaces'
          right={<Toggle value={transparency} onChange={setTransparency} />}
        />
      </Card>
      <Card className="mt-2">
        <div className="text-[13px] text-os-text mb-2 py-1 px-4">
          Accent color
        </div>
        <div className="grid grid-cols-10 gap-1 pb-2 px-4">
          {ACCENT_COLORS.map((c) => (
            <button
              key={c}
              onClick={() => setAccentColor(c)}
              className={`w-full aspect-square rounded cursor-pointer p-0 border border-white/10 ${
                accentColor === c ? 'ring-2 ring-white ring-offset-2 ring-offset-os-surface' : ''
              }`}
              style={{ background: c }}
            />
          ))}
        </div>
      </Card>
    </>
  );
};

const CONTENT_MAP: Record<string, React.ReactNode> = {
  display: <DisplayContent />,
  sound: <SoundContent />,
  battery: <BatteryContent />,
  about: <AboutContent />,
  'net-wifi': <WifiContent />,
  'pers-background': <PersonalizationBackgroundContent />,
  'pers-colors': <PersonalizationColorsContent />,
};

/* ====== Main Settings App ====== */
export const SettingsApp = () => {
  const [activePage, setActivePage] = useState('home');
  const [activeSubPage, setActiveSubPage] = useState<string | null>(null);

  const currentPage = SETTINGS_PAGES.find((p) => p.id === activePage);
  const currentSub = currentPage?.children?.find((s) => s.id === activeSubPage);

  const navigateToPage = (pageId: string) => {
    setActivePage(pageId);
    setActiveSubPage(null);
  };

  const navigateToSubPage = (subId: string) => {
    setActiveSubPage(subId);
  };

  /* ---- Home Page Content ---- */
  const renderHomePage = () => (
    <div>
      <h2 className="text-2xl font-semibold text-os-text mb-5">
        Home
      </h2>
      {/* Device card */}
      <Card>
        <div className="p-5 flex items-center gap-4">
          <div className="w-16 h-12 bg-linear-to-br from-[#5e45c0] to-os-accent rounded-md" />
          <div>
            <div className="text-sm font-semibold text-os-text">
              DESKTOP-WEB11
            </div>
            <div className="text-xs text-os-text-secondary">Web OS Desktop</div>
            <div className="text-[11px] text-os-accent mt-0.5 cursor-pointer">
              Rename
            </div>
          </div>
          <div className="ml-auto flex gap-4 items-center">
            <div className="text-center">
              <div className="flex items-center gap-1">
                {icons.wifi}
                <span className="text-sm font-semibold text-os-text">
                  Kelvin
                </span>
              </div>
              <div className="text-[10px] text-os-text-secondary">
                Connected, secured
              </div>
            </div>
            <div className="text-center">
              <div className="flex items-center gap-1">
                {icons.update}
                <span className="text-xs font-semibold text-os-text">
                  Windows Update
                </span>
              </div>
              <div className="text-[10px] text-os-text-secondary">
                Check for updates
              </div>
            </div>
          </div>
        </div>
      </Card>

      <div className="text-sm font-semibold text-os-text mt-5 mb-2">
        Recommended settings
      </div>
      <div className="text-xs text-os-text-secondary mb-3">
        Recent and commonly used settings
      </div>

      <Card>
        <SettingsRow
          icon={icons.apps}
          label='Installed apps'
          onClick={() => {
            setActivePage('apps');
            setActiveSubPage('apps-installed');
          }}
        />
        <div className="h-px bg-os-border" />
        <SettingsRow
          icon={icons.wifi}
          label='Wi-Fi'
          desc='On'
          onClick={() => {
            setActivePage('network');
            setActiveSubPage('net-wifi');
          }}
          right={<Toggle value={true} />}
        />
        <div className="h-px bg-os-border" />
        <SettingsRow
          icon={icons.sound}
          label='Sound'
          onClick={() => {
            setActivePage('system');
            setActiveSubPage('sound');
          }}
        />
      </Card>
    </div>
  );

  /* ---- Category Page (Level 2) ---- */
  const renderCategoryPage = () => {
    if (!currentPage) return null;
    return (
      <div>
        <h2 className="text-2xl font-semibold text-os-text mb-5">
          {currentPage.label}
        </h2>
        <Card>
          {currentPage.children?.map((sub, i) => (
            <React.Fragment key={sub.id}>
              {i > 0 && <div className="h-px bg-os-border" />}
              <SettingsRow
                icon={sub.icon || icons.chevron}
                label={sub.label}
                desc={sub.desc}
                onClick={() => navigateToSubPage(sub.id)}
              />
            </React.Fragment>
          ))}
        </Card>
      </div>
    );
  };

  /* ---- Sub-page Content (Level 3) ---- */
  const renderSubPage = () => {
    if (!currentSub) return null;
    const content = CONTENT_MAP[currentSub.id];
    return (
      <div>
        <h2 className="text-2xl font-semibold text-os-text mb-5">
          {currentSub.label}
        </h2>
        {content || (
          <Card>
            <div className="p-10 text-center text-os-text-secondary text-[13px]">
              {currentSub.label} settings — Coming soon
            </div>
          </Card>
        )}
      </div>
    );
  };

  return (
    <div className="flex h-full w-full bg-[#202020] text-os-text font-sans text-[13px]">
      {/* Sidebar */}
      <div className="w-[240px] min-w-[240px] bg-[#252525] border-r border-os-border flex flex-col overflow-hidden">
        {/* User profile */}
        <div className="p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#f97316] flex items-center justify-center text-white text-base font-semibold">
            U
          </div>
          <div>
            <div className="text-[13px] font-semibold">User</div>
            <div className="text-[11px] text-os-text-secondary">Local Account</div>
          </div>
        </div>

        {/* Nav items */}
        <div className="flex-1 overflow-auto px-2">
          {SETTINGS_PAGES.map((page) => {
            const isActive = activePage === page.id;
            return (
              <button
                key={page.id}
                onClick={() => navigateToPage(page.id)}
                className={`flex items-center gap-3 py-1.5 px-3 my-px rounded border-none w-full text-left relative transition-colors text-[13px] ${
                  isActive
                    ? 'bg-white/10 text-white cursor-pointer'
                    : 'bg-transparent text-[#bbb] cursor-pointer hover:bg-white/5'
                }`}
              >
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-4 rounded-[2px] bg-os-accent" />
                )}
                <div className="w-5 h-5 flex items-center justify-center shrink-0">
                  {page.icon}
                </div>
                <span>{page.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar with back button and search */}
        <div className="flex items-center gap-2 py-2 px-6 bg-[#252525] border-b border-os-border">
          <button
            onClick={() => {
              if (activeSubPage) setActiveSubPage(null);
              else if (activePage !== 'home') setActivePage('home');
            }}
            disabled={activePage === 'home' && !activeSubPage}
            className={`w-7 h-7 rounded border-none bg-transparent flex items-center justify-center transition-colors ${
              activePage === 'home' && !activeSubPage
                ? 'cursor-default text-[#555]'
                : 'cursor-pointer text-[#ccc] hover:bg-white/10'
            }`}
          >
            {icons.back}
          </button>

          {/* Breadcrumb */}
          <div className="flex items-center gap-1 text-xs text-os-text-secondary">
            <span
              className={`cursor-pointer ${activePage === 'home' ? 'text-os-text' : 'text-os-text-secondary'}`}
              onClick={() => navigateToPage('home')}
            >
              Settings
            </span>
            {activePage !== 'home' && (
              <>
                <span>›</span>
                <span
                  className={`cursor-pointer ${!activeSubPage ? 'text-os-text' : 'text-os-text-secondary'}`}
                  onClick={() => setActiveSubPage(null)}
                >
                  {currentPage?.label}
                </span>
              </>
            )}
            {activeSubPage && currentSub && (
              <>
                <span>›</span>
                <span className="text-os-text">{currentSub.label}</span>
              </>
            )}
          </div>

          <div className="flex-1" />

          {/* Search bar */}
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded px-3 h-[30px] w-[200px]">
            <div className="text-os-text-secondary">{icons.search}</div>
            <span className="text-xs text-os-text-secondary">Find a setting</span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto py-5 px-8">
          <div className="max-w-[640px]">
            {activeSubPage
              ? renderSubPage()
              : activePage === 'home'
                ? renderHomePage()
                : renderCategoryPage()}
          </div>
        </div>
      </div>
    </div>
  );
};
