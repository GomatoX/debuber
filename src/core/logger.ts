import { getStoreInstance } from './store';
import type { LogLevel } from '../types';

/**
 * Logger API for adding debug logs.
 * Use this anywhere in your React application.
 */
export const debuber = {
  /**
   * Log a debug message (lowest priority).
   */
  debug: (message: string, data?: unknown): void => {
    addLog('debug', message, data);
  },

  /**
   * Log an info message.
   */
  info: (message: string, data?: unknown): void => {
    addLog('info', message, data);
  },

  /**
   * Log a warning message.
   */
  warn: (message: string, data?: unknown): void => {
    addLog('warn', message, data);
  },

  /**
   * Log an error message (highest priority).
   */
  error: (message: string, data?: unknown): void => {
    addLog('error', message, data);
  },

  /**
   * Alias for debug().
   */
  log: (message: string, data?: unknown): void => {
    addLog('debug', message, data);
  },

  /**
   * Start a log group.
   */
  group: (name: string): void => {
    const store = getStoreInstance();
    if (store) {
      store.getState().setGroup(name);
    }
  },

  /**
   * End the current log group.
   */
  groupEnd: (): void => {
    const store = getStoreInstance();
    if (store) {
      store.getState().setGroup(null);
    }
  },

  /**
   * Clear all logs.
   */
  clear: (): void => {
    const store = getStoreInstance();
    if (store) {
      store.getState().clear();
    }
  },

  /**
   * Open the debug panel.
   */
  open: (): void => {
    const store = getStoreInstance();
    if (store) {
      store.getState().setOpen(true);
    }
  },

  /**
   * Close the debug panel.
   */
  close: (): void => {
    const store = getStoreInstance();
    if (store) {
      store.getState().setOpen(false);
    }
  },

  /**
   * Toggle the debug panel.
   */
  toggle: (): void => {
    const store = getStoreInstance();
    if (store) {
      store.getState().toggle();
    }
  },
};

function addLog(level: LogLevel, message: string, data?: unknown): void {
  const store = getStoreInstance();
  if (store) {
    const state = store.getState();
    if (state.isEnabled) {
      state.addLog(level, message, data);
    }
  }
}

export default debuber;
