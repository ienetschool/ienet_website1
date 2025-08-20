import { Pool, neonConfig } from '@neondatabase/serverless';
import ws from 'ws';
import * as fs from 'fs';
import * as path from 'path';

// Configure WebSocket for Neon
neonConfig.webSocketConstructor = ws;

// Simple backup script to run immediately
const createBackupNow = async () => {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  
  try {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupDir = path.join(process.cwd(), 'backups');
    const backupFile = path.join(backupDir, `ienet-backup-${timestamp}.sql`);

    // Ensure backup directory exists
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }

    let backupContent = `-- IeNet Database Backup
-- Created: ${new Date().toISOString()}
-- Database: PostgreSQL
-- Environment: ${process.env.NODE_ENV || 'development'}

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

`;

    // Get all table names
    console.log('Fetching table list...');
    const tablesResult = await pool.query(`
      SELECT tablename 
      FROM pg_tables 
      WHERE schemaname = 'public'
      ORDER BY tablename;
    `);

    const tables = tablesResult.rows.map(row => row.tablename);
    console.log(`Found ${tables.length} tables:`, tables);

    // Backup each table
    for (const tableName of tables) {
      console.log(`Backing up table: ${tableName}`);
      
      // Get data from table
      try {
        const dataResult = await pool.query(`SELECT * FROM "${tableName}"`);
        const rows = dataResult.rows;
        
        backupContent += `\n-- Table: ${tableName} (${rows.length} rows)\n`;
        
        if (rows.length > 0) {
          // Get column names from first row
          const columns = Object.keys(rows[0]);
          const columnNames = columns.map(col => `"${col}"`).join(', ');
          
          backupContent += `-- Data for table: ${tableName}\n`;
          
          // Process rows in batches to avoid memory issues
          const batchSize = 1000;
          for (let i = 0; i < rows.length; i += batchSize) {
            const batch = rows.slice(i, i + batchSize);
            
            backupContent += `INSERT INTO "${tableName}" (${columnNames}) VALUES\n`;
            
            const valueRows = batch.map(row => {
              const values = columns.map(col => {
                const value = row[col];
                if (value === null) return 'NULL';
                if (typeof value === 'string') return `'${value.replace(/'/g, "''")}'`;
                if (typeof value === 'boolean') return value ? 'TRUE' : 'FALSE';
                if (value instanceof Date) return `'${value.toISOString()}'`;
                if (Array.isArray(value)) return `ARRAY[${value.map(v => typeof v === 'string' ? `'${v}'` : v).join(', ')}]`;
                if (typeof value === 'object') return `'${JSON.stringify(value).replace(/'/g, "''")}'`;
                return value?.toString() || 'NULL';
              });
              return `(${values.join(', ')})`;
            });

            backupContent += valueRows.join(',\n') + ';\n\n';
          }
        } else {
          backupContent += `-- No data in table: ${tableName}\n\n`;
        }
        
      } catch (error) {
        console.error(`Error backing up table ${tableName}:`, error);
        backupContent += `-- Error backing up table ${tableName}: ${error.message}\n\n`;
      }
    }

    // Write backup to file
    fs.writeFileSync(backupFile, backupContent, 'utf8');
    
    const stats = fs.statSync(backupFile);
    const fileSizeInMB = (stats.size / (1024 * 1024)).toFixed(2);
    
    console.log(`Database backup created successfully!`);
    console.log(`File: ${backupFile}`);
    console.log(`Size: ${fileSizeInMB} MB`);
    console.log(`Tables backed up: ${tables.length}`);
    
    return backupFile;

  } catch (error) {
    console.error('Backup failed:', error);
    throw error;
  } finally {
    await pool.end();
  }
};

// Run the backup
createBackupNow()
  .then(backupFile => {
    console.log('\n✅ Backup process completed successfully!');
    process.exit(0);
  })
  .catch(error => {
    console.error('\n❌ Backup process failed:', error);
    process.exit(1);
  });