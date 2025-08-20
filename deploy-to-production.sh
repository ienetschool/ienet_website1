#!/bin/bash

# Deploy React Development Server to Production
echo "🚀 Deploying IeNet React Application to Production Server..."

# Create final deployment package
echo "📦 Creating deployment package..."
rm -rf final-deploy
mkdir -p final-deploy

# Copy built React application
cp -r dist/public final-deploy/
cp production-deploy/server-start.js final-deploy/
cp production-deploy/production-package.json final-deploy/package.json

# Create deployment script for server
cat > final-deploy/deploy.sh << 'EOF'
#!/bin/bash
echo "Installing dependencies..."
npm install --production

echo "Starting IeNet React Application..."
pm2 stop ienet-production 2>/dev/null || true
pm2 start package.json --name ienet-production
pm2 save

echo "✅ IeNet React Application deployed successfully"
echo "🌐 Visit http://ienet.online to view your website"
EOF

chmod +x final-deploy/deploy.sh

# Create Plesk configuration
cat > final-deploy/plesk-config.txt << 'EOF'
PLESK NODE.JS CONFIGURATION:

1. Application Startup File: server-start.js
2. Application Mode: production  
3. Node.js Version: 18.x
4. Document Root: /

COMMANDS:
1. Upload all files to /ienet.online/
2. Click "NPM install" 
3. Click "Restart App"

RESULT: ienet.online shows React application
EOF

echo "✅ Deployment package ready in final-deploy/"
echo "📁 Files prepared:"
ls -la final-deploy/

echo ""
echo "🎯 Ready for production deployment:"
echo "- server-start.js (Express server)"
echo "- package.json (dependencies)"
echo "- public/ (React application)"
echo "- deploy.sh (deployment script)"

echo ""
echo "📤 Upload final-deploy/ contents to /ienet.online/ on your server"