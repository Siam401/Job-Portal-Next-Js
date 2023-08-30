import { HTApplyItem } from '@/types/howToApply';

interface HowToStepsProps {
  items: HTApplyItem[];
}

const HowToSteps = ({ items }: HowToStepsProps) => {
  return (
    <>
      <div className="max-w-screen mx-auto">
        <ol className="relative mt-10 ml-10 border-l border-gray-300">
          {items.map((item, index) => (
            <li key={index} className="mb-10 ml-6">
              <span className="absolute flex items-center justify-center w-6 h-6 bg-white rounded-full -left-3 ring-[6px] ring-[#d9d9d9]">
                {index === 0 ? (
                  <i className="fa fa-caret-down text-[14px] text-[#4D7BFF]"></i>
                ) : index === items.length - 1 ? (
                  <i className="fa fa-check-double text-[14px] text-[#3AB54B]"></i>
                ) : (
                  <i className="fa fa-angles-down text-[14px] text-[#4D7BFF]"></i>
                )}
              </span>
              <time className="block text-[12px] font-bold leading-none text-gray-400 uppercase">
                {item.title}
              </time>
              <h3 className="flex items-center text-md font-semibold text-gray-600">
                {item.sub_title}
              </h3>
              <p className="mb-4 text-sm font-normal text-gray-500">
                {item.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
};

export default HowToSteps;
