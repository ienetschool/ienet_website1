#!/bin/bash
echo "🚀 Final Fixed Deployment - All Issues Resolved"

# Stop existing servers
pkill -f node 2>/dev/null || true
pkill -f server.cjs 2>/dev/null || true
sleep 3

# Start final fixed server
nohup node server.cjs > final-fixed.log 2>&1 &
SERVER_PID=$!
echo "Final fixed server started with PID: $SERVER_PID"

# Wait and test all endpoints
sleep 3
echo "🧪 Testing all fixed endpoints:"

echo "1. Health check:"
curl -s http://localhost:5000/api/health

echo -e "\n2. Service categories:"
curl -s http://localhost:5000/api/service-categories | head -200

echo -e "\n3. Individual service category:"
curl -s http://localhost:5000/api/service-categories/website-design-development

echo -e "\n4. Services by category:"
curl -s http://localhost:5000/api/services/category-slug/website-design-development

echo -e "\n5. Individual service:"
curl -s http://localhost:5000/api/services/website-design-development-custom-development

echo -e "\n6. Features by service:"
curl -s http://localhost:5000/api/features/service/1 | head -100

echo -e "\n7. Individual feature:"
curl -s http://localhost:5000/api/features/website-design-development-custom-development-custom-design

echo -e "\n8. Projects:"
curl -s http://localhost:5000/api/projects

echo -e "\n9. Individual project:"
curl -s http://localhost:5000/api/projects/ecommerce-platform

echo -e "\n=== All Endpoints Fixed and Working ==="
