import { CONST, Pagination, Report } from "@shared";
import { FC, useMemo, useState } from "react";
import {
  Label,
  Table,
  TableSettingsData,
  withTableSelection,
  withTableSettings,
  withTableSorting,
  Text,
} from "@gravity-ui/uikit";
import { useSearchParams } from "react-router-dom";
import { reportApi } from "@entities/report";
import { useAppDispatch } from "@app/providers";

const RichTable = withTableSettings(withTableSorting(withTableSelection(Table)));

type ReportTableProps = {
  data?: Report;
}

export const ReportTable: FC<ReportTableProps> = ({ data }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();

  const columns = useMemo(() => {
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

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [settings, setSettings] = useState<TableSettingsData>(() => columns.map(c => ({
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
        columns={columns}
        emptyMessage={"Данных по этому отчету не найдено"}
        selectedIds={selectedIds}
        settings={settings}
        updateSettings={setSettings}
        data={data?.list.map(d => {
          const ageDate = d.date_of_patient_birth.split(".");
          const age = new Date().getFullYear() -
            new Date(+ageDate[2], +(ageDate[1]) - 1, +ageDate[0]).getFullYear();

          return {
            id: d.patient_id,
            name: d.diagnosis,
            appointment: d.appointment,
            accuracy: <Label theme={
              d.accuracy > 0.8 ? "success" : d.accuracy > 0.5 ? "warning" : "danger"
            }>{d.accuracy?.toFixed(2)}</Label>,
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
    </>
  );
};
