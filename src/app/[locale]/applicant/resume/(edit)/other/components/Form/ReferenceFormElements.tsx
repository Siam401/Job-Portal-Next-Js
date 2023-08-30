'use client';

import { SelectInput } from '@/components/form/common/element/SelectInput';
import { TextInput } from '@/components/form/common/element/TextInput';
import { TextareaInput } from '@/components/form/common/element/TextareaInput';

type ReferenceFormElementsProps = {
  isDisable: boolean;
};

const ReferenceFormElements = ({ isDisable }: ReferenceFormElementsProps) => {
  const relationOptions: any = [
    { value: 'academic', text: 'Academic' },
    { value: 'job-sector', text: 'Job Sector' },
    { value: 'relative', text: 'Relative' },
  ];
  return (
    <>
      <div className="grid grid-cols-1 gap-3 my-3 2xl:grid-cols-4 sm:grid-cols-2">
        <div>
          <TextInput
            label="Name"
            name="name"
            placeholder="Type name here"
            readonly={isDisable}
            required={true}
          />
        </div>
        <div>
          <TextInput
            label="Designation"
            name="designation"
            placeholder="Type designation here"
            readonly={isDisable}
            required={true}
          />
        </div>
        <div>
          <TextInput
            label="Organization"
            name="organization"
            placeholder="Type organization here"
            readonly={isDisable}
            required={true}
          />
        </div>
        <div>
          <SelectInput
            label="Relation"
            name="relation"
            options={relationOptions}
            readonly={isDisable}
          />
        </div>
        <div>
          <TextInput
            label="Mobile"
            name="mobile"
            placeholder="Type mobile number"
            readonly={isDisable}
            required={true}
          />
        </div>
        <div>
          <TextInput
            label="Email"
            name="email"
            placeholder="Type email here"
            readonly={isDisable}
            required={true}
          />
        </div>
        <div>
          <TextInput
            label="Phone (Off)"
            name="phone_office"
            placeholder="Type phone number"
            readonly={isDisable}
          />
        </div>
        <div>
          <TextInput
            label="Phone (Res)"
            name="phone_home"
            placeholder="Type phone number"
            readonly={isDisable}
          />
        </div>
        <div className="col-span-1 sm:col-span-2">
          <TextareaInput
            label="Address"
            name="address"
            placeholder="Type address here"
            readonly={isDisable}
          />
        </div>
      </div>
    </>
  );
};

export default ReferenceFormElements;
