#!/bin/bash
echo "🔧 Enhanced Production Deployment..."

# Stop all existing servers
pkill -f node 2>/dev/null || true
pkill -f server.cjs 2>/dev/null || true
sleep 3

# Verify file structure
echo "📁 Checking file structure:"
ls -la dist/
echo "📦 Assets:"
ls -la dist/assets/

# Start enhanced server
nohup node server.cjs > enhanced.log 2>&1 &
NEW_PID=$!
echo "Enhanced server started with PID: $NEW_PID"

# Wait and test
sleep 3
echo "🧪 Testing server..."
curl -s http://localhost:5000/api/health || echo "Health check failed"

echo "🧪 Testing static files..."
curl -s -I http://localhost:5000/assets/index-4QWEdKIS.js | head -3

echo "🧪 Testing React app..."
curl -s http://localhost:5000/ | grep -E "(script|root)" | head -2

echo "=== Enhanced Deployment Complete ==="
