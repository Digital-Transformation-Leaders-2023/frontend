export const getAge = (dateString: string): number => {
  const today = new Date();
  const ageDate = dateString.split(".");
  const birthDate = new Date(+ageDate[2], +(ageDate[1]) - 1, +ageDate[0]);

  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age ?? NaN;
};
