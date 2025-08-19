import type { Config } from "drizzle-kit";

export default {
  schema: "./shared/schema.ts",
  out: "./drizzle",
  driver: "mysql2",
  dbCredentials: {
    host: "5.181.218.15",
    user: "netiedb",
    password: "h5pLF9833",
    database: "ienetdb",
    port: 3306,
  },
  verbose: true,
  strict: true,
} satisfies Config;
