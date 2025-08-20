import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from "@shared/schema";

// MySQL connection configuration
const connection = mysql.createPool({
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || '',
  database: process.env.MYSQL_DATABASE || 'ienet_production',
  port: parseInt(process.env.MYSQL_PORT || '3306'),
  connectionLimit: 10,
});

export const db = drizzle(connection, { schema });
export { connection as pool };
