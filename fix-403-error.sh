#!/bin/bash

# Fix 403 Error and Deploy React Application
echo "🔧 Fixing ienet.online deployment..."

# Remove any static HTML files that might be interfering
echo "1. Removing static interference files..."
rm -f MINIMAL_HTML_VERSION.html
rm -f PRODUCTION_MATCHING_VERSION.html

# Create clean React deployment
echo "2. Creating clean React deployment..."
rm -rf clean-react-deploy
mkdir -p clean-react-deploy

# Copy the exact React application
cp -r dist/public clean-react-deploy/
cp final-deploy/server-start.js clean-react-deploy/
cp final-deploy/package.json clean-react-deploy/

# Create simple index.js startup file for Plesk
cat > clean-react-deploy/index.js << 'EOF'
import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Serve React application static files
app.use(express.static(join(__dirname, 'public')));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'React App Running', timestamp: new Date() });
});

// Serve React app for all routes
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`IeNet React App running on port ${PORT}`);
});
EOF

# Update package.json for Plesk
cat > clean-react-deploy/package.json << 'EOF'
{
  "name": "ienet-react",
  "version": "1.0.0",
  "type": "module",
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  },
  "dependencies": {
    "express": "^4.18.2"
  }
}
EOF

echo "3. Testing React deployment..."
cd clean-react-deploy
node index.js > test.log 2>&1 &
SERVER_PID=$!
sleep 3

# Test the server
if curl -s http://localhost:3000/health > /dev/null; then
  echo "✅ React server tested successfully"
else
  echo "❌ Server test failed"
fi

kill $SERVER_PID 2>/dev/null
cd ..

echo "4. Deployment package ready in clean-react-deploy/"
ls -la clean-react-deploy/

echo ""
echo "🎯 UPLOAD TO PLESK:"
echo "1. Upload clean-react-deploy/ contents to /ienet.online/"
echo "2. Set Application Startup File: index.js"
echo "3. NPM install and Restart App"
echo ""
echo "✅ This will show your React application, not the static page"