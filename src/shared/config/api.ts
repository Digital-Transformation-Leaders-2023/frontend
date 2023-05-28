import axios from "axios";
import { ENV } from "@shared";

export const api = axios.create({
  baseURL: ENV.API_URL,
  timeout: 10000,
  headers: {
    common: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
  },
});
