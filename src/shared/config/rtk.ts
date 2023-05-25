import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ENV } from "@shared/config/env";

export enum RtkCacheKeysEnum {
  Report = "report",
}

export const rtkApi = createApi({
  reducerPath: "rtkApi",
  tagTypes: Object.values(RtkCacheKeysEnum),
  baseQuery: fetchBaseQuery({
    baseUrl: ENV.API_URL,
  }),
  endpoints: () => ({}),
});
