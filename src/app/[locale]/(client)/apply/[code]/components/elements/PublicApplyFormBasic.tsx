'use client';

import { TextInput } from '@/components/form/client/element/TextInput';
import { useFormContext } from 'react-hook-form';
import { FileInput } from '@/components/form/client/element/FileInput';
import ApplicantPhotoComponent from './ApplicantPhotoComponent';
import { RadioInput } from '@/components/form/client/element/RadioInput';
import useFetchNStore from '@/hooks/useFetchNStore';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function PublicApplyFormBasic({
  jobDetailData,
}: {
  jobDetailData: any;
}) {
  const form = useFormContext();
  const { data: session, status, update }: any = useSession();
  const [resume, setResume] = useState(null);

  useEffect(() => {
    if (status === 'authenticated') {
      if (session.user.applicant.resume) {
        setResume(session.user.applicant.resume);
      }
    }
  }, [update]);

  const { errors }: { errors: any } = form.formState;

  const getFormErrorMessage = (name: any) => {
    return errors[name] ? (
      <p className="text-sm text-[#FD0000]">{errors[name].message}</p>
    ) : (
      <p className="text-sm text-[#FD0000]"></p>
    );
  };
  //this will be fetch from redux
  // const { isLoading, data, error } = useFetchNStore('countries');

  return (
    <>
      <div>
        <label
          htmlFor="text"
          className="block mb-1 text-sm font-semibold text-gray-900 after:content-['*'] after:text-[#FD0000] after:ml-1"
        >
          Applicant&apos;s Name
        </label>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <TextInput
            name="first_name"
            placeholder="First Name"
            readonly={status === 'authenticated'}
          />
          <TextInput
            name="last_name"
            placeholder="Last Name"
            readonly={status === 'authenticated'}
          />
        </div>
      </div>

      <TextInput
        label="Email"
        name="email"
        placeholder="name@company.com"
        required={true}
        readonly={status === 'authenticated'}
      />

      <TextInput
        label="Mobile Number"
        name="mobile"
        placeholder="Mobile Number"
        required={true}
        readonly={status === 'authenticated'}
      />

      <div>
        <label className="block mb-1 text-sm font-semibold text-gray-900 after:content-['*'] after:text-[#FD0000] after:ml-1">
          Gender
        </label>
        <fieldset className="mb-5">
          <RadioInput
            name="gender"
            label="Male"
            value="male"
            readonly={status === 'authenticated'}
          />
          <RadioInput
            name="gender"
            label="Female"
            value="female"
            readonly={status === 'authenticated'}
          />
          <RadioInput
            name="gender"
            label="Other"
            value="other"
            readonly={status === 'authenticated'}
          />
          {getFormErrorMessage('gender')}
        </fieldset>
      </div>
      {jobDetailData.form.inputs &&
        jobDetailData.form.inputs.indexOf('photo') > -1 && (
          <div className="photoInput">
            <ApplicantPhotoComponent
              getFormErrorMessage={getFormErrorMessage}
            />
          </div>
        )}
      <div>
        <div className="flex justify-between ...">
          <div>
            <label
              className={
                status === 'authenticated'
                  ? 'block mb-1 text-sm font-semibold text-gray-900'
                  : "block mb-1 text-sm font-semibold text-gray-900 after:content-['*'] after:text-[#FD0000] after:ml-1"
              }
            >
              CV/Resume
            </label>
          </div>
          {status === 'authenticated' && resume && (
            <div>
              <Link
                target="_blank"
                href={resume ?? ''}
                className={
                  resume
                    ? 'text-sm font-medium hover:underline text-[#39B54A] hover:text-[#2ea23e]'
                    : 'text-sm font-medium'
                }
              >
                <i className="fa fa-paperclip"></i>
                Attachment
              </Link>
            </div>
          )}
        </div>
        <div className="fileInput">
          <FileInput name="resume" required={true} />
        </div>
      </div>
    </>
  );
}
