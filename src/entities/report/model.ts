import { useParams, useSearchParams } from "react-router-dom";
import { useGetReportByIdQuery } from "@entities/report/api";
import { Report } from "@shared";

const useActiveReport = (): {
  report: Report | undefined;
  isError: boolean;
  isFetching: boolean;
} => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();

  const { data, isFetching, isError } = useGetReportByIdQuery({
    id: id ?? "",
    skip: +(searchParams.get("page") ?? 1),
  }, {
    skip: !id,
  });

  return {
    report: data,
    isError,
    isFetching,
  };
};

export {
  useActiveReport,
};
