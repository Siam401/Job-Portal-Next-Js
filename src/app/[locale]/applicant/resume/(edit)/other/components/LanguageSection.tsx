'use client';

import { getProfileInfo } from '@/app/api/applicant/experience';
import ResumeFormLayout from '../../components/ResumeFormLayout';
import { LanguageSchema } from '../validation/otherPageValidation';
import LanguageFormElements from './Form/LanguageFormElements';
import { defaultReferenceValues } from '../constant';

const LanguageSection = () => {
  const sectionName = 'Language Proficiency';
  const sectionKey = 'language';
  const queryFn: any = () => getProfileInfo('language');
  return (
    <>
      <ResumeFormLayout
        sectionName={sectionName}
        sectionKey={sectionKey}
        queryFn={queryFn}
        formSchema={LanguageSchema}
        defaultInput={defaultReferenceValues}
        addButtonLabel="Add Language (If Required)"
        FieldComponent={<LanguageFormElements isDisable={false} />}
      />
    </>
  );
};

export default LanguageSection;
