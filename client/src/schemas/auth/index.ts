import { GlobalApiResponse } from "@/types";
import { z } from "zod";

const passwordSchema = z
  .string()
  .min(8, { message: "Password must be at least 8 characters long." }) // Minimum length validation
  .regex(/[a-zA-Z]/, { message: "Password must contain at least one letter." }) // Must contain at least one letter
  .regex(/\d/, { message: "Password must contain at least one number." }) // Must contain at least one number
  .regex(/[\W_]/, {
    message: "Password must contain at least one special character.",
  }); // Must contain at least one special character

// -- Login
export const postLoginReqSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email"),
  password: passwordSchema,
});

export type postLoginReqType = z.infer<typeof postLoginReqSchema>;
export type postLoginResType = GlobalApiResponse<{
  token: string;
  expires: number;
  expiresPrettyPrint: string;
}>;

// -- SIGNUP
export const postRegisterReqSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: passwordSchema,
});

export type postRegisterReqType = z.infer<typeof postRegisterReqSchema>;
export type postRegisterResType = GlobalApiResponse<{
  token: string;
  expires: number;
  expiresPrettyPrint: string;
}>;
