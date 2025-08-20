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
