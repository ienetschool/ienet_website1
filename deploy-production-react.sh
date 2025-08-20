#!/bin/bash

# Production Deployment Script for IeNet React Application
echo "🚀 Deploying IeNet React Application to Production..."

# Create production build
echo "📦 Building React application..."
npm run build

# Create deployment package
echo "📁 Creating deployment package..."
mkdir -p production-deploy
cp -r client production-deploy/
cp -r server production-deploy/
cp -r shared production-deploy/
cp -r public production-deploy/
cp -r dist production-deploy/
cp package*.json production-deploy/
cp vite.config.ts production-deploy/
cp tsconfig.json production-deploy/
cp tailwind.config.ts production-deploy/
cp postcss.config.js production-deploy/
cp components.json production-deploy/

# Create production environment file
echo "⚙️  Creating production environment..."
cat > production-deploy/.env.production << 'EOF'
NODE_ENV=production
PORT=3000
DATABASE_URL=mysql://ienet:ienet2024@localhost:3306/ienet_db
MYSQL_HOST=localhost
MYSQL_USER=ienet
MYSQL_PASSWORD=ienet2024
MYSQL_DATABASE=ienet_db
MYSQL_PORT=3306
EOF

# Create production package.json with start script
echo "📄 Creating production package.json..."
cat > production-deploy/package.json << 'EOF'
{
  "name": "ienet-production",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "start": "NODE_ENV=production node dist/index.js",
    "install:production": "npm install --production"
  },
  "dependencies": {
    "@neondatabase/serverless": "^0.10.4",
    "express": "^4.21.1",
    "mysql2": "^3.11.4",
    "drizzle-orm": "^0.36.4",
    "express-session": "^1.18.1",
    "connect-pg-simple": "^10.0.0",
    "passport": "^0.7.0",
    "passport-local": "^1.0.0",
    "zod": "^3.24.1",
    "drizzle-zod": "^0.6.1"
  }
}
EOF

# Create production startup script
echo "🔧 Creating startup script..."
cat > production-deploy/start-production.sh << 'EOF'
#!/bin/bash
cd /var/www/ienet.online
npm install --production
NODE_ENV=production node dist/index.js
EOF

chmod +x production-deploy/start-production.sh

# Create PM2 ecosystem file for process management
echo "⚡ Creating PM2 configuration..."
cat > production-deploy/ecosystem.config.js << 'EOF'
module.exports = {
  apps: [{
    name: 'ienet-production',
    script: 'dist/index.js',
    cwd: '/var/www/ienet.online',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G'
  }]
};
EOF

# Create Apache virtual host configuration
echo "🌐 Creating Apache configuration..."
cat > production-deploy/apache-vhost.conf << 'EOF'
<VirtualHost *:80>
    ServerName ienet.online
    ServerAlias www.ienet.online
    
    ProxyPreserveHost On
    ProxyRequests Off
    
    # Proxy all requests to Node.js application
    ProxyPass / http://localhost:3000/
    ProxyPassReverse / http://localhost:3000/
    
    # Handle WebSocket connections
    ProxyPass /ws ws://localhost:3000/ws
    ProxyPassReverse /ws ws://localhost:3000/ws
    
    ErrorLog /var/log/apache2/ienet_error.log
    CustomLog /var/log/apache2/ienet_access.log combined
</VirtualHost>
EOF

# Create deployment instructions
echo "📋 Creating deployment instructions..."
cat > production-deploy/DEPLOYMENT_INSTRUCTIONS.md << 'EOF'
# IeNet Production Deployment Instructions

## Upload Files
1. Upload all files from production-deploy/ to /var/www/ienet.online/

## Install Dependencies
```bash
cd /var/www/ienet.online
npm install --production
```

## Configure Apache
1. Copy apache-vhost.conf to Apache sites-available
2. Enable the site and restart Apache

## Start Application
```bash
# Option 1: Direct start
NODE_ENV=production node dist/index.js

# Option 2: Using PM2 (recommended)
pm2 start ecosystem.config.js
pm2 startup
pm2 save
```

## Verify Deployment
- Visit http://ienet.online
- Should show React application with HeroSlider, ModernHeader, FloatingCTA
- Database should be connected with 1,328 pages
EOF

echo "✅ Production deployment package ready in production-deploy/"
echo "📤 Upload production-deploy/ contents to your server"
echo "🔗 Configure Apache to proxy to Node.js on port 3000"
echo "🎯 Your React development server will run on ienet.online"