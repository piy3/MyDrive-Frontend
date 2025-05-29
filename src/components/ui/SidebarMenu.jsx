'use client';
import React, { useState } from 'react';
import {
  Plus,
  Home,
  Users,
  Clock,
  Star,
  Trash,
  Settings,
  LogOut,
  MoonIcon,
} from 'lucide-react';
import { ModeToggle } from './ModeToggle';

const navItems = [
  { label: 'My Drive', icon: <Home size={20} /> },
  { label: 'Shared with me', icon: <Users size={20} /> },
  { label: 'Recent', icon: <Clock size={20} /> },
  { label: 'Starred', icon: <Star size={20} /> },
  { label: 'Trash', icon: <Trash size={20} /> },
  { label: 'Manage Account', icon: <Settings size={20} /> },
  { label: 'Signout', icon: <LogOut size={20} /> },

];

const SidebarMenu = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <aside
      className={`
        fixed top-0 left-0 z-30 h-screen bg-white shadow-lg
        transition-all duration-300 ease-in-out
        flex flex-col p-4 border-r
        ${isCollapsed ? 'w-19' : 'w-64'}
        group
      `}
      onMouseEnter={() => setIsCollapsed(false)}
      onMouseLeave={() => setIsCollapsed(true)}
    >
      {/* New Button */}
      <div className="mb-6 flex justify-center">
        <button
          className={`
            flex items-center bg-blue-600 text-white rounded-full shadow-md
            hover:bg-blue-700 transition-colors duration-200
            focus:outline-none focus:ring-2 focus:ring-blue-500
            ${isCollapsed ? 'w-12 h-12 justify-center' : 'px-5 py-3'}
          `}
        >
          <Plus size={20} />
          {!isCollapsed && <span className="ml-2 font-medium">New</span>}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-grow">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.label}>
              <a
                href="#"
                className={`
                  flex items-center p-3 rounded-lg transition-all duration-200
                  hover:bg-gray-100 text-gray-700
                  ${item.label === 'My Drive' ? 'bg-blue-50 text-blue-700 font-semibold' : ''}
                `}
              >
                {item.icon}
                {!isCollapsed && (
                  <span className="ml-3 whitespace-nowrap transition-opacity duration-200">
                    {item.label}
                  </span>
                )}
              </a>
            </li>
          ))}
         
        </ul>
      </nav>
    </aside>
  );
};

export default SidebarMenu;
