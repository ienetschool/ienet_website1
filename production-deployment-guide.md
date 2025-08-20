# Production Deployment Guide - ienet.online

## Database Backup Details

### Main Backup File: `ienet-mysql-backup-complete.sql`
**Size:** 10.7 KB  
**Format:** MySQL/MariaDB compatible  
**Tables:** 8 core tables with full data structure  
**Content:**
- Service categories (10 entries)
- Services (ready for 116+ entries)
- Features (structure for 1160+ entries)
- Projects (3 sample projects)
- Testimonials (2 client testimonials)
- Users (admin structure)
- Enquiries (contact form structure)
- Site settings (India Espectacular branding)

### Table Structure Overview:
```sql
service_categories  - Main service categories (Website Design, Mobile Apps, etc.)
services           - Individual services under each category
features           - Detailed features for each service
projects           - Portfolio showcase projects
testimonials       - Client testimonials and reviews
users              - Admin and user management
enquiries          - Contact form submissions
site_settings      - Site configuration and branding
```

## Database Deployment Instructions

### Step 1: Connect to Your MySQL Server
```bash
mysql -h 5.181.218.15 -u netiedb -p
# Enter password: h5pLF9833
```

### Step 2: Create/Verify Database
```sql
CREATE DATABASE IF NOT EXISTS ienetdb CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE ienetdb;
SHOW TABLES;
```

### Step 3: Import Backup File
```bash
# From command line (recommended)
mysql -h 5.181.218.15 -u netiedb -p ienetdb < ienet-mysql-backup-complete.sql

# Or from MySQL prompt
SOURCE ienet-mysql-backup-complete.sql;
```

### Step 4: Verify Import
```sql
SHOW TABLES;
SELECT COUNT(*) FROM service_categories;
SELECT * FROM site_settings WHERE `key` = 'site_name';
DESCRIBE services;
```

## Expected Output After Import:
- 8 tables created successfully
- 10 service categories imported
- Site settings with "India Espectacular" branding
- Sample projects and testimonials
- Clean database structure ready for production

## Configuration Files Created

### 1. Database Connection (`server/db-mysql.ts`)
Production-ready MySQL connection with:
- Connection pooling (10 connections)
- Auto-reconnect functionality
- Health check capabilities
- Error handling and logging

### 2. Environment Configuration (`.env` setup needed)
Required environment variables:
```env
DATABASE_URL=mysql://netiedb:h5pLF9833@5.181.218.15:3306/ienetdb
DB_HOST=5.181.218.15
DB_PORT=3306
DB_NAME=ienetdb
DB_USER=netiedb
DB_PASSWORD=h5pLF9833
DOMAIN=ienet.online
NODE_ENV=production
```

### 3. Drizzle Configuration (`drizzle.config.ts`)
Database schema management configured for:
- MySQL2 driver
- Production database credentials
- Migration management
- Schema synchronization

## Deployment Process

### Automated Deployment:
```bash
# Run the deployment script
chmod +x deploy-mysql-production.sh
./deploy-mysql-production.sh
```

### Manual Deployment:
1. Import database backup
2. Install MySQL dependencies: `npm install mysql2 drizzle-orm`
3. Update application to use MySQL connection
4. Set environment variables
5. Test connection: `node test-mysql-connection.js`
6. Deploy to production

## Domain Configuration
- **Production Domain:** ienet.online
- **Database Host:** 5.181.218.15:3306
- **SSL:** Configured for production security
- **Character Set:** UTF8MB4 (full Unicode support)

## Post-Deployment Verification
1. Database connection test passes
2. All tables imported correctly
3. Sample data displays properly
4. Application loads on ienet.online
5. Contact forms save to database
6. Admin panel accessible

Your database is now ready for production deployment on ienet.online!