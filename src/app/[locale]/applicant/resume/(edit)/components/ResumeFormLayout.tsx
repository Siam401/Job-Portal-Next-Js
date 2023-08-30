'use client';

import { useEffect, useState } from 'react';
import { checkEmpty } from '@/services/Utility';
import { useQuery } from '@tanstack/react-query';
// import Loading from '../loading';
import { Button } from 'primereact/button';
import ResumeFormComponent from './ResumeFormComponent';
import Loader from './Loader';

type PropType = {
  sectionKey: any;
  addButtonLabel?: string;
  queryFn: any;
  sectionName: string;
  formSchema: any;
  defaultInput: object;
  FieldComponent: any;
  maxElement?: number;
};

export default function ResumeFormLayout({
  sectionKey,
  addButtonLabel,
  queryFn,
  sectionName,
  formSchema,
  defaultInput,
  FieldComponent,
  maxElement,
}: PropType) {
  const [isShowForm, setIsShowForm] = useState<boolean>(true);
  const [isAddDisable, setIsAddDisable] = useState<boolean>(true);
  const [isAddHidden, setIsAddHidden] = useState<boolean>(false);

  const queryKey: any = sectionKey + '_info';

  const {
    data: response,
    isLoading,
    isFetched,
  }: any = useQuery({
    queryKey: [queryKey],
    queryFn: queryFn,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (isFetched) {
      if (!checkEmpty(response.data)) {
        if (maxElement) {
          response.data.length >= maxElement
            ? setIsAddHidden(true)
            : setIsAddHidden(false);
        }
        setIsAddDisable(false);
        setIsShowForm(false);
      } else {
        setIsShowForm(true);
        setIsAddDisable(true);
      }
    }
  }, [isFetched, response]);

  if (isLoading) {
    // return <Loading />;
    return <Loader />;
  }

  if (response?.success === false) {
    throw new Error((response?.message ?? '').toString());
  }

  return (
    <>
      <div className="my-3 bg-[#f2f3f8] pt-0 px-4 pb-4 rounded-lg border border-[#e2e2e2]">
        <div className="relative flex items-center">
          <h3 className="w-full py-1 mb-3 text-[23px] font-bold text-[#111928] border-b-2 border-[#d9d9d9]">
            {sectionName}
          </h3>
        </div>

        {!checkEmpty(response.data) &&
          response.data.map((value: any, index: number) => {
            return (
              <div
                className="p-3 mb-3 bg-gray-200 border border-[#d9d9d9] rounded-md"
                key={index}
              >
                <ResumeFormComponent
                  FieldComponent={FieldComponent}
                  infoData={value}
                  formSchema={formSchema}
                  defaultInput={defaultInput}
                  sectionKey={sectionKey}
                />
              </div>
            );
          })}

        {isShowForm && (
          <ResumeFormComponent
            FieldComponent={FieldComponent}
            formSchema={formSchema}
            defaultInput={defaultInput}
            sectionKey={sectionKey}
          />
        )}

        
      </div>
      {!isAddHidden && (
          <div className="flex justify-end w-full mt-2 mb-8 space-y-2">
            <Button
              type="button"
              className="rounded-lg w-auto px-5 py-2.5 text-center"
              severity='warning'
              label={addButtonLabel ?? 'Add (If Required)'}
              onClick={() => {
                setIsShowForm(true);
                setIsAddDisable(true);
              }}
              disabled={isAddDisable}
            />
          </div>
        )}
    </>
  );
}
