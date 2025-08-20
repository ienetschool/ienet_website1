# Complete 403 Error Fix Guide for ienet.online

## 🚨 Current Issue
Your domain ienet.online is showing a 403 Forbidden error, which means the web server cannot access or serve files from the directory.

## 🔧 Immediate Fix Steps

### Step 1: SSH to Your Server
```bash
ssh root@5.181.218.15
# Password: &8KXC4D+Ojfhuu0LSMhE
```

### Step 2: Run the Fix Script
```bash
# Download and run the fix script
chmod +x fix-403-error.sh
./fix-403-error.sh
```

### Step 3: Manual Permission Fix (If Script Doesn't Work)
```bash
# Navigate to your document root
cd /var/www/vhosts/vivaindia.com/ienet.online

# Fix ownership
chown -R www-data:www-data /var/www/vhosts/vivaindia.com/ienet.online
# Alternative for CentOS/RHEL:
# chown -R apache:apache /var/www/vhosts/vivaindia.com/ienet.online

# Fix permissions
find /var/www/vhosts/vivaindia.com/ienet.online -type d -exec chmod 755 {} \;
find /var/www/vhosts/vivaindia.com/ienet.online -type f -exec chmod 644 {} \;

# Check parent directory permissions
chmod 755 /var/www/vhosts/vivaindia.com/
chmod 755 /var/www/vhosts/
chmod 755 /var/www/
```

### Step 4: Create Test Index File
```bash
cat > /var/www/vhosts/vivaindia.com/ienet.online/index.html << 'EOF'
<!DOCTYPE html>
<html>
<head>
    <title>IeNet Test Page</title>
</head>
<body>
    <h1>IeNet Server Test</h1>
    <p>If you see this, the server is working correctly!</p>
    <p>Ready for application deployment.</p>
</body>
</html>
EOF

chmod 644 /var/www/vhosts/vivaindia.com/ienet.online/index.html
```

### Step 5: Configure Web Server

#### For Apache:
```bash
# Create virtual host configuration
cp apache-virtual-host.conf /etc/apache2/sites-available/ienet.online.conf

# Enable site
a2ensite ienet.online.conf

# Enable required modules
a2enmod rewrite
a2enmod headers
a2enmod expires

# Test configuration
apache2ctl configtest

# Restart Apache
systemctl restart apache2
```

#### For Nginx:
```bash
# Create virtual host configuration
cp nginx-virtual-host.conf /etc/nginx/sites-available/ienet.online

# Enable site
ln -s /etc/nginx/sites-available/ienet.online /etc/nginx/sites-enabled/

# Test configuration
nginx -t

# Restart Nginx
systemctl restart nginx
```

### Step 6: Verify Fix
```bash
# Test local access
curl -I http://localhost
curl -I http://ienet.online

# Check logs
tail -f /var/log/apache2/error.log
# OR for Nginx:
tail -f /var/log/nginx/error.log

# Verify permissions
ls -la /var/www/vhosts/vivaindia.com/ienet.online/
```

## 🔍 Common 403 Error Causes & Solutions

### 1. **Incorrect File Permissions**
- **Problem**: Files don't have read permissions
- **Solution**: `chmod 644` for files, `chmod 755` for directories

### 2. **Wrong Ownership**
- **Problem**: Files owned by wrong user
- **Solution**: `chown www-data:www-data` (or `apache:apache`)

### 3. **Missing Index File**
- **Problem**: No index.html in directory
- **Solution**: Create index.html file

### 4. **Parent Directory Permissions**
- **Problem**: Parent directories not accessible
- **Solution**: Set 755 permissions on all parent directories

### 5. **SELinux Context (CentOS/RHEL)**
- **Problem**: SELinux blocking access
- **Solution**: `restorecon -R /var/www/` and set appropriate booleans

### 6. **Virtual Host Misconfiguration**
- **Problem**: Apache/Nginx not configured for domain
- **Solution**: Create proper virtual host configuration

## 🚀 After Fixing 403 Error

Once the 403 error is resolved:

1. **Upload Application Files**:
   ```bash
   # Clear test files
   rm /var/www/vhosts/vivaindia.com/ienet.online/index.html
   
   # Upload your application files here
   # Use SCP, FTP, or file manager
   ```

2. **Deploy Database**:
   ```bash
   mysql -h localhost -u netiedb -p ienetdb < /tmp/ienet-mysql-backup-complete.sql
   ```

3. **Install Node.js and Dependencies**:
   ```bash
   cd /var/www/vhosts/vivaindia.com/ienet.online
   npm install
   npm run build
   npm start
   ```

## 📞 Emergency Troubleshooting

If the above steps don't work:

1. **Check Web Server Status**:
   ```bash
   systemctl status apache2
   # OR
   systemctl status nginx
   ```

2. **Check Error Logs**:
   ```bash
   tail -100 /var/log/apache2/error.log
   tail -100 /var/log/nginx/error.log
   ```

3. **Verify Network Access**:
   ```bash
   netstat -tlnp | grep :80
   ufw status  # Check firewall
   ```

4. **Test DNS Resolution**:
   ```bash
   nslookup ienet.online
   dig ienet.online
   ```

## ✅ Expected Result

After following these steps, visiting http://ienet.online should show:
- Either the test page (if no application files uploaded)
- Or your full IeNet application (after uploading files)
- **NO MORE 403 FORBIDDEN ERROR**

Your server configuration will be ready for the complete application deployment.