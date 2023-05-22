import { Helmet } from "react-helmet-async";
import { UploadReportButton } from "@features/upload-report";
import { AppLayout } from "@widgets";
import s from "./RootPage.module.scss";

const RootPage = () => {
  return (
    <>
      <Helmet>
        <title>Главная страница</title>
      </Helmet>

      <AppLayout>
        <section className={s.uploadContainer}>
          <UploadReportButton />
        </section>
      </AppLayout>
    </>
  );
};

export default RootPage;
