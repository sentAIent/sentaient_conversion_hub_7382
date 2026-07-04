import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SentAIent Marketing Studio',
  description: 'AI-Powered Marketing Campaign Studio',
};

import { Toaster } from 'react-hot-toast';

import Sidebar from '@/components/layout/Sidebar';
import { WorkspaceProvider } from '@/components/providers/WorkspaceProvider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex h-screen overflow-hidden bg-[#202733]">
        <WorkspaceProvider>
          <Toaster 
            position="top-center"
            toastOptions={{
              style: {
                background: '#202733',
                color: '#fff',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
                backdropFilter: 'blur(10px)',
              },
            }}
          />
          <Sidebar />
          <main className="flex-1 overflow-y-auto relative">
            {children}
          </main>
        </WorkspaceProvider>
      </body>
    </html>
  );
}
