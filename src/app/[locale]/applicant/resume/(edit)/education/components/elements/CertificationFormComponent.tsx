import { TextInput } from '@/components/form/common/element/TextInput';
import { DateInput } from '@/components/form/common/element/DateInput';

export default function CertificationFormComponent({ isDisable = false }: any) {
  return (
    <>
      <div className="grid grid-cols-1 gap-3 my-3 md:grid-cols-2">
        <TextInput
          name="certification"
          label="Certification"
          placeholder="Type here"
          required={true}
          readonly={isDisable}
        />
        <TextInput
          name="institute"
          label="Institute"
          placeholder="Type here"
          required={true}
          readonly={isDisable}
        />
        <TextInput
          name="location"
          label="Location"
          placeholder="Type here"
          required={true}
          readonly={isDisable}
        />

        <div>
          <label
            htmlFor="duration"
            className="block text-[15px] font-semibold text-gray-800"
          >
            Duration <span className="text-[#FF0000]">*</span>
          </label>
          <div
            date-rangepicker=""
            datepicker-orientation="bottom left"
            className="flex items-center"
          >
            <DateInput
              name="start_date"
              readonly={isDisable}
              placeholder="Start date"
              showIcon={true}
              iconPos="left"
            />
            <span className="mx-2 text-gray-500">to</span>
            <DateInput
              name="end_date"
              readonly={isDisable}
              placeholder="End date"
              showIcon={true}
              iconPos="left"
            />
          </div>
        </div>
      </div>
    </>
  );
}
