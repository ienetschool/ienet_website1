#!/usr/bin/env node

/**
 * Fix site_settings table structure and populate data
 */

import mysql from 'mysql2/promise';

const config = {
  host: '5.181.218.15',
  port: 3306,
  user: 'netiedb',
  password: 'h5pLF9833',
  database: 'ienetdb'
};

async function fixSiteSettings() {
  console.log('🔧 Fixing site_settings table...');
  
  let connection;
  try {
    connection = await mysql.createConnection(config);
    console.log('✅ Connected to MySQL database');

    // Check if site_settings table exists and its structure
    try {
      const [columns] = await connection.execute('DESCRIBE site_settings');
      console.log('📋 Current site_settings columns:', columns.map(col => col.Field));
    } catch (error) {
      console.log('⚠️  site_settings table structure needs fixing');
    }

    // Recreate site_settings table with correct structure
    await connection.execute('DROP TABLE IF EXISTS site_settings');
    await connection.execute(`
      CREATE TABLE site_settings (
        id INT AUTO_INCREMENT PRIMARY KEY,
        setting_key VARCHAR(255) UNIQUE NOT NULL,
        setting_value LONGTEXT,
        setting_type ENUM('string', 'text', 'number', 'boolean', 'json') DEFAULT 'string',
        description TEXT,
        is_editable BOOLEAN DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('✅ site_settings table recreated');

    // Insert site configuration data
    const siteSettings = [
      { key: 'site_name', value: 'India Espectacular', type: 'string', description: 'Website name' },
      { key: 'site_description', value: 'Professional IT Services & Solutions Platform', type: 'string', description: 'Site description' },
      { key: 'domain', value: 'ienet.online', type: 'string', description: 'Production domain' },
      { key: 'environment', value: 'production', type: 'string', description: 'Environment type' },
      { key: 'database_host', value: '5.181.218.15', type: 'string', description: 'Database host' },
      { key: 'database_name', value: 'ienetdb', type: 'string', description: 'Database name' },
      { key: 'total_pages', value: '1328', type: 'number', description: 'Total content pages' },
      { key: 'last_updated', value: new Date().toISOString(), type: 'string', description: 'Last update timestamp' }
    ];

    for (const setting of siteSettings) {
      await connection.execute(
        'INSERT INTO site_settings (setting_key, setting_value, setting_type, description) VALUES (?, ?, ?, ?)',
        [setting.key, setting.value, setting.type, setting.description]
      );
    }
    console.log('✅ Added 8 site settings');

    // Verify the data
    const [result] = await connection.execute('SELECT COUNT(*) as count FROM site_settings');
    console.log(`✅ site_settings table now has ${result[0].count} records`);

    console.log('\n🎉 site_settings table fixed and populated!');
    
  } catch (error) {
    console.error('❌ Failed to fix site_settings:', error.message);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

fixSiteSettings();