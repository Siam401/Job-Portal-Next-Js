'use client';

import wordSVG from '@/assets/icons/applicant/word.svg';
import TableSection from './TableSection';
import DownloadPdf from './DownloadPdf';
import Image from 'next/image';

type ViewResumeComponentProps = { resumeData: any };

const ViewResumeComponent = ({ resumeData }: ViewResumeComponentProps) => {
  return (
    <>
      <div className="py-8">
        {/* section: download Buttons */}
        <div className="mx-auto w-auto table">
          <h3 className="text-center text-[17px] font-bold text-[#777] uppercase mb-2">
            Download
          </h3>
          <div className="flex items-center justify-center mb-5">
            <a
              href="#"
              className="block w-auto mx-4 hover:opacity-75 transition ease-in-out"
              data-tooltip-target="tooltip-word"
              data-tooltip-placement="bottom"
            >
              <Image src={wordSVG} alt="doc" priority />
            </a>
            <DownloadPdf resumeData={resumeData} />

            <div
              id="tooltip-word"
              role="tooltip"
              className="absolute z-10 invisible inline-block px-3 py-1 text-sm font-semibold text-white transition-opacity duration-300 bg-[#000] rounded-lg shadow-sm opacity-0"
            >
              Word Format
            </div>
            <div
              id="tooltip-pdf"
              role="tooltip"
              className="absolute z-10 invisible inline-block px-3 py-1 text-sm font-semibold text-white transition-opacity duration-300 bg-[#000] rounded-lg shadow-sm opacity-0"
            >
              PDF Format
            </div>
          </div>
        </div>

        <div className="mx-auto w-[800px] shadow-lg rounded-lg border border-[#E5E7EB]">
          <TableSection resumeData={resumeData} />
        </div>
      </div>
    </>
  );
};

export default ViewResumeComponent;
