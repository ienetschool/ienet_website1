-- MySQL Database Setup for IeNet Production
-- Run this on your production MySQL server

-- Create database if not exists
CREATE DATABASE IF NOT EXISTS ienet_db;

-- Create user and grant permissions
CREATE USER IF NOT EXISTS 'ienet'@'localhost' IDENTIFIED BY 'ienet2024';
GRANT ALL PRIVILEGES ON ienet_db.* TO 'ienet'@'localhost';
FLUSH PRIVILEGES;

-- Use the database
USE ienet_db;

-- Show current tables (should have your migrated data)
SHOW TABLES;

-- Verify data exists
SELECT COUNT(*) as total_categories FROM service_categories;
SELECT COUNT(*) as total_services FROM services;
SELECT COUNT(*) as total_features FROM features;
SELECT COUNT(*) as total_pages FROM pages;

-- Show sample data
SELECT id, name FROM service_categories LIMIT 5;
SELECT id, title FROM services LIMIT 5;