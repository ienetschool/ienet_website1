#!/usr/bin/env node

/**
 * Fix MySQL Schema - Add missing columns to enquiries table
 */

import mysql from 'mysql2/promise';

const config = {
  host: '5.181.218.15',
  port: 3306,
  user: 'netiedb',
  password: 'h5pLF9833',
  database: 'ienetdb'
};

async function fixEnquiriesSchema() {
  console.log('🔧 Adding missing columns to enquiries table...');
  
  let connection;
  try {
    connection = await mysql.createConnection(config);
    console.log('✅ Connected to MySQL database');

    const columns = [
      'service_interest VARCHAR(255)',
      'budget_range VARCHAR(100)', 
      'source VARCHAR(100)',
      'page_url TEXT',
      'user_ip VARCHAR(45)',
      'user_agent TEXT',
      'referrer TEXT',
      'assigned_to INT',
      'responded_at TIMESTAMP NULL'
    ];

    for (const column of columns) {
      try {
        const columnName = column.split(' ')[0];
        await connection.execute(`ALTER TABLE enquiries ADD COLUMN ${column}`);
        console.log(`✅ Added ${columnName} column to enquiries table`);
      } catch (error) {
        if (error.message.includes('Duplicate column name')) {
          const columnName = column.split(' ')[0];
          console.log(`✓ ${columnName} column already exists`);
        } else {
          throw error;
        }
      }
    }
    
  } catch (error) {
    console.error('❌ Failed to fix enquiries schema:', error.message);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

fixEnquiriesSchema();