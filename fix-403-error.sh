#!/bin/bash

# Fix 403 Forbidden Error Script for ienet.online
# Run this script on your server: ssh root@5.181.218.15

echo "=== Fixing 403 Forbidden Error for ienet.online ==="

# Server paths
DOCUMENT_ROOT="/var/www/vhosts/vivaindia.com/ienet.online"
BACKUP_DIR="/tmp/ienet-backup-$(date +%Y%m%d)"

echo "1. Creating backup of current directory..."
mkdir -p $BACKUP_DIR
cp -r $DOCUMENT_ROOT/* $BACKUP_DIR/ 2>/dev/null || echo "No existing files to backup"

echo "2. Setting correct ownership..."
chown -R www-data:www-data $DOCUMENT_ROOT
chown -R apache:apache $DOCUMENT_ROOT 2>/dev/null || echo "Apache user not found, using www-data"

echo "3. Setting correct permissions..."
find $DOCUMENT_ROOT -type d -exec chmod 755 {} \;
find $DOCUMENT_ROOT -type f -exec chmod 644 {} \;

echo "4. Creating index.html if missing..."
if [ ! -f "$DOCUMENT_ROOT/index.html" ]; then
    cat > $DOCUMENT_ROOT/index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>IeNet - India Espectacular</title>
</head>
<body>
    <h1>Welcome to IeNet</h1>
    <p>If you see this page, the server is working. Please upload the application files.</p>
</body>
</html>
EOF
    chmod 644 $DOCUMENT_ROOT/index.html
fi

echo "5. Checking Apache/Nginx configuration..."
# For Apache
if command -v apache2 &> /dev/null; then
    echo "Apache detected. Creating .htaccess..."
    cat > $DOCUMENT_ROOT/.htaccess << 'EOF'
Options +Indexes
DirectoryIndex index.html index.php
AllowOverride All
<RequireAll>
    Require all granted
</RequireAll>
EOF
    chmod 644 $DOCUMENT_ROOT/.htaccess
    
    # Restart Apache
    systemctl restart apache2 || service apache2 restart
fi

# For Nginx
if command -v nginx &> /dev/null; then
    echo "Nginx detected. Please manually configure virtual host."
    cat > /tmp/nginx-ienet.conf << 'EOF'
server {
    listen 80;
    server_name ienet.online www.ienet.online;
    root /var/www/vhosts/vivaindia.com/ienet.online;
    index index.html index.php;

    location / {
        try_files $uri $uri/ =404;
    }

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php7.4-fpm.sock;
        fastcgi_index index.php;
        include fastcgi_params;
    }
}
EOF
    echo "Nginx config created at /tmp/nginx-ienet.conf"
    echo "Please copy it to /etc/nginx/sites-available/ and enable it"
fi

echo "6. Testing permissions..."
ls -la $DOCUMENT_ROOT

echo "7. Checking SELinux (if enabled)..."
if command -v getenforce &> /dev/null; then
    SELINUX_STATUS=$(getenforce)
    if [ "$SELINUX_STATUS" != "Disabled" ]; then
        echo "SELinux is enabled. Setting context..."
        setsebool -P httpd_can_network_connect 1
        restorecon -R $DOCUMENT_ROOT
    fi
fi

echo "=== 403 Error Fix Complete ==="
echo "Document Root: $DOCUMENT_ROOT"
echo "Permissions set to 755 for directories, 644 for files"
echo "Owner set to www-data:www-data"
echo ""
echo "Next steps:"
echo "1. Upload your application files to $DOCUMENT_ROOT"
echo "2. Test access: curl -I http://ienet.online"
echo "3. Check error logs: tail -f /var/log/apache2/error.log"
echo ""
echo "If still getting 403, check:"
echo "- Virtual host configuration"
echo "- Parent directory permissions"
echo "- Firewall settings"