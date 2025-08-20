# IMMEDIATE PLESK SOLUTION

## Current Issue
- `dist/index.js` doesn't exist in the root directory
- Node.js application can't start

## QUICK FIX

### Step 1: Upload Simple Startup Files
Upload these 3 files to Plesk File Manager root directory (/ienet.online/):

1. **index.js** (from production-deploy/index.js) - Simple Express server
2. **package.json** (from production-deploy/simple-package.json) - Dependencies
3. **.env.production** - Environment variables

### Step 2: Update Plesk Node.js Settings
- **Application Startup File:** `index.js` (change from dist/index.js)
- **Application Mode:** production
- **Node.js Version:** 18.x

### Step 3: Install & Start
1. Click "NPM install" in Plesk Node.js panel
2. Click "Restart App"

### Step 4: Test
- Visit http://ienet.online/api/health (should show status)
- Visit http://ienet.online (should show React app)

## What This Does
- Creates simple Express server that serves your React app
- Connects to MySQL database with your data
- Serves static files from dist/public folder
- Provides API endpoints for database access

## Expected Result
ienet.online will show your React application with all components working.