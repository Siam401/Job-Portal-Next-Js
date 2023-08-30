export type ExperienceFormData = {
  category: string;
  is_fresher: boolean;
  id?: number | null;
  company_name?: string;
  company_business?: string;
  designation?: string;
  department?: string;
  location?: string;
  start_date?: string;
  end_date?: string;
  is_current: boolean;
  responsibility?: string;
  expertise: Expertise[] | [];
};

type Expertise = {
  name: string;
  month: number;
  year?: number;
};
