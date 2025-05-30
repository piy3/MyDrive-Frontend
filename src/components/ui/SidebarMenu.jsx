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
  FolderPlus,
  Upload
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';

import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
} from '@/components/ui/drawer';
import { useGlobalStore } from '@/store/useGlobalStore';
import { createFolder } from '@/api/request';
import toast from 'react-hot-toast';

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
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [folderName,setfolderName] = useState("");
  const currentFolderId = useGlobalStore((store)=>store.currentFolderId);
  const handleMouseEnter = () => {
    if (!dropdownOpen) setIsCollapsed(false);
  };

  const handleMouseLeave = () => {
    if (!dropdownOpen) setIsCollapsed(true);
  };

  const handleCreateFolder = async()=>{
    if(!folderName){
      toast.error("Folder Name required");
      setfolderName("");
      return ;
    }
    //get current folder id (for now lets say we creating in root (null))
    try{
      const res = await createFolder({
        name:folderName,
        parentFolder:currentFolderId
      })
      if(res.data.success){
        toast.success("Folder Created")
      }
    }catch(err){
      console.log(err);
    }
      setfolderName("");

  }

  return (
    <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
      <aside
        className={`
          fixed top-0 left-0 z-30 h-screen bg-white shadow-lg
          transition-all duration-300 ease-in-out
          flex flex-col p-4 border-r
          ${isCollapsed ? 'w-19' : 'w-64'}
        `}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* New Button + Dropdown */}
        <div className="mb-6 flex justify-center">
          <DropdownMenu onOpenChange={(open) => setDropdownOpen(open)}>
            <DropdownMenuTrigger asChild>
              <Button
                className={`
                  flex items-center bg-blue-600 text-white rounded-full shadow-md
                  hover:bg-blue-700 transition-colors duration-200
                  focus:outline-none focus:ring-2 focus:ring-blue-500
                  ${isCollapsed ? 'w-12 h-12 justify-center' : 'px-5 py-3'}
                `}
              >
                <Plus size={20} />
                {!isCollapsed && <span className="ml-2 font-medium">New</span>}
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent side="right" className="w-52 mt-10 -ml-4">
              <DropdownMenuLabel>Quick Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onSelect={() => {
                  setDrawerOpen(true);
                  setDropdownOpen(false); // Optionally close dropdown
                }}
                className="cursor-pointer"
              >
                <FolderPlus className="mr-2 h-4 w-4" /> Create Folder
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Upload className="mr-2 h-4 w-4" /> Upload File
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Navigation */}
        <nav className="flex-grow">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link
                  href="#"
                  className={`flex items-center p-3 rounded-lg transition-all duration-200 hover:bg-gray-100 text-gray-700 ${
                    item.label === 'My Drive'
                      ? 'bg-blue-50 text-blue-700 font-semibold'
                      : ''
                  }`}
                >
                  {item.icon}
                  {!isCollapsed && (
                    <span className="ml-3 whitespace-nowrap transition-opacity duration-200">
                      {item.label}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Drawer UI */}
      <DrawerContent side="right">
        <DrawerHeader>
          <DrawerTitle>Create New Folder</DrawerTitle>
          <DrawerDescription>Organize your files in a new folder</DrawerDescription>
        </DrawerHeader>
        <div className="p-4">
          <input
            type="text"
            onChange={(e)=>setfolderName(e.target.value)}
            placeholder="Folder Name"
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button onClick={handleCreateFolder}>Create</Button>
          </DrawerClose>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default SidebarMenu;
