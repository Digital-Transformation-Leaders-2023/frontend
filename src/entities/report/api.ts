import { ApiAllReportsResponse, Report, rtkApi } from "@shared";

const api = rtkApi.injectEndpoints({
  endpoints: (builder) => ({
    getReports: builder.query<ApiAllReportsResponse, {
      skip?: number,
    }>({
      query: ({ skip }) => {
        return {
          url: "reports",
          params: {
            limit: 10,
            skip: skip ?? 1,
          },
        };
      },
    }),
    getReportById: builder.query<Report, {
      id: string,
      skip?: number,
    }>({
      query: ({ id, skip }) => {
        return {
          url: `reports/${id}`,
          params: {
            limit: 10,
            skip: skip ?? 1,
          },
        };
      },
    }),
  }),
});

export const {
  useGetReportByIdQuery,
  useGetReportsQuery,
} = api;
