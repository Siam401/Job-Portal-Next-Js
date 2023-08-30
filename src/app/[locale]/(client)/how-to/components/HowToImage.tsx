import { ReactNode } from 'react';

interface HowToImageProps {
  //   children: ReactNode;
  imgSrc: string;
}

const HowToImage = ({ imgSrc }: HowToImageProps) => {
  return (
    <>
      <div className="flex justify-center">
        <img className="snap-center" src={imgSrc} alt="img" />
      </div>
    </>
  );
};

export default HowToImage;
