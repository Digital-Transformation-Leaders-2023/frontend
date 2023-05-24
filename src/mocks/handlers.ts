import { rest } from "msw";
import { Report } from "@shared";
import { nanoid } from "nanoid";
import { faker } from "@faker-js/faker/locale/ru";

export const handlers = [
  rest.get<Report[]>("reports", (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json<Report[]>(
        Array.from({ length: 20 }, () => ({
          id: nanoid(),
          status: 200,
          offset: 0,
          count: 1,
          date: faker.date.past(),
          list: Array.from({ length: Math.floor(Math.random()  * (20 - 5) + 5) }, () => ({
            patient_gender: faker.person.sex(),
            date_of_patient_birth: faker.date.past({ years: 90 }),
            patient_id: faker.number.int({ max: 100 }),
            MKB_code: faker.location.zipCode(),
            diagnosis: faker.lorem.sentence(),
            date_of_service: faker.date.past(),
            job_title: faker.person.jobTitle(),
            appointment: faker.lorem.sentence(),
          })),
        })),
      ));
  }),

  rest.get<Report>("reports/:reportId", (req, res, ctx) => {
    const { reportId } = req.params;

    return res(
      ctx.status(200),
      ctx.json<Report>({
        id: reportId as string,
        status: 200,
        offset: 0,
        date: faker.date.past(),
        count: 1,
        list: Array.from({ length: Math.floor(Math.random()  * (20 - 5) + 5) }, () => ({
          patient_gender: faker.person.sex(),
          date_of_patient_birth: faker.date.past({ years: 90 }),
          patient_id: faker.number.int({ max: 100 }),
          MKB_code: faker.location.zipCode(),
          diagnosis: faker.lorem.sentence(),
          date_of_service: faker.date.past(),
          job_title: faker.person.jobTitle(),
          appointment: faker.lorem.sentence(),
        })),
      }),
    );
  }),
];
