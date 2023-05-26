import { ApiAllReportsResponse, CONST, Report, rtkApi, RtkCacheKeysEnum } from "@shared";

const api = rtkApi.injectEndpoints({
  endpoints: (builder) => ({
    getReports: builder.query<ApiAllReportsResponse, {
      skip?: number,
      is_favorite?: boolean,
    }>({
      query: ({ skip, is_favorite }) => {
        return {
          url: "reports",
          params: {
            limit: CONST.PAGINATION_LIMIT,
            skip: skip ?? 1,
            is_favorite: is_favorite ?? false,
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
            limit: CONST.PAGINATION_LIMIT,
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
