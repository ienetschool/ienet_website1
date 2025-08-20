#!/bin/bash

echo "Deploying React files to httpdocs - Correct Plesk Path"

# Upload React files directly to httpdocs
scp -r dist/public/* root@5.181.218.15:/var/www/vhosts/vivaindia.com/ienet.online/httpdocs/

# Upload API server to domain root
scp production-server.cjs root@5.181.218.15:/var/www/vhosts/vivaindia.com/ienet.online/

echo "Configuring httpdocs deployment..."
ssh root@5.181.218.15 << 'EOF'

# Go to domain directory
cd /var/www/vhosts/vivaindia.com/ienet.online/

# Install dependencies
npm install mysql2

# Set permissions for httpdocs
chown -R vivaiind:psacln httpdocs/
chmod -R 755 httpdocs/

# Stop existing processes and start API server
pkill -f "production-server.cjs" || true
nohup node production-server.cjs > production.log 2>&1 &

# Verify deployment
echo "Files in httpdocs:"
ls -la httpdocs/
ls -la httpdocs/assets/

echo "API server status:"
ps aux | grep production-server.cjs | grep -v grep

EOF

echo "Deployment to httpdocs complete!"