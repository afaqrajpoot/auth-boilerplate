import { ZodError } from "zod";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type GlobalApiResponse<T = any> = {
  success: boolean;
  message: string;
  data?: T;
  statusCode: number;
};

export type GlobalErrorResType = {
  success: false;
  data: {
    message:
      | string
      | null
      | ZodError<{
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          [x: string]: any;
        }>;
  };
};

export type METHODS = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

// remove undefined from object
export type RemoveUndefined<T> = {
  [P in keyof T]: Exclude<T[P], undefined>;
};
