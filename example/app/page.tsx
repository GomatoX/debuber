'use client';

import { useState } from 'react';
import { debuber, useDebuber } from 'debuber';

export default function Home() {
  const [counter, setCounter] = useState(0);
  const { logs, clear, toggle, isOpen } = useDebuber();

  const handleIncrement = () => {
    const newValue = counter + 1;
    setCounter(newValue);
    debuber.info('Counter incremented', { from: counter, to: newValue });
  };

  const handleDecrement = () => {
    const newValue = counter - 1;
    setCounter(newValue);
    debuber.info('Counter decremented', { from: counter, to: newValue });
  };

  const logDebug = () => {
    debuber.debug('This is a debug message', {
      timestamp: new Date().toISOString(),
      random: Math.random(),
    });
  };

  const logInfo = () => {
    debuber.info('User performed an action', {
      action: 'button_click',
      component: 'HomePage',
    });
  };

  const logWarning = () => {
    debuber.warn('Cache miss detected', {
      key: 'user_preferences',
      fallback: 'using defaults',
    });
  };

  const logError = () => {
    debuber.error('API request failed', {
      endpoint: '/api/users',
      status: 500,
      message: 'Internal Server Error',
    });
  };

  const logGroup = () => {
    debuber.group('User Flow');
    debuber.info('Step 1: User opened page');
    debuber.info('Step 2: User clicked button');
    debuber.info('Step 3: Request sent');
    debuber.groupEnd();
  };

  const logMany = () => {
    for (let i = 0; i < 10; i++) {
      debuber.log(`Batch log #${i + 1}`, { index: i });
    }
  };

  return (
    <main className="container">
      <h1>🦫 Debuber Demo</h1>
      <p className="subtitle">Visual debug logger for React/Next.js</p>

      <div className="card">
        <h2>Counter Example</h2>
        <div className="counter">{counter}</div>
        <div className="buttons">
          <button className="btn-info" onClick={handleDecrement}>
            - Decrement
          </button>
          <button className="btn-info" onClick={handleIncrement}>
            + Increment
          </button>
        </div>
      </div>

      <div className="card">
        <h2>Log Levels</h2>
        <div className="buttons">
          <button className="btn-debug" onClick={logDebug}>
            Debug
          </button>
          <button className="btn-info" onClick={logInfo}>
            Info
          </button>
          <button className="btn-warn" onClick={logWarning}>
            Warning
          </button>
          <button className="btn-error" onClick={logError}>
            Error
          </button>
        </div>
      </div>

      <div className="card">
        <h2>Advanced</h2>
        <div className="buttons">
          <button className="btn-info" onClick={logGroup}>
            Log Group
          </button>
          <button className="btn-debug" onClick={logMany}>
            Log 10 Items
          </button>
          <button className="btn-clear" onClick={clear}>
            Clear All ({logs.length})
          </button>
          <button className="btn-clear" onClick={toggle}>
            {isOpen ? 'Hide Panel' : 'Show Panel'}
          </button>
        </div>
      </div>

      <div className="info-box">
        <h3>How to Use</h3>
        <ul>
          <li>
            Click the <strong>beaver icon</strong> in the bottom-right corner
          </li>
          <li>
            Or press <code>Ctrl+Shift+D</code> to toggle the panel
          </li>
          <li>
            URL param: add <code>?debuber=demo</code> to enable
          </li>
          <li>Logs persist across page refreshes (localStorage)</li>
        </ul>
      </div>
    </main>
  );
}
