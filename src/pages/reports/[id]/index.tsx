import { AppLayout } from "@widgets";
import { useGetReportByIdQuery } from "@entities/report";
import { useParams } from "react-router-dom";
import { Skeleton, Table, Tabs, Text } from "@gravity-ui/uikit";
import { Helmet } from "react-helmet-async";
import { FilterBar } from "@widgets/filter-bar";
import s from "./ReportPage.module.scss";
import { useState } from "react";

type Tabs = "meta" | "visual"

const ReportPage = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetReportByIdQuery(id ?? "");
  const [tab, setTab] = useState<Tabs>("meta");

  console.log(data, tab);

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
          <FilterBar />

          <div className={s.page__content}>
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
                <>
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
                    ]} data={data?.diagnoses.map(d => {
                      return {
                        name: d.diagnosis,
                        value: d.recommendation,
                      };
                    }) ?? []} />
                </>
              )
            }

            {
              tab === "visual" && (
                <Text>
                  Тут будет визуализация
                </Text>
              )
            }
          </div>

        </section>
      </AppLayout>
    </>
  );
};

export default ReportPage;
