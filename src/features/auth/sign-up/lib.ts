import { yup } from "@shared";

export const schema = yup().object().shape({
  email: yup().string().email().required(),
  password: yup().string().min(4).max(12).required(),
  username: yup().string().min(4).max(32).required(),
});

