# Upload Instructions for ienet.online Production Deployment

## Complete React Application Deployment Package

### Files to Upload to /var/www/ienet.online/

**Core Application:**
- `client/` - React frontend with all components (HeroSlider, ModernHeader, FloatingCTA)
- `server/` - Express backend with API routes
- `shared/` - Shared types and schemas
- `dist/` - Built production files
- `public/` - Static assets

**Configuration:**
- `package.json` - Production dependencies
- `.env.production` - Environment variables
- `drizzle.config.ts` - Database configuration
- `ecosystem.config.js` - PM2 process manager

**Scripts:**
- `start-production.sh` - Application startup script
- `database-migration.js` - Database verification
- `mysql-setup.sql` - Database setup queries

## Step-by-Step Upload Process

### 1. Upload All Files
Upload entire `production-deploy/` folder contents to `/var/www/ienet.online/`

### 2. Set Permissions
```bash
chmod +x start-production.sh
chown -R www-data:www-data /var/www/ienet.online/
```

### 3. Install Dependencies
```bash
cd /var/www/ienet.online
npm install --production
```

### 4. Verify Database
```bash
node database-migration.js
```

### 5. Configure Apache
Copy `apache-vhost.conf` to Apache sites and enable proxy modules:
```bash
a2enmod proxy
a2enmod proxy_http
systemctl restart apache2
```

### 6. Start Application
```bash
# Using PM2 (recommended)
pm2 start ecosystem.config.js
pm2 startup
pm2 save

# Or direct start
NODE_ENV=production node dist/index.js
```

### 7. Test Website
Visit http://ienet.online - should show:
- Top Bar with India Espectacular contact info
- Modern Header with navigation
- Hero Slider with website development content
- About section with company info
- Services grid with 6 service cards
- Testimonials section
- 3 Floating buttons (WhatsApp, Get in Touch, Live Chat)

## Expected Result
Your React development server will run identically on ienet.online with all components working perfectly.