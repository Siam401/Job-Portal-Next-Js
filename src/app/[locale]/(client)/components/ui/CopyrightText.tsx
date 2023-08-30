'use client';

type CopyrightTextProps = {
  text: string;
};

const CopyrightText = ({ text }: CopyrightTextProps) => {
  return (
    <>
      <span
        className="block text-sm text-center tracking-wide text-gray-600 dark:text-gray-600"
        dangerouslySetInnerHTML={{
          __html: text,
        }}
      />
    </>
  );
};

export default CopyrightText;
