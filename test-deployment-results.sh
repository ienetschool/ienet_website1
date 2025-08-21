#!/bin/bash

echo "🧪 TESTING PRODUCTION DEPLOYMENT RESULTS"
echo "========================================="

echo "📋 Server Status Check:"
ssh -o StrictHostKeyChecking=no root@5.181.218.15 << 'EOF'
cd /var/www/vhosts/vivaindia.com/ienet.online
echo "Files in web directory:"
ls -la | head -10

echo ""
echo "Node.js processes:"
ps aux | grep node | grep -v grep

echo ""
echo "Server log (last 10 lines):"
if [ -f server.log ]; then
  tail -10 server.log
else
  echo "No server.log found"
fi
EOF

echo ""
echo "🌐 Website Response Tests:"
echo "Home page status:"
curl -o /dev/null -s -w "%{http_code}\n" https://www.ienet.online

echo "Contact page status:"  
curl -o /dev/null -s -w "%{http_code}\n" https://www.ienet.online/contact

echo "Privacy page status:"
curl -o /dev/null -s -w "%{http_code}\n" https://www.ienet.online/privacy

echo "Terms page status:"
curl -o /dev/null -s -w "%{http_code}\n" https://www.ienet.online/terms

echo "NEW Refund page status:"
curl -o /dev/null -s -w "%{http_code}\n" https://www.ienet.online/refund

echo ""
echo "🔍 Content Verification:"
echo "Checking if updates are live..."

# Check contact page title
contact_content=$(curl -s https://www.ienet.online/contact)
if echo "$contact_content" | grep -q "Contact IeNet"; then
    echo "✅ Contact page shows 'Contact IeNet'"
else
    echo "❌ Contact page still shows old title"
fi

# Check privacy page
privacy_content=$(curl -s https://www.ienet.online/privacy)
if echo "$privacy_content" | grep -q "India Espectacular"; then
    echo "✅ Privacy page shows 'India Espectacular'"
else
    echo "❌ Privacy page not updated"
fi

echo ""
echo "📍 Address Check:"
if echo "$contact_content" | grep -q "101 SIYOL NAGAR"; then
    echo "✅ India office address updated"
else
    echo "❌ India office address not updated"
fi