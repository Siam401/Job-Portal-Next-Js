import { SelectInput } from '@/components/form/common/element/SelectInput';
import { TextInput } from '@/components/form/common/element/TextInput';
import { DateInput } from '@/components/form/common/element/DateInput';
import { EducationResult } from '@/config/constants';

export default function AcademicFormComponent({
  educationLevel,
  isDisable,
}: any) {
  return (
    <>
      <div className="grid grid-cols-1 gap-3 my-2 2xl:grid-cols-4 md:grid-cols-2">
        <SelectInput
          name="education_id"
          label="Level of Education"
          options={educationLevel.data}
          required={true}
          readonly={isDisable}
        />

        <TextInput
          name="degree"
          label="Exam / Degree Title"
          placeholder="Type here"
          required={true}
          readonly={isDisable}
        />
        <TextInput
          name="major"
          label="Concentration / Major / Group"
          placeholder="Type here"
          required={true}
          readonly={isDisable}
        />
        <TextInput
          name="institute"
          label="Institute Name"
          placeholder="Type here"
          required={true}
          readonly={isDisable}
        />
        <div>
          <div className="grid grid-cols-2 gap-3">
            <TextInput
              name="board"
              label="Board"
              placeholder="Type here"
              readonly={isDisable}
            />
            <SelectInput
              name="result"
              label="Result"
              options={EducationResult}
              readonly={isDisable}
            />
          </div>
        </div>
        <div>
          <div className="grid grid-cols-2 gap-3">
            <TextInput
              name="mark"
              label="CGPA / Marks"
              placeholder="Type here"
              keyfilter="num"
              readonly={isDisable}
            />
            <TextInput
              name="scale"
              label="Scale / Total Marks"
              placeholder="Type here"
              keyfilter="num"
              readonly={isDisable}
            />
          </div>
        </div>
        <div>
          <div className="grid grid-cols-2 gap-3">
            <DateInput
              name="passing_year"
              label="Year of Passing"
              view="year"
              dateFormat="yy"
              readonly={isDisable}
              placeholder="Year"
              maxDate={new Date()}
              showIcon={true}
              iconPos="left"
            />
            <TextInput
              name="duration"
              label="Duration(Years)"
              placeholder="Type here"
              keyfilter="num"
              required={true}
              readonly={isDisable}
            />
          </div>
        </div>
        <TextInput
          name="achievement"
          label="Achievement"
          placeholder="Type here"
          readonly={isDisable}
        />
      </div>
    </>
  );
}
