import { ApplyDTO, QuestionsDTO } from "@/client/apply/apply"
import { useSession } from "next-auth/react";

export const defaultQuestionsInput: QuestionsDTO = {
  "question": '',
  "answer": '',
  "is_required": false,
}

export const defaultApplyInput: ApplyDTO = {
  job_code: '',
  first_name: '',
  last_name: '',
  email: '',
  country_code: '880',
  mobile: '',
  gender: '',
  photo: undefined,
  show_photo: false,
  resume: undefined,
  show_cover_letter: false,
  cover_letter: '',
  questions: [],
};

export const defaultApplyInputWithSession: ApplyDTO = {
  resume: undefined,
  show_cover_letter: false,
  cover_letter: '',
  questions: [],
};

