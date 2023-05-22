import { AppLayout } from "@widgets";
import { useGetReportByIdQuery } from "@entities/report";
import { useParams } from "react-router-dom";
import { Skeleton, Text } from "@gravity-ui/uikit";
import { Helmet } from "react-helmet-async";
import { FilterBar } from "@widgets/filter-bar";

const ReportPage = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetReportByIdQuery(id ?? "");

  console.log(data);

  if (isLoading) {
    return (
      <AppLayout>
        <Skeleton />
      </AppLayout>
    );
  }

  return (
    <>
      <Helmet>
        <title>Отчет #{id}</title>
      </Helmet>
      <AppLayout>
        <FilterBar />
        <Text variant={"display-1"}>
          Отчет #{id}
        </Text>
      </AppLayout>
    </>
  );
};

export default ReportPage;
