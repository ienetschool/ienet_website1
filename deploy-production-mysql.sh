#!/bin/bash

echo "🚀 Deploying IeNet Production Server with MySQL..."

# Remove previous deployment
rm -rf production-mysql-deploy
mkdir -p production-mysql-deploy

# Copy entire current project
echo "📦 Copying project files..."
cp -r client production-mysql-deploy/
cp -r server production-mysql-deploy/
cp -r shared production-mysql-deploy/
cp -r public production-mysql-deploy/

# Copy configuration files
cp package.json production-mysql-deploy/
cp package-lock.json production-mysql-deploy/
cp tsconfig.json production-mysql-deploy/
cp tailwind.config.ts production-mysql-deploy/
cp vite.config.ts production-mysql-deploy/
cp postcss.config.js production-mysql-deploy/
cp components.json production-mysql-deploy/

# Create production server.js for MySQL
cp production-server.js production-mysql-deploy/server.js

# Create MySQL database configuration
cat > production-mysql-deploy/server/db.ts << 'EOF'
import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from "@shared/schema";

// MySQL Production Configuration
const connectionConfig = {
  host: process.env.MYSQL_HOST || 'localhost',
  port: parseInt(process.env.MYSQL_PORT || '3306'),
  user: process.env.MYSQL_USER || 'ienet_user',
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
EOF

# Create MySQL drizzle config
cat > production-mysql-deploy/drizzle.config.ts << 'EOF'
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
EOF

# Create production environment
cat > production-mysql-deploy/.env.production << 'EOF'
NODE_ENV=production
PORT=5000

# MySQL Database Configuration
MYSQL_HOST=localhost
MYSQL_USER=ienet_user
MYSQL_PASSWORD=your_mysql_password_here
MYSQL_DATABASE=ienet_production
MYSQL_PORT=3306

# Session Configuration
SESSION_SECRET=your-super-secret-session-key-change-this

# Application Settings
REPLIT_DOMAIN=your-domain.com
EOF

# Create MySQL database setup
cat > production-mysql-deploy/setup-mysql-database.sql << 'EOF'
-- IeNet Production Database Setup
CREATE DATABASE IF NOT EXISTS ienet_production 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

-- Create application user
CREATE USER IF NOT EXISTS 'ienet_user'@'localhost' IDENTIFIED BY 'your_mysql_password_here';
CREATE USER IF NOT EXISTS 'ienet_user'@'%' IDENTIFIED BY 'your_mysql_password_here';

-- Grant permissions
GRANT ALL PRIVILEGES ON ienet_production.* TO 'ienet_user'@'localhost';
GRANT ALL PRIVILEGES ON ienet_production.* TO 'ienet_user'@'%';
FLUSH PRIVILEGES;

-- Use database
USE ienet_production;

-- Verify setup
SELECT 'MySQL Database Setup Complete!' as status;
SHOW TABLES;
EOF

# Create deployment script
cat > production-mysql-deploy/deploy.sh << 'EOF'
#!/bin/bash

echo "🚀 Deploying IeNet with MySQL Production Database"

# Check if MySQL is available
if ! command -v mysql &> /dev/null; then
    echo "❌ MySQL not found. Please install MySQL first."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Setup environment
if [ ! -f .env.production ]; then
    echo "⚠️  Please configure .env.production with your MySQL credentials"
    echo "📋 Example configuration provided in .env.production"
fi

# Setup database
echo "🗄️  Setting up MySQL database..."
echo "Please run: mysql -u root -p < setup-mysql-database.sql"
echo "Or use your hosting control panel to execute the SQL commands"

# Push database schema
echo "📊 Pushing database schema..."
npm run db:push

# Build application
echo "🔨 Building application for production..."
npm run build

# Test database connection
echo "🔍 Testing database connection..."
node -e "
const mysql = require('mysql2/promise');
async function test() {
  try {
    const pool = mysql.createPool({
      host: process.env.MYSQL_HOST || 'localhost',
      user: process.env.MYSQL_USER || 'ienet_user',
      password: process.env.MYSQL_PASSWORD || '',
      database: process.env.MYSQL_DATABASE || 'ienet_production',
      port: process.env.MYSQL_PORT || 3306
    });
    const conn = await pool.getConnection();
    await conn.execute('SELECT 1');
    conn.release();
    console.log('✅ Database connection successful');
    process.exit(0);
  } catch (error) {
    console.log('❌ Database connection failed:', error.message);
    process.exit(1);
  }
}
test();
"

echo ""
echo "✅ Deployment complete!"
echo "🚀 Start server with: npm start"
echo "🌐 Your site will be available on port 5000"
echo "🔍 Health check: http://your-domain:5000/api/health"
echo "🐛 Debug info: http://your-domain:5000/api/debug"
EOF

chmod +x production-mysql-deploy/deploy.sh

# Update package.json for production
cat > production-mysql-deploy/package.json << 'EOF'
{
  "name": "ienet-production",
  "version": "1.0.0",
  "description": "IeNet Production Server with MySQL",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "build": "npm run build:client && npm run build:server",
    "build:client": "vite build client",
    "build:server": "tsx build server/index.ts",
    "db:push": "drizzle-kit push:mysql",
    "db:studio": "drizzle-kit studio",
    "dev": "tsx server/index.ts"
  },
  "dependencies": {
    "express": "^4.18.2",
    "mysql2": "^3.6.0",
    "drizzle-orm": "^0.28.6",
    "drizzle-kit": "^0.19.13"
  }
}
EOF

# Create archive
cd production-mysql-deploy
tar -czf ../ienet-production-mysql-complete.tar.gz .
cd ..

echo ""
echo "✅ Production MySQL deployment package created!"
echo "📦 Package: ienet-production-mysql-complete.tar.gz"
echo "📊 Size: $(ls -lh ienet-production-mysql-complete.tar.gz | awk '{print $5}')"
echo ""
echo "🚀 Upload this package to your production server and run:"
echo "   1. tar -xzf ienet-production-mysql-complete.tar.gz"
echo "   2. ./deploy.sh"
echo "   3. npm start"