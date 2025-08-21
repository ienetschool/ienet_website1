#!/bin/bash

echo "🔧 FIXING WEB SERVER CONFIGURATION"
echo "=================================="

sshpass -p '&8KXC4D+Ojfhuu0LSMhE' ssh -o StrictHostKeyChecking=no root@5.181.218.15 << 'EOF'

cd /var/www/vhosts/vivaindia.com/ienet.online

echo "Current directory structure:"
ls -la

echo ""
echo "Checking if httpdocs exists:"
ls -la httpdocs/ 2>/dev/null || echo "No httpdocs directory"

echo ""
echo "Current Node.js processes:"
ps aux | grep node | grep -v grep

echo ""
echo "Port 3001 status:"
netstat -tulpn | grep :3001 || echo "Port 3001 not listening"

echo ""
echo "Testing Node.js server directly:"
curl -s http://localhost:3001/api/health || echo "Node.js server not responding"

echo ""
echo "=== SOLUTION 1: Move files to httpdocs ==="
# Check if httpdocs directory exists and move React files there
if [ -d "httpdocs" ]; then
    echo "Moving React build files to httpdocs..."
    cp -r assets/ httpdocs/ 2>/dev/null || echo "No assets folder"
    cp index.html httpdocs/ 2>/dev/null || echo "No index.html"
    cp *.png httpdocs/ 2>/dev/null || echo "No PNG files"
    echo "Files moved to httpdocs"
else
    echo "No httpdocs directory found"
fi

echo ""
echo "=== SOLUTION 2: Configure Apache/Nginx proxy ==="

# Check web server configuration
if [ -f "/etc/nginx/sites-available/ienet.online" ]; then
    echo "Nginx config found"
    cat /etc/nginx/sites-available/ienet.online
elif [ -f "/etc/apache2/sites-available/ienet.online.conf" ]; then
    echo "Apache config found"
    cat /etc/apache2/sites-available/ienet.online.conf
else
    echo "No specific vhost config found"
fi

echo ""
echo "Plesk domain configuration:"
ls -la /var/www/vhosts/vivaindia.com/conf/ 2>/dev/null || echo "No Plesk conf directory"

EOF