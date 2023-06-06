import { rest } from "msw";
import { ApiAllReportsResponse, PatientAgeEnum, Report, CONST, getAge } from "@shared";
import { nanoid } from "nanoid";
import { faker } from "@faker-js/faker/locale/ru";

export const handlers = [
  rest.get<Report[]>("api/v1/report/get_all_files", (req, res, ctx) => {
    const take = +(req.url.searchParams.get("limit") ?? CONST.PAGINATION_LIMIT);
    const page = +(req.url.searchParams.get("skip") ?? 1);
    const is_favorite = req.url.searchParams.get("is_favorite") === "true";

    return res(
      ctx.status(200),
      ctx.json<ApiAllReportsResponse | any>(
        {
          ...(is_favorite ? {
            reports: Array.from({ length: 5 }, () => ({
              id: nanoid(),
              is_favorite: true,
              total: 100,
              date: {
                $date: faker.date.past(),
              },
              list: Array.from({ length: 100 }, () => ({
                patient_gender: faker.person.sex(),
                date_of_patient_birth: faker.date.past({ years: 90 }),
                patient_id: faker.number.int({ max: 100 }),
                MKB_code: faker.location.zipCode(),
                diagnosis: faker.lorem.sentence(),
                accuracy: faker.number.float({ min: 0, max: 1 }),
                date_of_service: faker.date.past().toLocaleDateString("ru-RU"),
                job_title: faker.person.jobTitle(),
                appointment: faker.lorem.sentence(),
              })),
            })).slice((page - 1) * take, page * take),
          } : {
            reports: Array.from({ length: 30 }, () => ({
              id: nanoid(),
              is_favorite: faker.datatype.boolean(),
              total: 100,
              date: {
                $date: faker.date.past(),
              },
              list: Array.from({ length: 100 }, () => ({
                patient_gender: faker.person.sex(),
                date_of_patient_birth: faker.date.past({ years: 90 }).toLocaleDateString("ru-RU"),
                patient_id: faker.number.int({ max: 100 }),
                MKB_code: faker.number.int({ min: 1, max: 100 }).toString(),
                diagnosis: faker.lorem.sentence(),
                accuracy: faker.number.float({ min: 0, max: 1 }),
                date_of_service: faker.date.past().toLocaleDateString("ru-RU"),
                job_title: faker.person.jobTitle(),
                appointment: faker.lorem.sentence(),
              })),
            })).slice((page - 1) * take, page * take),
          }),
          total_files: 30,
        },
      ));
  }),

  rest.get<Report>("api/v1/report/get_by_document_id/:reportId", (req, res, ctx) => {
    const { reportId } = req.params;
    const take = +(req.url.searchParams.get("limit") ?? 10);
    const page = +(req.url.searchParams.get("skip") ?? 1);

    const age = req.url.searchParams.get("age");
    const sex = req.url.searchParams.get("sex");
    const mkb_code = req.url.searchParams.get("mkb_code");

    const filter: Partial<Report["list"][0]> = Object.freeze({
      ...(sex && { patient_gender: sex }),
      ...(mkb_code && { MKB_code: mkb_code }),
      ...(age && { age: age.split(",") }),
    });

    return res(
      ctx.status(200),
      ctx.json<Report | any>({
        id: reportId as string,
        date: {
          $date: faker.date.past(),
        },
        is_favorite: faker.datatype.boolean(),
        total: 100,
        list: Array.from({ length: 100 }, () => ({
          patient_gender: faker.person.sex(),
          date_of_patient_birth: faker.date.past({ years: 90 }).toLocaleDateString("ru-RU"),
          patient_id: faker.number.int({ max: 100 }),
          MKB_code: faker.number.int({ min: 1, max: 100 }).toString(),
          accuracy: faker.number.float({ min: 0, max: 1 }),
          diagnosis: faker.lorem.sentence(),
          date_of_service: faker.date.past().toLocaleDateString("ru-RU"),
          job_title: faker.person.jobTitle(),
          appointment: faker.lorem.sentence(),
        }))
          .slice((page - 1) * take, page * take)
          .filter((item) => {
            const isUserInAgeBoundaries = (age: number): boolean => {
              const patientAge = age;
              const values = [];

              // @ts-ignore
              for (const filterAge of filter.age) {
                switch (filterAge) {
                  case PatientAgeEnum.Young:
                    values.push(patientAge <= 18);
                    break;
                  case PatientAgeEnum.Mature:
                    values.push(patientAge > 18 && patientAge < 45);
                    break;
                  case PatientAgeEnum.Old:
                    values.push(patientAge >= 45);
                    break;
                }
              }

              return values.includes(true);
            };

            for (const key in filter) {
              if (key === "age" && !isUserInAgeBoundaries(getAge(item.date_of_patient_birth)))
                return false;

              // @ts-ignore
              if (key !== "age" && (item[key] === undefined || item[key] !== filter[key]))
                return false;
            }

            return true;
          }),
      }),
    );
  }),
];
