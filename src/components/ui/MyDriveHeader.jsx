'use client';

import React from 'react';
import ModeToggle  from  '@/components/ui/ModeToggle'; // Adjust if needed

export default function MyDriveHeader({ username = 'Guest' }) {
  const initial = username.charAt(0).toUpperCase();

  return (
    <header className=" w-auto flex items-center justify-between px-4 py-3 border-b bg-white dark:bg-gray-900 shadow-sm sticky top-0 ">
      <h1 className="text-xl font-semibold text-gray-800 dark:text-white">MyDrive</h1>

      <div className="flex items-center space-x-4">
        <ModeToggle />

        <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm uppercase">
          {initial}
        </div>
      </div>
    </header>
  );
}
