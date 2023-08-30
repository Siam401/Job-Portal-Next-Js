import PublicApplyForm from '@/client/apply/[code]/components/elements/PublicApplyForm';

export default function ApplicationFormComponent({
  jobDetailData,
}: {
  jobDetailData: any;
}) {
  return (
    <>
      <PublicApplyForm jobDetailData={jobDetailData} />
    </>
  );
}
