'use client';
import React, { useState } from 'react';
import { uploadFile } from '@/actions/files/uploadFiles';  // Adjust the path as needed

const FileUploadComponent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [downloadURL, setDownloadURL] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);

    try {
      // Call the uploadFile function
      const url = await uploadFile(file, 'your-folder-name'); // Optional folder name
      setDownloadURL(url);
      console.log('File uploaded successfully:', url);
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <input type="file" onChange={handleFileChange} />
      <button
        className="bg-blue-500 text-white p-2 rounded mt-4"
        onClick={handleUpload}
        disabled={!file || uploading}
      >
        {uploading ? 'Uploading...' : 'Upload'}
      </button>

      {downloadURL && (
        <div className="mt-4">
          <p>Download URL:</p>
          <a href={downloadURL} target="_blank" rel="noopener noreferrer">
            {downloadURL}
          </a>
        </div>
      )}
    </div>
  );
};

export default FileUploadComponent;
