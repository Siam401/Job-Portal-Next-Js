import { saveResume } from '@/app/api/applicant/resume';
import pdfIcon from '@/assets/icons/applicant/pdf.svg';
import uploadSVG from '@/assets/icons/applicant/upload.svg';
import wordIcon from '@/assets/icons/applicant/word.svg';
import { closeModal } from '@/redux/features/modal.slice';
import { toastActions } from '@/redux/features/toast.slice';
import { useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

const ModalContent = () => {
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { data: session, update: updateSession }: any = useSession();

  const allowedFileTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      if (!allowedFileTypes.includes(file.type)) {
        setErrorMessage('Only PDF and Word files are supported.');
        setSelectedFile(null);
        setPreview(null);
      } else if (file && file.size > 2 * 1024 * 1024) {
        // check if file size exceeds 2 MB
        setErrorMessage('File size exceeds 2 MB limit.');
        setSelectedFile(null);
        setPreview(null);
      } else {
        setSelectedFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setErrorMessage(null);
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files && e.dataTransfer.files[0];
    if (file) {
      if (!allowedFileTypes.includes(file.type)) {
        setErrorMessage('Only PDF and Word files are supported.');
        setSelectedFile(null);
        setPreview(null);
      } else if (file && file.size > 2 * 1024 * 1024) {
        // check if file size exceeds 2 MB
        setErrorMessage('File size exceeds 2 MB limit.');
        setSelectedFile(null);
        setPreview(null);
      } else {
        setSelectedFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setErrorMessage(null);
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const removeFile = () => {
    setSelectedFile(null);
    setPreview(null);
    setErrorMessage(null);
  };

  const queryClient = useQueryClient();

  const handleUpload = async () => {
    if (selectedFile) {
      const response = await saveResume({ resume: selectedFile });
      if (response?.success === true) {
        queryClient.invalidateQueries(['isCvAttached']);
        dispatch(
          toastActions.showToast({
            type: 'success',
            summary: 'Success',
            message: 'Resume uploaded successfully.',
          }),
        );

        await updateSession({
          ...session,
          user: {
            ...session?.user,
            applicant: {
              ...session?.user?.applicant,
              resume: response?.data?.resume,
            },
          },
        });

        // Reset the form
        setSelectedFile(null);
        setPreview(null);
        setErrorMessage(null);
        dispatch(closeModal('resumeUploadModal'));
      } else {
        setErrorMessage(
          (response?.message ?? 'Something went wrong').toString(),
        );
      }
    }
  };

  return (
    <>
      <div
        className="relative bg-white rounded-lg"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <div className="space-y-3">
          {/* section: display preview or initial */}
          <div className="flex flex-col items-center justify-center w-full">
            {preview ? (
              <>
                <div className="relative mt-3">
                  <div className="object-contain w-full h-40 overflow-hidden rounded-lg">
                    {selectedFile?.type === 'application/pdf' ? (
                      <Image
                        priority
                        src={pdfIcon}
                        alt="pdf file"
                        className="w-full h-full"
                      />
                    ) : (
                      <Image
                        priority
                        src={wordIcon}
                        alt="word file"
                        className="w-full h-full"
                      />
                    )}
                  </div>

                  <button
                    onClick={removeFile}
                    className="absolute h-[36px] w-[36px] top-[-7px] right-[-35px] bg-red-500 rounded-full flex items-center justify-center hover:bg-red-700"
                  >
                    <i className="text-white fa fa-redo"></i>
                  </button>
                </div>

                <div className="mt-2 text-[16px] text-[#222] font-semibold text-center">
                  {selectedFile?.name}
                </div>
              </>
            ) : (
              <label
                htmlFor="upload-resume-input"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-[#00ACF5]/60 rounded-lg bg-[#00ACF5]/10 hover:opacity-75 cursor-pointer"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Image priority src={uploadSVG} alt="upload" />
                  <p className="mt-3 mb-2 text-[16px] text-[#222] font-semibold">
                    Drag & Drop Files or
                    <span className="text-[#22A801] underline ps-1">
                      Browse
                    </span>
                  </p>
                  <p className="text-[12px] text-[#777] font-semibold">
                    Supported formats: Word & PDF
                  </p>
                </div>
                <input
                  id="upload-resume-input"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            )}
          </div>

          {/* section: error message */}
          {errorMessage && (
            <div className="text-center text-red-500 test-sm">
              {errorMessage}
            </div>
          )}

          {/* section: upload button */}
          <button
            type="button"
            className={`w-full text-white bg-[#F25F0D] hover:bg-[#db560b] focus:ring-2 focus:outline-none focus:ring-blue-300 font-semibold rounded-lg text-md px-5 py-2.5 text-center ${
              selectedFile ? '' : 'cursor-not-allowed opacity-50'
            }`}
            onClick={handleUpload}
            disabled={selectedFile ? false : true}
          >
            Upload Resume
          </button>
        </div>
      </div>
    </>
  );
};

export default ModalContent;
