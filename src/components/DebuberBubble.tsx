import React from 'react';
import type { Position } from '../types';
import { BeaverIcon } from './icons/BeaverIcon';

interface DebuberBubbleProps {
  position: Position;
  size: number;
  logCount: number;
  hasWarning: boolean;
  hasError: boolean;
  onClick: () => void;
}

export const DebuberBubble: React.FC<DebuberBubbleProps> = ({
  position,
  size,
  logCount,
  hasWarning,
  hasError,
  onClick,
}) => {
  const classNames = [
    'debuber-bubble',
    `debuber-bubble--${position}`,
    hasError && 'debuber-bubble--has-error',
    hasWarning && !hasError && 'debuber-bubble--has-warn',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      className={classNames}
      onClick={onClick}
      style={{ width: size, height: size }}
      aria-label="Toggle debug panel"
      type="button"
    >
      <BeaverIcon className="debuber-bubble__icon" />
      {logCount > 0 && (
        <span className="debuber-bubble__badge">{logCount > 99 ? '99+' : logCount}</span>
      )}
    </button>
  );
};

export default DebuberBubble;
