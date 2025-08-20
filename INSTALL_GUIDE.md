# Complete Installation Guide - install.js

## 🎯 Universal Configuration File

The **`install.js`** file is your one-stop solution for configuring database, domain, and all related application settings.

## 📋 Configuration Details in install.js

### Database Configuration
```javascript
database: {
  type: 'mysql',
  host: '5.181.218.15',        // Your MySQL server IP
  port: 3306,                  // MySQL port
  user: 'netiedb',            // Database username
  password: 'h5pLF9833',      // Database password
  database: 'ienetdb',        // Database name
  charset: 'utf8mb4',         // Full Unicode support
  ssl: false                  // SSL connection setting
}
```

### Domain Configuration
```javascript
domain: {
  production: 'ienet.online',   // Your production domain
  development: 'localhost:5000', // Development domain
  ssl: true,                    // Enable SSL for production
  www_redirect: false           // Redirect www to non-www
}
```

### Application Settings
```javascript
application: {
  name: 'India Espectacular',         // Site name
  environment: 'production',          // Environment type
  port: 5000,                         // Application port
  session_secret: 'ienet-secure-session-2025',
  jwt_secret: 'ienet-jwt-secret-2025'
}
```

### Contact & Social Media
```javascript
contact: {
  email: 'info.indiaespectacular@gmail.com',
  phone: '+91-9876543210',
  address: 'Mumbai, Maharashtra, India'
},
social: {
  facebook: 'https://facebook.com/IndiaEspectacular',
  twitter: 'https://twitter.com/IndiaEspectacular',
  linkedin: 'https://linkedin.com/company/IndiaEspectacular',
  instagram: 'https://instagram.com/IndiaEspectacular'
}
```

## 🚀 How install.js Works

### 1. Automatic Configuration
- Updates all configuration files with your settings
- Configures database connections
- Sets up environment variables
- Updates application settings

### 2. Files Automatically Updated
- **`drizzle.config.ts`** - Database schema configuration
- **`server/db.ts`** - MySQL database connection
- **`.env.production.example`** - Production environment variables
- **`.env.development.example`** - Development environment variables
- **`site-config.json`** - Application configuration
- **`package.json`** - NPM scripts for deployment
- **`DEPLOYMENT_STATUS.md`** - Installation status

### 3. Database Deployment
- Automatically imports MySQL backup
- Creates all necessary tables
- Verifies database connection
- Sets up health monitoring

## 🔧 Usage Commands

### Run Complete Installation
```bash
node install.js
```

### Test Database Connection
```bash
npm run db:test
```

### Check Database Health
```bash
npm run db:health
```

### Verify Deployment
```bash
npm run deploy:verify
```

### Start Production Server
```bash
npm run start:production
```

## 📁 Generated Files Structure

```
project/
├── install.js                 # Universal configuration manager
├── drizzle.config.ts          # Database schema config
├── server/db.ts              # MySQL connection
├── site-config.json          # Application settings
├── .env.production.example   # Production environment
├── .env.development.example  # Development environment
├── DEPLOYMENT_STATUS.md      # Installation status
└── package.json             # Updated with new scripts
```

## ✏️ How to Modify Configuration

### 1. Edit Database Settings
Open `install.js` and modify the database section:
```javascript
database: {
  host: 'your-new-host',
  port: 3306,
  user: 'your-username',
  password: 'your-password',
  database: 'your-database'
}
```

### 2. Change Domain
Update the domain section:
```javascript
domain: {
  production: 'yournewdomain.com',
  ssl: true
}
```

### 3. Update Contact Information
Modify the contact section:
```javascript
contact: {
  email: 'your-email@domain.com',
  phone: 'your-phone-number',
  address: 'Your Address'
}
```

### 4. Re-run Installation
After making changes, run:
```bash
node install.js
```

## ✅ Installation Success Indicators

After running `node install.js`, you should see:
- ✅ Database connection successful
- ✅ 8 database tables created
- ✅ All configuration files updated
- ✅ Environment files created
- ✅ Package.json scripts added
- ✅ Installation verification complete

## 🎉 Ready for Production

Your application is now fully configured for:
- **Domain:** ienet.online
- **Database:** MySQL (5.181.218.15:3306/ienetdb)
- **Application:** India Espectacular
- **Environment:** Production ready

All settings are centralized in `install.js` for easy management and future updates.