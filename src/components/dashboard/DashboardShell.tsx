'use client';

import { ReactNode } from 'react';

interface DashboardShellProps {
  children: ReactNode;
}

export default function DashboardShell({ children }: DashboardShellProps) {
  return (
    <div className="flex-1 min-h-screen">
      {/* Main content */}
      <main className="flex-1 overflow-y-auto py-6">
        {children}
      </main>
    </div>
  );
} 