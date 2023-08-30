import { AcademicDTO, CertificationDTO, TrainingDTO } from "../education"

export const defaultAcademicInput: AcademicDTO = {
  "category": '',
  "id": 0,
  "education_id": 0,
  "degree": '',
  "major": '',
  "passing_year": '',
  "duration": '',
  "institute": '',
  "achievement": '',
  "board": '',
  "result": '',
  "mark": '',
  "scale": ''
}

export const defaultTrainingInput: TrainingDTO = {
  "category": '',
  "id": 0,
  "title": '',
  "country_id": 0,
  "training_year": '',
  "topic": '',
  "duration": '',
  "institute": '',
  "location": ''
}

export const defaultCertificationInput: CertificationDTO = {
  "category": '',
  "id": 0,
  "certification": '',
  "institute": '',
  "location": '',
  "start_date": '',
  "end_date": ''
}

