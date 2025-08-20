#!/usr/bin/env node

/**
 * Fix MySQL Schema - Add missing icons column
 */

import mysql from 'mysql2/promise';

const config = {
  host: '5.181.218.15',
  port: 3306,
  user: 'netiedb',
  password: 'h5pLF9833',
  database: 'ienetdb'
};

async function addIconColumn() {
  console.log('🔧 Adding missing icon column to services...');
  
  let connection;
  try {
    connection = await mysql.createConnection(config);
    console.log('✅ Connected to MySQL database');

    await connection.execute('ALTER TABLE services ADD COLUMN icon VARCHAR(100) AFTER description');
    console.log('✅ Added icon column to services table');
    
  } catch (error) {
    if (error.message.includes('Duplicate column name')) {
      console.log('✓ Icon column already exists');
    } else {
      console.error('❌ Failed to add icon column:', error.message);
      process.exit(1);
    }
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

addIconColumn();