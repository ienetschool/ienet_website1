#!/bin/bash
echo "🔧 Complete Server Restart and Deployment..."

# Kill all existing node processes
echo "Stopping all existing servers..."
pkill -f node 2>/dev/null || true
pkill -f server.cjs 2>/dev/null || true
sleep 3

# Verify processes are stopped
if pgrep -f node > /dev/null; then
    echo "Force killing remaining processes..."
    pkill -9 -f node 2>/dev/null || true
    sleep 2
fi

# Start new server
echo "Starting complete working server..."
nohup node server.cjs > complete.log 2>&1 &
NEW_PID=$!
echo "Server started with PID: $NEW_PID"

# Wait and test
sleep 3
echo "Testing server..."
if curl -s http://localhost:5000/api/health > /dev/null; then
    echo "✅ Server is responding"
    curl -s http://localhost:5000/api/health
else
    echo "❌ Server not responding"
    echo "--- Server Log ---"
    tail -20 complete.log
    exit 1
fi

# Test static files
echo "Testing static files..."
if curl -s http://localhost:5000/assets/index-BOus7yXH.js | head -1 | grep -q "import\|export\|function"; then
    echo "✅ JS bundle accessible"
else
    echo "❌ JS bundle not accessible"
fi

if curl -s http://localhost:5000/ | grep -q "root"; then
    echo "✅ Index.html serving"
else
    echo "❌ Index.html not serving"
fi

echo "=== Deployment Complete ==="
