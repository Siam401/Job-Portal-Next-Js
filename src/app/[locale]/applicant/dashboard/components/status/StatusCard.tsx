'use client';
type StatusCardProps = {
  iconClass: string;
  bgColor: string;
  textColor: string;
  value: number;
  label: string;
};

const StatusCard = ({
  iconClass,
  bgColor,
  textColor,
  value,
  label,
}: StatusCardProps) => {
  return (
    <>
      <div
        className={`md:py-[18px] py-[8px] px-[14px] sm:flex block text-center items-center justify-between bg-white rounded-lg shadow-md border border-[#E5E7EB]`}
      >
        <div
          className={`md:w-[65px] md:h-[60px] w-[40px] h-[36px] rounded-lg ${bgColor} flex items-center justify-center sm:mx-0 mx-auto`}
        >
          <i
            className={`${iconClass} ${textColor} md:text-[37px] text-[16px]`}
          ></i>
        </div>
        <div className="text-end">
          <h1
            className={`${textColor} md:text-[47px] text-[20px] font-extrabold md:leading-[31px] leading-[24px] sm:text-end text-center`}
          >
            {value}
          </h1>
          <h4
            className={`md:mt-2 mt-0 text-[#3d3d3d] 2xl:text-[20px] xl:text-[16px] md:text-[16px] text-[14px] font-semibold sm:text-end text-center sm:leading-[24px] leading-[16px]`}
          >
            {label}
          </h4>
        </div>
      </div>
    </>
  );
};

export default StatusCard;
