#!/usr/bin/env node

/**
 * Test MySQL Connection and Verify Production Database
 */

import mysql from 'mysql2/promise';

const config = {
  host: '5.181.218.15',
  port: 3306,
  user: 'netiedb',
  password: 'h5pLF9833',
  database: 'ienetdb'
};

async function testConnection() {
  console.log('🔍 Testing MySQL connection...');
  
  let connection;
  try {
    connection = await mysql.createConnection(config);
    console.log('✅ MySQL connection successful');
    
    // Test basic query
    const [result] = await connection.execute('SELECT 1 as test');
    console.log('✅ Database query test passed');
    
    // Check table count
    const [tables] = await connection.execute('SHOW TABLES');
    console.log(`✅ Found ${tables.length} tables in database`);
    
    // Check key data counts
    const [categories] = await connection.execute('SELECT COUNT(*) as count FROM service_categories');
    const [services] = await connection.execute('SELECT COUNT(*) as count FROM services');
    const [features] = await connection.execute('SELECT COUNT(*) as count FROM features');
    
    console.log('\n📊 Data verification:');
    console.log(`   Categories: ${categories[0].count}`);
    console.log(`   Services: ${services[0].count}`);
    console.log(`   Features: ${features[0].count}`);
    console.log(`   Total Pages: ${categories[0].count + services[0].count + features[0].count}`);
    
    console.log('\n🎉 MySQL production database ready for deployment!');
    
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

testConnection();