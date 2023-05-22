import { Button, Card, Text } from "@gravity-ui/uikit";
import s from "./FilterBar.module.scss";

export const FilterBar = () => {
  return (
    <aside>
      <Card className={s.filterBar}>
        <section>
          <Text as={"h4"} variant={"subheader-1"}>Дата приема</Text>
        </section>
        <section>
          <Button view={"action"}>Применить фильтр</Button>
        </section>
      </Card>
    </aside>
  );
};
