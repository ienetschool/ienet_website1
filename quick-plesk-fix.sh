#!/bin/bash

echo "Quick Plesk Fix - Upload to httpdocs"

# The issue is files need to be in httpdocs directory for Plesk
ssh root@5.181.218.15 << 'EOF'

# Navigate to correct Plesk path
cd /var/www/vhosts/vivaindia.com/ienet.online/

# Create httpdocs if not exists
mkdir -p httpdocs

# Move files from wrong location to correct httpdocs
if [ -d "/var/www/html" ]; then
  cp -r /var/www/html/* httpdocs/ 2>/dev/null || true
fi

# Check if we need to copy from home directory
if [ -f "~/dist/public/index.html" ]; then
  cp -r ~/dist/public/* httpdocs/
fi

# Set correct permissions
chown -R vivaiind:psacln httpdocs/
chmod -R 755 httpdocs/

# Verify files are in place
echo "Files in httpdocs:"
ls -la httpdocs/
ls -la httpdocs/assets/ 2>/dev/null || echo "Assets directory not found"

echo "Plesk fix complete - files now in httpdocs/"

EOF