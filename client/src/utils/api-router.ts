import { localStorageClient } from "@/config/localstorage-client";
import { API_ROUTES } from "@/constants/api-routes";
import { postLoginResType, postRegisterResType } from "@/schemas/auth";

export const apiRouter = async <T extends keyof typeof API_TYPE_MAPPER>(
  _input: T,
  init?: RequestInit & {
    routeParam?: string; // only supports 1 route param, and it should be the last one
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    queryParams?: any; // only supports object of depth 1
  },
  options?: {
    skipAuthorization?: boolean;
    skipContentType?: boolean;
    skipCredentials?: boolean;
    skipBaseUrl?: boolean;
  }
) => {
  const headers = new Headers(init?.headers);

  // Check if code is running on the client (browser)
  if (typeof window !== "undefined") {
    const token = localStorageClient().getItem("USER_INFO")?.token;
    const timeZone =
      Intl.DateTimeFormat().resolvedOptions().timeZone || "Asia/Karachi";

    if (!options?.skipAuthorization && token) {
      headers.set("Authorization", `${token}`);
    }
    if (!options?.skipContentType) {
      headers.set("Content-Type", "application/json");
    }
    if (!options?.skipCredentials) {
      headers.set("credentials", "include");
    }

    if (timeZone) {
      headers.set("x-timezone", timeZone);
    }
  }

  let apiRouter: string = API_ROUTES[_input];
  if (init?.routeParam) {
    apiRouter = API_ROUTES[_input].replace(":id", init.routeParam);
  }
  if (init?.queryParams) {
    const params = new URLSearchParams(init?.queryParams);
    apiRouter += "?" + params;
  }

  const response = await fetch(apiRouter, {
    ...init,
    headers,
  });

  // handle 401 error
  if (response.status === 401) {
    localStorage.clear();
  }

  return response as Omit<Response, "json"> & {
    json: () => Promise<(typeof API_TYPE_MAPPER)[typeof _input]>;
  };
};

const API_MAPPER = {
  LOGIN: {} as postLoginResType,
  REGISTER: {} as postRegisterResType,
} as const;

// Utility type to check for missing keys
type EnsureAllKeys<T extends Record<keyof typeof API_ROUTES, unknown>> = T;

// Apply the utility type to enforce completeness
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const API_TYPE_MAPPER: EnsureAllKeys<typeof API_MAPPER> = API_MAPPER;
