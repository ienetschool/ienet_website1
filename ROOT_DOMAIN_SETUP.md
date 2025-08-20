# Root Domain Setup - Move from Port 5000 to Root Domain

## Problem
Currently your website is accessible at http://ienet.online:5000 but you want it at https://www.ienet.online (root domain, no port).

## Solution Options

### Option 1: Direct Root Domain Server (Port 80)
Run Node.js server directly on port 80 (requires root privileges):

```bash
# SSH to your server
ssh root@5.181.218.15

# Upload and extract
scp root-domain-deployment.tar.gz root@5.181.218.15:~/
cd ~/
tar -xzf root-domain-deployment.tar.gz

# Stop existing servers
pkill -f "node" || true

# Start on port 80 (requires root)
sudo node root-domain-server.cjs
```

Website will be accessible at: http://ienet.online

### Option 2: Nginx Reverse Proxy (Recommended)
Use Nginx to serve static files and proxy API requests:

1. **Setup static files and API server:**
```bash
# Copy React files to web directory
cp -r dist/public/* /var/www/html/

# Start API server on port 3001
nohup node api-server-only.cjs > api.log 2>&1 &
```

2. **Configure Nginx:**
```bash
# Copy nginx config
cp nginx-config.conf /etc/nginx/sites-available/ienet
ln -s /etc/nginx/sites-available/ienet /etc/nginx/sites-enabled/
rm /etc/nginx/sites-enabled/default

# Test and reload
nginx -t
systemctl reload nginx
```

Website will be accessible at: https://www.ienet.online

### Option 3: Check Current Web Server
First, let's see what's already running:

```bash
# Check what's listening on port 80/443
netstat -tulpn | grep ':80\|:443'

# Check if Apache/Nginx is installed
which nginx apache2 httpd

# Check current web server status
systemctl status nginx apache2 httpd
```

## What This Fixes
- Removes need for port 5000 in URL
- Serves exact same React application as development
- Proper HTTPS setup with SSL
- Professional URL structure
- Same database connectivity

## Files Included
- `root-domain-server.cjs` - Direct port 80 server
- `api-server-only.cjs` - API server for Nginx setup
- `nginx-config.conf` - Nginx configuration
- `dist/public/` - Same React build as development

Choose the option that works best with your current server setup.