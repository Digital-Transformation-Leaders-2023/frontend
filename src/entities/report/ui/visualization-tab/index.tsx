import { getAge, MetricsEnum, Tab } from "@shared";
import {
  useAccuracyStatsQuery,
  useActiveReport,
  useSexStatsQuery,
} from "@entities/report";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useMemo } from "react";
import { Text } from "@gravity-ui/uikit";
import s from "./VisualizationTab.module.scss";
import { isMobile } from "react-device-detect";

type PieChartData = {
  name: string;
  value: number;
}

const COLORS = ["#d71109", "#e0b507", "#09a300"];

export const ReportVisualizationTab = () => {
  const { report } = useActiveReport();

  const { data: sexData } = useSexStatsQuery(report?.id ?? "", {
    skip: !report?.id,
  });
  const { data: accuracyData } = useAccuracyStatsQuery(report?.id ?? "", {
    skip: !report?.id,
  });

  const accuracyChartData = useMemo<PieChartData[]>(() => {
    return accuracyData?.reduce<PieChartData[]>((acc, value) => {
      if (value <= MetricsEnum.Medium) {
        acc = acc.map(v => {
          if (v.name === "Низкая точность") {
            v.value += 1;
          }

          return v;
        });
      }

      if (value > MetricsEnum.Medium && value <= MetricsEnum.High) {
        acc = acc.map(v => {
          if (v.name === "Средняя точность") {
            v.value += 1;
          }

          return v;
        });
      }

      if (value > MetricsEnum.High) {
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
  }, [accuracyData]);

  const sexChartData = useMemo(() => {
    return sexData?.reduce((acc, value) => {
      const age = getAge(value.age);
      const sex = value.sex;

      if (age < 18) {
        const node = acc.find((a: any) => a.ageGroup === "0 - 18");

        sex === "Муж" ?
          node.males += 1 :
          node.females += 1;
      }

      if (age >= 18 && age < 45) {
        const node = acc.find((a: any) => a.ageGroup === "18 - 45");

        sex === "Муж" ?
          node.males += 1 :
          node.females += 1;
      }

      if (age > 45) {
        const node = acc.find((a: any) => a.ageGroup === "45+");

        sex === "Муж" ?
          node.males += 1 :
          node.females += 1;
      }

      return acc;
    }, [
      {
        ageGroup: "0 - 18",
        males: 0,
        females: 0,
      },
      {
        ageGroup: "18 - 45",
        males: 0,
        females: 0,
      },
      {
        ageGroup: "45+",
        males: 0,
        females: 0,
      },
    ]);
  }, [sexData]);

  return (
    <Tab className={s.tab}>
      <>
        <PieChart height={250} width={300}>
          <Pie
            label
            cx="50%"
            cy="50%"
            data={accuracyChartData}
            dataKey="value"
            fill={"#5282ff"}
            isAnimationActive={false}
            labelLine={false}
            outerRadius={80}
          >
            {accuracyChartData.map((_, index) => (
              <Cell fill={COLORS[index % COLORS.length]} key={`cell-${index}`} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
        <Text>
          Соотношение точностей назначений в данном отчете
        </Text>
      </>

      <br />
      <br />
      <br />
      <br />

      <>
        <BarChart
          data={sexChartData}
          height={250}
          width={isMobile ? 250 : 400}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="ageGroup" />
          <YAxis />
          <Legend />
          <Bar dataKey="males" fill={"#1382ff"} label={"Мужчины"} />
          <Bar dataKey="females" fill={"#ff1399"} label={"Женщины"} />
        </BarChart>
        <Text>
          Соотношение пола и возраста пациентов
        </Text>
      </>
    </Tab>
  );
};
