import { ApiAllReportsResponse, CONST, Report, rtkApi, RtkCacheKeysEnum } from "@shared";

const api = rtkApi.injectEndpoints({
  endpoints: (builder) => ({
    getReports: builder.query<ApiAllReportsResponse, {
      skip?: number,
      is_favorite?: boolean,
    }>({
      query: ({ skip, is_favorite }) => {
        return {
          url: "api/v1/report/get_all_files",
          params: {
            limit: CONST.PAGINATION_LIMIT,
            skip: skip ?? 1,
            is_favorite: is_favorite ?? false,
          },
        };
      },
      transformResponse(response: ApiAllReportsResponse) {
        return {
          ...response,
          reports: response?.reports.map(r => ({
            ...r,
            /*@ts-ignore*/
            date: r.date.$date,
          })),
        };
      },
    }),
    getReportById: builder.query<Report, {
      id: string,
      skip?: number,
    }>({
      query: ({ id, skip }) => {
        return {
          url: `api/v1/report/get_by_document_id/${id}`,
          params: {
            limit: CONST.PAGINATION_LIMIT,
            skip: skip ?? 1,
          },
        };
      },
      transformResponse(response: Report) {
        return {
          ...response,
          /*@ts-ignore*/
          date: response.date.$date,
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
