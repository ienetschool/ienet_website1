#!/bin/bash
echo "Installing dependencies..."
npm install --production

echo "Starting IeNet React Application..."
pm2 stop ienet-production 2>/dev/null || true
pm2 start package.json --name ienet-production
pm2 save

echo "✅ IeNet React Application deployed successfully"
echo "🌐 Visit http://ienet.online to view your website"
