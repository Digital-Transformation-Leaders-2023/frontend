import { rtkApi } from "@shared";

export type SignupDto = {
  email: string;
  password: string;
  username: string;
};

export type LoginDto = Pick<SignupDto, "username">;

const api = rtkApi.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation<SignupDto, void>({
      query: (body) => ({
        url: "/signup",
        method: "POST",
        body,
      }),
    }),
    login: builder.mutation<LoginDto, void>({
      query: (body) => ({
        url: "/login",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
} = api;
