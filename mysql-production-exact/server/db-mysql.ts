import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from "@shared/schema";

// MySQL Connection Configuration for ienet.online
const connectionConfig = {
  host: process.env.DB_HOST || '5.181.218.15',
  port: parseInt(process.env.DB_PORT || '3306'),
  user: process.env.DB_USER || 'netiedb',
  password: process.env.DB_PASSWORD || 'h5pLF9833',
  database: process.env.DB_NAME || 'ienetdb',
  ssl: false, // Set to true for production SSL
  charset: 'utf8mb4',
};

// Create connection pool
export const pool = mysql.createPool({
  ...connectionConfig,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  acquireTimeout: 60000,
  reconnect: true,
});

// Initialize Drizzle with MySQL
export const db = drizzle(pool, { schema });

// Test connection function
export async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('✅ MySQL connection successful to 5.181.218.15:3306/ienetdb');
    const [rows] = await connection.execute('SELECT 1 as test');
    console.log('✅ Database query test passed');
    connection.release();
    return true;
  } catch (error) {
    console.error('❌ MySQL connection failed:', error.message);
    return false;
  }
}

// Database health check
export async function healthCheck() {
  try {
    const [rows] = await pool.execute('SHOW TABLES');
    console.log(`✅ Database health check passed - ${rows.length} tables found`);
    return { status: 'healthy', tables: rows.length };
  } catch (error) {
    console.error('❌ Database health check failed:', error.message);
    return { status: 'unhealthy', error: error.message };
  }
}
