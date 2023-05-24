import { Button, Card, Checkbox, RadioGroup, Select, Text } from "@gravity-ui/uikit";
import s from "./FilterBar.module.scss";
import { useGetReportByIdQuery } from "@entities/report";
import { FC, useMemo } from "react";

type FilterBarProps = {
  reportId: string;
}

export const FilterBar: FC<FilterBarProps> = (props) => {
  const { reportId } = props;
  const { data } = useGetReportByIdQuery(reportId, {
    skip: !reportId,
  });

  const genderList = useMemo(() => {
    return [...new Set(data?.list.map(l => l.patient_gender))];
  }, [data]);

  const mkbList = useMemo(() => {
    return [...new Set(data?.list.map(l => l.MKB_code))];
  }, [data]);


  return (
    <aside className={s.aside}>
      <Card>
        <section className={s.filter__section}>
          <section>
            <Text as={"h4"} className={s.heading} variant={"subheader-2"}>Пол пациента</Text>
            <RadioGroup className={s.toggleGroup} defaultValue={""} size={"l"} options={genderList.map(g => ({ content: g, value: g })).concat({
              content: "Любой",
              value: "",
            })} />
          </section>

          <section>
            <Text as={"h4"} className={s.heading} variant={"subheader-2"}>Возраст пациента</Text>
            <div className={s.toggleGroup}>
              <Checkbox content={"Младше 18"} size="l" />
              <Checkbox content={"От 18 до 45"} size="l" />
              <Checkbox content={"От 45 и больше"} size="l" />
            </div>
          </section>

          <section>
            <Text as={"h4"} className={s.heading} variant={"subheader-2"}>Код МКБ</Text>
            <Select defaultValue={[]} options={mkbList.map(l => ({ content: l, value: l }))}
              placeholder={"Тест"} size={"l"} width={"max"} />
          </section>
        </section>

        <Button className={s.button} size={"l"} view={"action"}>Применить фильтр</Button>
      </Card>
    </aside>
  );
};
