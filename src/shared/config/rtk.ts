import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ENV } from "@shared/config/env";

export const rtkApi = createApi({
  reducerPath: "rtkApi",
  baseQuery: fetchBaseQuery({
    baseUrl: ENV.API_URL,
  }),
  endpoints: () => ({}),
});
