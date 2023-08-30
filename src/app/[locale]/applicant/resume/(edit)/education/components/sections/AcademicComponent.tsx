import AcademicFormComponent from '../elements/AcademicFormComponent';
import ProfileApi from '@/app/api/applicant/profile';
import ResumeFormLayout from '../../../components/ResumeFormLayout';
import { academicFormSchema } from '../../validators/education.schema';
import { defaultAcademicInput } from '../../shared/constant';

export default function AcademicComponent({ educationLevel }: any) {
  const sectionName = 'Academic Summary';
  const sectionKey = 'education';
  const queryFn: any = () => ProfileApi.getProfileInfo('education');

  return (
    <ResumeFormLayout
      sectionName={sectionName}
      addButtonLabel="Add Education (If Required)"
      sectionKey={sectionKey}
      queryFn={queryFn}
      formSchema={academicFormSchema}
      defaultInput={defaultAcademicInput}
      FieldComponent={<AcademicFormComponent educationLevel={educationLevel} />}
    />
  );
}
