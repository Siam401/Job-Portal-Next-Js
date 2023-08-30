export type ApplyDTO = {
  "job_code"?: string,
  "first_name"?: string,
  "last_name"?: string,
  "email"?: string,
  "country_code"?: string,
  "mobile"?: string,
  "gender"?: string,
  "show_photo"?: boolean,
  "photo"?: any,
  "resume": any,
  "show_cover_letter": boolean,
  "cover_letter": string | undefined,
  "questions": array
}

export type QuestionsDTO = {
  "question": string,
  "answer": string,
  "is_required": boolean,
}