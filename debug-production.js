const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

// Production debugging script
async function debugProduction() {
  console.log('🔍 IeNet Production Server Debugging Tool\n');
  
  // Check environment variables
  console.log('📋 Environment Configuration:');
  console.log('NODE_ENV:', process.env.NODE_ENV || 'not set');
  console.log('PORT:', process.env.PORT || 'not set');
  console.log('MYSQL_HOST:', process.env.MYSQL_HOST || 'not set');
  console.log('MYSQL_USER:', process.env.MYSQL_USER || 'not set');
  console.log('MYSQL_DATABASE:', process.env.MYSQL_DATABASE || 'not set');
  console.log('MYSQL_PORT:', process.env.MYSQL_PORT || 'not set');
  console.log('');
  
  // Check required files
  console.log('📁 File System Check:');
  const requiredFiles = [
    'package.json',
    'server.js',
    'dist/index.html',
    '.env.production'
  ];
  
  for (const file of requiredFiles) {
    const exists = fs.existsSync(file);
    console.log(`${exists ? '✅' : '❌'} ${file}`);
  }
  console.log('');
  
  // Test MySQL connection
  console.log('🗄️  MySQL Connection Test:');
  try {
    const dbConfig = {
      host: process.env.MYSQL_HOST || 'localhost',
      user: process.env.MYSQL_USER || 'ienet_user',
      password: process.env.MYSQL_PASSWORD || '',
      database: process.env.MYSQL_DATABASE || 'ienet_production',
      port: parseInt(process.env.MYSQL_PORT || '3306'),
      charset: 'utf8mb4'
    };
    
    console.log('Attempting connection to:', {
      host: dbConfig.host,
      user: dbConfig.user,
      database: dbConfig.database,
      port: dbConfig.port
    });
    
    const pool = mysql.createPool({
      ...dbConfig,
      waitForConnections: true,
      connectionLimit: 5,
      queueLimit: 0
    });
    
    const connection = await pool.getConnection();
    console.log('✅ MySQL connection successful');
    
    // Check database tables
    const [tables] = await connection.execute(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = ?
    `, [dbConfig.database]);
    
    console.log(`📊 Found ${tables.length} tables:`, tables.map(t => t.TABLE_NAME));
    
    // Check sample data
    if (tables.length > 0) {
      for (const table of tables.slice(0, 3)) {
        try {
          const [rows] = await connection.execute(`SELECT COUNT(*) as count FROM ${table.TABLE_NAME}`);
          console.log(`   ${table.TABLE_NAME}: ${rows[0].count} records`);
        } catch (error) {
          console.log(`   ${table.TABLE_NAME}: Error counting records`);
        }
      }
    }
    
    connection.release();
    await pool.end();
    
  } catch (error) {
    console.log('❌ MySQL connection failed:', error.message);
    
    // Provide specific error guidance
    if (error.code === 'ECONNREFUSED') {
      console.log('💡 Suggestion: Check if MySQL service is running');
      console.log('   sudo systemctl start mysql');
    } else if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.log('💡 Suggestion: Check MySQL credentials in .env.production');
    } else if (error.code === 'ER_BAD_DB_ERROR') {
      console.log('💡 Suggestion: Create database using setup-mysql-database.sql');
    }
  }
  
  console.log('');
  console.log('🔧 Next Steps:');
  console.log('1. Fix any ❌ issues above');
  console.log('2. Update .env.production with correct MySQL credentials');
  console.log('3. Ensure MySQL service is running');
  console.log('4. Run: npm start');
  console.log('5. Test: curl http://localhost:5000/api/health');
}

debugProduction().catch(console.error);