"use client";
import { getFolders } from "@/api/request";
import { useGlobalStore } from "@/store/useGlobalStore";
import { Folder } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

function Folders_files({ parentFolderId }) {
  const [folders, setFolders] = useState([]);
  const hasFetched = useRef(false);
  const param = usePathname();
  const setCurrentFolderId = useGlobalStore(
    (state) => state.setCurrentFolderId
  );

  const get_currDirc_Folders = async () => {
    try {
      const res = await getFolders(parentFolderId);
      if (res?.data?.success) {
        setFolders(res.data.folders);
      }
    } catch (err) {
      toast.error(err.response?.message || err.message);
    }
  };

  useEffect(() => {
    setCurrentFolderId(parentFolderId);
    if (!hasFetched.current) {
      hasFetched.current = true;
      get_currDirc_Folders();
    }
  }, [parentFolderId]);

  return (
    <>
      {/* rendering curr folders */}
      <div className="grid grid-cols-2 mt-1  md:grid-cols-4 lg:grid-cols-6 gap-4">
        {folders.map((folder) => (
          <Link
            key={folder._id}
            href={`${param}/${folder._id}:${encodeURIComponent(folder.name)}`}
            className="
            border-1 border-black 
      group w-full max-w-[160px] flex flex-col items-center p-4
      bg-white dark:bg-[#1f1f1f] rounded-xl  dark:border-gray-700
      shadow-sm hover:shadow-md hover:bg-blue-50 dark:hover:bg-blue-900/20
      transition-all duration-300 ease-in-out
    "
          >
            <div className="flex items-center justify-center w-14 h-14 bg-yellow-100 dark:bg-yellow-900 rounded-full">
              <Folder className="w-8 h-8 text-yellow-500 dark:text-yellow-400" />
            </div>
            <span className="mt-3 text-sm font-medium text-gray-800 dark:text-gray-100 text-center truncate w-full">
              {folder.name}
            </span>
          </Link>
        ))}

        {/* Files */}
        {/* {folderContent.files.map((fileName) => {
        const ext = fileName.split(".").pop()?.toLowerCase();
        const icon =
          ext === "jpg" || ext === "png" || ext === "jpeg" ? (
            <ImageIcon className="w-10 h-10 text-purple-500" />
          ) : (
            <FileText className="w-10 h-10 text-gray-600" />
          );

        return (
          <div
            key={fileName}
            className="flex flex-col items-center p-3 bg-white rounded-xl shadow hover:shadow-md"
          >
            {icon}
            <span className="mt-2 text-sm text-gray-700 truncate">
              {fileName}
            </span>
          </div>
        );
      })} */}
      </div>
    </>
  );
}

export default Folders_files;
