type Report = {
  id: string;
  total: number,
  date: Date,
  is_favorite: boolean,
  name: string,
  list: {
    patient_gender: string,
    date_of_patient_birth: string,
    patient_id: number,
    MKB_code: string,
    diagnosis: string,
    accuracy: number,
    date_of_service: Date,
    job_title: string,
    appointment: string,
  }[]
};

type ApiAllReportsResponse = {
  reports: Report[],
  total_files: number,
};

export enum PatientAgeEnum {
  Young = "18",
  Mature = "18-45",
  Old = "45",
}

export type {
  Report,
  ApiAllReportsResponse,
};
