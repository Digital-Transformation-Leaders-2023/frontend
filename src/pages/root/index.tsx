import { Helmet } from "react-helmet-async";
import { UploadReportButton } from "@features/upload-report";
import { AppLayout } from "@widgets";

const RootPage = () => {
  return (
    <>
      <Helmet>
        <title>Главная страница</title>
      </Helmet>
      <AppLayout>
        <UploadReportButton />
      </AppLayout>
    </>
  );
};

export default RootPage;
