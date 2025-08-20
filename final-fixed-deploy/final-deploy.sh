#!/bin/bash
echo "🔧 Deploying FINAL FIXED Production Server..."

# Stop all existing servers completely
pkill -f node 2>/dev/null || true
pkill -f server 2>/dev/null || true
sleep 3

# Start the corrected server
nohup node server.cjs > final-fixed.log 2>&1 &
NEW_PID=$!
echo "Final fixed server started with PID: $NEW_PID"

# Wait and test
sleep 3
echo "Testing auth endpoint fix..."
curl -s http://localhost:5000/api/auth/user || echo "Auth test failed"

echo "Testing main site..."
curl -s http://localhost:5000/api/health || echo "Health test failed"

echo "Final fixed server deployment complete"
