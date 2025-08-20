#!/bin/bash

# Production Deployment Script for ienet.online
# Server: 5.181.218.15
# Document Root: /var/www/vhosts/vivaindia.com/ienet.online

echo "=== IeNet Production Deployment Script ==="

# Server Details
SERVER_IP="5.181.218.15"
SERVER_USER="root"
DOCUMENT_ROOT="/var/www/vhosts/vivaindia.com/ienet.online"
DB_BACKUP="ienet-mysql-backup-complete.sql"

echo "1. Building production application..."
npm run build

echo "2. Creating deployment package..."
tar -czf ienet-production.tar.gz \
  client/ \
  server/ \
  shared/ \
  package.json \
  package-lock.json \
  tsconfig.json \
  vite.config.ts \
  tailwind.config.ts \
  postcss.config.js \
  $DB_BACKUP

echo "3. Uploading files to server..."
echo "Manual step required:"
echo "scp ienet-production.tar.gz root@5.181.218.15:/tmp/"
echo "scp $DB_BACKUP root@5.181.218.15:/tmp/"

echo "4. Server deployment commands:"
echo "ssh root@5.181.218.15"
echo "cd /tmp"
echo "tar -xzf ienet-production.tar.gz -C $DOCUMENT_ROOT"
echo "cd $DOCUMENT_ROOT"

echo "5. Install dependencies:"
echo "curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -"
echo "apt-get install -y nodejs"
echo "npm install"

echo "6. Set up environment:"
echo "cat > .env << 'EOF'"
echo "NODE_ENV=production"
echo "DATABASE_URL=mysql://netiedb:h5pLF9833@localhost:3306/ienetdb"
echo "DB_HOST=localhost"
echo "DB_PORT=3306"
echo "DB_NAME=ienetdb"
echo "DB_USER=netiedb"
echo "DB_PASSWORD=h5pLF9833"
echo "DOMAIN=ienet.online"
echo "PORT=3000"
echo "EOF"

echo "7. Import database:"
echo "mysql -h localhost -u netiedb -p ienetdb < /tmp/$DB_BACKUP"

echo "8. Fix permissions:"
echo "chown -R www-data:www-data $DOCUMENT_ROOT"
echo "chmod -R 755 $DOCUMENT_ROOT"

echo "9. Build and start application:"
echo "npm run build"
echo "npm start"

echo ""
echo "=== Manual Deployment Steps Required ==="
echo "1. Run this script to prepare files: ./deploy-to-production.sh"
echo "2. Upload files: scp ienet-production.tar.gz root@5.181.218.15:/tmp/"
echo "3. SSH to server: ssh root@5.181.218.15"
echo "4. Extract files: tar -xzf /tmp/ienet-production.tar.gz -C $DOCUMENT_ROOT"
echo "5. Install Node.js and dependencies"
echo "6. Import database backup"
echo "7. Configure web server (Apache/Nginx)"
echo "8. Start the application"
echo ""
echo "Your application will be available at: http://www.ienet.online"