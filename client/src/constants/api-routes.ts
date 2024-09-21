import { ENV } from "./static-env";

export const API_ROUTES = {
  LOGIN: ENV.BACKEND_BASE_URL + "/api/auth/login",
  REGISTER: ENV.BACKEND_BASE_URL + "/api/auth/register",
};

export const PAGE_ROUTES = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
  },
  HOME: "/",
};
