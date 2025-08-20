#!/usr/bin/env node
import mysql from 'mysql2/promise';

const config = {
  host: '5.181.218.15',
  port: 3306,
  user: 'netiedb',
  password: 'h5pLF9833',
  database: 'ienetdb'
};

async function checkStatus() {
  try {
    const connection = await mysql.createConnection(config);
    const [tables] = await connection.execute('SHOW TABLES');
    const [categories] = await connection.execute('SELECT COUNT(*) as count FROM service_categories');
    
    console.log('🟢 Database Status: HEALTHY');
    console.log(`📊 Tables: ${tables.length}`);
    console.log(`📋 Categories: ${categories[0].count}`);
    console.log('🌐 Domain: ienet.online');
    console.log('✅ Ready for production');
    
    await connection.end();
  } catch (error) {
    console.log('🔴 Database Status: ERROR');
    console.error(error.message);
    process.exit(1);
  }
}

checkStatus();
