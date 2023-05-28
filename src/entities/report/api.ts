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
    }),
  }),
});

export const {
  useGetReportByIdQuery,
  useGetReportsQuery,
} = api;

export {
  api as reportApi,
};
