import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { DebuberStore, LogLevel, LogEntry } from '../types';

const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// Store configuration
let maxLogsConfig = 100;
let persistEnabled = false;

// Storage key
const STORAGE_KEY = 'debuber-logs';

// Create the store actions factory
const createStoreActions = (
  set: (fn: (state: DebuberStore) => Partial<DebuberStore>, replace?: boolean) => void,
  get: () => DebuberStore
): DebuberStore => ({
  logs: [],
  isOpen: false,
  isEnabled: false,
  isPersistent: false,
  currentGroup: null,
  filter: 'all',
  searchQuery: '',

  addLog: (level: LogLevel, message: string, data?: unknown) => {
    const state = get();
    const newLog: LogEntry = {
      id: generateId(),
      level,
      message,
      data,
      timestamp: new Date(),
      group: state.currentGroup || undefined,
    };

    const newLogs = [...state.logs, newLog];
    const trimmedLogs = newLogs.slice(-maxLogsConfig);
    set(() => ({ logs: trimmedLogs }));

    // Persist to localStorage if enabled
    if (state.isPersistent) {
      saveLogs(trimmedLogs);
    }
  },

  clear: () => {
    set(() => ({ logs: [] }));
    // Clear from localStorage too
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
  },

  toggle: () => {
    set((state) => ({ isOpen: !state.isOpen }));
  },

  setOpen: (open: boolean) => {
    set(() => ({ isOpen: open }));
  },

  setEnabled: (enabled: boolean) => {
    set(() => ({ isEnabled: enabled }));
  },

  setGroup: (group: string | null) => {
    set(() => ({ currentGroup: group }));
  },

  setFilter: (filter: LogLevel | 'all') => {
    set(() => ({ filter }));
  },

  setSearchQuery: (query: string) => {
    set(() => ({ searchQuery: query }));
  },

  setPersistent: (persistent: boolean) => {
    set(() => ({ isPersistent: persistent }));
    if (typeof window !== 'undefined') {
      if (persistent) {
        // Save current logs when enabling
        saveLogs(get().logs);
        localStorage.setItem('debuber-persistent', 'true');
      } else {
        // Clear stored logs when disabling
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem('debuber-persistent');
      }
    }
  },

  loadPersistedLogs: () => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        const wasPersistent = localStorage.getItem('debuber-persistent') === 'true';

        if (stored && wasPersistent) {
          const logs = JSON.parse(stored).map((log: LogEntry) => ({
            ...log,
            timestamp: new Date(log.timestamp),
          }));
          set(() => ({ logs, isPersistent: true }));
        } else if (wasPersistent) {
          set(() => ({ isPersistent: true }));
        }
      } catch {
        // Ignore parse errors
      }
    }
  },
});

// Helper to save logs to localStorage
const saveLogs = (logs: LogEntry[]) => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
    } catch {
      // Ignore quota errors
    }
  }
};

// Singleton store - created once, used everywhere
const useStore = create<DebuberStore>()(createStoreActions);

// Configure store settings (call from provider)
export const configureStore = (maxLogs: number = 100, persist: boolean = false) => {
  maxLogsConfig = maxLogs;
  persistEnabled = persist;

  // Load persisted logs on init if persistence was previously enabled
  const store = useStore.getState();
  store.loadPersistedLogs();

  // If config says persist, enable it
  if (persist && !store.isPersistent) {
    store.setPersistent(true);
  }
};

// Get the store for use in logger and hooks
export const getStoreInstance = () => useStore;

// Hook for components
export const useDebuberStore = useStore;
