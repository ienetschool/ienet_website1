#!/bin/bash

echo "Creating EXACT SAME project with MySQL for production server..."

# Remove any previous deployment
rm -rf mysql-production-exact
mkdir -p mysql-production-exact

# Copy ENTIRE current project without any modifications
cp -r client mysql-production-exact/
cp -r server mysql-production-exact/
cp -r shared mysql-production-exact/
cp -r public mysql-production-exact/

# Copy all configuration files exactly as they are
cp package.json mysql-production-exact/
cp package-lock.json mysql-production-exact/
cp tsconfig.json mysql-production-exact/
cp tailwind.config.ts mysql-production-exact/
cp vite.config.ts mysql-production-exact/
cp postcss.config.js mysql-production-exact/
cp components.json mysql-production-exact/

# Create MySQL-specific db.ts for production
cat > mysql-production-exact/server/db.ts << 'EOF'
import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from "@shared/schema";

// MySQL configuration for production
const connectionConfig = {
  host: process.env.MYSQL_HOST || 'localhost',
  port: parseInt(process.env.MYSQL_PORT || '3306'),
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || '',
  database: process.env.MYSQL_DATABASE || 'ienet_production',
  charset: 'utf8mb4',
};

export const pool = mysql.createPool({
  ...connectionConfig,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export const db = drizzle(pool, { schema });

// Health check
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
EOF

# Create MySQL drizzle config for production
cat > mysql-production-exact/drizzle.config.ts << 'EOF'
import type { Config } from "drizzle-kit";

export default {
  schema: "./shared/schema.ts",
  out: "./drizzle",
  driver: "mysql2",
  dbCredentials: {
    host: process.env.MYSQL_HOST || "localhost",
    user: process.env.MYSQL_USER || "root",
    password: process.env.MYSQL_PASSWORD || "",
    database: process.env.MYSQL_DATABASE || "ienet_production",
    port: parseInt(process.env.MYSQL_PORT || "3306"),
  },
  verbose: true,
  strict: true,
} satisfies Config;
EOF

# Create environment file for production
cat > mysql-production-exact/.env.production << 'EOF'
NODE_ENV=production
PORT=5000
MYSQL_HOST=localhost
MYSQL_USER=ienet_user
MYSQL_PASSWORD=your_mysql_password
MYSQL_DATABASE=ienet_production
MYSQL_PORT=3306
SESSION_SECRET=your-production-secret-key
EOF

# Create MySQL database setup script
cat > mysql-production-exact/setup-database.sql << 'EOF'
-- Create database for IeNet production
CREATE DATABASE IF NOT EXISTS ienet_production CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Create user for the application
CREATE USER IF NOT EXISTS 'ienet_user'@'localhost' IDENTIFIED BY 'your_mysql_password';
CREATE USER IF NOT EXISTS 'ienet_user'@'%' IDENTIFIED BY 'your_mysql_password';

-- Grant permissions
GRANT ALL PRIVILEGES ON ienet_production.* TO 'ienet_user'@'localhost';
GRANT ALL PRIVILEGES ON ienet_production.* TO 'ienet_user'@'%';
FLUSH PRIVILEGES;

-- Use the database
USE ienet_production;

-- Show that database is ready
SELECT 'Database ienet_production is ready!' as status;
EOF

# Create installation and deployment script
cat > mysql-production-exact/deploy.sh << 'EOF'
#!/bin/bash

echo "Deploying IeNet with MySQL on production server..."

# Install dependencies
echo "Installing dependencies..."
npm install

# Setup MySQL database
echo "Setting up MySQL database..."
echo "Please run: mysql -u root -p < setup-database.sql"
echo "Or use your hosting panel to create database 'ienet_production'"

# Run database migrations
echo "Running database migrations..."
npm run db:push

# Build for production
echo "Building application..."
npm run build

echo "Deployment complete!"
echo "Start production server with: npm start"
echo "Make sure to update .env.production with your MySQL credentials"
EOF

chmod +x mysql-production-exact/deploy.sh

# Create the deployment package
cd mysql-production-exact
tar -czf ../ienet-mysql-production-exact.tar.gz .
cd ..

echo "✅ Created: ienet-mysql-production-exact.tar.gz"
echo "This is the EXACT SAME project configured for MySQL on production"
echo "File size: $(ls -lh ienet-mysql-production-exact.tar.gz | awk '{print $5}')"