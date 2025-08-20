#!/bin/bash
echo "Production Fix Deployment..."
pkill -f node 2>/dev/null || true
sleep 3
nohup node server.cjs > fix.log 2>&1 &
echo "Production fix server started with PID: $!"
sleep 2
curl -s http://localhost:5000/api/health
