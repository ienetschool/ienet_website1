# Complete Production Server Fix Guide

## Current Status
✅ Website loading at https://www.ienet.online  
✅ Static files (CSS, JS) working  
✅ Nginx configuration added  
❌ API server returning 502 Bad Gateway  
❌ Database tables missing/empty  

## Step 1: Setup MySQL Database Schema

```bash
ssh root@5.181.218.15
cd /var/www/vhosts/vivaindia.com/ienet.online/

# Install Node.js dependencies
npm install mysql2 express

# Create database schema with sample data
node create-mysql-schema.js
```

## Step 2: Fix and Restart API Server

```bash
# Stop any existing Node.js processes
pkill -f "node" || true

# Restart API server
nohup node production-server.cjs > api.log 2>&1 &

# Verify server is running
ps aux | grep node
tail -5 api.log

# Test API locally
curl localhost:3001/api/health
curl localhost:3001/api/service-categories
```

## Step 3: Test Production Website

```bash
# Test API through Nginx proxy
curl https://www.ienet.online/api/health
curl https://www.ienet.online/api/service-categories
curl https://www.ienet.online/api/projects
```

## Expected Results

After these steps:
- Service categories will load on homepage
- Projects section will show real data  
- Features pages will work
- No more 502 Bad Gateway errors

## Files Uploaded So Far
- ✅ index.html (working)
- ✅ assets/index-4CY-Uz3T.css (working)  
- ✅ assets/index-6-PKYvps.js (working)
- ✅ production-server.cjs (needs database)
- ✅ Nginx proxy configuration (working)

## Next: Database Migration
Once basic structure works, we can migrate full data from PostgreSQL development database to MySQL production database.