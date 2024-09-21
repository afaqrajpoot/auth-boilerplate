import { ENV } from "./ENV";

export const API_ROUTES = {
  LOGIN: ENV.BACKEND_BASE_URL + "/api/auth/login",
  REGISTER: ENV.BACKEND_BASE_URL + "/api/auth/register",
};
