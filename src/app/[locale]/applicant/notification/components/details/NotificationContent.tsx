'use client';

import RichText from '@/components/ui/RichText';

type NotificationContentProps = {
  date: string;
  subject: string;
  content: string;
};

const NotificationContent = ({
  date,
  subject,
  content,
}: NotificationContentProps) => {
  return (
    <div className="px-5 py-6 text-[#555] text-[14px] font-semibold">
      Mailed on : {date} <br />
      Subject : {subject}
      <div className="my-3"></div>
      <div>
        <RichText html={content} />
      </div>
    </div>
  );
};

export default NotificationContent;
