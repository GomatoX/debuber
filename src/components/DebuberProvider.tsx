'use client';

import React, { useEffect, useMemo, useCallback } from 'react';
import type { DebuberConfig, LogLevel } from '../types';
import { configureStore, useDebuberStore } from '../core/store';
import { checkProtection, matchesShortcut, promptForSecret } from '../core/protection';
import { DebuberBubble } from './DebuberBubble';
import { DebuberPanel } from './DebuberPanel';
import '../styles/debuber.css';

interface DebuberProviderProps {
  children: React.ReactNode;
  config?: DebuberConfig;
}

const DEFAULT_CONFIG: Required<DebuberConfig> = {
  enabled: true,
  secretKey: '',
  keyboardShortcut: '',
  isEnabled: undefined as unknown as () => boolean,
  persist: false,
  maxLogs: 100,
  position: 'bottom-right',
  defaultOpen: false,
  bubbleSize: 48,
};

export const DebuberProvider: React.FC<DebuberProviderProps> = ({
  children,
  config: userConfig,
}) => {
  const config = useMemo(() => ({ ...DEFAULT_CONFIG, ...userConfig }), [userConfig]);

  // Configure store settings
  useEffect(() => {
    configureStore(config.maxLogs);
  }, [config.maxLogs]);

  // Get reactive state from singleton store
  const isEnabled = useDebuberStore((s) => s.isEnabled);
  const isOpen = useDebuberStore((s) => s.isOpen);
  const logs = useDebuberStore((s) => s.logs);
  const filter = useDebuberStore((s) => s.filter);
  const searchQuery = useDebuberStore((s) => s.searchQuery);
  const isPersistent = useDebuberStore((s) => s.isPersistent);
  const setEnabled = useDebuberStore((s) => s.setEnabled);
  const setOpen = useDebuberStore((s) => s.setOpen);
  const toggle = useDebuberStore((s) => s.toggle);
  const setFilter = useDebuberStore((s) => s.setFilter);
  const setSearchQuery = useDebuberStore((s) => s.setSearchQuery);
  const setPersistent = useDebuberStore((s) => s.setPersistent);
  const clear = useDebuberStore((s) => s.clear);

  // Check protection on mount
  useEffect(() => {
    const shouldEnable = checkProtection(config);
    setEnabled(shouldEnable);

    if (shouldEnable && config.defaultOpen) {
      setOpen(true);
    }
  }, [config, setEnabled, setOpen]);

  // Keyboard shortcut handler
  useEffect(() => {
    if (!config.keyboardShortcut) return;

    const handleKeydown = (event: KeyboardEvent) => {
      if (matchesShortcut(event, config.keyboardShortcut)) {
        event.preventDefault();

        if (!isEnabled && config.secretKey) {
          // Prompt for secret key
          promptForSecret(config.secretKey, () => {
            setEnabled(true);
            setOpen(true);
          });
        } else if (isEnabled) {
          toggle();
        }
      }
    };

    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, [config.keyboardShortcut, config.secretKey, isEnabled, setEnabled, setOpen, toggle]);

  // Check for warnings/errors
  const hasWarning = useMemo(() => logs.some((l) => l.level === 'warn'), [logs]);
  const hasError = useMemo(() => logs.some((l) => l.level === 'error'), [logs]);

  // Actions
  const handleCopy = useCallback(() => {
    const text = logs
      .map((log) => {
        const time = log.timestamp.toISOString();
        const data = log.data ? `\n${JSON.stringify(log.data, null, 2)}` : '';
        return `[${log.level.toUpperCase()}] ${time} - ${log.message}${data}`;
      })
      .join('\n\n');

    navigator.clipboard.writeText(text);
  }, [logs]);

  const handleExport = useCallback(() => {
    const data = JSON.stringify(logs, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `debuber-logs-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [logs]);

  const handleFilterChange = useCallback(
    (newFilter: LogLevel | 'all') => setFilter(newFilter),
    [setFilter]
  );

  const handleSearchChange = useCallback(
    (query: string) => setSearchQuery(query),
    [setSearchQuery]
  );

  const handleClose = useCallback(() => setOpen(false), [setOpen]);

  const handlePersistToggle = useCallback(
    () => setPersistent(!isPersistent),
    [setPersistent, isPersistent]
  );

  // Don't render anything if not enabled
  if (!isEnabled) {
    return <>{children}</>;
  }

  return (
    <>
      {children}
      <div className="debuber-container">
        {!isOpen && (
          <DebuberBubble
            position={config.position}
            size={config.bubbleSize}
            logCount={logs.length}
            hasWarning={hasWarning}
            hasError={hasError}
            onClick={toggle}
          />
        )}
        {isOpen && (
          <DebuberPanel
            logs={logs}
            position={config.position}
            filter={filter}
            searchQuery={searchQuery}
            isPersistent={isPersistent}
            onFilterChange={handleFilterChange}
            onSearchChange={handleSearchChange}
            onClear={clear}
            onClose={handleClose}
            onCopy={handleCopy}
            onExport={handleExport}
            onPersistToggle={handlePersistToggle}
          />
        )}
      </div>
    </>
  );
};

export default DebuberProvider;
