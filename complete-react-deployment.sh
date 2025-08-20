#!/bin/bash

echo "🔧 Deploying Complete React Application to Root Domain"
echo "📍 Target: /var/www/html/ (served by Nginx at ienet.online)"

# Upload the complete React build
echo "📦 Uploading complete React application..."
scp -r dist/public/* root@5.181.218.15:/var/www/html/

# Verify deployment on server
ssh root@5.181.218.15 << 'EOF'
echo "📂 Verifying React deployment..."
ls -la /var/www/html/
echo ""
echo "📄 Checking main files..."
ls -la /var/www/html/index.html
ls -la /var/www/html/assets/

echo ""
echo "🧪 Testing website..."
curl -s http://localhost/ | head -5

echo ""
echo "✅ Complete React deployment finished!"
echo "🌍 Website available at: http://ienet.online"
echo "🌍 Website available at: https://www.ienet.online"
EOF

echo ""
echo "🎉 Deployment Complete!"
echo "Your website now serves the SAME React application as development"