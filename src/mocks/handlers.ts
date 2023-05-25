import { rest } from "msw";
import { ApiAllReportsResponse, Report } from "@shared";
import { nanoid } from "nanoid";
import { faker } from "@faker-js/faker/locale/ru";
import { CONST } from "@shared/config/const.ts";

export const handlers = [
  rest.get<Report[]>("reports", (req, res, ctx) => {
    const take = +(req.url.searchParams.get("limit") ?? CONST.PAGINATION_LIMIT);
    const page = +(req.url.searchParams.get("skip") ?? 1);

    return res(
      ctx.status(200),
      ctx.json<ApiAllReportsResponse>(
        {
          reports: Array.from({ length: 30 }, () => ({
            id: nanoid(),
            is_favorite: faker.datatype.boolean(),
            total: 100,
            date: faker.date.past(),
            list: Array.from({ length: 100 }, () => ({
              patient_gender: faker.person.sex(),
              date_of_patient_birth: faker.date.past({ years: 90 }),
              patient_id: faker.number.int({ max: 100 }),
              MKB_code: faker.location.zipCode(),
              diagnosis: faker.lorem.sentence(),
              accuracy: faker.number.float({ min: 0, max: 1 }),
              date_of_service: faker.date.past(),
              job_title: faker.person.jobTitle(),
              appointment: faker.lorem.sentence(),
            })),
          })).slice((page - 1) * take, page * take),
          total_files: 30,
        },
      ));
  }),

  rest.get<Report>("reports/:reportId", (req, res, ctx) => {
    const { reportId } = req.params;
    const take = +(req.url.searchParams.get("limit") ?? 10);
    const page = +(req.url.searchParams.get("skip") ?? 1);

    return res(
      ctx.status(200),
      ctx.json<Report>({
        id: reportId as string,
        date: faker.date.past(),
        is_favorite: faker.datatype.boolean(),
        total: 100,
        list: Array.from({ length: 100 }, () => ({
          patient_gender: faker.person.sex(),
          date_of_patient_birth: faker.date.past({ years: 90 }),
          patient_id: faker.number.int({ max: 100 }),
          MKB_code: faker.location.zipCode(),
          accuracy: faker.number.float({ min: 0, max: 1 }),
          diagnosis: faker.lorem.sentence(),
          date_of_service: faker.date.past(),
          job_title: faker.person.jobTitle(),
          appointment: faker.lorem.sentence(),
        })).slice((page - 1) * take, page * take),
      }),
    );
  }),
];
