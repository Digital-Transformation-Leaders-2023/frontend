import { AppLayout } from "@widgets";
import { ReportDataTab, ReportVisualizationTab } from "@entities/report";
import { useParams } from "react-router-dom";
import { Card, Spin, Tabs, Text } from "@gravity-ui/uikit";
import { Helmet } from "react-helmet-async";
import s from "./ReportPage.module.scss";
import { useState } from "react";
import { FilterBar } from "@features/apply-filters";
import { useActiveReport } from "@entities/report";
import { ChangeFavouriteReportStatus } from "@features/change-favourite-report-status";

type Tabs = "meta" | "visual"

const ReportPage = () => {
  const { id } = useParams();
  const { report, isFetching } = useActiveReport();

  const [tab, setTab] = useState<Tabs>("meta");

  if (isFetching) {
    return (
      <AppLayout>
        <Spin size={"l"} />
      </AppLayout>
    );
  }

  if (!report) {
    return (
      <AppLayout>
        <Text>Отчет не найден</Text>
      </AppLayout>
    );
  }

  return (
    <>
      <Helmet>
        <title>Отчет #{id}</title>
      </Helmet>
      <AppLayout>
        <section className={s.page__container}>
          <section className={s.page__aside}>
            <FilterBar reportId={id ?? ""} />

            <Card>
              <ChangeFavouriteReportStatus />
            </Card>
          </section>

          <Card className={s.page__content}>
            <Text className={s.content__heading} variant={"display-1"}>
              Отчет #{id}
            </Text>
            <Tabs
              activeTab={tab}
              size={"l"}
              items={[
                {
                  id: "meta",
                  title: "Сводная информация",
                },
                {
                  id: "visual",
                  title: "Визуализация",
                },
              ]}
              onSelectTab={(tab) => setTab(tab as Tabs)}
            />

            {
              tab === "meta" && (
                <ReportDataTab />
              )
            }

            {
              tab === "visual" && (
                <ReportVisualizationTab />
              )
            }
          </Card>

        </section>
      </AppLayout>
    </>
  );
};

export default ReportPage;
