#!/bin/bash
echo "🚀 Final Production Deployment with Corrected React Bundle"

# Stop existing servers
pkill -f node 2>/dev/null || true
sleep 3

# Start final server
nohup node server.cjs > final-production.log 2>&1 &
echo "Final production server started with PID: $!"

sleep 3
echo "Testing final deployment:"
curl -s http://localhost:5000/api/health

echo "Testing React bundle:"
curl -s http://localhost:5000/ | grep script

echo "=== Final Production Deployment Complete ==="
