import { GlobalApiResponse } from "@/types";
import { z } from "zod";

// -- POST
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
