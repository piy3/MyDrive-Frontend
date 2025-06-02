"use client";
import React, { useState } from "react";
import { Upload } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";

const FileUploader = () => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      toast.error("Please select at least one file.");
      return;
    }

    const formData = new FormData();
    files.forEach((file) => formData.append("files", file)); // key must match backend

    try {
      setUploading(true);
      const res = await axios.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          console.log(`Upload Progress: ${percent}%`);
        },
      });

      toast.success("Files uploaded successfully!");
      setFiles([]);
    } catch (err) {
      toast.error("Upload failed.");
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <label
        htmlFor="file-upload"
        className="flex items-center justify-center w-full p-4 border-2 border-dashed rounded-lg cursor-pointer text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
      >
        <Upload className="w-6 h-6 mr-2" />
        Click to select files
        <input
          id="file-upload"
          type="file"
          multiple
          onChange={handleFileChange}
          className="hidden"
        />
      </label>

      {files.length > 0 && (
        <ul className="mt-4 space-y-2 text-sm text-gray-700 dark:text-gray-200">
          {files.map((file, idx) => (
            <li key={idx} className="truncate">{file.name}</li>
          ))}
        </ul>
      )}

      <button
        onClick={handleUpload}
        disabled={uploading}
        className="mt-4 w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        {uploading ? "Uploading..." : "Upload Files"}
      </button>
    </div>
  );
};

export default FileUploader;
