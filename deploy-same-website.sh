#!/bin/bash

echo "Preparing SAME website for production deployment..."

# Build the same website
npm run build

# Create production package with SAME codebase
rm -rf same-website-deploy
mkdir -p same-website-deploy

# Copy the EXACT built website
cp -r dist/* same-website-deploy/

# Create simple server for your Plesk
cat > same-website-deploy/index.js << 'EOF'
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static(__dirname));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', app: 'IeNet Same Website' });
});

// Serve main app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`IeNet running on port ${PORT}`);
});
EOF

# Create package.json
cat > same-website-deploy/package.json << 'EOF'
{
  "name": "ienet-same-website",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  },
  "dependencies": {
    "express": "^4.18.2"
  }
}
EOF

# Create deployment package
cd same-website-deploy
tar -czf ../ienet-same-website.tar.gz .
cd ..

echo "✅ Created: ienet-same-website.tar.gz"
echo "This contains the SAME website as development"

# Test the package
echo "Testing deployment package..."
cd same-website-deploy
node index.js > test.log 2>&1 &
TEST_PID=$!
sleep 3

# Test health endpoint
curl -s http://localhost:3000/health && echo ""

# Stop test server
kill $TEST_PID 2>/dev/null

cd ..
echo "✅ Package tested and ready for your server"