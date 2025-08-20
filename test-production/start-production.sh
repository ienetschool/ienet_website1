#!/bin/bash
echo "Starting IeNet Production Server with MySQL..."

# Stop any existing servers
pkill -f node 2>/dev/null || true

# Start the MySQL production server
nohup node production-mysql-server.cjs > production.log 2>&1 &
echo "Server started with PID: $!"

sleep 3
echo "Testing server health:"
curl -s http://localhost:5000/api/health

echo "Testing database connectivity:"
curl -s http://localhost:5000/api/debug | head -20
