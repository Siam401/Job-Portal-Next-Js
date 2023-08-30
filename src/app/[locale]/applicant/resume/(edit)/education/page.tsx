import EducationComponent from './components/sections/EducationComponent';
import CommonApi from '@/app/api/common/data';

export default async function Education() {
  const educationLevel: any = await CommonApi.getEducationLevel();
  const countries: any = await CommonApi.getCountriesOption();
  return (
    <>
      {educationLevel.success && (
        <EducationComponent
          educationLevel={educationLevel}
          countries={countries}
        />
      )}
    </>
  );
}
