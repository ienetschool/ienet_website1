#!/bin/bash
echo "Starting Enhanced IeNet Server with Full Database Connectivity..."

# Stop any existing servers
pkill -f node 2>/dev/null || true

# Start the enhanced MySQL server
nohup node enhanced-mysql-server.cjs > enhanced-production.log 2>&1 &
echo "Enhanced server started with PID: $!"

sleep 5
echo "Testing enhanced server endpoints:"
echo "Health: $(curl -s http://localhost:5000/api/health | jq -r .status 2>/dev/null || curl -s http://localhost:5000/api/health)"
echo "Categories: $(curl -s http://localhost:5000/api/service-categories | jq 'length' 2>/dev/null || echo 'Testing...')"
echo "Services: $(curl -s http://localhost:5000/api/services | jq 'length' 2>/dev/null || echo 'Testing...')"
echo "Features: $(curl -s http://localhost:5000/api/features | jq 'length' 2>/dev/null || echo 'Testing...')"
echo "Projects: $(curl -s http://localhost:5000/api/projects | jq 'length' 2>/dev/null || echo 'Testing...')"
