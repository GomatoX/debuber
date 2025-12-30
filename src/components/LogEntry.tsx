import React from 'react';
import type { LogLevel } from '../types';

interface LogEntryProps {
  level: LogLevel;
  message: string;
  data?: unknown;
  timestamp: Date;
  group?: string;
}

export const LogEntry: React.FC<LogEntryProps> = ({
  level,
  message,
  data,
  timestamp,
  group,
}) => {
  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  const formatData = (value: unknown): string => {
    try {
      if (value instanceof Error) {
        return `${value.name}: ${value.message}\n${value.stack || ''}`;
      }
      return JSON.stringify(value, null, 2);
    } catch {
      return String(value);
    }
  };

  return (
    <div className="debuber-log">
      <div className="debuber-log__header">
        <span className={`debuber-log__level debuber-log__level--${level}`}>
          {level}
        </span>
        <span className="debuber-log__time">{formatTime(timestamp)}</span>
        {group && <span className="debuber-log__group">[{group}]</span>}
      </div>
      <div className="debuber-log__message">{message}</div>
      {data !== undefined && (
        <pre className="debuber-log__data">{formatData(data)}</pre>
      )}
    </div>
  );
};

export default LogEntry;
