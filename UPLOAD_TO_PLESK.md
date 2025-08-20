# UPLOAD EXACT REACT APPLICATION TO PLESK

## Files to Upload to /ienet.online/

1. **server-start.js** (Express server for React app)
2. **production-package.json** (rename to package.json)
3. **public/** (folder with built React application)

## Plesk Configuration
- Application Startup File: `server-start.js`
- Application Mode: production
- Node.js Version: 18.x

## Commands
1. NPM install
2. Restart App

## Result
ienet.online shows identical React application to development server with HeroSlider, ModernHeader, FloatingCTA, About, Services, Testimonials sections.