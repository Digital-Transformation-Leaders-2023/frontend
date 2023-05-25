import { Tab } from "@shared";
import { Text } from "@gravity-ui/uikit";
import { ReportTable } from "@entities/report";

export const ReportMetadataTab = () => {
  return (
    <Tab>
      <Text>
        Тут будет мета-информация об отчете
      </Text>

      <ReportTable />
    </Tab>
  );
};
