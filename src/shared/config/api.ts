import { Axios } from "axios";
import { ENV } from "@shared";

export const api = new Axios({
  baseURL: ENV.API_URL,
  timeout: 10000,
});
