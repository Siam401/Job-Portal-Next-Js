import { RadioGroupInput } from '@/components/form/common/advanced/RadioGroupInput';
import { TextInput } from '@/components/form/common/element/TextInput';
import { TextareaInput } from '@/components/form/common/element/TextareaInput';

export default function CareerDetailComponent({ formOptions }: any) {
  return (
    <>
      <h2 className="text-[18px] font-bold text-[#333] mb-3 border-b-2">
        Career and Application Information
      </h2>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <div className="col-span-2">
          <TextareaInput
            name="career_objective"
            label="Objective"
            placeholder="Write here"
            required={true}
          />
        </div>
        <div className="col-span-2">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            <RadioGroupInput
              name="job_type"
              data={formOptions.data.job_type}
              label="Available for (Job Nature)"
              required={true}
            />

            <RadioGroupInput
              name="job_level"
              data={formOptions.data.job_level}
              label="Looking for (Job Level)"
              ulClassName="w-full text-sm font-medium text-gray-900 bg-gray-50 border border-gray-300 rounded-lg md:h-[187px] h-auto"
              required={true}
            />

            <div className="space-y-3">
              <TextInput
                name="present_salary"
                label="Present Salary"
                placeholder="Present Salary"
                keyfilter="int"
              />

              <TextInput
                name="expected_salary"
                label="Expected Salary"
                placeholder="Expected Salary"
                keyfilter="int"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
