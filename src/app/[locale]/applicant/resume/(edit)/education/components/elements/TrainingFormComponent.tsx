import { SelectInput } from '@/components/form/common/element/SelectInput';
import { TextInput } from '@/components/form/common/element/TextInput';
import { DateInput } from '@/components/form/common/element/DateInput';

export default function TrainingFormComponent({ isDisable, countries }: any) {
  return (
    <>
      <div className="grid grid-cols-2 gap-3 my-3 md:grid-cols-4">
        <div className="col-span-2 md:col-span-2">
          <TextInput
            name="title"
            label="Training Title"
            placeholder="Type here"
            required={true}
            readonly={isDisable}
          />
        </div>
        <div className="col-span-2 md:col-span-1">
          <SelectInput
            name="country_id"
            label="Country"
            options={countries.data}
            required={true}
            readonly={isDisable}
          />
        </div>
        <div className="col-span-2 md:col-span-1">
          <DateInput
            name="training_year"
            label="Year of Passing"
            view="year"
            dateFormat="yy"
            readonly={isDisable}
            placeholder="Year"
            maxDate={new Date()}
            showIcon={true}
            iconPos="left"
          />
        </div>
        <div className="col-span-2 2xl:col-span-1">
          <TextInput
            name="topic"
            label="Topics Covered"
            placeholder="Type here"
            readonly={isDisable}
          />
        </div>
        <div className="col-span-2 2xl:col-span-1">
          <TextInput
            name="institute"
            label="Institute"
            placeholder="Type here"
            required={true}
            readonly={isDisable}
          />
        </div>
        <div className="col-span-2 2xl:col-span-1">
          <TextInput
            name="location"
            label="Location"
            placeholder="Type here"
            required={true}
            readonly={isDisable}
          />
        </div>
        <div className="col-span-2 2xl:col-span-1">
          <TextInput
            name="duration"
            label="Duration"
            placeholder="Type here"
            required={true}
            readonly={isDisable}
            keyfilter="num"
          />
        </div>
      </div>
    </>
  );
}
