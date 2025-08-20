import mysql from 'mysql2/promise';

// Database Migration Script for Production
const dbConfig = {
  host: 'localhost',
  user: 'ienet',
  password: 'ienet2024',
  database: 'ienet_db',
  port: 3306
};

async function verifyDatabase() {
  console.log('🔍 Verifying MySQL database connection...');
  
  try {
    const connection = await mysql.createConnection(dbConfig);
    
    // Test connection
    await connection.execute('SELECT 1');
    console.log('✅ Database connection successful');
    
    // Check tables exist
    const [tables] = await connection.execute('SHOW TABLES');
    console.log(`📊 Found ${tables.length} tables in database`);
    
    // Verify data counts
    const queries = [
      { name: 'Service Categories', query: 'SELECT COUNT(*) as count FROM service_categories' },
      { name: 'Services', query: 'SELECT COUNT(*) as count FROM services' },
      { name: 'Features', query: 'SELECT COUNT(*) as count FROM features' },
      { name: 'Pages', query: 'SELECT COUNT(*) as count FROM pages' }
    ];
    
    for (const { name, query } of queries) {
      try {
        const [rows] = await connection.execute(query);
        console.log(`📈 ${name}: ${rows[0].count} records`);
      } catch (error) {
        console.log(`⚠️  ${name}: Table not found or error - ${error.message}`);
      }
    }
    
    await connection.end();
    console.log('🎯 Database verification complete');
    
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    console.log('💡 Make sure MySQL is running and credentials are correct');
    process.exit(1);
  }
}

verifyDatabase();