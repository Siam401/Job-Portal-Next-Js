type FilterForm = {
  jobCategories: {
    value: any;
    text: any;
  }[];
  wingList: {
    value: any;
    text: any;
  }[];
  locations: {
    value: any;
    text: any;
  }[];
  sendQryParams: (data: any) => void;
};

type FormInputs = {
  company: (string | undefined)[] | undefined;
  jobCategory: (number | undefined)[] | undefined;
  location: (number | undefined)[] | undefined;
  sorting: string | undefined;
  search: string | undefined;
};

type JobList = {
  code: string;
  title: string;
  job_category: string;
  vacancy: string;
  end_date: string;
}[];

export { FilterForm, FormInputs, JobList };
