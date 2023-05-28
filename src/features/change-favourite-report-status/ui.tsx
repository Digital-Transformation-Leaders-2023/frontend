import { Button } from "@gravity-ui/uikit";
import { Icon28LikeCircleFillRed } from "@vkontakte/icons";
import { FC } from "react";
import { useActiveReport, useUpdateReportFavouriteStatusMutation } from "@entities/report";

export const ChangeFavouriteReportStatus: FC = () => {
  const { report } = useActiveReport();
  const [action] = useUpdateReportFavouriteStatusMutation();

  if (!report) {
    return null;
  }

  return (
    <>
      {
        report?.is_favorite && (
          <Button size={"l"} view={"flat-danger"} onClick={() => {
            action({ id: report?.id, is_favorite: false });
          }}>
            Удалить из избранного
          </Button>
        )
      }
      {
        !report?.is_favorite && (
          <Button size={"l"} view={"flat"} onClick={() => {
            action({ id: report?.id, is_favorite: true });
          }}>
            <Button.Icon>
              <Icon28LikeCircleFillRed height={20} width={20} />
            </Button.Icon>
            Добавить в избранное
          </Button>
        )
      }
    </>
  );
};
