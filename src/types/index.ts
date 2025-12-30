export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export interface LogEntry {
  id: string;
  level: LogLevel;
  message: string;
  data?: unknown;
  timestamp: Date;
  group?: string;
}

export type Position = 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';

export interface DebuberConfig {
  /**
   * Enable/disable the debugger. If false, nothing is rendered.
   * @default true in development, false in production
   */
  enabled?: boolean;

  /**
   * Secret key for URL param protection.
   * When set, debugger only shows when `?debuber=<secretKey>` is in URL.
   */
  secretKey?: string;

  /**
   * Keyboard shortcut to toggle the debugger (e.g., 'ctrl+shift+d').
   * Works in combination with secretKey for password prompt.
   */
  keyboardShortcut?: string;

  /**
   * Custom function to determine if debugger should be enabled.
   * Takes precedence over other protection mechanisms.
   */
  isEnabled?: () => boolean;

  /**
   * Persist logs to localStorage across page refreshes.
   * @default false
   */
  persist?: boolean;

  /**
   * Maximum number of logs to keep in memory.
   * @default 100
   */
  maxLogs?: number;

  /**
   * Position of the floating bubble.
   * @default 'bottom-right'
   */
  position?: Position;

  /**
   * Whether the panel should be open by default.
   * @default false
   */
  defaultOpen?: boolean;

  /**
   * Size of the bubble in pixels.
   * @default 48
   */
  bubbleSize?: number;
}

export interface DebuberStore {
  logs: LogEntry[];
  isOpen: boolean;
  isEnabled: boolean;
  isPersistent: boolean;
  currentGroup: string | null;
  filter: LogLevel | 'all';
  searchQuery: string;

  // Actions
  addLog: (level: LogLevel, message: string, data?: unknown) => void;
  clear: () => void;
  toggle: () => void;
  setOpen: (open: boolean) => void;
  setEnabled: (enabled: boolean) => void;
  setGroup: (group: string | null) => void;
  setFilter: (filter: LogLevel | 'all') => void;
  setSearchQuery: (query: string) => void;
  setPersistent: (persistent: boolean) => void;
  loadPersistedLogs: () => void;
}

export interface DebuberContextValue {
  config: DebuberConfig;
  store: DebuberStore;
}
