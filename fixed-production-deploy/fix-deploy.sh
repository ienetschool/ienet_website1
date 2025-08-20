#!/bin/bash
echo "🔧 Deploying Fixed Production Server..."

# Stop all existing servers
pkill -f node 2>/dev/null || true
sleep 2

# Start enhanced server
nohup node server.cjs > fixed-production.log 2>&1 &
echo "Enhanced server started with PID: $!"

# Wait and test
sleep 3
echo "Testing enhanced server..."
curl -s http://localhost:5000/api/health
echo ""
curl -s http://localhost:5000/api/debug

echo "Fixed production server deployment complete"
