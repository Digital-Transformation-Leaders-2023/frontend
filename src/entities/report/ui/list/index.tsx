import { ReportCard, useGetReportsQuery } from "@entities/report";
import { Spin } from "@gravity-ui/uikit";
import s from "./ReportCollection.module.scss";
import { Pagination } from "@shared";
import { useSearchParams } from "react-router-dom";

export const ReportCollection = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data, isFetching } = useGetReportsQuery({
    skip: +(searchParams.get("page") ?? 1),
  });

  if (isFetching) {
    return (
      <div>
        <Spin size={"l"} />
      </div>
    );
  }

  return (
    <>
      <section className={s.collection}>
        {
          data?.reports?.map((report) => (
            <ReportCard data={report} key={report.id} />
          ))
        }
      </section>
      <Pagination current={+(searchParams.get("page") ?? 1)}
        total={Math.ceil((data?.total_files ?? 1) / 10)}
        onChange={(page) => {
          setSearchParams({
            ...searchParams,
            page: page.toString(),
          });
        }} />
    </>
  );
};
