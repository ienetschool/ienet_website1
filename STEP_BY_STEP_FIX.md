# Step-by-Step Production Server Fix

## Issue Identified
The Node.js server isn't responding on port 3001, causing 502 errors.

## Solution Steps

### 1. Upload New Complete Server
Upload `complete-working-server.cjs` to replace the current server file.

### 2. Kill Existing Process and Start New Server
```bash
ssh root@5.181.218.15
cd /var/www/vhosts/vivaindia.com/ienet.online/

# Kill any existing Node.js processes
pkill -f node

# Start the new complete server
nohup node complete-working-server.cjs > complete-server.log 2>&1 &

# Check if it's running
ps aux | grep node
```

### 3. Verify Server is Listening
```bash
# Check if port 3001 is listening
netstat -tulpn | grep 3001

# Test local connection
curl http://127.0.0.1:3001/api/health
```

### 4. Test API Endpoints
```bash
# Test health endpoint
curl https://www.ienet.online/api/health

# Test service categories
curl https://www.ienet.online/api/service-categories
```

### 5. Update Plesk Configuration (Optional)
In Plesk Node.js panel:
- Change Application Startup File to `complete-working-server.cjs`
- Click Apply

## Expected Results
- Server responds on port 3001
- API endpoints return JSON data from MySQL
- Website loads service categories and content
- No more "Service Not Found" errors

## New Server Features
- Enhanced error handling
- Detailed logging
- Proper CORS configuration
- MySQL connection management
- All endpoints implemented with real database queries

This complete server should resolve all communication issues between Nginx and Node.js.