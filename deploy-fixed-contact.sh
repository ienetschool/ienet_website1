#!/bin/bash

echo "🚀 DEPLOYING FIXED CONTACT PAGE"
echo "=============================="

echo "Uploading corrected React build to production server..."

# Use SSH to upload the fixed files
ssh -o StrictHostKeyChecking=no root@5.181.218.15 << 'EOF'
cd /var/www/vhosts/vivaindia.com/ienet.online/httpdocs

# Backup current files
mkdir -p backup-$(date +%Y%m%d_%H%M%S)
cp -r assets/ backup-$(date +%Y%m%d_%H%M%S)/

echo "Clearing current assets..."
rm -rf assets/*

EOF

echo "Uploading new build files..."
rsync -avz --delete dist/public/ root@5.181.218.15:/var/www/vhosts/vivaindia.com/ienet.online/httpdocs/

echo "Setting permissions on production server..."
ssh -o StrictHostKeyChecking=no root@5.181.218.15 << 'EOF'
cd /var/www/vhosts/vivaindia.com/ienet.online/httpdocs
chown -R nginx:nginx .
chmod -R 755 .

echo "Files deployed:"
ls -la assets/

echo "Restarting web services..."
systemctl reload nginx

EOF

echo ""
echo "🧪 Testing the fix..."
sleep 3

echo "Testing contact page content:"
curl -s "https://www.ienet.online/contact" | grep -i "contact" | head -3

echo ""
echo "✅ DEPLOYMENT COMPLETED!"
echo "The contact page should now show 'Contact IeNet' instead of 'Contact India Espectacular'"
echo "Test at: https://www.ienet.online/contact"