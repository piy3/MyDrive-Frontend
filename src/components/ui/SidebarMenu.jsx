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
import { createFolder, logoutUser } from '@/api/request';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

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
  const [folderName, setFolderName] = useState("");
  // const currentFolderId = useGlobalStore((store) => store.currentFolderId);
  // const setnewFolders = useGlobalStore((store)=>store.setnewFolders);
  const router  = useRouter();

  const handleMouseEnter = () => {
    if (!dropdownOpen) setIsCollapsed(false);
  };

  const handleMouseLeave = () => {
    if (!dropdownOpen) setIsCollapsed(true);
  };

  const currentFolderId = useGlobalStore((state) => state.currentFolderId);
const addFolderToParent = useGlobalStore((state) => state.addFolderToParent);

const handleCreateFolder = async () => {
  if (!folderName) {
    toast.error("Folder name required");
    return;
  }

  try {
    const res = await createFolder({ name: folderName, parentFolder: currentFolderId });
    if (res.data.success) {
      toast.success("Folder Created");
      addFolderToParent(currentFolderId, res.data.folder); // ✅ Add folder without refetching
    }
  } catch (err) {
    toast.error("Failed to create folder");
  }

  setFolderName("");
};

  const handleLogout = async()=>{
    try{
      const res = await logoutUser();
      if(res?.data?.success){
        toast.success("See you soon!")
        router.push('/');
      }
    }
    catch(err){
      toast.error("Failed to Logout!")
    }
  }

  return (
    <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
      <aside
        className={`
          fixed top-0 left-0 z-30 h-screen bg-sidebar text-sidebar-foreground
          shadow-lg transition-all duration-300 ease-in-out flex flex-col p-4 border-r border-sidebar-border
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
                  flex items-center bg-primary text-primary-foreground rounded-full shadow-md
                  hover:bg-primary/90 transition-colors duration-200
                  focus:outline-none focus:ring-2 focus:ring-ring
                  ${isCollapsed ? 'w-12 h-12 justify-center' : 'px-5 py-3'}
                `}
              >
                <Plus size={20} />
                {!isCollapsed && <span className="ml-2 font-medium">New</span>}
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent side="right" className="w-52 mt-10 -ml-4 bg-popover text-popover-foreground border border-border">
              <DropdownMenuLabel>Quick Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onSelect={() => {
                  setDrawerOpen(true);
                  setDropdownOpen(false);
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
    {navItems.map((item) =>
      item.label === "Signout" ? (
        <li key={item.label}>
          <button
            onClick={handleLogout}
            className={` hover:cursor-pointer flex items-center w-full text-left p-3 rounded-lg transition-all duration-200 hover:bg-muted text-muted-foreground ${
              item.label === 'My Drive'
                ? 'bg-secondary text-secondary-foreground font-semibold'
                : ''
            }`}
          >
            {item.icon}
            {!isCollapsed && (
              <span className="ml-3 whitespace-nowrap transition-opacity duration-200">
                {item.label}
              </span>
            )}
          </button>
        </li>
      ) : (
        <li key={item.label}>
          <Link
            href="#"
            className={`flex items-center p-3 rounded-lg transition-all duration-200 hover:bg-muted text-muted-foreground ${
              item.label === 'My Drive'
                ? 'bg-secondary text-secondary-foreground font-semibold'
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
      )
    )}
  </ul>
</nav>

      </aside>

      {/* Drawer UI */}
      <DrawerContent side="right" className="bg-background text-foreground border-l border-border">
        <DrawerHeader>
          <DrawerTitle>Create New Folder</DrawerTitle>
          <DrawerDescription>Organize your files in a new folder</DrawerDescription>
        </DrawerHeader>
        <div className="p-4">
          <input
            type="text"
            onChange={(e) => setFolderName(e.target.value)}
            placeholder="Folder Name"
            className="w-full border border-border px-3 py-2 rounded bg-input text-foreground"
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
