import type { Config } from "drizzle-kit";

export default {
  schema: "./shared/schema.ts",
  out: "./drizzle",
  driver: "mysql2",
  dbCredentials: {
    host: process.env.MYSQL_HOST || "localhost",
    user: process.env.MYSQL_USER || "ienet_user",
    password: process.env.MYSQL_PASSWORD || "",
    database: process.env.MYSQL_DATABASE || "ienet_production",
    port: parseInt(process.env.MYSQL_PORT || "3306"),
  },
  verbose: true,
  strict: true,
} satisfies Config;
