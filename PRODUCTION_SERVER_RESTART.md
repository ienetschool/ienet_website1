# PRODUCTION SERVER RESTART GUIDE

## Issue: 502 Bad Gateway Error
The production server at ienet.online is showing 502 errors, which means the Node.js backend has stopped running.

## Immediate Fix Steps

### 1. Restart Node.js Application
```bash
# SSH into production server
cd /var/www/vhosts/ienet.online/httpdocs

# Kill any existing Node.js processes
pkill -f node
pkill -f "mysql-production-server"

# Start the production server
nohup node mysql-production-server.cjs > server.log 2>&1 &

# Verify the server is running
ps aux | grep node
netstat -tulpn | grep 3001
```

### 2. Check Server Status
```bash
# Test the API endpoints
curl http://localhost:3001/api/service-categories
curl http://localhost:3001/api/services
curl http://localhost:3001/api/features
```

### 3. Nginx Configuration Check
```bash
# Verify nginx proxy is correct
nginx -t
systemctl reload nginx
```

## Root Cause
The Node.js server on port 3001 has stopped running, causing:
- Missing page titles (SEOHead components can't load data)
- "Features being loaded..." errors
- "Loading related services..." errors
- All API endpoint failures

## Prevention
Set up a process manager like PM2:
```bash
npm install -g pm2
pm2 start mysql-production-server.cjs --name "ienet-api"
pm2 startup
pm2 save
```

## Logo Fix
The logo file is already uploaded to production at:
`/var/www/vhosts/ienet.online/httpdocs/IE vector logo-01_1755535165852.png`

Development server logo path has been reverted to match production.