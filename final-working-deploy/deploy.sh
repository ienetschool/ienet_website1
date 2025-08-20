#!/bin/bash
echo "🔧 Final Working React Deployment..."

pkill -f node 2>/dev/null || true
sleep 3

nohup node server.cjs > final-working.log 2>&1 &
echo "Final working server started with PID: $!"

sleep 3
curl -s http://localhost:5000/api/health
