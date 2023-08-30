import DescriptionComponent from '@/client/apply/[code]/components/sections/DescriptionComponent';
import SideComponent from '@/client/apply/[code]/components/sections/SideComponent';
import ApplyApi from '@/app/api/client/apply';

import { Metadata } from 'next';

type Props = {
  params: { code: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const jobCode = params.code;
  const jobDetailData: any = await ApplyApi.getJobDetail(jobCode);

  return {
    title: jobDetailData ? jobDetailData.seo.title : 'Site Title',
    description: jobDetailData
      ? jobDetailData.seo.description
      : 'Site Description',
    icons: jobDetailData && jobDetailData.seo.image && {
      icon: {
        rel: 'icon',
        type: 'image/x-icon',
        sizes: '16x16',
        url: jobDetailData.seo.image,
      },
    },
    keywords: jobDetailData && jobDetailData.seo.keywords,
  };
}

export default async function ApplyDetail({
  params,
}: {
  params: { code: string };
}) {
  const jobCode = params.code;
  const jobDetailData: any = await ApplyApi.getJobDetail(jobCode);

  return (
    <>
      <DescriptionComponent jobDetailData={jobDetailData} />
      <SideComponent jobDetailData={jobDetailData} />
    </>
  );
}
