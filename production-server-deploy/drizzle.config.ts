import type { Config } from "drizzle-kit";

export default {
  schema: "./shared/schema.ts",
  out: "./drizzle",
  driver: "mysql2",
  dbCredentials: {
    host: process.env.MYSQL_HOST || "5.181.218.15",
    user: process.env.MYSQL_USER || "netiedb",
    password: process.env.MYSQL_PASSWORD || "h5pLF9833",
    database: process.env.MYSQL_DATABASE || "ienetdb",
    port: parseInt(process.env.MYSQL_PORT || "3306"),
  },
  verbose: true,
  strict: true,
} satisfies Config;
