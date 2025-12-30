<p align="center">
  <img src="https://raw.githubusercontent.com/GomatoX/debuber/main/logo.png" alt="Debuber Logo" width="128" height="128" />
</p>

<h1 align="center">Debuber</h1>

<p align="center">
  🦫 A visual debug logger for React/Next.js applications.
  <br />
  Display debug logs in a floating bubble UI without opening browser DevTools.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/debuber"><img src="https://img.shields.io/npm/v/debuber.svg" alt="npm version" /></a>
  <a href="https://www.npmjs.com/package/debuber"><img src="https://img.shields.io/npm/dm/debuber.svg" alt="npm downloads" /></a>
  <a href="https://github.com/your-username/debuber/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/debuber.svg" alt="license" /></a>
</p>

---

## Features

- 🐛 **Floating Bubble UI** - Inspired by Next.js error overlay
- 📝 **Multiple Log Levels** - debug, info, warn, error
- 🔍 **Search & Filter** - Quickly find relevant logs
- 🔒 **Production Protection** - URL key, keyboard shortcut, or custom function
- 💾 **Persistence** - Optionally save logs to localStorage
- 📋 **Copy & Export** - Copy logs to clipboard or export as JSON
- 🎨 **Dark Theme** - Beautiful dark UI that matches modern dev tools

## Installation

```bash
npm install debuber
# or
yarn add debuber
# or
pnpm add debuber
```

## Quick Start

### 1. Add the Provider

```tsx
// app/layout.tsx (Next.js App Router)
import { DebuberProvider } from 'debuber';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <DebuberProvider
          config={{
            secretKey: 'my-debug-key', // Enable with ?debuber=my-debug-key
            persist: true, // Save logs across refreshes
          }}
        >
          {children}
        </DebuberProvider>
      </body>
    </html>
  );
}
```

### 2. Add Logs Anywhere

```tsx
import { debuber } from 'debuber';

// In any component or function
debuber.log('Simple message');
debuber.info('User logged in', { userId: 123 });
debuber.warn('Cache miss');
debuber.error('API failed', new Error('Network error'));

// Group related logs
debuber.group('Checkout Flow');
debuber.info('Cart loaded');
debuber.info('Payment processed');
debuber.groupEnd();
```

### 3. Use the Hook (Optional)

```tsx
import { useDebuber } from 'debuber';

function DebugControls() {
  const { logs, clear, toggle, isOpen } = useDebuber();

  return (
    <div>
      <p>Total logs: {logs.length}</p>
      <button onClick={clear}>Clear</button>
      <button onClick={toggle}>{isOpen ? 'Close' : 'Open'}</button>
    </div>
  );
}
```

## Configuration

```tsx
<DebuberProvider
  config={{
    // Protection
    enabled: true,                    // Enable/disable completely
    secretKey: 'your-secret',         // URL param: ?debuber=your-secret
    keyboardShortcut: 'ctrl+shift+d', // Toggle with keyboard
    isEnabled: () => isAdmin,         // Custom check function

    // Behavior
    persist: false,                   // Save to localStorage
    maxLogs: 100,                     // Max logs to keep

    // Appearance
    position: 'bottom-right',         // bottom-right | bottom-left | top-right | top-left
    defaultOpen: false,               // Start with panel open
    bubbleSize: 48,                   // Bubble size in pixels
  }}
>
```

## Production Protection

### URL Parameter

Add `?debuber=your-secret` to the URL to enable the debugger.

### Keyboard Shortcut

Press `Ctrl+Shift+D` (configurable) to open a password prompt.

### localStorage

Set `localStorage.setItem('debuber_enabled', 'your-secret')` for persistent access.

### Custom Function

```tsx
<DebuberProvider config={{ isEnabled: () => user?.isAdmin }}>
```

### Environment Variable

```tsx
<DebuberProvider config={{ enabled: process.env.NODE_ENV !== 'production' }}>
```

## API Reference

### Logger Methods

| Method                      | Description         |
| --------------------------- | ------------------- |
| `debuber.log(msg, data?)`   | Log a debug message |
| `debuber.debug(msg, data?)` | Alias for log       |
| `debuber.info(msg, data?)`  | Log an info message |
| `debuber.warn(msg, data?)`  | Log a warning       |
| `debuber.error(msg, data?)` | Log an error        |
| `debuber.group(name)`       | Start a log group   |
| `debuber.groupEnd()`        | End current group   |
| `debuber.clear()`           | Clear all logs      |
| `debuber.open()`            | Open the panel      |
| `debuber.close()`           | Close the panel     |
| `debuber.toggle()`          | Toggle the panel    |

### useDebuber Hook

```tsx
const {
  logs, // LogEntry[]
  isOpen, // boolean
  isEnabled, // boolean
  filter, // 'all' | 'debug' | 'info' | 'warn' | 'error'
  searchQuery, // string
  clear, // () => void
  toggle, // () => void
  open, // () => void
  close, // () => void
  setFilter, // (filter) => void
  setSearchQuery, // (query) => void
} = useDebuber();
```

## License

MIT
