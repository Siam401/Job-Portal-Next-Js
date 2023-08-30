import { useCallback, useEffect, useRef, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import avatar from '@/assets/images/avatar.svg';
import Image from 'next/image';
import CaptureArea from '@/app/[locale]/(client)/(auth)/signup/components/elements/CaptureArea';

export default function PhotoComponent({
  getFormErrorMessage,
  selectedFile,
  setSelectedFile,
}: any) {
  const photoRef = useRef<any>(null);
  const { control, setValue, trigger } = useFormContext();
  const [preview, setPreview] = useState();
  const [visible, setVisible] = useState<boolean>(false);

  const [devices, setDevices] = useState([]);

  const handleDevices = useCallback(
    (mediaDevices: any) =>
      setDevices(mediaDevices.filter(({ kind }: any) => kind === 'videoinput')),
    [setDevices],
  );

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(handleDevices);
  }, [handleDevices]);

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      photoRef.current.value = null;
      return;
    }

    const objectUrl: any = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

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
            {selectedFile ? (
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
          <div className="block">
            <div className="flex flex-col w-full mb-3">
              <Controller
                name="photo"
                control={control}
                render={({ field: { ref, onChange, value, ...rest } }) => (
                  <>
                    <input
                      type="file"
                      ref={photoRef}
                      {...rest}
                      onChange={(e: any) => {
                        setValue('photo', e.target.files[0]);
                        onSelectFile(e);
                        trigger('photo');
                      }}
                      className="block w-full p-0 text-sm text-gray-700 cursor-pointer"
                    />
                  </>
                )}
              />
            </div>
            <button
              className="w-full block mt-3 py-1 px-3 text-[14px] font-semibold rounded-full text-center text-white bg-[#3399FE] hover:bg-[#3399FE] shadow-[0_4px_9px_-4px_#3399FE] hover:shadow-none ease-in-out duration-300"
              onClick={() => setVisible(true)}
              disabled={devices.length == 0 ? true : false}
            >
              Take Photo
            </button>
          </div>
        </div>
        {getFormErrorMessage('photo')}
      </div>

      <CaptureArea
        visible={visible}
        setVisible={setVisible}
        setSelectedFile={setSelectedFile}
        selectedFile={selectedFile}
        photoRef={photoRef}
      />
    </>
  );
}
