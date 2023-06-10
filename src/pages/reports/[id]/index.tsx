import { AppLayout } from "@widgets";
import { ReportDataTab, ReportVisualizationTab, useRenameReportMutation } from "@entities/report";
import { useParams } from "react-router-dom";
import { Button, Card, Spin, Tabs, Text, TextInput } from "@gravity-ui/uikit";
import { Helmet } from "react-helmet-async";
import s from "./ReportPage.module.scss";
import { useEffect, useState } from "react";
import { FilterBar } from "@features/apply-filters";
import { useActiveReport } from "@entities/report";
import { ChangeFavouriteReportStatus } from "@features/change-favourite-report-status";
import { Icon16PenOutline } from "@vkontakte/icons";

type Tabs = "meta" | "visual"

const ReportPage = () => {
  const { id } = useParams();
  const { report, isFetching } = useActiveReport();
  const [renameReport] = useRenameReportMutation();

  const [tab, setTab] = useState<Tabs>("meta");

  const [isEditing, setIsEditing] = useState(false);
  const [reportName, setReportName] = useState("");

  useEffect(() => {
    if (report)
      setReportName(report?.name);
  }, [report]);

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
        <title>{report.name}</title>
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
            <section className={s.text__wrapper}>
              {
                !isEditing && (
                  <>
                    <Text className={s.content__heading} variant={"display-1"}>
                      {report?.name}
                    </Text>
                    <Button onClick={() => setIsEditing(true)}>
                      <Button.Icon>
                        <Icon16PenOutline />
                      </Button.Icon>
                    </Button>
                  </>
                )
              }
              {
                isEditing && (
                  <>
                    <TextInput
                      className={s.text__input}
                      value={reportName}
                      onChange={(e) => setReportName(e.target.value)} />
                    <Button onClick={() => setIsEditing(false)}>Отменить</Button>
                    <Button view={"action"} onClick={() => {
                      renameReport({
                        id: report?.id,
                        new_name: reportName ?? report?.name,
                      });
                      setIsEditing(false);
                    }}>Сохранить</Button>
                  </>
                )
              }
            </section>

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
