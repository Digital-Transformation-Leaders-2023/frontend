type Report = {
  id: string;
  status: number,
  offset: number,
  count: number,
  date: Date,
  list: {
    patient_gender: string,
    date_of_patient_birth: Date,
    patient_id: number,
    MKB_code: string,
    diagnosis: string,
    date_of_service: Date,
    job_title: string,
    appointment: string,
  }[]
};

export type {
  Report,
};
