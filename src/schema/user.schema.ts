import { z } from "zod";

export const userSchema = z.object({
  id: z.string({
    required_error: "id is required",
    invalid_type_error: "id must be a string",
  }),
  name: z.string({
    required_error: "name is required",
    invalid_type_error: "name must be a string",
  }),
  email: z.string().email(),
  role: z
    .union([z.literal("admin"), z.literal("user")])
    .refine((val) => val === "admin" || val === "user", {
      message: "role must be either 'admin' or 'user'",
    }),
  memberShips: z
    .union([z.literal("free"), z.literal("pro")])
    .refine((val) => val === "free" || val === "pro", {
      message: "membership must be either 'free' or 'pro'",
    }),
});
export const usersSchema = z.array(userSchema);
