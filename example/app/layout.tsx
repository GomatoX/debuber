import type { Metadata } from 'next';
import { DebuberProvider } from 'debuber';
import './globals.css';

export const metadata: Metadata = {
  title: 'Debuber Example',
  description: 'Testing the Debuber debug logger',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <DebuberProvider
          config={{
            enabled: true,
            secretKey: 'demo',
            keyboardShortcut: 'ctrl+shift+d',
            persist: true,
            maxLogs: 100,
            position: 'bottom-right',
            defaultOpen: false,
            bubbleSize: 48,
          }}
        >
          {children}
        </DebuberProvider>
      </body>
    </html>
  );
}
