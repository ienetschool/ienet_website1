# IeNet Production Deployment Instructions

## Upload Files
1. Upload all files from production-deploy/ to /var/www/ienet.online/

## Install Dependencies
```bash
cd /var/www/ienet.online
npm install --production
```

## Configure Apache
1. Copy apache-vhost.conf to Apache sites-available
2. Enable the site and restart Apache

## Start Application
```bash
# Option 1: Direct start
NODE_ENV=production node dist/index.js

# Option 2: Using PM2 (recommended)
pm2 start ecosystem.config.js
pm2 startup
pm2 save
```

## Verify Deployment
- Visit http://ienet.online
- Should show React application with HeroSlider, ModernHeader, FloatingCTA
- Database should be connected with 1,328 pages
