import { DateInput } from '@/components/form/common/element/DateInput';
import { RadioInput } from '@/components/form/common/element/RadioInput';
import { SelectInput } from '@/components/form/common/element/SelectInput';
import { TextInput } from '@/components/form/common/element/TextInput';
import { checkEmpty } from '@/services/Utility';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

export default function PersonalDetailComponent({
  formOptions,
  ProfileInfo,
}: any) {
  const form: any = useFormContext();
  const tenYearsAgo = new Date();
  tenYearsAgo.setTime(tenYearsAgo.valueOf() - 10 * 365 * 24 * 60 * 60 * 1000);

  const [isEmailDisable, setIsEmailDisable] = useState<boolean>(true);

  useEffect(() => {
    if (checkEmpty(ProfileInfo.primary_email)) {
      setIsEmailDisable(true);
    } else {
      setIsEmailDisable(false);
    }
  }, []);

  const { errors }: { errors: any } = form.formState;

  const getFormErrorMessage = (name: any) => {
    return errors[name] ? (
      <small className="p-error">{errors[name].message}</small>
    ) : (
      <small className="p-error"></small>
    );
  };

  return (
    <>
      <h2 className="text-[18px] font-bold text-[#333] mb-3 border-b-2">
        Personal Details
      </h2>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <TextInput
          name="first_name"
          label="First name"
          placeholder="First name"
          required={true}
        />

        <TextInput name="last_name" label="Last name" placeholder="Last name" />

        <TextInput
          name="father_name"
          label="Father name"
          placeholder="Father name"
          required={true}
        />

        <TextInput
          name="mother_name"
          label="Mother name"
          placeholder="Mother name"
        />

        <DateInput
          name="dob"
          label="Date of Birth"
          placeholder="Birth date"
          required={true}
          showIcon={true}
          iconPos="left"
        />

        <div>
          <label
            htmlFor="gender"
            className="block mb-1 font-semibold text-gray-800 text-[15px]">
            Gender<span className="text-[#FF0000] ml-1">*</span>
          </label>
          <div className="grid grid-cols-3 gap-x-3">
            {formOptions.data.gender.map((value: any, index: number) => {
              return (
                <div
                  className="flex items-center pl-4 border border-gray-300 bg-gray-50 rounded-lg h-[43px]"
                  key={index}
                >
                  <RadioInput
                    name="gender"
                    label={value.text}
                    value={value.value}
                  />
                </div>
              );
            })}
            {getFormErrorMessage('gender')}
          </div>
        </div>

        <SelectInput
          name="religion"
          label="Religion"
          options={formOptions.data.religion}
          required={true}
        />

        <SelectInput
          name="marital_status"
          label="Marital Status"
          options={formOptions.data.marriage}
          required={true}
        />

        <SelectInput
          name="nationality"
          label="Nationality"
          options={formOptions.data.nationality}
          required={true}
        />

        <TextInput name="nid" label="National ID" placeholder="National ID" />

        <TextInput
          name="primary_mobile"
          label="Primary Mobile"
          placeholder="Primary Mobile"
          keyfilter="int"
          required={true}
        />

        <TextInput
          name="secondary_mobile"
          label="Secondary Mobile"
          placeholder="Secondary Mobile"
          keyfilter="int"
        />

        <TextInput
          name="primary_email"
          label="Primary Email"
          placeholder="Primary Email"
          keyfilter="email"
          required={true}
          readonly={isEmailDisable}
        />

        <TextInput
          name="alternate_email"
          label="Alternate Email"
          placeholder="Alternate Email"
          keyfilter="email"
        />

        <TextInput
          name="height"
          label="Height(Meters)"
          placeholder="Height"
          keyfilter="num"
        />

        <TextInput
          name="weight"
          label="Weight(Kg)"
          placeholder="Weight"
          keyfilter="num"
        />
      </div>
    </>
  );
}
