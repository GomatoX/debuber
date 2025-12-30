import type { DebuberConfig } from '../types';

/**
 * Check if the debugger should be enabled based on configuration.
 */
export const checkProtection = (config: DebuberConfig): boolean => {
  // Custom function takes precedence
  if (config.isEnabled) {
    return config.isEnabled();
  }

  // Explicitly disabled
  if (config.enabled === false) {
    return false;
  }

  // Explicitly enabled
  if (config.enabled === true) {
    return true;
  }

  // Check secret key in URL
  if (config.secretKey) {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const urlKey = urlParams.get('debuber');
      if (urlKey === config.secretKey) {
        // Store in sessionStorage for persistence during session
        sessionStorage.setItem('debuber_unlocked', 'true');
        return true;
      }

      // Check if previously unlocked in this session
      if (sessionStorage.getItem('debuber_unlocked') === 'true') {
        return true;
      }

      // Check localStorage for persistent unlock
      if (localStorage.getItem('debuber_enabled') === config.secretKey) {
        return true;
      }
    }
    return false;
  }

  // Default: enabled in development, disabled in production
  if (typeof process !== 'undefined' && process.env?.NODE_ENV === 'production') {
    return false;
  }

  return true;
};

/**
 * Parse keyboard shortcut string to key combination.
 */
export const parseShortcut = (
  shortcut: string
): { key: string; ctrl: boolean; shift: boolean; alt: boolean; meta: boolean } => {
  const parts = shortcut.toLowerCase().split('+');
  return {
    key: parts[parts.length - 1],
    ctrl: parts.includes('ctrl'),
    shift: parts.includes('shift'),
    alt: parts.includes('alt'),
    meta: parts.includes('meta') || parts.includes('cmd'),
  };
};

/**
 * Check if keyboard event matches shortcut.
 */
export const matchesShortcut = (
  event: KeyboardEvent,
  shortcut: string
): boolean => {
  const parsed = parseShortcut(shortcut);
  return (
    event.key.toLowerCase() === parsed.key &&
    event.ctrlKey === parsed.ctrl &&
    event.shiftKey === parsed.shift &&
    event.altKey === parsed.alt &&
    event.metaKey === parsed.meta
  );
};

/**
 * Prompt for secret key (simple implementation).
 */
export const promptForSecret = (
  secretKey: string,
  onSuccess: () => void
): void => {
  const input = prompt('Enter debug key:');
  if (input === secretKey) {
    sessionStorage.setItem('debuber_unlocked', 'true');
    onSuccess();
  }
};
