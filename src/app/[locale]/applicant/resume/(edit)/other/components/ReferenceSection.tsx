'use client';

import { getProfileInfo } from '@/app/api/applicant/experience';
import ResumeFormLayout from '../../components/ResumeFormLayout';
import { defaultReferenceValues } from '../constant';
import { ReferenceSchema } from '../validation/otherPageValidation';
import ReferenceFormElements from './Form/ReferenceFormElements';


const ReferenceSection = () => {
  const sectionName = 'Reference';
  const sectionKey = 'reference';
  const queryFn: any = () => getProfileInfo('reference');
  return (
    <>
      <ResumeFormLayout
        sectionName={sectionName}
        sectionKey={sectionKey}
        queryFn={queryFn}
        formSchema={ReferenceSchema}
        defaultInput={defaultReferenceValues}
        addButtonLabel="Add Reference (If Required)"
        maxElement={2}
        FieldComponent={<ReferenceFormElements isDisable={false} />}
      />
    </>
  );
};

export default ReferenceSection;
