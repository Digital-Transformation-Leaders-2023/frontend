import { Card, Text } from "@gravity-ui/uikit";
import { Report } from "@shared";
import { FC } from "react";
import { Link } from "react-router-dom";
import s from "./ReportCard.module.scss";
import { Icon24CalendarOutline, Icon24ListNumberOutline } from "@vkontakte/icons";

type ReportCardProps = {
  data: Report;
}

export const ReportCard: FC<ReportCardProps> = (props) => {
  const { data } = props;

  return (
    <Link className={s.container} to={`/reports/${data.id}`}>
      <Card className={s.card}>
        <Text className={s.card__header} variant={"subheader-1"}>
          #{data.id}
        </Text>
        <section className={s.card__meta}>
          <span className={s.card__part}>
            <span className={s.icon}>
              <Icon24CalendarOutline />
            </span>
            {
              new Date(data.date)?.toLocaleDateString("ru-RU", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })
            }
          </span>

          <span className={s.card__part}>
            <span className={s.icon}>
              <Icon24ListNumberOutline />
            </span>
            В данном отчете {data.diagnoses.length} консультаций
          </span>
        </section>
      </Card>
    </Link>
  );
};
