import { Button, Card, Checkbox, RadioGroup, Select, Text } from "@gravity-ui/uikit";
import s from "./FilterBar.module.scss";
import { useGetReportByIdQuery } from "@entities/report";
import { FC, useCallback, useMemo, useState } from "react";

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

  const handleFilterSubmission = useCallback(() => {
    console.log(filter);
  }, [filter]);

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
              <Checkbox checked={filter.age.includes("young")}
                content={"Младше 18"}
                size="l"
                value={"young"}
                onUpdate={(checked) => {
                  setFilter({
                    ...filter,
                    age: checked ? filter.age.concat("young") : filter.age.filter(a => a !== "young"),
                  });
                }} />
              <Checkbox checked={filter.age.includes("mature")}
                content={"От 18 до 45"}
                size="l"
                value={"mature"}
                onUpdate={(checked) => {
                  setFilter({
                    ...filter,
                    age: checked ? filter.age.concat("mature") : filter.age.filter(a => a !== "mature"),
                  });
                }} />
              <Checkbox checked={filter.age.includes("old")}
                content={"От 45 и больше"}
                size="l"
                value={"old"}
                onUpdate={(checked) => {
                  setFilter({
                    ...filter,
                    age: checked ? filter.age.concat("old") : filter.age.filter(a => a !== "old"),
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
              <Button view={"flat-danger"} onClick={() => setFilter(InitialFilterState)}>
                Сбросить фильтр
              </Button>
            </section>
          )
        }
      </Card>
    </aside>
  );
};
