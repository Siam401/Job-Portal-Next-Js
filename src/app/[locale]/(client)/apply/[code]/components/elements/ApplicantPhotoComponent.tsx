import { useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import avatar from '@/assets/images/avatar.svg';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

export default function ApplicantPhotoComponent({
  getFormErrorMessage,
}: {
  getFormErrorMessage: (...args:any[]) => any;
}) {
  const { control, setValue, trigger } = useFormContext();
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [hasImage, setHasImage] = useState(false);
  const { data: session, status, update }: any = useSession();

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl: any = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  useEffect(() => {
    if (status === 'authenticated') {
      if (session.user.applicant.photo) {
        setHasImage(true);
        setPreview(session.user.applicant.photo);
      }
    }
  }, [update]);

  const onSelectFile = (event: any) => {
    if (!event.target.files || event.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    setSelectedFile(event.target.files[0]);
  };

  return (
    <>
      <div>
        <label
          htmlFor="email"
          className="block mb-1 text-sm font-semibold text-gray-900"
        >
          Applicant Photo<span className="text-[#FD0000] ml-1">*</span>
        </label>
        <div className="flex items-center space-x-4">
          <div className="shrink-0">
            {hasImage ? (
              <>
                <img
                  className="object-cover w-16 h-16 rounded-full"
                  src={preview}
                  alt="Current profile photo"
                />
              </>
            ) : selectedFile ? (
              <>
                <img
                  className="object-cover w-16 h-16 rounded-full"
                  src={preview}
                  alt="Current profile photo"
                />
              </>
            ) : (
              <>
                <Image
                  className="object-cover w-16 h-16 rounded-full"
                  src={avatar}
                  alt="Current profile photo"
                />
              </>
            )}
          </div>
          {status != 'authenticated' && (
            <div className="block">
              <div className="flex flex-col w-full">
                <Controller
                  name="photo"
                  control={control}
                  render={({ field: { onChange, value, ...rest } }) => (
                    <>
                      <input
                        type="file"
                        {...rest}
                        onChange={(e: any) => {
                          setValue('photo', e.target.files[0]);
                          onSelectFile(e);
                          trigger('photo');
                        }}
                        className="block w-full text-sm text-gray-700 cursor-pointer"
                      />
                    </>
                  )}
                />
              </div>
            </div>
          )}
        </div>
        {getFormErrorMessage('photo')}
      </div>
    </>
  );
}
