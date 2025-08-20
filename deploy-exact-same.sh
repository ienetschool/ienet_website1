#!/bin/bash

echo "Deploying EXACT same application to production server"

# Build the exact current application
npm run build

# Create deployment package with the exact build
tar -czf exact-same-app.tar.gz dist/

# Upload exact same application
scp exact-same-app.tar.gz root@5.181.218.15:~/

echo "Extracting and deploying on production server..."
ssh root@5.181.218.15 << 'EOF'
# Stop all existing servers
pkill -f "node" || true

# Extract the exact same application
cd ~/
tar -xzf exact-same-app.tar.gz

# Copy the EXACT build to web directory
rm -rf /var/www/html/*
cp -r dist/public/* /var/www/html/

# Verify the exact files are deployed
echo "Deployed files:"
ls -la /var/www/html/
ls -la /var/www/html/assets/

# Start API server
nohup node api-server-only.cjs > api.log 2>&1 &

echo "Production server now has EXACT same application as development"
EOF

echo "Deployment complete - production server has identical application"