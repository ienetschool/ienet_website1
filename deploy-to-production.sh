#!/bin/bash

# Direct deployment script for ienet.online server
# This script deploys your React application to your production server

echo "🚀 Starting deployment to ienet.online..."

# Server configuration
SERVER_HOST="ienet.online"
SERVER_USER="your_username"  # Replace with your server username
SERVER_PATH="/var/www/ienet.online"  # Replace with your server path

# Create deployment package
echo "📦 Creating deployment package..."
rm -rf deploy-package
mkdir -p deploy-package/public/assets

# Copy all necessary files
cp plesk-compatible/index.js deploy-package/
cp plesk-compatible/package.json deploy-package/
cp plesk-compatible/public/index.html deploy-package/public/
cp -r plesk-compatible/public/assets/* deploy-package/public/assets/
cp "plesk-compatible/public/IE vector logo-01_1755535165852.png" deploy-package/public/

# Create deployment instructions
cat > deploy-package/INSTALL.sh << 'EOF'
#!/bin/bash
echo "Installing IeNet React Application..."

# Install dependencies
npm install

# Start application
echo "Starting Node.js application..."
node index.js &

echo "Application started on port 3000"
echo "Visit http://ienet.online to view your website"
EOF

chmod +x deploy-package/INSTALL.sh

# Create server configuration files
cat > deploy-package/nginx.conf << 'EOF'
server {
    listen 80;
    server_name ienet.online www.ienet.online;
    
    root /var/www/ienet.online/public;
    index index.html;
    
    location / {
        try_files $uri $uri/ @nodejs;
    }
    
    location @nodejs {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
    
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    location /health {
        proxy_pass http://localhost:3000;
    }
}
EOF

# Create systemd service
cat > deploy-package/ienet.service << 'EOF'
[Unit]
Description=IeNet React Application
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/var/www/ienet.online
ExecStart=/usr/bin/node index.js
Restart=always
RestartSec=10
Environment=NODE_ENV=production
Environment=PORT=3000

[Install]
WantedBy=multi-user.target
EOF

# Package everything
cd deploy-package
tar -czf ../ienet-production-deploy.tar.gz .
cd ..

echo "✅ Deployment package created: ienet-production-deploy.tar.gz"

# Manual deployment instructions
cat > DEPLOYMENT_INSTRUCTIONS.txt << 'EOF'
MANUAL DEPLOYMENT TO YOUR SERVER:

1. Upload ienet-production-deploy.tar.gz to your server
2. Extract: tar -xzf ienet-production-deploy.tar.gz
3. Run: ./INSTALL.sh
4. Configure Nginx with nginx.conf
5. Set up systemd service with ienet.service

Your React application will be live at http://ienet.online
EOF

echo "📋 Instructions created: DEPLOYMENT_INSTRUCTIONS.txt"
echo ""
echo "🎯 READY FOR YOUR SERVER DEPLOYMENT"
echo "Download: ienet-production-deploy.tar.gz"
echo "Follow: DEPLOYMENT_INSTRUCTIONS.txt"