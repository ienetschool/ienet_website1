# PRODUCTION DEPLOYMENT OPTIONS

## Option 1: Manual Upload (Most Common)

### Files to Upload:
1. **Upload entire `dist/` folder contents** to your web directory (usually `public_html/` or `httpdocs/`)
2. **Upload `updated-production-server-with-fixes.cjs`** to your server directory
3. **Restart your Node.js application**

### Step-by-step:
1. Go to your hosting control panel (Plesk, cPanel, etc.)
2. Open File Manager
3. Navigate to your web directory (httpdocs/ or public_html/)
4. Delete old website files
5. Upload all files from the `dist/public/` folder
6. Upload the server file `updated-production-server-with-fixes.cjs`
7. Go to Node.js settings and restart your application
8. Clear browser cache and test

## Option 2: Provide Server Access (Automated)

If you want me to deploy automatically, provide these details:
- **FTP/SFTP credentials** (host, username, password, port)
- **SSH access** (if available)
- **Control panel access** (optional)
- **Server restart method** (PM2, Plesk, etc.)

## Option 3: Command Line (If you have SSH)

If you have SSH access to your server:
```bash
# Upload files using SCP
scp -r dist/* username@your-server.com:/path/to/web/directory/
scp updated-production-server-with-fixes.cjs username@your-server.com:/path/to/server/

# SSH into server and restart
ssh username@your-server.com
cd /path/to/server
pm2 restart all  # or your restart method
```

## Current Status:
✅ All files are ready for deployment
✅ Database fixes already applied automatically
✅ SEO service added to production database
✅ All legal pages updated with correct information

## What Will Be Fixed After Deployment:
- Contact page will show "Contact IeNet" instead of "Contact India Espectacular"
- Privacy/Terms pages will show "India Espectacular" company name
- All addresses will be: "101 SIYOL NAGAR, Laxman Nagar Road Via Chadi, Phalodi, JODHPUR 342312"
- New /refund page will be available
- SEO service page will load properly

**Choose your preferred deployment method and I'll provide specific instructions.**