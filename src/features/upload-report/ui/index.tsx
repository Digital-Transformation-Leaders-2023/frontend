import { useCallback } from "react";
import { Button, useFileInput, Text, Label, useToaster } from "@gravity-ui/uikit";
import { Icon20DocumentPlusOutline } from "@vkontakte/icons";
import s from "./UploadReport.module.scss";
import { AxiosError } from "axios";
import { api } from "@shared";
import { useNavigate } from "react-router-dom";

export const UploadReportButton = () => {
  const { add } = useToaster();
  const navigate = useNavigate();

  const onUpdate = useCallback(async (files: File[]) => {
    const [fileEntry] = files;

    const formData = new FormData();
    formData.append("file", fileEntry);

    try {
      const { data, status } = await api.post("api/v1/report/upload_file", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const { filename } = JSON.parse(data);

      switch (status) {
        case 200:
          add({
            name: "Успешная загрузка",
            title: "Файл был успешно загружен",
            type: "success",
          });
          setTimeout(() => {
            navigate(`/reports/${filename}`);
          }, 3000);
          break;
        default:
          throw new Error("Ошибка запроса");
      }
    } catch (e) {
      const err = e as AxiosError;
      add({
        name: "Ошибка",
        title: err?.cause?.message ?? "Произошла ошибка при загрузке отчета",
        type: "error",
      });
    }
  }, []);
  const { controlProps, triggerProps } = useFileInput({ onUpdate });

  return (
    <section className={s.wrapper}>
      <div className={s.wrapper__input}>
        <input {...controlProps}
          accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />
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
