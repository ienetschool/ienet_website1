#!/bin/bash

echo "🚀 DEPLOYING TO HTTPDOCS DIRECTORY"
echo "================================="

# Upload to the correct httpdocs directory where the website is served from
sshpass -p '&8KXC4D+Ojfhuu0LSMhE' ssh -o StrictHostKeyChecking=no root@5.181.218.15 << 'EOF'

cd /var/www/vhosts/vivaindia.com/ienet.online

# Create httpdocs if it doesn't exist
mkdir -p httpdocs

# Clear old files from httpdocs
echo "Clearing old files from httpdocs..."
rm -rf httpdocs/*

echo "Current files to copy:"
ls -la

# Copy all React build files to httpdocs
echo "Copying React build files to httpdocs..."
if [ -f "index.html" ]; then
    cp index.html httpdocs/
    echo "✅ index.html copied"
fi

if [ -d "assets" ]; then
    cp -r assets/ httpdocs/
    echo "✅ assets/ directory copied"
fi

if [ -f "IE vector logo-01_1755535165852.png" ]; then
    cp "IE vector logo-01_1755535165852.png" httpdocs/
    echo "✅ Logo file copied"
fi

# Set proper permissions
chown -R www-data:www-data httpdocs/
chmod -R 755 httpdocs/

echo ""
echo "Files now in httpdocs:"
ls -la httpdocs/

echo ""
echo "Testing website response:"
curl -I http://localhost/

echo ""
echo "✅ Website files deployed to httpdocs!"
echo "The website should now show the updated content."

EOF

echo ""
echo "🧪 Testing production website..."
sleep 2

# Test the actual website
echo "Home page status:"
curl -o /dev/null -s -w "%{http_code}\n" https://www.ienet.online

echo "Contact page content check:"
contact_response=$(curl -s https://www.ienet.online/contact)
if echo "$contact_response" | grep -q "Contact IeNet"; then
    echo "✅ Contact page shows 'Contact IeNet'"
elif echo "$contact_response" | grep -q "Contact India Espectacular"; then
    echo "❌ Still shows 'Contact India Espectacular' - cache issue"
else
    echo "❓ Contact page content unclear"
fi

echo ""
echo "🎉 DEPLOYMENT TO HTTPDOCS COMPLETED!"
echo "Clear your browser cache and test: https://www.ienet.online/contact"