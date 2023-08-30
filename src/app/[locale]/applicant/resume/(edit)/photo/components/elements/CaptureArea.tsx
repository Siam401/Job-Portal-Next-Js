'use client';
import React from 'react';
import Webcam from 'react-webcam';
import { useFormContext } from 'react-hook-form';
import { Dialog } from 'primereact/dialog';
import { dataURLtoFile } from '@/services/Utility';
import CaptureButton from './CaptureButton';

export default function CaptureArea({
  visible,
  setVisible,
  setSelectedFile,
  photoRef,
}: any) {
  const videoConstraints = {
    width: 300,
    height: 300,
  };

  const resuletionConstraints = {
    width: 1280,
    height: 1080,
  };

  const fileName = 'image';

  const webcamRef = React.useRef<any>(null);
  const [isFile, setIsFile] = React.useState<any>(true);
  const [imgSrc, setImgSrc] = React.useState<any>(null);
  // const form = useFormContext();

  const openCamara = () => {
    setIsFile(false);
  };

  const capture = React.useCallback(() => {
    const screenShot = webcamRef.current.getScreenshot(resuletionConstraints);
    setImgSrc(screenShot);
  }, [webcamRef]);

  const retake = () => {
    setImgSrc(null);
  };

  // Use state to store the selected file
  const [file, setFile] = React.useState<any>(null);

  const saveImage: any = () => {
    const file = dataURLtoFile(imgSrc, 'avatar.jpg');
    // form.setValue('photo', file);
    // form.trigger('photo');
    setSelectedFile(file);
    setIsFile(false);
    setImgSrc(null);
    photoRef.current.value = null;
    setVisible(false);
  };

  // React.useEffect(() => {
  //   if (fileName) {
  //     form.setValue(fileName, file);
  //   } else {
  //     form.setValue('image', file);
  //   }
  // }, [file]);

  return (
    <Dialog
      closable={false}
      dismissableMask={true}
      visible={visible}
      onHide={() => setVisible(false)}
    >
      <div className="flex justify-center">
        {imgSrc ? (
          <img
            src={imgSrc}
            alt="webcam"
            className="mb-2"
            style={videoConstraints}
          />
        ) : (
          <>
            <div
              className="mb-2"
              style={{ minHeight: '300px', minWidth: '300px' }}
            >
              <Webcam
                id="webcam"
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
              />
            </div>
          </>
        )}
      </div>
      <CaptureButton
        isFile={isFile}
        openCamara={openCamara}
        imgSrc={imgSrc}
        retake={retake}
        capture={capture}
        saveImage={saveImage}
      />
    </Dialog>
  );
}
