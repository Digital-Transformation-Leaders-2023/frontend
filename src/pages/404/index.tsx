import { AppLayout } from "@widgets";
import { Card, Text } from "@gravity-ui/uikit";
import { Icon20CancelCircleFillRed } from "@vkontakte/icons";
import { Link } from "react-router-dom";
import s from "./Page404.module.scss";

const Page404 = () => {
  return (
    <AppLayout>
      <Card className={s.container}>
        <Icon20CancelCircleFillRed height={56} width={56} />
        <div className={s.container__text}>
          <Text variant={"header-1"}>
          Вы попали на несуществующую страницу
          </Text>
          <Text variant={"body-3"}>
          Не беда, вы можете вернуться на <Link to={"/"}>главную страницу</Link> и продолжить свою работу
          </Text>
        </div>
      </Card>
    </AppLayout>
  );
};

export default Page404;
