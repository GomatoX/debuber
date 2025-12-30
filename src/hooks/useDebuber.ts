'use client';

import { useDebuberStore } from '../core/store';

/**
 * Hook to access debuber state and actions from React components.
 * Must be used within a DebuberProvider.
 */
export const useDebuber = () => {
  const logs = useDebuberStore((s) => s.logs);
  const isOpen = useDebuberStore((s) => s.isOpen);
  const isEnabled = useDebuberStore((s) => s.isEnabled);
  const filter = useDebuberStore((s) => s.filter);
  const searchQuery = useDebuberStore((s) => s.searchQuery);

  const clear = useDebuberStore((s) => s.clear);
  const toggle = useDebuberStore((s) => s.toggle);
  const setOpen = useDebuberStore((s) => s.setOpen);
  const setFilter = useDebuberStore((s) => s.setFilter);
  const setSearchQuery = useDebuberStore((s) => s.setSearchQuery);

  return {
    // State
    logs,
    isOpen,
    isEnabled,
    filter,
    searchQuery,

    // Actions
    clear,
    toggle,
    open: () => setOpen(true),
    close: () => setOpen(false),
    setFilter,
    setSearchQuery,
  };
};

export default useDebuber;
