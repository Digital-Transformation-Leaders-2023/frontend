type Report = {
  status: number,
  offset: number,
  count: number,
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
