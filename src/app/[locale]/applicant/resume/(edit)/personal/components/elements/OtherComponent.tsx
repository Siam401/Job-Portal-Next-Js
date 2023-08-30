import { TextareaInput } from '@/components/form/common/element/TextareaInput';

export default function OtherComponent() {
  return (
    <>
      <h2 className="text-[18px] font-bold text-[#333] mb-3 border-b-2">
        Other Relevant Information
      </h2>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <TextareaInput
          name="career_summary"
          label="Career Summary"
          placeholder="Write here"
          rows={5}
        />

        <TextareaInput
          name="special_qualification"
          label="Special Qualification"
          placeholder="Write here"
          rows={5}
        />
      </div>
    </>
  );
}
