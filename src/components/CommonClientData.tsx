'use client';

// import useFetchNStore from '@/hooks/useFetchNStore';
import ToastMessage from '@/components/ui/ToastMessage';

const CommonClientData = () => {
  // const fetchArray = [
  //   {
  //     url: 'location/get-countries',
  //     dataKey: 'countries',
  //   },
  //   {
  //     url: 'location/get-divisions',
  //     dataKey: 'divisions',
  //   },
  //   {
  //     url: 'job/get-categories',
  //     dataKey: 'jobCategories',
  //   },
  //   {
  //     url: 'settings/form-options',
  //     dataKey: 'formOptions',
  //   },
  // ];

  // // fetchArray.forEach((params) => {
  // //   const { error } = useFetchNStore(params);
  // //   if (error) {
  // //     errorArray.push(error);
  // //   }
  // // });

  return (
    <>
      <ToastMessage />
      {/* todo: use toaster after discussing with @sabbir vai */}
    </>
  );
};

export default CommonClientData;
