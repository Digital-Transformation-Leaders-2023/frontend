import { useCallback } from "react";
import { Button, useFileInput } from "@gravity-ui/uikit";
import { Icon20DocumentPlusOutline } from "@vkontakte/icons";

export const UploadReportButton = () => {
  const onUpdate = useCallback((files: File[]) => console.log(files), []);
  const { controlProps, triggerProps } = useFileInput({ onUpdate });

  return (
    <>
      <input {...controlProps} />
      <Button {...triggerProps} view={"action"}>
          Загрузить отчет
        <Button.Icon>
          <Icon20DocumentPlusOutline />
        </Button.Icon>
      </Button>
    </>
  );
};
