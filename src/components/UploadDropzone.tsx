"use client";

import { useCallback, useState } from "react";
import { Upload } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { generateReactHelpers } from "@uploadthing/react";
import type { OurFileRouter } from "~/app/api/uploadthing/core";

const { useUploadThing } = generateReactHelpers<OurFileRouter>();

interface UploadDropzoneProps {
  onUploadComplete: (imageUrl: string) => void;
}

export function UploadDropzone({ onUploadComplete }: UploadDropzoneProps) {
  const [isUploading, setIsUploading] = useState(false);

  const { startUpload } = useUploadThing("imageUploader", {
    onClientUploadComplete: (res) => {
      if (res && res[0]) {
        onUploadComplete(res[0].url);
        setIsUploading(false);
      }
    },
    onUploadError: (error) => {
      alert(`ERROR! ${error.message}`);
      setIsUploading(false);
    },
  });

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setIsUploading(true);
      await startUpload(acceptedFiles);
    },
    [startUpload],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif", ".webp"],
    },
    maxFiles: 1,
    disabled: isUploading,
  });

  return (
    <div>
      <div
        {...getRootProps()}
        className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-white/10 py-12 text-center transition-all hover:border-orange-500/50 ${isDragActive ? "border-orange-500 bg-orange-500/10" : ""} ${isUploading ? "pointer-events-none opacity-50" : ""}`}
      >
        <input {...getInputProps()} />
        <Upload className="mb-4 h-12 w-12 text-white/50" />
        {isDragActive ? (
          <p className="text-lg text-white/90">Drop your meme here...</p>
        ) : isUploading ? (
          <div className="space-y-2">
            <p className="text-lg text-white/90">Uploading...</p>
            <p className="text-sm text-white/50">Please wait</p>
          </div>
        ) : (
          <div className="space-y-2">
            <p className="text-lg text-white/90">
              Drag & drop your meme here, or click to select
            </p>
            <p className="text-sm text-white/50">
              Supports JPG, PNG, GIF up to 10MB
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
