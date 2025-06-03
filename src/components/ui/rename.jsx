'use client';

import React, { useState, useEffect } from 'react';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerClose,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { renameFolder } from '@/api/request';
import toast from 'react-hot-toast';
import { useGlobalStore } from '@/store/useGlobalStore';

function Rename({ open, onClose, folder }) {
  const [folderName, setFolderName] = useState('');
  const updateFolderInStore = useGlobalStore((state) => state.updateFolderInParent);

  useEffect(() => {
    if (folder) {
      setFolderName(folder.name);
    }
  }, [folder]);

  const handleRenameFolder = async () => {
    if (!folderName.trim()) {
      toast.error("Folder name can't be empty");
      return;
    }

    try {
        // console.log("folder:: ",folder._id)
      const res = await renameFolder({folderId:folder._id,  newName: folderName });
      if (res.data.success) {
        toast.success("Folder renamed");
        updateFolderInStore(folder.parentFolder || null, res.data.folder); // Update global store
        onClose(); // Close drawer
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to rename folder");
    }
  };

  return (
    <Drawer open={open} onOpenChange={onClose}>
      <DrawerContent side="right" className="bg-background text-foreground border-l border-border">
        <DrawerHeader>
          <DrawerTitle>Rename Folder</DrawerTitle>
        </DrawerHeader>
        <div className="p-4">
          <input
            type="text"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
            placeholder="Folder Name"
            className="w-full border border-border px-3 py-2 rounded bg-input text-foreground"
          />
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button onClick={handleRenameFolder}>Rename</Button>
          </DrawerClose>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default Rename;
