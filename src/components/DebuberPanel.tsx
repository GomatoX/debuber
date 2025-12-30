import React, { useMemo } from 'react';
import type { LogEntry as LogEntryType, LogLevel, Position } from '../types';
import { LogEntry } from './LogEntry';
import { BeaverIcon } from './icons/BeaverIcon';

interface DebuberPanelProps {
  logs: LogEntryType[];
  position: Position;
  filter: LogLevel | 'all';
  searchQuery: string;
  isPersistent: boolean;
  onFilterChange: (filter: LogLevel | 'all') => void;
  onSearchChange: (query: string) => void;
  onClear: () => void;
  onClose: () => void;
  onCopy: () => void;
  onExport: () => void;
  onPersistToggle: () => void;
}

const LEVELS: (LogLevel | 'all')[] = ['all', 'debug', 'info', 'warn', 'error'];

export const DebuberPanel: React.FC<DebuberPanelProps> = ({
  logs,
  position,
  filter,
  searchQuery,
  isPersistent,
  onFilterChange,
  onSearchChange,
  onClear,
  onClose,
  onCopy,
  onExport,
  onPersistToggle,
}) => {
  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {
      // Filter by level
      if (filter !== 'all' && log.level !== filter) {
        return false;
      }

      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesMessage = log.message.toLowerCase().includes(query);
        const matchesData = log.data
          ? JSON.stringify(log.data).toLowerCase().includes(query)
          : false;
        const matchesGroup = log.group ? log.group.toLowerCase().includes(query) : false;
        return matchesMessage || matchesData || matchesGroup;
      }

      return true;
    });
  }, [logs, filter, searchQuery]);

  // Count by level for display
  const counts = useMemo(() => {
    return {
      all: logs.length,
      debug: logs.filter((l) => l.level === 'debug').length,
      info: logs.filter((l) => l.level === 'info').length,
      warn: logs.filter((l) => l.level === 'warn').length,
      error: logs.filter((l) => l.level === 'error').length,
    };
  }, [logs]);

  return (
    <div className={`debuber-panel debuber-panel--${position}`}>
      {/* Header */}
      <div className="debuber-panel__header">
        <div className="debuber-panel__title">
          <BeaverIcon size={16} />
          Debuber
        </div>
        <div className="debuber-panel__actions">
          <button className="debuber-panel__btn" onClick={onCopy} type="button">
            Copy
          </button>
          <button className="debuber-panel__btn" onClick={onExport} type="button">
            Export
          </button>
          <button className="debuber-panel__btn" onClick={onClear} type="button">
            Clear
          </button>
          <button
            className="debuber-panel__close"
            onClick={onClose}
            aria-label="Close panel"
            type="button"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="debuber-panel__filters">
        <input
          type="text"
          className="debuber-panel__search"
          placeholder="Search logs..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <div className="debuber-panel__level-filters">
          {LEVELS.map((level) => (
            <button
              key={level}
              className={`debuber-panel__level-btn debuber-panel__level-btn--${level} ${
                filter === level ? 'debuber-panel__level-btn--active' : ''
              }`}
              onClick={() => onFilterChange(level)}
              type="button"
            >
              {level} ({counts[level]})
            </button>
          ))}
        </div>
      </div>

      {/* Log List */}
      <div className="debuber-panel__logs">
        {filteredLogs.length === 0 ? (
          <div className="debuber-panel__empty">
            {logs.length === 0
              ? 'No logs yet. Use debuber.log() to add logs.'
              : 'No logs match your filter.'}
          </div>
        ) : (
          filteredLogs.map((log) => (
            <LogEntry
              key={log.id}
              level={log.level}
              message={log.message}
              data={log.data}
              timestamp={log.timestamp}
              group={log.group}
            />
          ))
        )}
      </div>

      {/* Footer */}
      <div className="debuber-panel__footer">
        <span>
          {filteredLogs.length} of {logs.length} logs
        </span>
        <button
          className={`debuber-panel__persist-toggle ${isPersistent ? 'debuber-panel__persist-toggle--active' : ''}`}
          onClick={onPersistToggle}
          type="button"
          title={
            isPersistent ? 'Logs are persisted to localStorage' : 'Logs will be cleared on refresh'
          }
        >
          💾 {isPersistent ? 'Persist: ON' : 'Persist: OFF'}
        </button>
      </div>
    </div>
  );
};

export default DebuberPanel;
