#!/bin/bash

echo "Installing IeNet with MySQL..."

# Install dependencies
npm install

# Setup MySQL database
echo "Setting up MySQL database..."
mysql -u root -p < setup-mysql.sql

# Run database migrations
npm run db:push

echo "Installation complete!"
echo "Start with: npm start"
