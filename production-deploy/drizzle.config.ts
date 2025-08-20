import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./shared/schema.ts",
  out: "./drizzle",
  dialect: "mysql",
  dbCredentials: {
    host: "localhost",
    user: "ienet",
    password: "ienet2024", 
    database: "ienet_db",
    port: 3306,
  },
});