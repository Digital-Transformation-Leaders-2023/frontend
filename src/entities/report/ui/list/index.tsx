import { ReportCard, useGetReportsQuery } from "@entities/report";
import { Spin } from "@gravity-ui/uikit";
import s from "./ReportCollection.module.scss";
import { CONST, Pagination } from "@shared";
import { useSearchParams } from "react-router-dom";
import { FC } from "react";
import { NoDataFiller } from "@shared";

type ReportCollectionProps = {
  onlyFavorites?: boolean;
}

export const ReportCollection: FC<ReportCollectionProps> = ({ onlyFavorites }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data, isFetching } = useGetReportsQuery({
    skip: +(searchParams.get("page") ?? 1),
    is_favorite: onlyFavorites,
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
          data?.reports?.length === 0 && (
            <NoDataFiller />
          )
        }
        {
          data?.reports?.map((report) => (
            <ReportCard data={report} key={report.id} />
          ))
        }
      </section>
      {
        !onlyFavorites && (
          <Pagination current={+(searchParams.get("page") ?? 1)}
            total={Math.ceil((data?.total_files ?? 1) / CONST.PAGINATION_LIMIT)}
            onChange={(page) => {
              setSearchParams({
                ...searchParams,
                page: page.toString(),
              });
            }} />
        )
      }
    </>
  );
};
