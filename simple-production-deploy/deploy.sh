#!/bin/bash
echo "🚀 Deploying IeNet Production Server..."

# Stop existing servers
pkill -f node 2>/dev/null || true
pkill -f server.cjs 2>/dev/null || true

# Start the production server
nohup node server.cjs > production.log 2>&1 &
echo "Server started with PID: $!"

# Wait and test
sleep 3
echo "Testing server..."
curl -s http://localhost:5000/api/health || echo "Health check failed"
curl -s http://localhost:5000/api/debug || echo "Debug check failed"

echo "Production server deployment complete"
