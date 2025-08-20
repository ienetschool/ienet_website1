#!/bin/bash
echo "🔧 Working Production Deployment..."

# Kill existing processes
pkill -f node 2>/dev/null || true
pkill -f server.cjs 2>/dev/null || true
sleep 3

# Verify files exist
echo "📁 Verifying deployment files:"
echo "Index.html exists: $(ls dist/index.html 2>/dev/null && echo 'YES' || echo 'NO')"
echo "Assets directory: $(ls dist/assets/ 2>/dev/null | wc -l) files"
echo "Server script: $(ls server.cjs 2>/dev/null && echo 'YES' || echo 'NO')"

# Start server
nohup node server.cjs > working.log 2>&1 &
SERVER_PID=$!
echo "Server started with PID: $SERVER_PID"

# Wait and test
sleep 3
echo "🧪 Testing server response:"
curl -s http://localhost:5000/api/health && echo ""
curl -s http://localhost:5000/ | grep -E "(script|root)" | head -2

echo "=== Working Deployment Complete ==="
