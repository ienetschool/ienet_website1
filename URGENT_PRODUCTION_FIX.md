# URGENT: Production Changes Not Live - Troubleshooting Guide

## Problem Identified:
Your production site at https://www.ienet.online/contact still shows:
- Title: "Contact India Espectacular" 
- But should show: "Contact IeNet"

## Likely Causes:
1. **Server not restarted** after file upload
2. **Browser/CDN caching** of old files
3. **Wrong server file** still running
4. **Files uploaded to wrong directory**

## IMMEDIATE FIXES TO TRY:

### 1. Restart Production Server
Your Node.js server must be restarted after uploading new files:
```bash
# Stop current server process
pkill -f "node"
# Or restart through your hosting panel
# Start the new server
node updated-production-server-with-fixes.cjs
```

### 2. Clear All Caches
- **Browser Cache**: Hard refresh (Ctrl+F5 or Cmd+Shift+R)
- **CDN Cache**: If using Cloudflare/CDN, purge cache
- **Server Cache**: Restart web server (Apache/Nginx)

### 3. Verify File Upload Location
Make sure you uploaded the `dist/` folder contents to the correct directory:
- **Shared hosting**: Usually `public_html/` or `httpdocs/`
- **VPS**: Your configured web root directory
- **Plesk**: File Manager > httpdocs/

### 4. Check Server Process
Verify which server file is actually running:
```bash
ps aux | grep node
# Kill old processes and start new one
```

### 5. Database Update
Run the MySQL commands to fix missing services:
```sql
INSERT INTO services (name, slug, description, category_id, display_order, created_at, updated_at) 
VALUES (
    'Search Engine Optimization', 
    'search-engine-optimization', 
    'Comprehensive SEO services to improve your website search engine rankings and visibility', 
    (SELECT id FROM service_categories WHERE slug = 'digital-marketing-seo'), 
    1,
    NOW(),
    NOW()
);
```

## WHAT TO CHECK RIGHT NOW:

1. **Is your server running the new file?**
   - Check server logs for startup messages
   - Look for "STARTING MYSQL PRODUCTION SERVER" message

2. **Are the dist/ files in the right location?**
   - Verify index.html is in your web root
   - Check that CSS/JS files are in assets/ folder

3. **Try force refresh**:
   - Open https://www.ienet.online/contact
   - Press Ctrl+F5 (PC) or Cmd+Shift+R (Mac)

## Expected Results After Fix:
- Contact page title: "Contact IeNet"
- Privacy page: "India Espectacular" 
- Terms page: "India Espectacular"
- New /refund page should load
- Address: "101 SIYOL NAGAR, Laxman Nagar Road Via Chadi, Phalodi, JODHPUR 342312"

**Try server restart first - this usually fixes the issue immediately!**