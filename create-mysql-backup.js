#!/usr/bin/env node

/**
 * Create Complete MySQL Database Backup
 */

import mysql from 'mysql2/promise';
import fs from 'fs/promises';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

const config = {
  host: '5.181.218.15',
  port: 3306,
  user: 'netiedb',
  password: 'h5pLF9833',
  database: 'ienetdb'
};

async function createBackup() {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').split('T')[0];
  const backupFile = `ienet-database-backup-${timestamp}.sql`;
  const compressedFile = `${backupFile}.gz`;
  
  console.log('🚀 Creating MySQL database backup...');
  
  try {
    // Create mysqldump command
    const dumpCommand = `mysqldump -h ${config.host} -P ${config.port} -u ${config.user} -p${config.password} ${config.database} > ${backupFile}`;
    
    console.log('📦 Exporting database...');
    await execAsync(dumpCommand);
    console.log(`✅ Database exported to ${backupFile}`);
    
    // Compress the backup
    console.log('🗜️  Compressing backup...');
    await execAsync(`gzip ${backupFile}`);
    console.log(`✅ Backup compressed to ${compressedFile}`);
    
    // Get file size
    const stats = await fs.stat(compressedFile);
    const fileSizeKB = Math.round(stats.size / 1024);
    
    console.log(`📊 Backup size: ${fileSizeKB} KB`);
    console.log(`✅ Backup created: ${compressedFile}`);
    
    // Create backup info
    const backupInfo = {
      filename: compressedFile,
      created: new Date().toISOString(),
      size_kb: fileSizeKB,
      database: config.database,
      host: config.host,
      tables: 41,
      content_pages: 1328
    };
    
    await fs.writeFile('backup-info.json', JSON.stringify(backupInfo, null, 2));
    console.log('📋 Backup information saved to backup-info.json');
    
  } catch (error) {
    console.error('❌ Backup failed:', error.message);
    
    // Try alternative backup method using mysql2
    console.log('🔄 Trying alternative backup method...');
    await createAlternativeBackup(timestamp);
  }
}

async function createAlternativeBackup(timestamp) {
  const backupFile = `ienet-backup-${timestamp}.sql`;
  
  let connection;
  try {
    connection = await mysql.createConnection(config);
    
    // Get all tables
    const [tables] = await connection.execute('SHOW TABLES');
    const tableNames = tables.map(table => Object.values(table)[0]);
    
    let sqlContent = `-- MySQL Database Backup for ${config.database}\n-- Created: ${new Date().toISOString()}\n\n`;
    
    for (const tableName of tableNames) {
      // Get table structure
      const [createTable] = await connection.execute(`SHOW CREATE TABLE \`${tableName}\``);
      sqlContent += `DROP TABLE IF EXISTS \`${tableName}\`;\n`;
      sqlContent += `${createTable[0]['Create Table']};\n\n`;
      
      // Get table data
      const [rows] = await connection.execute(`SELECT * FROM \`${tableName}\``);
      if (rows.length > 0) {
        sqlContent += `INSERT INTO \`${tableName}\` VALUES\n`;
        const values = rows.map(row => {
          const valueStr = Object.values(row).map(val => {
            if (val === null) return 'NULL';
            if (typeof val === 'string') return `'${val.replace(/'/g, "''")}'`;
            return val;
          }).join(', ');
          return `(${valueStr})`;
        }).join(',\n');
        sqlContent += values + ';\n\n';
      }
    }
    
    await fs.writeFile(backupFile, sqlContent);
    console.log(`✅ Alternative backup created: ${backupFile}`);
    
  } catch (error) {
    console.error('❌ Alternative backup failed:', error.message);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

createBackup();