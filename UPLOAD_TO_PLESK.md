# UPLOAD TO YOUR PLESK SERVER

## Step-by-Step Plesk Deployment

### Files to Upload:
- `ienet-production-deploy.tar.gz` (Complete deployment package)

### Plesk File Manager Steps:

1. **Access Plesk Control Panel**
   - Login to your hosting provider's Plesk panel
   - Navigate to your domain: ienet.online

2. **Prepare Domain Directory**
   - Go to "Files" or "File Manager"
   - Navigate to domain root (usually `/httpdocs` or `/public_html`)
   - **Delete all existing files** in the directory

3. **Upload Deployment Package**
   - Click "Upload Files" or drag-and-drop
   - Upload `ienet-production-deploy.tar.gz`
   - Extract/Unzip the archive
   - All files should now be in the domain root

4. **Configure Node.js Application**
   - Go to "Node.js" in Plesk
   - **Application Startup File:** `index.js`
   - **Application Mode:** production
   - **Node.js Version:** 18.x or 20.x
   - **Document Root:** (leave as domain root)

5. **Install and Start**
   - Click "NPM install" button
   - Wait for dependencies to install
   - Click "Restart App" button

6. **Verify Deployment**
   - Visit http://ienet.online
   - Should show React application with HeroSlider, Services, etc.
   - Check http://ienet.online/health for status

### Expected File Structure After Upload:
```
/httpdocs/
├── index.js (startup file)
├── package.json
├── public/
│   ├── index.html
│   ├── assets/
│   │   ├── index-5acz5IyP.css
│   │   └── index-BOus7yXH.js
│   └── IE vector logo-01_1755535165852.png
├── nginx.conf (server config)
├── ienet.service (systemd service)
└── INSTALL.sh (installation script)
```

### Troubleshooting:
- If "something went wrong" appears: Check Node.js logs in Plesk
- If 404 errors: Verify all files uploaded correctly
- If styling missing: Check assets folder exists and CSS/JS files present

Your React application will be live at ienet.online after successful deployment.