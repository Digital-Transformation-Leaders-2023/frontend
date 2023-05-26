import { useCallback } from "react";
import { Button, useFileInput, Text, Label } from "@gravity-ui/uikit";
import { Icon20DocumentPlusOutline } from "@vkontakte/icons";
import s from "./UploadReport.module.scss";

export const UploadReportButton = () => {
  const onUpdate = useCallback((files: File[]) => console.log(files), []);
  const { controlProps, triggerProps } = useFileInput({ onUpdate });

  return (
    <section className={s.wrapper}>
      <div className={s.wrapper__input}>
        <input {...controlProps} />
        <Button {...triggerProps} size={"l"} view={"action"}>
          Загрузить протоколы
          <Button.Icon>
            <Icon20DocumentPlusOutline />
          </Button.Icon>
        </Button>
      </div>
      <Text>
       Поддерживается только формат <Label theme={"success"}>xlsx</Label>
      </Text>
    </section>
  );
};
