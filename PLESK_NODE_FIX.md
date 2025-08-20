# PLESK NODE.JS CONFIGURATION FIX

## Current Issue
- Node.js is configured in Plesk but showing "No such file or directory" for dist/index.js
- PM2 shows no processes running
- Application not starting properly

## IMMEDIATE FIX

### Step 1: Upload Correct Files to Plesk
Upload these files from production-deploy/ to your Plesk File Manager at /ienet.online:

**Required Files:**
- dist/index.js (the built Node.js application)
- package.json (with start script)
- .env.production (environment variables)
- client/ folder (React frontend files)
- server/ folder (Express backend)
- shared/ folder (shared schemas)

### Step 2: Plesk Node.js Configuration
In your Plesk Node.js panel, set:
- **Application Root:** `/` (current setting is correct)
- **Application Startup File:** `dist/index.js` 
- **Application Mode:** `production`
- **Node.js Version:** 18.x or 20.x

### Step 3: Install Dependencies in Plesk
1. In Plesk Node.js panel, click "NPM install" 
2. Or use SSH terminal: `npm install --production`

### Step 4: Start Application
1. Click "Restart App" in Plesk Node.js panel
2. Verify the green status indicator appears

## Files You Need to Upload

From the production-deploy folder, make sure these exist in your Plesk file manager:

```
/ienet.online/
├── dist/
│   └── index.js ✓ (This is the startup file)
├── package.json ✓
├── .env.production ✓
├── client/ ✓
├── server/ ✓
└── shared/ ✓
```

## Expected Result
- Plesk Node.js panel shows green "running" status
- PM2 status shows ienet-production process
- ienet.online displays React application with HeroSlider, ModernHeader, FloatingCTA