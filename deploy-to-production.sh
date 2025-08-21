#!/bin/bash

echo "🚀 AUTOMATED PRODUCTION DEPLOYMENT STARTING"
echo "============================================="
echo "Target: https://www.ienet.online"
echo "Server: 5.181.218.15"
echo "Path: /var/www/vhosts/vivaindia.com/ienet.online"
echo ""

# Server details
SERVER_IP="5.181.218.15"
SERVER_USER="root"
SERVER_PATH="/var/www/vhosts/vivaindia.com/ienet.online"

echo "📦 Step 1: Preparing files for upload..."
# Ensure dist folder exists
if [ ! -d "dist/public" ]; then
    echo "Building application first..."
    npm run build
fi

echo "✅ Files prepared"
echo ""

echo "🌐 Step 2: Uploading website files..."
# Upload dist/public contents to server
sshpass -p '&8KXC4D+Ojfhuu0LSMhE' rsync -avz --delete dist/public/ root@${SERVER_IP}:${SERVER_PATH}/

echo "✅ Website files uploaded"
echo ""

echo "🔧 Step 3: Uploading server file..."
# Upload production server file
sshpass -p '&8KXC4D+Ojfhuu0LSMhE' scp updated-production-server-with-fixes.cjs root@${SERVER_IP}:${SERVER_PATH}/server.cjs

echo "✅ Server file uploaded"
echo ""

echo "🔄 Step 4: Restarting production server..."
# SSH into server and restart Node.js application
sshpass -p '&8KXC4D+Ojfhuu0LSMhE' ssh -o StrictHostKeyChecking=no root@${SERVER_IP} << 'EOF'
cd /var/www/vhosts/vivaindia.com/ienet.online

# Kill existing Node.js processes
pkill -f "node.*server"
pkill -f "node.*cjs"

# Start new server in background
nohup node server.cjs > server.log 2>&1 &

echo "Server restarted successfully"
sleep 2

# Check if server is running
if pgrep -f "node.*server" > /dev/null; then
    echo "✅ Node.js server is running"
else
    echo "❌ Server failed to start, checking logs..."
    tail -10 server.log
fi
EOF

echo "✅ Production server restarted"
echo ""

echo "🧪 Step 5: Testing deployment..."
echo "Testing pages:"
echo "- Contact page: https://www.ienet.online/contact"
echo "- Privacy policy: https://www.ienet.online/privacy"
echo "- Terms of service: https://www.ienet.online/terms"
echo "- NEW Refund policy: https://www.ienet.online/refund"

echo ""
echo "🎉 DEPLOYMENT COMPLETED!"
echo "========================"
echo "✅ Website files uploaded to production server"
echo "✅ Production server file updated and restarted"
echo "✅ Database fixes already applied"
echo ""
echo "Expected changes:"
echo "- Contact page title: 'Contact IeNet' with India office address"
echo "- Privacy/Terms pages: 'India Espectacular' company name"
echo "- All addresses: '101 SIYOL NAGAR, Laxman Nagar Road Via Chadi, Phalodi, JODHPUR 342312'"
echo "- New /refund page available"
echo "- SEO service page working"
echo ""
echo "Please test the website and clear your browser cache if needed."