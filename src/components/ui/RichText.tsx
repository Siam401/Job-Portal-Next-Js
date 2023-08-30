import React from 'react';

type Props = { html: string };

export default function RichText({ html }: Props) {
  const markup = { __html: html };
  return <div dangerouslySetInnerHTML={markup} />;
}
