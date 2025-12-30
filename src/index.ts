'use client';

// Components
export { DebuberProvider } from './components/DebuberProvider';
export { DebuberBubble } from './components/DebuberBubble';
export { DebuberPanel } from './components/DebuberPanel';
export { LogEntry } from './components/LogEntry';

// Hooks
export { useDebuber } from './hooks/useDebuber';

// Logger API
export { debuber } from './core/logger';
export { default as logger } from './core/logger';

// Types
export type {
  LogLevel,
  LogEntry as LogEntryType,
  DebuberConfig,
  Position,
  DebuberStore,
} from './types';

// CSS import helper
import './styles/debuber.css';
