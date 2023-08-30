import { CheckboxGroupInput } from '@/components/form/common/advanced/CheckboxGroupInput';

export default function PreferredAreaComponent({
  functionData,
  skillData,
}: any) {
  return (
    <>
      <h2 className="text-[18px] leading-[18px] font-bold text-[#333] mb-3 border-b-2 pb-[8px]">
        Preferred Areas<span className="text-[#FF0000]">*</span>{' '}
        <span className="text-sm font-semibold text-gray-500">
          (At least 1 category any of section)
        </span>
      </h2>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <CheckboxGroupInput
          name="preferred_functions"
          data={functionData.data}
          label="Functional Areas (Max 3)"
          max={3}
          required={true}
        />

        <CheckboxGroupInput
          name="special_skills"
          data={skillData.data}
          label="Special Skills (Max 3)"
          max={3}
        />
      </div>
    </>
  );
}
