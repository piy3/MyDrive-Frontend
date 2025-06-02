'use client';

import React, { useEffect, useRef, useState } from "react";
import {
  Folder,
  MoreVertical,
  Info,
  Share2,
  Download,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import toast from "react-hot-toast";
import { getFolders } from "@/api/request";
import File_Info from "@/components/ui/file_info";

const useGlobalStore = (selector) => {
  const [currentFolderId, _setCurrentFolderId] = useState(null);
  const setCurrentFolderId = (id) => {
    console.log("Setting current folder ID:", id);
    _setCurrentFolderId(id);
  };
  return selector({ currentFolderId, setCurrentFolderId });
};

function Folders_files({ parentFolderId }) {
  const [folders, setFolders] = useState([]);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [fileInfoData, setFileInfoData] = useState(null);
  const dropdownRefs = useRef({});
  const hasFetched = useRef(false);
  const param = usePathname();
  const setCurrentFolderId = useGlobalStore((state) => state.setCurrentFolderId);

  const get_currDirc_Folders = async () => {
    try {
      const res = await getFolders(parentFolderId);
      if (res?.data?.success) {
        setFolders(res.data.folders);
      }
    } catch (err) {
      toast.error(err.response?.message || err.message || "Failed to fetch folders.");
    }
  };

  useEffect(() => {
    setCurrentFolderId(parentFolderId);
    if (!hasFetched.current) {
      hasFetched.current = true;
      get_currDirc_Folders();
    }
  }, [parentFolderId, setCurrentFolderId]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (openDropdownId && dropdownRefs.current[openDropdownId] && !dropdownRefs.current[openDropdownId].contains(event.target)) {
        setOpenDropdownId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openDropdownId]);

  const toggleDropdown = (e, folderId) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenDropdownId(openDropdownId === folderId ? null : folderId);
  };

  const handleOptionClick = (option, folder) => {
    if (option === "File info") {
      setFileInfoData(folder);
    } else {
      toast.success(`${option} for ${folder.name}`);
    }
    setOpenDropdownId(null);
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
        {folders.map((folder) => (
          <div key={folder._id} className="relative">
            <Link
              href={`${param}/${folder._id}:${encodeURIComponent(folder.name)}`}
              className="group w-full flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 ease-in-out cursor-pointer"
            >
              <div className="flex items-center">
                <div className="flex items-center justify-center w-8 h-8 bg-yellow-100 dark:bg-yellow-900 rounded-full mr-2">
                  <Folder className="w-5 h-5 text-yellow-500 dark:text-yellow-400" />
                </div>
                <span className="text-sm font-medium text-gray-800 dark:text-gray-100 truncate">
                  {folder.name}
                </span>
              </div>
              <button
                onClick={(e) => toggleDropdown(e, folder._id)}
                className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none"
                aria-label="Folder options"
              >
                <MoreVertical className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </button>
            </Link>

            {openDropdownId === folder._id && (
              <div
                ref={(el) => (dropdownRefs.current[folder._id] = el)}
                className="absolute right-0 mt-2 w-35 bg-white dark:bg-gray-900 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-10"
              >
                <div className="py-1">
                  <button
                    onClick={() => handleOptionClick("File info", folder)}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <Info className="w-4 h-4 mr-2" /> Info
                  </button>
                  <button
                    onClick={() => handleOptionClick("Shared with", folder)}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <Share2 className="w-4 h-4 mr-2" /> Shared with
                  </button>
                  <button
                    onClick={() => handleOptionClick("Download", folder)}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <Download className="w-4 h-4 mr-2" /> Download
                  </button>
                  <button
                    onClick={() => handleOptionClick("Delete", folder)}
                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    <Trash2 className="w-4 h-4 mr-2" /> Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      {fileInfoData && <File_Info folder={fileInfoData} onClose={() => setFileInfoData(null)} />}
    </>
  );
}

export default Folders_files;
