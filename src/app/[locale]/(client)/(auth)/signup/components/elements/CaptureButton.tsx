import { Button } from 'primereact/button';
import React from 'react';

type ButtonPropType = {
  isFile: boolean;
  openCamara:  (...args:any[]) => any;
  imgSrc: string | null;
  retake:  (...args:any[]) => any;
  capture:  (...args:any[]) => any;
  saveImage:  (...args:any[]) => any;
};

const CaptureButton = ({
  imgSrc,
  retake,
  capture,
  saveImage,
}: ButtonPropType) => {
  return (
    <>
      <div className="flex flex-wrap justify-center gap-2">
        {imgSrc ? (
          <Button
            label="Retake"
            onClick={() => {
              retake();
            }}
          />
        ) : (
          <>
            <Button
              label="Capture"
              onClick={() => {
                capture();
              }}
            />
          </>
        )}
        <Button
          label="Use"
          severity="success"
          disabled={imgSrc ? false : true}
          onClick={() => {
            saveImage();
          }}
        />
        {/* <Button label="Delete Photo" severity="danger" /> */}
      </div>
    </>
  );
};

export default React.memo(CaptureButton);
