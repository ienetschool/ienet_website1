#!/bin/bash

echo "Deploying IeNet with MySQL on production server..."

# Install dependencies
echo "Installing dependencies..."
npm install

# Setup MySQL database
echo "Setting up MySQL database..."
echo "Please run: mysql -u root -p < setup-database.sql"
echo "Or use your hosting panel to create database 'ienet_production'"

# Run database migrations
echo "Running database migrations..."
npm run db:push

# Build for production
echo "Building application..."
npm run build

echo "Deployment complete!"
echo "Start production server with: npm start"
echo "Make sure to update .env.production with your MySQL credentials"
