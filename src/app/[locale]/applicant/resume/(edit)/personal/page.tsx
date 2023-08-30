import CommonApi from '@/app/api/common/data';
import PersonalFormComponent from './components/sections/FormComponent';

export default async function Personal() {
  const skillData: any = await CommonApi.getSpecialSkill();
  const functionData: any = await CommonApi.getJobFunction();

  return (
    <>
      {functionData.success && skillData.success && (
        <PersonalFormComponent
          functionData={functionData}
          skillData={skillData}
        />
      )}
    </>
  );
}
