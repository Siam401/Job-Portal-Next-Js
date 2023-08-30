export default function SummaryAgeComponent({
  jobDetailData,
}: {
  jobDetailData: any;
}) {
  const ageSection = () => {
    const minAge: any = jobDetailData.summary.min_age;
    const maxAge: any = jobDetailData.summary.max_age;

    if (minAge && !maxAge) {
      return 'Age Minimum ' + minAge + ' Years';
    } else if (maxAge && !minAge) {
      return 'Age Maximum ' + maxAge + ' Years';
    } else if (minAge & maxAge) {
      return 'Age Minimum ' + minAge + ' year and Maximum ' + maxAge + ' Years';
    } else {
      // waiting for the SRS to update for this business
    }
  };
  return (
    <>
      <p className="my-3 text-[13px] font-normal text-gray-500 leading-5">
        <b>Age:</b> {ageSection()}
      </p>
    </>
  );
}
