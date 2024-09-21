import { GlobalApiResponse } from "@/types";
import { z } from "zod";

// -- Login
export const postLoginReqSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email"),
  password: z.string().min(1, "Password is required").min(7, "Too short"),
});

export type postLoginReqType = z.infer<typeof postLoginReqSchema>;
export type postLoginResType = GlobalApiResponse<{
  token: string;
  expires: number;
  expiresPrettyPrint: string;
}>;

// -- POST
export const postRegisterReqSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
});

export type postRegisterReqType = z.infer<typeof postRegisterReqSchema>;
export type postRegisterResType = GlobalApiResponse<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  z.infer<any>
>;
