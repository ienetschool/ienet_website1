#!/bin/bash

echo "Uploading React files to httpdocs folder"

# Upload React files directly to httpdocs
scp -r dist/public/* root@5.181.218.15:/var/www/vhosts/vivaindia.com/ienet.online/httpdocs/

# Upload API server
scp production-server.cjs root@5.181.218.15:/var/www/vhosts/vivaindia.com/ienet.online/

echo "Configuring on server..."
ssh root@5.181.218.15 << 'EOF'
# Go to domain directory
cd /var/www/vhosts/vivaindia.com/ienet.online/

# Install mysql2
npm install mysql2

# Set proper permissions for httpdocs
chown -R vivaiind:psacln httpdocs/
chmod -R 755 httpdocs/

# Start API server
pkill -f "production-server.cjs" || true
nohup node production-server.cjs > production.log 2>&1 &

# Verify files
echo "Files in httpdocs:"
ls -la httpdocs/
ls -la httpdocs/assets/

echo "API server status:"
ps aux | grep production-server.cjs | grep -v grep

EOF