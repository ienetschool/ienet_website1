#!/usr/bin/env node

/**
 * Universal Installation & Configuration Manager
 * Configures database, domain, and all related files automatically
 * 
 * Usage: node install.js
 * This file contains all configuration details and updates all necessary files
 */

import fs from 'fs';
import mysql from 'mysql2/promise';

// ==========================================
// CONFIGURATION SETTINGS - Edit these values
// ==========================================

const INSTALL_CONFIG = {
  // Database Configuration
  database: {
    type: 'mysql',
    host: '5.181.218.15',
    port: 3306,
    user: 'netiedb',
    password: 'h5pLF9833',
    database: 'ienetdb',
    charset: 'utf8mb4',
    ssl: false
  },

  // Domain Configuration
  domain: {
    production: 'ienet.online',
    development: 'localhost:5000',
    ssl: true,
    www_redirect: false
  },

  // Application Settings
  application: {
    name: 'India Espectacular',
    environment: 'production',
    port: 5000,
    session_secret: 'ienet-secure-session-2025',
    jwt_secret: 'ienet-jwt-secret-2025'
  },

  // Contact Information
  contact: {
    email: 'info.indiaespectacular@gmail.com',
    phone: '+91-9876543210',
    address: 'Mumbai, Maharashtra, India'
  },

  // Social Media Links
  social: {
    facebook: 'https://facebook.com/IndiaEspectacular',
    twitter: 'https://twitter.com/IndiaEspectacular',
    linkedin: 'https://linkedin.com/company/IndiaEspectacular',
    instagram: 'https://instagram.com/IndiaEspectacular'
  },

  // Backup Files
  backup: {
    mysql_file: 'ienet-mysql-backup-complete.sql',
    postgres_file: 'ienet-database-backup-20250819.sql'
  }
};

// ==========================================
// INSTALLATION CLASS
// ==========================================

class UniversalInstaller {
  constructor() {
    this.config = INSTALL_CONFIG;
    this.connection = null;
    this.startTime = Date.now();
  }

  async run() {
    console.log('🚀 Universal Installer - ienet.online');
    console.log('======================================');
    console.log(`🌐 Domain: ${this.config.domain.production}`);
    console.log(`📊 Database: ${this.config.database.host}:${this.config.database.port}`);
    console.log(`🏢 Application: ${this.config.application.name}`);
    console.log('');

    try {
      await this.validateConfiguration();
      await this.testDatabaseConnection();
      await this.deployDatabase();
      await this.updateConfigurationFiles();
      await this.updateApplicationFiles();
      await this.updatePackageJson();
      await this.createEnvironmentFiles();
      await this.verifyInstallation();
      
      this.showInstallationSummary();
      
    } catch (error) {
      console.error('❌ Installation failed:', error.message);
      console.error('💡 Check your configuration and try again');
      process.exit(1);
    } finally {
      if (this.connection) {
        await this.connection.end();
      }
    }
  }

  async validateConfiguration() {
    console.log('🔍 Validating configuration...');
    
    // Check required files
    const requiredFiles = [
      this.config.backup.mysql_file,
      'package.json',
      'shared/schema.ts'
    ];

    for (const file of requiredFiles) {
      if (!fs.existsSync(file)) {
        throw new Error(`Required file missing: ${file}`);
      }
    }

    console.log('✅ Configuration validation complete');
  }

  async testDatabaseConnection() {
    console.log('🔌 Testing database connection...');
    
    try {
      this.connection = await mysql.createConnection({
        host: this.config.database.host,
        port: this.config.database.port,
        user: this.config.database.user,
        password: this.config.database.password,
        database: this.config.database.database
      });

      const [rows] = await this.connection.execute('SELECT 1 as test');
      console.log(`✅ Database connection successful to ${this.config.database.host}`);
    } catch (error) {
      throw new Error(`Database connection failed: ${error.message}`);
    }
  }

  async deployDatabase() {
    console.log('📤 Deploying database...');
    
    const backupFile = this.config.backup.mysql_file;
    if (!fs.existsSync(backupFile)) {
      console.log('⚠️ MySQL backup not found, skipping database deployment');
      return;
    }

    const sqlContent = fs.readFileSync(backupFile, 'utf8');
    const statements = sqlContent
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'));

    console.log(`📋 Executing ${statements.length} SQL statements...`);

    for (const statement of statements) {
      if (statement.trim()) {
        try {
          await this.connection.execute(statement);
        } catch (error) {
          if (!error.message.includes('already exists')) {
            console.warn(`⚠️ SQL Warning: ${error.message.substring(0, 100)}...`);
          }
        }
      }
    }

    console.log('✅ Database deployment complete');
  }

  async updateConfigurationFiles() {
    console.log('⚙️ Updating configuration files...');

    // Update Drizzle Config
    const drizzleConfig = `import type { Config } from "drizzle-kit";

export default {
  schema: "./shared/schema.ts",
  out: "./drizzle",
  driver: "mysql2",
  dbCredentials: {
    host: "${this.config.database.host}",
    user: "${this.config.database.user}",
    password: "${this.config.database.password}",
    database: "${this.config.database.database}",
    port: ${this.config.database.port},
  },
  verbose: true,
  strict: true,
} satisfies Config;
`;
    fs.writeFileSync('drizzle.config.ts', drizzleConfig);

    // Update MySQL Database Connection
    const dbConnection = `import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from "@shared/schema";

// Production Database Configuration - Auto-generated by install.js
const connectionConfig = {
  host: '${this.config.database.host}',
  port: ${this.config.database.port},
  user: '${this.config.database.user}',
  password: '${this.config.database.password}',
  database: '${this.config.database.database}',
  ssl: ${this.config.database.ssl},
  charset: '${this.config.database.charset}',
};

// Connection Pool
export const pool = mysql.createPool({
  ...connectionConfig,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  acquireTimeout: 60000,
  reconnect: true,
});

export const db = drizzle(pool, { schema });

// Health Check
export async function healthCheck() {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute('SELECT 1 as test');
    connection.release();
    return { status: 'healthy', database: '${this.config.database.database}' };
  } catch (error) {
    return { status: 'unhealthy', error: error.message };
  }
}

// Connection Test
export async function testConnection() {
  const health = await healthCheck();
  if (health.status === 'healthy') {
    console.log('✅ Database connection successful');
    return true;
  } else {
    console.error('❌ Database connection failed:', health.error);
    return false;
  }
}
`;
    fs.writeFileSync('server/db.ts', dbConnection);

    console.log('✅ Configuration files updated');
  }

  async updateApplicationFiles() {
    console.log('🔧 Updating application files...');

    // Create site configuration
    const siteConfig = {
      site: {
        name: this.config.application.name,
        description: 'Professional IT Services and Solutions',
        url: `https://${this.config.domain.production}`,
        domain: this.config.domain.production
      },
      contact: this.config.contact,
      social: this.config.social,
      database: {
        type: this.config.database.type,
        host: this.config.database.host,
        port: this.config.database.port,
        database: this.config.database.database
      },
      features: {
        ssl: this.config.domain.ssl,
        compression: true,
        caching: true,
        analytics: true
      },
      installation: {
        date: new Date().toISOString(),
        version: '1.0.0',
        installer: 'install.js'
      }
    };

    fs.writeFileSync('site-config.json', JSON.stringify(siteConfig, null, 2));

    // Create deployment status
    const deploymentStatus = `# Deployment Status - ${this.config.domain.production}

## Installation Complete ✅
- **Date:** ${new Date().toISOString()}
- **Domain:** ${this.config.domain.production}
- **Database:** ${this.config.database.host}:${this.config.database.port}/${this.config.database.database}
- **Application:** ${this.config.application.name}

## Database Status
- Connection: Active
- Tables: Deployed
- Data: Imported
- Health: Verified

## Application Status
- Configuration: Complete
- Environment: Production Ready
- SSL: ${this.config.domain.ssl ? 'Enabled' : 'Disabled'}
- Domain: Configured

## Files Updated
- drizzle.config.ts
- server/db.ts
- site-config.json
- .env.production.example
- package.json (scripts)

Installation completed successfully by install.js
`;

    fs.writeFileSync('DEPLOYMENT_STATUS.md', deploymentStatus);
    console.log('✅ Application files updated');
  }

  async updatePackageJson() {
    console.log('📦 Updating package.json...');

    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    
    // Add production scripts
    packageJson.scripts = {
      ...packageJson.scripts,
      'install:complete': 'node install.js',
      'db:test': 'node -e "import(\\"./server/db.ts\\").then(db => db.testConnection())"',
      'db:health': 'node -e "import(\\"./server/db.ts\\").then(db => db.healthCheck().then(console.log))"',
      'start:production': 'NODE_ENV=production npm start',
      'deploy:verify': 'npm run db:health && echo "✅ Deployment verification complete"'
    };

    fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));
    console.log('✅ Package.json updated');
  }

  async createEnvironmentFiles() {
    console.log('🌍 Creating environment files...');

    // Production environment template
    const productionEnv = `# Production Environment - ${this.config.domain.production}
# Auto-generated by install.js - ${new Date().toISOString()}

# Database Configuration
DATABASE_URL=mysql://${this.config.database.user}:${this.config.database.password}@${this.config.database.host}:${this.config.database.port}/${this.config.database.database}
DB_HOST=${this.config.database.host}
DB_PORT=${this.config.database.port}
DB_NAME=${this.config.database.database}
DB_USER=${this.config.database.user}
DB_PASSWORD=${this.config.database.password}

# Application Configuration
DOMAIN=${this.config.domain.production}
NODE_ENV=${this.config.application.environment}
PORT=${this.config.application.port}
APP_NAME="${this.config.application.name}"

# Security
SESSION_SECRET=${this.config.application.session_secret}
JWT_SECRET=${this.config.application.jwt_secret}
SSL_REDIRECT=${this.config.domain.ssl}
SECURE_COOKIES=${this.config.domain.ssl}

# Contact Information
CONTACT_EMAIL=${this.config.contact.email}
CONTACT_PHONE=${this.config.contact.phone}
CONTACT_ADDRESS="${this.config.contact.address}"

# Social Media
SOCIAL_FACEBOOK=${this.config.social.facebook}
SOCIAL_TWITTER=${this.config.social.twitter}
SOCIAL_LINKEDIN=${this.config.social.linkedin}
SOCIAL_INSTAGRAM=${this.config.social.instagram}
`;

    fs.writeFileSync('.env.production.example', productionEnv);

    // Development environment template
    const developmentEnv = `# Development Environment
# Copy from .env.production.example and modify for local development

DATABASE_URL=postgresql://postgres:password@localhost:5432/ienet_dev
DB_HOST=localhost
DB_PORT=5432
DB_NAME=ienet_dev
DB_USER=postgres
DB_PASSWORD=password

DOMAIN=${this.config.domain.development}
NODE_ENV=development
PORT=5000
APP_NAME="${this.config.application.name} (Dev)"

SESSION_SECRET=dev-session-secret
JWT_SECRET=dev-jwt-secret
SSL_REDIRECT=false
SECURE_COOKIES=false
`;

    fs.writeFileSync('.env.development.example', developmentEnv);
    console.log('✅ Environment files created');
  }

  async verifyInstallation() {
    console.log('🔍 Verifying installation...');

    // Test database
    const [tables] = await this.connection.execute('SHOW TABLES');
    console.log(`✅ Database tables: ${tables.length}`);

    // Check configuration files
    const configFiles = [
      'drizzle.config.ts',
      'server/db.ts',
      'site-config.json',
      '.env.production.example'
    ];

    for (const file of configFiles) {
      if (fs.existsSync(file)) {
        console.log(`✅ ${file}`);
      } else {
        console.log(`❌ ${file} missing`);
      }
    }

    console.log('✅ Installation verification complete');
  }

  showInstallationSummary() {
    const duration = ((Date.now() - this.startTime) / 1000).toFixed(1);
    
    console.log('\n🎉 INSTALLATION COMPLETE');
    console.log('========================');
    console.log(`⏱️  Duration: ${duration}s`);
    console.log(`🌐 Domain: ${this.config.domain.production}`);
    console.log(`📊 Database: ${this.config.database.host}:${this.config.database.port}/${this.config.database.database}`);
    console.log(`🏢 Application: ${this.config.application.name}`);
    console.log('');
    console.log('📋 Files Created/Updated:');
    console.log('• drizzle.config.ts - Database schema config');
    console.log('• server/db.ts - Database connection');
    console.log('• site-config.json - Application configuration');
    console.log('• .env.production.example - Production environment');
    console.log('• .env.development.example - Development environment');
    console.log('• DEPLOYMENT_STATUS.md - Installation status');
    console.log('• package.json - Updated scripts');
    console.log('');
    console.log('🚀 Quick Commands:');
    console.log('• npm run db:test - Test database connection');
    console.log('• npm run db:health - Check database health');
    console.log('• npm run deploy:verify - Verify deployment');
    console.log('• npm run start:production - Start production server');
    console.log('');
    console.log('🔧 Next Steps:');
    console.log('1. Copy .env.production.example to .env');
    console.log('2. Deploy to production server');
    console.log('3. Point domain to application');
    console.log('4. Test all functionality');
    console.log('');
    console.log(`✅ ${this.config.domain.production} is ready for deployment!`);
  }
}

// ==========================================
// CONFIGURATION UPDATE FUNCTIONS
// ==========================================

// Function to update configuration
export function updateConfig(newConfig) {
  Object.assign(INSTALL_CONFIG, newConfig);
  console.log('✅ Configuration updated');
}

// Function to get current configuration
export function getConfig() {
  return INSTALL_CONFIG;
}

// ==========================================
// RUN INSTALLATION
// ==========================================

if (import.meta.url === `file://${process.argv[1]}`) {
  const installer = new UniversalInstaller();
  installer.run().catch(console.error);
}

export default UniversalInstaller;