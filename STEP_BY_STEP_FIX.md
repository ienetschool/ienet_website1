# Step by Step Fix for ienet.online Error

## Current Problem
Website shows generic error instead of React application

## Solution Path

### Option 1: Fix Node.js Application (Preferred)

**Step 1: Check Current Setup**
```bash
# SSH into server or use Plesk terminal
cd /var/www/ienet.online
ls -la
```

**Step 2: Verify Files Uploaded**
Should see: client/, server/, dist/, package.json, ecosystem.config.js

**Step 3: Install Dependencies**
```bash
npm install --production
```

**Step 4: Test Application**
```bash
NODE_ENV=production node dist/index.js
```

**Step 5: Start with PM2**
```bash
pm2 start ecosystem.config.js
pm2 save
```

### Option 2: Quick Plesk Fix

**If using Plesk hosting:**
1. Go to Plesk Panel > Hosting & DNS > Node.js
2. Enable Node.js (version 18.x or 20.x)
3. Set Application Root: /
4. Set Startup File: dist/index.js
5. Environment: production
6. Click "Enable Node.js"

### Option 3: Temporary Static Solution

**If Node.js setup is complex:**
1. Upload PRODUCTION_MATCHING_VERSION.html as index.html
2. Provides immediate working website
3. Shows same design while fixing Node.js

## Diagnostic Commands

```bash
# Check if Node.js app is running
ps aux | grep node

# Check port 3000
netstat -tulpn | grep :3000

# Check Apache/Nginx logs
tail -f /var/log/apache2/error.log
tail -f /var/log/nginx/error.log

# Test direct connection
curl http://localhost:3000
```

## Expected Results

**Success indicators:**
- ienet.online shows React application
- HeroSlider, ModernHeader, FloatingCTA visible
- 3 floating buttons working
- Database connected with 1,328 pages

**Next steps after success:**
- Test all pages and functionality
- Verify database connection
- Check admin dashboard access