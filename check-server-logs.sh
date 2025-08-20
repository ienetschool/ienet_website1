#!/bin/bash
# Check server status and logs

echo "=== CHECKING PRODUCTION SERVER STATUS ==="
echo "Time: $(date)"
echo

# Check if process is running
echo "1. Process Status:"
ps aux | grep production-server || echo "No production-server process found"
echo

# Check port binding
echo "2. Port Binding:"
netstat -tulpn | grep 3001 || echo "Port 3001 not listening"
echo

# Check server logs
echo "3. Server Logs (last 20 lines):"
if [ -f server.log ]; then
    tail -20 server.log
else
    echo "server.log not found"
fi
echo

# Test local connectivity
echo "4. Local Connectivity Test:"
curl -s --connect-timeout 5 http://127.0.0.1:3001/api/health || echo "Local connection failed"
echo

echo "=== DIAGNOSTIC COMPLETE ==="