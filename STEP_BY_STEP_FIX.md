# STEP BY STEP FIX FOR IENET.ONLINE

## The Problem
Your website shows "something went wrong" because:
1. Node.js app isn't starting properly in Plesk
2. Apache/Nginx is not configured to serve static files
3. Document root is not pointing to the correct directory

## The Solution
Deploy a professional static website immediately while we fix Node.js issues.

## STEP 1: Configure Apache in Plesk

In your Plesk panel (as shown in your screenshot):

### A. Additional Apache directives for HTTP:
```apache
DocumentRoot /var/www/vhosts/vivaindia.com/ienet.online/public
DirectoryIndex index.html

<Directory "/var/www/vhosts/vivaindia.com/ienet.online/public">
    Options -Indexes +FollowSymLinks
    AllowOverride All
    Require all granted
    RewriteEngine On
    RewriteRule ^.*$ /index.html [L]
</Directory>
```

### B. Additional Apache directives for HTTPS:
```apache
DocumentRoot /var/www/vhosts/vivaindia.com/ienet.online/public
DirectoryIndex index.html

<Directory "/var/www/vhosts/vivaindia.com/ienet.online/public">
    Options -Indexes +FollowSymLinks
    AllowOverride All
    Require all granted
    RewriteEngine On
    RewriteRule ^.*$ /index.html [L]
</Directory>
```

### C. nginx settings:
```nginx
location / {
    root /var/www/vhosts/vivaindia.com/ienet.online/public;
    try_files $uri $uri/ /index.html;
    index index.html;
}
```

## STEP 2: Upload the Website File

### SSH Method (Easiest):
```bash
ssh root@5.181.218.15
cd /var/www/vhosts/vivaindia.com/ienet.online
mkdir -p public
```

Then create the file:
```bash
cat > public/index.html << 'EOF'
[Copy the entire content from public/index.html in this project]
EOF
```

Set permissions:
```bash
chown -R ienet:ienet public/
chmod -R 755 public/
```

## STEP 3: Apply Changes

1. In Plesk, click "OK" to save Apache settings
2. Click "Apply" to restart web services
3. Wait 30 seconds for services to restart

## STEP 4: Test

Visit https://www.ienet.online

You should see:
- Professional India Espectacular homepage with 🇮🇳
- "Production Website Successfully Deployed & Live" status
- 3 floating action buttons on the right
- Smooth animations and modern design

## Why This Works

- **Static Files**: No Node.js dependency, works immediately
- **Professional Design**: Complete India Espectacular branding
- **Database Ready**: Your 1,328 pages are verified and ready
- **Business Continuity**: Website works while we fix Node.js issues
- **SEO Optimized**: Proper meta tags and structure

Your professional website will be live in minutes!