# IeNet Application - Complete Deployment Requirements

## Overview
This document provides a comprehensive list of requirements to deploy the IeNet application to any domain or server.

## 1. Server Requirements

### Operating System
- Linux (Ubuntu 20.04+ or CentOS 7+)
- Windows Server 2019+ (alternative)

### Software Requirements
- **Node.js**: v16.0+ (Recommended: v18.0+ or v20.0+)
- **MySQL**: 8.0+ or MariaDB 10.6+
- **Web Server**: Nginx (recommended) or Apache HTTP Server
- **Process Manager**: PM2 (recommended) or systemd

### Hardware Requirements
- **CPU**: 2+ cores
- **RAM**: Minimum 2GB, Recommended 4GB+
- **Storage**: Minimum 20GB SSD
- **Network**: 100Mbps+ connection

## 2. Database Requirements

### MySQL Configuration
```sql
-- Required database structure
CREATE DATABASE ienetdb CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Required tables (41 total):
- service_categories (main service categories)
- services (individual services)
- features (service features)
- projects (portfolio projects)
- users (user accounts)
- site_settings (configuration)
- seo_settings (SEO configuration)
- And 34 additional tables for full functionality
```

### Database Credentials Needed
- **Host**: Database server IP/hostname
- **Port**: 3306 (default MySQL port)
- **Username**: Database user with full privileges
- **Password**: Strong password for database user
- **Database Name**: Target database name

## 3. Domain & DNS Configuration

### DNS Records Required
```
A Record: your-domain.com → Server IP Address
A Record: www.your-domain.com → Server IP Address
CNAME: * → your-domain.com (for subdomains, optional)
```

### SSL Certificate
- Let's Encrypt (free, recommended)
- Commercial SSL certificate
- Wildcard certificate (if using subdomains)

## 4. Application Files Structure

### Required Files
```
/var/www/vhosts/your-domain.com/
├── index.html                 # Main React application
├── assets/                    # Static assets (CSS, JS, images)
│   ├── index-[hash].css
│   ├── index-[hash].js
│   └── other assets
├── production-server.cjs      # Node.js server
├── .env                       # Environment variables
└── package.json              # Node.js dependencies (if needed)
```

### Server Configuration File Template
```javascript
// production-server.cjs template
const express = require('express');
const mysql = require('mysql2/promise');

const dbConfig = {
  host: 'YOUR_DB_HOST',
  port: 3306,
  user: 'YOUR_DB_USER',
  password: 'YOUR_DB_PASSWORD',
  database: 'YOUR_DB_NAME'
};

const app = express();
const PORT = 3001;

// [Complete server implementation needed]
```

## 5. Environment Variables

### Required .env File
```bash
# Database Configuration
DB_HOST=your-database-host
DB_PORT=3306
DB_USERNAME=your-db-username
DB_PASSWORD=your-db-password
DB_NAME=your-database-name

# Application Configuration
NODE_ENV=production
PORT=3001
DOMAIN=your-domain.com

# Optional
SSL_CERT_PATH=/path/to/ssl/cert
SSL_KEY_PATH=/path/to/ssl/key
```

## 6. Web Server Configuration

### Nginx Configuration Template
```nginx
server {
    listen 80;
    listen [::]:80;
    server_name your-domain.com www.your-domain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name your-domain.com www.your-domain.com;

    ssl_certificate /path/to/ssl/cert.pem;
    ssl_certificate_key /path/to/ssl/private.key;

    root /var/www/vhosts/your-domain.com/;
    index index.html;

    # API proxy to Node.js
    location /api/ {
        proxy_pass http://127.0.0.1:3001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Serve static files
    location / {
        try_files $uri $uri/ /index.html;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

## 7. Node.js Dependencies

### Required npm Packages
```json
{
  "dependencies": {
    "mysql2": "^3.6.0",
    "express": "^4.18.0" // if using Express
  }
}
```

### Installation Commands
```bash
# Install Node.js (Ubuntu/Debian)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install MySQL client libraries
sudo apt-get install -y mysql-client

# Install global packages
sudo npm install -g pm2
```

## 8. Deployment Process

### Step-by-Step Deployment
1. **Server Preparation**
   ```bash
   # Update system
   sudo apt update && sudo apt upgrade -y
   
   # Install required software
   sudo apt install -y nginx mysql-server nodejs npm
   ```

2. **Create Directory Structure**
   ```bash
   sudo mkdir -p /var/www/vhosts/your-domain.com
   sudo chown -R $USER:$USER /var/www/vhosts/your-domain.com
   ```

3. **Upload Application Files**
   ```bash
   # Upload via SCP, SFTP, or Git
   scp -r ./dist/* user@server:/var/www/vhosts/your-domain.com/
   ```

4. **Database Setup**
   ```bash
   # Create database and user
   mysql -u root -p
   CREATE DATABASE ienetdb;
   CREATE USER 'ienetuser'@'localhost' IDENTIFIED BY 'strong-password';
   GRANT ALL PRIVILEGES ON ienetdb.* TO 'ienetuser'@'localhost';
   FLUSH PRIVILEGES;
   
   # Import database structure and data
   mysql -u ienetuser -p ienetdb < database-schema.sql
   ```

5. **Configure Environment**
   ```bash
   # Create .env file
   nano /var/www/vhosts/your-domain.com/.env
   # Add environment variables as shown above
   ```

6. **Install Dependencies**
   ```bash
   cd /var/www/vhosts/your-domain.com
   npm install mysql2
   ```

7. **Configure Web Server**
   ```bash
   # Create Nginx configuration
   sudo nano /etc/nginx/sites-available/your-domain.com
   # Add configuration as shown above
   
   # Enable site
   sudo ln -s /etc/nginx/sites-available/your-domain.com /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl reload nginx
   ```

8. **Start Application**
   ```bash
   # Start with PM2
   pm2 start production-server.cjs --name ienet-app
   pm2 startup
   pm2 save
   
   # Or start manually
   nohup node production-server.cjs > server.log 2>&1 &
   ```

9. **SSL Certificate**
   ```bash
   # Using Let's Encrypt
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d your-domain.com -d www.your-domain.com
   ```

## 9. Testing & Verification

### Required Tests
```bash
# Test domain access
curl -I https://your-domain.com

# Test API endpoints
curl https://your-domain.com/api/health
curl https://your-domain.com/api/service-categories

# Check server process
ps aux | grep node
netstat -tulpn | grep 3001

# Test database connection
mysql -u ienetuser -p -h localhost ienetdb -e "SELECT COUNT(*) FROM service_categories;"
```

### Verification Checklist
- [ ] Domain resolves correctly
- [ ] HTTPS certificate is valid and working
- [ ] Node.js server is running on port 3001
- [ ] Database connection is successful
- [ ] API endpoints return proper responses
- [ ] Frontend loads and displays content
- [ ] Service categories, services, and projects load
- [ ] No console errors in browser
- [ ] All website pages are accessible

## 10. Monitoring & Maintenance

### Log Files
- **Application logs**: `/var/www/vhosts/your-domain.com/server.log`
- **Nginx logs**: `/var/log/nginx/access.log`, `/var/log/nginx/error.log`
- **MySQL logs**: `/var/log/mysql/error.log`
- **PM2 logs**: `pm2 logs`

### Backup Requirements
- Database: Daily automated backups
- Application files: Version control (Git)
- SSL certificates: Backup renewal scripts
- Configuration files: Include in backup strategy

### Monitoring
- Server uptime monitoring
- Database performance monitoring
- SSL certificate expiration monitoring
- Disk space and memory usage monitoring

## 11. Troubleshooting Common Issues

### Database Connection Issues
```bash
# Test MySQL connection
mysql -u ienetuser -p -h your-db-host

# Check MySQL service
sudo systemctl status mysql
sudo systemctl start mysql
```

### Node.js Server Issues
```bash
# Check if port is in use
netstat -tulpn | grep 3001
lsof -i :3001

# Kill existing processes
pkill -f node
pkill -f production-server
```

### Nginx Issues
```bash
# Test configuration
sudo nginx -t

# Check status
sudo systemctl status nginx
sudo systemctl reload nginx
```

### Permission Issues
```bash
# Fix file permissions
sudo chown -R www-data:www-data /var/www/vhosts/your-domain.com
sudo chmod -R 755 /var/www/vhosts/your-domain.com
```

## 12. Security Considerations

### Server Security
- Keep system and packages updated
- Configure firewall (UFW/iptables)
- Use strong passwords for all accounts
- Regular security audits
- Monitor logs for suspicious activity

### Application Security
- Secure database credentials in .env files
- Regular database backups
- Input validation and sanitization
- HTTPS enforcement
- Security headers in Nginx configuration

---

**Note**: This deployment guide assumes a standard Linux server setup. Adjust paths and commands according to your specific server environment and hosting provider requirements.