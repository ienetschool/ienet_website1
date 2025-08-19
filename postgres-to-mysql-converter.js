#!/usr/bin/env node

/**
 * PostgreSQL to MySQL Backup Converter
 * Converts PostgreSQL backup files to MySQL-compatible format
 */

import fs from 'fs';
import path from 'path';

class PostgresToMySQLConverter {
  constructor() {
    this.typeMapping = {
      // PostgreSQL to MySQL type mappings
      'character varying': 'VARCHAR(255)',
      'character varying(255)': 'VARCHAR(255)',
      'character varying(500)': 'VARCHAR(500)',
      'character varying(1000)': 'VARCHAR(1000)',
      'text': 'TEXT',
      'integer': 'INT',
      'bigint': 'BIGINT',
      'boolean': 'BOOLEAN',
      'timestamp without time zone': 'DATETIME',
      'timestamp with time zone': 'DATETIME',
      'jsonb': 'JSON',
      'json': 'JSON',
      'uuid': 'VARCHAR(36)',
      'decimal': 'DECIMAL',
      'numeric': 'DECIMAL',
      'real': 'FLOAT',
      'double precision': 'DOUBLE'
    };
  }

  convertBackup(inputFile, outputFile) {
    console.log(`Converting PostgreSQL backup: ${inputFile}`);
    console.log(`Output MySQL file: ${outputFile}`);

    let content = fs.readFileSync(inputFile, 'utf8');
    
    // Convert file header
    content = this.convertHeader(content);
    
    // Convert table definitions
    content = this.convertTableDefinitions(content);
    
    // Convert data types
    content = this.convertDataTypes(content);
    
    // Convert PostgreSQL-specific functions
    content = this.convertFunctions(content);
    
    // Convert sequences to AUTO_INCREMENT
    content = this.convertSequences(content);
    
    // Convert INSERT statements
    content = this.convertInserts(content);
    
    // Remove PostgreSQL-specific statements
    content = this.removePostgreSQLStatements(content);
    
    // Add MySQL-specific settings
    content = this.addMySQLSettings(content);
    
    fs.writeFileSync(outputFile, content);
    console.log('Conversion completed successfully!');
    
    return outputFile;
  }

  convertHeader(content) {
    const mysqlHeader = `-- IeNet Database Backup (MySQL Format)
-- Original: PostgreSQL backup converted to MySQL
-- Created: ${new Date().toISOString()}
-- Database: MySQL/MariaDB
-- Environment: production

SET FOREIGN_KEY_CHECKS=0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

`;
    
    // Remove PostgreSQL header and replace
    content = content.replace(/^-- .*?\n/gm, '');
    content = content.replace(/SET .*?;\n/gm, '');
    content = content.replace(/^SET .*?$/gm, '');
    
    return mysqlHeader + content;
  }

  convertTableDefinitions(content) {
    // Convert CREATE TABLE statements
    content = content.replace(/CREATE TABLE "([^"]+)"/g, 'CREATE TABLE `$1`');
    content = content.replace(/"([^"]+)"/g, '`$1`');
    
    // Convert column definitions
    content = content.replace(/`([^`]+)` character varying/g, '`$1` VARCHAR(255)');
    content = content.replace(/DEFAULT gen_random_uuid\(\)/g, '');
    content = content.replace(/DEFAULT nextval\('[^']+'\)/g, 'AUTO_INCREMENT');
    content = content.replace(/DEFAULT now\(\)/g, 'DEFAULT CURRENT_TIMESTAMP');
    
    return content;
  }

  convertDataTypes(content) {
    // Apply type mappings
    for (const [pgType, mysqlType] of Object.entries(this.typeMapping)) {
      const regex = new RegExp(pgType, 'gi');
      content = content.replace(regex, mysqlType);
    }
    
    return content;
  }

  convertFunctions(content) {
    // Convert PostgreSQL functions to MySQL equivalents
    content = content.replace(/gen_random_uuid\(\)/g, 'UUID()');
    content = content.replace(/now\(\)/g, 'NOW()');
    content = content.replace(/CURRENT_TIMESTAMP/g, 'CURRENT_TIMESTAMP');
    
    return content;
  }

  convertSequences(content) {
    // Remove sequence definitions and convert to AUTO_INCREMENT
    content = content.replace(/CREATE SEQUENCE.*?;\n/gs, '');
    content = content.replace(/ALTER SEQUENCE.*?;\n/gs, '');
    content = content.replace(/SELECT setval.*?;\n/gs, '');
    
    // Add AUTO_INCREMENT to primary key columns
    content = content.replace(/(`id` INT) NOT NULL/g, '$1 NOT NULL AUTO_INCREMENT');
    content = content.replace(/(`id` BIGINT) NOT NULL/g, '$1 NOT NULL AUTO_INCREMENT');
    
    return content;
  }

  convertInserts(content) {
    // Convert INSERT statements
    content = content.replace(/INSERT INTO "([^"]+)"/g, 'INSERT INTO `$1`');
    content = content.replace(/'([^']*(?:''[^']*)*)'/g, "'$1'");
    
    // Handle JSON data
    content = content.replace(/'(\{.*?\})'/g, "'$1'");
    
    return content;
  }

  removePostgreSQLStatements(content) {
    // Remove PostgreSQL-specific statements
    const pgStatements = [
      /SET statement_timeout.*?;\n/g,
      /SET lock_timeout.*?;\n/g,
      /SET client_encoding.*?;\n/g,
      /SET standard_conforming_strings.*?;\n/g,
      /SET check_function_bodies.*?;\n/g,
      /SET xmloption.*?;\n/g,
      /SET client_min_messages.*?;\n/g,
      /SET row_security.*?;\n/g,
      /ALTER TABLE.*?OWNER TO.*?;\n/g,
      /GRANT.*?;\n/g,
      /REVOKE.*?;\n/g
    ];
    
    pgStatements.forEach(regex => {
      content = content.replace(regex, '');
    });
    
    return content;
  }

  addMySQLSettings(content) {
    const mysqlFooter = `
SET FOREIGN_KEY_CHECKS=1;
COMMIT;

-- Conversion Notes:
-- 1. All PostgreSQL UUIDs converted to VARCHAR(36)
-- 2. JSONB fields converted to JSON
-- 3. Sequences converted to AUTO_INCREMENT
-- 4. Timestamps converted to DATETIME
-- 5. Boolean fields preserved
`;
    
    return content + mysqlFooter;
  }
}

// CLI Usage
if (import.meta.url === `file://${process.argv[1]}`) {
  const converter = new PostgresToMySQLConverter();
  
  const inputFile = process.argv[2];
  const outputFile = process.argv[3];
  
  if (!inputFile || !outputFile) {
    console.log('Usage: node postgres-to-mysql-converter.js <input.sql> <output.sql>');
    console.log('Example: node postgres-to-mysql-converter.js ienet-backup-20250819.sql ienet-mysql-backup.sql');
    process.exit(1);
  }
  
  if (!fs.existsSync(inputFile)) {
    console.error(`Input file not found: ${inputFile}`);
    process.exit(1);
  }
  
  try {
    converter.convertBackup(inputFile, outputFile);
    console.log(`\nMySQL backup created: ${outputFile}`);
    console.log('Ready for import to MySQL/MariaDB database!');
  } catch (error) {
    console.error('Conversion failed:', error.message);
    process.exit(1);
  }
}

export default PostgresToMySQLConverter;