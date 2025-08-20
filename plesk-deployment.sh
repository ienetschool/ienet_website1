#!/bin/bash

echo "Deploying to Plesk - ienet.online"

# Build fresh application
npm run build

# Upload to the correct Plesk path
scp -r dist/public/* root@5.181.218.15:/var/www/vhosts/vivaindia.com/ienet.online/httpdocs/

# Upload API server
scp production-server.cjs root@5.181.218.15:/var/www/vhosts/vivaindia.com/ienet.online/

echo "Configuring Plesk deployment..."
ssh root@5.181.218.15 << 'EOF'

# Navigate to domain directory
cd /var/www/vhosts/vivaindia.com/ienet.online/

# Stop any existing processes
pkill -f "production-server.cjs" || true

# Install mysql2 in domain directory
npm install mysql2

# Set proper permissions
chown -R vivaiind:psacln httpdocs/
chmod -R 755 httpdocs/

# Start API server from domain directory
nohup node production-server.cjs > production.log 2>&1 &

echo "Plesk deployment complete!"
echo "Files in httpdocs:"
ls -la httpdocs/
ls -la httpdocs/assets/

echo "Domain directory structure:"
ls -la /var/www/vhosts/vivaindia.com/ienet.online/

EOF