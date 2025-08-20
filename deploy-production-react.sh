#!/bin/bash

# Production Deployment Script for IeNet React Application
echo "🚀 Deploying IeNet React Application to Production..."

# Create deployment package with all necessary files
echo "📦 Creating comprehensive deployment package..."

# Remove any existing deployment
rm -rf production-ready-deploy
mkdir -p production-ready-deploy/dist
mkdir -p production-ready-deploy/public/assets

# Copy startup file
cp final-plesk-structure/dist/index.js production-ready-deploy/dist/

# Copy package.json
cp final-plesk-structure/package.json production-ready-deploy/

# Copy React application files
cp final-plesk-structure/public/index.html production-ready-deploy/public/
cp -r final-plesk-structure/public/assets/* production-ready-deploy/public/assets/
cp "final-plesk-structure/public/IE vector logo-01_1755535165852.png" production-ready-deploy/public/

# Create deployment instructions
cat > production-ready-deploy/DEPLOY.txt << 'EOF'
PRODUCTION DEPLOYMENT FOR IENET.ONLINE

1. Upload all files to /ienet.online/ maintaining folder structure:
   - dist/index.js
   - package.json  
   - public/index.html
   - public/assets/
   - public/logo file

2. Plesk Configuration:
   - Application Startup File: dist/index.js
   - Application Mode: production
   - Node.js Version: 18.x

3. Commands:
   - NPM install
   - Restart App

4. Verification:
   - Visit http://ienet.online
   - Check /api/health endpoint

React application will show with all components working.
EOF

# Create compressed package
cd production-ready-deploy
tar -czf ../production-react-final.tar.gz .
cd ..

echo "✅ Production deployment package ready: production-react-final.tar.gz"
echo "📁 Contents:"
tar -tzf production-react-final.tar.gz

echo ""
echo "🎯 Upload production-react-final.tar.gz to your server"
echo "📋 Follow instructions in DEPLOY.txt"