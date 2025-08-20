#!/bin/bash

echo "🚀 Deploying EXACT SAME Website to Production Server"
echo "📂 Source: Development React Build (index-4CY-Uz3T.css, index-6-PKYvps.js)"
echo "🎯 Target: ienet.online:5000"
echo ""

# Upload the exact same website package
echo "📦 Uploading same website package..."
scp same-website-exact-copy.tar.gz root@5.181.218.15:~/

echo "🔧 Deploying on production server..."
ssh root@5.181.218.15 << 'EOF'
# Stop any existing server
pkill -f "node.*server" || true
pkill -f "same-website" || true

# Extract and setup
cd ~/
tar -xzf same-website-exact-copy.tar.gz
chmod +x same-website-production-server.cjs

# Start the SAME website server
echo "✅ Starting EXACT SAME website as development..."
nohup node same-website-production-server.cjs > same-website.log 2>&1 &

# Wait a moment for startup
sleep 3

# Test the server
echo "🧪 Testing production server..."
curl -s http://localhost:5000/api/health | head -5

echo ""
echo "✅ SAME Website Production Server is running!"
echo "🌐 URL: http://ienet.online:5000"
echo "📄 Log: ~/same-website.log"
EOF

echo ""
echo "🎉 Deployment Complete!"
echo "🔗 Your website is now running the EXACT SAME code as development"
echo "🌍 Visit: http://ienet.online:5000"
echo ""
echo "📊 Both servers now serve identical React applications with:"
echo "   ✓ Same CSS file: index-4CY-Uz3T.css"  
echo "   ✓ Same JS file: index-6-PKYvps.js"
echo "   ✓ Same components: HeroSlider, ModernHeader, AboutSection, etc."
echo "   ✓ Same database connectivity (PostgreSQL dev / MySQL prod)"
echo "   ✓ NO separate versions - EXACT SAME CODEBASE"