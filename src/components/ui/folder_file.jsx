"use client";
import { getFolders } from "@/api/request";
import { Folder } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

function Folders_files({ parentFolderId }) {
  const [folders, setFolders] = useState([]);
  const hasFetched = useRef(false);
  const param = usePathname();

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
    if (!hasFetched.current) {
      hasFetched.current = true;
      get_currDirc_Folders();
    }
  }, [parentFolderId]);

  return (
    <>
      {/* rendering curr folders */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {folders.map((folder) => (
          <Link
            key={folder._id}
            href={`${param}/${folder._id}:${encodeURIComponent(folder.name)}`}

            className="flex flex-col items-center p-3 bg-white rounded-xl shadow hover:shadow-md hover:bg-blue-50 transition"
          >
            <Folder className="w-10 h-10 text-yellow-500" />
            <span className="mt-2 text-sm font-medium text-gray-800 truncate">
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
