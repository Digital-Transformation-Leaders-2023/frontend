import { AppLayout } from "@widgets";
import { Helmet } from "react-helmet-async";
import { ReportCollection } from "@entities/report";
import { Text } from "@gravity-ui/uikit";
import { Icon28AllCategoriesOutline, Icon28LikeCircleFillRed } from "@vkontakte/icons";
import s from "./styles.module.scss";

const ReportsPage = () => {
  return (
    <>
      <Helmet>
        <title>Мои отчеты</title>
      </Helmet>
      <AppLayout>
        <Text variant={"header-2"}>
          <Icon28LikeCircleFillRed />
          Избранные отчеты
        </Text>
        <ReportCollection onlyFavorites />

        <br />
        <br />

        <Text variant={"header-2"}>
          <Icon28AllCategoriesOutline className={s.icon} />
          Все отчеты
        </Text>
        <ReportCollection />
      </AppLayout>
    </>
  );
};

export default ReportsPage;
