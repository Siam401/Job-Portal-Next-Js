'use client';
import uploadSVG from '@/assets/icons/applicant/upload.svg';
import Image from 'next/image';
import React, { useEffect, useRef } from 'react';

type PropType = {
  selectedFile: any;
  setSelectedFile: any;
  setProfileImageUrl: any;
  videoConstraints: any;
  photoRef: any;
  profileImageUrl: any;
};

export default function BrowseComponent(props: PropType) {
  const selectedFile = props.selectedFile;
  const setSelectedFile = props.setSelectedFile;
  const setProfileImageUrl = props.setProfileImageUrl;
  const profileImageUrl = props.profileImageUrl;

  const handleEnter = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleOver = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleLeave = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleClick = () => {
    const fileInput = document.querySelector(
      '.fileUpload',
    ) as HTMLDivElement | null;
    if (fileInput != null) {
      fileInput.click();
    }
  };

  const handleUpload = (e: any) => {
    e.preventDefault();
    e.stopPropagation();

    const [file] = e.target.files || e.dataTransfer.files;
    setSelectedFile(file);
  };

  return (
    <>
      <label
        htmlFor="browse"
        className="w-full sm:h-[440px] h-[340px] border-2 border-dashed border-[#00ACF5]/60 rounded-lg bg-[#00ACF5]/10 hover:opacity-75 flex items-center cursor-pointer"
        onClick={() => {
          handleClick();
        }}
        onDragEnter={(e) => handleEnter(e)}
        onDragLeave={(e) => handleLeave(e)}
        onDragOver={(e) => handleOver(e)}
        onDrop={(e) => handleUpload(e)}
        ref={props.photoRef}
      >
        <input
          id="browse"
          type="file"
          className="hidden"
          onChange={(e: any) => setSelectedFile(e.target.files[0])}
        />
        <div className="flex flex-col items-center w-full text-center">
          {selectedFile ? (
            <div className="relative">
              <img
                className="w-[280px] max-w-full h-[280px] object-cover object-center"
                src={URL.createObjectURL(selectedFile)}
                alt="webcam"
              />
              <button
                className="absolute h-[40px] w-[40px] top-[-18px] right-[-18px] bg-red-500 rounded-full flex items-center justify-center hover:bg-red-700 border-4 border-[#E5F7FE]"
                onClick={(e: any) => {
                  setSelectedFile(null);
                  setProfileImageUrl(null);
                  e.preventDefault();
                }}
              >
                <i className="text-white fa fa-redo"></i>
              </button>
            </div>
          ) : profileImageUrl ? (
            <>
              <img
                className="w-[280px] max-w-full h-[280px] object-cover object-center"
                src={profileImageUrl}
                alt="webcam"
              />
            </>
          ) : (
            <>
              <Image priority src={uploadSVG} alt="upload" />
              <h3 className="mt-2 text-[16px] text-[#000] font-semibold">
                Drag & drop Files or{' '}
                <span className="underline text-[#22A801] text-[16px] font-semibold">
                  Browse
                </span>
              </h3>
            </>
          )}
        </div>
      </label>
    </>
  );
}
