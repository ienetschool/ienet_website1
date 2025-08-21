#!/bin/bash

# Production Server Details
SERVER_IP="5.181.218.15"
SERVER_USER="root" 
SERVER_PATH="/var/www/vhosts/vivaindia.com/ienet.online"

echo "Uploading fixed server file to production..."

# Upload the fixed server file
scp -o StrictHostKeyChecking=no EXACT_SAME_PRODUCTION_SERVER.cjs root@${SERVER_IP}:${SERVER_PATH}/mysql-production-server.cjs

# Connect and restart the server
ssh -o StrictHostKeyChecking=no root@${SERVER_IP} << EOF
cd ${SERVER_PATH}
echo "Current directory: \$(pwd)"
echo "Stopping old server..."
pkill -f node
echo "Starting new server..."
nohup node mysql-production-server.cjs > server.log 2>&1 &
echo "Server started. Checking process..."
sleep 2
ps aux | grep node
echo "Checking server log..."
tail -5 server.log
EOF

echo "Upload and restart complete!"