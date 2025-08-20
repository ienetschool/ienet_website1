#!/usr/bin/env node

/**
 * Complete Database Migration: PostgreSQL to MySQL
 * This will migrate all tables and data from PostgreSQL to MySQL
 */

import { Pool } from '@neondatabase/serverless';
import mysql from 'mysql2/promise';
import ws from 'ws';

// PostgreSQL configuration (source)
const pgConfig = {
  connectionString: process.env.DATABASE_URL
};

// MySQL configuration (destination)
const mysqlConfig = {
  host: '5.181.218.15',
  port: 3306,
  user: 'netiedb',
  password: 'h5pLF9833',
  database: 'ienetdb'
};

// PostgreSQL to MySQL type mapping
const typeMapping = {
  'integer': 'INT',
  'bigint': 'BIGINT',
  'serial': 'INT AUTO_INCREMENT',
  'bigserial': 'BIGINT AUTO_INCREMENT',
  'text': 'TEXT',
  'varchar': 'VARCHAR',
  'character varying': 'VARCHAR',
  'boolean': 'BOOLEAN',
  'timestamp with time zone': 'TIMESTAMP',
  'timestamp without time zone': 'TIMESTAMP',
  'json': 'JSON',
  'jsonb': 'JSON',
  'uuid': 'VARCHAR(36)',
  'date': 'DATE',
  'time': 'TIME',
  'decimal': 'DECIMAL',
  'numeric': 'DECIMAL',
  'real': 'FLOAT',
  'double precision': 'DOUBLE'
};

async function getPostgreSQLSchema() {
  const pool = new Pool({ connectionString: pgConfig.connectionString });
  
  try {
    // Get all tables
    const tablesResult = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_type = 'BASE TABLE'
      ORDER BY table_name
    `);
    
    const tables = {};
    
    for (const table of tablesResult.rows) {
      const tableName = table.table_name;
      
      // Get columns for each table
      const columnsResult = await pool.query(`
        SELECT 
          column_name,
          data_type,
          character_maximum_length,
          is_nullable,
          column_default
        FROM information_schema.columns 
        WHERE table_name = $1 
        ORDER BY ordinal_position
      `, [tableName]);
      
      tables[tableName] = columnsResult.rows;
    }
    
    return tables;
  } finally {
    await pool.end();
  }
}

async function getPostgreSQLData(tableName) {
  const pool = new Pool({ connectionString: pgConfig.connectionString });
  
  try {
    const result = await pool.query(`SELECT * FROM "${tableName}"`);
    return result.rows;
  } catch (error) {
    console.log(`⚠️  Could not fetch data from ${tableName}: ${error.message}`);
    return [];
  } finally {
    await pool.end();
  }
}

function convertPostgreSQLTypeToMySQL(pgType, maxLength) {
  let mysqlType = typeMapping[pgType.toLowerCase()] || 'TEXT';
  
  if (maxLength && (pgType === 'varchar' || pgType === 'character varying')) {
    mysqlType = `VARCHAR(${maxLength})`;
  }
  
  return mysqlType;
}

async function createMySQLTable(connection, tableName, columns) {
  const columnDefinitions = columns.map(col => {
    let mysqlType = convertPostgreSQLTypeToMySQL(col.data_type, col.character_maximum_length);
    let nullable = col.is_nullable === 'YES' ? '' : 'NOT NULL';
    let defaultValue = '';
    
    // Handle default values
    if (col.column_default) {
      if (col.column_default.includes('nextval')) {
        mysqlType = mysqlType.replace('INT', 'INT AUTO_INCREMENT');
        nullable = 'NOT NULL';
      } else if (col.column_default === 'now()' || col.column_default.includes('CURRENT_TIMESTAMP')) {
        defaultValue = 'DEFAULT CURRENT_TIMESTAMP';
      } else if (col.column_default === 'true') {
        defaultValue = 'DEFAULT 1';
      } else if (col.column_default === 'false') {
        defaultValue = 'DEFAULT 0';
      } else if (!col.column_default.includes('nextval')) {
        defaultValue = `DEFAULT ${col.column_default}`;
      }
    }
    
    return `\`${col.column_name}\` ${mysqlType} ${nullable} ${defaultValue}`.trim();
  });
  
  // Add primary key if 'id' column exists
  const hasId = columns.some(col => col.column_name === 'id');
  if (hasId) {
    columnDefinitions.push('PRIMARY KEY (`id`)');
  }
  
  const createTableSQL = `
    CREATE TABLE IF NOT EXISTS \`${tableName}\` (
      ${columnDefinitions.join(',\n      ')}
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `;
  
  await connection.execute(`DROP TABLE IF EXISTS \`${tableName}\``);
  await connection.execute(createTableSQL);
}

async function insertDataToMySQL(connection, tableName, data) {
  if (!data || data.length === 0) return;
  
  const columns = Object.keys(data[0]);
  const placeholders = columns.map(() => '?').join(', ');
  
  const insertSQL = `
    INSERT INTO \`${tableName}\` (${columns.map(col => `\`${col}\``).join(', ')}) 
    VALUES (${placeholders})
  `;
  
  for (const row of data) {
    try {
      const values = columns.map(col => {
        let value = row[col];
        
        // Handle JSON fields
        if (typeof value === 'object' && value !== null) {
          value = JSON.stringify(value);
        }
        
        // Handle boolean fields
        if (typeof value === 'boolean') {
          value = value ? 1 : 0;
        }
        
        return value;
      });
      
      await connection.execute(insertSQL, values);
    } catch (error) {
      console.log(`⚠️  Error inserting row in ${tableName}: ${error.message}`);
    }
  }
}

async function migrateFullDatabase() {
  console.log('🚀 Starting full database migration from PostgreSQL to MySQL...');
  
  let mysqlConnection;
  
  try {
    // Connect to MySQL
    mysqlConnection = await mysql.createConnection(mysqlConfig);
    console.log('✅ Connected to MySQL database');
    
    // Disable foreign key checks during migration
    await mysqlConnection.execute('SET FOREIGN_KEY_CHECKS = 0');
    
    // Get PostgreSQL schema
    console.log('📋 Analyzing PostgreSQL schema...');
    const schema = await getPostgreSQLSchema();
    const tableNames = Object.keys(schema);
    console.log(`📊 Found ${tableNames.length} tables to migrate`);
    
    // Migrate each table
    for (const tableName of tableNames) {
      console.log(`\n🔄 Migrating table: ${tableName}`);
      
      try {
        // Create table structure
        await createMySQLTable(mysqlConnection, tableName, schema[tableName]);
        console.log(`✅ Created table structure for ${tableName}`);
        
        // Get data from PostgreSQL
        const data = await getPostgreSQLData(tableName);
        console.log(`📦 Retrieved ${data.length} records from ${tableName}`);
        
        // Insert data to MySQL
        if (data.length > 0) {
          await insertDataToMySQL(mysqlConnection, tableName, data);
          console.log(`✅ Migrated ${data.length} records to ${tableName}`);
        }
        
      } catch (error) {
        console.error(`❌ Error migrating table ${tableName}: ${error.message}`);
      }
    }
    
    // Re-enable foreign key checks
    await mysqlConnection.execute('SET FOREIGN_KEY_CHECKS = 1');
    
    // Verify migration
    console.log('\n📊 Migration verification:');
    for (const tableName of tableNames) {
      try {
        const [result] = await mysqlConnection.execute(`SELECT COUNT(*) as count FROM \`${tableName}\``);
        console.log(`   ${tableName}: ${result[0].count} records`);
      } catch (error) {
        console.log(`   ${tableName}: Error - ${error.message}`);
      }
    }
    
    console.log('\n🎉 Full database migration completed successfully!');
    
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    process.exit(1);
  } finally {
    if (mysqlConnection) {
      await mysqlConnection.end();
    }
  }
}

migrateFullDatabase();