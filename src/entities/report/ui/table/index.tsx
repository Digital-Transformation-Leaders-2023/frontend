import { CONST, getAge, MetricsEnum, Pagination, Report } from "@shared";
import { FC, useEffect, useMemo, useState } from "react";
import {
  Label,
  Table,
  TableSettingsData,
  withTableSelection,
  withTableSettings,
  withTableSorting,
  Text,
  Tooltip,
  Button, Dialog, Tabs,
} from "@gravity-ui/uikit";
import { useSearchParams } from "react-router-dom";
import { reportApi } from "@entities/report";
import { useAppDispatch } from "@app/providers";
import s from "./Table.module.scss";

const RichTable = withTableSettings(withTableSorting(withTableSelection(Table)));
const DefaultTable = withTableSorting(Table);

type ReportTableProps = {
  data?: Report;
}

export const ReportTable: FC<ReportTableProps> = ({ data }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();

  const [isModalActive, setIsModalActive] = useState(false);
  const [selectedTab, setSelectedTab] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  useEffect(() => {
    if (selectedIds.length === 1) {
      setSelectedTab(selectedIds[0]);
    }
  }, [selectedIds]);

  const richTableColumns = useMemo(() => {
    return [
      {
        id: "id",
        name: "ID пациента",
        meta: {
          sort: true,
        },
      },
      {
        id: "name",
        primary: true,
        name: "Диагноз",
        meta: {
          sort: true,
        },
      },
      {
        id: "appointment",
        name: "Назначение",
        meta: {
          sort: true,
        },
      },
      {
        id: "job_title",
        name: "Должность врача",
        meta: {
          sort: true,
        },
      },
      {
        id: "accuracy",
        name: "Точность",
        meta: {
          defaultSortOrder: "desc",
          sort: (a: any, b: any) => +a.accuracy.props.children - +b.accuracy.props.children,
        },
      },
      {
        id: "date",
        name: "Дата приема",
        meta: {
          sort: true,
        },
      },
      {
        id: "sex",
        name: "Пол пациента",
        meta: {
          sort: true,
        },
      },
      {
        id: "age",
        name: "Возраст пациента",
        meta: {
          sort: true,
        },
      },
      {
        id: "mkb_code",
        name: "Код МКБ",
        meta: {
          sort: true,
        },
      },
    ];
  }, [data]);

  const defaultTableColumns = useMemo(() => {
    return [
      {
        id: "appointment",
        name: "Назначение",
        width: "50%",
      },
      {
        id: "accuracy",
        name: "Точность",
      },
      {
        id: "added",
        name: "Необходимое назначение",
      },
    ];
  }, [data, selectedTab]);

  const [settings, setSettings] = useState<TableSettingsData>(() => richTableColumns.map(c => ({
    id: c.id,
    isSelected: !["age", "mkb_code", "sex", "id"].includes(c.id),
  })));

  if (!data) {
    return (
      <Text>
        Такого отчета не существует
      </Text>
    );
  }

  return (
    <>
      <RichTable
        columns={richTableColumns}
        emptyMessage={"Данных по этому отчету не найдено"}
        selectedIds={selectedIds}
        settings={settings}
        updateSettings={setSettings}
        data={data?.list.map(d => {
          const age = getAge(d.date_of_patient_birth);
          const averageAccuracy = d.appointment_accuracy.reduce((acc, curr) => acc + curr.accuracy, 0) / d.appointment.length;

          return {
            id: d.patient_id,
            name: d.diagnosis,
            appointment: d.appointment.join("\n"),
            accuracy:
            <Tooltip content={"Средняя точность по назначениям"}>
              <Label theme={
                averageAccuracy > MetricsEnum.High ? "success" :averageAccuracy > MetricsEnum.Medium ? "warning" : "danger"
              }>{averageAccuracy?.toFixed(2)}</Label>
            </Tooltip>,
            date: d.date_of_service,
            age: isNaN(age) ? null : age,
            mkb_code: d.MKB_code,
            sex: d.patient_gender,
            job_title: d.job_title,
          };
        }) ?? []}
        onSelectionChange={setSelectedIds} />

      <Pagination current={+(searchParams.get("page") ?? 1)}
        total={Math.ceil(data?.total / CONST.PAGINATION_LIMIT)}
        onChange={(page) => {
          setSearchParams({
            ...searchParams,
            page: page.toString(),
          });
          dispatch(reportApi.endpoints.getReportById.initiate({
            id: data?.id,
            skip: page,
          }, {
            forceRefetch: true,
          }));
        }} />

      {
        selectedIds.length > 0 && (
          <Button className={s.button} view={"action"} onClick={() => setIsModalActive(true)}>
            Подробнее
          </Button>
        )
      }
      <Dialog open={isModalActive}
        onClose={() => {
          setSelectedIds([]);
          setIsModalActive(false);
        }}>
        <Dialog.Header caption="Детали назначений" />
        <Dialog.Body>
          <section className={s.nestedTabs}>
            <Tabs
              activeTab={selectedTab}
              className={s.nestedTabs__root}
              direction={"horizontal"}
              size={"l"}
              items={selectedIds?.map(id => ({
                id,
                title: data.list?.[+id]?.diagnosis,
              }))}
              onSelectTab={setSelectedTab} />
            <section className={s.nestedTabs__tab}>
              <DefaultTable
                columns={defaultTableColumns}
                data={data.list?.[+selectedTab]?.appointment_accuracy?.map(d => ({
                  appointment: d.appointment,
                  accuracy: <Label theme={
                    d.accuracy > MetricsEnum.High ? "success" :d.accuracy > MetricsEnum.Medium ? "warning" : "danger"
                  }>{d.accuracy?.toFixed(2)}</Label>,
                  added: d.added ? "Да" : "Нет",
                }))} />
            </section>
          </section>
        </Dialog.Body>
      </Dialog>
    </>
  );
};
