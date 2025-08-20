#!/bin/bash

echo "🚀 Deploying IeNet to Production Server: ienet.online"
echo "Server: 5.181.218.15"
echo "Path: /var/www/vhosts/vivaindia.com/ienet.online"
echo ""

# Production server credentials
SERVER_IP="5.181.218.15"
SERVER_USER="root"
SERVER_PASS="&8KXC4D+Ojfhuu0LSMhE"
DEPLOY_PATH="/var/www/vhosts/vivaindia.com/ienet.online"

# Database credentials
DB_HOST="5.181.218.15"
DB_USER="netiedb"
DB_PASS="h5pLF9833"
DB_NAME="ienetdb"

echo "📦 Creating production deployment package..."

# Remove previous deployment
rm -rf production-server-deploy
mkdir -p production-server-deploy

# Copy entire current project
cp -r client production-server-deploy/
cp -r server production-server-deploy/
cp -r shared production-server-deploy/
cp -r public production-server-deploy/

# Copy configuration files
cp package.json production-server-deploy/
cp package-lock.json production-server-deploy/
cp tsconfig.json production-server-deploy/
cp tailwind.config.ts production-server-deploy/
cp vite.config.ts production-server-deploy/
cp postcss.config.js production-server-deploy/
cp components.json production-server-deploy/

# Create MySQL-specific database configuration
cat > production-server-deploy/server/db.ts << 'EOF'
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
EOF

# Create production drizzle config
cat > production-server-deploy/drizzle.config.ts << 'EOF'
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
EOF

# Create production environment file
cat > production-server-deploy/.env.production << EOF
NODE_ENV=production
PORT=5000

# MySQL Database Configuration
MYSQL_HOST=5.181.218.15
MYSQL_USER=netiedb
MYSQL_PASSWORD=h5pLF9833
MYSQL_DATABASE=ienetdb
MYSQL_PORT=3306

# Session Configuration
SESSION_SECRET=ienet-production-secret-2025

# Domain Configuration
REPLIT_DOMAIN=ienet.online
EOF

# Create server startup script
cat > production-server-deploy/server.js << 'EOF'
const express = require('express');
const path = require('path');
const mysql = require('mysql2/promise');

const app = express();
const PORT = process.env.PORT || 5000;

// MySQL Configuration
const dbConfig = {
  host: process.env.MYSQL_HOST || '5.181.218.15',
  user: process.env.MYSQL_USER || 'netiedb',
  password: process.env.MYSQL_PASSWORD || 'h5pLF9833',
  database: process.env.MYSQL_DATABASE || 'ienetdb',
  port: process.env.MYSQL_PORT || 3306,
  charset: 'utf8mb4',
};

let pool;

// Initialize database
async function initDatabase() {
  try {
    pool = mysql.createPool({
      ...dbConfig,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });
    const connection = await pool.getConnection();
    await connection.execute('SELECT 1');
    connection.release();
    console.log('✅ MySQL database connected');
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    return false;
  }
}

// Health check endpoint
app.get('/api/health', async (req, res) => {
  try {
    if (!pool) {
      return res.status(503).json({ status: 'unhealthy', error: 'Database not initialized' });
    }
    const connection = await pool.getConnection();
    await connection.execute('SELECT 1');
    connection.release();
    res.json({ status: 'healthy', database: dbConfig.database, timestamp: new Date().toISOString() });
  } catch (error) {
    res.status(503).json({ status: 'unhealthy', error: error.message });
  }
});

// Debug endpoint
app.get('/api/debug', async (req, res) => {
  try {
    const debug = {
      environment: process.env.NODE_ENV || 'production',
      port: PORT,
      database: { host: dbConfig.host, database: dbConfig.database, user: dbConfig.user },
      timestamp: new Date().toISOString()
    };
    
    if (pool) {
      const connection = await pool.getConnection();
      const [tables] = await connection.execute('SHOW TABLES');
      connection.release();
      debug.database.tables = tables.map(t => Object.values(t)[0]);
      debug.database.status = 'connected';
    }
    
    res.json(debug);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Serve static files
app.use(express.static('dist'));

// Handle React routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start server
async function startServer() {
  console.log('🚀 Starting IeNet Production Server...');
  await initDatabase();
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Server running on port ${PORT}`);
    console.log(`🌐 Website: http://ienet.online:${PORT}`);
  });
}

startServer().catch(console.error);
EOF

# Create deployment script for server
cat > production-server-deploy/install.sh << 'EOF'
#!/bin/bash

echo "🚀 Installing IeNet on Production Server..."

# Install Node.js if not present
if ! command -v node &> /dev/null; then
    echo "📦 Installing Node.js..."
    curl -fsSL https://rpm.nodesource.com/setup_18.x | bash -
    yum install -y nodejs
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Install additional production dependencies
npm install mysql2 express

# Build application
echo "🔨 Building application..."
npm run build

# Test database connection
echo "🗄️  Testing database connection..."
node -e "
const mysql = require('mysql2/promise');
async function test() {
  try {
    const pool = mysql.createPool({
      host: '5.181.218.15',
      user: 'netiedb',
      password: 'h5pLF9833',
      database: 'ienetdb',
      port: 3306
    });
    const conn = await pool.getConnection();
    const [rows] = await conn.execute('SELECT 1 as test');
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

echo "✅ Installation complete!"
echo "🚀 Start server with: node server.js"
EOF

chmod +x production-server-deploy/install.sh

# Create archive
cd production-server-deploy
tar -czf ../ienet-production-ready.tar.gz .
cd ..

echo "✅ Production package created: ienet-production-ready.tar.gz"
echo "📊 Size: $(ls -lh ienet-production-ready.tar.gz | awk '{print $5}')"

echo ""
echo "🌐 Now deploying to production server..."