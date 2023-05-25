import { Pagination } from "@shared";
import { FC, useMemo, useState } from "react";
import {
  Label,
  Table,
  TableSettingsData,
  withTableSelection,
  withTableSettings,
  withTableSorting,
} from "@gravity-ui/uikit";
import { useParams, useSearchParams } from "react-router-dom";
import { useGetReportByIdQuery } from "@entities/report";

const RichTable = withTableSettings(withTableSorting(withTableSelection(Table)));

export const ReportTable: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { id } = useParams();
  const { data } = useGetReportByIdQuery({
    id: id ?? "",
    skip: +(searchParams.get("page") ?? 1),
  }, {
    skip: !id,
  });

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
    isSelected: !["age", "mkb_code"].includes(c.id),
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
          };
        }) ?? []}
        onSelectionChange={setSelectedIds} />

      <Pagination current={+(searchParams.get("page") ?? 1)} total={3} onChange={(page) => {
        setSearchParams({
          ...searchParams,
          page: page.toString(),
        });
      }} />
    </>
  );
};
