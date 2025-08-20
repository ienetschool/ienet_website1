#!/bin/bash
echo "🔧 Deploying Working Fix Server..."

pkill -f node 2>/dev/null || true
sleep 2

nohup node server.cjs > working.log 2>&1 &
echo "Working fix server started with PID: $!"

sleep 2
curl -s http://localhost:5000/api/health
