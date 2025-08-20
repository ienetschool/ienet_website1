#!/bin/bash
echo "🔧 Deploying Final Server with Hierarchical Routing..."

pkill -f node 2>/dev/null || true
sleep 2

nohup node server.cjs > final.log 2>&1 &
echo "Final server started with PID: $!"

sleep 2
curl -s http://localhost:5000/api/health
