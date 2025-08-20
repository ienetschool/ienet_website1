import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from "@shared/schema";

// MySQL Production Configuration
const connectionConfig = {
  host: process.env.MYSQL_HOST || '5.181.218.15',
  port: parseInt(process.env.MYSQL_PORT || '3306'),
  user: process.env.MYSQL_USER || 'netiedb',
  password: process.env.MYSQL_PASSWORD || 'h5pLF9833',
  database: process.env.MYSQL_DATABASE || 'ienetdb',
  charset: 'utf8mb4',
};

export const pool = mysql.createPool({
  ...connectionConfig,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export const db = drizzle(pool, { schema });

// Health check function
export async function healthCheck() {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute('SELECT 1 as test');
    connection.release();
    return { status: 'healthy', database: connectionConfig.database };
  } catch (error) {
    return { status: 'unhealthy', error: (error as Error).message };
  }
}
