import { Report, rtkApi } from "@shared";

const api = rtkApi.injectEndpoints({
  endpoints: (builder) => ({
    getReports: builder.query<Report[], void>({
      query: () => "reports",
    }),
    getReportById: builder.query<Report, string>({
      query: (id: string) => `reports/${id}`,
    }),
  }),
});

export const {
  useGetReportByIdQuery,
  useGetReportsQuery,
} = api;
