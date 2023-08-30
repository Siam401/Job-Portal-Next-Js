import CertificationFormComponent from '../elements/CertificationFormComponent';
import ProfileApi from '@/app/api/applicant/profile';
import ResumeFormLayout from '../../../components/ResumeFormLayout';
import { defaultCertificationInput } from '../../shared/constant';
import { certificationFormSchema } from '../../validators/education.schema';

export default function CertificationComponent() {
  const sectionName = 'Professional Certification';
  const sectionKey = 'certification';
  const queryFn: any = () => ProfileApi.getProfileInfo('certification');

  return (
    <ResumeFormLayout
      sectionName={sectionName}
      addButtonLabel="Add Certificate (If Required)"
      sectionKey={sectionKey}
      queryFn={queryFn}
      formSchema={certificationFormSchema}
      defaultInput={defaultCertificationInput}
      FieldComponent={<CertificationFormComponent />}
    />
  );
}
