import { Button, Card, Checkbox, RadioGroup, Select, Text } from "@gravity-ui/uikit";
import s from "./FilterBar.module.scss";
import { reportApi, useGetReportByIdQuery } from "@entities/report";
import { FC, useCallback, useMemo, useState } from "react";
import { useAppDispatch } from "@app/providers";
import { PatientAgeEnum } from "@shared";

type FilterBarProps = {
  reportId: string;
}

type FilterState = {
  age: string[],
  sex: string | null;
  mkb_code: string | null;
}

const InitialFilterState: FilterState = {
  age: [],
  sex: null,
  mkb_code: null,
};

export const FilterBar: FC<FilterBarProps> = (props) => {
  const { reportId } = props;

  const dispatch = useAppDispatch();
  const { data } = useGetReportByIdQuery({
    id: reportId,
  }, {
    skip: !reportId,
  });

  const genderList = useMemo(() => {
    return [...new Set(data?.list.map(l => l.patient_gender))];
  }, [data]);

  const mkbList = useMemo(() => {
    return [...new Set(data?.list.map(l => l.MKB_code))];
  }, [data]);

  const [filter, setFilter] = useState<FilterState>(InitialFilterState);

  const handleFilterSubmission = useCallback(async () => {
    const result = dispatch(reportApi.endpoints.getReportById.initiate({
      id: reportId,
      ...(filter.sex && { sex: filter.sex }),
      ...(filter.mkb_code && { mkb_code: filter.mkb_code }),
      ...(filter.age.length && { age: filter.age }),
    }, {
      forceRefetch: true,
    }));

    return result.unsubscribe;
  }, [filter, dispatch]);

  const onFilterReset = useCallback(async () => {
    setFilter(InitialFilterState);

    const result = dispatch(reportApi.endpoints.getReportById.initiate({
      id: reportId,
    }, {
      forceRefetch: true,
    }));

    return result.unsubscribe;
  }, []);

  return (
    <aside className={s.aside}>
      <Card>
        <section className={s.filter__section}>
          <section>
            <Text as={"h4"} className={s.heading} variant={"subheader-2"}>Пол пациента</Text>
            <RadioGroup className={s.toggleGroup}
              defaultValue={""}
              size={"l"}
              value={filter.sex ?? ""}
              options={genderList.map(g => ({ content: g, value: g })).concat({
                content: "Любой",
                value: "",
              })}
              onUpdate={(value) => setFilter({
                ...filter,
                sex: value,
              })} />
          </section>

          <section>
            <Text as={"h4"} className={s.heading} variant={"subheader-2"}>Возраст пациента</Text>
            <div className={s.toggleGroup}>
              <Checkbox checked={filter.age.includes(PatientAgeEnum.Young)}
                content={"Младше 18"}
                size="l"
                value={PatientAgeEnum.Young}
                onUpdate={(checked) => {
                  setFilter({
                    ...filter,
                    age: checked ? filter.age.concat(PatientAgeEnum.Young) : filter.age.filter(a => a !== PatientAgeEnum.Young),
                  });
                }} />
              <Checkbox checked={filter.age.includes(PatientAgeEnum.Mature)}
                content={"От 18 до 45"}
                size="l"
                value={PatientAgeEnum.Mature}
                onUpdate={(checked) => {
                  setFilter({
                    ...filter,
                    age: checked ? filter.age.concat(PatientAgeEnum.Mature) : filter.age.filter(a => a !== PatientAgeEnum.Mature),
                  });
                }} />
              <Checkbox checked={filter.age.includes(PatientAgeEnum.Old)}
                content={"От 45 и старше"}
                size="l"
                value={PatientAgeEnum.Old}
                onUpdate={(checked) => {
                  setFilter({
                    ...filter,
                    age: checked ? filter.age.concat(PatientAgeEnum.Old) : filter.age.filter(a => a !== PatientAgeEnum.Old),
                  });
                }} />
            </div>
          </section>

          <section>
            <Text as={"h4"} className={s.heading} variant={"subheader-2"}>Код МКБ</Text>
            <Select defaultValue={[]} options={mkbList.map(l => ({ content: l, value: l }))}
              placeholder={"F99"}
              size={"l"}
              value={filter.mkb_code ? [filter.mkb_code] : []}
              width={"max"}
              onUpdate={data => {
                setFilter({
                  ...filter,
                  mkb_code: data[0] as string,
                });
              }} />
          </section>
        </section>

        <Button className={s.button} size={"l"}
          view={"action"} width={"max"}
          onClick={handleFilterSubmission}>
          Применить фильтр
        </Button>

        {
          filter !== InitialFilterState && (
            <section className={s.reset}>
              <Button view={"flat-danger"} onClick={onFilterReset}>
                Сбросить фильтр
              </Button>
            </section>
          )
        }
      </Card>
    </aside>
  );
};
