import { ReportCard, useGetReportsQuery } from "@entities/report";
import { Skeleton } from "@gravity-ui/uikit";
import s from "./ReportCollection.module.scss";

export const ReportCollection = () => {
  const { data, isFetching } = useGetReportsQuery();

  if (isFetching) {
    return (
      <div>
        <Skeleton />
      </div>
    );
  }

  return (
    <section className={s.collection}>
      {
        data?.map((report) => (
          <ReportCard data={report} key={report.id} />
        ))
      }
    </section>
  );
};
