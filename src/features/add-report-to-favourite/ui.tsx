import { Button } from "@gravity-ui/uikit";
import { Icon28LikeCircleFillRed } from "@vkontakte/icons";

export const AddReportToFavourite = () => {
  return (
    <Button size={"l"} view={"flat"}>
      <Button.Icon>
        <Icon28LikeCircleFillRed height={20} width={20} />
      </Button.Icon>
      Добавить в избранное
    </Button>
  );
};
