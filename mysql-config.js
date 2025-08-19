// MySQL Database Configuration for ienet.online
// Single-click configuration file for production deployment

const MYSQL_CONFIG = {
  // Production Database Configuration
  host: '5.181.218.15',
  port: 3306,
  database: 'ienetdb',
  username: 'netiedb',
  password: 'h5pLF9833',
  
  // Connection URL
  url: 'mysql://netiedb:h5pLF9833@5.181.218.15:3306/ienetdb',
  
  // Domain Configuration
  domain: 'ienet.online',
  
  // SSL Configuration (recommended for production)
  ssl: {
    rejectUnauthorized: false // Set to true in production with proper SSL
  },
  
  // Connection Pool Settings
  pool: {
    min: 2,
    max: 10,
    acquireTimeout: 60000,
    timeout: 60000,
    reconnect: true,
    reconnectDelay: 2000
  },
  
  // Environment Variables for Production
  envVars: {
    DATABASE_URL: 'mysql://netiedb:h5pLF9833@5.181.218.15:3306/ienetdb',
    DB_HOST: '5.181.218.15',
    DB_PORT: '3306',
    DB_NAME: 'ienetdb',
    DB_USER: 'netiedb',
    DB_PASSWORD: 'h5pLF9833',
    DOMAIN: 'ienet.online',
    NODE_ENV: 'production'
  },
  
  // Drizzle Configuration
  drizzleConfig: {
    driver: 'mysql2',
    schema: './shared/schema.ts',
    out: './drizzle/migrations',
    breakpoints: true
  }
};

module.exports = MYSQL_CONFIG;

// Quick Setup Instructions:
// 1. Run: npm install mysql2 drizzle-orm@latest
// 2. Update drizzle.config.ts with MySQL configuration
// 3. Update server/db.ts to use MySQL connection
// 4. Run database migration: npm run db:push
// 5. Import converted MySQL backup file