# FINAL UPLOAD FILES FOR PLESK

## Upload These Exact Files to Plesk File Manager Root (/ienet.online/):

### 1. index.js (Main startup file)
- Source: production-deploy/index.js
- Upload to: /ienet.online/index.js

### 2. package.json (Dependencies)
- Source: production-deploy/simple-package.json
- Upload to: /ienet.online/package.json

### 3. .env (Environment variables)
- Source: production-deploy/.env.production
- Upload to: /ienet.online/.env

### 4. Static Files Folder
- Source: production-deploy/dist/public/
- Upload to: /ienet.online/dist/public/

## Plesk Node.js Configuration:
- Application Startup File: index.js
- Application Mode: production
- Node.js Version: 18.x

## After Upload:
1. NPM install
2. Restart App
3. Visit ienet.online

## Result:
React application with HeroSlider, ModernHeader, FloatingCTA will be live