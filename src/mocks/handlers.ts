import { rest } from "msw";
import { Report } from "@shared";

export const handlers = [
  rest.get<Report>("/reports/:reportId", (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json<Report>({
        status: 200,
        offset: 0,
        count: 1,
        diagnoses: [
          {
            diagnosis: "Хронический синусит неуточненный",
            doctor: "Dr. John Doe",
            accuracy: 0.9,
            recommendation: "Рентгенография околоносовых пазух",
            date: new Date(),
          },
          {
            diagnosis: "Вазомоторный ринит",
            doctor: "Dr. Alex Smith",
            accuracy: 0.8,
            recommendation: "Рентгенография околоносовых пазух",
            date: new Date(),
          },
          {
            diagnosis: "Хронический ринит",
            doctor: "Dr. Jack Black",
            accuracy: 0.7,
            recommendation: "Рентгенография пояснично-крестцового отдела позвоночника",
            date: new Date(),
          },
        ],
      }),
    );
  }),
];
