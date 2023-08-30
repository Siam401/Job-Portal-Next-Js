'use client';

import Link from 'next/link';

type JobScheduleCardProps = {
  day: string;
  month: string;
  description: string;
  time: string;
  href?: string;
};

const JobScheduleCard = ({
  day,
  month,
  description,
  time,
  href,
}: JobScheduleCardProps) => {
  return (
    <>
      <Link
        href={href ? href : ''}
        className="flex items-center rounded-[6px] bg-white border border-[#c1c1c1] hover:bg-[#22A801]/[0.07] hover:border-[#22A801] transition ease-in-out"
      >
        <div className="flex flex-col items-center h-[46px] w-[56px] border-e border-[#d9d9d9]">
          <h1 className="text-[19px] text-[#023161] font-extrabold text-center">
            {day}
          </h1>
          <span className="text-[14px] text-[#023161] font-base leading-[10px]">
            {month}
          </span>
        </div>
        <div className="w-full px-3 py-2">
          <h3 className="text-[#5d5d5d] text-[13px] font-semibold leading-[18px]">
            {description}
          </h3>
          <h3 className="text-[#023161] text-[13px] font-semibold">
            Interview schedule at: {time}
          </h3>
        </div>
      </Link>
    </>
  );
};

export default JobScheduleCard;
