
import React, { useRef, useState } from 'react';

interface VideoUploadProps {
  onFileChange: (file: File) => void;
}

const VideoUpload: React.FC<VideoUploadProps> = ({ onFileChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileSelect = (files: FileList | null) => {
    if (files && files[0]) {
      onFileChange(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelect(e.dataTransfer.files);
      e.dataTransfer.clearData();
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-stone-200">
      <label
        htmlFor="video-upload"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-xl cursor-pointer transition-colors duration-300 ${isDragging ? 'border-red-500 bg-red-50' : 'border-stone-300 hover:border-red-400 hover:bg-red-50'}`}
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <svg className="w-10 h-10 mb-4 text-stone-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
          </svg>
          <p className="mb-2 text-lg text-stone-600">
            <span className="font-semibold">Click to upload</span> or drag and drop
          </p>
          <p className="text-sm text-stone-500">MP4, MOV, or M4V (MAX. 2GB)</p>
        </div>
        <input
          id="video-upload"
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept="video/*"
          onChange={(e) => handleFileSelect(e.target.files)}
        />
      </label>
    </div>
  );
};

export default VideoUpload;
