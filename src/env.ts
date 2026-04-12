import { createEnv } from "@t3-oss/env-nextjs";
import * as z from "zod";

export const env = createEnv({
  server: {
    BASE_URL: z.url(),
  },
  client: {},
  runtimeEnv: {
    BASE_URL: process.env.BASE_URL,
  },
});
