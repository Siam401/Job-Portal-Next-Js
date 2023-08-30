export const STORAGE_URL = process.env.NEXT_PUBLIC_STORAGE_URL;
export const API_URL = process.env.NEXT_PUBLIC_API_URL;

export type AlertColor = 'success' | 'info' | 'warn' | 'error';

export type ApplicationStages =
  | 'applied'
  | 'shortlisted'
  | 'interviewed'
  | 'hired'
  | 'waiting'
  | 'rejected';

export const EducationResult: object[] = [
  { value: 'grade', text: 'Grade' },
  { value: 'division', text: 'Division' },
  { value: 'other', text: 'Other' },
];