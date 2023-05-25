type Report = {
  id: string;
  total: number,
  date: Date,
  is_favorite: boolean,
  list: {
    patient_gender: string,
    date_of_patient_birth: Date,
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

export type {
  Report,
  ApiAllReportsResponse,
};
