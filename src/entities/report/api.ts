import { rtkApi } from "@shared";

const api = rtkApi.injectEndpoints({
  endpoints: (builder) => ({
    getReportById: builder.query({
      query: (id: string) => `/reports/${id}`,
    }),
  }),
});

export const { useGetReportByIdQuery } = api;
