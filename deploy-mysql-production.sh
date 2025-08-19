#!/bin/bash

# Single-Click MySQL Production Deployment Script
# For ienet.online domain with MySQL database

echo "🚀 Starting MySQL Production Deployment for ienet.online..."
echo "📊 Database: MySQL/MariaDB (5.181.218.15:3306)"
echo "🌐 Domain: ienet.online"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Database Configuration
DB_HOST="5.181.218.15"
DB_PORT="3306"
DB_NAME="ienetdb"
DB_USER="netiedb"
DB_PASSWORD="h5pLF9833"
DOMAIN="ienet.online"

echo -e "${YELLOW}Step 1: Installing MySQL dependencies...${NC}"
npm install mysql2 drizzle-orm@latest drizzle-kit@latest

echo -e "${YELLOW}Step 2: Creating MySQL Drizzle configuration...${NC}"
cat > drizzle.config.ts << EOF
import type { Config } from "drizzle-kit";

export default {
  schema: "./shared/schema.ts",
  out: "./drizzle",
  driver: "mysql2",
  dbCredentials: {
    host: "${DB_HOST}",
    user: "${DB_USER}",
    password: "${DB_PASSWORD}",
    database: "${DB_NAME}",
    port: ${DB_PORT},
  },
  verbose: true,
  strict: true,
} satisfies Config;
EOF

echo -e "${YELLOW}Step 3: Updating database connection for MySQL...${NC}"
cat > server/db-mysql.ts << EOF
import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from "@shared/schema";

// MySQL Connection Configuration for ienet.online
const connectionConfig = {
  host: process.env.DB_HOST || '${DB_HOST}',
  port: parseInt(process.env.DB_PORT || '${DB_PORT}'),
  user: process.env.DB_USER || '${DB_USER}',
  password: process.env.DB_PASSWORD || '${DB_PASSWORD}',
  database: process.env.DB_NAME || '${DB_NAME}',
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
    console.log('✅ MySQL connection successful to ${DB_HOST}:${DB_PORT}/${DB_NAME}');
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
    console.log(\`✅ Database health check passed - \${rows.length} tables found\`);
    return { status: 'healthy', tables: rows.length };
  } catch (error) {
    console.error('❌ Database health check failed:', error.message);
    return { status: 'unhealthy', error: error.message };
  }
}
EOF

echo -e "${YELLOW}Step 4: Creating MySQL connection test script...${NC}"
cat > test-mysql-connection.js << EOF
import { testConnection, healthCheck } from './server/db-mysql.js';

async function main() {
  console.log('🔍 Testing MySQL connection to ienet.online database...');
  console.log('📊 Host: ${DB_HOST}:${DB_PORT}');
  console.log('🗄️  Database: ${DB_NAME}');
  console.log('👤 User: ${DB_USER}');
  
  const connectionTest = await testConnection();
  if (connectionTest) {
    console.log('✅ Connection test passed');
    
    const health = await healthCheck();
    console.log('📊 Health status:', health);
    
    process.exit(0);
  } else {
    console.log('❌ Connection test failed');
    process.exit(1);
  }
}

main().catch(console.error);
EOF

echo -e "${YELLOW}Step 5: Testing MySQL connection...${NC}"
if node test-mysql-connection.js; then
  echo -e "${GREEN}✅ MySQL connection successful!${NC}"
else
  echo -e "${RED}❌ MySQL connection failed. Please check your database credentials.${NC}"
  exit 1
fi

echo -e "${YELLOW}Step 6: Creating backup import instructions...${NC}"
cat > MYSQL_IMPORT_INSTRUCTIONS.md << EOF
# MySQL Database Import Instructions for ienet.online

## Database Details
- **Host:** ${DB_HOST}:${DB_PORT}
- **Database:** ${DB_NAME}
- **Username:** ${DB_USER}
- **Password:** ${DB_PASSWORD}

## Import Steps

### 1. Import Complete Backup
\`\`\`bash
mysql -h ${DB_HOST} -u ${DB_USER} -p${DB_PASSWORD} ${DB_NAME} < ienet-mysql-backup-complete.sql
\`\`\`

### 2. Verify Import
\`\`\`bash
mysql -h ${DB_HOST} -u ${DB_USER} -p${DB_PASSWORD} ${DB_NAME} -e "SHOW TABLES;"
mysql -h ${DB_HOST} -u ${DB_USER} -p${DB_PASSWORD} ${DB_NAME} -e "SELECT COUNT(*) FROM service_categories;"
\`\`\`

### 3. Test Application Connection
\`\`\`bash
node test-mysql-connection.js
\`\`\`

## Environment Variables for Production
\`\`\`
DATABASE_URL=mysql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}
DB_HOST=${DB_HOST}
DB_PORT=${DB_PORT}
DB_NAME=${DB_NAME}
DB_USER=${DB_USER}
DB_PASSWORD=${DB_PASSWORD}
DOMAIN=${DOMAIN}
NODE_ENV=production
\`\`\`

## Files Created
- \`ienet-mysql-backup-complete.sql\` - Complete MySQL database backup
- \`drizzle.config.ts\` - MySQL Drizzle configuration
- \`server/db-mysql.ts\` - MySQL database connection
- \`test-mysql-connection.js\` - Connection test script

## Deployment Complete ✅
Your application is now configured for MySQL production deployment on ${DOMAIN}
EOF

echo -e "${GREEN}🎉 MySQL Production Setup Complete!${NC}"
echo -e "${GREEN}📋 Files created:${NC}"
echo "   - ienet-mysql-backup-complete.sql (MySQL database backup)"
echo "   - drizzle.config.ts (MySQL Drizzle configuration)"
echo "   - server/db-mysql.ts (MySQL connection)"
echo "   - test-mysql-connection.js (Connection test)"
echo "   - MYSQL_IMPORT_INSTRUCTIONS.md (Import guide)"
echo ""
echo -e "${YELLOW}📚 Next Steps:${NC}"
echo "1. Import the MySQL backup to your database"
echo "2. Update your application to use server/db-mysql.ts"
echo "3. Set environment variables for production"
echo "4. Deploy to ienet.online"
echo ""
echo -e "${GREEN}🌐 Ready for deployment to: https://${DOMAIN}${NC}"