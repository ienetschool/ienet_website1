#!/usr/bin/env node

/**
 * Single-Click MySQL Production Setup
 * Configures the entire project for MySQL production deployment
 */

const fs = require('fs');
const path = require('path');
const MYSQL_CONFIG = require('./mysql-config.js');

class MySQLProductionSetup {
  constructor() {
    this.config = MYSQL_CONFIG;
  }

  async setupProduction() {
    console.log('🚀 Setting up MySQL Production Configuration...');
    console.log(`📊 Database: ${this.config.database}`);
    console.log(`🌐 Domain: ${this.config.domain}`);
    
    try {
      // Step 1: Install MySQL dependencies
      await this.installDependencies();
      
      // Step 2: Update Drizzle configuration
      await this.updateDrizzleConfig();
      
      // Step 3: Update database connection
      await this.updateDatabaseConnection();
      
      // Step 4: Create environment files
      await this.createEnvironmentFiles();
      
      // Step 5: Convert existing backup to MySQL
      await this.convertBackupToMySQL();
      
      // Step 6: Create deployment scripts
      await this.createDeploymentScripts();
      
      console.log('✅ MySQL Production Setup Complete!');
      console.log('\n📋 Next Steps:');
      console.log('1. Run: npm install');
      console.log('2. Import MySQL backup to your database');
      console.log('3. Test connection: npm run test-db');
      console.log('4. Deploy: npm run deploy');
      
    } catch (error) {
      console.error('❌ Setup failed:', error.message);
      process.exit(1);
    }
  }

  async installDependencies() {
    console.log('📦 Installing MySQL dependencies...');
    
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    
    // Add MySQL dependencies
    packageJson.dependencies = {
      ...packageJson.dependencies,
      'mysql2': '^3.6.0',
      'drizzle-orm': '^0.28.6'
    };
    
    // Add useful scripts
    packageJson.scripts = {
      ...packageJson.scripts,
      'db:push:mysql': 'drizzle-kit push:mysql',
      'db:studio': 'drizzle-kit studio',
      'test-db': 'node test-mysql-connection.js',
      'convert-backup': 'node postgres-to-mysql-converter.js',
      'deploy': 'node deploy-to-production.js'
    };
    
    fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));
    console.log('✅ Package.json updated');
  }

  async updateDrizzleConfig() {
    console.log('⚙️ Updating Drizzle configuration...');
    
    const drizzleConfig = `import type { Config } from "drizzle-kit";

export default {
  schema: "./shared/schema.ts",
  out: "./drizzle",
  driver: "mysql2",
  dbCredentials: {
    host: "${this.config.host}",
    user: "${this.config.username}",
    password: "${this.config.password}",
    database: "${this.config.database}",
    port: ${this.config.port},
  },
  verbose: true,
  strict: true,
} satisfies Config;
`;
    
    fs.writeFileSync('drizzle.config.ts', drizzleConfig);
    console.log('✅ Drizzle config updated for MySQL');
  }

  async updateDatabaseConnection() {
    console.log('🔌 Updating database connection...');
    
    const dbConnection = `import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from "@shared/schema";

// MySQL Connection Configuration
const connectionConfig = {
  host: process.env.DB_HOST || '${this.config.host}',
  port: parseInt(process.env.DB_PORT || '${this.config.port}'),
  user: process.env.DB_USER || '${this.config.username}',
  password: process.env.DB_PASSWORD || '${this.config.password}',
  database: process.env.DB_NAME || '${this.config.database}',
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
};

// Create connection pool
export const pool = mysql.createPool({
  ...connectionConfig,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  acquireTimeout: 60000,
  reconnect: true,
});

// Initialize Drizzle with MySQL
export const db = drizzle(pool, { schema });

// Test connection function
export async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('✅ MySQL connection successful');
    connection.release();
    return true;
  } catch (error) {
    console.error('❌ MySQL connection failed:', error.message);
    return false;
  }
}
`;
    
    fs.writeFileSync('server/db.ts', dbConnection);
    console.log('✅ Database connection updated for MySQL');
  }

  async createEnvironmentFiles() {
    console.log('📝 Creating environment files...');
    
    // Production environment
    const prodEnv = `# MySQL Production Environment
DATABASE_URL=${this.config.url}
DB_HOST=${this.config.host}
DB_PORT=${this.config.port}
DB_NAME=${this.config.database}
DB_USER=${this.config.username}
DB_PASSWORD=${this.config.password}
DOMAIN=${this.config.domain}
NODE_ENV=production
PORT=5000

# Security
SESSION_SECRET=your-session-secret-here
JWT_SECRET=your-jwt-secret-here

# External Services
REPLIT_AUTH_CLIENT_ID=your-client-id
REPLIT_AUTH_CLIENT_SECRET=your-client-secret
`;
    
    fs.writeFileSync('.env.production', prodEnv);
    
    // Development environment (existing PostgreSQL)
    const devEnv = `# Development Environment (PostgreSQL)
DATABASE_URL=postgresql://localhost:5432/ienet_dev
NODE_ENV=development
PORT=5000
`;
    
    if (!fs.existsSync('.env.development')) {
      fs.writeFileSync('.env.development', devEnv);
    }
    
    console.log('✅ Environment files created');
  }

  async convertBackupToMySQL() {
    console.log('🔄 Converting PostgreSQL backup to MySQL...');
    
    // Find the latest backup file
    const backupFiles = fs.readdirSync('.')
      .filter(file => file.startsWith('ienet-backup-') && file.endsWith('.sql'))
      .sort()
      .reverse();
    
    if (backupFiles.length === 0) {
      console.log('⚠️ No PostgreSQL backup found, skipping conversion');
      return;
    }
    
    const latestBackup = backupFiles[0];
    const mysqlBackup = latestBackup.replace('.sql', '-mysql.sql');
    
    // Run the converter
    const PostgresToMySQLConverter = require('./postgres-to-mysql-converter.js');
    const converter = new PostgresToMySQLConverter();
    
    converter.convertBackup(latestBackup, mysqlBackup);
    
    console.log(`✅ MySQL backup created: ${mysqlBackup}`);
  }

  async createDeploymentScripts() {
    console.log('🚀 Creating deployment scripts...');
    
    // Test connection script
    const testScript = `#!/usr/bin/env node
const { testConnection } = require('./server/db.ts');

async function main() {
  console.log('Testing MySQL connection...');
  const success = await testConnection();
  process.exit(success ? 0 : 1);
}

main().catch(console.error);
`;
    
    fs.writeFileSync('test-mysql-connection.js', testScript);
    
    // Deployment script
    const deployScript = `#!/usr/bin/env node
const fs = require('fs');
const { exec } = require('child_process');

async function deploy() {
  console.log('🚀 Starting deployment to ${this.config.domain}...');
  
  // Copy production environment
  if (fs.existsSync('.env.production')) {
    fs.copyFileSync('.env.production', '.env');
    console.log('✅ Production environment loaded');
  }
  
  // Install dependencies
  exec('npm install', (error) => {
    if (error) {
      console.error('❌ npm install failed:', error);
      return;
    }
    console.log('✅ Dependencies installed');
    
    // Push database schema
    exec('npm run db:push:mysql', (error) => {
      if (error) {
        console.error('❌ Database push failed:', error);
        return;
      }
      console.log('✅ Database schema updated');
      console.log('🎉 Deployment complete!');
      console.log('🌐 Your site should be available at: https://${this.config.domain}');
    });
  });
}

deploy().catch(console.error);
`;
    
    fs.writeFileSync('deploy-to-production.js', deployScript);
    
    console.log('✅ Deployment scripts created');
  }
}

// Run setup if called directly
if (require.main === module) {
  const setup = new MySQLProductionSetup();
  setup.setupProduction();
}

module.exports = MySQLProductionSetup;