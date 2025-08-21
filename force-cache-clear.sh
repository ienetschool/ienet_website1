#!/bin/bash

echo "🔄 FORCING CACHE CLEAR AND FRESH DEPLOYMENT"
echo "==========================================="

sshpass -p '&8KXC4D+Ojfhuu0LSMhE' ssh -o StrictHostKeyChecking=no root@5.181.218.15 << 'EOF'

cd /var/www/vhosts/vivaindia.com/ienet.online

echo "=== STEP 1: Find all index.html files ==="
find . -name "index.html" -type f -exec ls -la {} \;

echo ""
echo "=== STEP 2: Check what's actually being served ==="
find . -path "./httpdocs*" -name "*.html" -exec head -5 {} \;

echo ""
echo "=== STEP 3: Clear Plesk cache ==="
if command -v plesk >/dev/null 2>&1; then
    plesk bin site -u ienet.online -cache-clear 2>/dev/null || echo "Plesk cache clear not available"
fi

echo ""
echo "=== STEP 4: Restart web services ==="
systemctl reload nginx
systemctl restart nginx

echo ""
echo "=== STEP 5: Check nginx configuration ==="
nginx -t
systemctl status nginx | head -5

echo ""
echo "=== STEP 6: Replace index.html with timestamp ==="
cat > httpdocs/index.html << 'HTMLEOF'
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1" />
    <title>IeNet - Contact IeNet</title>
    <script type="module" crossorigin src="/assets/index-khSM3QtS.js"></script>
    <link rel="stylesheet" crossorigin href="/assets/index-Ux9vIbMj.css">
  </head>
  <body>
    <div id="root"></div>
    <!-- Updated: 2025-08-21 Cache Clear -->
  </body>
</html>
HTMLEOF

echo "New index.html created with cache-busting timestamp"

echo ""
echo "=== STEP 7: Set proper permissions ==="
chown -R nginx:nginx httpdocs/ 2>/dev/null || chown -R apache:apache httpdocs/ 2>/dev/null || echo "Permission setting attempted"
chmod -R 755 httpdocs/

echo ""
echo "=== STEP 8: Final verification ==="
echo "httpdocs contents:"
ls -la httpdocs/
echo ""
echo "Testing direct file access:"
curl -I http://localhost/

EOF

echo ""
echo "🧪 Testing with cache bypass headers..."
echo "Direct test with no-cache:"
curl -H "Cache-Control: no-cache" -H "Pragma: no-cache" -s https://www.ienet.online/contact | grep -i "contact" | head -3

echo ""
echo "Force refresh test:"
curl -H "Cache-Control: max-age=0" -s https://www.ienet.online/contact | grep -A 2 -B 2 "title" | head -5