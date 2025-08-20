#!/bin/bash

echo "Deploying to Production Server: ienet.online"
echo "File path: /var/www/vhosts/vivaindia.com/ienet.online"

# Build fresh application
npm run build

# Create production package
tar -czf production-deploy.tar.gz dist/ production-server.cjs

# Deploy to production server
scp production-deploy.tar.gz root@5.181.218.15:~/
scp production-server.cjs root@5.181.218.15:~/

echo "Configuring production server..."
ssh root@5.181.218.15 << 'EOF'

# Stop existing processes
pkill -f "node" || true

# Extract fresh application
cd ~/
tar -xzf production-deploy.tar.gz

# Deploy to correct file path
mkdir -p /var/www/vhosts/vivaindia.com/ienet.online
rm -rf /var/www/vhosts/vivaindia.com/ienet.online/*
cp -r dist/public/* /var/www/vhosts/vivaindia.com/ienet.online/

# Install mysql2 if needed
npm install mysql2 --save

# Start production server
nohup node production-server.cjs > production.log 2>&1 &

echo "Production deployment complete!"
echo "Website: https://www.ienet.online"
echo "API Server: Port 3001"
echo "Database: MariaDB (ienetdb)"

# Test deployment
ls -la /var/www/vhosts/vivaindia.com/ienet.online/
ls -la /var/www/vhosts/vivaindia.com/ienet.online/assets/

EOF