#!/usr/bin/env node

/**
 * Fix MySQL Schema - Add missing technical_details and benefits columns to features table
 */

import mysql from 'mysql2/promise';

const config = {
  host: '5.181.218.15',
  port: 3306,
  user: 'netiedb',
  password: 'h5pLF9833',
  database: 'ienetdb'
};

async function addMissingColumns() {
  console.log('🔧 Adding missing columns to features table...');
  
  let connection;
  try {
    connection = await mysql.createConnection(config);
    console.log('✅ Connected to MySQL database');

    // Add technical_details column
    try {
      await connection.execute('ALTER TABLE features ADD COLUMN technical_details TEXT AFTER content');
      console.log('✅ Added technical_details column to features table');
    } catch (error) {
      if (error.message.includes('Duplicate column name')) {
        console.log('✓ technical_details column already exists');
      } else {
        throw error;
      }
    }

    // Add benefits column
    try {
      await connection.execute('ALTER TABLE features ADD COLUMN benefits TEXT AFTER technical_details');
      console.log('✅ Added benefits column to features table');
    } catch (error) {
      if (error.message.includes('Duplicate column name')) {
        console.log('✓ benefits column already exists');
      } else {
        throw error;
      }
    }
    
  } catch (error) {
    console.error('❌ Failed to add columns:', error.message);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

addMissingColumns();