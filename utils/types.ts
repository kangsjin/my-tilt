import { z } from "zod";

export const User = z.object({
  name: z.string(),
  email: z.string().email(),
});
