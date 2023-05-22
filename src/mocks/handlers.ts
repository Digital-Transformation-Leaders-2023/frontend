import { rest } from "msw";
import { Report } from "@shared";
import { nanoid } from "nanoid";
import { faker } from "@faker-js/faker/locale/ru";

export const handlers = [
  rest.get<Report[]>("/reports", (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json<Report[]>(
        Array.from({ length: 20 }, () => ({
          id: nanoid(),
          status: 200,
          offset: 0,
          count: 1,
          date: faker.date.past(),
          diagnoses: Array.from({ length: Math.floor(Math.random()  * (20 - 5) + 5) }, () => ({
            diagnosis: faker.lorem.sentence(),
            doctor: faker.person.fullName(),
            accuracy: faker.number.float({ min: 0, max: 1, precision: 0.01 }),
            recommendation: faker.lorem.sentence(),
            date: faker.date.past(),
          })),
        })),
      ));
  }),

  rest.get<Report>("/reports/:reportId", (req, res, ctx) => {
    const { reportId } = req.params;

    return res(
      ctx.status(200),
      ctx.json<Report>({
        id: reportId as string,
        status: 200,
        offset: 0,
        date: faker.date.past(),
        count: 1,
        diagnoses: Array.from({ length: Math.floor(Math.random()  * (20 - 5) + 5) }, () => ({
          diagnosis: faker.lorem.sentence(),
          doctor: faker.person.fullName(),
          accuracy: faker.number.float({ min: 0, max: 1, precision: 0.01 }),
          recommendation: faker.lorem.sentence(),
          date: faker.date.past(),
        })),
      }),
    );
  }),
];
