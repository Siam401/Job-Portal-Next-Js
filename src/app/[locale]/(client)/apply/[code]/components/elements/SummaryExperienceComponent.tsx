export default function SummaryExperienceComponent({
  jobDetailData,
}: {
  jobDetailData: any;
}) {
  const experienceSection = () => {
    const minExperience: any = jobDetailData.summary.min_experience;
    const maxExperience: any = jobDetailData.summary.max_experience;

    if (minExperience && !maxExperience) {
      return 'Minimum ' + minExperience + ' Years';
    } else if (maxExperience && !minExperience) {
      return 'Maximum ' + maxExperience + ' Years';
    } else if (minExperience & maxExperience) {
      return (
        'Minimum ' +
        minExperience +
        ' year and Maximum ' +
        maxExperience +
        ' Years'
      );
    } else {
      // waiting for the SRS to update for this business
    }
  };
  return (
    <>
      <p className="my-3 text-[13px] font-normal text-gray-500 leading-5">
        <b>Experience:</b> {experienceSection()}
      </p>
    </>
  );
}
