# Quick Start - Deploy React App to ienet.online

## 1. Upload Files
Upload entire `production-deploy/` folder to `/var/www/ienet.online/`

## 2. Install & Start
```bash
cd /var/www/ienet.online
npm install --production
pm2 start ecosystem.config.js
```

## 3. Configure Apache
```bash
# Enable proxy modules
a2enmod proxy proxy_http
# Add virtual host from apache-vhost.conf
# Restart Apache
systemctl restart apache2
```

## 4. Verify
Visit http://ienet.online - should show your React app with:
- HeroSlider, ModernHeader, FloatingCTA
- All components from development server
- MySQL database with 1,328 pages

## Result: 
Identical React development server running on production domain