import { Pool, neonConfig } from '@neondatabase/serverless';
import ws from 'ws';
import * as fs from 'fs';
import * as path from 'path';

// Configure WebSocket for Neon
neonConfig.webSocketConstructor = ws;

// Database backup utility
export class DatabaseBackup {
  private pool: Pool;

  constructor() {
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL environment variable is required');
    }
    this.pool = new Pool({ connectionString: process.env.DATABASE_URL });
  }

  async createBackup(): Promise<string> {
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
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

`;

    try {
      // Get all table names
      const tablesResult = await this.pool.query(`
        SELECT tablename 
        FROM pg_tables 
        WHERE schemaname = 'public'
        ORDER BY tablename;
      `);

      const tables = tablesResult.rows.map(row => row.tablename);
      console.log(`Found ${tables.length} tables to backup:`, tables);

      // Backup each table
      for (const tableName of tables) {
        backupContent += await this.backupTable(tableName);
      }

      // Write backup to file
      fs.writeFileSync(backupFile, backupContent, 'utf8');

      console.log(`Database backup created successfully: ${backupFile}`);
      return backupFile;

    } catch (error) {
      console.error('Error creating database backup:', error);
      throw error;
    }
  }

  private async backupTable(tableName: string): Promise<string> {
    let tableBackup = `\n-- Table: ${tableName}\n`;
    
    try {
      // Get table schema
      const schemaResult = await this.pool.query(`
        SELECT 
          column_name,
          data_type,
          is_nullable,
          column_default,
          character_maximum_length
        FROM information_schema.columns 
        WHERE table_name = $1 AND table_schema = 'public'
        ORDER BY ordinal_position;
      `, [tableName]);

      const columns = schemaResult.rows;
      
      if (columns.length === 0) {
        return tableBackup + `-- Warning: No columns found for table ${tableName}\n`;
      }

      // Create table structure
      tableBackup += `DROP TABLE IF EXISTS "${tableName}" CASCADE;\n`;
      tableBackup += `CREATE TABLE "${tableName}" (\n`;
      
      const columnDefs = columns.map(col => {
        let def = `  "${col.column_name}" ${col.data_type}`;
        
        if (col.character_maximum_length) {
          def += `(${col.character_maximum_length})`;
        }
        
        if (col.is_nullable === 'NO') {
          def += ' NOT NULL';
        }
        
        if (col.column_default) {
          def += ` DEFAULT ${col.column_default}`;
        }
        
        return def;
      });
      
      tableBackup += columnDefs.join(',\n') + '\n);\n\n';

      // Get table data
      const dataResult = await this.pool.query(`SELECT * FROM "${tableName}"`);
      const rows = dataResult.rows;

      if (rows.length > 0) {
        const columnNames = columns.map(col => `"${col.column_name}"`).join(', ');
        tableBackup += `-- Data for table: ${tableName}\n`;
        tableBackup += `INSERT INTO "${tableName}" (${columnNames}) VALUES\n`;
        
        const valueRows = rows.map(row => {
          const values = columns.map(col => {
            const value = row[col.column_name];
            if (value === null) return 'NULL';
            if (typeof value === 'string') return `'${value.replace(/'/g, "''")}'`;
            if (typeof value === 'boolean') return value ? 'TRUE' : 'FALSE';
            if (value instanceof Date) return `'${value.toISOString()}'`;
            if (Array.isArray(value)) return `ARRAY[${value.map(v => `'${v}'`).join(', ')}]`;
            return value.toString();
          });
          return `(${values.join(', ')})`;
        });

        tableBackup += valueRows.join(',\n') + ';\n\n';
        console.log(`Backed up ${rows.length} rows from ${tableName}`);
      } else {
        tableBackup += `-- No data in table: ${tableName}\n\n`;
      }

    } catch (error) {
      console.error(`Error backing up table ${tableName}:`, error);
      tableBackup += `-- Error backing up table ${tableName}: ${error.message}\n\n`;
    }

    return tableBackup;
  }

  async close() {
    await this.pool.end();
  }
}

// CLI usage - Check if this file is being run directly
const isMainModule = import.meta.url === `file://${process.argv[1]}`;

if (isMainModule) {
  const backup = new DatabaseBackup();
  
  backup.createBackup()
    .then((backupFile) => {
      console.log('Backup completed successfully:', backupFile);
      return backup.close();
    })
    .catch((error) => {
      console.error('Backup failed:', error);
      process.exit(1);
    });
}