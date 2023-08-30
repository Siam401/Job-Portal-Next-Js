import TrainingFormComponent from '../elements/TrainingFormComponent';
import ProfileApi from '@/app/api/applicant/profile';
import ResumeFormLayout from '../../../components/ResumeFormLayout';
import { defaultTrainingInput } from '../../shared/constant';
import { trainingFormSchema } from '../../validators/education.schema';

export default function TrainingComponent({ countries }: any) {
  const sectionName = 'Training Summary';
  const sectionKey = 'training';
  const queryFn: any = () => ProfileApi.getProfileInfo('training');

  return (
    <ResumeFormLayout
      sectionName={sectionName}
      addButtonLabel="Add Training (If Required)"
      sectionKey={sectionKey}
      queryFn={queryFn}
      formSchema={trainingFormSchema}
      defaultInput={defaultTrainingInput}
      FieldComponent={<TrainingFormComponent countries={countries} />}
    />
  );
}
