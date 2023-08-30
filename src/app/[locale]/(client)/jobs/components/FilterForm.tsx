'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, FormProvider } from 'react-hook-form';
import { FilterFormSchema as formSchema } from '../validation/filterForm.schema';
import MultiSelectComp from './elements/MultiSelectComponent';
import DropdownComp from './elements/DropdownComponent';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import isGroupCompany from '@/config/settings.json';
import { FormInputs, FilterForm } from '@/types/jobs';
import SearchComponent from './elements/SearchComponent';

const defaultValues: FormInputs = {
  company: [],
  jobCategory: [],
  location: [],
  sorting: '',
  search: '',
};

const FilterForm = ({
  jobCategories,
  wingList,
  locations,
  sendQryParams,
}: FilterForm) => {
  const methods = useForm<FormInputs>({
    defaultValues,
    resolver: yupResolver(formSchema),
  });

  // prettier-ignore
  const {  handleSubmit, watch, reset, control, setValue, 
        formState: { errors, isDirty, isValid, isSubmitting, isSubmitSuccessful },
    } = methods;

  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const selectedCompanies = watch('company') || [];
  const selectedJobCategories = watch('jobCategory') || [];
  const selectedLocations = watch('location') || [];
  const selectedSorting = watch('sorting');
  const searchString = watch('search');

  const queryParams = new URLSearchParams();

  useEffect(() => {
    if (selectedCompanies.length > 0) {
      queryParams.append('company', selectedCompanies.join(','));
    }

    if (selectedJobCategories.length > 0) {
      queryParams.append('category', selectedJobCategories.join(','));
    }

    if (selectedLocations.length > 0) {
      queryParams.append('location', selectedLocations.join(','));
    }

    if (selectedSorting) {
      queryParams.append('sort', selectedSorting);
    }
    const queryString = queryParams.toString();

    if (pathname.includes('jobs')) {
      const jobListParams = {
        company: selectedCompanies.join(','),
        category: selectedJobCategories.join(','),
        location: selectedLocations.join(','),
        sort: selectedSorting,
        search: searchString,
      };

      sendQryParams(jobListParams);

      // router.push('/jobs');
    } else {
      if (queryString === '') {
        return;
      }
      router.push('/jobs?' + queryString);

      const [key, value] = queryString.split('=');
      const qryObj = { [key]: value };

      sendQryParams(qryObj);
    }
  }, [
    selectedCompanies,
    selectedJobCategories,
    selectedLocations,
    selectedSorting,
  ]);

  const company = params.get('company');
  const category = params.get('category');
  const location = params.get('location');
  const sort = params.get('sort') || '';
  const search = params.get('search') || '';

  useEffect(() => {
    if (pathname.includes('jobs')) {
      reset({
        company: company ? [company] : [],
        jobCategory: category ? [parseInt(category)] : [],
        location: location ? [parseInt(location)] : [],
        sorting: sort,
        search: search,
      });
    }
  }, [pathname]);

  const handleSubmitForm = (data: FormInputs) => {
    console.log('data', data);
    if (pathname.includes('jobs')) {
      const jobListParams = {
        company: data?.company?.join(','),
        category: data?.jobCategory?.join(','),
        location: data?.location?.join(','),
        sort: data.sorting,
        search: data.search,
      };
      sendQryParams(jobListParams);
    } else {
      const queryString = queryParams.toString();
      router.push('/jobs?' + queryString);
      const [key, value] = queryString.split('=');
      const qryObj = { [key]: value };
      sendQryParams(qryObj);
    }
  };

  return (
    <>
      {jobCategories && wingList && locations ? (
        <FormProvider {...methods}>
          <div className="col-span-1 xl:col-span-5">
            <form
              className="grid grid-cols-1 gap-2 my-3 sm:grid-cols-3 lg:grid-cols-5 xl:mt-0 "
              onSubmit={handleSubmit(handleSubmitForm)}
            >
              <div className="job-multiSelect">
                {isGroupCompany ? (
                  <MultiSelectComp
                    control={control}
                    errors={errors}
                    name="company"
                    filter={true}
                    showError={false}
                    placeholder="Select Company"
                    className="bg-transparent py-2 px-4 flex items-center text-sm font-bold rounded-full md:mr-0 border-[#39B54A]/20 border-[2px]"
                    filterPlaceHolder="Search by company"
                    options={wingList}
                  />
                ) : null}
              </div>

              <div className="job-multiSelect">
                <MultiSelectComp
                  control={control}
                  errors={errors}
                  name="jobCategory"
                  filter={true}
                  showError={false}
                  className="bg-transparent py-2 px-4 flex items-center text-sm font-bold rounded-full md:mr-0 border-[#39B54A]/20 border-[2px]"
                  placeholder="Select Job Category"
                  filterPlaceHolder="Search by job category"
                  options={jobCategories}
                />
              </div>

              <div className="job-multiSelect">
                <MultiSelectComp
                  control={control}
                  errors={errors}
                  name="location"
                  showError={false}
                  className="bg-transparent py-2 px-4 flex items-center text-sm font-bold rounded-full md:mr-0 border-[#39B54A]/20 border-[2px]"
                  placeholder="Select Location"
                  filterPlaceHolder="Search by location"
                  filter={true}
                  options={locations}
                />
              </div>

              <div className="job-dropDown">
                <DropdownComp
                  control={control}
                  errors={errors}
                  name="sorting"
                  showError={false}
                  className="bg-transparent py-2 px-4 flex items-center text-sm font-bold rounded-full md:mr-0 border-[#39B54A]/20 border-[2px]"
                  placeholder="Sort By"
                  options={[
                    {
                      value: 'desc',
                      text: 'Newest',
                    },
                    {
                      value: 'asc',
                      text: 'Oldest',
                    },
                  ]}
                />
              </div>

              <div>
                <SearchComponent
                  control={control}
                  errors={errors}
                  name="search"
                  placeholder="Search by keyword"
                  className="bg-transparent w-full py-2 px-4 pe-8 flex items-center text-sm font-semibold rounded-full md:mr-0 border-[#39B54A]/20 border-[2px]"
                />
              </div>
            </form>
          </div>
        </FormProvider>
      ) : (
        <>
          <div>loading...</div>
        </>
      )}
    </>
  );
};

export default FilterForm;
