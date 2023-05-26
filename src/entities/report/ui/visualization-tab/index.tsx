import { Tab } from "@shared";
import { useActiveReport } from "@entities/report";
import { Cell, Pie, PieChart, Tooltip } from "recharts";
import { useMemo } from "react";
import { Text } from "@gravity-ui/uikit";
import s from "./VisualizationTab.module.scss";

type ChartData = {
  name: string;
  value: number;
}

const COLORS = ["#d71109", "#e0b507", "#09a300"];

export const ReportVisualizationTab = () => {
  const { report } = useActiveReport();

  const chartData = useMemo<ChartData[]>(() => {
    return report?.list.reduce<ChartData[]>((acc, value) => {
      if (value.accuracy < 0.5) {
        acc = acc.map(v => {
          if (v.name === "Низкая точность") {
            v.value += 1;
          }

          return v;
        });
      }

      if (value.accuracy >= 0.5 && value.accuracy < 0.8) {
        acc = acc.map(v => {
          if (v.name === "Средняя точность") {
            v.value += 1;
          }

          return v;
        });
      }

      if (value.accuracy >= 0.8) {
        acc = acc.map(v => {
          if (v.name === "Высокая точность") {
            v.value += 1;
          }

          return v;
        });
      }

      return acc;
    }, [{
      name: "Низкая точность",
      value: 0,
    }, {
      name: "Средняя точность",
      value: 0,
    }, {
      name: "Высокая точность",
      value: 0,
    }]) ?? [];
  }, [report]);

  return (
    <Tab className={s.tab}>
      <PieChart height={250} width={300}>
        <Pie
          label
          cx="50%"
          cy="50%"
          data={chartData}
          dataKey="value"
          fill={"#5282ff"}
          isAnimationActive={false}
          labelLine={false}
          outerRadius={80}
        >
          {chartData.map((_, index) => (
            <Cell fill={COLORS[index % COLORS.length]} key={`cell-${index}`} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
      <Text>
        Соотношение точностей назначений в данном отчете
      </Text>
    </Tab>
  );
};
