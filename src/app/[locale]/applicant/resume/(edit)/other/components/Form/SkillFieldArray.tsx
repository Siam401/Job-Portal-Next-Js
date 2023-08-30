'use client';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';

import { TextareaInput } from '@/components/form/common/element/TextareaInput';
import { InputText } from 'primereact/inputtext';
import { RadioButton } from 'primereact/radiobutton';
import { useState } from 'react';
import { SkillSchema } from '../../validation/otherPageValidation';
import SkillCard from './SkillCard';
import { useDispatch } from 'react-redux';
import { toastActions } from '@/redux/features/toast.slice';
import { Button } from 'primereact/button';

type SkillFieldArrayProps = {
  errors: any;
};

const SkillFieldArray = ({ errors }: SkillFieldArrayProps) => {
  const [isSkillValidationEnabled, setIsSkillValidationEnabled] =
    useState(false);

  const { control, setError, setValue, getValues, clearErrors } =
    useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'skills',
  });

  const handleAddSkill = async (data: any) => {
    // debugger;
    setIsSkillValidationEnabled(true);
    try {
      // Perform validation
      const validationResult = await SkillSchema.isValid({
        skill: data.skill,
        learn_by: data.learn_by,
      });
      await SkillSchema.validate({
        skill: data.skill,
        learn_by: data.learn_by,
      });

      // If validation is successful
      if (validationResult) {
        append({
          skill: data.skill,
          learn_by: data.learn_by,
        });
        setValue('skill', '');
        setValue('learn_by', '');
        clearErrors(['skill', 'learn_by']);
      }
    } catch (error: any) {
      if (error.path === 'skill') {
        setError('skill', {
          type: 'manual',
          message: error.message,
        });
      } else if (error.path === 'learn_by') {
        setError('learn_by', {
          type: 'manual',
          message: error.message,
        });
      }
    }
  };

  const dispatch = useDispatch();
  const deleteSkill = (index: number) => {
    if (fields.length === 1) {
      dispatch(
        toastActions.showToast({
          message:
            'At least one skill is required, to delete this skill please add another skill first.',
          type: 'error',
          summary: 'Error',
        }),
      );

      return;
    }

    remove(index);
  };

  return (
    <>
      {/* section: card section */}
      <div className="relative">
        {fields.length > 0 ? (
          <>
            {fields.map((field: any, index) => (
              <SkillCard
                key={field.id}
                id={index + 1}
                skillName={field.skill}
                learnedBy={field.learn_by}
                onDismiss={() => deleteSkill(index)}
              />
            ))}
          </>
        ) : null}
      </div>
      {/* section: input section */}
      <div className="grid grid-cols-2 gap-3 mb-3 2xl:grid-cols-5">
        <div className="col-span-2 2xl:col-span-3">
          <div className="grid grid-cols-2 gap-3 p-4 bg-gray-300 rounded-md 2xl:grid-cols-3">
            <div className="col-span-2 2xl:col-span-1">
              <label
                htmlFor="business"
                className="block mb-1 font-semibold text-gray-800 text-[15px]">
                Skill
                <span className="text-[#FF0000]"> *</span>
              </label>
              <Controller
                name={`skill`}
                control={control}
                render={({ field }) => (
                  <>
                    <InputText
                      {...field}
                      value={field.value as string}
                      type="text"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      placeholder="Type skill name"
                    />
                    {isSkillValidationEnabled ? (
                      <small className="p-error">{errors.skill?.message}</small>
                    ) : null}
                  </>
                )}
              />
            </div>

            <Controller
              name="learn_by"
              control={control}
              render={({ field }) => (
                <>
                  <div className="col-span-2 2xl:col-span-2">
                    <label
                      htmlFor="business"
                      className="block mb-1 font-semibold text-gray-800 text-[15px]">
                      How did you learn the skill?
                      <span className="text-[#FF0000]"> *</span>
                    </label>
                    <ul className="w-full border border-gray-300 bg-gray-50 rounded-lg sm:flex items-center inline-block sm:h-[42px] h-auto sm:py-0 py-3 sm:space-y-0 space-y-2">
                      <li className="sm:border-b-0 sm:ms-0 ms-4">
                        <div className="flex items-center pl-2">
                          <RadioButton
                            inputId="job"
                            {...field}
                            inputRef={field.ref}
                            value="job"
                            checked={field.value === 'job'}
                            className="w-4 h-4 text-[#014A94] bg-gray-100 border-[#014A94]"
                          />
                          <label
                            htmlFor="job"
                            className="w-ful ml-2 text-sm font-semibold text-[#014A94]"
                          >
                            Job
                          </label>
                        </div>
                      </li>
                      <li className="sm:border-b-0 ms-4">
                        <div className="flex items-center pl-2">
                          <RadioButton
                            inputId="educational"
                            {...field}
                            inputRef={field.ref}
                            value="educational"
                            checked={field.value === 'educational'}
                            className="w-4 h-4 text-[#F25F0D] bg-gray-100 border-[#F25F0D]"
                          />
                          <label
                            htmlFor="educational"
                            className="w-ful ml-2 text-sm font-semibold text-[#F25F0D]"
                          >
                            Educational
                          </label>
                        </div>
                      </li>
                      <li className="sm:border-b-0 ms-4">
                        <div className="flex items-center pl-2">
                          <RadioButton
                            inputId="training"
                            {...field}
                            inputRef={field.ref}
                            value="training"
                            checked={field.value === 'training'}
                            className="w-4 h-4 text-[#177201] bg-gray-100 border-[#177201]"
                          />
                          <label
                            htmlFor="training"
                            className="w-ful ml-2 text-sm font-semibold text-[#177201]"
                          >
                            Professional Training
                          </label>
                        </div>
                      </li>
                      <li className="sm:border-b-0 ms-4">
                        <div className="flex items-center pl-2">
                          <RadioButton
                            inputId="self"
                            {...field}
                            inputRef={field.ref}
                            value="self"
                            checked={field.value === 'self'}
                            className="w-4 h-4 text-[#00D5FF] bg-gray-100 border-[#00D5FF]"
                          />
                          <label
                            htmlFor="self"
                            className="w-ful ml-2 text-sm font-semibold text-[#00D5FF]"
                          >
                            Self
                          </label>
                        </div>
                      </li>
                    </ul>
                    {isSkillValidationEnabled ? (
                      <small className="p-error">
                        {errors.learn_by?.message}
                      </small>
                    ) : null}
                  </div>
                </>
              )}
            />

            <div className="col-span-2 2xl:col-span-3">
              <Button
                onClick={() => handleAddSkill(getValues())}
                type="button"
                className="block float-right min-w-[190px] text-white bg-[#F25F0D] hover:bg-[#db560b] focus:ring-2 focus:outline-none focus:ring-blue-300 font-semibold rounded-lg text-md w-full sm:w-auto px-5 py-2.5 text-center"
                label="Add"
              />
            </div>
          </div>
        </div>

        {/* section: skill description */}
        <div className="col-span-2">
          <TextareaInput
            required
            name="skill_description"
            label="Skill Description"
            placeholder="Type description"
            rows='5'/>
        </div>
      </div>
    </>
  );
};

export default SkillFieldArray;
