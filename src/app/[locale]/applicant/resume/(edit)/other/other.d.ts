export type Specialization = {
  skill_description: string;
  skills: Skill[];
};

export type Skill = {
  skill: string;
  learn_by: string;
};

export type Language = {
  language: string;
  reading: string;
  writing: string;
  speaking: string;
};

export type Reference = {
  name: string;
  organization: string;
  designation: string;
  mobile: string;
  email: string;
  address: string;
  phone_office: string;
  phone_home: string;
  relation: string;
};
