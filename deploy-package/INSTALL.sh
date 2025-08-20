#!/bin/bash
echo "Installing IeNet React Application..."

# Install dependencies
npm install

# Start application
echo "Starting Node.js application..."
node index.js &

echo "Application started on port 3000"
echo "Visit http://ienet.online to view your website"
