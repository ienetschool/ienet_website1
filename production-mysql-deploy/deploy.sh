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
