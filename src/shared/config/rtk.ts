import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ENV } from "@shared/config/env";
import { api } from "@shared";

export enum RtkCacheKeysEnum {
  Report = "report",
}

export const rtkApi = createApi({
  reducerPath: "rtkApi",
  tagTypes: Object.values(RtkCacheKeysEnum),
  baseQuery: fetchBaseQuery({
    baseUrl: ENV.API_URL,
    prepareHeaders: (headers) => {
      const authorizationHeader = api.defaults?.headers?.common?.["Authorization"] ?? "";
      if (authorizationHeader) {
        headers.set("Authorization", authorizationHeader as string);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
});
