'use client';

import React from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
} from "@heroui/react";

export default function File_Info({ folder, onClose }) {
  if (!folder) return null;

  return (
    <Drawer isOpen={!!folder} size="sm" onClose={onClose}>
      <DrawerContent className=" border-2 bg-popover text-popover-foreground rounded-md  dark:text-white">
        <DrawerHeader className="flex flex-col gap-1 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold">Folder Information</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            View metadata and details about this folder.
          </p>
        </DrawerHeader>

        <DrawerBody className="space-y-2 px-6 py-2">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">Folder Name</p>
            <p className="text-base font-semibold text-primary dark:text-white">{folder.name}</p>
          </div>

          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">Created At</p>
            <p className="text-base text-gray-700 dark:text-gray-300">
              {new Date(folder.createdAt).toLocaleString()}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">Last Updated</p>
            <p className="text-base text-gray-700 dark:text-gray-300">
              {new Date(folder.updatedAt).toLocaleString()}
            </p>
          </div>
        </DrawerBody>

        <DrawerFooter className="flex justify-end gap-2 border-t border-gray-200 dark:border-gray-700">
          <Button variant="outline" onPress={onClose} className="hover:cursor-pointer rounded-md dark:bg-[#1e3a5f] border-2 dark:text-white dark:border-gray-600">
            Close
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
