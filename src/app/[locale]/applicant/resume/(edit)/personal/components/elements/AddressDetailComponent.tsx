import { CheckboxInput } from '@/components/form/common/element/CheckboxInput';
import { TextareaInput } from '@/components/form/common/element/TextareaInput';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

export default function AddressDetailComponent({ ProfileInfo }: any) {
  const form: any = useFormContext();
  const [isDisable, setIsDisable] = useState<boolean>(false);

  useEffect(() => {
    if (ProfileInfo.is_same_address) {
      setIsDisable(true);
      form.setValue('permanent_address', '');
    }
  }, [ProfileInfo]);

  const checkAddress = (e: any) => {
    if (e.checked) {
      setIsDisable(true);
      form.setValue('permanent_address', '');
    } else {
      setIsDisable(false);
      form.trigger('permanent_address');
    }
  };
  return (
    <>
      <h2 className="text-[18px] font-bold text-[#333] mb-3 border-b-2">
        Address Details
      </h2>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <div>
          <label
            htmlFor="pre-address"
            className="block mb-1 font-semibold text-gray-800 text-[15px]"
          >
            Present Address<span className="text-[#FF0000]">*</span>
          </label>
          <TextareaInput name="present_address" placeholder="Write here" />
        </div>
        <div>
          <label
            htmlFor="per-address"
            className="relative flex items-center mb-1 font-semibold text-gray-800 text-[15px]"
          >
            Permanent Address<span className="text-[#FF0000]">*</span>
            <div className="flex flex-row-reverse ms-1">
              <CheckboxInput
                name="is_same_address"
                label="Same as present address"
                customFunction={checkAddress}
              />
            </div>
          </label>
          <TextareaInput
            name="permanent_address"
            placeholder="Write here"
            readonly={isDisable}
          />
        </div>
      </div>
    </>
  );
}
