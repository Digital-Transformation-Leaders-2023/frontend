import { CONST, Pagination, Report } from "@shared";
import { FC, useMemo, useState } from "react";
import {
  Label,
  Table,
  TableSettingsData,
  withTableSelection,
  withTableSettings,
  withTableSorting,
} from "@gravity-ui/uikit";
import { useSearchParams } from "react-router-dom";

const RichTable = withTableSettings(withTableSorting(withTableSelection(Table)));

type ReportTableProps = {
  data?: Report;
}

export const ReportTable: FC<ReportTableProps> = ({ data }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const columns = useMemo(() => {
    return [
      {
        id: "name",
        primary: true,
        name: "Диагноз",
        meta: {
          sort: true,
        },
      },
      {
        id: "job_title",
        name: "Должность врача",
      },
      {
        id: "appointment",
        name: "Назначение",
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
      },
    ];
  }, [data]);

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [settings, setSettings] = useState<TableSettingsData>(() => columns.map(c => ({
    id: c.id,
    isSelected: !["age", "mkb_code", "sex"].includes(c.id),
  })));

  if (!data) {
    return (
      <>
        Такого отчета не существует
      </>
    );
  }

  return (
    <>
      <RichTable
        columns={columns}
        emptyMessage={"Данных по этому отчету не найдено"}
        selectedIds={selectedIds}
        settings={settings}
        updateSettings={setSettings}
        data={data?.list.map(d => {
          return {
            name: d.diagnosis,
            appointment: d.appointment,
            accuracy: <Label theme={
              d.accuracy > 0.8 ? "success" : d.accuracy > 0.5 ? "warning" : "danger"
            }>{d.accuracy.toFixed(2)}</Label>,
            date: new Date(d.date_of_service).toLocaleDateString("ru"),
            age: new Date().getFullYear() - new Date(d.date_of_patient_birth).getFullYear(),
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
        }} />
    </>
  );
};
