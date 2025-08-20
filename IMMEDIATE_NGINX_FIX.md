# IMMEDIATE FIX for 403 Error - ienet.online

## The Problem
Your Node.js application was built successfully, but Nginx is not configured to proxy requests to your Node.js server. It's still trying to serve static files instead of your application.

## URGENT: Run These Commands Now

SSH to your server and run these commands:

### 1. Configure Nginx for Node.js Proxy
```bash
cat > /etc/nginx/sites-available/ienet.online << 'EOF'
server {
    listen 80;
    server_name ienet.online www.ienet.online;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
EOF
```

### 2. Enable Site and Restart Nginx
```bash
ln -sf /etc/nginx/sites-available/ienet.online /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t
systemctl restart nginx
```

### 3. Start Your Node.js Application
```bash
cd /var/www/vhosts/vivaindia.com/ienet.online

# Create environment file
cat > .env << 'EOF'
NODE_ENV=production
PORT=3000
DATABASE_URL=mysql://netiedb:h5pLF9833@localhost:3306/ienetdb
EOF

# Start the application
npm start &
```

### 4. Install PM2 for Better Process Management
```bash
npm install -g pm2
pm2 start "npm start" --name ienet
pm2 save
pm2 startup
```

### 5. Verify Everything is Working
```bash
# Check if Node.js is running on port 3000
netstat -tlnp | grep :3000

# Test local connection
curl -I http://localhost:3000

# Test domain
curl -I http://ienet.online
```

## Expected Results
After running these commands:
- Node.js application will run on port 3000
- Nginx will proxy all requests to your Node.js app
- ienet.online will show your IeNet application instead of 403 error

## If Still Having Issues
Run these diagnostic commands:
```bash
pm2 logs ienet
tail -f /var/log/nginx/error.log
systemctl status nginx
```

Your application is fully built and ready - we just need to configure the web server to properly serve your Node.js application instead of looking for static files.