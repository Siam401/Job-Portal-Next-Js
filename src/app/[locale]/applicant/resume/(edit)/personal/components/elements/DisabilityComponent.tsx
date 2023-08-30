import { RadioInput } from '@/components/form/common/element/RadioInput';
import { TextInput } from '@/components/form/common/element/TextInput';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

export default function DisabilityComponent() {
  const form: any = useFormContext();

  const [isDisable, setIsDisable] = useState<boolean>(false);
  const has_disability = form.watch('has_disability');
  useEffect(() => {
    if (has_disability) {
      setIsDisable(false);
    } else {
      form.setValue('disability_id', '');
      form.trigger('disability_id');
      setIsDisable(true);
    }
  }, [has_disability]);

  return (
    <>
      <h2 className="text-[18px] font-bold text-[#333] mb-3 border-b-2">
        Disability Information (If any)
      </h2>
      <label
        htmlFor="disability"
        className="block mb-1 text-[15px] font-semibold text-gray-800">
        Do you have any national disability number?
      </label>
      <div className="grid grid-cols-2 gap-3">
        <div className="flex items-center pl-4 border border-gray-300 bg-gray-50 rounded-lg h-[42px]">
          <RadioInput name="has_disability" label="Yes" value={1} />
        </div>
        <div className="flex items-center pl-4 border border-gray-300 bg-gray-50 rounded-lg h-[42px]">
          <RadioInput name="has_disability" label="No" value={0} />
        </div>
        <div className="col-span-2">
          <TextInput
            name="disability_id"
            label="Disability Id Number"
            placeholder="Write number"
            keyfilter="int"
            readonly={isDisable}
          />
        </div>
      </div>
    </>
  );
}
