#!/bin/bash
# IMMEDIATE PRODUCTION SERVER FIX SCRIPT

echo "🚨 PRODUCTION SERVER RESTART SCRIPT"
echo "======================================"

# Change to production directory
cd /var/www/vhosts/ienet.online/httpdocs || {
    echo "❌ Cannot access production directory"
    exit 1
}

echo "📁 Current directory: $(pwd)"

# Kill existing processes
echo "🔄 Stopping existing Node.js processes..."
pkill -f node 2>/dev/null || echo "No Node.js processes found"
pkill -f "mysql-production-server" 2>/dev/null || echo "No existing server processes found"
sleep 2

# Start the production server
echo "🚀 Starting production server on port 3001..."
if [ -f "mysql-production-server.cjs" ]; then
    nohup node mysql-production-server.cjs > server.log 2>&1 &
    SERVER_PID=$!
    echo "✅ Server started with PID: $SERVER_PID"
else
    echo "❌ mysql-production-server.cjs not found!"
    ls -la | grep -E "\.(js|cjs)$"
    exit 1
fi

# Wait for server to start
echo "⏳ Waiting for server to initialize..."
sleep 5

# Test server status
echo "🔍 Testing server endpoints..."
if curl -s http://localhost:3001/api/service-categories > /dev/null; then
    echo "✅ API endpoints responding correctly"
    echo "✅ Categories endpoint: WORKING"
else
    echo "❌ Server not responding on port 3001"
    echo "📋 Checking running processes:"
    ps aux | grep node | grep -v grep
    echo "📋 Checking port usage:"
    netstat -tulpn | grep 3001 || echo "Port 3001 not in use"
fi

echo ""
echo "🌐 Production server status check complete"
echo "🔗 Website should now be accessible at: https://www.ienet.online"
echo "📊 Monitor logs with: tail -f server.log"