import { useParams, useSearchParams } from "react-router-dom";
import { useGetReportByIdQuery } from "@entities/report/api";
import { Report } from "@shared";
import { createSlice } from "@reduxjs/toolkit";
import { useAppSelector } from "@app/providers";

const initialState: {
    report: Report | null;
} = {
  report: null,
};

export const slice = createSlice({
  name: "report",
  initialState,
  reducers: {
    setReport: (state, action) => {
      state.report = action.payload;
    },
  },
});

const useActiveReport = (): {
    report: Report | undefined;
    isError: boolean;
    isFetching: boolean;
} => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();

  const { isFetching, isError } = useGetReportByIdQuery({
    id: id ?? "",
    skip: +(searchParams.get("page") ?? 1),
  }, {
    skip: !id,
  });

  const report = useAppSelector((state) => state.report.report);

  return {
    report: report ?? undefined,
    isError,
    isFetching,
  };
};

const { reducer, actions } = slice;

export {
  useActiveReport,
  reducer as reportReducer,
  actions as reportActions,
};
