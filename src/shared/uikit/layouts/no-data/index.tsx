import { Icon56InfoOutline } from "@vkontakte/icons";
import { Card, Text } from "@gravity-ui/uikit";
import s from "./styles.module.scss";

export const NoDataFiller = () => {
  return (
    <Card className={s.wrapper}>
      <Icon56InfoOutline height={36} width={36} />
      <Text>
        Нет данных
      </Text>
    </Card>
  );
};
