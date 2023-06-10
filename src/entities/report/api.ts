import { ApiAllReportsResponse, CONST, Report, rtkApi, RtkCacheKeysEnum } from "@shared";
import { reportActions } from "@entities/report/model";

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
      providesTags: [RtkCacheKeysEnum.Report],
    }),
    getReportById: builder.query<Report, {
      id: string,
      skip?: number,
      age?: string[],
      sex?: string,
      mkb_code?: string,
    }>({
      query: ({ id, skip, sex, mkb_code, age }) => {
        return {
          url: `api/v1/report/get_by_document_id/${id}`,
          params: {
            limit: CONST.PAGINATION_LIMIT,
            skip: skip ?? 1,
            age,
            sex,
            mkb_code,
          },
        };
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          await dispatch(reportActions.setReport(data));
        } catch (error) {
          console.error(error);
        }
      },
      transformResponse(response: Report) {
        return {
          ...response,
          /*@ts-ignore*/
          date: response.date.$date,
        };
      },
      providesTags: [RtkCacheKeysEnum.Report],
      extraOptions: {
        maxRetries: 3,
      },
    }),
    updateReportFavouriteStatus: builder.mutation<Report, {
      id: string,
      is_favorite: boolean,
    }>({
      query: ({ is_favorite, id }) => {
        return {
          url: `/api/v1/report/set_favorite_by_file_id/${id}`,
          method: "POST",
          params: {
            is_favorite,
          },
        };
      },
      invalidatesTags: [RtkCacheKeysEnum.Report],
    }),
    renameReport: builder.mutation<Report, {
      id: string,
      new_name: string
    }>({
      query: ({ new_name, id }) => {
        return {
          url: `/api/v1/report/set_name_by_file_id/${id}`,
          method: "POST",
          params: {
            new_name,
          },
        };
      },
      invalidatesTags: [RtkCacheKeysEnum.Report],
    }),
    accuracyStats: builder.query<number[], string>({
      query: (id) => `/api/v1/report/get_accuracy_by_file_id/${id}`,
    }),
    sexStats: builder.query<any[], string>({
      query: (id) => `/api/v1/report/get_stats_by_file_id/${id}`,
    }),
  }),
});

export const {
  useGetReportByIdQuery,
  useGetReportsQuery,
  useUpdateReportFavouriteStatusMutation,
  useRenameReportMutation,
  useAccuracyStatsQuery,
  useSexStatsQuery,
} = api;

export {
  api as reportApi,
};
