export type AcademicDTO = {
  "category": string | undefined,
  "id": number | undefined,
  "education_id": number,
  "degree": string,
  "major": string,
  "institute": string,
  "board": string | undefined,
  "result": string | undefined,
  "mark": string | undefined,
  "scale": string | undefined
  "passing_year": string | undefined,
  "duration": string,
  "achievement": string | undefined,
}

export type TrainingDTO = {
  "category": string | undefined,
  "id": number | undefined,
  "title": string,
  "country_id": number,
  "training_year": string | undefined,
  "topic": string | undefined,
  "institute": string,
  "location": string
  "duration": string,
}

export type CertificationDTO = {
  "category": string | undefined,
  "id": number | undefined,
  "certification": string,
  "institute": string,
  "location": string,
  "start_date": string,
  "end_date": string | undefined
}