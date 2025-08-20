# Plesk Node.js Setup Guide

## Problem
Your production server doesn't have Node.js installed, which is why the API server can't start.

## Solution: Enable Node.js in Plesk

### Step 1: Install Node.js Extension
1. Log into Plesk Panel
2. Go to **Extensions** (in the left sidebar)
3. Search for "**Node.js**"
4. Click **Install** on the Node.js extension

### Step 2: Enable Node.js for Your Domain
1. Go to **Websites & Domains**
2. Find **ienet.online** domain
3. Click on **Node.js** (should appear after extension is installed)
4. **Enable Node.js** for this domain
5. Select **Node.js version 18.x** or **20.x**
6. Set **Application root**: `/var/www/vhosts/vivaindia.com/ienet.online/`
7. Set **Application startup file**: `working-production-server.cjs`
8. Click **Apply** or **Enable**

### Step 3: Start Your Application
1. In the Node.js interface, click **Start** or **Restart**
2. The server should start automatically
3. Check logs for "=== SERVER STARTED SUCCESSFULLY ==="

### Step 4: Test the API
```bash
curl https://www.ienet.online/api/health
```
Should return JSON data instead of 502 error.

## Alternative: Manual Installation
If Plesk doesn't have Node.js extension:

```bash
ssh root@5.181.218.15
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt-get install -y nodejs
node --version
```

## Result
Once Node.js is properly installed and configured:
- ✅ API server will start on port 3001
- ✅ Service categories will load on homepage
- ✅ Projects section will show data
- ✅ All navigation will work
- ✅ No more 502 Bad Gateway errors

Your website will be fully functional!