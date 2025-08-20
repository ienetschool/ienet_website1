#!/bin/bash
echo "🔧 Deploying Enhanced Server with Route Debugging..."

# Stop existing servers
pkill -f node 2>/dev/null || true
sleep 2

# Start enhanced server
nohup node server.cjs > enhanced.log 2>&1 &
echo "Enhanced server started with PID: $!"

sleep 2
echo "Testing enhanced server..."
curl -s http://localhost:5000/api/health
