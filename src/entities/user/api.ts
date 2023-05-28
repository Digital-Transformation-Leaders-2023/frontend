export type SignupDto = {
  email: string;
  password: string;
  username: string;
};

export type LoginDto = Omit<SignupDto, "email">;
