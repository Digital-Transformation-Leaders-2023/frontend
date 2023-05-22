import { AppLayout } from "@widgets";
import { Helmet } from "react-helmet-async";
import { ReportCollection } from "@entities/report";

const ReportsPage = () => {
  return (
    <>
      <Helmet>
        <title>Мои отчеты</title>
      </Helmet>
      <AppLayout>
        <ReportCollection />
      </AppLayout>
    </>
  );
};

export default ReportsPage;
