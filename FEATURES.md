# Windows 11 WebOS Replica - Features Documentation

This document outlines the complete feature set of the Windows 11 Web OS replica project.

## Core System Architecture & Window Management

- **State Management**: Built on top of robust Zustand stores (`@web-os/os-core`) managing the File System (FS), OS State, Themes, and Window instances.
- **Window Management System**:
  - Draggable and resizable windows powered by `react-rnd`.
  - Window maximization and restore capabilities flawlessly bound to browser viewports.
  - Minimization logic integrating seamlessly with the taskbar.
  - Active window focus tracking with dynamic Z-index elevation.
  - Responsive window bounds (absolute coordinate layout system replacing flexbox for pristine pixel-perfect edge-to-edge app stretching).
- **Theming Engine**: Comprehensive CSS variable architecture allowing live switching between Light/Dark modes, and overarching OS version styling (e.g., Windows 11 vs Windows XP).

## Desktop Interface

- **Desktop Grid**: Interactive desktop grid system supporting application shortcuts and file icons.
- **Context Menus**: Native-feeling right-click context menu offering core functionalities:
  - Create New Folder.
  - Create New Document / Text File.
  - Refresh Desktop Desktop layer.
  - Direct open tools (Terminal, Settings).
- **Drag & Drop Subsystem**: Ability to drag external files (Images and Videos) directly onto the browser window, saving them into the virtual file system and automatically executing the correlated application (e.g., Photos app for images).

## Taskbar & System Tray

- **Taskbar Shell**: Pinned and active application instances displayed on the core taskbar layout.
- **Window Previews**: Hovering over open applications on the taskbar displays a live preview popup, complete with its own Close control button.
- **System Flyouts**:
  - **Start Menu**: Integrated Pinned apps grid, search bar overlay trigger, and user profile management section.
  - **Search Overlay**: Global search overlay capturing keyboard inputs to quickly open system applications.
  - **Calendar Flyout**: Triggered by clicking the clock. Detailed native-styled Calendar display with focus mode timer UI.
  - **Quick Settings Flyout**: Triggered by system icons. Controls for WiFi, Bluetooth, Volume, Brightness, and fast access settings.

## Virtual File System (VFS)

- Persistent virtual system mapping standard paths (e.g., `/home/user/Desktop`).
- File schema supporting nested directories, read/write/delete operations, and string content decoding.
- Deep integration between the VFS and OS Apps (e.g., File Explorer dynamically indexing `.txt` files directly into Notepad).

## Built-In Applications

- **File Explorer**: Traditional dual-pane explorer with a "Quick Access" sidebar, top-level control ribbon (Cut, Copy, Paste, Delete), and a grid-view structure for folders and files.
- **Microsoft Edge Browser**: A robust web viewer wrapping `iframe` technologies. Features explicit route interceptions to render high-fidelity mock interfaces for sites that aggressively block external framing (e.g., native mock layouts for Google and Bing Search workflows).
- **Terminal CLI**: Fully functional mock command line with simulated standard GNU tools natively resolving against the VFS (`ls`, `cd`, `pwd`, `echo`, `cat`, `date`, `mkdir`, `touch`, `rm`, `theme`, `clear`, `help`).
- **Notepad / Text Editor**: Clean, responsive syntax-ready text editor built to edit standard document files retrieved from the VFS.
- **Calculator**: Comprehensive standard calculator tool replicating the exact fluent UI design.
- **Paint**: Simple canvas layout mocking the aesthetic ribbon topology of MS Paint.
- **Clipchamp / Video Editor**: Mock UI replicating generic video editing topologies.
- **Settings App**: Multi-panel configuration dashboard mocking real OS toggles.
- **Minesweeper**: A web-based port of the classic tile game.
- **Photos / Image Viewer**: Automatically triggers when double-clicking compatible VFS payloads or dragging external image models onto the desktop.
- **Microsoft Store**: A rich exploratory UI mimicking the software catalogue distribution screen.
- **Mail (Outlook)**: Replica UI showing inbox hierarchy and email read panes.

## Error Handling & Stability Implementations

- Bulletproof state transition workflows on heavily interacted System Tray overlays to prevent component oscillation (e.g., double-toggle misfires on Calendar).
- Hardened Tailwind CSS flexbox & grid hierarchies converted to absolute `inset` layers preventing `height: auto` collapsing bugs cross browser.
