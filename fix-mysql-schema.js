#!/usr/bin/env node

/**
 * Fix MySQL Schema - Add missing columns
 * Adds the missing columns to match the expected schema
 */

import mysql from 'mysql2/promise';

const config = {
  host: '5.181.218.15',
  port: 3306,
  user: 'netiedb',
  password: 'h5pLF9833',
  database: 'ienetdb'
};

async function fixSchema() {
  console.log('🔧 Fixing MySQL Schema - Adding Missing Columns...');
  
  let connection;
  try {
    connection = await mysql.createConnection(config);
    console.log('✅ Connected to MySQL database');

    // Check current structure
    console.log('🔍 Checking current table structures...');
    
    // Check service_categories columns
    const [categoryColumns] = await connection.execute(`
      SELECT COLUMN_NAME 
      FROM INFORMATION_SCHEMA.COLUMNS 
      WHERE TABLE_SCHEMA = 'ienetdb' 
      AND TABLE_NAME = 'service_categories'
    `);
    
    console.log('📋 service_categories columns:', categoryColumns.map(c => c.COLUMN_NAME));
    
    // Add missing columns to service_categories
    const categoryColumnsToAdd = [
      { name: 'color', sql: 'ADD COLUMN `color` VARCHAR(50) AFTER `icon`' },
      { name: 'meta_title', sql: 'ADD COLUMN `meta_title` VARCHAR(255) AFTER `color`' },
      { name: 'meta_description', sql: 'ADD COLUMN `meta_description` TEXT AFTER `meta_title`' }
    ];

    for (const column of categoryColumnsToAdd) {
      const hasColumn = categoryColumns.some(c => c.COLUMN_NAME === column.name);
      if (!hasColumn) {
        console.log(`➕ Adding ${column.name} to service_categories...`);
        await connection.execute(`ALTER TABLE service_categories ${column.sql}`);
        console.log(`✅ Added ${column.name}`);
      } else {
        console.log(`✓ ${column.name} already exists`);
      }
    }

    // Check projects columns
    const [projectColumns] = await connection.execute(`
      SELECT COLUMN_NAME 
      FROM INFORMATION_SCHEMA.COLUMNS 
      WHERE TABLE_SCHEMA = 'ienetdb' 
      AND TABLE_NAME = 'projects'
    `);
    
    console.log('📋 projects columns:', projectColumns.map(c => c.COLUMN_NAME));

    // Add missing columns to projects
    const projectColumnsToAdd = [
      { name: 'short_description', sql: 'ADD COLUMN `short_description` VARCHAR(500) AFTER `description`' },
      { name: 'content', sql: 'ADD COLUMN `content` TEXT AFTER `short_description`' },
      { name: 'image_url', sql: 'ADD COLUMN `image_url` VARCHAR(255) AFTER `content`' },
      { name: 'demo_url', sql: 'ADD COLUMN `demo_url` VARCHAR(255) AFTER `image_url`' },
      { name: 'category', sql: 'ADD COLUMN `category` VARCHAR(255) AFTER `technologies`' },
      { name: 'meta_title', sql: 'ADD COLUMN `meta_title` VARCHAR(255) AFTER `completion_date`' },
      { name: 'meta_description', sql: 'ADD COLUMN `meta_description` TEXT AFTER `meta_title`' },
      { name: 'sort_order', sql: 'ADD COLUMN `sort_order` INT DEFAULT 0 AFTER `is_active`' }
    ];

    for (const column of projectColumnsToAdd) {
      const hasColumn = projectColumns.some(c => c.COLUMN_NAME === column.name);
      if (!hasColumn) {
        console.log(`➕ Adding ${column.name} to projects...`);
        await connection.execute(`ALTER TABLE projects ${column.sql}`);
        console.log(`✅ Added ${column.name}`);
      } else {
        console.log(`✓ ${column.name} already exists`);
      }
    }

    // Update sample data with new columns
    console.log('📝 Updating sample data...');
    
    // Update service categories with color and meta data
    await connection.execute(`
      UPDATE service_categories SET 
        color = '#3B82F6', 
        meta_title = CONCAT(name, ' | India Espectacular'),
        meta_description = CONCAT(description, ' by India Espectacular')
      WHERE id = 11
    `);

    await connection.execute(`
      UPDATE service_categories SET 
        color = '#10B981', 
        meta_title = CONCAT(name, ' | India Espectacular'),
        meta_description = CONCAT(description, ' by India Espectacular')
      WHERE id = 12
    `);

    // Update a few more categories
    const categoryUpdates = [
      { id: 13, color: '#F59E0B' },
      { id: 14, color: '#EF4444' },
      { id: 15, color: '#8B5CF6' },
      { id: 16, color: '#06B6D4' },
      { id: 17, color: '#EC4899' },
      { id: 18, color: '#84CC16' },
      { id: 19, color: '#F97316' },
      { id: 20, color: '#6366F1' }
    ];

    for (const update of categoryUpdates) {
      await connection.execute(`
        UPDATE service_categories SET 
          color = ?, 
          meta_title = CONCAT(name, ' | India Espectacular'),
          meta_description = CONCAT(description, ' by India Espectacular')
        WHERE id = ?
      `, [update.color, update.id]);
    }

    // Update projects with new columns
    await connection.execute(`
      UPDATE projects SET 
        short_description = 'Modern e-commerce platform with enhanced UX',
        content = 'This comprehensive e-commerce platform features modern design, responsive layout, advanced payment integration, and optimized performance for better user engagement.',
        image_url = '/images/projects/ecommerce.jpg',
        demo_url = 'https://example-ecommerce.com',
        category = 'E-commerce',
        meta_title = 'E-commerce Platform Redesign | India Espectacular',
        meta_description = 'Complete redesign of e-commerce platform with modern UI/UX by India Espectacular',
        sort_order = 1
      WHERE id = 1
    `);

    await connection.execute(`
      UPDATE projects SET 
        short_description = 'Healthcare management with patient portal',
        content = 'Advanced healthcare management system featuring patient portals, appointment scheduling, medical records management, and comprehensive analytics dashboard.',
        image_url = '/images/projects/healthcare.jpg',
        demo_url = 'https://healthcare-demo.com',
        category = 'Healthcare',
        meta_title = 'Healthcare Management System | India Espectacular',
        meta_description = 'Comprehensive healthcare management solution with patient portal and analytics',
        sort_order = 2
      WHERE id = 2
    `);

    await connection.execute(`
      UPDATE projects SET 
        short_description = 'Secure mobile banking application',
        content = 'Feature-rich mobile banking application with biometric authentication, real-time transactions, budget tracking, and enterprise-grade security measures.',
        image_url = '/images/projects/banking.jpg',
        demo_url = 'https://securebank-app.com',
        category = 'Mobile App',
        meta_title = 'Mobile Banking App | India Espectacular',
        meta_description = 'Secure mobile banking application for iOS and Android with advanced security features',
        sort_order = 3
      WHERE id = 3
    `);

    // Verify the changes
    console.log('🔍 Verifying schema updates...');
    const [updatedCategories] = await connection.execute('SELECT id, name, color, meta_title FROM service_categories LIMIT 3');
    const [updatedProjects] = await connection.execute('SELECT id, title, short_description, category FROM projects LIMIT 3');
    
    console.log('✅ Updated categories:', updatedCategories);
    console.log('✅ Updated projects:', updatedProjects);

    console.log('🎉 Schema fix complete!');
    console.log('📊 Database ready for application');
    
  } catch (error) {
    console.error('❌ Schema fix failed:', error.message);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

fixSchema();