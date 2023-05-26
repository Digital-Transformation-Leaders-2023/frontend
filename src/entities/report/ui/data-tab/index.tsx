import { Tab } from "@shared";
import { Label, Text } from "@gravity-ui/uikit";
import { ReportTable } from "@entities/report";
import { numericWord } from "@shared/lib";
import { useActiveReport } from "@entities/report";

export const ReportDataTab = () => {
  const { report: data } = useActiveReport();

  return (
    <Tab>
      <ul>
        <li>
          <Text>
            Отчет был загружен в систему&nbsp;
            <Label>
              {new Date(data?.date || 0).toLocaleDateString("ru-RU")}
            </Label>
          </Text>
        </li>
        <li>
          <Text>
            В отчете&nbsp;<Label>{data?.total}</Label> {numericWord(data?.total || 0, ["запись", "записи", "записей"])}
          </Text>
        </li>
      </ul>

      <ReportTable data={data} />
    </Tab>
  );
};
