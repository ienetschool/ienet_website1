#!/bin/bash

echo "Creating upload package for manual deployment"

# Create deployment directory
mkdir -p manual-upload
rm -rf manual-upload/*

# Copy all React files
cp -r dist/public/* manual-upload/

# Copy API server
cp production-server.cjs manual-upload/

# Create package.json for dependencies
cat > manual-upload/package.json << 'EOF'
{
  "name": "ienet-production",
  "version": "1.0.0",
  "dependencies": {
    "mysql2": "^3.6.0",
    "express": "^4.18.2"
  }
}
EOF

# Create deployment archive
tar -czf ienet-manual-upload.tar.gz manual-upload/

echo "Manual upload package created:"
ls -la ienet-manual-upload.tar.gz
ls -la manual-upload/

echo ""
echo "Upload these files to /var/www/vhosts/vivaindia.com/ienet.online/:"
ls -la manual-upload/