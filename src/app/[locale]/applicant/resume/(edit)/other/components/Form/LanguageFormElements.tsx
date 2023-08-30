'use client';

import { SelectInput } from '@/components/form/common/element/SelectInput';
import { TextInput } from '@/components/form/common/element/TextInput';

type LanguageFormElementsProps = {
  isDisable: any;
};

const LanguageFormElements = ({ isDisable }: LanguageFormElementsProps) => {
  const proficiencyOptions: any = [
    { value: 'high', text: 'High' },
    { value: 'medium', text: 'Medium' },
    { value: 'basic', text: 'Basic' },
  ];
  return (
    <>
      <div className="grid grid-cols-2 gap-3 my-3 2xl:grid-cols-5">
        <div className="col-span-2">
          <TextInput
            name="language"
            label="Language"
            placeholder="Type language name"
            required={true}
            readonly={isDisable}
          />
        </div>
        <div>
          <SelectInput
            name="reading"
            label="Reading"
            options={proficiencyOptions}
            readonly={isDisable}
          />
        </div>
        <div>
          <SelectInput
            name="speaking"
            label="Speaking"
            options={proficiencyOptions}
            readonly={isDisable}
          />
        </div>
        <div>
          <SelectInput
            name="writing"
            label="Writing"
            options={proficiencyOptions}
            readonly={isDisable}
          />
        </div>
      </div>
    </>
  );
};

export default LanguageFormElements;
