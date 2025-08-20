#!/bin/bash
echo "🔧 Final Auth Fix Deployment..."

pkill -f node 2>/dev/null || true
sleep 3

nohup node server.cjs > final-auth.log 2>&1 &
echo "Final auth fix server started with PID: $!"

sleep 3
curl -s http://localhost:5000/api/health
echo ""
echo "Testing React app load..."
curl -s http://localhost:5000/ | grep -E "(script|root)" | head -2
