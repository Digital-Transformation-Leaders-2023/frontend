import { ApiAllReportsResponse, Report, rtkApi, RtkCacheKeysEnum } from "@shared";

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
      providesTags: (result) =>
        result
          ? [{ type: RtkCacheKeysEnum.Report, id: result.id }, RtkCacheKeysEnum.Report]
          : [RtkCacheKeysEnum.Report],
    }),
  }),
});

export const {
  useGetReportByIdQuery,
  useGetReportsQuery,
} = api;
