import { AppLayout } from "@widgets";
import { Helmet } from "react-helmet-async";
import { ReportCollection } from "@entities/report";
import { Text } from "@gravity-ui/uikit";

const ReportsPage = () => {
  return (
    <>
      <Helmet>
        <title>Мои отчеты</title>
      </Helmet>
      <AppLayout>
        <Text variant={"display-1"}>Все отчеты</Text>
        <ReportCollection />
      </AppLayout>
    </>
  );
};

export default ReportsPage;
