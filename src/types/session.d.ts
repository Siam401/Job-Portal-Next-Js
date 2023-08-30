export type Session = {
  user: {
    role: string;
    name: string;
    mobile: string;
    email: string;
    photo: string;
    applicant: {
      first_name: string;
      last_name: string;
      email: string;
      mobile: string;
      gender: string;
      dob: string;
      resume: string;
      photo: string;
      is_favorite: boolean;
    };
  };
  token: string;
  user_type: string;
};
