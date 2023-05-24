import { AppLayout } from "@widgets";
import { useGetReportByIdQuery } from "@entities/report";
import { useParams } from "react-router-dom";
import { Card, Skeleton, Table, Tabs, Text } from "@gravity-ui/uikit";
import { Helmet } from "react-helmet-async";
import s from "./ReportPage.module.scss";
import { useState } from "react";
import { Tab } from "@shared";
import { FilterBar } from "@features/apply-filters";

type Tabs = "meta" | "visual"

const ReportPage = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetReportByIdQuery(id ?? "", {
    skip: !id,
  });
  const [tab, setTab] = useState<Tabs>("meta");

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
        <section className={s.page__container}>
          <FilterBar reportId={id ?? ""} />

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
                  title: "Мета-информация об отчете",
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
                <Tab>
                  <Text>
                    Тут будет мета-информация об отчете
                  </Text>

                  <Table
                    columns={[
                      {
                        id: "name",
                        name: "Диагноз",
                      },
                      {
                        id: "value",
                        name: "Назначение",
                      },
                    ]} data={data?.list.map(d => {
                      return {
                        name: d.diagnosis,
                        value: d.appointment,
                      };
                    }) ?? []} />
                </Tab>
              )
            }

            {
              tab === "visual" && (
                <Tab>
                  <Text>
                    Тут будет визуализация
                  </Text>
                </Tab>
              )
            }
          </Card>

        </section>
      </AppLayout>
    </>
  );
};

export default ReportPage;
