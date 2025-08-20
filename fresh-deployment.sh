#!/bin/bash

echo "Fresh deployment - clearing and uploading working files"

# Create fresh build
npm run build

# Upload fresh files to server
scp -r dist/public/* root@5.181.218.15:/tmp/fresh-deploy/

# Execute deployment on server
ssh root@5.181.218.15 << 'EOF'
# Stop all servers
pkill -f "node" || true

# Clear everything
rm -rf /var/www/html/*

# Copy fresh working files
cp -r /tmp/fresh-deploy/* /var/www/html/

# Verify deployment
echo "Fresh files deployed:"
ls -la /var/www/html/
ls -la /var/www/html/assets/

# Check index.html content
head -5 /var/www/html/index.html

# Start fresh API server
nohup node ~/api-server-only.cjs > ~/api.log 2>&1 &

echo "Fresh deployment complete - same application as development"
EOF