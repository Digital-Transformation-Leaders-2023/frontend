type Report = {
  id: string;
  status: number,
  offset: number,
  count: number,
  date: Date,
  diagnoses: {
    diagnosis: string,
    doctor: string,
    accuracy: number,
    recommendation: string,
    date: Date,
  }[]
};

export type {
  Report,
};
