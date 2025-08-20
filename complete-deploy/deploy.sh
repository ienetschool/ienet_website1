#!/bin/bash
echo "🚀 Complete Production Deployment with All API Endpoints"

# Stop existing servers
pkill -f node 2>/dev/null || true
pkill -f server.cjs 2>/dev/null || true
sleep 3

# Start complete server
nohup node server.cjs > complete.log 2>&1 &
SERVER_PID=$!
echo "Complete server started with PID: $SERVER_PID"

# Wait and test
sleep 3
echo "🧪 Testing complete server:"

echo "Health check:"
curl -s http://localhost:5000/api/health

echo -e "\nTesting service category lookup:"
curl -s http://localhost:5000/api/service-categories/cybersecurity-solutions

echo -e "\nTesting individual service lookup:"
curl -s http://localhost:5000/api/services/cybersecurity-solutions

echo -e "\nTesting features endpoint:"
curl -s http://localhost:5000/api/features | head -100

echo -e "\n=== Complete Deployment Finished ==="
